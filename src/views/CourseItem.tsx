import { ArrowRight, CalendarDays, Check, Clock, MapPin, MessageCircle, Ticket } from "lucide-react";
import { ContentPage, Tag } from "@/components/content/ContentPage";
import { courseTypes, formatDay, type Course } from "@/components/content/mock";
import { Leaf } from "./CoursesIndex";

const whatsapp = (course: Course) =>
  `https://wa.me/972545552149?text=${encodeURIComponent(`היי תום, אשמח לפרטים על "${course.title}"`)}`;

const CourseItem = ({ course }: { course: Course }) => {
  const t = courseTypes[course.type];
  const past = course.status === "past";
  const facts = [
    { icon: CalendarDays, label: "מתי", value: course.date ? `${formatDay(course.date)}${course.time ? `, ${course.time}` : ""}` : course.when },
    { icon: Clock, label: "משך", value: course.length },
    { icon: MapPin, label: "איפה", value: course.where },
    { icon: Ticket, label: "מחיר", value: course.price },
  ];

  return (
    <ContentPage>
      <header className="a-grid-bg border-b border-[var(--a-line)]">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-10 md:px-8 md:pt-14">
          <a href="/courses" className="inline-flex items-center gap-1.5 text-[15px] text-[var(--a-muted)] hover:text-[var(--a-accent)]">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            לכל הקורסים והמפגשים
          </a>
          <div className="mt-8 flex items-start gap-5">
            <Leaf course={course} />
            <div className="min-w-0 flex-1">
              <Tag color={t.color}>{t.label}</Tag>
              <h1 className="mt-3 max-w-3xl text-[clamp(2rem,4.6vw,3.2rem)] font-medium leading-[1.15] text-[var(--a-ink)]">{course.title}</h1>
              <p className="mt-4 max-w-2xl text-xl leading-relaxed text-[var(--a-muted)]">{course.description}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-14">
          <section aria-labelledby="who-title">
            <h2 id="who-title" className="text-2xl font-medium text-[var(--a-ink)]">
              למי זה מתאים
            </h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {course.audience.map((a) => (
                <li key={a} className="rounded-full border border-[var(--a-line)] px-4 py-2 text-[15px] text-[var(--a-ink)]">
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="learn-title">
            <h2 id="learn-title" className="text-2xl font-medium text-[var(--a-ink)]">
              {course.type === "oneOnOne" ? "עם מה יוצאים" : "מה נעשה"}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {course.learn.map((l) => (
                <li key={l} className="flex gap-3 rounded-2xl border border-[var(--a-line)] bg-[#222524] p-4 text-[16px] leading-relaxed text-[var(--a-ink)]">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-[var(--a-ok)]" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </section>

          {course.plan && (
            <section aria-labelledby="plan-title">
              <h2 id="plan-title" className="text-2xl font-medium text-[var(--a-ink)]">
                המפגשים
              </h2>
              <ol className="relative mt-6 space-y-6 border-s-2 border-dashed border-[rgba(191,149,249,0.4)] ps-7">
                {course.plan.map((p, i) => (
                  <li key={p.title} className="relative">
                    <span
                      aria-hidden="true"
                      className="a-hand absolute -start-[2.85rem] top-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--a-accent)] bg-[#1d201f] text-[18px] text-[var(--a-accent)]"
                    >
                      {i + 1}
                    </span>
                    <p className="text-lg font-medium text-[var(--a-ink)]">{p.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-[var(--a-muted)]">{p.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside aria-label="פרטים והרשמה" className="lg:sticky lg:top-24 lg:self-start">
          <div className="a-card">
            <dl className="space-y-4">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--a-accent)]" aria-hidden="true" />
                  <div>
                    <dt className="text-[13px] text-[var(--a-muted)]">{label}</dt>
                    <dd className="text-[16px] text-[var(--a-ink)]">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-6 border-t border-[var(--a-line)] pt-6">
              {past ? (
                <p className="text-[15px] leading-relaxed text-[var(--a-muted)]">המפגש הזה כבר היה. רוצים שיהיה עוד אחד? כתבו לי.</p>
              ) : course.status === "soon" ? (
                <p className="text-[15px] leading-relaxed text-[var(--a-muted)]">ההרשמה תיפתח בקרוב. אפשר כבר עכשיו לכתוב לי ולשמור מקום.</p>
              ) : (
                <p className="text-[15px] text-[var(--a-ok)]">ההרשמה פתוחה</p>
              )}
              <a href={whatsapp(course)} target="_blank" rel="noopener noreferrer" className="a-btn a-btn-solid mt-4 w-full justify-center">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {past ? "לכתוב לי" : course.status === "soon" ? "לשמור לי מקום" : "להרשמה בוואטסאפ"}
                <span className="sr-only"> (נפתח בחלון חדש)</span>
              </a>
              <a href="/#contact" className="mt-3 block text-center text-[14px] text-[var(--a-muted)] hover:text-[var(--a-accent)]">
                או בדרכים אחרות
              </a>
            </div>
          </div>
        </aside>
      </div>
    </ContentPage>
  );
};

export default CourseItem;
