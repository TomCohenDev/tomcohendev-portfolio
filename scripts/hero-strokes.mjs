#!/usr/bin/env node
/**
 * Pen strokes for the hero words, so each word writes itself in the handwritten font.
 *
 *   npm run hero:strokes
 *
 * Renders every word of `heroWords` (src/components/home/content.ts) in Chrome exactly as HandwrittenWord.tsx draws it
 * (SVG text in Playpen Sans Hebrew, Latin in Excalifont), thins the letters to one-pixel centre lines, and traces those
 * lines into pen strokes, letter by letter from right to left. Writes src/components/home/handStrokes.ts.
 * The page reveals the word through these strokes, so it looks written by a pen. Run it again after changing the words.
 *
 * Needs Chrome or Chromium: set CHROME_PATH, or it uses Playwright's Chromium or the installed Chrome.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright-core";

const FONT = { family: `"Excalifont", "Playpen Sans Hebrew", cursive`, weight: 500, size: 160 };
const PAD = 60;
const OUT = "src/components/home/handStrokes.ts";

const words = [...readFileSync("src/components/home/content.ts", "utf8").matchAll(/\{ text: "([^"]+)", visual: \d+ \}/g)].map((m) => m[1]);
if (!words.length) throw new Error("No heroWords found in src/components/home/content.ts");

const bundled = `${process.env.LOCALAPPDATA || ""}/ms-playwright/chromium-1217/chrome-win64/chrome.exe`;
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : existsSync(bundled) ? { executablePath: bundled } : { channel: "chrome" }
);
const page = await browser.newPage({ deviceScaleFactor: 1 });
const excalifont = readFileSync("src/assets/fonts/Excalifont-Regular.woff2").toString("base64");
await page.setContent(
  `<html><head>
    <link href="https://fonts.googleapis.com/css2?family=Playpen+Sans+Hebrew:wght@400;500;600&display=block" rel="stylesheet">
    <style>@font-face{font-family:"Excalifont";src:url(data:font/woff2;base64,${excalifont}) format("woff2");}body{margin:0;background:#000}</style>
  </head><body></body></html>`,
  { waitUntil: "networkidle" }
);
await page.evaluate(
  async ({ words, size }) => {
    await Promise.all(words.map((w) => document.fonts.load(`500 ${size}px "Playpen Sans Hebrew"`, w)));
    await document.fonts.load(`${size}px Excalifont`, "AI");
  },
  { words, size: FONT.size }
);

/** Runs in the page: trace the pen strokes of one rendered word. */
const trace = async ({ png, W, H }) => {
  const img = new Image();
  img.src = `data:image/png;base64,${png}`;
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const rgba = ctx.getImageData(0, 0, W, H).data;
  const sk = new Uint8Array(W * H);
  let inkCount = 0;
  let minX = W, maxX = 0, minY = H, maxY = 0;
  for (let i = 0; i < W * H; i++) {
    if (rgba[i * 4] > 110) {
      sk[i] = 1;
      inkCount++;
      const x = i % W, y = (i / W) | 0;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
  }

  // Zhang-Suen thinning: peel the letters down to one-pixel centre lines.
  const nb = (i) => [sk[i - W], sk[i - W + 1], sk[i + 1], sk[i + W + 1], sk[i + W], sk[i + W - 1], sk[i - 1], sk[i - W - 1]];
  for (let changed = true; changed; ) {
    changed = false;
    for (const step of [0, 1]) {
      const del = [];
      for (let y = Math.max(1, minY); y <= Math.min(H - 2, maxY); y++)
        for (let x = Math.max(1, minX); x <= Math.min(W - 2, maxX); x++) {
          const i = y * W + x;
          if (!sk[i]) continue;
          const [p2, p3, p4, p5, p6, p7, p8, p9] = nb(i);
          const b = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
          if (b < 2 || b > 6) continue;
          const seq = [p2, p3, p4, p5, p6, p7, p8, p9, p2];
          let a = 0;
          for (let k = 0; k < 8; k++) if (!seq[k] && seq[k + 1]) a++;
          if (a !== 1) continue;
          if (step === 0 ? p2 * p4 * p6 || p4 * p6 * p8 : p2 * p4 * p8 || p2 * p6 * p8) continue;
          del.push(i);
        }
      for (const i of del) sk[i] = 0;
      if (del.length) changed = true;
    }
  }

  const pixels = [];
  for (let i = 0; i < W * H; i++) if (sk[i]) pixels.push(i);
  const thickness = inkCount / pixels.length;
  const around = (i) => [i - W, i - W + 1, i + 1, i + W + 1, i + W, i + W - 1, i - 1, i - W - 1].filter((j) => sk[j]);
  const deg = new Map(pixels.map((i) => [i, around(i).length]));
  const xy = (i) => [i % W, (i / W) | 0];

  // Graph: nodes are line ends and crossings (pixels that do not have exactly two neighbours), merged when they touch.
  const nodeOf = new Map();
  const nodes = [];
  for (const i of pixels) {
    if (deg.get(i) === 2 || nodeOf.has(i)) continue;
    const id = nodes.length;
    const members = [i];
    nodeOf.set(i, id);
    for (let k = 0; k < members.length; k++)
      for (const j of around(members[k]))
        if (deg.get(j) !== 2 && !nodeOf.has(j)) {
          nodeOf.set(j, id);
          members.push(j);
        }
    const pts = members.map(xy);
    nodes.push({ x: pts.reduce((s, p) => s + p[0], 0) / pts.length, y: pts.reduce((s, p) => s + p[1], 0) / pts.length, edges: new Set() });
  }
  const edges = [];
  const seen = new Set();
  const addEdge = (a, b, pts) => {
    const e = { a, b, pts, alive: true };
    edges.push(e);
    if (a !== null) nodes[a].edges.add(e);
    if (b !== null) nodes[b].edges.add(e);
  };
  for (const [n, node] of [...nodeOf.entries()]) {
    for (const q of around(n)) {
      if (nodeOf.has(q) || seen.has(q)) continue;
      const pts = [[nodes[node].x, nodes[node].y], xy(q)];
      seen.add(q);
      let prev = n, cur = q, end = null;
      for (;;) {
        const next = around(cur).find((j) => j !== prev && !seen.has(j) && !(nodeOf.has(j) && nodeOf.get(j) === node && pts.length < 3));
        if (next === undefined) {
          const back = around(cur).find((j) => nodeOf.has(j) && j !== prev);
          if (back !== undefined) end = nodeOf.get(back);
          break;
        }
        if (nodeOf.has(next)) {
          end = nodeOf.get(next);
          break;
        }
        seen.add(next);
        pts.push(xy(next));
        prev = cur;
        cur = next;
      }
      if (end !== null) pts.push([nodes[end].x, nodes[end].y]);
      addEdge(node, end, pts);
    }
  }
  // Closed loops with no line end or crossing (such as ם or ס).
  for (const i of pixels) {
    if (seen.has(i) || nodeOf.has(i)) continue;
    const pts = [xy(i)];
    seen.add(i);
    let cur = i;
    for (;;) {
      const next = around(cur).find((j) => !seen.has(j));
      if (next === undefined) break;
      seen.add(next);
      pts.push(xy(next));
      cur = next;
    }
    pts.push(pts[0]);
    addEdge(null, null, pts);
  }

  const length = (pts) => pts.reduce((s, p, k) => (k ? s + Math.hypot(p[0] - pts[k - 1][0], p[1] - pts[k - 1][1]) : 0), 0);
  const alive = (n) => [...nodes[n].edges].filter((e) => e.alive);
  const other = (e, n) => (e.a === n ? e.b : e.a);
  // Clean up: drop short spurs that thinning leaves at the corners, then join lines that pass straight through a node.
  for (let changed = true; changed; ) {
    changed = false;
    for (const e of edges) {
      if (!e.alive || e.a === null) continue;
      const da = alive(e.a).length, db = e.b === null ? 1 : alive(e.b).length;
      if ((da === 1) !== (db === 1) && length(e.pts) < thickness * 0.75) {
        e.alive = false;
        changed = true;
      }
    }
    for (let n = 0; n < nodes.length; n++) {
      const es = alive(n);
      if (es.length !== 2 || es[0] === es[1]) continue;
      const [e1, e2] = es;
      const p1 = e1.b === n ? e1.pts : [...e1.pts].reverse();
      const p2 = e2.a === n ? e2.pts : [...e2.pts].reverse();
      e1.alive = e2.alive = false;
      addEdge(other(e1, n), other(e2, n), [...p1, ...p2.slice(1)]);
      changed = true;
    }
  }
  const live = edges.filter((e) => e.alive && length(e.pts) > 2);

  // Components (one or more letters each), written from right to left.
  const comp = new Map();
  let nextComp = 0;
  for (const e of live) {
    if (comp.has(e)) continue;
    const stack = [e];
    comp.set(e, nextComp);
    while (stack.length) {
      const cur = stack.pop();
      for (const n of [cur.a, cur.b])
        if (n !== null)
          for (const f of alive(n))
            if (!comp.has(f) && live.includes(f)) {
              comp.set(f, nextComp);
              stack.push(f);
            }
    }
    nextComp++;
  }
  const groups = [...Array(nextComp)].map((_, c) => live.filter((e) => comp.get(e) === c));
  const right = (g) => Math.max(...g.flatMap((e) => e.pts.map((p) => p[0])));
  groups.sort((g1, g2) => right(g2) - right(g1));

  const strokes = [];
  let pen = [maxX, minY];
  const dir = (pts, back) => {
    const k = Math.min(pts.length - 1, 6);
    const [a, b] = back ? [pts[pts.length - 1], pts[pts.length - 1 - k]] : [pts[0], pts[k]];
    return Math.atan2(b[1] - a[1], b[0] - a[0]);
  };
  for (const g of groups) {
    const todo = new Set(g);
    while (todo.size) {
      // Start where a pen would: the free line end nearest the pen, favouring the top right.
      let best = null;
      for (const e of todo)
        for (const [end, n] of [[0, e.a], [1, e.b]]) {
          const p = end ? e.pts[e.pts.length - 1] : e.pts[0];
          const free = n === null || alive(n).filter((f) => todo.has(f)).length === 1 ? 0 : 40;
          const score = Math.hypot(p[0] - pen[0], p[1] - pen[1]) * 0.6 + (p[1] - minY) * 0.5 - (p[0] - minX) * 0.3 + free;
          if (!best || score < best.score) best = { e, end, score };
        }
      let { e, end } = best;
      let pts = end ? [...e.pts].reverse() : [...e.pts];
      if (e.a === null && e.b === null) {
        // A loop: start at its top-right point and set off to the left.
        let k0 = 0;
        pts.forEach((p, k) => { if (p[1] - p[0] * 0.5 < pts[k0][1] - pts[k0][0] * 0.5) k0 = k; });
        pts = [...pts.slice(k0, -1), ...pts.slice(0, k0 + 1)];
        if (pts.length > 8 && pts[6][0] > pts[0][0]) pts.reverse();
      }
      todo.delete(e);
      let at = end ? e.a : e.b;
      // Keep the pen down through crossings while the line goes on smoothly.
      while (at !== null) {
        const heading = dir(pts, true);
        let pick = null;
        for (const f of alive(at)) {
          if (!todo.has(f)) continue;
          const fp = f.a === at ? f.pts : [...f.pts].reverse();
          let turn = Math.abs(dir(fp, false) - (heading + Math.PI));
          turn = Math.abs(((turn + Math.PI) % (2 * Math.PI)) - Math.PI);
          const bend = Math.PI - turn;
          if (bend < 1.4 && (!pick || bend < pick.bend)) pick = { f, fp, bend };
        }
        if (!pick) break;
        todo.delete(pick.f);
        pts = [...pts, ...pick.fp.slice(1)];
        at = other(pick.f, at);
      }
      strokes.push(pts);
      pen = pts[pts.length - 1];
    }
  }

  // Smooth the pixel steps, then keep only the points that matter.
  const smooth = (pts) =>
    pts.map((p, k) => {
      if (k < 2 || k > pts.length - 3) return p;
      const win = pts.slice(k - 2, k + 3);
      return [win.reduce((s, q) => s + q[0], 0) / 5, win.reduce((s, q) => s + q[1], 0) / 5];
    });
  const simplify = (pts, eps) => {
    if (pts.length < 3) return pts;
    const [a, b] = [pts[0], pts[pts.length - 1]];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (len < 1) {
      // A closed loop: split it at the point farthest from its start.
      let at = 1;
      pts.forEach((p, k) => { if (Math.hypot(p[0] - a[0], p[1] - a[1]) > Math.hypot(pts[at][0] - a[0], pts[at][1] - a[1])) at = k; });
      return [...simplify(pts.slice(0, at + 1), eps).slice(0, -1), ...simplify(pts.slice(at), eps)];
    }
    let far = 0, at = 0;
    for (let k = 1; k < pts.length - 1; k++) {
      const d = Math.abs((b[0] - a[0]) * (a[1] - pts[k][1]) - (a[0] - pts[k][0]) * (b[1] - a[1])) / len;
      if (d > far) { far = d; at = k; }
    }
    return far > eps ? [...simplify(pts.slice(0, at + 1), eps).slice(0, -1), ...simplify(pts.slice(at), eps)] : [a, b];
  };
  // Thinning stops short of the letter tips, so carry each open stroke a little past both ends.
  const extend = (s) => {
    if (s.length < 2 || Math.hypot(s[0][0] - s[s.length - 1][0], s[0][1] - s[s.length - 1][1]) < 2) return s;
    const reach = (from, to) => {
      const dx = from[0] - to[0], dy = from[1] - to[1], d = Math.hypot(dx, dy) || 1;
      return [from[0] + (dx / d) * thickness * 0.6, from[1] + (dy / d) * thickness * 0.6];
    };
    const k = Math.min(4, s.length - 1);
    return [reach(s[0], s[k]), ...s, reach(s[s.length - 1], s[s.length - 1 - k])];
  };
  const out = strokes.map((s) => extend(simplify(smooth(smooth(smooth(s))), 0.9))).filter((s) => length(s) > 3);
  // Draw each stroke as one smooth curve through its points (Catmull-Rom as cubic Béziers), so the pen never turns a corner.
  const f = (n) => n.toFixed(1);
  const curve = (s) => {
    if (s.length < 3) return `M${f(s[0][0])} ${f(s[0][1])}L${f(s[1][0])} ${f(s[1][1])}`;
    let d = `M${f(s[0][0])} ${f(s[0][1])}`;
    for (let k = 0; k < s.length - 1; k++) {
      const [p0, p1, p2, p3] = [s[Math.max(0, k - 1)], s[k], s[k + 1], s[Math.min(s.length - 1, k + 2)]];
      d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d;
  };
  return {
    thickness,
    ink: [minX, minY, maxX, maxY],
    strokes: out.map((s) => ({ d: curve(s), len: Math.round(length(s)) })),
  };
};

const results = {};
for (const word of words) {
  const W = Math.ceil(await page.evaluate(({ word, f }) => {
    const c = document.createElement("canvas").getContext("2d");
    c.font = `${f.weight} ${f.size}px ${f.family}`;
    return c.measureText(word).width;
  }, { word, f: FONT })) + PAD * 2;
  const H = Math.round(FONT.size * 1.8) + PAD * 2;
  const x = W - PAD, y = PAD + Math.round(FONT.size * 1.15);
  await page.evaluate(({ word, W, H, x, y, f }) => {
    document.body.innerHTML = `<svg id="s" xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block;background:#000">
      <text x="${x}" y="${y}" direction="rtl" text-anchor="start" font-family='${f.family}' font-weight="${f.weight}" font-size="${f.size}" fill="#fff"></text></svg>`;
    document.querySelector("text").textContent = word;
  }, { word, W, H, x, y, f: FONT });
  const png = (await page.locator("#s").screenshot({ omitBackground: false })).toString("base64");
  const r = await page.evaluate(trace, { png, W, H });
  results[word] = { x, y, ...r };
  console.log(`${word.padEnd(12)} ${r.strokes.length} strokes, pen width ${r.thickness.toFixed(1)}px`);
}
await browser.close();

// One vertical frame for every word (from the highest ascender to the lowest descender), so all words share a size.
const top = Math.min(...Object.values(results).map((r) => r.ink[1] - r.y));
const bottom = Math.max(...Object.values(results).map((r) => r.ink[3] - r.y));
const margin = 14;
const data = Object.fromEntries(
  Object.entries(results).map(([word, r]) => {
    const vx = r.ink[0] - margin;
    const vw = r.ink[2] - r.ink[0] + margin * 2;
    return [
      word,
      {
        viewBox: [vx, r.y + top - margin, vw, bottom - top + margin * 2],
        x: r.x,
        y: r.y,
        pen: Math.round(r.thickness * 1.7 + 6),
        strokes: r.strokes,
      },
    ];
  })
);

writeFileSync(
  OUT,
  `// Generated by scripts/hero-strokes.mjs (npm run hero:strokes). Do not edit by hand; run it again after changing heroWords.

/** How HandwrittenWord.tsx sets the text, the same as when the strokes were traced. */
export const HAND_FONT = ${JSON.stringify(FONT)} as const;

export type HandWord = {
  /** minX, minY, width, height of the SVG. */
  viewBox: [number, number, number, number];
  /** Where the text starts (its right edge) and its baseline. */
  x: number;
  y: number;
  /** Width of the pen that reveals the letters. */
  pen: number;
  /** The pen strokes in writing order, with their lengths. */
  strokes: { d: string; len: number }[];
};

export const handStrokes: Record<string, HandWord> = ${JSON.stringify(data, null, 2)};
`
);
console.log(`Wrote ${OUT}`);
