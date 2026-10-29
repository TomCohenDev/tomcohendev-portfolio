import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Clapperboard,
  CreditCard,
  FileText,
  Megaphone,
  MessageCircle,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";
import { track } from "@/lib/analytics";
import { useInView } from "@/lib/useInView";
import { usePrefersReducedMotion } from "./useReducedMotion";

/**
 * Hero showcase: "your business" in the middle, inside a hand-drawn chalk circle, with curved
 * connectors out to kinds of automation (n8n canvas style). Every example link points to a real item
 * further down the page (client project, own tool or product, or a tool in development).
 */
const NODES = [
  {
    id: "leads",
    short: "לידים",
    label: "לידים ופניות",
    Icon: Users,
    text: "פנייה מהאתר, מהרשתות או מוואטסאפ נכנסת למקום אחד, מתויגת ומגיעה למי שצריך לחזור ללקוח.",
    example: { href: "#contact", label: "הטופס בעמוד הזה" },
  },
  {
    id: "whatsapp",
    short: "וואטסאפ",
    label: "וואטסאפ",
    Icon: MessageCircle,
    ai: true,
    text: "עדכונים, תזכורות ותשובות לשאלות נשלחים בוואטסאפ, בלי להקליד אותם בכל פעם מחדש.",
    example: { href: "#work", label: "Gomlin" },
  },
  {
    id: "orders",
    short: "הזמנות",
    label: "הזמנות",
    Icon: ShoppingBag,
    text: "הזמנה מהאתר מקבלת מספר, נרשמת בגיליון ומגיעה לצוות כהודעה מסודרת.",
    example: { href: "#work", label: "Nightwing" },
  },
  {
    id: "payments",
    short: "תשלומים",
    label: "תשלומים ומנויים",
    Icon: CreditCard,
    text: "תשלום, חידוש או ביטול מתעדכנים במערכת לבד, כך שהגישה תמיד תואמת למה ששולם.",
    example: { href: "#work", label: "סנכרון תשלומים ומנויים" },
  },
  {
    id: "reports",
    short: "דוחות",
    label: "דוחות",
    Icon: BarChart3,
    text: "נתונים מכמה מקורות מתרכזים לדוח קצר שמגיע אליכם בזמן קבוע.",
    example: { href: "#work", label: "Gomlin" },
  },
  {
    id: "docs",
    short: "מסמכים",
    label: "מסמכים וטיוטות",
    Icon: FileText,
    ai: true,
    text: "הצעת מחיר, סיכום או מאמר נוצרים כטיוטה, ומחכים לאישור שלכם לפני שהם יוצאים.",
    example: { href: "#work", label: "מהודעה לטיוטת מאמר" },
  },
  {
    id: "social",
    short: "תוכן לרשתות",
    label: "תוכן לרשתות",
    Icon: Megaphone,
    ai: true,
    text: "טיוטות לפוסטים מוכנות מראש, ושום דבר לא עולה בלי אישור.",
    example: { href: "#work", label: "סוכן התוכן" },
  },
  {
    id: "ads",
    short: "קמפיינים",
    label: "קמפיינים ומודעות",
    Icon: Clapperboard,
    ai: true,
    text: "טיוטות למודעות, תמונות וסרטונים בכמה מידות ושפות, מוכנות לבדיקה ולאישור.",
    example: { href: "#work", label: "Helix", tag: "בפיתוח" },
  },
] as const;

// Geometry in a 100x100 square. Nodes sit on a circle around the centre, starting at the top.
const R = 38; // node circle radius
const CORE = 15; // chalk circle radius

// Stop the arrow just before the node. Nodes above the centre have their label between the icon
// and the centre, so their arrows stop earlier.
const gapFor = (a: number) => 6 + Math.max(0, -Math.sin(a)) * 5;

const f = (n: number) => n.toFixed(2);

const layout = NODES.map((node, i) => {
  const a = ((-90 + i * (360 / NODES.length)) * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  const sx = 50 + (CORE + 2.5) * cos;
  const sy = 50 + (CORE + 2.5) * sin;
  const ex = 50 + (R - gapFor(a)) * cos;
  const ey = 50 + (R - gapFor(a)) * sin;
  // Slight bend, like n8n's curved connectors.
  const cx = (sx + ex) / 2 - sin * 4;
  const cy = (sy + ey) / 2 + cos * 4;
  return { ...node, x: 50 + R * cos, y: 50 + R * sin, path: `M${f(sx)},${f(sy)} Q${f(cx)},${f(cy)} ${f(ex)},${f(ey)}` };
});

/** One and a half hand-drawn turns, spiralling slightly outwards, like a chalk circle. */
const CHALK_CIRCLE = (() => {
  const steps = 60;
  const points: string[] = [];
  for (let i = 0; i <= steps * 1.7; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = CORE + (i / (steps * 1.5)) * 1.4;
    const x = 50 + Math.cos(t) * r + Math.sin(t * 4 + 1.3) * 0.35;
    const y = 50 + Math.sin(t) * r + Math.cos(t * 5 + 0.7) * 0.35;
    points.push(`${f(x)},${f(y)}`);
  }
  return `M${points.join(" L")}`;
})();

export const AutomationHub = () => {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const reduced = usePrefersReducedMotion();
  const uid = useId().replace(/:/g, "");
  // Scrolled away, nothing here moves (the cycle, the dot and the flowing dashes), so a phone spends nothing on it.
  const figure = useRef<HTMLElement>(null);
  const onScreen = useInView(figure);

  // The chalk circle is visible by default. Its draw-in animation only starts once the browser
  // actually renders a frame, so renderers that never paint frames still show it.
  const [draw, setDraw] = useState(false);
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => setDraw(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Cycle through the connections until the visitor picks one.
  useEffect(() => {
    if (touched || reduced || !onScreen) return;
    const timer = setInterval(() => setActive((a) => (a + 1) % NODES.length), 2800);
    return () => clearInterval(timer);
  }, [touched, reduced, onScreen]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
    track("automation_hub_select", { node: NODES[i].id });
  };

  const current = layout[active];

  return (
    <figure ref={figure} id="build" className={`relative mx-auto w-full max-w-[640px] ${onScreen ? "" : "is-offscreen"}`}>
      {/* Its own compositor layer: the dot and the dashes repaint every frame, and that must not repaint the page. */}
      <div className="relative aspect-square" style={{ willChange: "transform" }}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="context-stroke" />
            </marker>
            <linearGradient id={`${uid}-chalk`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="#a87ef5" />
              <stop offset="100%" stopColor="#e0cdfd" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(224,208,193,0.06)" strokeWidth="0.4" strokeDasharray="0.6 1.6" />
          <path
            d={CHALK_CIRCLE}
            pathLength={1}
            fill="none"
            stroke={`url(#${uid}-chalk)`}
            strokeWidth="0.55"
            strokeLinecap="round"
            opacity="0.85"
            className={draw ? "a-chalk-draw" : ""}
          />
          {layout.map((n, i) => (
            <path
              key={n.id}
              d={n.path}
              fill="none"
              markerEnd={`url(#${uid}-arrow)`}
              className={i === active ? "a-flow" : ""}
              stroke={i === active ? "var(--a-accent)" : "rgba(224,208,193,0.25)"}
              strokeWidth={i === active ? 0.75 : 0.45}
              strokeDasharray={i === active ? "1.8 1.5" : undefined}
              strokeLinecap="round"
            />
          ))}
          {!reduced && onScreen && (
            <circle key={current.id} r="1.3" fill="var(--a-human)">
              <animateMotion dur="1.4s" repeatCount="indefinite" path={current.path} />
            </circle>
          )}
        </svg>

        {/* Centre, inside the chalk circle */}
        <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--a-accent)] text-[#1D201F] sm:h-14 sm:w-14 sm:rounded-2xl">
            <Store className="h-5 w-5 sm:h-7 sm:w-7" aria-hidden="true" />
          </span>
          <span className="mt-1.5 text-[14px] font-medium leading-tight text-[var(--a-ink)] sm:mt-2 sm:text-xl">העסק שלך</span>
        </div>

        {/* Nodes */}
        <ul aria-label="סוגי אוטומציות">
          {layout.map((n, i) => {
            const on = i === active;
            return (
              <li
                key={n.id}
                className="absolute w-[24%] -translate-x-1/2 -translate-y-[1.25rem] sm:-translate-y-6 lg:-translate-y-7"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <button
                  type="button"
                  aria-pressed={on}
                  aria-controls="hub-detail"
                  onClick={() => pick(i)}
                  onMouseEnter={() => (touched ? setActive(i) : undefined)}
                  className="group flex w-full flex-col items-center gap-1.5 rounded-xl text-center"
                >
                  <span
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all sm:h-12 sm:w-12 lg:h-14 lg:w-14 lg:rounded-2xl ${
                      on
                        ? "border-[var(--a-accent)] bg-[var(--a-accent)] text-[#1D201F] shadow-[0_8px_24px_-8px_rgba(191,149,249,0.7)]"
                        : "border-[var(--a-line)] bg-[#222524] text-[var(--a-ink)] group-hover:border-[var(--a-accent)]/60"
                    }`}
                  >
                    <n.Icon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />
                    {"ai" in n && n.ai && (
                      <span className="absolute -left-2 -top-2 rounded border border-[var(--a-accent)]/60 bg-[#1D201F] px-1 text-[9px] font-medium leading-tight text-[var(--a-accent)]">
                        AI
                      </span>
                    )}
                  </span>
                  <span className={`text-[12px] leading-tight sm:text-[13px] lg:text-[15px] ${on ? "text-[var(--a-ink)]" : "text-[var(--a-muted)]"}`}>
                    {n.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Detail for the selected connection. Every entry sits in the same grid cell, so the card always
          takes the height of the longest one and never jumps when the selection changes. */}
      <div id="hub-detail" className="a-card mt-4 grid !p-4">
        {layout.map((n, i) => (
          <div key={n.id} aria-hidden={i !== active} className={`[grid-area:1/1] ${i === active ? "" : "invisible"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <n.Icon className="h-4 w-4 text-[var(--a-accent)]" aria-hidden="true" />
              <span className="font-medium text-[var(--a-ink)]">{n.label}</span>
              {"ai" in n && n.ai && (
                <span className="rounded border border-[var(--a-accent)]/50 px-1.5 text-[11px] text-[var(--a-accent)]">
                  AI, עם אישור אנושי
                </span>
              )}
            </div>
            <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--a-muted)]">{n.text}</p>
            <a href={n.example.href} className="mt-2 inline-flex items-center gap-1.5 text-[14px] text-[var(--a-accent)] hover:underline">
              ראו: <bdi>{n.example.label}</bdi>
              {"tag" in n.example && (
                <span className="rounded-full border border-dashed border-[var(--a-muted)]/60 px-2 text-[11px] text-[var(--a-muted)]">
                  {n.example.tag}
                </span>
              )}
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
      <figcaption className="sr-only">סוגי אוטומציות שאפשר לחבר לעסק. בחרו אחד כדי לראות דוגמה.</figcaption>
    </figure>
  );
};
