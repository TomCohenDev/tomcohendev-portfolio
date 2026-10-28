import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Quote } from "lucide-react";
import { track } from "@/lib/analytics";
import { caseStudies, testimonials, type CaseStudy, type Testimonial } from "./content";
import { ProjectScene } from "./Scenes";
import { useMarquee } from "./useMarquee";

const ProjectCard = ({ study }: { study: CaseStudy }) => (
  <article className="a-card flex h-full w-[300px] flex-col gap-4 !p-5 sm:w-[380px]">
    <ProjectScene id={study.id} />
    <h3 className="text-xl font-medium text-[var(--a-ink)]">
      <bdi>{study.name}</bdi>
    </h3>
    <p className="text-[15px] leading-relaxed text-[var(--a-muted)]">{study.result}</p>
    {study.kind === "in-development" && <p className="text-[13px] text-[var(--a-muted)]">עדיין בפיתוח.</p>}
    {study.link && (
      <Link
        to={study.link.href}
        onClick={() => track("automation_case_study_view", { case: study.id, action: "open_full" })}
        className="mt-auto inline-flex items-center gap-1.5 text-[14px] text-[var(--a-accent)] hover:underline"
      >
        {study.link.label}
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      </Link>
    )}
  </article>
);

const QuoteCard = ({ item }: { item: Testimonial }) => (
  <figure className="a-card flex h-full w-[300px] flex-col justify-center gap-4 !p-6 sm:w-[380px]">
    <Quote className="h-7 w-7 text-[var(--a-accent)] max-md:mx-auto" aria-hidden="true" />
    <blockquote className="text-[16px] leading-relaxed text-[var(--a-ink)]">{item.quote}</blockquote>
    <figcaption className="text-[14px] text-[var(--a-muted)]">
      <bdi className="font-medium text-[var(--a-ink)]">{item.name}</bdi>
      {item.source && (
        <>
          {" · "}
          <bdi>{item.source}</bdi>
        </>
      )}
    </figcaption>
  </figure>
);

type Slide = { key: string; node: JSX.Element };

/** Projects with the reviews spread evenly between them, so screens and quotes alternate. */
const buildSlides = (): Slide[] => {
  const slides: Slide[] = [];
  const base = Math.floor(testimonials.length / caseStudies.length);
  const extra = testimonials.length % caseStudies.length;
  let q = 0;
  caseStudies.forEach((study, gap) => {
    slides.push({ key: study.id, node: <ProjectCard study={study} /> });
    const count = base + (gap < extra ? 1 : 0);
    for (let i = 0; i < count; i++, q++) {
      slides.push({ key: `quote-${q}`, node: <QuoteCard item={testimonials[q]} /> });
    }
  });
  return slides;
};

/**
 * Endless, draggable carousel (see useMarquee). The list is rendered twice for a seamless loop; the
 * second copy is hidden from assistive technology, and its links are taken out of the tab order.
 */
export const WorkSection = () => {
  const slides = buildSlides();
  const { viewportRef, trackRef, copyRef } = useMarquee();
  const cloneRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    cloneRef.current?.querySelectorAll<HTMLElement>("a, button").forEach((el) => (el.tabIndex = -1));
  }, []);

  const copy = (clone: boolean) => (
    <ul ref={clone ? cloneRef : copyRef} className="a-marquee-copy flex gap-5 pe-5" aria-hidden={clone || undefined}>
      {slides.map((s) => (
        <li key={s.key} className="flex">
          {s.node}
        </li>
      ))}
    </ul>
  );

  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-[var(--a-line)]">
      <div className="mx-auto max-w-6xl px-5 pt-24 text-center md:px-8">
        <p className="a-kicker">עסקים שכבר חסכו</p>
        <h2 id="work-title" className="a-h2">
          אוטומציות שבניתי ועובדות
        </h2>
      </div>
      <div
        ref={viewportRef}
        className="a-marquee mt-12 pb-24"
        role="region"
        aria-label="פרויקטים והמלצות. הרשימה זזה לבד, אפשר לגרור אותה, והיא נעצרת כשמעבירים עליה עכבר"
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {copy(false)}
          {copy(true)}
        </div>
      </div>
    </section>
  );
};
