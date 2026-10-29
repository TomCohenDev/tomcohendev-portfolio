import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { ContentPage, Tag } from "@/components/content/ContentPage";
import { PostCover } from "@/components/content/PostCover";
import { DEMO, formatDate, posts, type Block, type Post } from "@/components/content/mock";

const BlockView = ({ block }: { block: Block }) => {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "list":
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "code":
      return (
        <pre>
          <code>{block.code}</code>
        </pre>
      );
    case "note":
      return (
        <aside className="flex gap-3 rounded-2xl border border-[rgba(242,196,109,0.35)] bg-[rgba(242,196,109,0.07)] p-5">
          <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-[var(--a-human)]" aria-hidden="true" />
          <div>
            <p className="a-hand text-[18px] text-[var(--a-human)]">{block.title}</p>
            <p className="mt-1 text-[var(--a-ink)]">{block.text}</p>
          </div>
        </aside>
      );
  }
};

const BlogPost = ({ post }: { post: Post }) => {
  const related = posts.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 2);

  return (
    <ContentPage demo={DEMO}>
      <article>
        <header className="a-grid-bg border-b border-[var(--a-line)]">
          <div className="mx-auto max-w-3xl px-5 pb-12 pt-10 md:px-8 md:pt-14">
            <a href="/blog" className="inline-flex items-center gap-1.5 text-[15px] text-[var(--a-muted)] hover:text-[var(--a-accent)]">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              לכל המאמרים
            </a>
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <h1 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] font-medium leading-[1.15] text-[var(--a-ink)]">{post.title}</h1>
            <p className="mt-5 text-xl leading-relaxed text-[var(--a-muted)]">{post.description}</p>
            <div className="mt-8 flex items-center gap-3">
              <img src="/tom_face.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-full border border-[var(--a-line)] object-cover" />
              <p className="text-[15px] leading-snug">
                <span className="block text-[var(--a-ink)]">תום כהן</span>
                <span className="text-[var(--a-muted)]">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} דקות קריאה
                </span>
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <PostCover post={post} className="-mt-px rounded-b-[1.5rem] border border-t-0 border-[var(--a-line)]" />
        </div>

        <div className="c-prose mx-auto max-w-3xl px-5 pb-16 pt-12 md:px-8">
          {post.body.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </div>

        <footer className="mx-auto max-w-3xl px-5 pb-20 md:px-8">
          <div className="a-card flex flex-col gap-5 sm:flex-row sm:items-center">
            <img src="/tom_face.webp" alt="" width={72} height={72} className="h-[72px] w-[72px] -rotate-3 rounded-2xl object-cover" />
            <div className="flex-1">
              <p className="text-lg font-medium text-[var(--a-ink)]">כתב: תום כהן</p>
              <p className="mt-1 text-[15px] leading-relaxed text-[var(--a-muted)]">
                מפתח <bdi>Full-stack</bdi>. בונה אפליקציות ואוטומציות לעסקים, מהאפיון ועד שזה עובד.
              </p>
            </div>
            <a href="/#contact" className="a-btn a-btn-ghost shrink-0 justify-center">
              לשיחת היכרות
            </a>
          </div>
        </footer>
      </article>

      {related.length > 0 && (
        <aside aria-labelledby="related-title" className="border-t border-[var(--a-line)] py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <h2 id="related-title" className="text-2xl font-medium text-[var(--a-ink)]">
              עוד מהבלוג
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <a href={`/blog/${p.slug}`} className="a-card group flex h-full flex-col transition-colors hover:border-[rgba(191,149,249,0.55)]">
                    <span className="text-lg font-medium leading-snug text-[var(--a-ink)]">{p.title}</span>
                    <span className="mt-2 flex-1 text-[15px] leading-relaxed text-[var(--a-muted)]">{p.description}</span>
                    <span className="mt-4 inline-flex items-center gap-1 text-[14px] text-[var(--a-accent)]">
                      לקריאה
                      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </ContentPage>
  );
};

export default BlogPost;
