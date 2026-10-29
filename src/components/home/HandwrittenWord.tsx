import { AnimatePresence, motion } from "framer-motion";

// The mask is a gradient twice as wide as the word: visible on its right part, clear on its left, with a soft edge between.
// Sliding it across reveals the word from right to left, the way Hebrew is written.
const mask = "linear-gradient(to left, #000 45%, transparent 55%)";

/**
 * A Hebrew word that writes itself in the site's handwritten font (Playpen Sans Hebrew; Latin letters in Excalifont).
 * Decorative: the heading carries the text.
 */
export const HandwrittenWord = ({ text, still = false, className = "" }: { text: string; still?: boolean; className?: string }) => {
  // Longer words take a little longer to write.
  const duration = Math.min(1.5, 0.45 + text.length * 0.1);
  return (
    <AnimatePresence mode="wait" initial={!still}>
      <motion.span
        key={text}
        aria-hidden="true"
        className={`a-hand inline-block whitespace-nowrap ${className}`}
        style={still ? undefined : { maskImage: mask, WebkitMaskImage: mask, maskSize: "220% 100%", WebkitMaskSize: "220% 100%" }}
        initial={still ? false : { maskPosition: "0% 0%", WebkitMaskPosition: "0% 0%" }}
        animate={still ? undefined : { maskPosition: "100% 0%", WebkitMaskPosition: "100% 0%", transition: { duration, ease: [0.45, 0.05, 0.4, 1] } }}
        exit={still ? undefined : { opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: 0.25 } }}
      >
        {text}
      </motion.span>
    </AnimatePresence>
  );
};
