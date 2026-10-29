import { useState } from "react";
import { ArrowLeft, Rss } from "lucide-react";
import { ContentPage, PageIntro, Tag } from "@/components/content/ContentPage";
import { PostCover } from "@/components/content/PostCover";
import { blogTags, formatDate, posts, type Post } from "@/components/content/mock";
import { Squiggle } from "@/components/automation/Doodles";

export const TITLE = "הבלוג | תום כהן";
export const DESCRIPTION = "מה למדתי מבניית אפליקציות ואוטומציות לעסקים: מאמרים בעברית, בלי באזוורדס.";

const Meta = ({ post }: { post: Post }) => (
  <span className="text-[14px] text-[var(--a-muted)]">
    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} דקות קריאה
  </span>
);

const PostCard = ({ post }: { post: Post }) => (
  <a href={`/blog/${post.slug}`} className="a-card group flex h-full flex-col overflow-hidden !p-0 transition-colors hover:border-[rgba(191,149,249,0.55)]">
    <PostCover post={post} className="border-b border-[var(--a-line)]" />
    <span className="flex flex-1 flex-col p-5 md:p-6">
      <span className="flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </span>
      <span className="mt-3 text-xl font-medium leading-snug text-[var(--a-ink)]">{post.title}</span>
      <span className="mt-2 flex-1 text-[15px] leading-relaxed text-[var(--a-muted)]">{post.description}</span>
      <span className="mt-4">
        <Meta post={post} />
      </span>
    </span>
  </a>
);

const BlogIndex = () => {
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;
  const [featured, ...rest] = shown;

  return (
    <ContentPage>
      <section className="a-grid-bg border-b border-[var(--a-line)]">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-14 md:px-8 md:pt-20">
          <PageIntro
            kicker="הבלוג"
            title={
              <>
                מה למדתי{" "}
                <span className="relative inline-block">
                  בדרך
                  <Squiggle className="absolute -bottom-3 start-0 h-3 w-full text-[#f49ac1]" />
                </span>
              </>
            }
          >
            מאמרים קצרים על אפליקציות, אוטומציה ו־AI לעסקים. מה עבד, מה לא, ומה הייתי עושה אחרת.
          </PageIntro>

          <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="סינון לפי נושא">
            {[null, ...blogTags].map((t) => (
              <button
                key={t ?? "all"}
                type="button"
                aria-pressed={tag === t}
                onClick={() => setTag(t)}
                className={`rounded-full border px-4 py-1.5 text-[15px] transition-colors ${
                  tag === t
                    ? "border-[var(--a-accent)] bg-[var(--a-accent)] text-[#1D201F]"
                    : "border-[var(--a-line)] text-[var(--a-muted)] hover:border-[var(--a-accent)] hover:text-[var(--a-ink)]"
                }`}
              >
                {t ?? "הכול"}
              </button>
            ))}
            <a href="/blog/rss.xml" className="ms-auto inline-flex items-center gap-1.5 text-[15px] text-[var(--a-muted)] hover:text-[var(--a-accent)]">
              <Rss className="h-4 w-4" aria-hidden="true" />
              RSS
            </a>
          </div>
        </div>
      </section>

      <section aria-label="מאמרים" className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="sr-only" aria-live="polite">
          {shown.length} מאמרים
        </p>
        {featured && (
          <a
            href={`/blog/${featured.slug}`}
            className="a-card group grid overflow-hidden !p-0 transition-colors hover:border-[rgba(191,149,249,0.55)] md:grid-cols-[1.1fr_1fr]"
          >
            <PostCover post={featured} className="h-full object-cover md:border-e md:border-[var(--a-line)]" />
            <span className="flex flex-col justify-center p-6 md:p-10">
              <span className="a-hand text-[18px] text-[var(--a-human)]">המאמר החדש</span>
              <span className="mt-2 text-[clamp(1.6rem,3vw,2.3rem)] font-medium leading-tight text-[var(--a-ink)]">{featured.title}</span>
              <span className="mt-4 text-[17px] leading-relaxed text-[var(--a-muted)]">{featured.description}</span>
              <span className="mt-5 flex flex-wrap items-center gap-3">
                <Meta post={featured} />
              </span>
              <span className="mt-6 inline-flex items-center gap-1 text-[15px] text-[var(--a-accent)]">
                לקריאה
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              </span>
            </span>
          </a>
        )}

        {rest.length > 0 && (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {rest.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </ContentPage>
  );
};

export default BlogIndex;
