import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { rect } from "./sketch/rough";
import { PAPER, PEN, Patterns, SCENES, SketchProvider } from "./sketch/scenes";

interface DynamicVisualProps {
  currentSvgIndex: number;
  overrideIndex?: number | null;
}

/**
 * The hand-drawn sketch next to the hero word: 0 roadmap, 1 phone, 2 web app, 3 dashboard, 4 workflow, 5 AI network.
 * The frame morphs from one shape to the next, the new scene is drawn into it with a pen, and every line "boils"
 * slightly (a displacement filter whose noise changes a few times a second), like a hand-drawn animation.
 */
const DynamicVisual: React.FC<DynamicVisualProps> = ({ currentSvgIndex, overrideIndex = null }) => {
  const index = overrideIndex !== null ? overrideIndex : currentSvgIndex;
  const { w, h, r, Scene } = SCENES[index] ?? SCENES[0];
  const still = !!useReducedMotion();
  const uid = `dv${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  // Line boil: a new noise seed about seven times a second.
  const noise = useRef<SVGFETurbulenceElement>(null);
  useEffect(() => {
    if (still) return;
    let seed = 1;
    const t = setInterval(() => {
      seed = (seed % 4) + 1;
      noise.current?.setAttribute("seed", String(seed));
    }, 140);
    return () => clearInterval(t);
  }, [still]);

  // The frame is centered in a 480 by 400 canvas.
  const x = 240 - w / 2;
  const y = 200 - h / 2;
  const seed = index * 17 + 3;
  const morph = { duration: 0.85, ease: [0.34, 1.25, 0.5, 1] as [number, number, number, number] };

  return (
    <div dir="ltr" className="flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 480 400" aria-hidden="true" className="block h-auto max-h-full w-full max-w-[480px] overflow-visible">
        <defs>
          <Patterns uid={uid} />
          <filter id={`${uid}-boil`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence ref={noise} type="fractalNoise" baseFrequency="0.028" numOctaves={2} seed={1} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={2.6} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <g filter={`url(#${uid}-boil)`}>
          {/* A second outline, a little off, behind the frame */}
          <motion.path
            initial={false}
            animate={{ d: rect(x + 6, y - 5, w, h, r, seed + 5, 2) }}
            transition={morph}
            fill="none"
            stroke={PEN}
            strokeOpacity={0.3}
            strokeWidth={2}
          />
          <motion.path initial={false} animate={{ d: rect(x, y, w, h, r, seed, 0.5) }} transition={morph} fill={PAPER} fillOpacity={0.6} />
          <motion.path
            initial={false}
            animate={{ d: rect(x, y, w, h, r, seed, 1.4) }}
            transition={morph}
            fill="none"
            stroke={PEN}
            strokeWidth={3.6}
            strokeLinecap="round"
          />
          <motion.path
            initial={false}
            animate={{ d: rect(x, y, w, h, r, seed + 9, 1.8) }}
            transition={morph}
            fill="none"
            stroke={PEN}
            strokeOpacity={0.45}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
          <SketchProvider value={{ uid, still }}>
            <AnimatePresence mode="wait" initial={!still}>
              <motion.g key={index} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.22 } }}>
                <g transform={`translate(${x} ${y})`}>
                  <Scene />
                </g>
              </motion.g>
            </AnimatePresence>
          </SketchProvider>
        </g>
      </svg>
    </div>
  );
};

export default DynamicVisual;
