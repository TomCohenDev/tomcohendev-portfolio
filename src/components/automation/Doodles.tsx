/**
 * Hand-drawn decorations in the spirit of the main site's Excalidraw look. All are decorative
 * (aria-hidden) and take their colour from `currentColor`.
 */

import type { CSSProperties } from "react";

type Props = { className?: string };

const stroke = { stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** A loose, gently wavy underline. */
export const Squiggle = ({ className = "" }: Props) => (
  <svg viewBox="0 0 300 14" fill="none" preserveAspectRatio="none" aria-hidden="true" className={className}>
    <path d="M3 8C30 3 55 3 80 7.5S130 12 155 7.5S205 3 230 7S275 11.5 297 6.5" {...stroke} strokeWidth={4} />
  </svg>
);

/** A circle drawn in one loose stroke that overshoots its start, like a quick marker circle. `seed` varies the wobble. */
export const SketchCircle = ({ className = "", seed = 0 }: Props & { seed?: number }) => {
  const points: string[] = [];
  const steps = 40;
  for (let i = 0; i <= steps * 1.12; i++) {
    const t = (i / steps) * Math.PI * 2 + seed;
    const r = 25 + Math.sin(t * 3 + seed * 2) * 1.4 + (i / steps) * 1.6;
    points.push(`${(32 + Math.cos(t) * r).toFixed(1)},${(32 + Math.sin(t) * r).toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <path d={`M${points.join(" L")}`} {...stroke} />
    </svg>
  );
};

/** A curved hand-drawn arrow pointing to the start of the line (left in this RTL layout). `dip` bends it downwards. */
export const SketchArrow = ({ className = "", dip = false, style }: Props & { dip?: boolean; style?: CSSProperties }) => (
  <svg viewBox="0 0 80 40" fill="none" aria-hidden="true" className={`${className} ${dip ? "-scale-y-100" : ""}`} style={style}>
    <path d="M74 26C60 8 32 6 10 20" {...stroke} />
    <path d="M18 10L9 20.5L21 25" {...stroke} />
  </svg>
);
