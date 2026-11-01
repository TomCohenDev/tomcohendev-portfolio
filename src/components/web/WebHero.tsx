import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { useInView } from "@/lib/useInView";
import { DoodleUnderline } from "../automation/Chrome";
import { SketchArrow } from "../automation/Doodles";
import { SITES } from "../automation/sites";
import { usePrefersReducedMotion } from "../automation/useReducedMotion";
import { webTabs } from "./content";

const TAB_MS = 5000;

/**
 * One browser, four tabs: a landing page, a portfolio, a business site and a SaaS, each showing a real project.
 * It moves on by itself while on screen; choosing a tab stops that, so the reader keeps what they picked.
 */
const BrowserShowcase = () => {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const onScreen = useInView(box);

  useEffect(() => {
    if (chosen || reduced || !onScreen) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % webTabs.length), TAB_MS);
    return () => clearTimeout(t);
  }, [index, chosen, reduced, onScreen]);

  return (
    <div ref={box} className="mx-auto w-full max-w-[42rem]">
      <div className="overflow-hidden rounded-2xl border-2 border-[rgba(191,149,249,0.55)] bg-[#222524] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
        <div aria-hidden="true" dir="ltr" className="flex gap-1.5 px-4 pt-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f49ac1]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--a-human)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--a-accent)]" />
        </div>
        <div role="group" aria-label="סוגי אתרים" className="mt-2 grid grid-cols-4 gap-1 px-2">
          {webTabs.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={i === index}
              onClick={() => {
                setIndex(i);
                setChosen(true);
                track("web_tab_click", { tab: tab.id });
              }}
              className={`min-h-10 rounded-t-lg px-1 text-[12px] leading-tight transition-colors sm:text-[14px] ${
                i === index
                  ? "bg-[#141716] font-medium text-[var(--a-ink)]"
                  : "text-[var(--a-muted)] hover:text-[var(--a-ink)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative aspect-[16/9] overflow-hidden bg-[#141716]">
          {webTabs.map((tab, i) => (
            <div
              key={tab.id}
              aria-hidden={i !== index}
              className={`absolute inset-0 flex justify-center gap-3 transition-opacity duration-500 motion-reduce:transition-none ${
                tab.shots.length > 1 ? "bg-[#23262d] p-3" : ""
              } ${i === index ? "opacity-100" : "opacity-0"}`}
            >
              {tab.shots.map((shot) => (
                <img
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  loading={i === 0 ? "eager" : "lazy"}
                  className={
                    tab.shots.length > 1
                      ? "h-full w-auto min-w-0 rounded-lg object-cover object-top"
                      : "h-full w-full object-cover object-top"
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="a-hand mt-4 flex items-start justify-center gap-2 text-center text-[18px] leading-snug text-[var(--a-accent)] sm:text-[21px]">
        <SketchArrow className="mt-0.5 hidden h-7 w-12 shrink-0 rotate-[200deg] text-[#f49ac1] sm:block" />
        {webTabs[index].note}
      </p>
    </div>
  );
};

export const WebHero = () => (
  <section aria-labelledby="hero-title" className="a-grid-bg relative overflow-hidden">
    <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 pb-20 pt-14 md:px-8 md:pt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:pb-24 lg:pt-14 xl:px-12">
      <div className="[container-type:inline-size]">
        <p className="a-hand mb-3 text-[22px] text-[var(--a-accent)]">תום כהן · בניית אתרים ומערכות</p>
        <h1 id="hero-title" className="text-[clamp(1.9rem,9cqi,3.6rem)] font-medium leading-[1.12] text-[var(--a-ink)]">
          <span className="block text-balance">דף נחיתה, תיק עבודות</span>{" "}
          <span className="block text-balance">או מערכת שלמה</span>
        </h1>
        <p className="mt-6 text-2xl font-medium leading-snug text-[var(--a-ink)] md:text-[1.9rem]">
          מהרעיון{" "}
          <span className="relative inline-block whitespace-nowrap">
            ועד שזה באוויר
            <DoodleUnderline className="absolute -bottom-2 start-0 h-2.5 w-full text-[var(--a-accent)]" />
            <DoodleUnderline className="absolute -bottom-[1.05rem] end-0 h-2.5 w-[88%] -scale-x-100 text-[#f49ac1] [&_path]:[animation-delay:0.8s]" />
          </span>
        </p>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--a-muted)] max-md:mx-auto">
          העיצוב, הממשק, צד השרת, התשלומים והחיבור למערכות שכבר יש לכם, הכול אצלי. אתם עובדים מול אדם אחד, מהשיחה הראשונה ועד שהאתר עולה לאוויר.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#contact" onClick={() => track("web_cta_click", { location: "hero" })} className="a-btn a-btn-solid">
            בואו נדבר על האתר שלכם
          </a>
          <a
            href={SITES.web.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("web_contact_click", { method: "whatsapp", location: "hero" })}
            className="a-btn a-btn-ghost"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            דברו איתי בוואטסאפ<span className="sr-only"> (נפתח בחלון חדש)</span>
          </a>
        </div>
      </div>
      <BrowserShowcase />
    </div>
  </section>
);
