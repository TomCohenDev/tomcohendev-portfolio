// Rebuilds the hand-drawn figures for the T3 Code + Kitshn article.
//   node drafts/blog/assets/t3-kitshn/generate.mjs
// Writes public/blog/t3-kitshn/0N-{en,he}.svg (standalone, full-size links),
// the two guide pages, and injects the inline SVGs into the article markdown
// between <!-- t3k-fig:NN --> markers.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);
const rough = require("roughjs/bundled/rough.cjs.js");
const gen = rough.generator();

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../..");
const PUBLIC = resolve(ROOT, "public/blog/t3-kitshn");

const C = {
  bg: "#1d201f", card: "#232726", ink: "#e0d0c1", muted: "#b9bbbe",
  acc: "#bf95f9", hum: "#f2c46d", ok: "#43b581", bad: "#f28b82",
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const f = (n) => Math.round(n * 10) / 10;

// Shared stylesheet. Inline SVG styles are page-global, so everything is prefixed.
const STYLE = `
.t3k text{font-family:"Nunito","Fredoka",system-ui,sans-serif;fill:${C.muted}}
.t3k .h{font-family:"Excalifont","Playpen Sans Hebrew",cursive;font-weight:500;font-synthesis-weight:none}
.t3k .halo{paint-order:stroke;stroke:${C.bg};stroke-width:7px;stroke-linejoin:round}
.t3k .r{fill:none;stroke-linecap:round;stroke-linejoin:round}
.t3k .hf{fill:none;stroke-linecap:round}
.t3k .c-ink{stroke:${C.ink}} .t3k .t-ink{fill:${C.ink}}
.t3k .c-mut{stroke:${C.muted}} .t3k .t-mut{fill:${C.muted}}
.t3k .c-acc{stroke:${C.acc}} .t3k .t-acc{fill:${C.acc}}
.t3k .c-hum{stroke:${C.hum}} .t3k .t-hum{fill:${C.hum}}
.t3k .c-ok{stroke:${C.ok}} .t3k .t-ok{fill:${C.ok}}
.t3k .c-bad{stroke:${C.bad}} .t3k .t-bad{fill:${C.bad}}
.t3k .faint{opacity:.35}
.t3k .flow{fill:none;stroke-width:4;stroke-linecap:round;stroke-dasharray:0 22;opacity:.95}
.t3k .n{transition:transform .25s ease}
.t3k .n:hover{transform:translateY(-3px)}
.t3k .n .bgc{transition:fill .25s ease}
.t3k .n:hover .bgc{fill:#2b302e}
@media (prefers-reduced-motion:no-preference){
  .t3k .flow{animation:t3k-flow 1.6s linear infinite}
  .t3k .pulse{animation:t3k-pulse 2.4s ease-out infinite;transform-box:fill-box;transform-origin:center}
  .t3k .zz{animation:t3k-zz 2.8s ease-in-out infinite}
  .t3k .zz2{animation-delay:.5s}.t3k .zz3{animation-delay:1s}
}
@media (prefers-reduced-motion:reduce){.t3k .mover{display:none}.t3k .n{transition:none}}
@keyframes t3k-flow{to{stroke-dashoffset:-22}}
@keyframes t3k-pulse{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.2);opacity:0}}
@keyframes t3k-zz{0%,100%{opacity:.25;transform:translateY(0)}50%{opacity:1;transform:translateY(-6px)}}
`.replace(/\n\s*/g, "");

// ---------------------------------------------------------------- drawing kit
function canvas(lang, num, W, H) {
  const rtl = lang === "he";
  const X = (x) => (rtl ? W - x : x);
  const P = (pts) => pts.map(([x, y]) => [X(x), y]);
  let seed = Number(num) * 1000 + (rtl ? 500 : 0);
  const out = [];
  const opts = (o = {}) => ({ roughness: 1.15, bowing: 0.9, strokeWidth: 2, seed: ++seed, ...o });

  const toPath = (drawable, cls, extra = "") =>
    gen.toPaths(drawable).map((p) => `<path d="${p.d}" class="r ${cls}"${p.fill && p.fill !== "none" ? "" : ""}${extra}/>`).join("");

  const api = {
    W, H, rtl, X, P, out,
    push: (s) => out.push(s),
    // smooth Catmull-Rom path through points (already mirrored)
    smooth(pts, closed = false) {
      if (pts.length === 2) return `M${f(pts[0][0])} ${f(pts[0][1])}L${f(pts[1][0])} ${f(pts[1][1])}`;
      const p = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
      let d = `M${f(p[1][0])} ${f(p[1][1])}`;
      for (let i = 1; i < p.length - 2; i++) {
        const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
      }
      return d;
    },
    endTangent(pts) {
      const n = pts.length;
      if (n === 2) return [pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]];
      const p0 = pts[n - 3] ?? pts[n - 2], p1 = pts[n - 2], p2 = pts[n - 1];
      const c2 = [p2[0] - (p2[0] - p1[0]) / 6, p2[1] - (p2[1] - p1[1]) / 6];
      void p0;
      return [p2[0] - c2[0], p2[1] - c2[1]];
    },
    roughPath(d, cls, o = {}) { out.push(toPath(gen.path(d, opts(o)), cls)); },
    // rounded box; returns nothing, draws fill + rough outline
    box(x, y, w, h, cls, { r = 16, dash = false, fill = C.card, o = {} } = {}) {
      const L = rtl ? W - x - w : x;
      out.push(`<rect class="bgc" x="${f(L)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${r}" fill="${fill}"/>`);
      const d = `M${L + r} ${y}H${L + w - r}Q${L + w} ${y} ${L + w} ${y + r}V${y + h - r}Q${L + w} ${y + h} ${L + w - r} ${y + h}H${L + r}Q${L} ${y + h} ${L} ${y + h - r}V${y + r}Q${L} ${y} ${L + r} ${y}Z`;
      out.push(toPath(gen.path(d, opts({ roughness: 0.9, ...o })), cls, dash ? ' stroke-dasharray="7 7"' : ""));
    },
    ellipse(cx, cy, w, h, cls, { dash = false, fillCls = null, o = {} } = {}) {
      const d = gen.ellipse(X(cx), cy, w, h, opts({ roughness: 0.8, ...o }));
      out.push(toPath(d, cls, dash ? ' stroke-dasharray="8 9"' : ""));
      void fillCls;
    },
    hachureEllipse(cx, cy, w, h, color, opacity = 0.18, gap = 9) {
      const d = gen.ellipse(X(cx), cy, w, h, opts({ fill: color, fillStyle: "hachure", hachureGap: gap, hachureAngle: -41, stroke: "none", roughness: 0.7, fillWeight: 1.4 }));
      out.push(gen.toPaths(d).filter((p) => p.stroke !== "none").map((p) => `<path d="${p.d}" class="hf" stroke="${color}" stroke-width="1.4" opacity="${opacity}"/>`).join(""));
    },
    hachureRect(x, y, w, h, color, opacity = 0.3, gap = 6) {
      const L = rtl ? W - x - w : x;
      const d = gen.rectangle(L, y, w, h, opts({ fill: color, fillStyle: "hachure", hachureGap: gap, hachureAngle: -41, stroke: "none", roughness: 0.6, fillWeight: 1.5 }));
      out.push(gen.toPaths(d).filter((p) => p.stroke !== "none").map((p) => `<path d="${p.d}" class="hf" stroke="${color}" stroke-width="1.5" opacity="${opacity}"/>`).join(""));
    },
    line(x1, y1, x2, y2, cls, { dash = false, o = {} } = {}) {
      out.push(toPath(gen.line(X(x1), y1, X(x2), y2, opts(o)), cls, dash ? ' stroke-dasharray="6 8"' : ""));
    },
    // arrow through points; flow=true adds animated dots on top
    arrow(points, cls, { flow = false, dash = false, head = true, o = {}, flowCls = null } = {}) {
      const pts = P(points);
      const d = api.smooth(pts);
      out.push(toPath(gen.path(d, opts({ roughness: 0.9, ...o })), cls, dash ? ' stroke-dasharray="7 8"' : ""));
      if (head) {
        const [tx, ty] = api.endTangent(pts);
        const a = Math.atan2(ty, tx), [ex, ey] = pts[pts.length - 1], L = 15;
        const h1 = [ex - L * Math.cos(a - 0.45), ey - L * Math.sin(a - 0.45)];
        const h2 = [ex - L * Math.cos(a + 0.45), ey - L * Math.sin(a + 0.45)];
        out.push(toPath(gen.path(`M${f(h1[0])} ${f(h1[1])}L${f(ex)} ${f(ey)}L${f(h2[0])} ${f(h2[1])}`, opts({ roughness: 0.5 })), cls));
      }
      if (flow) out.push(`<path d="${d}" class="flow ${flowCls ?? cls}"/>`);
      return d;
    },
    dot(x, y, r, color, { ring = false } = {}) {
      out.push(`<circle cx="${f(X(x))}" cy="${y}" r="${r}" fill="${ring ? C.bg : color}" stroke="${color}" stroke-width="2.5"/>`);
    },
    text(x, y, s, { size: req = 20, cls = "t-mut", hand = false, anchor = "middle", halo = false, weight = null } = {}) {
      const size = Math.max(req, 16); // keeps small labels readable when the figure shrinks on phones
      const c = [cls, hand ? "h" : "", halo ? "halo" : ""].filter(Boolean).join(" ");
      // Latin-only strings in the Hebrew figures stay LTR (an RTL run garbles "T3"); flip their anchor instead.
      const hebrew = /[֐-׿]/.test(s);
      const dir = rtl && hebrew ? "rtl" : "ltr";
      const a = rtl && !hebrew ? ({ start: "end", end: "start" }[anchor] ?? anchor) : anchor;
      out.push(`<text x="${f(X(x))}" y="${f(y)}" font-size="${size}" text-anchor="${a}" class="${c}"${weight ? ` font-weight="${weight}"` : ""} direction="${dir}">${esc(s)}</text>`);
    },
    // node card with title + sub, centred text
    node(x, y, w, h, title, sub, cls, tcls, { dash = false, tsize = 25, ssize = 18, tip = null } = {}) {
      out.push(`<g class="n"><title>${esc(tip ?? (sub ? `${title} — ${sub}` : title))}</title>`);
      api.box(x, y, w, h, cls, { dash });
      const cy = y + h / 2;
      if (sub) {
        api.text(x + w / 2, cy - 4, title, { size: tsize, cls: tcls, hand: true });
        api.text(x + w / 2, cy + ssize + 4, sub, { size: ssize });
      } else api.text(x + w / 2, cy + tsize * 0.35, title, { size: tsize, cls: tcls, hand: true });
      out.push("</g>");
    },
    raw: (s) => out.push(s),
  };
  return api;
}

function wrapSvg(num, lang, W, H, title, desc, body, { standalone = false } = {}) {
  const id = `t3k-${num}-${lang}`;
  const fonts = standalone
    ? `@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&family=Nunito:wght@400;600&family=Playpen+Sans+Hebrew:wght@400;500&display=swap");@font-face{font-family:"Excalifont";src:url("excalifont.woff2") format("woff2")}`
    : "";
  const grid = `<defs><pattern id="${id}-g" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="${C.ink}" stroke-opacity=".05"/></pattern></defs>`;
  const size = standalone ? ` width="${W * 1.5}" height="${H * 1.5}"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"${size} class="t3k" id="${id}" role="img" aria-labelledby="${id}-t ${id}-d" style="display:block;width:100%;height:auto"${lang === "he" ? ' direction="rtl"' : ""}><title id="${id}-t">${esc(title)}</title><desc id="${id}-d">${esc(desc)}</desc><style>${standalone ? `<![CDATA[${fonts}${STYLE}]]>` : STYLE}</style>${grid}<rect width="${W}" height="${H}" rx="18" fill="${C.bg}"/><rect width="${W}" height="${H}" rx="18" fill="url(#${id}-g)"/>${body}</svg>`;
}

// person icon (gold "me")
function person(c, x, y, cls = "c-hum") {
  c.ellipse(x, y - 30, 26, 26, cls);
  c.arrow([[x, y - 16], [x, y + 14]], cls, { head: false });
  c.arrow([[x - 18, y - 4], [x, y - 10], [x + 18, y - 4]], cls, { head: false });
  c.arrow([[x - 13, y + 36], [x, y + 14], [x + 13, y + 36]], cls, { head: false });
}

function bolt(c, x, y, s = 1) {
  const pts = [[x + 6 * s, y - 18 * s], [x - 7 * s, y + 2 * s], [x + 3 * s, y + 2 * s], [x - 5 * s, y + 20 * s], [x + 9 * s, y - 2 * s], [x - 1 * s, y - 2 * s]];
  const p = c.P(pts);
  c.raw(`<path d="M${p.map((q) => q.map(f).join(" ")).join("L")}Z" fill="${C.hum}" stroke="${C.hum}" stroke-width="2" stroke-linejoin="round"/>`);
}

// ---------------------------------------------------------------- figures
const FIGS = [];

// 1 · concentric layers around the model
FIGS.push((lang, T) => {
  const W = 680, H = 560, c = canvas(lang, "01", W, H);
  const cx = 412, cy = 296;
  c.hachureEllipse(cx, cy, 460, 460, C.acc, 0.07, 11);
  c.ellipse(cx, cy, 460, 460, "c-acc");
  c.raw(`<circle cx="${c.X(cx)}" cy="${cy}" r="148" fill="${C.bg}"/>`);
  c.ellipse(cx, cy, 296, 296, "c-mut", { dash: true });
  c.hachureEllipse(cx, cy, 150, 150, C.ink, 0.16, 8);
  c.ellipse(cx, cy, 150, 150, "c-ink");

  c.text(cx, cy - 180, T.harness, { size: 25, cls: "t-acc", hand: true, halo: true });
  c.text(cx, cy - 157, T.harnessSub, { size: 16, halo: true });
  c.text(cx, cy - 112, T.runtime, { size: 22, cls: "t-ink", hand: true, halo: true });
  c.text(cx, cy - 89, T.runtimeSub, { size: 16, halo: true });
  c.text(cx, cy + 4, T.model, { size: 28, cls: "t-ink", hand: true });
  c.text(cx, cy + 30, T.modelSub, { size: 16 });

  const tags = [[-36, T.tools], [6, T.context], [50, T.perms], [96, T.repo]];
  for (const [deg, label] of tags) {
    const a = (deg * Math.PI) / 180, tx = cx + 189 * Math.cos(a), ty = cy + 189 * Math.sin(a);
    const w = Math.max(96, label.length * 11 + 34);
    c.raw(`<g class="n"><title>${esc(label)}</title>`);
    c.box(tx - w / 2, ty - 21, w, 42, "c-acc", { r: 21 });
    c.text(tx, ty + 7, label, { size: 20, cls: "t-acc", hand: true });
    c.raw("</g>");
  }

  person(c, 66, 296);
  c.text(66, 362, T.me, { size: 27, cls: "t-hum", hand: true });
  c.text(66, 385, T.meSub1, { size: 16 });
  c.text(66, 404, T.meSub2, { size: 16 });

  c.arrow([[100, 262], [190, 236], [290, 240], [344, 268]], "c-hum", { flow: true });
  c.text(196, 216, T.brief, { size: 21, cls: "t-hum", hand: true, halo: true });
  c.arrow([[344, 326], [290, 352], [190, 356], [100, 334]], "c-ok", { flow: true });
  c.text(200, 392, T.result, { size: 21, cls: "t-ok", hand: true, halo: true });
  return { W, H, body: c.out.join("") };
});

// 2 · lineage as a git graph
FIGS.push((lang, T) => {
  const W = 680, H = 520, c = canvas(lang, "02", W, H);
  const rows = { up: 96, yz: 196, me: 296, k: 410, km: 480 };
  const dots = (y, xs, color, ring = []) => xs.forEach((x) => c.dot(x, y, 7, color, { ring: ring.includes(x) }));

  // upstream
  c.arrow([[40, rows.up], [650, rows.up]], "c-acc", { head: false });
  dots(rows.up, [62, 138, 214, 290, 366, 442, 518, 594], C.acc);
  c.text(40, rows.up - 24, T.up, { size: 26, cls: "t-ink", hand: true, anchor: "start" });
  c.text(176, rows.up + 32, "pingdotgg/t3code", { size: 15, anchor: "start" });

  // Yarden's fork
  c.arrow([[138, rows.up], [150, rows.up + 52], [196, rows.yz - 6], [250, rows.yz]], "c-acc", { head: false, o: { roughness: 0.6 } });
  c.arrow([[250, rows.yz], [650, rows.yz]], "c-acc", { head: false });
  dots(rows.yz, [250, 330, 410, 490, 570, 630], C.acc);
  c.text(232, rows.yz - 24, T.yz, { size: 24, cls: "t-ink", hand: true, anchor: "start" });
  c.text(274, rows.yz + 32, "Yarden-zamir/t3code", { size: 15, anchor: "start" });

  // my fork + sync merges
  c.arrow([[330, rows.yz], [342, rows.yz + 52], [388, rows.me - 6], [440, rows.me]], "c-hum", { head: false, o: { roughness: 0.6 } });
  c.arrow([[440, rows.me], [650, rows.me]], "c-hum", { head: false });
  dots(rows.me, [450, 540, 620], C.hum);
  c.arrow([[496, rows.yz + 10], [532, rows.me - 12]], "c-hum", { o: { roughness: 0.5 } });
  c.arrow([[576, rows.yz + 10], [612, rows.me - 12]], "c-hum", { o: { roughness: 0.5 } });
  c.text(600, rows.yz + 54, T.sync, { size: 17, cls: "t-hum", hand: true, halo: true, anchor: "start" });
  c.raw(`<circle class="pulse" cx="${c.X(620)}" cy="${rows.me}" r="9" fill="none" stroke="${C.hum}" stroke-width="2"/>`);
  c.text(366, rows.me + 2, T.mine, { size: 24, cls: "t-hum", hand: true, anchor: "end" });
  c.text(366, rows.me + 26, "TomCohenDev/t3code", { size: 15, anchor: "end" });

  // Kitshn — its own project
  c.arrow([[40, rows.k], [650, rows.k]], "c-ok", { head: false });
  dots(rows.k, [62, 150, 238, 326, 414, 502, 590], C.ok, [62]);
  c.text(40, rows.k - 24, "Kitshn", { size: 26, cls: "t-ok", hand: true, anchor: "start" });
  c.text(76, rows.k + 32, "Yarden-zamir/kitshn", { size: 15, anchor: "start" });
  c.arrow([[414, rows.k], [426, rows.km - 30], [466, rows.km - 2], [510, rows.km]], "c-ok", { head: false, o: { roughness: 0.6 } });
  c.arrow([[510, rows.km], [650, rows.km]], "c-ok", { head: false });
  dots(rows.km, [530, 600], C.ok);
  c.text(398, rows.km + 6, T.kMine, { size: 15, anchor: "end" });

  // integration (dashed)
  c.arrow([[238, rows.k - 12], [214, 320], [248, rows.yz + 14]], "c-ok", { dash: true, flow: true, flowCls: "c-ok" });
  c.text(128, 318, T.integ, { size: 18, cls: "t-ok", hand: true, halo: true });
  c.text(128, 340, T.integSub, { size: 15, halo: true });
  return { W, H, body: c.out.join("") };
});

// 3 · the thread stitched through the task's pieces
FIGS.push((lang, T) => {
  const W = 680, H = 600, c = canvas(lang, "03", W, H);
  const cards = [[40, 96, T.conv, T.convSub], [390, 196, T.proj, T.projSub], [40, 296, T.diff, T.diffSub], [390, 396, T.pr, T.prSub]];
  const centers = cards.map(([x, y]) => [x + 125, y + 46]);
  const thread = [[372, 36], ...centers, [340, 548]];
  // thread drawn first so the cards sit on top of it — it looks woven through them
  c.arrow(thread, "c-acc", { head: false, flow: true, o: { roughness: 0.6 } });
  // worktree side card
  c.arrow([[150, 342], [120, 410], [150, 460]], "c-mut", { dash: true, head: true });
  c.node(40, 460, 220, 78, "worktree", T.wtSub, "c-mut", "t-ink", { dash: true, tsize: 22, ssize: 15 });
  for (const [x, y, t, s] of cards) c.node(x, y, 250, 92, t, s, "c-acc", "t-ink");
  // needle
  c.line(366, 38, 452, 16, "c-ink", { o: { strokeWidth: 3, roughness: 0.3 } });
  c.ellipse(372, 36, 12, 7, "c-ink", { o: { roughness: 0.2 } });
  c.text(466, 30, T.task, { size: 21, cls: "t-ink", hand: true, anchor: "start" });
  // knot + outcome
  c.raw(`<circle cx="${c.X(340)}" cy="548" r="9" fill="${C.ok}"/>`);
  c.raw(`<circle class="pulse" cx="${c.X(340)}" cy="548" r="9" fill="none" stroke="${C.ok}" stroke-width="2"/>`);
  c.text(362, 555, T.out, { size: 22, cls: "t-ok", hand: true, anchor: "start" });
  return { W, H, body: c.out.join("") };
});

// 4 · sequence diagram with a travelling token
FIGS.push((lang, T) => {
  const W = 680, H = 860, c = canvas(lang, "04", W, H);
  const col = { me: 78, main: 254, res: 432, rev: 604 };
  const top = 30, bottom = 820;
  const heads = [["me", T.me, "", "c-hum", "t-hum"], ["main", T.main, T.mainSub, "c-acc", "t-acc"], ["res", T.res, T.sub, "c-acc", "t-ink"], ["rev", T.rev, T.sub, "c-acc", "t-ink"]];
  for (const [k, , , cls] of heads) c.line(col[k], top + 64, col[k], bottom, cls === "c-hum" ? "c-hum faint" : "c-mut faint", { dash: true, o: { roughness: 0.4 } });
  for (const [k, t, s, cls, tcls] of heads) c.node(col[k] - 68, top, 136, 64, t, s, cls, tcls, { dash: k === "res" || k === "rev", tsize: 22, ssize: 14 });

  // activation bars
  c.hachureRect(col.main - 9, 130, 18, 506, C.acc, 0.45, 5);
  c.box(col.main - 9, 130, 18, 506, "c-acc", { r: 4, fill: "none" });
  c.hachureRect(col.res - 9, 214, 18, 90, C.acc, 0.35, 5);
  c.box(col.res - 9, 214, 18, 90, "c-acc", { r: 4, fill: "none" });
  c.hachureRect(col.rev - 9, 438, 18, 90, C.acc, 0.35, 5);
  c.box(col.rev - 9, 438, 18, 90, "c-acc", { r: 4, fill: "none" });
  c.hachureRect(col.main - 9, 700, 18, 88, C.acc, 0.45, 5);
  c.box(col.main - 9, 700, 18, 88, "c-acc", { r: 4, fill: "none" });

  const msg = (y, a, b, label, cls, tcls, dash = false) => {
    const sx = col[a] + (col[b] > col[a] ? 10 : -10), ex = col[b] + (col[b] > col[a] ? -11 : 11);
    c.arrow([[sx, y], [ex, y]], cls, { dash, o: { roughness: 0.7 } });
    c.text((col[a] + col[b]) / 2, y - 12, label, { size: 18, cls: tcls, hand: true, halo: true });
  };
  msg(140, "me", "main", T.brief, "c-hum", "t-hum");
  msg(224, "main", "res", T.q, "c-acc", "t-acc");
  msg(296, "res", "main", T.found, "c-mut", "t-ink", true);
  // implement note
  c.node(col.main + 26, 330, 150, 58, T.impl, T.implSub, "c-acc", "t-ink", { tsize: 19, ssize: 13 });
  msg(448, "main", "rev", T.diff, "c-acc", "t-acc");
  msg(520, "rev", "main", T.found, "c-mut", "t-ink", true);
  c.node(col.main + 26, 556, 150, 58, T.fix, T.fixSub, "c-ok", "t-ok", { tsize: 19, ssize: 13 });
  // waiting: zzz, then the event wakes it
  c.line(col.main, 640, col.main, 698, "c-mut", { dash: true, o: { roughness: 0.3 } });
  const zx = col.main + 24;
  [["z", 16, 0], ["z", 20, 1], ["Z", 25, 2]].forEach(([z, s, i]) => c.text(zx + i * 16, 676 - i * 12, z, { size: s, cls: `t-mut zz zz${i + 1}`, hand: true, anchor: "start" }));
  c.text(zx + 62, 668, T.wait, { size: 15, anchor: "start" });
  bolt(c, col.main - 34, 704, 1);
  c.text(col.main - 52, 708, T.event, { size: 15, cls: "t-hum", anchor: "end", halo: true });
  msg(776, "main", "me", T.ready, "c-ok", "t-ok");
  // decision mark
  c.raw(`<circle cx="${c.X(col.me)}" cy="776" r="12" fill="${C.hum}"/>`);
  c.text(col.me, 810, T.decide, { size: 18, cls: "t-hum", hand: true });

  // travelling token along the whole conversation
  const route = [[col.me, 140], [col.main, 140], [col.main, 224], [col.res, 224], [col.res, 296], [col.main, 296], [col.main, 448], [col.rev, 448], [col.rev, 520], [col.main, 520], [col.main, 776], [col.me, 776]];
  const rp = c.P(route).map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("");
  c.raw(`<circle class="mover" r="7" fill="${C.hum}" stroke="${C.bg}" stroke-width="3"><animateMotion dur="11s" repeatCount="indefinite" path="${rp}"/></circle>`);
  return { W, H, body: c.out.join("") };
});

// 5 · linked machines inside a Kitshn circle
FIGS.push((lang, T) => {
  const W = 680, H = 540, c = canvas(lang, "05", W, H);
  // Kitshn circle
  c.hachureEllipse(212, 250, 400, 330, C.acc, 0.06, 12);
  c.ellipse(212, 250, 400, 330, "c-acc", { dash: true });
  c.text(212, 72, T.circle, { size: 22, cls: "t-acc", hand: true, halo: true });

  // machine A (laptop)
  c.raw(`<g class="n"><title>${esc(T.a + " — " + T.aSub)}</title>`);
  c.box(52, 178, 176, 112, "c-ink", { r: 10 });
  c.arrow([[30, 302], [250, 302]], "c-ink", { head: false, o: { strokeWidth: 3 } });
  c.line(72, 206, 160, 206, "c-acc", { o: { roughness: 0.4 } });
  c.line(72, 228, 196, 228, "c-mut", { o: { roughness: 0.4 } });
  c.line(72, 250, 180, 250, "c-mut", { o: { roughness: 0.4 } });
  c.line(72, 272, 140, 272, "c-acc", { o: { roughness: 0.4 } });
  c.raw("</g>");
  c.text(140, 336, T.a, { size: 24, cls: "t-ink", hand: true });
  c.text(140, 358, T.aSub, { size: 15 });

  // B's app card, shared into the circle
  c.raw(`<g class="n"><title>${esc(T.card)}</title>`);
  c.box(262, 196, 112, 78, "c-hum", { r: 10 });
  c.text(318, 228, "T3", { size: 22, cls: "t-hum", hand: true });
  c.text(318, 254, T.cardSub, { size: 14 });
  c.raw("</g>");

  // machine B (tower)
  c.raw(`<g class="n"><title>${esc(T.b + " — " + T.bSub)}</title>`);
  c.box(514, 150, 116, 170, "c-ink", { r: 10 });
  for (const y of [182, 212, 242]) c.line(534, y, 610, y, "c-mut", { o: { roughness: 0.5 } });
  c.raw(`<circle cx="${c.X(596)}" cy="292" r="6" fill="${C.ok}"/>`);
  c.raw("</g>");
  c.text(572, 356, T.b, { size: 24, cls: "t-ink", hand: true });
  c.text(572, 378, T.bSub, { size: 15 });

  // share arrow (B -> card)
  c.arrow([[546, 146], [460, 108], [356, 190]], "c-hum", { dash: true });
  c.text(500, 92, T.share, { size: 17, cls: "t-hum", hand: true, halo: true });
  // delegate (A -> B, through the card)
  c.arrow([[228, 234], [262, 235]], "c-acc", { head: false });
  c.arrow([[374, 236], [444, 236], [510, 236]], "c-acc", { flow: true });
  // lock where the delegation leaves the circle
  c.box(400, 266, 26, 22, "c-hum", { r: 4 });
  c.roughPath(`M${c.X(405)} 266V258Q${c.X(413)} 246 ${c.X(421)} 258V266`, "c-hum", { roughness: 0.3 });
  c.text(436, 284, T.del, { size: 17, cls: "t-acc", hand: true, halo: true, anchor: "start" });
  c.text(436, 304, T.delSub, { size: 14, halo: true, anchor: "start" });
  // completion back
  c.arrow([[560, 392], [470, 462], [250, 470], [148, 372]], "c-ok", { flow: true });
  c.text(370, 498, T.done, { size: 18, cls: "t-ok", hand: true, halo: true });
  return { W, H, body: c.out.join("") };
});

// 6 · failure → repair loop
FIGS.push((lang, T) => {
  const W = 680, H = 640, c = canvas(lang, "06", W, H);
  const cx = 340, cy = 356, RX = 236, RY = 204;
  const at = (deg) => [cx + RX * Math.cos((deg * Math.PI) / 180), cy + RY * Math.sin((deg * Math.PI) / 180)];
  const nodes = [
    [-90, T.fail, T.failSub, "c-bad", "t-bad"],
    [-18, "webhook", T.hookSub, "c-acc", "t-acc"],
    [54, T.task, T.taskSub, "c-acc", "t-ink"],
    [126, T.fix, T.fixSub, "c-acc", "t-ink"],
    [198, T.gate, T.gateSub, "c-hum", "t-hum"],
  ];
  // arcs between nodes (clockwise)
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i][0], b = nodes[(i + 1) % nodes.length][0] + (i === nodes.length - 1 ? 360 : 0);
    const pts = [];
    const pad = 23;
    for (let t = a + pad; t <= b - pad + 0.01; t += (b - a - 2 * pad) / 4) pts.push(at(t));
    c.arrow(pts, i === nodes.length - 1 ? "c-ok" : "c-mut", { o: { roughness: 0.6 } });
  }
  c.text(cx - RX + 36, 192, T.back, { size: 17, cls: "t-ok", hand: true, halo: true, anchor: "middle" });
  // travelling dot, drawn behind the cards so it disappears into each step
  const loop = c.P([at(-90), at(-18), at(54), at(126), at(198)]);
  c.raw(`<circle class="mover" r="7" fill="${C.ink}" stroke="${C.bg}" stroke-width="3"><animateMotion dur="10s" repeatCount="indefinite" path="${c.smooth(loop, true)}"/></circle>`);
  for (const [deg, t, s, cls, tcls] of nodes) {
    const [x, y] = at(deg);
    c.node(x - 84, y - 38, 168, 76, t, s, cls, tcls, { tsize: 22, ssize: 15 });
  }
  // upstream sync feeding in
  c.node(24, 30, 196, 64, T.sync, T.syncSub, "c-mut", "t-ink", { tsize: 20, ssize: 14, dash: true });
  c.arrow([[222, 62], [238, 112], [250, 132]], "c-mut", { dash: true });
  // centre note
  c.text(cx, cy - 6, T.note, { size: 23, cls: "t-ink", hand: true });
  c.text(cx, cy + 22, T.note2, { size: 15 });
  c.text(cx, cy + 41, T.note3, { size: 15 });
  return { W, H, body: c.out.join("") };
});

// 7 · where my attention goes: two attention tracks
FIGS.push((lang, T) => {
  const W = 680, H = 600, c = canvas(lang, "07", W, H);
  const x0 = 120, x1 = 650;
  const lane = (y, label, cls) => {
    c.text(x0 - 18, y + 6, label, { size: 18, cls, hand: true, anchor: "end" });
    c.line(x0, y, x1, y, "c-mut faint", { dash: true, o: { roughness: 0.3 } });
  };
  const bar = (xa, xb, y, color, cls, h = 22) => {
    c.hachureRect(xa, y - h / 2, xb - xa, h, color, 0.5, 5);
    c.box(xa, y - h / 2, xb - xa, h, cls, { r: 6, fill: "none" });
  };
  // panel A
  c.text(24, 46, T.manual, { size: 25, cls: "t-hum", hand: true, anchor: "start" });
  lane(110, T.agents, "t-acc");
  lane(186, T.me, "t-hum");
  bar(120, 196, 110, C.acc, "c-acc"); bar(268, 330, 110, C.acc, "c-acc"); bar(404, 456, 110, C.acc, "c-acc"); bar(530, 590, 110, C.acc, "c-acc");
  for (const [a, b] of [[196, 268], [330, 404], [456, 530]]) {
    bar(a + 6, b - 6, 186, C.hum, "c-hum", 26);
    c.arrow([[a + 2, 118], [a + 12, 172]], "c-mut", { o: { roughness: 0.4, strokeWidth: 1.5 } });
    c.arrow([[b - 12, 172], [b - 2, 120]], "c-mut", { o: { roughness: 0.4, strokeWidth: 1.5 } });
  }
  c.text(232, 232, T.rebuild, { size: 17, cls: "t-ink", hand: true });
  c.text(367, 232, T.check, { size: 17, cls: "t-ink", hand: true });
  c.text(493, 232, T.pass, { size: 17, cls: "t-ink", hand: true });
  c.text(x1, 268, T.manualNote, { size: 15, anchor: "end" });

  c.line(24, 300, 656, 300, "c-mut faint", { o: { roughness: 1.4, strokeWidth: 1.5 } });

  // panel B
  c.text(24, 350, T.harness, { size: 25, cls: "t-acc", hand: true, anchor: "start" });
  lane(408, T.agents, "t-acc");
  lane(440, "", "t-acc");
  lane(512, T.me, "t-hum");
  bar(176, 470, 408, C.acc, "c-acc"); bar(214, 410, 440, C.acc, "c-acc"); bar(534, 646, 424, C.acc, "c-acc");
  bar(124, 172, 512, C.hum, "c-hum", 26); bar(476, 530, 512, C.hum, "c-hum", 26);
  c.arrow([[174, 498], [196, 422]], "c-mut", { o: { roughness: 0.4, strokeWidth: 1.5 } });
  bolt(c, 470, 470, 0.8); bolt(c, 418, 466, 0.8);
  c.arrow([[478, 474], [496, 498]], "c-hum", { o: { roughness: 0.4, strokeWidth: 1.5 } });
  c.arrow([[530, 498], [548, 438]], "c-mut", { o: { roughness: 0.4, strokeWidth: 1.5 } });
  c.text(148, 552, T.brief, { size: 17, cls: "t-ink", hand: true });
  c.text(503, 552, T.decide, { size: 17, cls: "t-ink", hand: true });
  c.line(186, 512, 466, 512, "c-ok", { dash: true, o: { roughness: 0.5 } });
  c.text(326, 500, T.free, { size: 16, cls: "t-ok", hand: true, halo: true });
  c.text(x1, 586, T.lanesNote, { size: 14, anchor: "end" });
  return { W, H, body: c.out.join("") };
});

// ---------------------------------------------------------------- copy
const COPY = {
  en: [
    { title: "The layers around an agent", desc: "Concentric rings: the model at the centre, the agent runtime around it, and the T3 Code harness outside that, holding tools, context, permissions and the repository. I sit outside the rings: a brief goes in, a result comes back out for me to review.",
      t: { harness: "harness · T3 Code", harnessSub: "projects · threads · coordination", runtime: "agent runtime", runtimeSub: "tool calls", model: "model", modelSub: "reasoning", tools: "tools", context: "context", perms: "permissions", repo: "repository", me: "me", meSub1: "outcome", meSub2: "decisions", brief: "brief + constraints", result: "result to review" } },
    { title: "Where the setup comes from", desc: "A git-graph of the projects. T3 Code (pingdotgg/t3code) is forked by Yarden Zamir, and my fork (TomCohenDev/t3code) branches from his and syncs from it. Kitshn is a separate project by Yarden with its own history, which I also fork. A dashed line marks that Kitshn is integrated into Yarden's T3 fork rather than forked from it.",
      t: { up: "T3 Code", yz: "Yarden Zamir’s fork", yzSub: "Yarden-zamir/t3code · Kitshn + cross-machine work", mine: "my fork", sync: "sync", kSub: "Yarden-zamir/kitshn · deploys + access map", kMine: "TomCohenDev/kitshn", integ: "integration", integSub: "not a fork" } },
    { title: "What a thread holds together", desc: "A single thread is stitched through four parts of one task: the conversation and its decisions, the project's repository, the branch and its diff, and the pull request with its checks. A separate worktree hangs off the branch for when the task needs an isolated checkout. The thread ends at something I can review.",
      t: { task: "one task", conv: "conversation", convSub: "decisions so far", proj: "project", projSub: "the repo it runs in", diff: "branch + diff", diffSub: "what changed", pr: "pull request", prSub: "checks + review", wtSub: "isolated copy, when needed", out: "something I can review" } },
    { title: "How a task moves through agents", desc: "A sequence diagram with four lanes: me, the main agent, a research subagent and a review subagent. I send the brief; the main agent sends a bounded question to research and gets findings back, implements, sends the diff to an independent review and gets findings back, then resolves and verifies. It waits on checks until the check event wakes it, and hands back to me for a decision.",
      t: { me: "me", main: "main agent", mainSub: "owns the task", res: "research", rev: "review", sub: "subagent", brief: "brief", q: "bounded question", found: "findings", impl: "implement", implSub: "use the findings", diff: "diff + checks", fix: "resolve", fixSub: "revise · verify", wait: "waits on checks", event: "check event wakes it", ready: "ready for a decision", decide: "decide" } },
    { title: "Work across linked machines", desc: "Machine A and the T3 app card of machine B sit inside the same Kitshn circle, which defines who has access. Machine B shares its card into the circle. The parent thread on A delegates through that card to B, within the grant and the thread's limits. B works with its own checkout and tools, and completion returns to the parent thread.",
      t: { circle: "Kitshn circle · who has access", a: "machine A", aSub: "parent thread", b: "machine B", bSub: "own checkout + tools", card: "Machine B's T3 app card, shared into the circle", cardSub: "B’s app card", share: "card shared in", del: "delegate", delSub: "grant + thread limits", done: "completion reaches the parent thread" } },
    { title: "A failure can become a repair task", desc: "A loop: a workflow fails on main, a webhook routes the failure into a repair task where an agent investigates, the agent proposes a fix and the checks run again, and the fix still goes through review and merge before it reaches main. An upstream sync from Yarden's fork feeds into main. The centre notes that this is not automatic recovery.",
      t: { fail: "workflow fails", failSub: "on main", hookSub: "routes the failure", task: "repair task", taskSub: "an agent investigates", fix: "proposed fix", fixSub: "checks run again", gate: "review + merge", gateSub: "the usual process", back: "back to main", sync: "upstream sync", syncSub: "from Yarden’s fork + tests", note: "not auto-recovery", note2: "an event starts the investigation;", note3: "the proposal still has to pass" } },
    { title: "Where the acceleration comes from", desc: "Two pairs of attention tracks. With manual coordination, agent work stops after each step and I fill the gaps by rebuilding context, checking status and passing work along. With the harness, agents work in longer, parallel stretches, events bring the results back, and my time gathers at the brief and the decision. Conceptual lanes, not durations.",
      t: { manual: "manual coordination", harness: "with the harness", agents: "agents", me: "me", rebuild: "rebuild context", check: "check status", pass: "pass it along", manualNote: "the work waits on me between every step", brief: "brief", decide: "decide", free: "free for the next problem", lanesNote: "conceptual lanes · not durations or a benchmark" } },
  ],
  he: [
    { title: "השכבות שסביב הסוכן", desc: "טבעות קונצנטריות: המודל במרכז, סביבת ההרצה של הסוכן סביבו, ומחוץ לה ה־Harness של T3 Code, שמחזיק כלים, הקשר, הרשאות ומאגר קוד. אני מחוץ לטבעות: בריף נכנס פנימה, ותוצאה חוזרת אליי לבדיקה.",
      t: { harness: "Harness · T3 Code", harnessSub: "פרויקטים · שרשורים · תיאום", runtime: "סביבת ההרצה", runtimeSub: "קריאות לכלים", model: "המודל", modelSub: "חשיבה", tools: "כלים", context: "הקשר", perms: "הרשאות", repo: "מאגר קוד", me: "אני", meSub1: "תוצאה", meSub2: "החלטות", brief: "בריף ואילוצים", result: "תוצאה לבדיקה" } },
    { title: "מאיפה הסטאפ הגיע", desc: "גרף גרסאות של הפרויקטים. ירדן זמיר פיצל את T3 Code ‏(pingdotgg/t3code), והפורק שלי (TomCohenDev/t3code) יוצא מהפורק שלו ומסתנכרן ממנו. Kitshn הוא פרויקט נפרד של ירדן עם היסטוריה משלו, וגם אותו אני מפצל. קו מקווקו מסמן ש־Kitshn משולב בפורק של ירדן ל־T3, ולא פוצל ממנו.",
      t: { up: "T3 Code", yz: "הפורק של ירדן זמיר", yzSub: "Yarden-zamir/t3code · Kitshn ועבודה בין מחשבים", mine: "הפורק שלי", sync: "סנכרון", kSub: "Yarden-zamir/kitshn · פריסה ומפת גישה", kMine: "TomCohenDev/kitshn", integ: "שילוב", integSub: "לא פורק" } },
    { title: "מה השרשור מחבר", desc: "חוט אחד עובר דרך ארבעה חלקים של משימה אחת: השיחה וההחלטות שבה, מאגר הקוד של הפרויקט, הענף והשוואת השינויים, ובקשת המיזוג עם הבדיקות. worktree נפרד מתחבר לענף כשהמשימה צריכה עותק עבודה מבודד. החוט מסתיים בתוצר שאפשר לבדוק.",
      t: { task: "משימה אחת", conv: "שיחה", convSub: "ההחלטות שכבר התקבלו", proj: "פרויקט", projSub: "המאגר שבו היא רצה", diff: "ענף ושינויים", diffSub: "מה השתנה", pr: "בקשת מיזוג", prSub: "בדיקות וביקורת", wtSub: "עותק מבודד, כשצריך", out: "תוצר שאפשר לבדוק" } },
    { title: "איך משימה עוברת בין סוכנים", desc: "תרשים רצף עם ארבעה מסלולים: אני, הסוכן הראשי, תת־סוכן למחקר ותת־סוכן לביקורת. אני שולח בריף; הסוכן הראשי שולח שאלה מוגדרת למחקר ומקבל ממצאים, מממש, שולח את השינויים לביקורת עצמאית ומקבל ממצאים, ואז מטפל בהם ובודק. הוא מחכה לבדיקות עד שהאירוע מעיר אותו, ומחזיר אליי להחלטה.",
      t: { me: "אני", main: "סוכן ראשי", mainSub: "אחראי על המשימה", res: "מחקר", rev: "ביקורת", sub: "תת־סוכן", brief: "בריף", q: "שאלה מוגדרת", found: "ממצאים", impl: "מימוש", implSub: "לפי הממצאים", diff: "שינויים ובדיקות", fix: "טיפול", fixSub: "תיקון · אימות", wait: "מחכה לבדיקות", event: "האירוע מעיר אותו", ready: "מוכן להחלטה", decide: "החלטה" } },
    { title: "עבודה בין מחשבים מקושרים", desc: "מחשב A וכרטיס יישום ה־T3 של מחשב B נמצאים באותו מעגל Kitshn, שמגדיר למי יש גישה. מחשב B משתף את הכרטיס שלו למעגל. השרשור הראשי ב־A מאציל דרך הכרטיס הזה ל־B, בגבולות ההרשאה והשרשור. B עובד עם עותק קוד וכלים משלו, והסיום חוזר לשרשור הראשי.",
      t: { circle: "מעגל Kitshn · למי יש גישה", a: "מחשב A", aSub: "השרשור הראשי", b: "מחשב B", bSub: "עותק קוד וכלים משלו", card: "כרטיס יישום ה־T3 של מחשב B, משותף למעגל", cardSub: "הכרטיס של B", share: "הכרטיס משותף", del: "האצלה", delSub: "בגבולות ההרשאה", done: "הסיום מגיע לשרשור הראשי" } },
    { title: "תקלה יכולה להפוך למשימת תיקון", desc: "לולאה: תהליך נכשל בענף הראשי, webhook מעביר את הכישלון למשימת תיקון שבה סוכן חוקר, הסוכן מציע תיקון והבדיקות רצות שוב, והתיקון עדיין עובר ביקורת ומיזוג לפני שהוא מגיע לענף הראשי. סנכרון מהפורק של ירדן מזין את הענף הראשי. במרכז: זאת לא התאוששות אוטומטית.",
      t: { fail: "תהליך נכשל", failSub: "בענף הראשי", hookSub: "מעביר את התקלה", task: "משימת תיקון", taskSub: "סוכן חוקר", fix: "הצעת תיקון", fixSub: "הבדיקות רצות שוב", gate: "ביקורת ומיזוג", gateSub: "התהליך הרגיל", back: "חזרה לענף הראשי", sync: "סנכרון", syncSub: "מהפורק של ירדן + בדיקות", note: "לא התאוששות אוטומטית", note2: "אירוע מתחיל את החקירה;", note3: "ההצעה עדיין צריכה לעבור בדיקה" } },
    { title: "מאיפה מגיעה ההאצה", desc: "שני זוגות של מסלולי קשב. בתיאום ידני, העבודה של הסוכנים נעצרת אחרי כל שלב ואני ממלא את הפערים: משחזר הקשר, בודק מצב ומעביר הלאה. עם ה־Harness, הסוכנים עובדים ברצף ארוך ובמקביל, אירועים מחזירים את התוצאות, והזמן שלי מתרכז בבריף ובהחלטה. מסלולים רעיוניים, לא זמני ביצוע.",
      t: { manual: "תיאום ידני", harness: "עם ה־Harness", agents: "סוכנים", me: "אני", rebuild: "שחזור הקשר", check: "בדיקת מצב", pass: "העברה הלאה", manualNote: "העבודה מחכה לי בין כל שלב לשלב", brief: "בריף", decide: "החלטה", free: "פנוי לבעיה הבאה", lanesNote: "מסלולים רעיוניים · לא זמני ביצוע ולא מדד" } },
  ],
};

// ---------------------------------------------------------------- build
export function build() {
  const result = { en: [], he: [] };
  for (const lang of ["en", "he"]) {
    FIGS.forEach((fig, i) => {
      const num = String(i + 1).padStart(2, "0");
      const { title, desc, t } = COPY[lang][i];
      const { W, H, body } = fig(lang, t);
      const inline = wrapSvg(num, lang, W, H, title, desc, body);
      const standalone = wrapSvg(num, lang, W, H, title, desc, body, { standalone: true });
      writeFileSync(resolve(PUBLIC, `${num}-${lang}.svg`), standalone);
      result[lang].push({ num, title, inline, W, H });
    });
  }
  return result;
}

const FULL = { en: "Open full size", he: "לפתיחה בגודל מלא" };

function figureHtml(lang, fig, caption) {
  return `<!-- t3k-fig:${fig.num} -->
<figure style="margin:2.25rem 0;">
<div style="max-width:760px;margin-inline:auto;border:1px solid rgba(224,208,193,.13);border-radius:18px;overflow:hidden;">${fig.inline}</div>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">${caption} <a href="/blog/t3-kitshn/${fig.num}-${lang}.svg" style="white-space:nowrap;">${FULL[lang]} ↗</a></figcaption>
</figure>
<!-- /t3k-fig:${fig.num} -->`;
}

function injectArticle(lang, figs) {
  const file = resolve(ROOT, `src/pages/blog/${lang === "en" ? "t3-kitshn-en" : "t3-kitshn"}.md`);
  let md = readFileSync(file, "utf8");
  for (const fig of figs) {
    const marked = new RegExp(`<!-- t3k-fig:${fig.num} -->[\\s\\S]*?<!-- /t3k-fig:${fig.num} -->`);
    const legacy = new RegExp(`<figure>\\s*<a href="/blog/t3-kitshn/${fig.num}-${lang}\\.svg"[\\s\\S]*?</figure>`);
    const re = marked.test(md) ? marked : legacy;
    const m = md.match(re);
    if (!m) throw new Error(`figure ${fig.num} not found in ${file}`);
    const cap = m[0].match(/<figcaption[^>]*>([\s\S]*?)(?: <a href="\/blog\/t3-kitshn\/[^"]+" style="white-space:nowrap;">[^<]*<\/a>)?<\/figcaption>/)[1];
    md = md.replace(re, () => figureHtml(lang, fig, cap));
  }
  writeFileSync(file, md);
}

function guide(lang, figs) {
  const he = lang === "he";
  const tabs = figs.map((g, i) => `<button role="tab" id="tab-${g.num}" aria-controls="p-${g.num}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${i + 1}. ${esc(g.title)}</button>`).join("");
  const panels = figs.map((g, i) => `<section role="tabpanel" id="p-${g.num}" aria-labelledby="tab-${g.num}"${i ? " hidden" : ""}>${g.inline.replace(/<svg /, `<svg width="${g.W}" height="${g.H}" `)}</section>`).join("");
  const css = `@font-face{font-family:"Excalifont";src:url("excalifont.woff2") format("woff2")}
:root{color-scheme:dark}body{margin:0;background:#171a19;color:#e0d0c1;font-family:"Nunito","Fredoka",system-ui,sans-serif}
main{max-width:820px;margin:0 auto;padding:28px 16px 48px}h1{font-family:"Excalifont","Playpen Sans Hebrew",cursive;font-weight:500;font-size:30px;margin:0 0 6px}
p{color:#b9bbbe;margin:0 0 20px;line-height:1.6}a{color:#bf95f9}
nav{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
button{font:inherit;font-size:14px;border:1px solid rgba(224,208,193,.18);border-radius:999px;padding:7px 14px;background:#222524;color:#e0d0c1;cursor:pointer}
button[aria-selected=true]{border-color:#bf95f9;background:#bf95f9;color:#1d201f}button:focus-visible{outline:2px solid #bf95f9;outline-offset:3px}
section svg{width:100%;height:auto;border-radius:18px;border:1px solid rgba(224,208,193,.13)}[hidden]{display:none!important}`;
  const js = `const t=[...document.querySelectorAll('[role=tab]')];function sel(b){t.forEach(x=>{const on=x===b;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on});b.focus()}
t.forEach((b,i)=>{b.onclick=()=>sel(b);b.onkeydown=e=>{const d={ArrowRight:${he ? -1 : 1},ArrowLeft:${he ? 1 : -1},Home:-i,End:t.length-1-i}[e.key];if(d!==undefined){e.preventDefault();sel(t[(i+d+t.length)%t.length])}}})`;
  const html = `<!doctype html><html lang="${lang}" dir="${he ? "rtl" : "ltr"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>${he ? "T3 Code ו־Kitshn: התרשימים" : "T3 Code and Kitshn: the diagrams"}</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&family=Nunito:wght@400;600&family=Playpen+Sans+Hebrew:wght@400;500&display=swap"><style>${css}</style></head><body><main><h1>${he ? "שבעת התרשימים" : "The seven diagrams"}</h1><p><a href="/blog/${he ? "t3-kitshn" : "t3-kitshn-en"}">${he ? "חזרה למאמר" : "Back to the article"}</a></p><nav role="tablist" aria-label="${he ? "תרשימים" : "Diagrams"}">${tabs}</nav>${panels}</main><script>${js}</script></body></html>`;
  writeFileSync(resolve(PUBLIC, `guide-${lang}.html`), html);
}

const built = build();
for (const lang of ["en", "he"]) {
  injectArticle(lang, built[lang]);
  guide(lang, built[lang]);
}
writeFileSync(resolve(PUBLIC, "excalifont.woff2"), readFileSync(resolve(ROOT, "src/assets/fonts/Excalifont-Regular.woff2")));
console.log("Wrote 14 SVGs, 2 guide pages, and updated both articles.");
