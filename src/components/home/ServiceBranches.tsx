import { ArrowLeft, Smartphone, Workflow } from "lucide-react";
import SmallCircularChalk from "@/components/SmallCircularChalk";
import { track } from "@/lib/analytics";
import { SketchCircle } from "../automation/Doodles";
import { branches } from "./content";

/**
 * The services map, in Hebrew, after the English ServiceMap.tsx: Tom in the centre and a chalk line to each
 * of the two services. Each service has its own small orbit of what it includes, turning slowly
 * (paused on hover, on focus and for reduced motion, in home.css). Below lg it becomes a stacked list.
 */

const ICONS = { mobile: Smartphone, automation: Workflow } as const;

// Stage coordinates (1000 × 440). Right to left: apps on the right, automation on the left.
const W = 1000;
const H = 440;
const CENTER = { x: 500, y: 220 };
const NODES = { mobile: { x: 815, y: 220 }, automation: { x: 185, y: 220 } } as const;
const ORBIT = 165;

/** A hand-drawn line: a slight curve with a small, repeatable wobble. */
const chalkPath = (a: { x: number; y: number }, b: { x: number; y: number }, bend = 18) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - bend;
  const pts: string[] = [];
  for (let i = 0; i <= 32; i++) {
    const t = i / 32;
    const x = (1 - t) ** 2 * a.x + 2 * (1 - t) * t * mx + t ** 2 * b.x;
    const y = (1 - t) ** 2 * a.y + 2 * (1 - t) * t * my + t ** 2 * b.y + Math.sin(t * Math.PI * 3 + a.x) * 1.2;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
};

const ChalkGradient = ({ id }: { id: string }) => (
  <defs>
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2={H}>
      <stop offset="0%" stopColor="#a855f7" />
      <stop offset="100%" stopColor="#d8b4fe" />
    </linearGradient>
  </defs>
);

/**
 * `className` sets the position (relative or absolute) and size. SmallCircularChalk refers to a gradient by a
 * fixed id, which breaks while the map is hidden, so the stacked version (`sketch`) draws its own circle.
 */
const TomBadge = ({ className = "", sketch = false }: { className?: string; sketch?: boolean }) => (
  <div className={`grid place-items-center ${className}`}>
    {sketch ? <SketchCircle seed={0.7} className="absolute inset-0 h-full w-full text-[var(--a-accent)]" /> : <SmallCircularChalk />}
    <img src="/logo-no-bg.png" alt="" className="relative h-[52%] w-[52%] object-contain" />
    <span className="sr-only">תום כהן</span>
  </div>
);

/** `withLeaves`: on the map the leaves are decorative, so the link itself says what the service includes. */
const BranchLink = ({
  branch,
  className = "",
  withLeaves = false,
}: {
  branch: (typeof branches)[number];
  className?: string;
  withLeaves?: boolean;
}) => {
  const Icon = ICONS[branch.id];
  return (
    <a
      href={branch.href}
      onClick={() => track("home_cta_click", { location: "services_map", target: branch.id })}
      className={`group block rounded-2xl border-2 border-[rgba(191,149,249,0.55)] bg-[#222524] p-4 text-center shadow-lg shadow-[rgba(191,149,249,0.08)] transition-[border-color,transform] duration-200 hover:-rotate-1 hover:border-[var(--a-accent)] ${className}`}
    >
      <Icon className="mx-auto h-7 w-7 text-[var(--a-accent)]" aria-hidden="true" />
      <span className="mt-2 block text-lg font-medium leading-tight text-[var(--a-ink)]">{branch.title}</span>
      <span className="mt-1.5 block text-[14px] leading-snug text-[var(--a-muted)]">{branch.line}</span>
      {withLeaves && <span className="sr-only">כולל: {branch.leaves.join(", ")}.</span>}
      <span className="mt-3 inline-flex items-center gap-1 text-[14px] text-[var(--a-accent)]">
        לפרטים
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
      </span>
    </a>
  );
};

/** One service with its leaves turning around it. Everything is placed in % of the W × H stage. */
const Orbit = ({ branch, reverse }: { branch: (typeof branches)[number]; reverse: boolean }) => {
  const node = NODES[branch.id];
  const spin = reverse ? "animate-orbit-cw" : "animate-orbit-ccw";
  const counter = reverse ? "animate-orbit-ccw" : "animate-orbit-cw";
  const leaves = branch.leaves.map((label, i) => {
    const angle = ((i * 90 + 45) * Math.PI) / 180;
    return { label, x: 50 + 50 * Math.cos(angle), y: 50 + 50 * Math.sin(angle) };
  });
  return (
    <>
      <div
        aria-hidden="true"
        className={`home-orbit absolute aspect-square ${spin}`}
        style={{
          left: `${((node.x - ORBIT) / W) * 100}%`,
          top: `${((node.y - ORBIT) / H) * 100}%`,
          width: `${((ORBIT * 2) / W) * 100}%`,
        }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <circle cx="50" cy="50" r="50" fill="none" stroke="rgba(224,208,193,0.12)" strokeWidth="0.5" strokeDasharray="1.5 2.5" />
          {leaves.map((leaf) => (
            <line
              key={leaf.label}
              x1={50 + (leaf.x - 50) * 0.42}
              y1={50 + (leaf.y - 50) * 0.42}
              x2={50 + (leaf.x - 50) * 0.84}
              y2={50 + (leaf.y - 50) * 0.84}
              stroke="rgba(191,149,249,0.5)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="2 2"
            />
          ))}
        </svg>
        {leaves.map((leaf) => (
          <div key={leaf.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${leaf.x}%`, top: `${leaf.y}%` }}>
            <span
              className={`home-orbit block whitespace-nowrap rounded-full border border-[var(--a-line)] bg-[#1d201f] px-3 py-1 text-[14px] text-[var(--a-ink)] ${counter}`}
            >
              {leaf.label}
            </span>
          </div>
        ))}
      </div>
      <div
        className="absolute z-10 w-[19%] -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${(node.x / W) * 100}%`, top: `${(node.y / H) * 100}%` }}
      >
        <BranchLink branch={branch} withLeaves />
      </div>
    </>
  );
};

export const ServiceBranches = () => (
  <section id="services" aria-labelledby="services-title" className="relative overflow-hidden py-20 md:py-24">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="a-kicker">השירותים שלי</p>
        <h2 id="services-title" className="a-h2">
          שני תחומים, את כל הדרך
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-[var(--a-muted)]">
          בשניהם אני איתכם מההתחלה ועד הסוף: מבינים יחד מה צריך, בונים, בודקים ומעלים לאוויר, ואתם רואים התקדמות לאורך כל הדרך.
        </p>
      </div>

      {/* lg and up: the map. The list inside is the same two links, so screen readers get them once. */}
      <div className="home-map relative mx-auto mt-16 hidden aspect-[1000/440] w-full max-w-[1100px] lg:block">
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="absolute inset-0 h-full w-full">
          <ChalkGradient id="home-chalk" />
          {branches.map((b, i) => {
            const node = NODES[b.id];
            const dir = Math.sign(node.x - CENTER.x);
            return (
              <path
                key={b.id}
                d={chalkPath({ x: CENTER.x + dir * 104, y: CENTER.y }, { x: node.x - dir * 102, y: node.y }, i ? -14 : 14)}
                pathLength={1}
                fill="none"
                stroke="url(#home-chalk)"
                strokeWidth="3"
                strokeLinecap="round"
                className="a-chalk-draw"
                style={{ animationDelay: `${0.3 + i * 0.2}s` }}
              />
            );
          })}
        </svg>
        <TomBadge className="absolute left-1/2 top-1/2 aspect-square w-[16%] -translate-x-1/2 -translate-y-1/2" />
        {branches.map((b, i) => (
          <Orbit key={b.id} branch={b} reverse={i === 1} />
        ))}
      </div>

      {/* Below lg: Tom, then the two services one under the other, each with what it includes. */}
      <div className="mt-10 lg:hidden">
        <TomBadge sketch className="relative mx-auto h-28 w-28" />
        <svg viewBox="0 0 20 60" aria-hidden="true" className="mx-auto h-12 w-5">
          <path d="M10 2 C6 20 14 40 10 58" fill="none" stroke="#bf95f9" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
        </svg>
        <div className="grid gap-6 sm:grid-cols-2">
          {branches.map((b) => (
            <div key={b.id}>
              <BranchLink branch={b} className="p-5" />
              <ul className="mt-3 flex flex-wrap justify-center gap-2" aria-label={`מה כולל: ${b.title}`}>
                {b.leaves.map((leaf) => (
                  <li key={leaf} className="rounded-full border border-[var(--a-line)] px-3 py-1 text-[14px] text-[var(--a-ink)]">
                    {leaf}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
