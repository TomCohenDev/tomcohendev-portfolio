// Draws the covers for the Agent Builder shutdown article as SVG and converts them with sharp.
//   FONTCONFIG_FILE=/path/fonts.conf node drafts/blog/assets/agent-builder-shutdown/generate.mjs
// fonts.conf must point at a folder with Fredoka (variable, Google Fonts) and Nunito
// (src/assets/fonts). sharp resolves from RENDER_DEPS, or from this repo's node_modules.
// Output: public/blog/agent-builder-shutdown-cover.webp (he) and -cover-en.webp, 1600x840.
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const repo = resolve(here, "../../../..");
const sharp = createRequire(join(process.env.RENDER_DEPS ?? repo, "noop.js"))("sharp");

const W = 1600, H = 840;
const C = { bg: "#1d201f", card: "#232726", line: "#3a403e", ink: "#e0d0c1", muted: "#b9bbbe", acc: "#bf95f9", bad: "#f28b82", ok: "#43b581" };
const TEXT = {
  he: { t1: "Agent Builder", t2: "נסגר", s1: "למה הכלי של OpenAI לא החזיק,", s2: "ומה עושים עכשיו", chips: ["30.11.2026", "OpenAI"] },
  en: { t1: "Agent Builder", t2: "shuts down", s1: "Why OpenAI's canvas didn't last,", s2: "and what to do now", chips: ["Nov 30, 2026", "OpenAI"] },
};

// The canvas card: a faded workflow graph, a "closing" badge, and the one way out: export to code.
function card(x, y) {
  const w = 700, h = 600;
  const node = (nx, ny, label, accent) => `
    <g transform="translate(${x + nx},${y + ny})" opacity=".5">
      <rect width="190" height="64" rx="14" fill="#2b302e" stroke="${accent ?? C.line}" stroke-width="2"/>
      <circle cx="30" cy="32" r="9" fill="none" stroke="${accent ?? C.muted}" stroke-width="3"/>
      <text x="52" y="41" font-family="Nunito" font-weight="700" font-size="24" fill="${C.ink}">${label}</text>
    </g>`;
  const edge = (d) => `<path d="${d}" fill="none" stroke="${C.muted}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round" opacity=".55"/>`;
  let dots = "";
  for (let gx = 30; gx < w; gx += 34) for (let gy = 100; gy < h - 110; gy += 34) dots += `<circle cx="${x + gx}" cy="${y + gy}" r="1.6" fill="#3a403e"/>`;
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="${C.card}" stroke="${C.acc}" stroke-opacity=".55" stroke-width="3"/>
  <path d="M${x} ${y + 76} H${x + w}" stroke="${C.line}" stroke-width="2"/>
  <circle cx="${x + 36}" cy="${y + 38}" r="8" fill="#3a403e"/><circle cx="${x + 62}" cy="${y + 38}" r="8" fill="#3a403e"/><circle cx="${x + 88}" cy="${y + 38}" r="8" fill="#3a403e"/>
  <text x="${x + 118}" y="${y + 47}" font-family="Nunito" font-weight="700" font-size="26" fill="${C.ink}">Agent Builder</text>
  <g transform="translate(${x + w - 172},${y + 20})"><rect width="148" height="38" rx="19" fill="${C.bad}" fill-opacity=".16" stroke="${C.bad}" stroke-width="2"/>
    <text x="74" y="26" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="20" fill="${C.bad}">CLOSING</text></g>
  ${dots}
  ${edge(`M${x + 145} ${y + 196} V${y + 238}`)}
  ${edge(`M${x + 145} ${y + 302} V${y + 344}`)}
  ${edge(`M${x + 240} ${y + 376} C${x + 330} ${y + 376} ${x + 330} ${y + 270} ${x + 420} ${y + 270}`)}
  ${edge(`M${x + 240} ${y + 376} C${x + 330} ${y + 376} ${x + 330} ${y + 452} ${x + 420} ${y + 452}`)}
  ${node(50, 132, "Start")}
  ${node(50, 238, "Agent", C.acc)}
  ${node(50, 344, "If / else")}
  ${node(420, 238, "Agent", C.acc)}
  ${node(420, 420, "End")}
  <g transform="translate(${x + 40},${y + 506})">
    <rect width="${w - 80}" height="62" rx="16" fill="${C.acc}" fill-opacity=".13" stroke="${C.acc}" stroke-width="2.5"/>
    <text x="28" y="41" font-family="Nunito" font-weight="800" font-size="27" fill="${C.acc}">{ }</text>
    <text x="84" y="41" font-family="Nunito" font-weight="700" font-size="25" fill="${C.ink}">Export</text>
    <path d="M184 31 H226 M214 20 L227 31 L214 42" fill="none" stroke="${C.acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="244" y="41" font-family="Nunito" font-weight="700" font-size="25" fill="${C.ink}">Agents SDK code</text>
  </g>`;
}

function chip(x, y, label, anchorRight) {
  const w = 30 + label.length * 15.5;
  const left = anchorRight ? x - w : x;
  return { w, svg: `<g transform="translate(${left},${y})"><rect width="${w}" height="58" rx="14" fill="#2b302e" stroke="#3a403e" stroke-width="2"/>
    <text x="${w / 2}" y="38" text-anchor="middle" font-family="Nunito" font-weight="700" font-size="25" fill="${C.ink}">${label}</text></g>` };
}

function svg(lang) {
  const t = TEXT[lang];
  const rtl = lang === "he";
  // the reading start leads: in Hebrew the text sits on the right, the card on the left
  const cardX = rtl ? 90 : W - 90 - 700;
  const tx = rtl ? W - 110 : 110;
  const anchor = rtl ? "end" : "start";
  let chips = "", cx = tx;
  for (const label of t.chips) {
    const c = chip(cx, 600, label, rtl);
    chips += c.svg;
    cx += rtl ? -(c.w + 16) : c.w + 16;
  }
  const t2Size = rtl ? 150 : 104;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <radialGradient id="glow" cx="${rtl ? 0.25 : 0.75}" cy="0.5" r="0.5"><stop offset="0" stop-color="${C.acc}" stop-opacity=".10"/><stop offset="1" stop-color="${C.acc}" stop-opacity="0"/></radialGradient>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${card(cardX, 120)}
  <text x="${tx}" y="252" text-anchor="${anchor}" font-family="Fredoka" font-weight="600" font-size="96" fill="${C.ink}">${t.t1}</text>
  <text x="${tx}" y="${rtl ? 400 : 370}" ${rtl ? 'text-anchor="start" direction="rtl"' : `text-anchor="${anchor}"`} font-family="Fredoka" font-weight="700" font-size="${t2Size}" fill="${C.acc}">${t.t2}</text>
  <text x="${tx}" y="482" ${rtl ? 'text-anchor="start" direction="rtl"' : `text-anchor="${anchor}"`} font-family="Fredoka" font-weight="500" font-size="40" fill="${C.ink}">${t.s1}</text>
  <text x="${tx}" y="536" ${rtl ? 'text-anchor="start" direction="rtl"' : `text-anchor="${anchor}"`} font-family="Fredoka" font-weight="500" font-size="40" fill="${C.ink}">${t.s2}</text>
  ${chips}
</svg>`;
}

for (const lang of ["he", "en"]) {
  const file = join(repo, "public/blog", `agent-builder-shutdown-cover${lang === "he" ? "" : "-en"}.webp`);
  await sharp(Buffer.from(svg(lang))).webp({ quality: 84 }).toFile(file);
  console.log(`cover-${lang}: ${file}`);
}
