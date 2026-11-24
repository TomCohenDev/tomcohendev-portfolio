// Time helpers for the recorded clips. A clip never runs on its own clock: generate.mjs calls
// window.seek(t) for every frame, and the clip draws the exact state for that moment.
export const params = new URLSearchParams(location.search);
export const lang = params.get("lang") === "he" ? "he" : "en";
export const he = lang === "he";
document.documentElement.lang = lang;

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const prog = (t, a, b) => clamp((t - a) / (b - a));
export const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const easeOut = (x) => 1 - Math.pow(1 - x, 3);
export const lerp = (a, b, x) => a + (b - a) * x;
export const $ = (s) => document.querySelector(s);
export const tr = (o) => o[lang];

/** The part of `text` typed by time t, starting at t0, at `cps` characters a second. */
export function typed(text, t, t0, cps = 30) {
  return text.slice(0, Math.max(0, Math.floor((t - t0) * cps)));
}

/** Caret that blinks twice a second, on while typing. */
export const caretOn = (t, typing) => typing || Math.floor(t * 2) % 2 === 0;

const CURSOR_SVG = `<svg viewBox="0 0 22 28" width="22" height="28"><path d="M2 2 L2 22 L7.5 17 L11 25.5 L14.5 24 L11 15.8 L18.5 15.8 Z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>`;

/**
 * A cursor that follows key points [t, x, y, click?]. It eases between points and draws a ripple
 * for 0.45 s after each click.
 */
export function makeCursor(keys) {
  const c = document.createElement("div");
  c.id = "cursor";
  c.innerHTML = CURSOR_SVG;
  const r = document.createElement("div");
  r.id = "ripple";
  document.body.append(r, c);
  return (t) => {
    let x = keys[0][1], y = keys[0][2];
    for (let i = 1; i < keys.length; i++) {
      const [t0, x0, y0] = keys[i - 1];
      const [t1, x1, y1] = keys[i];
      if (t >= t1) { x = x1; y = y1; continue; }
      if (t > t0) { const k = ease(prog(t, t0, t1)); x = lerp(x0, x1, k); y = lerp(y0, y1, k); }
      break;
    }
    c.style.transform = `translate(${x - 2}px, ${y - 2}px)`;
    const click = keys.filter((k) => k[3] && t >= k[0] && t < k[0] + 0.45).pop();
    if (click) {
      const k = prog(t, click[0], click[0] + 0.45);
      r.style.opacity = String(0.8 * (1 - k));
      r.style.transform = `translate(${click[1]}px, ${click[2]}px) scale(${0.4 + 0.9 * k})`;
    } else r.style.opacity = "0";
    c.style.opacity = t >= keys[0][0] ? "1" : "0";
    return { x, y };
  };
}

/** Register the clip. generate.mjs waits for window.clipReady, then drives window.seek(t). */
export function clip({ duration, poster, seek }) {
  window.clipDuration = duration;
  window.clipPoster = poster ?? duration * 0.7;
  window.seek = (t) => seek(t);
  window.clipReady = document.fonts.ready.then(() => { seek(0); return true; });
}

/**
 * A Claude Code session in a .term element: a prompt typed into the box at the bottom, then steps.
 * steps: ["say", text] | ["note", text] | ["tool", name, arg, result?]. Returns { seek(t), end } where
 * `end` is the time the last step finished.
 */
export function session(term, { prompt, steps, t0 = 0.4, cps = 34, gap = 0.5 }) {
  term.insertAdjacentHTML("beforeend",
    `<div class="lines"></div><div class="prompt-box s-prompt"><span class="acc">&gt; </span><span class="s-typed"></span><span class="caret s-caret"></span></div>`);
  const lines = term.querySelector(".lines");
  const box = term.querySelector(".s-prompt");
  Object.assign(box.style, { position: "absolute", left: "20px", right: "20px", bottom: "18px" });
  const echo = document.createElement("div");
  echo.className = "row dim";
  echo.style.marginBottom = "8px";
  echo.textContent = "> " + prompt;
  lines.append(echo);
  const els = steps.map((s) => {
    const r = document.createElement("div");
    r.className = "row";
    r.style.marginBottom = "6px";
    if (s[0] === "say") r.innerHTML = `<span style="display:inline-block;width:18px">●</span>${s[1]}`;
    if (s[0] === "note") r.innerHTML = `<span class="acc" style="display:inline-block;width:18px">●</span><span class="acc">${s[1]}</span>`;
    if (s[0] === "tool") r.innerHTML = `<span class="b" style="display:inline-block;width:18px"></span><b style="font-weight:600">${s[1]}</b> <span class="dim">${s[2]}</span>${s[3] ? ` <span class="ok">${s[3]}</span>` : ""}`;
    lines.append(r);
    return r;
  });
  const tEnter = t0 + prompt.length / cps + 0.35;
  const tStep = (i) => tEnter + 0.45 + i * gap;
  return {
    end: tStep(steps.length - 1) + 0.35,
    seek(t) {
      const typing = t >= t0 && t < tEnter;
      term.querySelector(".s-typed").textContent = t < tEnter ? typed(prompt, t, t0, cps) : "";
      term.querySelector(".s-caret").style.opacity = caretOn(t, typing) ? 1 : 0;
      echo.style.display = t >= tEnter ? "block" : "none";
      els.forEach((r, i) => {
        const a = tStep(i);
        r.style.display = t >= a ? "block" : "none";
        r.style.opacity = String(clamp((t - a) / 0.15));
        const b = r.querySelector(".b");
        if (b) {
          const done = t >= a + 0.35;
          b.textContent = done ? "●" : ["◐", "◓", "◑", "◒"][Math.floor(t * 12) % 4];
          b.className = "b " + (done ? "ok" : "dim");
        }
      });
    },
  };
}
