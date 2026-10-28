/**
 * Hand-drawn decorations in the spirit of the main site's Excalidraw look. All are decorative
 * (aria-hidden) and take their colour from `currentColor`.
 */

import type { CSSProperties } from "react";

type Props = { className?: string };

const stroke = { stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const Squiggle = ({ className = "" }: Props) => (
  <svg viewBox="0 0 120 16" fill="none" preserveAspectRatio="none" aria-hidden="true" className={className}>
    <path d="M3 9C11 2 17 2 23 9C29 15 36 15 42 8C48 2 55 2 61 9C67 15 74 15 80 8C86 2 93 2 99 9C105 15 111 14 117 7" {...stroke} />
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
