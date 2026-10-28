import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Fragment } from "react";
import { experience, faqs, fields, principles, processSteps } from "./content";
import { SketchArrow, SketchCircle } from "./Doodles";

export const ProcessSection = () => (
  <section id="process" aria-labelledby="process-title" className="border-t border-[var(--a-line)] bg-[#171a19]">
    <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-8 max-md:justify-center">
        <div>
          <p className="a-kicker">איך עובדים</p>
          <h2 id="process-title" className="a-h2 max-w-2xl max-md:mx-auto">
            חמישה שלבים, מהתהליך הידני ועד פתרון שעובד בשגרה
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--a-muted)] max-md:mx-auto">
            אני מאפיין ובונה אוטומציות וכלים שמחברים בין המערכות שכבר יש לכם, חוסכים פעולות חוזרות והופכים תהליך
            מסורבל לדרך עבודה ברורה. מתחילים מתהליך אחד שאפשר למדוד, בונים פתרון ממוקד ובודקים שהוא באמת מתאים לעבודה
            היומיומית.
          </p>
        </div>
        <img
            src="/automation/process.svg"
            alt=""
            width={1354}
            height={469}
            loading="lazy"
            className="hidden w-72 -scale-x-100 md:block lg:w-80"
          />
      </div>
      {/* Wide screens: steps in a row, right to left, joined by hand-drawn arrows.
          Phones: a compact zigzag. Each step is a row (number beside the text) and the number swaps sides
          from step to step, with a small diagonal arrow leading to the next one. */}
      <ol className="mt-12 flex flex-col gap-1 md:mt-16 md:flex-row md:items-start md:gap-1">
        {processSteps.map((step, i) => {
          const flip = i % 2 === 1;
          return (
            <Fragment key={step.title}>
              <li
                className={`flex items-start gap-4 rounded-2xl border border-[var(--a-line)] bg-[#1D201F]/60 p-4 text-start md:flex-1 md:flex-col md:items-center md:gap-0 md:border-0 md:bg-transparent md:p-0 md:text-center md:max-w-[12rem] ${
                  flip ? "max-md:flex-row-reverse max-md:text-end" : ""
                }`}
              >
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center md:h-16 md:w-16">
                  <SketchCircle seed={i * 1.7} className="absolute inset-0 h-full w-full text-[var(--a-accent)]" />
                  <span className="a-hand text-[22px] leading-none text-[var(--a-ink)] md:text-[28px]">{i + 1}</span>
                </span>
                <div className="min-w-0">
                  <h3 className="a-hand text-[20px] leading-tight text-[var(--a-accent)] md:mt-3 md:text-[22px]">{step.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-[var(--a-muted)] md:mt-2 md:text-[15px]">{step.body}</p>
                </div>
              </li>
              {i < processSteps.length - 1 && (
                <li aria-hidden="true" className="flex shrink-0 items-center justify-center md:mt-1 md:w-16 lg:w-20">
                  <SketchArrow dip={i % 2 === 1} className="hidden w-16 text-[var(--a-human)] md:block lg:w-20" />
                  <SketchArrow
                    className={`h-7 w-10 text-[var(--a-human)] md:hidden ${flip ? "rotate-[30deg] -scale-x-100" : "-rotate-[30deg]"}`}
                  />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </div>
  </section>
);

export const ApproachSection = () => (
  <section aria-labelledby="approach-title" className="border-t border-[var(--a-line)]">
    <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <h2 id="approach-title" className="a-kicker">
            מי אני ואיך אני עובד
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--a-muted)]">
            אני מפתח <bdi>Full-stack</bdi> עם חמש שנות ניסיון בבניית מוצרים מקצה לקצה. עבדתי עם אנשים פרטיים, עם
            עסקים קטנים ועם סטארטאפים קטנים וגדולים, ולצד המוצרים בניתי גם את התהליכים שמחברים ביניהם: הזמנות,
            תשלומים, דוחות ותוכן.
          </p>
          <p className="mt-6 text-[16px] leading-relaxed text-[var(--a-ink)]">
            אני לומד את התהליך, בוחר את הפתרון הקטן ביותר שמתאים, בונה ובודק אותו, ומוסר אותו בצורה שאפשר להבין
            ולתפעל.
          </p>
        </div>

        <div>
          <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {principles.map((p) => (
              <li key={p.title} className="border-s-2 border-[var(--a-accent)]/40 ps-4 max-md:border-s-0 max-md:ps-0">
                <h3 className="text-lg font-bold text-[var(--a-ink)]">{p.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--a-muted)]">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-16 grid gap-4 md:grid-cols-3">
        {experience.map((e) => (
          <li key={e.value} className="a-card">
            <p className="text-2xl font-medium text-[var(--a-accent)]">{e.value}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--a-muted)]">{e.label}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-2.5">
        <span className="text-[15px] text-[var(--a-ink)]">תחומים שעבדתי בהם:</span>
        <ul className="flex flex-wrap gap-2">
          {fields.map((f) => (
            <li key={f} className="rounded-full border border-[var(--a-line)] px-3 py-1 text-[14px] text-[var(--a-muted)]">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export const FaqSection = () => (
  <section id="faq" aria-labelledby="faq-title" className="border-t border-[var(--a-line)]">
    <div className="mx-auto max-w-3xl px-5 py-24 md:px-8">
      <h2 id="faq-title" className="a-h2">
        שאלות שעולות בדרך כלל
      </h2>
      <Accordion type="single" collapsible dir="rtl" className="mt-10">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`} className="border-[var(--a-line)]">
            <AccordionTrigger className="gap-4 py-5 text-start text-lg max-md:text-center font-semibold text-[var(--a-ink)] hover:no-underline [&>svg]:text-[var(--a-accent)]">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-[16px] leading-relaxed text-[var(--a-muted)]">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
