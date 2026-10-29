import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HAND_FONT, handStrokes, type HandWord } from "./handStrokes";

const exit = { opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: 0.25 } };

/**
 * The pen: each stroke traced from the font (scripts/hero-strokes.mjs) draws in turn, and the letters show only where
 * the pen has been, so the word writes itself letter by letter, right to left.
 */
const Written = ({ text, word, still }: { text: string; word: HandWord; still: boolean }) => {
  const mask = `hw${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [vx, vy, vw, vh] = word.viewBox;
  const total = word.strokes.reduce((s, k) => s + k.len, 0);
  // About 1.1 to 1.8 seconds a word, with a short lift of the pen between strokes.
  const gap = 0.045;
  const writing = Math.min(1.8, Math.max(1.1, total / 2600)) - gap * (word.strokes.length - 1);
  let at = 0.1;
  const timing = word.strokes.map((k) => {
    const t = { delay: at, duration: Math.max(0.06, (k.len / total) * writing) };
    at += t.duration + gap;
    return t;
  });
  return (
    <motion.svg viewBox={`${vx} ${vy} ${vw} ${vh}`} aria-hidden="true" className="block h-full w-auto max-w-full overflow-visible" exit={still ? undefined : exit}>
      {!still && (
        <defs>
          <mask id={mask} maskUnits="userSpaceOnUse" x={vx} y={vy} width={vw} height={vh}>
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
                  pathLength: { delay: timing[i].delay, duration: timing[i].duration, ease: "easeInOut" },
                  opacity: { delay: timing[i].delay, duration: 0.01 },
                }}
              />
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
