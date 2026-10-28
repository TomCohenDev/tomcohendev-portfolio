import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import { track } from "@/lib/analytics";
import { CONTACT, LEAD_ENDPOINT, frequencyOptions } from "./content";

type Fields = {
  fullName: string;
  business: string;
  contact: string;
  process: string;
  tools: string;
  frequency: string;
  consent: boolean;
};

type FieldName = keyof Fields;
type Status = "idle" | "submitting" | "success" | "error" | "rate_limited";

const EMPTY: Fields = { fullName: "", business: "", contact: "", process: "", tools: "", frequency: "", consent: false };

const MESSAGES: Partial<Record<FieldName, string>> = {
  fullName: "נא לכתוב שם (לפחות שני תווים).",
  contact: "נא לכתוב מספר טלפון או כתובת דואר אלקטרוני תקינים.",
  process: "ספרו לי בכמה מילים על התהליך (לפחות 10 תווים).",
  frequency: "נא לבחור אחת מהאפשרויות.",
  consent: "כדי שאוכל לחזור אליכם, צריך לסמן את האישור.",
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone = (v: string) => {
  const digits = v.replace(/\D/g, "");
  return /^[+\d][\d\s\-().]*$/.test(v) && digits.length >= 9 && digits.length <= 15;
};

const validate = (f: Fields) => {
  const errors: Partial<Record<FieldName, string>> = {};
  if (f.fullName.trim().length < 2) errors.fullName = MESSAGES.fullName;
  const contact = f.contact.trim();
  if (!isEmail(contact) && !isPhone(contact)) errors.contact = MESSAGES.contact;
  if (f.process.trim().length < 10) errors.process = MESSAGES.process;
  if (!f.consent) errors.consent = MESSAGES.consent;
  return errors;
};

const ORDER: FieldName[] = ["fullName", "contact", "process", "consent"];

export const LeadForm = ({ seed }: { seed: string[] }) => {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // Items ticked on the "where does the time go" board become a starting point for the description.
  useEffect(() => {
    if (!seed.length) return;
    setFields((prev) =>
      prev.process.trim()
        ? prev
        : { ...prev, process: `מה שמוכר לי:\n${seed.map((s) => `• ${s}`).join("\n")}\n\nאצלנו בפועל: ` }
    );
  }, [seed]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error" || status === "rate_limited") errorRef.current?.focus();
  }, [status]);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track("automation_form_start");
  };

  const set = <K extends FieldName>(name: K, value: Fields[K]) => {
    markStarted();
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const first = ORDER.find((name) => found[name]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...fields, website: honeypot, page: window.location.pathname }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
        track("automation_form_submit_success", { has_business: !!fields.business.trim(), frequency: fields.frequency || "none" });
        return;
      }
      if (res.status === 429) {
        setStatus("rate_limited");
        return;
      }
      if (res.status === 422 && data.fields) {
        const serverErrors: Partial<Record<FieldName, string>> = {};
        for (const key of Object.keys(data.fields) as FieldName[]) serverErrors[key] = MESSAGES[key];
        setErrors(serverErrors);
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="a-card text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--a-ok)]" aria-hidden="true" />
        <h3 ref={successRef} tabIndex={-1} className="mt-4 text-2xl font-bold text-[var(--a-ink)] outline-none">
          תודה{fields.fullName.trim() ? `, ${fields.fullName.trim().split(" ")[0]}` : ""}. הפנייה התקבלה.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-[16px] leading-relaxed text-[var(--a-muted)]">
          קראתי את הפרטים ואחזור אליכם בהקדם, בערוץ שהשארתם, כדי לקבוע שיחה קצרה.
        </p>
      </div>
    );
  }

  const inputBase =
    "mt-2 block w-full rounded-xl border bg-[#141716] px-4 py-3 text-[16px] text-[var(--a-ink)] placeholder:text-[var(--a-muted)]/60 transition-colors focus:border-[var(--a-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--a-accent)]/40";
  const border = (name: FieldName) => (errors[name] ? "border-red-400/80" : "border-[var(--a-line)]");
  const describedBy = (name: FieldName, hint?: boolean) =>
    [hint ? id(`${name}-hint`) : "", errors[name] ? id(`${name}-error`) : ""].filter(Boolean).join(" ") || undefined;
  const ErrorText = ({ name }: { name: FieldName }) =>
    errors[name] ? (
      <p id={id(`${name}-error`)} className="mt-1.5 text-[14px] text-red-300">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="a-card space-y-6" aria-describedby={id("intro")}>
      <p id={id("intro")} className="text-[14px] text-[var(--a-muted)]">
        שדות שמסומנים ב־<span aria-hidden="true">*</span>
        <span className="sr-only">כוכבית</span> הם חובה.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id("fullName")} className="text-[15px] font-semibold text-[var(--a-ink)]">
            שם מלא <span aria-hidden="true">*</span>
          </label>
          <input
            id={id("fullName")}
            name="fullName"
            autoComplete="name"
            required
            value={fields.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            onFocus={markStarted}
            aria-invalid={!!errors.fullName}
            aria-describedby={describedBy("fullName")}
            className={`${inputBase} ${border("fullName")}`}
          />
          <ErrorText name="fullName" />
        </div>
        <div>
          <label htmlFor={id("business")} className="text-[15px] font-semibold text-[var(--a-ink)]">
            עסק או תחום פעילות <span className="font-normal text-[var(--a-muted)]">(לא חובה)</span>
          </label>
          <input
            id={id("business")}
            name="business"
            autoComplete="organization"
            value={fields.business}
            onChange={(e) => set("business", e.target.value)}
            onFocus={markStarted}
            className={`${inputBase} ${border("business")}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor={id("contact")} className="text-[15px] font-semibold text-[var(--a-ink)]">
          טלפון או דואר אלקטרוני <span aria-hidden="true">*</span>
        </label>
        <input
          id={id("contact")}
          name="contact"
          dir="auto"
          required
          value={fields.contact}
          onChange={(e) => set("contact", e.target.value)}
          onFocus={markStarted}
          aria-invalid={!!errors.contact}
          aria-describedby={describedBy("contact", true)}
          className={`${inputBase} ${border("contact")} text-start`}
        />
        <p id={id("contact-hint")} className="mt-1.5 text-[14px] text-[var(--a-muted)]">
          איך הכי נוח שאחזור אליכם.
        </p>
        <ErrorText name="contact" />
      </div>

      <div>
        <label htmlFor={id("process")} className="text-[15px] font-semibold text-[var(--a-ink)]">
          איזה תהליך הייתם רוצים לשפר? <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={id("process")}
          name="process"
          rows={5}
          required
          value={fields.process}
          onChange={(e) => set("process", e.target.value)}
          onFocus={markStarted}
          aria-invalid={!!errors.process}
          aria-describedby={describedBy("process", true)}
          className={`${inputBase} ${border("process")} resize-y leading-relaxed`}
        />
        <p id={id("process-hint")} className="mt-1.5 text-[14px] leading-relaxed text-[var(--a-muted)]">
          מה קורה היום ואיפה זה נתקע. למשל: "כל ליד מהאתר אני מעתיק ידנית לגיליון ושולח לו הודעה". אין צורך לפרט
          שמות של לקוחות, מידע רפואי או פיננסי.
        </p>
        <ErrorText name="process" />
      </div>

      <div>
        <label htmlFor={id("tools")} className="text-[15px] font-semibold text-[var(--a-ink)]">
          באילו כלים או מערכות אתם משתמשים היום? <span className="font-normal text-[var(--a-muted)]">(לא חובה)</span>
        </label>
        <input
          id={id("tools")}
          name="tools"
          value={fields.tools}
          onChange={(e) => set("tools", e.target.value)}
          onFocus={markStarted}
          aria-describedby={id("tools-hint")}
          className={`${inputBase} ${border("tools")}`}
        />
        <p id={id("tools-hint")} className="mt-1.5 text-[14px] text-[var(--a-muted)]">
          למשל: גיליון אקסל, וואטסאפ, Gmail, מערכת הנהלת חשבונות. גם "לא בטוח" זו תשובה טובה.
        </p>
      </div>

      <fieldset>
        <legend className="text-[15px] font-semibold text-[var(--a-ink)]">
          כמה פעמים התהליך קורה? <span className="font-normal text-[var(--a-muted)]">(לא חובה)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {frequencyOptions.map((opt) => {
            const on = fields.frequency === opt.value;
            return (
              <label
                key={opt.value}
                className={`cursor-pointer rounded-full border px-4 py-2 text-[15px] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--a-accent)] ${
                  on
                    ? "border-[var(--a-accent)] bg-[var(--a-accent)]/15 text-[var(--a-ink)]"
                    : "border-[var(--a-line)] text-[var(--a-muted)] hover:text-[var(--a-ink)]"
                }`}
              >
                <input
                  type="radio"
                  name="frequency"
                  value={opt.value}
                  checked={on}
                  onChange={() => set("frequency", opt.value)}
                  className="sr-only"
                />
                {opt.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Honeypot for bots. Hidden from people and from assistive tech. */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label>
          אתר
          <input tabIndex={-1} autoComplete="off" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-[var(--a-ink)]">
          <input
            type="checkbox"
            name="consent"
            checked={fields.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
            className="mt-1 h-[18px] w-[18px] flex-none accent-[#bf95f9]"
          />
          <span>
            אני מאשר/ת שתום כהן יחזור אליי בנוגע לפנייה הזו. <span aria-hidden="true">*</span>
            <span className="mt-1 block text-[14px] text-[var(--a-muted)]">
              הפרטים משמשים רק לטיפול בפנייה.{" "}
              <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-[var(--a-ink)]">
                מדיניות הפרטיות (באנגלית)
              </Link>
            </span>
          </span>
        </label>
        <ErrorText name="consent" />
      </div>

      {(status === "error" || status === "rate_limited") && (
        <div ref={errorRef} tabIndex={-1} role="alert" className="rounded-xl border border-red-400/50 bg-red-400/[0.07] px-4 py-3 text-[15px] leading-relaxed text-[var(--a-ink)] outline-none">
          {status === "rate_limited" ? (
            <>נשלחו כמה פניות ברצף. נסו שוב בעוד דקה.</>
          ) : (
            <>
              משהו השתבש והפנייה לא נשלחה. אפשר לנסות שוב, או לפנות אליי ישירות בטלפון{" "}
              <a href={`tel:${CONTACT.phoneTel}`} className="font-semibold underline" dir="ltr">
                {CONTACT.phoneDisplay}
              </a>{" "}
              או בדואר אלקטרוני{" "}
              <a href={`mailto:${CONTACT.email}`} className="font-semibold underline" dir="ltr">
                {CONTACT.email}
              </a>
              .
            </>
          )}
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="a-btn a-btn-solid w-full justify-center disabled:cursor-wait disabled:opacity-70">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            שולח…
          </>
        ) : (
          "לתיאום שיחת היכרות"
        )}
      </button>
    </form>
  );
};

export const ContactSection = ({ seed }: { seed: string[] }) => (
  <section id="contact" aria-labelledby="contact-title" className="a-grid-bg border-t border-[var(--a-line)]">
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
      <div>
        <p className="a-kicker">בואו נדבר</p>
        <h2 id="contact-title" className="a-h2">
          יש תהליך שחוזר על עצמו שוב ושוב?
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--a-muted)]">
          כתבו לי מה קורה היום, באילו כלים אתם משתמשים ואיפה התהליך נתקע. נבדוק אם אוטומציה יכולה לעזור, מה נכון
          לבדוק קודם, ומה הצעד הקטן ביותר שייתן תשובה אמיתית.
        </p>
        <ul className="mt-8 space-y-3 text-[16px]">
          <li>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              onClick={() => track("automation_contact_click", { method: "phone", location: "contact" })}
              className="inline-flex items-center gap-3 text-[var(--a-ink)] hover:text-[var(--a-accent)]"
            >
              <Phone className="h-5 w-5 text-[var(--a-accent)]" aria-hidden="true" />
              <span className="sr-only">טלפון: </span>
              <span dir="ltr">{CONTACT.phoneDisplay}</span>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${CONTACT.email}`}
              onClick={() => track("automation_contact_click", { method: "email", location: "contact" })}
              className="inline-flex items-center gap-3 text-[var(--a-ink)] hover:text-[var(--a-accent)]"
            >
              <Mail className="h-5 w-5 text-[var(--a-accent)]" aria-hidden="true" />
              <span className="sr-only">דואר אלקטרוני: </span>
              <span dir="ltr">{CONTACT.email}</span>
            </a>
          </li>
        </ul>
        <div className="mt-10 rounded-2xl border border-dashed border-[var(--a-accent)]/40 p-5">
          <p className="a-hand text-[26px] leading-tight text-[var(--a-accent)]">אגב, הטופס הזה הוא אוטומציה קטנה</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--a-muted)]">
            כשתשלחו, הפנייה נשמרת במסד נתונים ומגיעה אליי במייל. אין בה AI, ואין בו צורך: כאן חיבור פשוט עושה את
            העבודה בצורה האמינה ביותר.
          </p>
        </div>
      </div>
      <LeadForm seed={seed} />
    </div>
  </section>
);
