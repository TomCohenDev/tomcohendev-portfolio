import { createContext, useContext, useEffect, type ReactNode } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { bezierAt, bezierPath, box, circle, curve, line, rect, straight, type Bezier, type Pt } from "./rough";

/**
 * The scenes inside the hero frame, one per word. Each is drawn with a pen when it appears (outlines first, then
 * hatched color, then the small details) and keeps a small loop going while it is on screen: packets moving
 * through a workflow, a cursor clicking, bars that breathe. Coordinates are local to the frame, from its top left.
 */

export const PEN = "#bf95f9";
export const INK = "#E0D0C1";
export const PAPER = "#121413";
const FONT = '"Excalifont", "Playpen Sans Hebrew", cursive';

export const C = {
  blue: "#60a5fa",
  green: "#4ade80",
  orange: "#fb923c",
  purple: "#c084fc",
  red: "#f87171",
  pink: "#f472b6",
  indigo: "#818cf8",
  teal: "#2dd4bf",
  cyan: "#22d3ee",
  yellow: "#facc15",
};
type Hue = keyof typeof C;

const Sketch = createContext({ uid: "s", still: false });
export const SketchProvider = Sketch.Provider;
const useSketch = () => useContext(Sketch);

/** Diagonal hatching in every color, the way a marker fills a shape. */
export const Patterns = ({ uid }: { uid: string }) => (
  <>
    {(Object.keys(C) as Hue[]).map((hue) => (
      <pattern key={hue} id={`${uid}-${hue}`} width={5.5} height={5.5} patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
        <line x1={0} y1={0} x2={0} y2={5.5} stroke={C[hue]} strokeWidth={1.8} strokeOpacity={0.85} />
      </pattern>
    ))}
  </>
);

// ---------------------------------------------------------------------------------------------------------------
// Pen and marker

type DrawProps = { d: string; at?: number; dur?: number; color?: string; w?: number; o?: number };

/** A stroke that the pen draws from start to end. */
const Draw = ({ d, at = 0, dur = 0.45, color = INK, w = 2.2, o = 1 }: DrawProps) => {
  const { still } = useSketch();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={w}
      strokeOpacity={o}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={still ? false : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ pathLength: { delay: at, duration: dur, ease: [0.45, 0, 0.3, 1] }, opacity: { delay: at, duration: 0.01 } }}
    />
  );
};

/** A dashed guide line; dashes can't be drawn with pathLength, so it fades in instead. */
const Dashed = ({ d, at = 0, o = 0.22, color = INK, w = 1.6 }: DrawProps) => {
  const { still } = useSketch();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={w}
      strokeDasharray="4 7"
      strokeLinecap="round"
      initial={still ? false : { opacity: 0 }}
      animate={{ opacity: o }}
      transition={{ delay: at, duration: 0.4 }}
    />
  );
};

/** Hatched color, laid in a moment after the outline and a little off it, like a marker. */
const Fill = ({ d, hue, at = 0 }: { d: string; hue: Hue; at?: number }) => {
  const { uid, still } = useSketch();
  return (
    <motion.g initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: at, duration: 0.35 }}>
      <path d={d} fill={C[hue]} fillOpacity={0.14} />
      <path d={d} fill={`url(#${uid}-${hue})`} />
    </motion.g>
  );
};

type BoxProps = { x: number; y: number; w: number; h: number; r?: number; seed: number; at?: number; dur?: number; color?: string; sw?: number; o?: number; fill?: Hue };

/** A rounded box: hatched fill, then the outline, then a lighter second pass of the pen. */
const Box = ({ x, y, w, h, r = 8, seed, at = 0, dur = 0.45, color = INK, sw = 2.2, o = 1, fill }: BoxProps) => (
  <>
    {fill && <Fill d={box(x + 2, y + 2, w - 2.5, h - 2.5, r)} hue={fill} at={at + dur * 0.55} />}
    <Draw d={rect(x, y, w, h, r, seed)} at={at} dur={dur} color={color} w={sw} o={o} />
    <Draw d={rect(x, y, w, h, r, seed + 71, 1.5)} at={at + dur * 0.4} dur={dur} color={color} w={sw * 0.5} o={o * 0.45} />
  </>
);

const disc = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;

type RingProps = { cx: number; cy: number; r: number; seed: number; at?: number; dur?: number; color?: string; sw?: number; o?: number; fill?: Hue };

const Ring = ({ cx, cy, r, seed, at = 0, dur = 0.4, color = INK, sw = 2.2, o = 1, fill }: RingProps) => (
  <>
    {fill && <Fill d={disc(cx + 1, cy + 1, r - 1)} hue={fill} at={at + dur * 0.5} />}
    <Draw d={circle(cx, cy, r, seed)} at={at} dur={dur} color={color} w={sw} o={o} />
  </>
);

/** Places its children at x, y and pops them in with a little spring. */
const Pop = ({ x, y, at = 0, s = 1, children }: { x: number; y: number; at?: number; s?: number; children: ReactNode }) => {
  const { still } = useSketch();
  return (
    <g transform={`translate(${x} ${y})${s === 1 ? "" : ` scale(${s})`}`}>
      <motion.g
        initial={still ? false : { scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: at, type: "spring", stiffness: 420, damping: 16 }}
      >
        {children}
      </motion.g>
    </g>
  );
};

/** Grows its children out of one edge, with a small overshoot. */
const Grow = ({ axis, origin, at = 0, children }: { axis: "x" | "y"; origin: string; at?: number; children: ReactNode }) => {
  const { still } = useSketch();
  return (
    <motion.g
      style={{ transformOrigin: origin }}
      initial={still ? false : axis === "x" ? { scaleX: 0 } : { scaleY: 0 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ delay: at, duration: 0.6, ease: [0.3, 1.35, 0.5, 1] }}
    >
      {children}
    </motion.g>
  );
};

const Hand = ({ x, y, size, color = INK, o = 1, at = 0, anchor = "start", children }: { x: number; y: number; size: number; color?: string; o?: number; at?: number; anchor?: "start" | "middle"; children: ReactNode }) => {
  const { still } = useSketch();
  return (
    <motion.text
      x={x}
      y={y}
      fontFamily={FONT}
      fontSize={size}
      fill={color}
      textAnchor={anchor}
      initial={still ? false : { opacity: 0 }}
      animate={{ opacity: o }}
      transition={{ delay: at, duration: 0.3 }}
    >
      {children}
    </motion.text>
  );
};

/** A number in handwriting that counts up to its value. */
const Count = ({ x, y, to, at = 0, suffix = "", size = 36, color = INK }: { x: number; y: number; to: number; at?: number; suffix?: string; size?: number; color?: string }) => {
  const { still } = useSketch();
  const v = useMotionValue(0);
  const shown = useTransform(v, (k) => `${Math.round(k).toLocaleString("en-US")}${suffix}`);
  useEffect(() => {
    if (still) {
      v.set(to);
      return;
    }
    const run = animate(v, to, { delay: at, duration: 1.5, ease: [0.2, 0.7, 0.3, 1] });
    return () => run.stop();
  }, [still, v, to, at]);
  return (
    <motion.text
      x={x}
      y={y}
      fontFamily={FONT}
      fontSize={size}
      fill={color}
      initial={still ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: at, duration: 0.3 }}
    >
      <motion.tspan>{shown}</motion.tspan>
    </motion.text>
  );
};

// ---------------------------------------------------------------------------------------------------------------
// Little drawings, centered on 0,0 and about 24 across

const GLYPH = {
  mail: "M-11 -8H11V8H-11Z M-11 -8L0 1L11 -8",
  play: "M0 -10A10 10 0 1 1 -0.1 -10 M-3 -5.5L5 0L-3 5.5Z",
  sun: "M0 -6A6 6 0 1 1 -0.1 -6 M0 -13V-10 M0 10V13 M-13 0H-10 M10 0H13 M-9 -9L-7 -7 M7 7L9 9 M9 -9L7 -7 M-7 7L-9 9",
  note: "M-4 7V-9L8 -12V4 M-4 7A3.5 3 0 1 1 -11 7A3.5 3 0 1 1 -4 7 M8 4A3.5 3 0 1 1 1 4A3.5 3 0 1 1 8 4",
  heart: "M0 10C-12 2 -10 -9 -4 -8C-1.5 -7.6 0 -5 0 -4C0 -5 1.5 -7.6 4 -8C10 -9 12 2 0 10Z",
  camera: "M-11 -5H-5L-3 -8H3L5 -5H11V8H-11Z M0 -2.5A4 4 0 1 1 -0.1 -2.5",
  pin: "M0 11C-7 3 -8 -1 -8 -3A8 8 0 0 1 8 -3C8 -1 7 3 0 11Z M0 -6A3 3 0 1 1 -0.1 -6",
  check: "M-9 0L-3 7L9 -7",
  wave: "M-11 6L-5 -1L0 3L5 -6L11 0",
  bolt: "M3 -12L-7 2H0L-3 12L7 -2H0Z",
  sheet: "M-10 -9H10V9H-10Z M-10 -3H10 M-10 3H10 M-3 -9V9",
  spark: "M0 -12C1.5 -3 3 -1.5 12 0C3 1.5 1.5 3 0 12C-1.5 3 -3 1.5 -12 0C-3 -1.5 -1.5 -3 0 -12Z",
  chat: "M-10 -8H10V5H-2L-7 10V5H-10Z",
  user: "M0 -9A4 4 0 1 1 -0.1 -9 M-8 9C-8 2 8 2 8 9",
};
type GlyphName = keyof typeof GLYPH;

const Glyph = ({ name, at = 0, s = 1, color = INK, w = 2 }: { name: GlyphName; at?: number; s?: number; color?: string; w?: number }) => (
  <g transform={s === 1 ? undefined : `scale(${s})`}>
    <Draw d={GLYPH[name]} at={at} dur={0.4} color={color} w={w / s} />
  </g>
);

// ---------------------------------------------------------------------------------------------------------------
// Loops

/** A dot of data that runs along a path once per `period`, between `start` and `start + dur`. */
const Packet = ({ path, hue, period, start, dur, delay, r = 4.5 }: { path: Bezier; hue: Hue; period: number; start: number; dur: number; delay: number; r?: number }) => {
  const { still } = useSketch();
  const t = useMotionValue(0);
  useEffect(() => {
    if (still) return;
    const run = animate(t, [0, 0, 1, 1], {
      duration: period,
      times: [0, start / period, Math.min(1, (start + dur) / period), 1],
      ease: "easeInOut",
      repeat: Infinity,
      delay,
    });
    return () => run.stop();
  }, [still, t, period, start, dur, delay]);
  const cx = useTransform(t, (v) => bezierAt(path, v).x);
  const cy = useTransform(t, (v) => bezierAt(path, v).y);
  const opacity = useTransform(t, (v) => (v > 0.002 && v < 0.998 ? 1 : 0));
  if (still) return null;
  return (
    <motion.g style={{ opacity }}>
      <motion.circle cx={cx} cy={cy} r={r * 2.3} fill={C[hue]} fillOpacity={0.22} />
      <motion.circle cx={cx} cy={cy} r={r} fill={C[hue]} />
    </motion.g>
  );
};

/** A ring that spreads out and fades, once per `period`, at `at` seconds into it. */
const Ripple = ({ cx, cy, r0, r1, color, period, delay, at = 0, sw = 2 }: { cx: number; cy: number; r0: number; r1: number; color: string; period: number; delay: number; at?: number; sw?: number }) => {
  const { still } = useSketch();
  if (still) return null;
  const a = at / period;
  const b = Math.min(0.999, (at + 0.7) / period);
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r0}
      fill="none"
      stroke={color}
      strokeWidth={sw}
      initial={{ r: r0, opacity: 0 }}
      animate={{ r: [r0, r0, r0, r1, r1], opacity: [0, 0, 0.75, 0, 0] }}
      transition={{ duration: period, times: [0, a, a + 0.001, b, 1], ease: "easeOut", repeat: Infinity, delay }}
    />
  );
};

/** Keyframes on a loop, or the resting state when motion is reduced. */
const useLoop = (period: number, delay: number) => {
  const { still } = useSketch();
  return { still, transition: { duration: period, repeat: Infinity, delay, ease: "easeInOut" as const } };
};

// ---------------------------------------------------------------------------------------------------------------
// 0 · Products: a roadmap whose bars fill in and get ticked off, up to a launch flag

const Roadmap = () => {
  const rows: { y: number; a: number; b: number; hue: Hue }[] = [
    { y: 84, a: 104, b: 214, hue: "blue" },
    { y: 130, a: 162, b: 272, hue: "green" },
    { y: 176, a: 222, b: 312, hue: "orange" },
    { y: 222, a: 270, b: 348, hue: "purple" },
  ];
  const { still, transition } = useLoop(3.4, 2.6);
  return (
    <>
      <Draw d={line(26, 38, 150, 38, 1)} w={4} at={0.3} dur={0.4} />
      <Draw d={line(26, 58, 98, 58, 2)} o={0.4} at={0.5} dur={0.3} />
      {[136, 196, 256, 316].map((x, i) => (
        <Dashed key={x} d={line(x, 70, x, 262, 10 + i, 0.4)} at={0.5 + i * 0.05} />
      ))}
      {rows.map((row, i) => {
        const at = 0.7 + i * 0.32;
        return (
          <g key={i}>
            <Draw d={line(26, row.y + 13, 66 + (i % 2) * 16, row.y + 13, 20 + i)} o={0.45} at={at - 0.15} dur={0.25} />
            <Grow axis="x" origin="0% 50%" at={at}>
              <Box x={row.a} y={row.y} w={row.b - row.a} h={26} r={9} seed={30 + i} color={C[row.hue]} fill={row.hue} at={at} dur={0.4} />
            </Grow>
            <Pop x={row.b - 15} y={row.y + 13} at={at + 0.5} s={0.55}>
              <Glyph name="check" at={at + 0.5} w={2.4} />
            </Pop>
          </g>
        );
      })}
      {/* Launch: a flag past the last bar, with a little burst */}
      <Draw d={line(362, 188, 362, 252, 60, 0.6)} w={2.6} at={2.0} dur={0.3} />
      <g transform="translate(362 190)">
        <motion.g
          style={{ transformOrigin: "0% 50%" }}
          initial={still ? false : { scaleX: 0 }}
          animate={still ? { scaleX: 1 } : { scaleX: 1, skewY: [0, -7, 0, 5, 0] }}
          transition={still ? undefined : { scaleX: { delay: 2.25, duration: 0.35 }, skewY: { ...transition, duration: 1.6 } }}
        >
          <Fill d="M0 0L22 7L0 15Z" hue="red" at={2.3} />
          <Draw d="M0 0L22 7L0 15" color={C.red} at={2.25} dur={0.3} />
        </motion.g>
      </g>
      {[
        [380, 180, 387, 172],
        [384, 192, 392, 192],
        [368, 176, 369, 167],
      ].map(([x1, y1, x2, y2], i) => (
        <Draw key={i} d={line(x1, y1, x2, y2, 70 + i, 0.4)} color={C.yellow} w={2.4} at={2.6 + i * 0.06} dur={0.15} />
      ))}
      {/* Today, moving across the plan */}
      {!still && (
        <motion.g initial={{ x: 0, opacity: 0 }} animate={{ x: [0, 244], opacity: [0, 0.7, 0.7, 0] }} transition={{ ...transition, ease: "linear" }}>
          <Dashed d={line(104, 72, 104, 260, 80, 0.3)} color={C.red} o={1} w={1.8} />
          <path d="M98 66L110 66L104 74Z" fill={C.red} />
        </motion.g>
      )}
    </>
  );
};

// ---------------------------------------------------------------------------------------------------------------
// 1 · Apps: the frame is the phone; icons pop in, a notification drops, a badge appears, a finger taps

const Phone = () => {
  const icons: [Hue, GlyphName][] = [
    ["blue", "mail"],
    ["green", "play"],
    ["orange", "sun"],
    ["purple", "note"],
    ["red", "heart"],
    ["pink", "camera"],
    ["indigo", "pin"],
    ["teal", "check"],
    ["cyan", "wave"],
  ];
  const { still } = useSketch();
  return (
    <>
      <Draw d={line(84, 22, 126, 22, 1, 0.5)} w={5} o={0.5} at={0.3} dur={0.25} />
      <Ring cx={140} cy={22} r={3.5} seed={2} o={0.5} at={0.45} dur={0.2} />
      <Hand x={22} y={50} size={14} o={0.65} at={0.4}>
        9:41
      </Hand>
      <Box x={162} y={40} w={24} h={11} r={3} seed={3} o={0.55} sw={1.6} at={0.45} dur={0.25} />
      {icons.map(([hue, glyph], i) => {
        const x = 23 + (i % 3) * 60;
        const y = 66 + Math.floor(i / 3) * 60;
        const at = 0.5 + i * 0.07;
        return (
          <Pop key={i} x={x + 22} y={y + 22} at={at}>
            <Box x={-22} y={-22} w={44} h={44} r={13} seed={40 + i} color={C[hue]} fill={hue} at={at} dur={0.35} />
            <Glyph name={glyph} at={at + 0.25} s={0.8} />
          </Pop>
        );
      })}
      {/* A notification drops in */}
      <motion.g
        initial={still ? false : { y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 15 }}
      >
        <path d={box(18, 258, 174, 54, 14)} fill={PAPER} />
        <Box x={16} y={256} w={178} h={56} r={15} seed={70} o={0.85} at={1.6} dur={0.4} />
        <Ring cx={41} cy={284} r={12} seed={71} color={C.purple} fill="purple" at={1.75} dur={0.3} />
        <Pop x={41} y={284} at={1.9} s={0.6}>
          <Glyph name="user" at={1.9} />
        </Pop>
        <Draw d={line(62, 276, 150, 276, 72)} w={3} o={0.85} at={1.9} dur={0.3} />
        <Draw d={line(62, 293, 172, 293, 73)} o={0.4} at={2.05} dur={0.3} />
      </motion.g>
      {/* A badge on the mail icon */}
      <Pop x={63} y={68} at={2.3}>
        <path d={disc(0, 0, 10)} fill={C.red} />
        <Draw d={circle(0, 0, 10, 74, 0.6)} color={C.red} w={2} at={2.3} dur={0.2} />
        <Hand x={0} y={5} size={14} anchor="middle" color={PAPER} at={2.35}>
          3
        </Hand>
      </Pop>
      <Ripple cx={105} cy={148} r0={6} r1={30} color={INK} period={2.2} delay={2.6} />
      <Ripple cx={105} cy={148} r0={4} r1={20} color={INK} period={2.2} delay={2.75} sw={1.4} />
      <Draw d={line(78, 370, 132, 370, 90, 0.5)} w={4.5} o={0.45} at={0.4} dur={0.3} />
    </>
  );
};

// ---------------------------------------------------------------------------------------------------------------
// 2 · Systems: a web app with a table; a cursor clicks Save and a status turns green

const Browser = () => {
  const P = 3.4;
  const D = 2.0;
  const { still, transition } = useLoop(P, D);
  const rows: { hue: Hue; glyph: GlyphName }[] = [
    { hue: "blue", glyph: "user" },
    { hue: "pink", glyph: "user" },
    { hue: "teal", glyph: "user" },
  ];
  const click = [0, 0.4, 0.43, 0.9, 1];
  return (
    <>
      <Draw d={line(6, 42, 414, 42, 1)} o={0.45} at={0.3} dur={0.4} />
      {(["red", "yellow", "green"] as Hue[]).map((hue, i) => (
        <Ring key={hue} cx={24 + i * 20} cy={21} r={6.5} seed={2 + i} color={C[hue]} fill={hue} at={0.35 + i * 0.06} dur={0.2} sw={1.8} />
      ))}
      <Box x={94} y={11} w={232} h={21} r={10} seed={5} o={0.4} sw={1.8} at={0.45} dur={0.35} />
      <Draw d={line(110, 21.5, 210, 21.5, 6)} o={0.35} at={0.7} dur={0.3} />
      <Draw d={line(104, 46, 104, 294, 7)} o={0.3} at={0.5} dur={0.4} />
      <Fill d={box(12, 64, 84, 24, 8)} hue="purple" at={0.75} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <Ring cx={26} cy={76 + i * 30} r={3} seed={10 + i} o={0.6} at={0.6 + i * 0.07} dur={0.15} sw={1.8} />
          <Draw d={line(38, 76 + i * 30, 76 + ((i * 17) % 22), 76 + i * 30, 20 + i)} o={i === 0 ? 0.9 : 0.5} at={0.65 + i * 0.07} dur={0.2} />
        </g>
      ))}
      <Draw d={line(124, 70, 258, 70, 30)} w={4} at={0.8} dur={0.35} />
      <Draw d={line(124, 90, 206, 90, 31)} o={0.4} at={0.95} dur={0.25} />
      {/* Save button; it fills when clicked */}
      {!still && (
        <motion.path d={box(308, 60, 90, 28, 11)} fill={C.purple} initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 0.35, 0.35, 0] }} transition={{ ...transition, times: click }} />
      )}
      <Box x={306} y={58} w={94} h={32} r={12} seed={32} color={PEN} at={1.0} dur={0.4} />
      <Draw d={line(328, 74, 378, 74, 33)} w={2.6} at={1.25} dur={0.2} />
      {rows.map((row, i) => {
        const y = 112 + i * 54;
        const at = 1.05 + i * 0.18;
        return (
          <g key={i}>
            <Draw d={line(122, y, 404, y, 40 + i, 0.6)} o={0.2} at={at} dur={0.35} />
            <Ring cx={146} cy={y + 27} r={12} seed={45 + i} color={C[row.hue]} fill={row.hue} at={at + 0.1} dur={0.25} />
            <Pop x={146} y={y + 27} at={at + 0.25} s={0.55}>
              <Glyph name={row.glyph} at={at + 0.25} />
            </Pop>
            <Draw d={line(170, y + 20, 246 + i * 16, y + 20, 50 + i)} w={2.6} o={0.8} at={at + 0.2} dur={0.25} />
            <Draw d={line(170, y + 35, 220 - i * 8, y + 35, 55 + i)} o={0.35} at={at + 0.3} dur={0.2} />
            <Box x={332} y={y + 17} w={62} h={20} r={10} seed={60 + i} color={C[i === 1 ? "orange" : "green"]} fill={i === 1 ? "orange" : "green"} at={at + 0.3} dur={0.3} sw={1.8} />
          </g>
        );
      })}
      {/* The middle status turns from pending (orange) to done (green) on the click */}
      {!still && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: click.map((_, i) => (i === 2 || i === 3 ? 1 : 0)) }} transition={{ ...transition, times: click }}>
          <path d={box(333, 184, 61, 19, 9.5)} fill={PAPER} />
          <Fill d={box(334, 185, 59, 17, 9)} hue="green" />
          <path d={rect(332, 183, 62, 20, 10, 61)} fill="none" stroke={C.green} strokeWidth={1.8} />
          <g transform="translate(363 193) scale(0.5)">
            <path d={GLYPH.check} fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </motion.g>
      )}
      <Ripple cx={353} cy={74} r0={8} r1={34} color={PEN} period={P} delay={D} at={P * 0.4} />
      {/* The cursor */}
      <motion.g
        initial={still ? { x: 360, y: 80 } : { x: 250, y: 262, opacity: 0 }}
        animate={still ? { x: 360, y: 80 } : { x: [250, 352, 352, 352, 250], y: [262, 76, 76, 76, 262], opacity: 1 }}
        transition={still ? undefined : { ...transition, times: [0, 0.33, 0.42, 0.6, 1], opacity: { delay: 1.6, duration: 0.3 } }}
      >
        <motion.g
          animate={still ? undefined : { scale: [1, 1, 0.78, 1, 1] }}
          transition={{ ...transition, times: [0, 0.37, 0.4, 0.44, 1] }}
        >
          <path d="M0 0L0 19L5 14.5L8.5 22.5L12 21L8.6 13.2L15 13Z" fill={PAPER} stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
        </motion.g>
      </motion.g>
    </>
  );
};

// ---------------------------------------------------------------------------------------------------------------
// 3 · Dashboards: numbers count up, bars grow and breathe, a trend line is drawn and its peak circled

const Dashboard = () => {
  const { still } = useSketch();
  const bars = [38, 60, 48, 82, 66, 104, 90];
  const hues: Hue[] = ["blue", "green", "orange", "purple", "pink", "teal", "indigo"];
  const trend: Pt[] = [56, 46, 72, 64, 92, 86, 118].map((v, i) => ({ x: 70 + i * 46, y: 252 - v }));
  return (
    <>
      <Box x={16} y={16} w={188} h={84} r={14} seed={1} o={0.55} at={0.3} />
      <Box x={216} y={16} w={188} h={84} r={14} seed={2} o={0.55} at={0.4} />
      <Draw d={line(32, 36, 86, 36, 3)} o={0.4} at={0.6} dur={0.2} />
      <Draw d={line(232, 36, 272, 36, 4)} o={0.4} at={0.65} dur={0.2} />
      <Count x={30} y={84} to={1284} at={0.7} color={C.blue} />
      <Count x={230} y={84} to={98} suffix="%" at={0.8} color={C.green} />
      <Draw d={curve([{ x: 138, y: 84 }, { x: 150, y: 76 }, { x: 162, y: 80 }, { x: 174, y: 62 }, { x: 190, y: 48 }])} color={C.blue} w={2.4} at={1.0} dur={0.5} />
      <Draw d="M182 47L190 48L188 56" color={C.blue} w={2.4} at={1.45} dur={0.15} />
      {/* 98%: a ring that runs almost all the way round, with a tick inside */}
      <path d={disc(366, 58, 22)} fill="none" stroke={INK} strokeOpacity={0.12} strokeWidth={6} />
      <g transform="rotate(-90 366 58)">
        <Draw d={`M388 58A22 22 0 1 1 ${366 + 22 * Math.cos(-0.12)} ${58 + 22 * Math.sin(-0.12)}`} color={C.green} w={4} at={1.0} dur={1.3} />
      </g>
      <Pop x={366} y={58} at={2.1} s={0.6}>
        <Glyph name="check" at={2.1} color={C.green} w={2.6} />
      </Pop>
      <Box x={16} y={112} w={388} h={164} r={14} seed={7} o={0.55} at={0.5} />
      <Draw d={line(40, 252, 390, 252, 8, 0.6)} o={0.45} at={0.7} dur={0.35} />
      <Draw d={line(40, 130, 40, 252, 9, 0.6)} o={0.45} at={0.7} dur={0.3} />
      {bars.map((h, i) => {
        const at = 0.85 + i * 0.09;
        return (
          <Grow key={i} axis="y" origin="50% 100%" at={at}>
            <motion.g
              style={{ transformOrigin: "50% 100%" }}
              animate={still ? undefined : { scaleY: [1, 0.86, 1.06, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: 2.0 + i * 0.22, ease: "easeInOut" }}
            >
              <Box x={58 + i * 46} y={252 - h} w={24} h={h} r={6} seed={20 + i} color={C[hues[i]]} fill={hues[i]} at={at} dur={0.3} sw={2} />
            </motion.g>
          </Grow>
        );
      })}
      <Draw d={curve(trend)} color={C.yellow} w={2.8} at={1.7} dur={0.8} />
      {trend.map((p, i) => (
        <Pop key={i} x={p.x} y={p.y} at={1.75 + i * 0.1}>
          <path d={disc(0, 0, 4.5)} fill={C.yellow} />
        </Pop>
      ))}
      <Draw d={circle(346, 134, 17, 11, 1.2, 13)} color={C.red} w={2.4} at={2.6} dur={0.45} />
      <Ripple cx={346} cy={134} r0={5} r1={22} color={C.yellow} period={2.4} delay={3.0} />
    </>
  );
};

// ---------------------------------------------------------------------------------------------------------------
// 4 · Automations: a workflow whose nodes light up as data runs through it, ending in a tick

const Workflow = () => {
  const { still, transition } = useLoop(2.6, 2.0);
  const nodes: { x: number; y: number; hue: Hue; glyph: GlyphName }[] = [
    { x: 60, y: 110, hue: "blue", glyph: "bolt" },
    { x: 176, y: 56, hue: "green", glyph: "mail" },
    { x: 176, y: 164, hue: "orange", glyph: "sheet" },
    { x: 290, y: 110, hue: "purple", glyph: "spark" },
    { x: 390, y: 110, hue: "teal", glyph: "check" },
  ];
  const edge = (a: number, b: number): Bezier => {
    const p = nodes[a];
    const q = nodes[b];
    const mid = (p.x + q.x) / 2;
    return [
      { x: p.x + 31, y: p.y },
      { x: mid, y: p.y },
      { x: mid, y: q.y },
      { x: q.x - 33, y: q.y },
    ];
  };
  const edges: { from: number; to: number; at: number; start: number; dur: number }[] = [
    { from: 0, to: 1, at: 0.75, start: 0, dur: 0.7 },
    { from: 0, to: 2, at: 0.8, start: 0, dur: 0.7 },
    { from: 1, to: 3, at: 1.15, start: 0.75, dur: 0.65 },
    { from: 2, to: 3, at: 1.2, start: 0.75, dur: 0.65 },
    { from: 3, to: 4, at: 1.55, start: 1.45, dur: 0.5 },
  ];
  return (
    <>
      {edges.map((e, i) => {
        const path = edge(e.from, e.to);
        const end = path[3];
        return (
          <g key={i}>
            <Draw d={bezierPath(path, 10 + i)} o={0.6} at={e.at} dur={0.45} />
            <Draw d={`M${end.x - 8} ${end.y - 5}L${end.x} ${end.y}L${end.x - 8} ${end.y + 5}`} o={0.6} at={e.at + 0.4} dur={0.12} />
            <Packet path={path} hue={nodes[e.from].hue} period={2.6} start={e.start} dur={e.dur} delay={2.0} />
          </g>
        );
      })}
      <Ripple cx={60} cy={110} r0={30} r1={50} color={C.blue} period={2.6} delay={2.0} />
      <Ripple cx={290} cy={110} r0={30} r1={48} color={C.purple} period={2.6} delay={2.0} at={1.4} />
      <Ripple cx={390} cy={110} r0={30} r1={50} color={C.teal} period={2.6} delay={2.0} at={1.95} />
      {nodes.map((node, i) => {
        const at = 0.35 + i * 0.16;
        return (
          <Pop key={i} x={node.x} y={node.y} at={at}>
            <path d={box(-28, -28, 56, 56, 14)} fill={PAPER} />
            <Box x={-29} y={-29} w={58} h={58} r={15} seed={30 + i} color={C[node.hue]} fill={node.hue} at={at} dur={0.4} sw={2.4} />
            {node.glyph === "spark" ? (
              <motion.g animate={still ? undefined : { rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
                <Glyph name="spark" at={at + 0.3} s={1.15} />
              </motion.g>
            ) : node.glyph === "check" && !still ? (
              <g transform="scale(1.1)">
                <motion.path
                  d={GLYPH.check}
                  fill="none"
                  stroke={INK}
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 1, 1] }}
                  transition={{ ...transition, times: [0, 1.95 / 2.6, 2.25 / 2.6, 1] }}
                />
              </g>
            ) : (
              <Glyph name={node.glyph} at={at + 0.3} s={1.1} />
            )}
          </Pop>
        );
      })}
    </>
  );
};

// ---------------------------------------------------------------------------------------------------------------
// 5 · AI agents: a thinking core with tools around it; signals run in from the tools and answers run back out

const Network = () => {
  const { still } = useSketch();
  const c = { x: 165, y: 165 };
  const tools: { hue: Hue; glyph: GlyphName }[] = [
    { hue: "blue", glyph: "mail" },
    { hue: "green", glyph: "sheet" },
    { hue: "orange", glyph: "chat" },
    { hue: "pink", glyph: "check" },
    { hue: "teal", glyph: "wave" },
    { hue: "yellow", glyph: "pin" },
  ];
  const at = (i: number) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { x: c.x + Math.cos(a) * 116, y: c.y + Math.sin(a) * 116, dx: Math.cos(a), dy: Math.sin(a) };
  };
  return (
    <>
      {tools.map((_, i) => {
        const p = at(i);
        const q = at((i + 1) % 6);
        return <Draw key={`n${i}`} d={line(p.x, p.y, q.x, q.y, 50 + i, 0.8)} o={0.16} w={1.6} at={1.1 + i * 0.04} dur={0.3} />;
      })}
      {tools.map((tool, i) => {
        const p = at(i);
        const from = { x: p.x - p.dx * 23, y: p.y - p.dy * 23 };
        const to = { x: c.x + p.dx * 42, y: c.y + p.dy * 42 };
        return (
          <g key={i}>
            <Draw d={line(to.x, to.y, from.x, from.y, 10 + i, 0.8)} o={0.5} at={0.6 + i * 0.07} dur={0.3} />
            <Packet path={straight(from, to)} hue={tool.hue} period={2.4} start={i * 0.27} dur={0.8} delay={1.8} r={4} />
            {i % 2 === 0 && <Packet path={straight(to, from)} hue="purple" period={2.4} start={0.15 + i * 0.33} dur={0.8} delay={1.8} r={3.5} />}
          </g>
        );
      })}
      {/* A dashed orbit, turning slowly, with a dot riding it */}
      <motion.g animate={still ? undefined : { rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}>
        <Dashed d={circle(c.x, c.y, 62, 3, 0.6)} at={0.9} o={0.3} />
        {!still && <circle cx={c.x + 62} cy={c.y} r={3.5} fill={PEN} />}
      </motion.g>
      <Ripple cx={c.x} cy={c.y} r0={38} r1={60} color={PEN} period={1.2} delay={2.2} />
      <Pop x={c.x} y={c.y} at={0.35}>
        <path d={disc(0, 0, 36)} fill={PAPER} />
        <Ring cx={0} cy={0} r={37} seed={1} color={PEN} fill="purple" sw={3} at={0.35} dur={0.5} />
        <Draw d={circle(0, 0, 37, 2, 1.6)} color={PEN} w={1.2} o={0.5} at={0.6} dur={0.5} />
        <motion.g animate={still ? undefined : { scale: [1, 1.14, 1], rotate: [0, 8, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 2.2, ease: "easeInOut" }}>
          <Glyph name="spark" at={0.7} s={1.6} />
        </motion.g>
      </Pop>
      {tools.map((tool, i) => {
        const p = at(i);
        const t = 0.5 + i * 0.08;
        return (
          <Pop key={i} x={p.x} y={p.y} at={t}>
            <path d={disc(0, 0, 20)} fill={PAPER} />
            <Ring cx={0} cy={0} r={21} seed={20 + i} color={C[tool.hue]} fill={tool.hue} at={t} dur={0.3} />
            <Glyph name={tool.glyph} at={t + 0.25} s={0.75} />
          </Pop>
        );
      })}
    </>
  );
};

/** Frame size and corner for each scene; the frame morphs between them. Order matches DynamicVisual's indexes. */
export const SCENES = [
  { w: 400, h: 300, r: 22, Scene: Roadmap },
  { w: 210, h: 390, r: 34, Scene: Phone },
  { w: 420, h: 300, r: 20, Scene: Browser },
  { w: 420, h: 290, r: 22, Scene: Dashboard },
  { w: 440, h: 220, r: 22, Scene: Workflow },
  { w: 330, h: 330, r: 26, Scene: Network },
];
