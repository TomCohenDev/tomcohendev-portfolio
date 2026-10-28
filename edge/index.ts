/**
 * Site Worker. Static files are served from ./dist by Workers Assets; this script only
 * runs for /api/* (see run_worker_first in wrangler.jsonc).
 *
 * POST /api/automation-lead
 *   Receives the /automation inquiry form, stores it in D1 and emails it to Tom through
 *   Cloudflare Email Routing. The visitor only sees success when at least one of the two
 *   actually worked.
 */
import { EmailMessage } from "cloudflare:email";

type Env = Cloudflare.Env;

const ALLOWED_HOSTS = ["tomcohen.dev", "www.tomcohen.dev", "tom-cohen.com", "www.tom-cohen.com", "localhost", "127.0.0.1"];
const FREQUENCIES = ["daily", "weekly", "monthly", "rarely", "unsure"] as const;
const FREQUENCY_LABELS: Record<string, string> = {
  daily: "כמה פעמים ביום",
  weekly: "כמה פעמים בשבוע",
  monthly: "כמה פעמים בחודש",
  rarely: "לעיתים רחוקות",
  unsure: "לא בטוח/ה",
};
const MAX_BODY_BYTES = 20_000;

type LeadInput = {
  fullName: string;
  business: string;
  contact: string;
  process: string;
  tools: string;
  frequency: string;
  consent: boolean;
  page: string;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/automation-lead") {
      if (request.method !== "POST") {
        return json({ ok: false, error: "method_not_allowed" }, 405, { Allow: "POST" });
      }
      return handleLead(request, env);
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ ok: false, error: "not_found" }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleLead(request: Request, env: Env): Promise<Response> {
  if (!isAllowedOrigin(request)) {
    return json({ ok: false, error: "forbidden" }, 403);
  }

  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "too_large" }, 413);
  }

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const { success: withinLimit } = await env.LEAD_RATE_LIMITER.limit({ key: `lead:${ip}` });
  if (!withinLimit) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json({ ok: false, error: "too_large" }, 413);
    raw = JSON.parse(text);
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: real visitors never see this field. Bots get a quiet 200 and nothing is stored.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return json({ ok: true });
  }

  const { lead, fieldErrors } = validate(raw);
  if (!lead) {
    return json({ ok: false, error: "validation", fields: fieldErrors }, 422);
  }

  const id = crypto.randomUUID();
  let stored = false;
  let emailed = false;

  try {
    await env.LEADS_DB.prepare(
      `INSERT INTO automation_leads (id, full_name, business, contact, process, tools, frequency, consent, page)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`
    )
      .bind(
        id,
        lead.fullName,
        lead.business || null,
        lead.contact,
        lead.process,
        lead.tools || null,
        lead.frequency || null,
        lead.consent ? 1 : 0,
        lead.page || null
      )
      .run();
    stored = true;
  } catch (error) {
    console.error("automation-lead: D1 insert failed", { id, error: String(error) });
  }

  try {
    await env.LEAD_EMAIL.send(buildEmail(env, id, lead));
    emailed = true;
  } catch (error) {
    console.error("automation-lead: email failed", { id, error: String(error) });
  }

  if (stored && emailed) {
    try {
      await env.LEADS_DB.prepare("UPDATE automation_leads SET email_notified = 1 WHERE id = ?1").bind(id).run();
    } catch (error) {
      console.error("automation-lead: flag update failed", { id, error: String(error) });
    }
  }

  if (!stored && !emailed) {
    return json({ ok: false, error: "server" }, 502);
  }

  console.log("automation-lead: received", { id, stored, emailed });
  return json({ ok: true, id });
}

function validate(raw: Record<string, unknown>): { lead?: LeadInput; fieldErrors: Record<string, string> } {
  const str = (key: string, max: number) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim().slice(0, max) : "";

  const lead: LeadInput = {
    fullName: str("fullName", 120),
    business: str("business", 150),
    contact: str("contact", 200),
    process: str("process", 3000),
    tools: str("tools", 500),
    frequency: str("frequency", 20),
    consent: raw.consent === true,
    page: str("page", 200),
  };

  const errors: Record<string, string> = {};
  if (lead.fullName.length < 2) errors.fullName = "required";
  if (!isEmail(lead.contact) && !isPhone(lead.contact)) errors.contact = "invalid";
  if (lead.frequency && !FREQUENCIES.includes(lead.frequency as (typeof FREQUENCIES)[number])) {
    errors.frequency = "invalid";
  }
  if (!lead.consent) errors.consent = "required";

  return Object.keys(errors).length ? { fieldErrors: errors } : { lead, fieldErrors: {} };
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^[+\d][\d\s\-().]*$/.test(value) && digits.length >= 9 && digits.length <= 15;
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const { hostname } = new URL(origin);
    return ALLOWED_HOSTS.includes(hostname) || hostname.endsWith(".tom-cohen99.workers.dev");
  } catch {
    return false;
  }
}

function buildEmail(env: Env, id: string, lead: LeadInput) {
  const to = "tom.cohen99@gmail.com";
  const from = env.LEAD_EMAIL_FROM || "automation@tomcohen.dev";
  const subject = `פנייה חדשה מעמוד האוטומציה: ${lead.fullName}${lead.business ? ` (${lead.business})` : ""}`;

  const lines = [
    "פנייה חדשה מ־tomcohen.dev/automation",
    "",
    `שם: ${lead.fullName}`,
    `עסק / תחום: ${lead.business || "לא צוין"}`,
    `פרטי קשר: ${lead.contact}`,
    `תדירות התהליך: ${lead.frequency ? FREQUENCY_LABELS[lead.frequency] : "לא צוין"}`,
    `כלים קיימים: ${lead.tools || "לא צוין"}`,
    "",
    "התהליך שרוצים לשפר:",
    lead.process || "לא צוין",
    "",
    "---",
    `מזהה פנייה: ${id}`,
    "הפנייה נשמרה גם במסד הנתונים tomcohendev-leads (טבלת automation_leads).",
  ];

  const headers = [
    `From: ${encodeWord("טופס אוטומציה")} <${from}>`,
    `To: <${to}>`,
    `Subject: ${encodeWord(subject)}`,
    `Message-ID: <${id}@tomcohen.dev>`,
    `Date: ${new Date().toUTCString().replace("GMT", "+0000")}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
  ];
  if (isEmail(lead.contact)) headers.splice(2, 0, `Reply-To: <${lead.contact}>`);

  const raw = `${headers.join("\r\n")}\r\n\r\n${wrap(base64Utf8(lines.join("\r\n")))}`;
  return new EmailMessage(from, to, raw);
}

function base64Utf8(text: string) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

// RFC 2047 encoded-words, split so each stays under the 75-character limit.
function encodeWord(text: string) {
  const chars = Array.from(text);
  const parts: string[] = [];
  for (let i = 0; i < chars.length; i += 11) {
    parts.push(`=?UTF-8?B?${base64Utf8(chars.slice(i, i + 11).join(""))}?=`);
  }
  return parts.join("\r\n ");
}

function wrap(text: string) {
  return text.replace(/.{1,76}/g, "$&\r\n");
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });
}
