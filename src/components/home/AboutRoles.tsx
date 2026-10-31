import { useEffect, useRef, useState } from "react";
import DynamicVisual from "@/components/DynamicVisual";
import { useInView } from "@/lib/useInView";
import { usePrefersReducedMotion } from "../automation/useReducedMotion";
import { aboutWords } from "./content";
import { HandwrittenWord } from "./HandwrittenWord";

const WORD_MS = 5500;

/** The hero's word and drawing, for the three roles in the About text. It runs by itself and rests while off screen. */
export const AboutRoles = () => {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const onScreen = useInView(box);
  const word = aboutWords[index];

  useEffect(() => {
    if (reduced || !onScreen) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % aboutWords.length), WORD_MS);
    return () => clearTimeout(t);
  }, [index, reduced, onScreen]);

  return (
    <div ref={box} aria-hidden="true" className="flex w-full flex-col items-center gap-2">
      <div className="flex h-[clamp(3.25rem,6vw,4.5rem)] w-full items-center justify-center text-[var(--a-accent)]">
        <HandwrittenWord text={word.text} still={reduced} className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.25]" />
      </div>
      <div className="flex h-[280px] w-full items-center justify-center overflow-hidden sm:h-[360px]">
        <DynamicVisual currentSvgIndex={word.visual} />
      </div>
    </div>
  );
};
