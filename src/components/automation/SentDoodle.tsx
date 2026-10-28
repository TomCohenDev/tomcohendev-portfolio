import { useId, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs";

/**
 * Animated "sent" doodle for the form's success state. Lines are drawn with rough.js (the library behind
 * Excalidraw), with fixed seeds so they look the same on every render.
 *
 * The story (timing in automation.css, .a-sent-*):
 *   envelope sketches itself → the airplane flies the dotted loop (the trail draws behind it) → it dives
 *   into the envelope → the flap closes → the envelope "thumps" → the check badge pops up → a gentle float.
 *
 * Without animation (reduced motion, or a renderer that never paints) only the final scene is rendered:
 * a sealed envelope, the trail leading into it and the check badge.
 */

const W = 240;
const H = 200;
const gen = rough.generator();

/** Sketchy stroke for an SVG path, as one path string (rough.js draws each line twice, slightly apart). */
const sketch = (d: string, seed: number, roughness = 1.1) =>
  gen
    .toPaths(gen.path(d, { seed, roughness, bowing: 1.2, strokeWidth: 2.6, stroke: "#000" }))
    .map((p) => p.d)
    .join(" ");

// Envelope (body 70..190 × 100..170)
const BODY = "M72 100L188 100Q190 100 190 102L190 168Q190 170 188 170L72 170Q70 170 70 168L70 102Q70 100 72 100Z";
const OPEN_FLAP = "M70 100L130 58L190 100";
const CLOSED_FLAP = "M70 100L130 140L190 100";
const POCKET = "M70 168L120 128M190 168L140 128";

// Flight path, drawn from the start of the loop to the envelope slot.
const TRAIL = "M12 152C12 114 28 82 52 74C74 66 92 84 80 99C68 113 42 102 46 79C50 54 92 44 114 64C121 71 124 80 127 92";

// Airplane drawn around its own centre, nose pointing along +x (animateMotion rotates it along the path).
const PLANE_WING = "M44 -3L-42 -24L-21 2Z";
const PLANE_KEEL = "M44 -3L-21 2L-7 25Z";
const PLANE_FOLD = "M-21 2L-7 25L10 0Z";

// Check badge above the sealed envelope
const BADGE_CX = 130;
const BADGE_CY = 60;
const CHECK = "M120 60L127 67L141 51";
const BURST = "M130 22V31M101 33L108 40M159 33L152 40";

const strokeOnly = (d: ReturnType<typeof gen.path>) =>
  gen
    .toPaths(d)
    .map((p) => p.d)
    .join(" ");

const paths = {
  body: sketch(BODY, 11),
  openFlap: sketch(OPEN_FLAP, 12),
  closedFlap: sketch(CLOSED_FLAP, 13),
  pocket: sketch(POCKET, 14),
  wing: sketch(PLANE_WING, 21, 0.8),
  keel: sketch(PLANE_KEEL, 22, 0.8),
  badge: strokeOnly(gen.circle(BADGE_CX, BADGE_CY, 42, { seed: 31, roughness: 1, strokeWidth: 2.6, stroke: "#000" })),
  check: sketch(CHECK, 32, 0.6),
  burst: sketch(BURST, 33, 0.8),
};

const ink = { stroke: "var(--a-ink)", strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;
const BG = "#222524"; // card background, used to hide what sits behind the flap and the envelope

export const SentDoodle = ({ className = "" }: { className?: string }) => {
  const uid = useId().replace(/:/g, "");
  const [play, setPlay] = useState(false);
  const motionRef = useRef<SVGAnimateMotionElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frame = requestAnimationFrame(() => setPlay(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useLayoutEffect(() => {
    if (play) motionRef.current?.beginElementAt(0.55);
  }, [play]);

  const cls = (name: string) => (play ? name : undefined);

  return (
    <svg viewBox="2 14 200 166" aria-hidden="true" className={className}>
      <defs>
        {/* Reveals the dotted trail just behind the flying airplane. */}
        <mask id={`${uid}-trail`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <path d={TRAIL} pathLength={1} stroke="white" strokeWidth="10" fill="none" strokeLinecap="round" className={cls("a-sent-trail")} />
        </mask>
        {/* The airplane is only visible above the envelope's slot, so it disappears when it dives in. */}
        <clipPath id={`${uid}-slot`}>
          <rect x="0" y="0" width={W} height="101" />
        </clipPath>
      </defs>

      <g className={cls("a-sent-float")}>
        {/* Envelope; the whole group "thumps" when the flap closes */}
        <g className={cls("a-sent-thump")}>
          {play && (
            <g className="a-sent-openflap">
              <path d={OPEN_FLAP + "Z"} fill={BG} stroke="none" />
              <path d={paths.openFlap} {...ink} pathLength={1} className="a-sent-draw" />
            </g>
          )}

          {/* Dotted trail into the slot */}
          <path d={TRAIL} {...ink} strokeDasharray="5 7" mask={play ? `url(#${uid}-trail)` : undefined} />

          {play && (
            <g clipPath={`url(#${uid}-slot)`}>
              <g className="a-sent-dive">
                <g className="a-sent-plane">
                  <path d={PLANE_WING} fill={BG} stroke="none" />
                  <path d={PLANE_KEEL} fill={BG} stroke="none" />
                  <path d={PLANE_FOLD} fill="var(--a-accent)" stroke="none" />
                  <path d={paths.wing} {...ink} />
                  <path d={paths.keel} {...ink} />
                  <animateMotion
                    ref={motionRef}
                    path={TRAIL}
                    dur="1.05s"
                    begin="indefinite"
                    fill="freeze"
                    rotate="auto"
                    calcMode="spline"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    keySplines="0.45 0 0.35 1"
                  />
                </g>
              </g>
            </g>
          )}

          <path d={BODY} fill={BG} stroke="none" />
          <path d={paths.body} {...ink} pathLength={1} className={cls("a-sent-draw")} />
          <path d={paths.pocket} {...ink} pathLength={1} className={cls("a-sent-draw a-sent-draw-late")} />

          <g className={cls("a-sent-closeflap")}>
            <path d={CLOSED_FLAP + "Z"} fill={BG} stroke="none" />
            <path d={paths.closedFlap} {...ink} />
            <circle cx="130" cy="128" r="5" fill="var(--a-accent)" />
          </g>
        </g>

        {/* Check badge */}
        <g className={cls("a-sent-badge")}>
          <circle cx={BADGE_CX} cy={BADGE_CY} r="21" fill={BG} stroke="none" />
          <path d={paths.badge} {...ink} />
          <path d={paths.check} {...ink} stroke="var(--a-accent)" strokeWidth="3.4" pathLength={1} className={cls("a-sent-check")} />
        </g>
        <path d={paths.burst} {...ink} className={cls("a-sent-burst")} />
      </g>
    </svg>
  );
};
