import { ArrowLeft, BookOpen, CalendarDays, Newspaper } from "lucide-react";
import type { ReactNode } from "react";
import { latestIssue } from "@/lib/news";
import { courses, courseTypes, DEMO, formatDate, formatDay, posts } from "../content/mock";

const Column = ({ icon, title, href, more, children }: { icon: ReactNode; title: string; href: string; more: string; children: ReactNode }) => (
  <section aria-label={title} className="flex flex-col rounded-[1.25rem] border border-[var(--a-line)] bg-[#222524] p-6">
    <h3 className="flex items-center gap-2 text-xl font-medium text-[var(--a-ink)]">
      {icon}
      {title}
    </h3>
    <div className="mt-5 flex-1">{children}</div>
    <a href={href} className="group mt-6 inline-flex items-center gap-1 text-[15px] text-[var(--a-accent)]">
      {more}
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
    </a>
  </section>
);

const iconClass = "h-5 w-5 text-[var(--a-accent)]";

/** The newest news issue, blog posts and upcoming courses, side by side. */
export const HomeLatest = () => {
  const upcoming = courses.filter((c) => c.status !== "past").slice(0, 2);
  return (
    <section aria-labelledby="latest-title" className="border-t border-[var(--a-line)] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="a-kicker">מה חדש</p>
        <h2 id="latest-title" className="a-h2">
          לקרוא, ללמוד, להתעדכן
        </h2>
        {DEMO && <p className="mt-3 text-[14px] text-[var(--a-human)]">החדשות אמיתיות. הבלוג והקורסים עדיין לדוגמה.</p>}

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {latestIssue && (
            <Column icon={<Newspaper className={iconClass} aria-hidden="true" />} title="חדשות הבוקר" href="/news" more="לגיליון המלא">
              <p className="text-[14px] text-[var(--a-muted)]">
                <time dateTime={latestIssue.date}>{formatDay(latestIssue.date)}</time>
              </p>
              <ol className="mt-3 space-y-3">
                {latestIssue.stories.slice(0, 3).map((s, i) => (
                  <li key={s.id} className="flex gap-3">
                    <span aria-hidden="true" className="a-hand text-[22px] leading-none text-[var(--a-accent)]">
                      {i + 1}
                    </span>
                    <a href={`/news#${s.id}`} className="text-[16px] leading-snug text-[var(--a-ink)] hover:text-[var(--a-accent)]">
                      {s.headline}
                    </a>
                  </li>
                ))}
              </ol>
            </Column>
          )}

          <Column icon={<BookOpen className={iconClass} aria-hidden="true" />} title="מהבלוג" href="/blog" more="לכל המאמרים">
            <ul className="space-y-5">
              {posts.slice(0, 2).map((p) => (
                <li key={p.slug}>
                  <a href={`/blog/${p.slug}`} className="block text-[16px] font-medium leading-snug text-[var(--a-ink)] hover:text-[var(--a-accent)]">
                    {p.title}
                  </a>
                  <p className="mt-1 text-[14px] text-[var(--a-muted)]">
                    <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readMinutes} דקות קריאה
                  </p>
                </li>
              ))}
            </ul>
          </Column>

          <Column icon={<CalendarDays className={iconClass} aria-hidden="true" />} title="קורסים ומפגשים" href="/courses" more="לכל המפגשים">
            <ul className="space-y-5">
              {upcoming.map((c) => (
                <li key={c.slug}>
                  <p className="text-[13px]" style={{ color: courseTypes[c.type].color }}>
                    {courseTypes[c.type].label}
                  </p>
                  <a
                    href={`/courses/${c.slug}`}
                    className="mt-0.5 block text-[16px] font-medium leading-snug text-[var(--a-ink)] hover:text-[var(--a-accent)]"
                  >
                    {c.title}
                  </a>
                  <p className="mt-1 text-[14px] text-[var(--a-muted)]">
                    {c.date ? formatDay(c.date) : c.when} · {c.where}
                  </p>
                </li>
              ))}
            </ul>
          </Column>
        </div>
      </div>
    </section>
  );
};
