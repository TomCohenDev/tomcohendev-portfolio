import { type ReactNode, useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import "@/components/automation/automation.css";
import { FaqSection } from "@/components/automation/Approach";
import { AutomationFooter, AutomationHeader } from "@/components/automation/Chrome";
import { LeadForm } from "@/components/automation/LeadForm";
import {
  adoption,
  courseDetails,
  courseFaqs,
  highlights,
  pains,
  skills,
  stats,
  syllabus,
} from "@/components/course/content";
import {
  FlowDoodle,
  highlightIcons,
  ManualDoodle,
  painIcons,
  RoadDoodle,
  StepsDoodle,
} from "@/components/course/CourseDoodles";
import { track } from "@/lib/analytics";

// Page title and description; src/pages/courses/business-automation.astro puts them in the HTML head.
export const TITLE = "קורס אוטומציה עסקית עם AI | תום כהן";
export const DESCRIPTION =
  "קורס מעשי לבעלי עסקים, לאנשי תפעול, שיווק, מכירות ושירות ולכל מי שרוצה להיכנס לתחום: 10 מפגשים שבהם בונים תהליך אוטומטי אמיתי, גם בלי רקע בתכנות.";

const COURSE_NAME = "קורס אוטומציה עסקית עם AI";
const CTA_LABEL = "לפרטים על המחזור הקרוב";

const H2 = "text-balance text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.2] text-[var(--a-ink)]";
const CONTAINER = "mx-auto max-w-6xl px-5 md:px-8";
const LEAD = "text-pretty text-lg leading-relaxed text-[var(--a-muted)]";

const Section = ({
  id,
  title,
  eyebrow,
  shaded = false,
  seamless = false,
  centered = false,
  children,
}: {
  id: string;
  title: ReactNode;
  eyebrow?: string;
  shaded?: boolean;
  /** No line on top, for a section that follows one fading into the page background. */
  seamless?: boolean;
  centered?: boolean;
  children: ReactNode;
}) => (
  <section id={id} aria-labelledby={`${id}-title`} className={`${seamless ? "" : "border-t border-[var(--a-line)]"} ${shaded ? "bg-[#171a19]" : ""}`}>
    <div className={`${CONTAINER} py-16 md:py-20`}>
      {eyebrow && <p className={`text-[15px] font-medium text-[var(--a-accent)] ${centered ? "text-center" : ""}`}>{eyebrow}</p>}
      <h2 id={`${id}-title`} className={`${H2} mt-2 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
        {title}
      </h2>
      {children}
    </div>
  </section>
);

const Cta = ({ location, className = "" }: { location: string; className?: string }) => (
  <a
    href="#contact"
    onClick={() => track("course_cta_click", { location })}
    className={`a-btn a-btn-solid justify-center whitespace-nowrap ${className}`}
  >
    {CTA_LABEL}
    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
  </a>
);

const Hero = () => (
  <section id="overview" aria-labelledby="hero-title">
    <div
      className={`${CONTAINER} grid grid-cols-[minmax(0,1fr)] items-center gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16`}
    >
      <div>
        <h1 id="hero-title" className="text-balance text-[clamp(2.2rem,4.6vw,3.5rem)] font-medium leading-[1.12] text-[var(--a-ink)]">
          {COURSE_NAME}
        </h1>
        <p className="mt-5 text-pretty text-xl font-medium leading-snug text-[var(--a-accent)] md:text-2xl">
          להפוך תהליכים חוזרים בעסק לאוטומציות שעובדות
        </p>
        <p className={`${LEAD} mt-5 max-w-[38rem]`}>
          קורס מעשי לבעלי עסקים, לאנשי תפעול, שיווק, מכירות ושירות ולכל מי שרוצה להיכנס לתחום: לחבר בין כלים, לשלב AI בצורה אחראית, ולבנות תהליך
          אוטומטי אמיתי, גם בלי רקע בתכנות.
        </p>
        <FlowDoodle className="mt-8 w-full max-w-[34rem] max-lg:mx-auto" />
      </div>
      <aside aria-label="פרטי הקורס" className="rounded-2xl border border-[var(--a-line)] bg-[#222524] p-6 md:p-7">
        <dl>
          {courseDetails.map((d) => (
            <div key={d.label} className="flex items-baseline justify-between gap-6 border-b border-[var(--a-line)] py-3 first:pt-0">
              <dt className="text-[15px] text-[var(--a-muted)]">{d.label}</dt>
              <dd dir={d.ltr ? "ltr" : undefined} className="text-end text-[16px] font-medium text-[var(--a-ink)]">
                {d.value}
              </dd>
            </div>
          ))}
        </dl>
        <Cta location="hero" className="mt-6 w-full" />
      </aside>
    </div>
  </section>
);

const Highlights = () => (
  <section aria-label="הקורס בקצרה" className="border-t border-[var(--a-line)] bg-[#171a19]">
    <ul className={`${CONTAINER} grid gap-x-10 gap-y-8 py-12 sm:grid-cols-2 lg:grid-cols-4`}>
      {highlights.map((h, i) => {
        const Picture = highlightIcons[i];
        return (
          <li key={h.title}>
            <Picture className="mb-3 h-14 w-14 max-md:mx-auto" />
            <h2 className="text-lg font-medium text-[var(--a-ink)]">{h.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--a-muted)]">{h.body}</p>
          </li>
        );
      })}
    </ul>
  </section>
);

const Stats = () => (
  <Section id="data" title="יותר ויותר עסקים עובדים עם AI">
    <div className="mt-8 grid items-center gap-8 rounded-3xl border border-[rgba(191,149,249,0.35)] bg-[linear-gradient(to_left,rgba(191,149,249,0.14),transparent)] p-6 md:p-9 lg:grid-cols-2 lg:gap-14">
      <div>
        <p dir="ltr" className="text-end text-[clamp(4rem,9vw,6.5rem)] font-medium leading-none text-[var(--a-accent)] max-md:text-center">
          {adoption.value}
        </p>
        <p className="mt-3 text-pretty text-2xl font-medium leading-snug text-[var(--a-ink)]">{adoption.label}</p>
      </div>
      <div>
        <p className="text-lg font-medium text-[var(--a-ink)]">{adoption.rise}</p>
        <ul className="mt-4 space-y-3">
          {adoption.points.map((point, i) => (
            <li key={point.when} className="text-start">
              <div className="flex items-baseline justify-between gap-4 text-[15px]">
                <span className="text-[var(--a-muted)]">{point.when}</span>
                <span dir="ltr" className="font-medium text-[var(--a-ink)]">
                  {point.percent}%
                </span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${i === 0 ? "bg-[var(--a-muted)]" : "bg-[var(--a-accent)]"}`}
                  style={{ width: `${point.percent}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <ul className="mt-4 grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <li key={stat.value} className="rounded-2xl border border-[var(--a-line)] bg-[#222524] p-6">
          <p dir="ltr" className="text-end text-5xl font-medium leading-none text-[var(--a-accent)] max-md:text-center">
            {stat.value}
          </p>
          <p className="mt-3 text-[17px] font-medium leading-snug text-[var(--a-ink)]">{stat.label}</p>
        </li>
      ))}
    </ul>
  </Section>
);

const QuickLead = ({ id, title, intro, anchor }: { id: string; title: string; intro?: string; anchor?: string }) => (
  <section
    id={anchor}
    aria-labelledby={id}
    className="bg-[radial-gradient(50%_55%_at_50%_50%,rgba(191,149,249,0.1),transparent),linear-gradient(#1d201f,#0f1110_30%,#0f1110_70%,#1d201f)]"
  >
    <div className={`${CONTAINER} py-24 md:py-32`}>
      <div className="text-center">
        <h2 id={id} className={`${H2} mx-auto`}>
          {title}
        </h2>
        {intro && <p className={`${LEAD} mx-auto mt-3 max-w-xl`}>{intro}</p>}
      </div>
      <div className="mx-auto mt-8 max-w-5xl">
        <LeadForm site="course" inline />
      </div>
    </div>
  </section>
);

const Problem = () => (
  <Section id="problem" seamless centered eyebrow="למה הקורס הזה" title="העסק עובד. אבל יותר מדי מהעבודה עדיין נעשית ידנית.">
    <p className={`${LEAD} mx-auto mt-5 max-w-3xl text-center`}>
      הרבה עסקים מבזבזים שעות על עבודה שמערכת יכולה לעשות לבד, פשוט כי הם לא יודעים שזה אפשרי. לידים, מיילים, מסמכים ודוחות יכולים לעבור בין המערכות
      אוטומטית, ואתם נכנסים לתמונה רק כשצריך החלטה של אדם. בקורס תגלו מה אפשר להפוך לאוטומטי אצלכם, תבחרו את התהליך ששווה הכי הרבה, ותבנו אותו בעצמכם.
    </p>
    <div className="mt-10 grid gap-4 lg:grid-cols-2">
      <ul className="grid auto-rows-fr gap-3">
        {pains.map((pain, i) => {
          const Picture = painIcons[i];
          return (
            <li
              key={pain}
              className="flex items-center justify-start gap-4 rounded-2xl border border-[var(--a-line)] bg-[#222524] p-3 text-start transition-colors hover:border-[rgba(191,149,249,0.5)]"
            >
              <span className="shrink-0 rounded-xl bg-[#171a19] p-1.5">
                <Picture className="h-12 w-12" />
              </span>
              <span className="text-[16px] font-medium leading-snug text-[var(--a-ink)]">{pain}</span>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-center rounded-2xl border border-[var(--a-line)] bg-[#222524] p-6">
        <ManualDoodle className="w-full" />
      </div>
    </div>
  </Section>
);

const Outcome = () => (
  <Section id="outcome" shaded eyebrow="על הקורס" title="בוחרים תהליך אמיתי מהעסק, ממפים אותו, בונים גרסה אוטומטית ראשונה ובודקים אותה.">
    <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className={LEAD}>
          בסיום הקורס המטרה היא לצאת עם אב־טיפוס עובד ומדוד לתהליך אחד, למשל קליטת לידים, מעקב אחרי פניות, סיווג מסמכים, יצירת משימות, עדכון CRM או
          הפקת דוח. תלמדו גם להסביר איך הפתרון עובד, היכן הוא עלול להיכשל, מה עלותו השוטפת ומה צריך להשלים לפני שימוש רחב בעסק.
        </p>
        <StepsDoodle className="mt-8 w-full max-w-[32rem] max-lg:mx-auto" />
      </div>
      <div>
        <h3 className="text-xl font-medium text-[var(--a-ink)]">מה תלמדו לעשות</h3>
        <ul className="mt-5 space-y-3.5">
          {skills.map((skill) => (
            <li key={skill} className="flex items-start justify-start gap-3 text-start text-[16px] leading-relaxed text-[var(--a-ink)]">
              <Check className="mt-1 h-5 w-5 shrink-0 text-[var(--a-accent)]" aria-hidden="true" />
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);

const Syllabus = () => (
  <Section id="syllabus" centered eyebrow="סילבוס" title="עשרה מפגשים, מהרעיון ועד פרויקט מוצג">
    <p className={`${LEAD} mx-auto mt-4 max-w-2xl text-center`}>
      מפגש שבועי אחד, <span dir="ltr">17:00–21:00</span>. בכל מפגש מתקדמים גם בפרויקט האישי. החלוקה עשויה להשתנות לפי רמת הקבוצה וקצב הפרויקטים.
    </p>
    <RoadDoodle className="mx-auto mt-6 w-full max-w-lg" />
    <ol className="mt-8 grid gap-x-12 md:grid-flow-col md:grid-cols-2 md:grid-rows-5">
      {syllabus.map((session, i) => (
        <li key={session.topic} className="border-t border-[var(--a-line)] py-3.5 text-center">
          <span dir="ltr" className="block text-[15px] tabular-nums text-[var(--a-accent)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-[17px] font-medium leading-snug text-[var(--a-ink)]">{session.topic}</h3>
            <p className="mt-0.5 text-[15px] leading-relaxed text-[var(--a-muted)]">{session.result}</p>
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

const Lecturer = () => (
  <Section id="lecturer" seamless eyebrow="המרצה" title="תום כהן">
    <div className="mt-8 grid items-start gap-8 md:grid-cols-[11rem_minmax(0,1fr)] lg:gap-12">
      <img src="/tom_face.webp" alt="תום כהן" width={383} height={383} loading="lazy" className="h-44 w-44 rounded-2xl object-cover max-md:mx-auto" />
      <div className="max-w-3xl space-y-4 text-[17px] leading-relaxed text-[var(--a-muted)]">
        <p>
          מפתח <bdi>Full-stack</bdi>, יזם ומרצה, עם חמש שנות ניסיון בבניית מוצרים דיגיטליים: אפליקציות, מערכות ווב וכלים שמשלבים AI ואוטומציה. עבד עם
          אנשים פרטיים, עסקים וסטארטאפים, ובנה תהליכים שרצים בעבודה היומיומית שלהם.
        </p>
        <p>
          לצד הפיתוח הוא מרצה בתחומי התכנות וההנדסה, מפתח ומעביר קורסים לשימוש מעשי ב־AI. השילוב הזה הוא מה שהוא מביא לקורס: ניסיון
          של מי שבונה את הדברים האלה בעצמו ויודע איפה הם נשברים, וניסיון בלפרק נושאים מורכבים לשלבים ברורים, גם למי שלא מגיע מעולם הפיתוח.
        </p>
      </div>
    </div>
  </Section>
);

/** Follows the reader once the hero's card is gone, and steps aside at the form and the footer. */
const StickyCta = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("#overview, #contact, .automation-page footer");
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setShow(onScreen.size === 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-[var(--a-line)] bg-[#1D201F]/95 backdrop-blur-md transition-transform duration-200 motion-reduce:transition-none ${
        show ? "translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <div className={`${CONTAINER} flex items-center justify-between gap-4 py-3`}>
        <p className="hidden text-[16px] font-medium text-[var(--a-ink)] sm:block">{COURSE_NAME}</p>
        <Cta location="sticky" className="!py-2.5 !text-[15px] max-sm:w-full" />
      </div>
    </div>
  );
};

const BusinessAutomationCourse = () => (
  <div className="automation-page min-h-screen" dir="rtl" lang="he">
    <AutomationHeader site="course" />
    <main id="main">
      <Hero />
      <Highlights />
      <Stats />
      <QuickLead id="quick-lead-title" title="רוצים לשמוע על המחזור הקרוב?" intro="השאירו פרטים ונחזור אליכם עם כל המידע על המחזור." />
      <Problem />
      <Outcome />
      <Syllabus />
      <QuickLead id="syllabus-lead-title" title="נשמע טוב, אני רוצה שתחזרו אליי" />
      <Lecturer />
      <FaqSection items={courseFaqs} />
      <QuickLead
        anchor="contact"
        id="contact-title"
        title="רוצים לשמוע על המחזור הקרוב?"
        intro="השאירו שם, טלפון ודואר אלקטרוני, ונחזור אליכם עם פרטי המחזור."
      />
    </main>
    <AutomationFooter site="course" />
    <StickyCta />
  </div>
);

export default BusinessAutomationCourse;
