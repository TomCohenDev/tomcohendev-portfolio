/**
 * Hand-drawn geometry for the hero sketches: lines that bow a little, rectangles whose pen overshoots the corner
 * it started from, circles that don't quite close. Everything comes from a seeded random, so the server and the
 * browser draw the same wobble.
 */

export type Pt = { x: number; y: number };
export type Bezier = [Pt, Pt, Pt, Pt];

export const rng = (seed: number) => {
  let a = seed >>> 0 || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const n = (v: number) => Math.round(v * 10) / 10;

/** A line from one point to another, bowed and with ends that miss by a pixel or so. */
export const line = (x1: number, y1: number, x2: number, y2: number, seed: number, amp = 1) => {
  const r = rng(seed);
  const j = () => (r() - 0.5) * 2 * amp;
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const bow = (r() - 0.5) * Math.min(7, len * 0.05) * amp;
  const mx = (x1 + x2) / 2 - ((y2 - y1) / len) * bow;
  const my = (y1 + y2) / 2 + ((x2 - x1) / len) * bow;
  return `M${n(x1 + j())} ${n(y1 + j())}Q${n(mx)} ${n(my)} ${n(x2 + j())} ${n(y2 + j())}`;
};

/**
 * A rounded rectangle in one pen stroke, starting on the top edge and running a little past the start at the end.
 * The commands are always the same (M and 8 Q), so two of them can morph into each other.
 */
export const rect = (x: number, y: number, w: number, h: number, rad: number, seed: number, amp = 1) => {
  const r = rng(seed);
  const j = () => (r() - 0.5) * 2 * amp;
  const c = Math.min(rad, w / 2, h / 2);
  const bow = () => (r() - 0.5) * 3 * amp;
  const over = 6 + r() * 8;
  const side = (ax: number, ay: number, bx: number, by: number, nx: number, ny: number) => {
    const b = bow();
    return `Q${n((ax + bx) / 2 + nx * b)} ${n((ay + by) / 2 + ny * b)} ${n(bx + j())} ${n(by + j())}`;
  };
  const corner = (cx: number, cy: number, ex: number, ey: number) => `Q${n(cx + j())} ${n(cy + j())} ${n(ex + j())} ${n(ey + j())}`;
  return [
    `M${n(x + c + j())} ${n(y + j())}`,
    side(x + c, y, x + w - c, y, 0, -1),
    corner(x + w, y, x + w, y + c),
    side(x + w, y + c, x + w, y + h - c, 1, 0),
    corner(x + w, y + h, x + w - c, y + h),
    side(x + w - c, y + h, x + c, y + h, 0, 1),
    corner(x, y + h, x, y + h - c),
    side(x, y + h - c, x, y + c, -1, 0),
    corner(x, y, x + c + over, y + j()),
  ].join("");
};

/** The same rounded rectangle, clean, for fills. */
export const box = (x: number, y: number, w: number, h: number, rad: number) => {
  const c = Math.min(rad, w / 2, h / 2);
  return `M${x + c} ${y}H${x + w - c}Q${x + w} ${y} ${x + w} ${y + c}V${y + h - c}Q${x + w} ${y + h} ${x + w - c} ${y + h}H${x + c}Q${x} ${y + h} ${x} ${y + h - c}V${y + c}Q${x} ${y} ${x + c} ${y}Z`;
};

/** A smooth curve through the points (Catmull-Rom as cubic Béziers). */
export const curve = (pts: Pt[]) => {
  let d = `M${n(pts[0].x)} ${n(pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    d += `C${n(p1.x + (p2.x - p0.x) / 6)} ${n(p1.y + (p2.y - p0.y) / 6)} ${n(p2.x - (p3.x - p1.x) / 6)} ${n(p2.y - (p3.y - p1.y) / 6)} ${n(p2.x)} ${n(p2.y)}`;
  }
  return d;
};

/** A circle drawn by hand: the radius drifts and the pen goes a bit past where it started. */
export const circle = (cx: number, cy: number, rx: number, seed: number, amp = 1, ry = rx) => {
  const r = rng(seed);
  const start = r() * Math.PI * 2;
  const turn = Math.PI * 2 * (1.06 + r() * 0.08);
  const steps = 13;
  const drift = Math.min(rx, ry) * 0.06 * amp + 0.6 * amp;
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = start + (turn * i) / steps;
    const k = (r() - 0.5) * 2 * drift + (i / steps) * drift * 0.8;
    pts.push({ x: cx + Math.cos(a) * (rx + k), y: cy + Math.sin(a) * (ry + k) });
  }
  return curve(pts);
};

/** A cubic Bézier as a path, drawn slightly off its true course. */
export const bezierPath = ([a, b, c, d]: Bezier, seed: number, amp = 1) => {
  const r = rng(seed);
  const j = () => (r() - 0.5) * 2 * amp;
  return `M${n(a.x + j())} ${n(a.y + j())}C${n(b.x + j() * 3)} ${n(b.y + j() * 3)} ${n(c.x + j() * 3)} ${n(c.y + j() * 3)} ${n(d.x + j())} ${n(d.y + j())}`;
};

export const bezierAt = ([a, b, c, d]: Bezier, t: number): Pt => {
  const u = 1 - t;
  return {
    x: u * u * u * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t * t * t * d.x,
    y: u * u * u * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t * t * t * d.y,
  };
};

/** A straight run from a to b, as a Bézier, so packets can travel it like any other edge. */
export const straight = (a: Pt, b: Pt): Bezier => [
  a,
  { x: a.x + (b.x - a.x) / 3, y: a.y + (b.y - a.y) / 3 },
  { x: a.x + ((b.x - a.x) * 2) / 3, y: a.y + ((b.y - a.y) * 2) / 3 },
  b,
];
