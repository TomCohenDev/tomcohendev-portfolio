/**
 * Site Worker. Static files are served from ./dist by Workers Assets; this script only
 * runs for /api/* (see run_worker_first in wrangler.jsonc).
 *
 * POST /api/automation-lead
 *   Receives the inquiry form of the Hebrew landing pages (/automation and /mobile; the `page`
 *   field says which), stores it in D1 and emails it to Tom through
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
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/automation-lead") {
      if (request.method !== "POST") {
        return json({ ok: false, error: "method_not_allowed" }, 405, { Allow: "POST" });
      }
      return handleLead(request, env, ctx);
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ ok: false, error: "not_found" }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleLead(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
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

  const notify = async () => {
    try {
      await env.LEAD_EMAIL.send(buildEmail(env, id, lead));
    } catch (error) {
      console.error("automation-lead: email failed", { id, error: String(error) });
      return false;
    }
    if (stored) {
      try {
        await env.LEADS_DB.prepare("UPDATE automation_leads SET email_notified = 1 WHERE id = ?1").bind(id).run();
      } catch (error) {
        console.error("automation-lead: flag update failed", { id, error: String(error) });
      }
    }
    return true;
  };

  if (stored) {
    // The lead is safe in the database, so answer now and send the email after the response.
    // email_notified stays 0 if the email fails, so missed notifications can be found later.
    ctx.waitUntil(notify());
    console.log("automation-lead: received", { id, stored, email: "background" });
    return json({ ok: true, id });
  }

  // Not stored: the email is the only copy, so wait for it before telling the visitor it worked.
  const emailed = await notify();
  if (!emailed) {
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

/** Wording that depends on the landing page the lead came from. */
function pageCopy(page: string) {
  return page.startsWith("/mobile")
    ? { source: "tomcohen.dev/mobile", subject: "פנייה חדשה מעמוד האפליקציות", sender: "טופס אפליקציות", process: "מה האפליקציה צריכה לעשות", tools: "מה כבר קיים", frequency: false }
    : { source: "tomcohen.dev/automation", subject: "פנייה חדשה מעמוד האוטומציה", sender: "טופס אוטומציה", process: "התהליך שרוצים לשפר", tools: "כלים קיימים", frequency: true };
}

function buildEmail(env: Env, id: string, lead: LeadInput) {
  const to = "tom.cohen99@gmail.com";
  const from = env.LEAD_EMAIL_FROM || "automation@tomcohen.dev";
  const copy = pageCopy(lead.page);
  const subject = `${copy.subject}: ${lead.fullName}${lead.business ? ` (${lead.business})` : ""}`;

  const lines = [
    `פנייה חדשה מ־${copy.source}`,
    "",
    `שם: ${lead.fullName}`,
    `עסק / תחום: ${lead.business || "לא צוין"}`,
    `פרטי קשר: ${lead.contact}`,
    ...(copy.frequency ? [`תדירות התהליך: ${lead.frequency ? FREQUENCY_LABELS[lead.frequency] : "לא צוין"}`] : []),
    `${copy.tools}: ${lead.tools || "לא צוין"}`,
    "",
    `${copy.process}:`,
    lead.process || "לא צוין",
    "",
    "---",
    `מזהה פנייה: ${id}`,
    "הפנייה נשמרה גם במסד הנתונים tomcohendev-leads (טבלת automation_leads).",
  ];

  // Plain text for clients that don't render HTML, and a formatted HTML version for everyone else.
  const boundary = `lead-${id}`;
  const headers = [
    `From: ${encodeWord(copy.sender)} <${from}>`,
    `To: <${to}>`,
    `Subject: ${encodeWord(subject)}`,
    `Message-ID: <${id}@tomcohen.dev>`,
    `Date: ${new Date().toUTCString().replace("GMT", "+0000")}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];
  if (isEmail(lead.contact)) headers.splice(2, 0, `Reply-To: <${lead.contact}>`);

  const part = (type: string, body: string) =>
    [`--${boundary}`, `Content-Type: ${type}; charset=UTF-8`, "Content-Transfer-Encoding: base64", "", wrap(base64Utf8(body))].join("\r\n");

  const raw = [
    headers.join("\r\n"),
    "",
    part("text/plain", lines.join("\r\n")),
    part("text/html", buildEmailHtml(id, lead)),
    `--${boundary}--`,
    "",
  ].join("\r\n");
  return new EmailMessage(from, to, raw);
}

/** Escapes visitor input before it goes into the HTML email. */
function esc(text: string) {
  return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

/** Israeli phone number in international form for tel: and WhatsApp links (054-555-2149 → 972545552149). */
function intlPhone(contact: string) {
  const digits = contact.replace(/\D/g, "");
  if (digits.startsWith("972")) return digits;
  if (digits.startsWith("0")) return `972${digits.slice(1)}`;
  return digits;
}

/**
 * Formatted version of the lead email. Email clients ignore most CSS, so it uses tables and inline styles,
 * and a light card that stays readable in both light and dark inboxes.
 */
function buildEmailHtml(id: string, lead: LeadInput) {
  const copy = pageCopy(lead.page);
  const NONE = '<span style="color:#9a9a9a">לא צוין</span>';
  const row = (label: string, value: string) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#6b6b6b;font-size:14px;width:120px;vertical-align:top">${label}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#1d201f;font-size:15px;vertical-align:top">${value}</td>
        </tr>`;
  const button = (href: string, label: string, bg: string, color = "#ffffff") =>
    `<a href="${href}" style="display:inline-block;margin:0 0 8px 8px;padding:10px 18px;border-radius:10px;background:${bg};color:${color};font-size:14px;font-weight:600;text-decoration:none">${label}</a>`;

  const email = isEmail(lead.contact);
  const phone = email ? "" : intlPhone(lead.contact);
  const actions = email
    ? button(`mailto:${esc(lead.contact)}`, "להשיב במייל", "#7c3aed")
    : button(`https://wa.me/${phone}`, "לכתוב בוואטסאפ", "#1f9c55") + button(`tel:+${phone}`, "להתקשר", "#7c3aed");
  const contactCell = email
    ? `<a href="mailto:${esc(lead.contact)}" style="color:#7c3aed;text-decoration:none" dir="ltr">${esc(lead.contact)}</a>`
    : `<a href="tel:+${phone}" style="color:#7c3aed;text-decoration:none" dir="ltr">${esc(lead.contact)}</a>`;

  return `<!doctype html>
<html lang="he" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>פנייה חדשה</title></head>
<body style="margin:0;padding:0;background:#f3f1ee">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1ee">
    <tr><td align="center" style="padding:24px 12px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" dir="rtl" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;text-align:right">
        <tr><td style="background:#1d201f;padding:20px 24px">
          <div style="color:#bf95f9;font-size:13px">${copy.source}</div>
          <div style="color:#e0d0c1;font-size:22px;font-weight:700;margin-top:4px">פנייה חדשה</div>
        </td></tr>
        <tr><td style="height:4px;background:#bf95f9;line-height:4px;font-size:0">&nbsp;</td></tr>
        <tr><td style="padding:20px 24px 4px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${[
            row("שם", `<strong>${esc(lead.fullName)}</strong>`),
            row("עסק / תחום", lead.business ? esc(lead.business) : NONE),
            row("פרטי קשר", contactCell),
            copy.frequency ? row("תדירות", lead.frequency ? esc(FREQUENCY_LABELS[lead.frequency] ?? lead.frequency) : NONE) : "",
            row(copy.tools, lead.tools ? esc(lead.tools) : NONE),
          ].join("")}
          </table>
        </td></tr>
        <tr><td style="padding:16px 24px 0">
          <div style="color:#6b6b6b;font-size:14px;margin-bottom:6px">${copy.process}</div>
          <div style="background:#f7f4fb;border-right:4px solid #bf95f9;border-radius:8px;padding:12px 14px;color:#1d201f;font-size:15px;line-height:1.6;white-space:pre-wrap">${
            lead.process ? esc(lead.process) : NONE
          }</div>
        </td></tr>
        <tr><td style="padding:20px 24px 12px">${actions}</td></tr>
        <tr><td style="padding:14px 24px 20px;border-top:1px solid #eee;color:#9a9a9a;font-size:12px;line-height:1.6">
          מזהה פנייה: <span dir="ltr">${esc(id)}</span><br>
          הפנייה נשמרה גם במסד הנתונים tomcohendev-leads (טבלת automation_leads).
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
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
