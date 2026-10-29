import { ArrowLeft, ArrowRight, ArrowUpLeft, CornerDownLeft, Rss, Sparkles } from "lucide-react";
import { ContentPage, Tag } from "@/components/content/ContentPage";
import { formatDay, israelToday, shortDate } from "@/lib/dates";
import { issueHref, issues, storyHref, topics, type Issue, type Story } from "@/lib/news";

export const DESCRIPTION = "כל בוקר: מה קרה בטכנולוגיה וב־AI, ומה זה אומר לבעלי עסקים. בעברית, עם קישור למקור של כל ידיעה.";

const StoryView = ({ story, n, lead }: { story: Story; n: number; lead: boolean }) => (
  <article id={story.id} aria-labelledby={`${story.id}-title`} className={lead ? "md:col-span-2" : ""}>
    <div className={`flex gap-4 ${lead ? "md:gap-6" : ""}`}>
      <span aria-hidden="true" className={`a-hand shrink-0 leading-none text-[var(--a-accent)] ${lead ? "text-[64px] md:text-[88px]" : "text-[44px]"}`}>
        {n}
      </span>
      <div className="min-w-0 flex-1">
        <Tag>{topics[story.topic]}</Tag>
        <h2
          id={`${story.id}-title`}
          className={`mt-3 font-medium leading-snug text-[var(--a-ink)] ${lead ? "text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight" : "text-xl md:text-[22px]"}`}
        >
          {story.headline}
        </h2>
        <p className={`mt-3 leading-relaxed text-[var(--a-muted)] ${lead ? "text-lg md:text-xl" : "text-[16px]"}`}>{story.summary}</p>
        <p className="mt-4 rounded-xl border-s-[3px] border-[var(--a-human)] bg-[rgba(242,196,109,0.07)] px-4 py-3 text-[15px] leading-relaxed text-[var(--a-ink)]">
          <span className="a-hand me-1 text-[17px] text-[var(--a-human)]">מה זה אומר לעסק:</span> {story.forBusiness}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[var(--a-muted)]">
          <a href={story.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--a-accent)]">
            מקור: {story.source.name}
            <ArrowUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">(נפתח בחלון חדש)</span>
          </a>
          {story.continues && (
            <a href={storyHref(story.continues.date, story.continues.id)} className="inline-flex items-center gap-1 hover:text-[var(--a-accent)]">
              <CornerDownLeft className="h-3.5 w-3.5" aria-hidden="true" />
              המשך של: {story.continues.headline} ({shortDate(story.continues.date)})
            </a>
          )}
        </div>
      </div>
    </div>
  </article>
);

const NewsIssue = ({ issue }: { issue: Issue }) => {
  const index = issues.findIndex((i) => i.date === issue.date);
  const newer = issues[index - 1];
  const older = issues[index + 1];
  const number = issues.length - index;
  // Pages are built on every publish, so "today" is the build day in Israel.
  const kicker = index > 0 ? "גיליון מהארכיון" : issue.date === israelToday() ? "הגיליון של היום" : "הגיליון האחרון";

  return (
    <ContentPage>
      <header className="a-grid-bg">
        <div className="mx-auto max-w-6xl px-5 pt-12 md:px-8 md:pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="a-kicker">{kicker}</p>
              <h1 className="a-hand text-[clamp(2.8rem,8vw,5.5rem)] leading-none text-[var(--a-ink)]">חדשות הבוקר</h1>
            </div>
            <p className="max-w-xs text-[15px] leading-relaxed text-[var(--a-muted)]">
              מה קרה בטכנולוגיה וב־AI, ומה זה אומר לעסק שלכם. כל בוקר ב־7:00.
            </p>
          </div>
          <div className="c-rule mt-6" />
          <div className="flex flex-wrap items-center justify-between gap-3 py-3 text-[14px] text-[var(--a-muted)]">
            <time dateTime={issue.date} className="text-[var(--a-ink)]">
              {formatDay(issue.date)} {issue.date.slice(0, 4)}
            </time>
            <span>גיליון {number} · {issue.stories.length} ידיעות</span>
            <a href="/news/feed.xml" className="inline-flex items-center gap-1.5 hover:text-[var(--a-accent)]">
              <Rss className="h-4 w-4" aria-hidden="true" />
              RSS
            </a>
          </div>
          <div className="border-t border-[var(--a-line)]" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 md:px-8">
        {issue.update && (
          <aside aria-label="עדכון מתום" className="mb-12 flex flex-col gap-4 rounded-[1.25rem] border border-dashed border-[rgba(191,149,249,0.5)] bg-[rgba(191,149,249,0.06)] p-5 sm:flex-row sm:items-center md:p-6">
            <img src="/tom_face.webp" alt="" width={56} height={56} className="h-14 w-14 shrink-0 -rotate-3 rounded-2xl object-cover" />
            <div className="flex-1">
              <p className="text-lg font-medium text-[var(--a-ink)]">{issue.update.title}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-[var(--a-muted)]">{issue.update.text}</p>
            </div>
            {issue.update.href && (
              <a href={issue.update.href} className="inline-flex shrink-0 items-center gap-1 text-[15px] text-[var(--a-accent)] hover:underline">
                לקריאה
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </aside>
        )}

        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
          {issue.stories.map((s, i) => (
            <StoryView key={s.id} story={s} n={i + 1} lead={i === 0} />
          ))}
        </div>

        <nav aria-label="גיליונות" className="mt-20 grid gap-4 border-t border-[var(--a-line)] pt-8 sm:grid-cols-3 sm:items-center">
          <div>
            {newer && (
              <a href={issueHref(newer)} className="inline-flex items-center gap-1.5 text-[15px] text-[var(--a-muted)] hover:text-[var(--a-accent)]">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                הגיליון הבא ({shortDate(newer.date)})
              </a>
            )}
          </div>
          <a href="/news/archive" className="text-center text-[15px] text-[var(--a-accent)] hover:underline">
            כל הגיליונות
          </a>
          <div className="sm:text-end">
            {older && (
              <a href={issueHref(older)} className="inline-flex items-center gap-1.5 text-[15px] text-[var(--a-muted)] hover:text-[var(--a-accent)]">
                הגיליון הקודם ({shortDate(older.date)})
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </nav>

        <section aria-labelledby="how-title" className="mt-12 rounded-[1.25rem] border border-[var(--a-line)] bg-[#222524] p-6 md:p-8">
          <h2 id="how-title" className="flex items-center gap-2 text-lg font-medium text-[var(--a-ink)]">
            <Sparkles className="h-5 w-5 text-[var(--a-accent)]" aria-hidden="true" />
            איך הגיליון נכתב
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--a-muted)]">
            סוכן AI קורא כל בוקר מקורות קבועים, בוחר כמה ידיעות שרלוונטיות לבעלי עסקים, ומסכם אותן במילים שלו. כל ידיעה מקשרת
            למקור שלה, ואף ידיעה לא חוזרת פעמיים. העדכונים שמסומנים "מתום" נכתבים על ידי.
          </p>
        </section>
      </div>
    </ContentPage>
  );
};

export default NewsIssue;
