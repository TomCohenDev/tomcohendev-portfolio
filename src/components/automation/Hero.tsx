import { useLayoutEffect, useState } from "react";
import { Check, Hand } from "lucide-react";
import { track } from "@/lib/analytics";
import { DoodleUnderline } from "./Chrome";

// Illustrative run of a typical small-business automation. Shown and labelled as a demo.
const RUN = [
  { time: "09:02", text: "פנייה חדשה הגיעה מהטופס באתר" },
  { time: "09:02", text: "סווגה כבקשה להצעת מחיר ותויגה" },
  { time: "09:02", text: "נפתחה משימה במערכת הלקוחות" },
  { time: "09:03", text: "נשלח ללקוח אישור שהפנייה התקבלה" },
];

const RunLog = () => {
  // Steps are visible by default. The staggered reveal (.a-step in automation.css) only starts once
  // the browser actually renders a frame, so renderers that never paint frames still show the content.
  const [animate, setAnimate] = useState(false);
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const stepClass = animate ? "a-step " : "";
  const delay = (i: number) => (animate ? { animationDelay: `${0.5 + i * 0.45}s` } : undefined);

  return (
    <figure className="relative">
      <div className="a-card relative overflow-hidden !p-0 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between border-b border-[var(--a-line)] px-5 py-3">
          <span className="text-sm font-semibold text-[var(--a-ink)]">פנייה חדשה ← הצעת מחיר</span>
          <span className="rounded-full border border-[var(--a-accent)]/40 px-2.5 py-0.5 text-xs font-medium text-[var(--a-accent)]">
            הדגמה
          </span>
        </div>
        <ol className="space-y-1 px-3 py-4" aria-label="שלבי התהליך בהדגמה">
          {RUN.map((step, i) => (
            <li key={step.text} style={delay(i)} className={`${stepClass}flex items-center gap-3 rounded-lg px-2 py-2`}>
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--a-ok)]/15 text-[var(--a-ok)]">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">הושלם:</span>
              </span>
              <span className="flex-1 text-[15px] text-[var(--a-ink)]">{step.text}</span>
              <time dir="ltr" className="font-mono text-xs text-[var(--a-muted)]">
                {step.time}
              </time>
            </li>
          ))}
          <li
            style={delay(RUN.length)}
            className={`${stepClass}mt-2 rounded-xl border border-dashed border-[var(--a-human)]/60 bg-[var(--a-human)]/[0.07] px-3 py-3`}
          >
            <div className="flex items-center gap-3">
              <span className="a-pulse flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--a-human)]/20 text-[var(--a-human)]">
                <Hand className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="flex-1 text-[15px] font-medium text-[var(--a-ink)]">
                טיוטת הצעת מחיר מוכנה. ממתינה לאישור שלך
              </span>
            </div>
            <div className="mt-3 flex gap-2 ps-9 text-xs" aria-hidden="true">
              <span className="rounded-md bg-[var(--a-human)] px-3 py-1 font-semibold text-[#1D201F]">לאשר ולשלוח</span>
              <span className="rounded-md border border-[var(--a-line)] px-3 py-1 text-[var(--a-muted)]">לערוך</span>
            </div>
          </li>
        </ol>
      </div>
      <figcaption className="mt-3 text-center text-[13px] text-[var(--a-muted)]">
        תרחיש לדוגמה להמחשה. לא נתונים של לקוח.
      </figcaption>
      <div className="pointer-events-none mt-1 hidden items-start justify-end gap-1 text-[var(--a-accent)] md:flex" aria-hidden="true">
        <p className="a-hand mt-6 text-[26px] leading-none">כאן האוטומציה עוצרת ומחכה לאדם</p>
        <svg viewBox="0 0 60 60" fill="none" className="h-14 w-14">
          <path d="M8 54C10 36 20 18 44 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="a-draw" />
          <path d="M32 6L45 7L40 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </figure>
  );
};

export const Hero = () => (
  <section aria-labelledby="hero-title" className="a-grid-bg relative overflow-hidden">
    <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-14 md:px-8 md:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-32">
      <div>
        <p className="a-hand mb-3 text-[28px] text-[var(--a-accent)]">אוטומציה לעסקים וליחידים</p>
        <h1 id="hero-title" className="text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[var(--a-ink)] sm:text-6xl lg:text-[4.1rem]">
          פחות עבודה ידנית.
          <br />
          <span className="relative inline-block">
            יותר זמן לעבודה
            <DoodleUnderline className="absolute -bottom-2 start-0 h-3 w-full text-[var(--a-accent)]" />
          </span>{" "}
          שחשובה באמת.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--a-muted)] md:text-xl">
          אני תום כהן. אני מאפיין ובונה אוטומציות וכלים שמחברים בין המערכות שכבר יש לכם, חוסכים פעולות חוזרות
          והופכים תהליך מסורבל לדרך עבודה ברורה. מתחילים מתהליך אחד שאפשר למדוד, בונים פתרון ממוקד ובודקים שהוא
          באמת מתאים לעבודה היומיומית.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#contact" onClick={() => track("automation_cta_click", { location: "hero" })} className="a-btn a-btn-solid">
            בואו נבדוק מה אפשר להפוך לאוטומטי
          </a>
          <a href="#work" onClick={() => track("automation_cta_click", { location: "hero_examples" })} className="a-btn a-btn-ghost">
            לצפייה בדוגמאות
          </a>
        </div>
        {/* TODO(tom): confirm the intro call is free and without obligation before publishing. */}
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--a-muted)]">
          שיחת היכרות קצרה וללא התחייבות. אם אוטומציה היא לא הפתרון הנכון, אגיד את זה ישירות.
        </p>
      </div>
      <RunLog />
    </div>
  </section>
);
