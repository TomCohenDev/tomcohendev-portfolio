import { useEffect, useId } from "react";
import { AnimatePresence, animate, motion, useMotionValue, usePresence, useTransform, type MotionValue } from "framer-motion";
import { HAND_FONT, handStrokes, type HandWord } from "./handStrokes";

const exit = { opacity: 0, y: -4, filter: "blur(3px)", transition: { duration: 0.35, ease: "easeIn" } };

// A steady pen: it speeds up over the first 15% of the word, moves at one speed, and slows down over the last 15%.
const RAMP = 0.15;
const PEAK = 1 / (1 - RAMP);
const steadyPen = (t: number) =>
  t < RAMP ? (PEAK * t * t) / (2 * RAMP) : t < 1 - RAMP ? PEAK * (t - RAMP / 2) : 1 - (PEAK * (1 - t) ** 2) / (2 * RAMP);

/** One stroke of the pen: it draws as `progress` (in pen units along the whole word) passes through it. */
const Stroke = ({ d, len, start, pen, progress }: { d: string; len: number; start: number; pen: number; progress: MotionValue<number> }) => {
  const offset = useTransform(progress, (p) => len - Math.min(len, Math.max(0, p - start)));
  return (
    <motion.path
      d={d}
      pathLength={len}
      fill="none"
      stroke="#fff"
      strokeWidth={pen}
      // Flat ends grow in smoothly; a round end would pop in as a dot at the start of every stroke.
      strokeLinecap="butt"
      strokeLinejoin="round"
      strokeDasharray={`${len} ${len + 1}`}
      style={{ strokeDashoffset: offset }}
    />
  );
};

/**
 * The pen: the strokes traced from the font (scripts/hero-strokes.mjs) are drawn one after another by a single
 * continuous motion, and the letters show only where the pen has been, so the word writes itself right to left.
 */
const Written = ({ text, word, still }: { text: string; word: HandWord; still: boolean }) => {
  const mask = `hw${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [vx, vy, vw, vh] = word.viewBox;
  const starts = word.strokes.map((_, i) => word.strokes.slice(0, i).reduce((s, k) => s + k.len, 0));
  const total = word.strokes.reduce((s, k) => s + k.len, 0);
  const progress = useMotionValue(0);
  const [isPresent, safeToRemove] = usePresence();
  useEffect(() => {
    if (still) {
      if (!isPresent) safeToRemove();
      return;
    }
    // Leaving: the pen runs backwards from wherever it is, last stroke first, several times faster than it wrote.
    const run = isPresent
      ? // One timeline for the whole word, so the pen never stops between strokes.
        animate(progress, total, { duration: Math.min(2.2, Math.max(1.5, total / 1100)), ease: steadyPen, delay: 0.1 })
      : animate(progress, 0, { duration: 0.35, ease: [0.5, 0, 0.9, 0.6] });
    if (!isPresent) run.then(safeToRemove);
    return () => run.stop();
  }, [progress, total, still, isPresent, safeToRemove]);
  return (
    <svg viewBox={`${vx} ${vy} ${vw} ${vh}`} aria-hidden="true" className="block h-full w-auto max-w-full overflow-visible">
      {!still && (
        <defs>
          <mask id={mask} maskUnits="userSpaceOnUse" x={vx - 60} y={vy - 60} width={vw + 120} height={vh + 120}>
            {word.strokes.map((k, i) => (
              <Stroke key={i} d={k.d} len={k.len} start={starts[i]} pen={word.pen} progress={progress} />
            ))}
          </mask>
        </defs>
      )}
      <text
        x={word.x}
        y={word.y}
        direction="rtl"
        textAnchor="start"
        fontFamily={HAND_FONT.family}
        fontWeight={HAND_FONT.weight}
        fontSize={HAND_FONT.size}
        fill="currentColor"
        mask={still ? undefined : `url(#${mask})`}
      >
        {text}
      </text>
    </svg>
  );
};

// For a word without traced strokes (added to heroWords without running `npm run hero:strokes`): reveal it right to left.
const wipe = "linear-gradient(to left, #000 45%, transparent 55%)";

/** A Hebrew word that writes itself in the site's handwritten font. Decorative: the heading carries the text. */
export const HandwrittenWord = ({ text, still = false, className = "" }: { text: string; still?: boolean; className?: string }) => {
  const word = handStrokes[text];
  return (
    <AnimatePresence mode="wait" initial={!still}>
      {word ? (
        <Written key={text} text={text} word={word} still={still} />
      ) : (
        <motion.span
          key={text}
          aria-hidden="true"
          className={`a-hand inline-block whitespace-nowrap ${className}`}
          style={still ? undefined : { maskImage: wipe, WebkitMaskImage: wipe, maskSize: "220% 100%", WebkitMaskSize: "220% 100%" }}
          initial={still ? false : { maskPosition: "0% 0%", WebkitMaskPosition: "0% 0%" }}
          animate={still ? undefined : { maskPosition: "100% 0%", WebkitMaskPosition: "100% 0%", transition: { duration: 1.2 } }}
          exit={still ? undefined : exit}
        >
          {text}
        </motion.span>
      )}
    </AnimatePresence>
  );
};
