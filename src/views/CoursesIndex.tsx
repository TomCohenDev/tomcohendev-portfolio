import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Ticket } from "lucide-react";
import { ContentPage, PageIntro, Tag } from "@/components/content/ContentPage";
import { courses, courseTypes, dayNumber, monthShort, type Course, type CourseType } from "@/components/content/mock";
import { Squiggle } from "@/components/automation/Doodles";
import { HOME_WHATSAPP } from "@/components/home/content";

export const TITLE = "קורסים ומפגשים | תום כהן";
export const DESCRIPTION = "קורסים, מפגשים פתוחים, סדנאות לצוותים ושעות אחד על אחד: אפליקציות, אוטומציה ו־AI לעסקים.";

const statusLabel: Record<Course["status"], string> = { open: "ההרשמה פתוחה", soon: "ההרשמה תיפתח בקרוב", past: "היה" };

/** The date as a small calendar leaf, or "בתיאום" when it is set per person. */
export const Leaf = ({ course }: { course: Course }) => {
  const color = courseTypes[course.type].color;
  return (
    <span aria-hidden="true" className="c-leaf flex h-[76px] w-[66px] shrink-0 flex-col overflow-hidden rounded-xl border border-[var(--a-line)] bg-[#1d201f] text-center">
      <span className="py-1 text-[12px] font-medium text-[#1d201f]" style={{ background: color }}>
        {course.date ? monthShort(course.date) : "תאריך"}
      </span>
      <span className={`flex flex-1 items-center justify-center font-medium text-[var(--a-ink)] ${course.date ? "text-[28px]" : "text-[14px]"}`}>
        {course.date ? dayNumber(course.date) : "בתיאום"}
      </span>
    </span>
  );
};

const CourseCard = ({ course }: { course: Course }) => {
  const t = courseTypes[course.type];
  const past = course.status === "past";
  return (
    <a
      href={`/courses/${course.slug}`}
      className={`a-card group flex h-full flex-col transition-colors hover:border-[rgba(191,149,249,0.55)] ${past ? "opacity-75" : ""}`}
    >
      <span className="flex items-start gap-4">
        <Leaf course={course} />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <Tag color={t.color}>{t.label}</Tag>
            <span className={`text-[13px] ${course.status === "open" ? "text-[var(--a-ok)]" : "text-[var(--a-muted)]"}`}>{statusLabel[course.status]}</span>
          </span>
          <span className="mt-2 block text-xl font-medium leading-snug text-[var(--a-ink)]">{course.title}</span>
        </span>
      </span>
      <span className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--a-muted)]">{course.description}</span>
      <span className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--a-line)] pt-4 text-[14px] text-[var(--a-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" aria-hidden="true" />
          {course.date && course.time ? `${course.when}, ${course.time}` : course.when} · {course.length}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {course.where}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Ticket className="h-4 w-4" aria-hidden="true" />
          {course.price}
        </span>
      </span>
      <span className="mt-4 inline-flex items-center gap-1 text-[14px] text-[var(--a-accent)]">
        {past ? "לפרטים" : "לפרטים ולהרשמה"}
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
      </span>
    </a>
  );
};

const CoursesIndex = () => {
  const [type, setType] = useState<CourseType | null>(null);
  const match = (c: Course) => !type || c.type === type;
  const upcoming = courses.filter((c) => c.status !== "past" && match(c));
  const past = courses.filter((c) => c.status === "past" && match(c));

  return (
    <ContentPage>
      <section className="a-grid-bg border-b border-[var(--a-line)]">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-14 md:px-8 md:pt-20">
          <PageIntro
            kicker="קורסים ומפגשים"
            title={
              <>
                ללמוד{" "}
                <span className="relative inline-block">
                  לבנות
                  <Squiggle className="absolute -bottom-3 start-0 h-3 w-full text-[#f49ac1]" />
                </span>{" "}
                בעצמכם
              </>
            }
          >
            קורסים מעשיים, מפגשים פתוחים, סדנאות לצוותים ושעות אחד על אחד. בכל אחד כתוב מראש מה הסוג שלו ומה המחיר.
          </PageIntro>

          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="סינון לפי סוג">
            {([null, ...(Object.keys(courseTypes) as CourseType[])] as const).map((k) => {
              const on = type === k;
              const color = k ? courseTypes[k].color : "var(--a-accent)";
              return (
                <button
                  key={k ?? "all"}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setType(k)}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[15px] transition-colors"
                  style={on ? { background: color, borderColor: color, color: "#1D201F" } : { borderColor: "var(--a-line)", color: "var(--a-muted)" }}
                >
                  {k && <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: on ? "#1D201F" : color }} />}
                  {k ? courseTypes[k].label : "הכול"}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="upcoming-title" className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <h2 id="upcoming-title" className="text-2xl font-medium text-[var(--a-ink)]">
          בקרוב
        </h2>
        {upcoming.length ? (
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {upcoming.map((c) => (
              <li key={c.slug}>
                <CourseCard course={c} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-[var(--a-muted)]">אין כרגע מפגשים מהסוג הזה. כתבו לי ונקבע.</p>
        )}

        {past.length > 0 && (
          <>
            <h2 className="mt-16 text-2xl font-medium text-[var(--a-ink)]">מפגשים שהיו</h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {past.map((c) => (
                <li key={c.slug}>
                  <CourseCard course={c} />
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-16 flex flex-col items-start gap-5 rounded-[1.25rem] border border-dashed border-[rgba(224,208,193,0.25)] p-6 md:flex-row md:items-center md:p-8">
          <div className="flex-1">
            <p className="text-xl font-medium text-[var(--a-ink)]">רוצים משהו אחר?</p>
            <p className="mt-1 text-[15px] leading-relaxed text-[var(--a-muted)]">נושא אחר, מועד אחר או סדנה רק לצוות שלכם. ספרו לי מה אתם צריכים.</p>
          </div>
          <a href={HOME_WHATSAPP} target="_blank" rel="noopener noreferrer" className="a-btn a-btn-ghost">
            לכתוב לי בוואטסאפ
            <span className="sr-only"> (נפתח בחלון חדש)</span>
          </a>
        </div>
      </section>
    </ContentPage>
  );
};

export default CoursesIndex;
