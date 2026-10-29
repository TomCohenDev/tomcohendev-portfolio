import { useEffect, useState } from "react";
import { ArrowLeft, Pause, Play } from "lucide-react";
import DynamicVisual from "@/components/DynamicVisual";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion } from "../automation/useReducedMotion";
import { heroWords } from "./content";
import { HandwrittenWord } from "./HandwrittenWord";

const WORD_MS = 4500;

/**
 * "אני בונה ___": the word writes itself by hand and the drawing next to it changes with it,
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
          <p className="a-hand mb-2 text-[22px] text-[var(--a-accent)]">
            תום כהן · מפתח <bdi>Full-stack</bdi>
          </p>
          <h1
            id="hero-title"
            className="text-[clamp(2.3rem,6vw,4.2rem)] font-medium leading-[1.1] text-[var(--a-ink)]"
          >
            אני בונה
            <span className="sr-only">
              {" "}
              אפליקציות, אוטומציות ומערכות לעסקים
            </span>
          </h1>
          {/* Mouse users can click the word to move on; the pause button below is the keyboard control. */}
          <div
            onClick={next}
            className="mt-1 flex h-[clamp(5.5rem,13vw,9.5rem)] cursor-pointer items-center justify-center text-[var(--a-accent)] lg:justify-start"
          >
            <HandwrittenWord
              text={word.text}
              still={reduced}
              className="text-[clamp(3.2rem,11vw,7rem)] leading-[1.25]"
            />
          </div>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--a-muted)] md:text-xl">
            אפליקציות לאייפון ולאנדרואיד, ואוטומציות שחוסכות לעסק עבודה ידנית.
            מהאפיון, דרך הקוד, ועד שזה עובד אצלכם ביום־יום.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/mobile"
              onClick={() =>
                track("home_cta_click", { location: "hero", target: "mobile" })
              }
              className="a-btn a-btn-solid"
            >
              פיתוח אפליקציות
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="/automation"
              onClick={() =>
                track("home_cta_click", {
                  location: "hero",
                  target: "automation",
                })
              }
              className="a-btn a-btn-ghost"
            >
              אוטומציה לעסקים
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
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
