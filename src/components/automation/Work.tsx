import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Quote } from "lucide-react";
import { track } from "@/lib/analytics";
import { builtSummary, caseStudies, testimonials, type CaseStudy, type Testimonial } from "./content";
import { ProjectScene } from "./Scenes";
import { useMarquee } from "./useMarquee";

/**
 * A project in the carousel. The whole card is a toggle (a stretched button) that opens a short list of
 * what was built. The carousel pauses while any card is open (see useMarquee).
 */
const ProjectCard = ({ study }: { study: CaseStudy }) => {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const built = builtSummary[study.id] ?? [];
  const toggle = () => {
    setOpen((o) => !o);
    if (!open) track("automation_case_study_view", { case: study.id, action: "expand" });
  };

  return (
    <article
      className={`a-card relative flex min-h-[30.5rem] w-[300px] sm:min-h-[27rem] cursor-pointer flex-col gap-4 !p-5 transition-colors sm:w-[380px] ${
        open ? "border-[var(--a-accent)]/60" : "hover:border-[var(--a-accent)]/40"
      }`}
    >
      <ProjectScene id={study.id} />
      <h3 className="text-xl font-medium text-[var(--a-ink)]">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={toggle}
          className="text-start after:absolute after:inset-0 after:rounded-[1.25rem] after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[var(--a-accent)]"
        >
          <bdi>{study.name}</bdi>
        </button>
      </h3>
      <p className="text-[15px] leading-relaxed text-[var(--a-muted)]">{study.result}</p>
      {study.kind === "in-development" && <p className="text-[13px] text-[var(--a-muted)]">עדיין בפיתוח.</p>}

      {/* Short "what was built" list; grows open with a grid-rows transition */}
      <div id={detailsId} className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="rounded-xl border border-[var(--a-accent)]/25 bg-[var(--a-accent)]/[0.06] p-4">
            <p className="text-[13px] font-medium text-[var(--a-accent)]">מה בניתי</p>
            <ul className="mt-2 space-y-1.5">
              {built.map((line) => (
                <li key={line} className="flex items-start gap-2 text-[14px] leading-snug text-[var(--a-ink)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--a-accent)]" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <span className="mt-auto inline-flex items-center gap-1 text-[13px] text-[var(--a-accent)]" aria-hidden="true">
        {open ? "סגירה" : "מה בניתי"}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </span>
    </article>
  );
};

const QuoteCard = ({ item }: { item: Testimonial }) => (
  <figure className="a-card flex min-h-[30.5rem] w-[300px] flex-col justify-center sm:min-h-[27rem] gap-4 !p-6 sm:w-[380px]">
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

// Carousel order: client projects mixed in with Tom's own tools; the tool still in development comes last.
const ORDER = ["nightwing", "ita", "social", "cicd", "gomlin", "luxcal", "blog", "mintkola", "eldritch", "n8nchat", "mcp", "helix"];
const ordered = [...caseStudies].sort((x, y) => {
  const ix = ORDER.indexOf(x.id);
  const iy = ORDER.indexOf(y.id);
  return (ix < 0 ? ORDER.length : ix) - (iy < 0 ? ORDER.length : iy);
});

/** Projects with the reviews spread evenly between them, so screens and quotes alternate. */
const buildSlides = (): Slide[] => {
  const slides: Slide[] = [];
  const base = Math.floor(testimonials.length / ordered.length);
  const extra = testimonials.length % ordered.length;
  let q = 0;
  ordered.forEach((study, gap) => {
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
    <ul ref={clone ? cloneRef : copyRef} className="a-marquee-copy flex items-start gap-5 pe-5" aria-hidden={clone || undefined}>
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
        <h2 id="work-title" className="a-h2">
          עבודות והמלצות
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
