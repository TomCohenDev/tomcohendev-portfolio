import { ArrowLeft, BookOpen, CalendarDays } from "lucide-react";
import { courses, courseTypes, DEMO, formatDate, formatDay, type Post } from "../content/mock";
import { listedPosts } from "../../data/blog";
import { PostCover } from "../content/PostCover";
import { facts } from "../course/content";

const iconClass = "h-5 w-5 text-[var(--a-accent)]";

const Meta = ({ post }: { post: Post }) => (
  <p className="mt-2 text-[14px] text-[var(--a-muted)]">
    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} דקות קריאה
  </p>
);

const Cover = ({ post }: { post: Post }) => (
  <PostCover post={post} className="rounded-2xl border border-[var(--a-line)] transition-colors group-hover:border-[rgba(191,149,249,0.55)]" />
);

const titleClass = "font-medium leading-snug text-[var(--a-ink)] transition-colors group-hover:text-[var(--a-accent)]";

/** The newest article on the right, as wide as the news above it (HomeNews); "coming soon" slots on the left. */
export const HomeBlog = () => {
  const [lead] = listedPosts;
  if (!lead) return null;
  const soon = [0, 1, 2];

  return (
    <section id="blog" aria-labelledby="blog-title" className="border-t border-[var(--a-line)] py-16 text-start md:py-20">
      <div className="mx-auto max-w-[1920px] px-5 md:px-8 xl:px-10 2xl:px-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--a-line)] pb-4">
          <div>
            <p className="a-kicker">בלוג</p>
            <h2 id="blog-title" className="a-h2">
              מאמרים ומדריכים
            </h2>
          </div>
          <a href="/blog" className="a-btn a-btn-ghost group">
            <BookOpen className={iconClass} aria-hidden="true" />
            לכל המאמרים
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-8">
          <article>
            <a href={`/blog/${lead.slug}`} className="group block">
              <Cover post={lead} />
              <h3 className={`mt-5 text-[clamp(1.6rem,2.6vw,2.3rem)] !leading-tight ${titleClass}`}>{lead.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-[var(--a-muted)]">{lead.description}</p>
              <Meta post={lead} />
            </a>
          </article>

          <ul className="flex flex-col gap-4 lg:border-s lg:border-[var(--a-line)] lg:ps-8" aria-label="מאמרים בדרך">
            {soon.map((i) => (
              <li
                key={i}
                className="flex flex-1 items-center justify-between gap-4 rounded-2xl border border-dashed border-[var(--a-line)] px-6 py-8 text-[var(--a-muted)]"
              >
                <span className="text-xl">מאמר נוסף בדרך</span>
                <span className="a-hand text-[20px] text-[var(--a-accent)]">בקרוב</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

/** The next courses and meetups, under a large title, in matching cards. */
export const HomeCourses = () => (
  <section
    id="courses"
    aria-labelledby="courses-title"
    className="border-t border-[var(--a-line)] py-20 md:py-24"
  >
    <div className="mx-auto max-w-5xl px-5 md:px-8">
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 id="courses-title" className="text-[clamp(2.75rem,7vw,5rem)] font-medium leading-[1.05] text-[var(--a-ink)]">
          קורסים ומפגשים
        </h2>
        <a href="/courses" className="a-btn a-btn-ghost group">
          <CalendarDays className={iconClass} aria-hidden="true" />
          לכל הקורסים והמפגשים
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        </a>
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {courses
          .filter((c) => c.status !== "past")
          .slice(0, 2)
          .map((c) => (
            <li key={c.slug}>
              <a
                href={`/courses/${c.slug}`}
                className="group flex h-full flex-col rounded-[1.5rem] border-2 border-[var(--a-accent)] bg-[#222524] p-6 text-[var(--a-ink)] shadow-[0_28px_60px_-18px_rgba(0,0,0,0.9),0_0_44px_-10px_rgba(191,149,249,0.4)] transition-[transform,box-shadow] hover:-translate-y-1.5 hover:shadow-[0_36px_70px_-18px_rgba(0,0,0,0.95),0_0_56px_-8px_rgba(191,149,249,0.55)] md:p-8"
              >
                <span className="a-hand block text-[20px] text-[var(--a-accent)]">{c.landing ? "קורס אוטומציה עסקית עם AI" : courseTypes[c.type].label}</span>
                <span className="mt-2 block text-[clamp(1.5rem,2.8vw,2rem)] font-medium leading-tight">{c.title}</span>
                <span className="mt-3 block flex-1 text-[16px] leading-relaxed text-[var(--a-muted)]">{c.description}</span>
                <span className="mt-5 flex flex-wrap gap-2">
                  {(c.landing ? facts : [c.date ? formatDay(c.date) : c.when, c.where]).map((f) => (
                    <span key={f} dir={f.startsWith("17") ? "ltr" : undefined} className="rounded-full border border-[var(--a-line)] px-3 py-1 text-[14px]">
                      {f}
                    </span>
                  ))}
                </span>
                <span className="a-btn a-btn-solid mt-6 self-start">
                  {c.landing ? "לכל הפרטים על הקורס" : "לכל הפרטים"}
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                </span>
                {!c.landing && DEMO && <span className="mt-3 block text-[14px] text-[var(--a-human)]">לדוגמה</span>}
              </a>
            </li>
          ))}
      </ul>
    </div>
  </section>
);
