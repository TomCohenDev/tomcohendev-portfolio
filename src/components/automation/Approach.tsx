import { ShieldCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { evidence, faqs, principles, processSteps } from "./content";

export const ProcessSection = () => (
  <section id="process" aria-labelledby="process-title" className="border-t border-[var(--a-line)] bg-[#171a19]">
    <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <p className="a-kicker">איך עובדים</p>
      <h2 id="process-title" className="a-h2 max-w-3xl">
        חמישה שלבים, מהתהליך הידני ועד פתרון שעובד בשגרה
      </h2>
      <ol className="relative mt-14 grid gap-8 md:grid-cols-5 md:gap-5">
        <span
          aria-hidden="true"
          className="absolute start-5 end-[calc(20%-1.75rem)] top-5 hidden border-t-2 border-dashed border-[var(--a-accent)]/35 md:block"
        />
        {processSteps.map((step, i) => (
          <li key={step.title} className="relative flex gap-4 md:block">
            <span className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 border-[var(--a-accent)] bg-[#171a19] text-[15px] font-bold text-[var(--a-accent)]">
              {i + 1}
            </span>
            <div className="md:mt-5">
              <h3 className="text-xl font-bold text-[var(--a-ink)]">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--a-muted)]">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-14 max-w-3xl rounded-2xl border border-[var(--a-line)] bg-[#1D201F] px-6 py-5 text-[16px] leading-relaxed text-[var(--a-ink)]">
        <span className="font-semibold">על היקף ומחיר: </span>
        היקף העבודה, לוח הזמנים והמחיר נקבעים אחרי אבחון קצר של התהליך, כשכבר ברור מה בונים ומה ייחשב הצלחה.
      </p>
    </div>
  </section>
);

export const ApproachSection = () => (
  <section aria-labelledby="approach-title" className="border-t border-[var(--a-line)]">
    <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <p className="a-kicker">מי אני ואיך אני עובד</p>
          <h2 id="approach-title" className="a-h2">
            לא קסם, ולא רק שעות פיתוח
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <img
              src="/tom_face.webp"
              alt="תום כהן"
              width={72}
              height={72}
              loading="lazy"
              className="h-[72px] w-[72px] rounded-full border-2 border-[var(--a-accent)]/50 object-cover"
            />
            <p className="text-[16px] leading-relaxed text-[var(--a-muted)]">
              אני מפתח <bdi>Full-stack</bdi> ובונה מוצרים מקצה לקצה. לצד מוצרים שלמים בניתי גם את התהליכים שמחברים
              ביניהם: הזמנות, תשלומים, דוחות ותוכן.
            </p>
          </div>
          <p className="mt-6 text-[16px] leading-relaxed text-[var(--a-ink)]">
            אני לומד את התהליך, בוחר את הפתרון הקטן ביותר שמתאים, בונה ובודק אותו, ומוסר אותו בצורה שאפשר להבין
            ולתפעל.
          </p>
        </div>

        <div>
          <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {principles.map((p) => (
              <li key={p.title} className="border-s-2 border-[var(--a-accent)]/40 ps-4">
                <h3 className="text-lg font-bold text-[var(--a-ink)]">{p.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--a-muted)]">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 rounded-2xl border border-[var(--a-line)] p-6">
            <h3 className="text-lg font-bold text-[var(--a-ink)]">ואיך זה נראה בעבודות למעלה</h3>
            <ul className="mt-4 divide-y divide-[var(--a-line)]">
              {evidence.map((e) => (
                <li key={e.claim} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                  <span className="text-[15px] text-[var(--a-ink)]">{e.claim}</span>
                  <span className="text-[13px] font-semibold text-[var(--a-accent)]">
                    <bdi>{e.where}</bdi>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CHECKS = [
  "אילו נתונים עוברים ולאן",
  "למי יש הרשאה",
  "מה קורה כששלב נכשל",
  "מה דורש אישור אנושי",
  "מה העלות השוטפת",
  "מי מתחזק את הפתרון",
];

export const TrustSection = () => (
  <section aria-labelledby="trust-title" className="border-t border-[var(--a-line)] bg-[#171a19]">
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
      <div>
        <ShieldCheck className="h-8 w-8 text-[var(--a-accent)]" aria-hidden="true" />
        <h2 id="trust-title" className="mt-4 text-3xl font-extrabold text-[var(--a-ink)] md:text-4xl">
          אוטומציה טובה צריכה לעבוד גם מחוץ להדגמה
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-[var(--a-muted)]">
          לכן כבר באפיון עוברים על הרשימה הזו. במידע רגיש מתחילים בהיקף מצומצם ומשתמשים בנתוני דוגמה כשאפשר.
          כשפרויקט נוגע במידע אישי, רפואי או פיננסי, בדיקה משפטית ואבטחתית מתאימה היא חלק מהגדרת הפרויקט.
        </p>
      </div>
      <ul className="a-card grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {CHECKS.map((c, i) => (
          <li key={c} className="flex items-center gap-3 text-[16px] text-[var(--a-ink)]">
            <span className="flex h-7 w-7 flex-none items-center justify-center rounded-md border border-[var(--a-accent)]/40 font-mono text-[13px] text-[var(--a-accent)]">
              {i + 1}
            </span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const FaqSection = () => (
  <section id="faq" aria-labelledby="faq-title" className="border-t border-[var(--a-line)]">
    <div className="mx-auto max-w-3xl px-5 py-24 md:px-8">
      <p className="a-kicker">שאלות</p>
      <h2 id="faq-title" className="a-h2">
        שאלות שעולות בדרך כלל
      </h2>
      <Accordion type="single" collapsible dir="rtl" className="mt-10">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`} className="border-[var(--a-line)]">
            <AccordionTrigger className="gap-4 py-5 text-start text-lg font-semibold text-[var(--a-ink)] hover:no-underline [&>svg]:text-[var(--a-accent)]">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-[16px] leading-relaxed text-[var(--a-muted)]">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
