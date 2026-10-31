import { useId, type ReactNode } from "react";

const INK = "#E0D0C1";
const PURPLE = "#BF95F9";
const AMBER = "#F2C46D";
const OK = "#43b581";
const LINE = 5;

/** A drawing from a 100-unit box, placed in the margin. The line keeps its weight at any scale. */
const At = ({ x, y, s = 1, r = 0, children }: { x: number; y: number; s?: number; r?: number; children: ReactNode }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeWidth={LINE / s}>
    {children}
  </g>
);

const Sparkle = () => <path d="M50 8c3 28 13 38 42 42-29 4-39 14-42 42-3-28-13-38-42-42 29-4 39-14 42-42z" />;

const Gear = () => (
  <>
    <circle cx="50" cy="50" r="27" />
    <circle cx="50" cy="50" r="10" stroke={PURPLE} />
    <path d="M50 8v15M50 77v15M8 50h15M77 50h15M20 20l11 11M69 69l11 11M80 20L69 31M31 69L20 80" />
  </>
);

const Bulb = () => (
  <>
    <path d="M50 8C28 8 16 26 22 44c3 9 12 13 13 26h30c1-13 10-17 13-26C84 26 72 8 50 8z" />
    <path d="M36 80h28M41 91h18" />
    <path d="M42 48l8-12 8 12" stroke={AMBER} />
  </>
);

const Plane = () => <path d="M4 46L96 8 74 90 46 62 4 46zM46 62l50-54" />;

const Code = () => (
  <>
    <path d="M32 22L6 50l26 28M68 22l26 28-26 28" />
    <path d="M58 14L42 86" stroke={PURPLE} />
  </>
);

const Chat = () => (
  <>
    <path d="M8 12h84v58H42L22 90V70H8z" />
    <path d="M30 41h.1M50 41h.1M70 41h.1" stroke={PURPLE} strokeWidth={LINE * 2} />
  </>
);

const Check = () => (
  <>
    <circle cx="50" cy="50" r="42" />
    <path d="M28 52l15 17 30-36" stroke={OK} />
  </>
);

const Trail = ({ d }: { d: string }) => <path d={d} stroke={PURPLE} strokeWidth={LINE} strokeDasharray="2 17" />;

const SCENES = {
  aboutLeft: (
    <>
      <At x={80} y={60} s={1.1} r={-8}>
        <Code />
      </At>
      <At x={215} y={185} s={0.42}>
        <Sparkle />
      </At>
      <At x={-105} y={330} s={2.6}>
        <Gear />
      </At>
    </>
  ),
  aboutRight: (
    <>
      <At x={88} y={30} s={1.75} r={10}>
        <Bulb />
      </At>
      <At x={30} y={70} s={0.4}>
        <Sparkle />
      </At>
      <At x={55} y={285} s={0.95} r={-10}>
        <Plane />
      </At>
      <Trail d="M50 385C20 440 120 460 110 530S200 580 320 560" />
    </>
  ),
  contactLeft: (
    <>
      <At x={70} y={70} s={1.5} r={-6}>
        <Chat />
      </At>
      <At x={225} y={250} s={0.4}>
        <Sparkle />
      </At>
      <Trail d="M120 225C70 300 210 340 150 420S20 500 -20 490" />
    </>
  ),
  contactRight: (
    <>
      <At x={120} y={120} s={1.75} r={8}>
        <Check />
      </At>
      <At x={40} y={70} s={0.42}>
        <Sparkle />
      </At>
      <At x={45} y={370} s={1.05} r={-6}>
        <Plane />
      </At>
    </>
  ),
};

/**
 * Static chalk drawings for the empty side margins of a narrow section, cropped by the edge of the page. They are sized
 * to the margin and are left out when it is too small to hold them (see .side-doodle in home.css). The section must be
 * `relative` and clip what overflows.
 */
export const SideDoodle = ({ scene, side }: { scene: keyof typeof SCENES; side: "left" | "right" }) => {
  const filter = `wobble${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg
      viewBox="0 0 300 560"
      aria-hidden="true"
      className={`side-doodle side-doodle-${side}`}
      fill="none"
      stroke={INK}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={LINE}
    >
      <defs>
        <filter id={filter} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={4} />
          <feDisplacementMap in="SourceGraphic" scale={4} />
        </filter>
      </defs>
      <g filter={`url(#${filter})`}>{SCENES[scene]}</g>
    </svg>
  );
};
