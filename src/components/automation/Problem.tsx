import { useState } from "react";
import { Check } from "lucide-react";
import { track } from "@/lib/analytics";
import { marketStats, pains } from "./content";

export const PainBoard = ({ onUse }: { onUse: (selected: string[]) => void }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));

  const use = () => {
    onUse(pains.filter((p) => selected.includes(p.id)).map((p) => p.text));
    track("automation_cta_click", { location: "pain_board", selected_count: selected.length });
  };

  return (
    <section id="problem" aria-labelledby="problem-title" className="border-t border-[var(--a-line)] bg-[#171a19]">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="a-kicker">נשמע מוכר?</p>
          <h2 id="problem-title" className="a-h2">
            איפה הזמן נעלם?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--a-muted)]">
            אוטומציה מתחילה בדרך כלל במקום קטן ומעצבן: מידע שמועתק שוב ושוב, ליד שנשכח, מסמך שמופק ידנית, משימה
            שעוברת בין כמה אנשים, או מערכת שלא מדברת עם המערכת שלידה. כשזה קורה כל יום, זה עולה בזמן, יוצר טעויות
            ומקשה להבין מה באמת קורה.
          </p>
          <p className="mt-6 border-s-2 border-[var(--a-accent)] ps-4 text-lg max-md:border-s-0 max-md:ps-0 font-medium leading-relaxed text-[var(--a-ink)]">
            המטרה היא לא להפוך הכול לאוטומטי. המטרה היא למצוא את הצעד החוזר שבו פתרון קטן יכול לעשות שינוי מועיל
            ומדיד.
          </p>
          <img
            src="/automation/pain.svg"
            alt=""
            width={1053}
            height={579}
            loading="lazy"
            className="mt-10 hidden w-full max-w-md lg:block"
          />
        </div>

        <div>
          <fieldset>
            <legend className="mb-4 text-[15px] text-[var(--a-muted)]">סמנו מה קורה אצלכם. אפשר לבחור כמה.</legend>
            <ul className="grid gap-2.5">
              {pains.map((pain) => {
                const on = selected.includes(pain.id);
                return (
                  <li key={pain.id}>
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 text-[16px] leading-snug transition-colors ${
                        on
                          ? "border-[var(--a-accent)]/70 bg-[var(--a-accent)]/[0.08] text-[var(--a-ink)]"
                          : "border-[var(--a-line)] text-[var(--a-ink)]/90 hover:border-[var(--a-ink)]/30"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggle(pain.id)}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--a-accent)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#171a19] ${
                          on ? "border-[var(--a-accent)] bg-[var(--a-accent)] text-[#1D201F]" : "border-[var(--a-muted)]/60"
                        }`}
                      >
                        {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                      </span>
                      {pain.text}
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <div className="mt-5 flex min-h-[48px] flex-wrap items-center gap-4" aria-live="polite">
            {selected.length > 0 ? (
              <>
                <p className="text-[15px] text-[var(--a-ink)]">
                  {selected.length === 1 ? "סימנתם דבר אחד." : `סימנתם ${selected.length} דברים.`} זו נקודת פתיחה טובה
                  לשיחה.
                </p>
                <a href="#contact" onClick={use} className="a-btn a-btn-ghost !py-2.5 text-[15px]">
                  להעביר את זה לטופס הפנייה
                </a>
              </>
            ) : (
              <p className="text-[15px] text-[var(--a-muted)]">מה שתסמנו יעבור לטופס בסוף העמוד, כדי שלא תצטרכו לכתוב מאפס.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const MarketContext = () => (
  <section aria-labelledby="market-title" className="border-t border-[var(--a-line)]">
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <h2 id="market-title" className="mx-auto max-w-3xl text-center text-2xl font-medium leading-snug text-[var(--a-ink)] md:text-[2rem]">
        הרבה עסקים כבר משתמשים בבינה מלאכותית. רובם, בינתיים, בעיקר לכתיבה.
      </h2>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {marketStats.map((stat) => (
          <li key={stat.label} className="a-card text-center">
            <p className="text-4xl font-extrabold tracking-tight text-[var(--a-accent)] md:text-[2.75rem]">
              <span dir="ltr" aria-hidden="true" className="tabular-nums">
                {stat.value}
              </span>
              <span className="sr-only">{stat.srValue}</span>
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--a-ink)]">{stat.label}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
