import { AnimatePresence, motion, type Variants } from "framer-motion";
import { HAND_HEIGHT, writeWord } from "./handLetters";

// Same feel as the English hero (HandwritingMVP.tsx): strokes write in one after another and erase in reverse.
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.1 + i * 0.07, type: "spring", duration: 0.45, bounce: 0 },
      opacity: { delay: 0.1 + i * 0.07, duration: 0.01 },
    },
  }),
  exit: (i: number) => ({
    pathLength: 0,
    opacity: 0,
    transition: {
      pathLength: { delay: (24 - i) * 0.012, type: "spring", duration: 0.25, bounce: 0 },
      opacity: { delay: (24 - i) * 0.012 + 0.1, duration: 0.05 },
    },
  }),
};

/** A Hebrew word that writes itself in marker strokes. Decorative: the heading carries the text. */
export const HandwrittenWord = ({ text, still = false, className = "" }: { text: string; still?: boolean; className?: string }) => {
  const { width, strokes } = writeWord(text);
  return (
    <AnimatePresence mode="wait" initial={!still}>
      <motion.svg
        key={text}
        viewBox={`0 0 ${width} ${HAND_HEIGHT}`}
        fill="none"
        aria-hidden="true"
        className={className}
        style={{ aspectRatio: `${width} / ${HAND_HEIGHT}` }}
      >
        {strokes.map((s, i) => (
          <motion.path
            key={i}
            d={s.d}
            transform={s.transform}
            stroke="currentColor"
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            custom={i}
            initial={still ? false : "hidden"}
            animate="visible"
            exit={still ? undefined : "exit"}
          />
        ))}
      </motion.svg>
    </AnimatePresence>
  );
};
