import { ArrowLeft, ArrowRight, ArrowUpLeft, ChevronDown, CornerDownLeft, ListTree, Rocket, Sparkles, Zap } from "lucide-react";
import { ContentPage, Tag } from "@/components/content/ContentPage";
import { ReleaseThumb } from "@/components/home/HomeNews";
import { formatDay, shortDate } from "@/lib/dates";
import { issueHref, issues, sources, storyHref, topicColors, topics, type Issue, type Story } from "@/lib/news";

/** The feeds, grouped by topic in the site's order, with launch feeds last. */
const sourceGroups = ([...Object.keys(topics), "releases"] as (keyof typeof topics | "releases")[])
  .map((topic) => [topic, topic === "releases" ? "השקות" : topics[topic], sources.filter((s) => s.topic === topic).map((s) => s.name)] as const)
  .filter(([, , names]) => names.length > 0);

export const DESCRIPTION ="כל בוקר: מה קרה בטכנולוגיה וב־AI, ומה זה אומר לבעלי עסקים. בעברית, עם קישור למקור של כל ידיעה.";

const StoryView = ({ story, lead, className = "" }: { story: Story; lead: boolean; className?: string }) => (
  <article id={story.id} aria-labelledby={`${story.id}-title`} className={`scroll-mt-24 ${className}`}>
    <div className="flex">
      <div className="flex min-w-0 flex-1 flex-col">
        {story.image && (
          <figure className="mb-5">
            {/* The topic sits on the picture, on a dark backing so it reads over any image. */}
            <div className="relative">
              <img
                src={story.image.url}
                alt={story.image.alt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className={`aspect-[16/9] w-full rounded-xl bg-[#222524] object-cover ${lead ? "xl:aspect-[4/3]" : ""}`}
              />
              <span className="absolute start-3 top-3 rounded-full bg-[#1d201f]/85 backdrop-blur-sm">
                <Tag color={topicColors[story.topic]}>{topics[story.topic]}</Tag>
              </span>
            </div>
            <figcaption className="mt-1.5 text-[12px] text-[var(--a-muted)]">תמונה: {story.source.name}</figcaption>
          </figure>
        )}
        <div className="min-w-0 flex-1">
          {!story.image && <Tag color={topicColors[story.topic]}>{topics[story.topic]}</Tag>}
          <h2
            id={`${story.id}-title`}
            className={`${story.image ? "" : "mt-3"} font-medium leading-snug text-[var(--a-ink)] ${lead ? "text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight" : "text-xl md:text-[22px]"}`}
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
    </div>
  </article>
);

const NewsIssue = ({ issue }: { issue: Issue }) => {
  const index = issues.findIndex((i) => i.date === issue.date);
  const [lead, ...others] = issue.stories;
  const middle = others.slice(0, 2);
  const left = others.slice(2, 4);
  const rest = others.slice(4);
  const newer = issues[index - 1];
  const older = issues[index + 1];
  return (
    <ContentPage>
      <header className="a-grid-bg">
        <div className="mx-auto max-w-[1920px] px-5 pt-12 md:px-8 md:pt-16 xl:px-10 2xl:px-14">
          {/* The same title as the news section on the home page, with the issue's date above it. */}
          <p className="a-kicker">
            <time dateTime={issue.date}>
              {formatDay(issue.date)} {issue.date.slice(0, 4)}
            </time>
          </p>
          <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-medium leading-tight text-[var(--a-ink)]">
            חדשות <bdi>Tech</bdi> ו-<bdi>AI</bdi>
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-[1920px] px-5 pb-20 pt-10 md:px-8 xl:px-10 2xl:px-14">
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

        {/*
          A front page in three columns: the lead on the right, then two stories in the middle and two on the left. Two
          full stories run longer than one, so on wide screens the lead stays in view (sticky) while those columns scroll
          past, instead of leaving empty space under it. The rest go below, in columns that each stack their stories.
        */}
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr]">
          <StoryView story={lead} lead className="md:col-span-2 xl:sticky xl:top-24 xl:col-span-1 xl:self-start" />
          {[middle, left].map(
            (column, i) =>
              column.length > 0 && (
                <div key={i} className="flex flex-col gap-14 xl:border-s xl:border-[var(--a-line)] xl:ps-10">
                  {column.map((s) => (
                    <StoryView key={s.id} story={s} lead={false} />
                  ))}
                </div>
              )
          )}
        </div>
        {rest.length > 0 && (
          <div className="mt-14 gap-x-12 border-t border-[var(--a-line)] pt-14 md:columns-2 xl:columns-3 [&>*]:mb-14 [&>*]:break-inside-avoid">
            {rest.map((s) => (
              <StoryView key={s.id} story={s} lead={false} />
            ))}
          </div>
        )}

        {issue.flashes && issue.flashes.length > 0 && (
          <section aria-labelledby="flashes-title" className="mt-20 border-t border-[var(--a-line)] pt-10">
            <h2 id="flashes-title" className="flex items-center gap-2 text-2xl font-medium text-[var(--a-ink)]">
              <Zap className="h-6 w-6 fill-[var(--a-human)] text-[var(--a-human)]" aria-hidden="true" />
              מבזקים
            </h2>
            <ul className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
              {issue.flashes.map((f) => (
                <li key={f.id} id={f.id} className="flex scroll-mt-24 gap-4">
                  <div className="min-w-0">
                    <span className="text-[13px] font-medium" style={{ color: topicColors[f.topic] }}>
                      {topics[f.topic]}
                    </span>
                    <p className="mt-1 text-[16px] leading-snug text-[var(--a-ink)]">{f.text}</p>
                    <a
                      href={f.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-[13px] text-[var(--a-muted)] hover:text-[var(--a-accent)]"
                    >
                      מקור: {f.source.name}
                      <ArrowUpLeft className="h-3 w-3" aria-hidden="true" />
                      <span className="sr-only">(נפתח בחלון חדש)</span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {issue.releases && issue.releases.length > 0 && (
          <section aria-labelledby="releases-title" className="mt-20 border-t border-[var(--a-line)] pt-10">
            <h2 id="releases-title" className="flex items-center gap-2 text-2xl font-medium text-[var(--a-ink)]">
              <Rocket className="h-6 w-6 text-[var(--a-accent)]" aria-hidden="true" />
              חדש בכלים ואפליקציות
            </h2>
            <ul className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2 xl:grid-cols-4">
              {issue.releases.map((r) => (
                <li key={r.id} id={r.id} className="flex scroll-mt-24 gap-4">
                  <ReleaseThumb release={r} />
                  <div className="min-w-0">
                    {/* bdi keeps an English name's letter order; the line itself stays right-aligned with the page. */}
                    <p className="text-right text-[16px] font-medium text-[var(--a-ink)]">
                      <bdi>{r.name}</bdi>
                    </p>
                    <p className="mt-1 text-[15px] leading-snug text-[var(--a-muted)]">{r.text}</p>
                    <a
                      href={r.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-[13px] text-[var(--a-muted)] hover:text-[var(--a-accent)]"
                    >
                      {r.source.name}
                      <ArrowUpLeft className="h-3 w-3" aria-hidden="true" />
                      <span className="sr-only">(נפתח בחלון חדש)</span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

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
          {/* A native details element: the page has no client script, and the list opens and closes without one. */}
          <details className="group mt-6">
            <summary className="a-btn a-btn-ghost cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <ListTree className="h-5 w-5 text-[var(--a-accent)]" aria-hidden="true" />
              המקורות שלנו ({sources.length})
              <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {sourceGroups.map(([topic, label, names]) => (
                <div key={topic}>
                  <h3
                    className="text-[14px] font-medium"
                    style={{ color: topic === "releases" ? "var(--a-accent)" : topicColors[topic] }}
                  >
                    {label}
                  </h3>
                  <ul className="mt-2 space-y-1 text-[15px] text-[var(--a-ink)]">
                    {names.map((n) => (
                      <li key={n}>
                        <bdi>{n}</bdi>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </section>
      </div>
    </ContentPage>
  );
};

export default NewsIssue;
