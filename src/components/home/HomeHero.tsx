import { useEffect, useState } from "react";
import { ArrowLeft, Pause, Play } from "lucide-react";
import DynamicVisual from "@/components/DynamicVisual";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion } from "../automation/useReducedMotion";
import { heroWords } from "./content";
import { HandwrittenWord } from "./HandwrittenWord";

const WORD_MS = 4500;

/**
 * "חדשות, מדריכים וכלים למפתחים", and beside it a word that writes itself by hand above a drawing that changes with it,
 * as in the English hero. Clicking the word or the drawing moves on; the button stops the cycle.
 */
export const HomeHero = () => {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const word = heroWords[index];
  const next = () => setIndex((i) => (i + 1) % heroWords.length);

  // A timer per word, so a click also restarts the count.
  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % heroWords.length),
      WORD_MS,
    );
    return () => clearTimeout(t);
  }, [index, paused, reduced]);

  return (
    <section
      aria-labelledby="hero-title"
      className="a-grid-bg relative overflow-hidden"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 pb-20 pt-12 md:px-8 md:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:pb-16 lg:pt-14 xl:px-12">
        <div>
          <p className="a-hand text-[26px] text-[var(--a-accent)]">
            תום כהן · פיתוח <bdi>Fullstack</bdi> · אוטומציה · <bdi>AI</bdi>
          </p>
          <h1
            id="hero-title"
            className="text-[clamp(2.6rem,6.8vw,4.8rem)] font-medium leading-[1.1] text-[var(--a-ink)]"
          >
            חדשות, מדריכים וכלים למפתחים
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-xl leading-relaxed text-[var(--a-muted)] md:text-2xl">
            אני כותב על מה שאני עושה ביום יום: פיתוח <bdi>Fullstack</bdi>,
            אפליקציות, אוטומציה ו-<bdi>AI</bdi>. חדשות, מדריכים מהשטח
            וכלים שחוסכים זמן.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/news"
              onClick={() =>
                track("home_cta_click", { location: "hero", target: "news" })
              }
              className="a-btn a-btn-ghost"
            >
              חדשות
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="/blog"
              onClick={() =>
                track("home_cta_click", { location: "hero", target: "blog" })
              }
              className="a-btn a-btn-ghost"
            >
              בלוג
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#services"
              onClick={() =>
                track("home_cta_click", {
                  location: "hero",
                  target: "services",
                })
              }
              className="a-btn a-btn-solid"
            >
              מחפשים פתרון לעסק?
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          {/* The word sits above the drawing it goes with. Mouse users can click either to move on. */}
          <div
            onClick={next}
            className="flex h-[clamp(3.5rem,7.5vw,5.5rem)] w-full cursor-pointer items-center justify-center text-[var(--a-accent)]"
          >
            <HandwrittenWord
              text={word.text}
              still={reduced}
              className="text-[clamp(2.2rem,6vw,4rem)] leading-[1.25]"
            />
          </div>
          <div
            aria-hidden="true"
            onClick={next}
            className="flex h-[300px] w-full cursor-pointer items-center justify-center overflow-hidden sm:h-[410px]"
          >
            <DynamicVisual currentSvgIndex={word.visual} />
          </div>
        </div>
      </div>
    </section>
  );
};
