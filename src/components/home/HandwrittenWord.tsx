import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HAND_FONT, handStrokes, type HandWord } from "./handStrokes";

const exit = { opacity: 0, y: -4, filter: "blur(3px)", transition: { duration: 0.35, ease: "easeIn" } };

/**
 * The pen: each stroke traced from the font (scripts/hero-strokes.mjs) draws in turn, and the letters show only where
 * the pen has been, so the word writes itself letter by letter, right to left.
 */
const Written = ({ text, word, still }: { text: string; word: HandWord; still: boolean }) => {
  const mask = `hw${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [vx, vy, vw, vh] = word.viewBox;
  const total = word.strokes.reduce((s, k) => s + k.len, 0);
  // The pen moves at one steady speed, about 1.2 to 1.9 seconds a word, and lifts only briefly between strokes.
  const gap = 0.018;
  const writing = Math.min(1.9, Math.max(1.2, total / 2400)) - gap * (word.strokes.length - 1);
  let at = 0.12;
  const timing = word.strokes.map((k) => {
    const t = { delay: at, duration: Math.max(0.05, (k.len / total) * writing) };
    at += t.duration + gap;
    return t;
  });
  return (
    <motion.svg
      viewBox={`${vx} ${vy} ${vw} ${vh}`}
      aria-hidden="true"
      className="block h-full w-auto max-w-full overflow-visible"
      exit={still ? undefined : exit}
    >
      {!still && (
        <defs>
          {/* A slightly soft pen edge, so the ink flows in rather than being cut out. */}
          <filter id={`${mask}s`} x={vx - 60} y={vy - 60} width={vw + 120} height={vh + 120} filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation={word.pen / 14} />
          </filter>
          <mask id={mask} maskUnits="userSpaceOnUse" x={vx - 60} y={vy - 60} width={vw + 120} height={vh + 120}>
            <g filter={`url(#${mask}s)`}>
              {word.strokes.map((k, i) => (
                <motion.path
                  key={i}
                  d={k.d}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={word.pen}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    // Linear inside a stroke, gently eased at the very start and end of the word.
                    pathLength: {
                      delay: timing[i].delay,
                      duration: timing[i].duration,
                      ease: i === 0 ? [0.4, 0, 1, 1] : i === word.strokes.length - 1 ? [0, 0, 0.5, 1] : "linear",
                    },
                    opacity: { delay: timing[i].delay, duration: 0.01 },
                  }}
                />
              ))}
            </g>
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
    </motion.svg>
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
