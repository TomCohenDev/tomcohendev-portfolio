/**
 * Hand-drawn SVG sketches for the about page, generated with roughjs at build time (no client JavaScript).
 * Colors follow the site's meaning: gold is Tom's decision, purple is agents and machinery, green is live.
 */
import rough from "roughjs";
import type { SketchKey } from "../../data/about";

const gen = rough.generator();
const C = { ink: "#e0d0c1", muted: "#b9bbbe", acc: "#bf95f9", hum: "#f2c46d", ok: "#43b581", bad: "#f28b82", bg: "#1d201f", card: "#222524" };
const HAND = `font-family="Excalifont, 'Playpen Sans Hebrew', cursive"`;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const r1 = (n: number) => Math.round(n * 10) / 10;

type Pt = [number, number];

function sketcher(seedBase: number, W = 0, mirror = false) {
  let seed = seedBase;
  const X = (x: number) => (mirror ? W - x : x);
  const o = (extra: Record<string, unknown> = {}) => ({ roughness: 1, bowing: 0.8, strokeWidth: 2, seed: ++seed, ...extra });
  const paths = (d: ReturnType<typeof gen.path>, color: string, cls = "", width = 2) =>
    gen.toPaths(d).map((p) => `<path d="${p.d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${cls ? ` class="${cls}" pathLength="1"` : ""}/>`).join("");
  const smooth = (pts: Pt[]) => {
    if (pts.length === 2) return `M${r1(pts[0][0])} ${r1(pts[0][1])}L${r1(pts[1][0])} ${r1(pts[1][1])}`;
    const p = [pts[0], ...pts, pts[pts.length - 1]];
    let d = `M${r1(p[1][0])} ${r1(p[1][1])}`;
    for (let i = 1; i < p.length - 2; i++) {
      const [a, b, c, e] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
      d += `C${r1(b[0] + (c[0] - a[0]) / 6)} ${r1(b[1] + (c[1] - a[1]) / 6)} ${r1(c[0] - (e[0] - b[0]) / 6)} ${r1(c[1] - (e[1] - b[1]) / 6)} ${r1(c[0])} ${r1(c[1])}`;
    }
    return d;
  };
  return {
    X,
    path: (d: string, color: string, extra = {}, cls = "", width = 2) => paths(gen.path(d, o(extra)), color, cls, width),
    rect: (x: number, y: number, w: number, h: number, color: string, extra = {}, width = 2) =>
      paths(gen.rectangle(mirror ? W - x - w : x, y, w, h, o({ roughness: 0.8, ...extra })), color, "", width),
    ellipse: (cx: number, cy: number, w: number, h: number, color: string, extra = {}, cls = "", width = 2) =>
      paths(gen.ellipse(X(cx), cy, w, h, o({ roughness: 0.7, ...extra })), color, cls, width),
    hatch: (x: number, y: number, w: number, h: number, color: string, opacity = 0.35) => {
      const d = gen.rectangle(mirror ? W - x - w : x, y, w, h, o({ fill: color, fillStyle: "hachure", hachureGap: 5, stroke: "none", roughness: 0.6 }));
      return gen.toPaths(d).filter((p) => p.stroke !== "none").map((p) => `<path d="${p.d}" fill="none" stroke="${color}" stroke-width="1.4" opacity="${opacity}"/>`).join("");
    },
    arrow(pts: Pt[], color: string, cls = "") {
      const m = pts.map(([x, y]) => [X(x), y] as Pt);
      const d = smooth(m);
      const n = m.length, [ex, ey] = m[n - 1], [px, py] = m[n - 2];
      const a = Math.atan2(ey - py, ex - px), L = 13;
      const head = `M${r1(ex - L * Math.cos(a - 0.5))} ${r1(ey - L * Math.sin(a - 0.5))}L${r1(ex)} ${r1(ey)}L${r1(ex - L * Math.cos(a + 0.5))} ${r1(ey - L * Math.sin(a + 0.5))}`;
      return paths(gen.path(d, o({ roughness: 0.8 })), color, cls) + paths(gen.path(head, o({ roughness: 0.4 })), color, cls);
    },
    text(x: number, y: number, s: string, color: string, size: number, anchor: "start" | "middle" | "end" = "middle", cls = "", rtl = false) {
      const a = mirror && anchor !== "middle" ? (anchor === "start" ? "end" : "start") : anchor;
      const hebrew = /[֐-׿]/.test(s);
      const dir = rtl && hebrew ? "rtl" : "ltr";
      // In an RTL run "start" is the right edge, so a mirrored Hebrew label keeps its authored anchor.
      const anchorFinal = dir === "rtl" ? anchor : a;
      return `<text x="${r1(X(x))}" y="${r1(y)}" fill="${color}" font-size="${size}" text-anchor="${anchorFinal}" direction="${dir}" ${HAND}${cls ? ` class="${cls}"` : ""}>${esc(s)}</text>`;
    },
  };
}

/** Small product sketches, 160×120. */
export function productSketch(key: SketchKey) {
  const s = sketcher(8000 + key.length * 37);
  let body = "";
  switch (key) {
    case "mathbook":
      body = s.rect(10, 12, 140, 96, C.muted, { roughness: 0.7 }) +
        s.text(62, 52, "x² + 3x = 10", C.ink, 17) +
        `<g stroke-dasharray="5 5">${s.ellipse(62, 47, 116, 36, C.acc, {}, "", 1.6)}</g>` +
        s.arrow([[62, 68], [70, 84], [88, 90]], C.acc) +
        s.text(118, 96, "x = 2", C.ok, 18);
      break;
    case "gomlin":
      body = s.rect(46, 6, 68, 108, C.muted, { roughness: 0.6 }) +
        `<g transform="rotate(-9 80 52)">${s.rect(56, 22, 46, 54, C.acc, { roughness: 0.5 })}${s.hatch(60, 26, 38, 14, C.acc, 0.4)}${s.path("M62 52h30M62 62h22", C.muted, { roughness: 0.3 }, "", 1.6)}</g>` +
        s.ellipse(64, 96, 18, 18, C.bad, { roughness: 0.4 }) + s.path("M60 92l8 8M68 92l-8 8", C.bad, { roughness: 0.2 }, "", 1.6) +
        s.ellipse(96, 96, 18, 18, C.ok, { roughness: 0.4 }) + s.path("M91 96l4 4l7 -8", C.ok, { roughness: 0.2 }, "", 1.8) +
        s.arrow([[112, 46], [134, 40], [148, 50]], C.ok);
      break;
    case "locket":
      body = s.rect(40, 6, 68, 108, C.muted, { roughness: 0.6 }) +
        s.rect(56, 36, 36, 36, C.acc, { roughness: 0.5 }) + s.hatch(60, 40, 28, 28, C.acc, 0.35) +
        s.path("M62 36v-7M74 36v-7M86 36v-7M62 72v7M74 72v7M86 72v7", C.acc, { roughness: 0.3 }, "", 1.6) +
        s.text(74, 59, "AI", C.ink, 14) +
        s.path("M118 34c-2 -12 14 -14 16 -5c9 -2 13 9 5 12h-21c-6 0 -6 -7 0 -7z", C.muted, { roughness: 0.5 }, "", 1.6) +
        s.path("M116 22l30 26", C.bad, { roughness: 0.3 }, "", 2.2);
      break;
    case "nykma":
      body = s.rect(12, 22, 136, 78, C.muted, { roughness: 0.6 }) +
        [0, 1, 2, 3, 4, 5].map((i) => s.rect(18 + i * 22, 26, 12, 8, C.muted, { roughness: 0.3 }, 1.2) + s.rect(18 + i * 22, 88, 12, 8, C.muted, { roughness: 0.3 }, 1.2)).join("") +
        s.path("M68 46l26 15l-26 15z", C.hum, { roughness: 0.4 }) +
        s.text(80, 118, "MP4 ×3", C.ok, 14);
      break;
    case "agents":
      body = s.rect(6, 44, 38, 30, C.muted, { roughness: 0.5 }) +
        s.rect(62, 38, 40, 42, C.acc, { roughness: 0.5 }) + s.hatch(66, 42, 32, 34, C.acc, 0.35) +
        s.text(82, 64, "AI", C.ink, 14) +
        s.arrow([[46, 59], [60, 59]], C.muted) + s.arrow([[104, 59], [118, 59]], C.muted) +
        s.ellipse(136, 59, 30, 30, C.hum, { roughness: 0.5 }) + s.path("M129 59l5 5l9 -10", C.hum, { roughness: 0.2 }, "", 2);
      break;
  }
  return `<svg viewBox="0 0 160 120" class="ab-sketch" aria-hidden="true">${body}</svg>`;
}

/** A short rough arrow for the pipeline strip, 44×20, pointing along the reading direction. */
export function stepArrow(i: number, rtl: boolean) {
  const s = sketcher(9100 + i, 44, rtl);
  return `<svg viewBox="0 0 44 20" class="ab-step-arrow" aria-hidden="true">${s.arrow([[4, 10], [22, 7], [38, 10]], C.muted)}</svg>`;
}

/** A looping arrow for the self-maintaining fork. */
export function loopSketch(rtl: boolean) {
  const s = sketcher(9300, 120, rtl);
  return `<svg viewBox="0 0 120 90" class="ab-loop" aria-hidden="true">${s.arrow([[30, 70], [12, 40], [36, 14], [84, 14], [108, 40], [92, 68]], C.acc)}${s.text(60, 52, "3h", C.acc, 22)}</svg>`;
}
