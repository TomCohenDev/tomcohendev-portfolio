import { ArrowLeft } from "lucide-react";
import { ContentPage, PageIntro } from "@/components/content/ContentPage";
import { dayNumber, formatDay, formatMonth, israelToday, monthShort } from "@/lib/dates";
import { issueHref, issues } from "@/lib/news";

export const TITLE = "ארכיון חדשות הבוקר | תום כהן";
export const DESCRIPTION = "כל הגיליונות של חדשות הבוקר: טכנולוגיה ו־AI לבעלי עסקים, יום אחרי יום.";

const NewsArchive = () => {
  const months = [...new Set(issues.map((i) => i.date.slice(0, 7)))];
  return (
    <ContentPage>
      <section className="a-grid-bg border-b border-[var(--a-line)]">
        <div className="mx-auto max-w-4xl px-5 pb-12 pt-14 md:px-8 md:pt-20">
          <PageIntro kicker="חדשות הבוקר" title="כל הגיליונות">
            {issues.length === 1 ? "גיליון אחד" : `${issues.length} גיליונות`} עד היום. כל גיליון נשאר כאן, עם הקישורים למקורות.
          </PageIntro>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
        {months.map((m) => (
          <section key={m} aria-labelledby={`m-${m}`} className="mb-14 last:mb-0">
            <h2 id={`m-${m}`} className="a-hand text-[26px] text-[var(--a-accent)]">
              {formatMonth(`${m}-01`)}
            </h2>
            <ul className="mt-5 space-y-4">
              {issues
                .filter((i) => i.date.startsWith(m))
                .map((issue) => (
                  <li key={issue.date}>
                    <a
                      href={issueHref(issue)}
                      className="a-card group flex gap-5 transition-colors hover:border-[rgba(191,149,249,0.55)]"
                    >
                      <span aria-hidden="true" className="c-leaf flex h-16 w-14 shrink-0 flex-col overflow-hidden rounded-lg border border-[var(--a-line)] bg-[#1d201f] text-center">
                        <span className="bg-[var(--a-accent)] py-0.5 text-[12px] font-medium text-[#1d201f]">{monthShort(issue.date)}</span>
                        <span className="flex flex-1 items-center justify-center text-2xl font-medium text-[var(--a-ink)]">{dayNumber(issue.date)}</span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline gap-x-3">
                          <time dateTime={issue.date} className="text-lg font-medium text-[var(--a-ink)]">
                            {formatDay(issue.date)}
                          </time>
                          {issue.date === israelToday() && <span className="a-hand text-[16px] text-[var(--a-human)]">היום</span>}
                        </span>
                        <ul className="mt-2 space-y-1 text-[15px] leading-relaxed text-[var(--a-muted)]">
                          {issue.stories.slice(0, 3).map((s) => (
                            <li key={s.id} className="truncate">
                              {s.headline}
                            </li>
                          ))}
                        </ul>
                      </span>
                      <ArrowLeft className="mt-1 h-5 w-5 shrink-0 self-center text-[var(--a-accent)] transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </ContentPage>
  );
};

export default NewsArchive;
