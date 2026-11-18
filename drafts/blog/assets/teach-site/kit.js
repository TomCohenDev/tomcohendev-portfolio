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
