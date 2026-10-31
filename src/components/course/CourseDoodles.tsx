import { createContext, useContext, useId, type ReactNode } from "react";
import { box, circle, curve, line, rect } from "@/components/sketch/rough";

/**
 * Explanatory drawings for the course page, in the pen-and-marker look of the home page sketches. Each one shows the
 * idea of its section. Flows run right to left, like the Hebrew text. All are decorative: the text around them says
 * the same thing, so screen readers skip them.
 */

const INK = "#E0D0C1";
const MUTED = "#b9bbbe";
const FONT = '"Excalifont", "Playpen Sans Hebrew", cursive';

const HUES = { purple: "#bf95f9", blue: "#60a5fa", green: "#4ade80", amber: "#f2c46d", red: "#f87171" };
type Hue = keyof typeof HUES;

const Uid = createContext("d");

const Frame = ({ w, h, className = "", children }: { w: number; h: number; className?: string; children: ReactNode }) => {
  const uid = useId().replace(/\W/g, "");
  return (
    <Uid.Provider value={uid}>
      <svg viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true" className={`block ${className}`}>
        <defs>
          {(Object.keys(HUES) as Hue[]).map((hue) => (
            <pattern key={hue} id={`${uid}-${hue}`} width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
              <line x1={0} y1={0} x2={0} y2={6} stroke={HUES[hue]} strokeWidth={1.8} strokeOpacity={0.75} />
            </pattern>
          ))}
        </defs>
        {children}
      </svg>
    </Uid.Provider>
  );
};

const Pen = ({ d, color = INK, w = 2.2, dash }: { d: string; color?: string; w?: number; dash?: string }) => (
  <path d={d} stroke={color} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" strokeLinejoin="round" />
);

const Marker = ({ d, hue }: { d: string; hue: Hue }) => {
  const uid = useContext(Uid);
  return (
    <>
      <path d={d} fill={HUES[hue]} fillOpacity={0.12} />
      <path d={d} fill={`url(#${uid}-${hue})`} />
    </>
  );
};

const Box = ({ x, y, w, h, r = 10, hue, color = INK }: { x: number; y: number; w: number; h: number; r?: number; hue?: Hue; color?: string }) => (
  <>
    {hue && <Marker d={box(x + 2, y + 2, w - 3, h - 3, r)} hue={hue} />}
    <Pen d={rect(x, y, w, h, r, x * 7 + y * 13 + w)} color={color} />
  </>
);

const disc = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;

const Ring = ({ cx, cy, r, hue, color = INK }: { cx: number; cy: number; r: number; hue?: Hue; color?: string }) => (
  <>
    {hue && <Marker d={disc(cx, cy, r - 1)} hue={hue} />}
    <Pen d={circle(cx, cy, r, cx * 11 + cy * 5 + r)} color={color} />
  </>
);

const Ln = ({ x1, y1, x2, y2, color = INK, w }: { x1: number; y1: number; x2: number; y2: number; color?: string; w?: number }) => (
  <Pen d={line(x1, y1, x2, y2, x1 * 3 + y1 * 17 + x2 + y2 * 5, 0.8)} color={color} w={w} />
);

/** An arrowhead at x, y for a line arriving at the given angle. */
const Head = ({ x, y, angle, color = INK }: { x: number; y: number; angle: number; color?: string }) => {
  const wing = (turn: number) => `${x - Math.cos(angle + turn) * 12} ${y - Math.sin(angle + turn) * 12}`;
  return <Pen d={`M${wing(0.5)}L${x} ${y}L${wing(-0.5)}`} color={color} />;
};

const Arrow = ({ x1, y1, x2, y2, color = INK }: { x1: number; y1: number; x2: number; y2: number; color?: string }) => (
  <>
    <Ln x1={x1} y1={y1} x2={x2} y2={y2} color={color} />
    <Head x={x2} y={y2} angle={Math.atan2(y2 - y1, x2 - x1)} color={color} />
  </>
);

const Label = ({ x, y, size = 20, color = INK, children }: { x: number; y: number; size?: number; color?: string; children: ReactNode }) => (
  <text x={x} y={y} textAnchor="middle" fontFamily={FONT} fontSize={size} fontWeight={500} fill={color} stroke="none">
    {children}
  </text>
);

const At = ({ x, y, s = 1, children }: { x: number; y: number; s?: number; children: ReactNode }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>
);

// Small pictures, drawn around 0,0 inside a box of about 44 units.

const FormIcon = () => (
  <>
    <Box x={-17} y={-21} w={34} h={42} r={4} />
    <Ln x1={-9} y1={-10} x2={9} y2={-10} />
    <Ln x1={-9} y1={0} x2={9} y2={0} />
    <Ln x1={-9} y1={10} x2={2} y2={10} />
  </>
);

const MailIcon = () => (
  <>
    <Box x={-22} y={-15} w={44} h={30} r={4} />
    <Pen d="M-21 -13L0 3L21 -13" />
  </>
);

const SheetIcon = () => (
  <>
    <Box x={-21} y={-17} w={42} h={34} r={3} />
    <Ln x1={-21} y1={-5} x2={21} y2={-5} />
    <Ln x1={-21} y1={6} x2={21} y2={6} />
    <Ln x1={-7} y1={-17} x2={-7} y2={17} />
  </>
);

const DbIcon = () => (
  <>
    <Pen d={circle(0, -13, 18, 4, 1, 6)} />
    <Pen d="M-18 -13V13C-18 22 18 22 18 13V-13" />
    <Pen d="M-18 0C-18 9 18 9 18 0" />
  </>
);

const PersonIcon = ({ color = INK }: { color?: string }) => (
  <>
    <Ring cx={0} cy={-11} r={9} color={color} />
    <Pen d="M-18 20C-17 5 -9 2 0 2S17 5 18 20" color={color} />
  </>
);

const CheckMark = ({ color = HUES.green }: { color?: string }) => <Pen d="M-11 1L-3 10L12 -9" color={color} w={3} />;

const Cross = ({ color = HUES.red }: { color?: string }) => (
  <>
    <Ln x1={-9} y1={-9} x2={9} y2={9} color={color} w={3} />
    <Ln x1={9} y1={-9} x2={-9} y2={9} color={color} w={3} />
  </>
);

const Spark = ({ color = HUES.purple }: { color?: string }) => (
  <Pen d="M0 -14C1.5 -4 4 -1.5 14 0C4 1.5 1.5 4 0 14C-1.5 4 -4 1.5 -14 0C-4 -1.5 -1.5 -4 0 -14Z" color={color} />
);

const LaptopIcon = () => (
  <>
    <Box x={-20} y={-17} w={40} h={27} r={4} hue="blue" />
    <Pen d="M-27 16H27L21 10H-21Z" />
  </>
);

const BulbIcon = () => (
  <>
    <Marker d={disc(0, -6, 13)} hue="amber" />
    <Pen d="M-7 13C-8 5 -16 2 -16 -7C-16 -16 -8 -21 0 -21S16 -16 16 -7C16 2 8 5 7 13Z" />
    <Ln x1={-6} y1={19} x2={6} y2={19} />
  </>
);

// The drawings.

/** A lead goes through the whole process without anyone copying it: form, AI, a person's approval, CRM. */
export const FlowDoodle = ({ className = "" }: { className?: string }) => {
  const steps: { x: number; label: string; hue: Hue; icon: ReactNode }[] = [
    { x: 490, label: "טופס", hue: "blue", icon: <FormIcon /> },
    {
      x: 350,
      label: "סיווג",
      hue: "purple",
      icon: (
        <>
          <Label x={-3} y={10} size={30}>
            AI
          </Label>
          <At x={23} y={-20} s={0.6}>
            <Spark color={INK} />
          </At>
        </>
      ),
    },
    {
      x: 210,
      label: "אישור אדם",
      hue: "amber",
      icon: (
        <>
          <At x={-7} y={0} s={0.9}>
            <PersonIcon />
          </At>
          <At x={23} y={-8} s={0.75}>
            <CheckMark />
          </At>
        </>
      ),
    },
    { x: 70, label: "CRM", hue: "green", icon: <DbIcon /> },
  ];
  return (
    <Frame w={560} h={135} className={className}>
      {steps.map((step, i) => (
        <g key={step.label}>
          <Box x={step.x - 46} y={8} w={92} h={80} hue={step.hue} r={12} />
          <At x={step.x} y={48}>
            {step.icon}
          </At>
          <Label x={step.x} y={122}>
            {step.label}
          </Label>
          {i > 0 && <Arrow x1={steps[i - 1].x - 52} y1={48} x2={step.x + 53} y2={48} color={HUES.purple} />}
        </g>
      ))}
    </Frame>
  );
};

/** Everything passes through one tired person, by hand, while the clock runs. */
export const ManualDoodle = ({ className = "" }: { className?: string }) => {
  const systems: { x: number; y: number; label: string; icon: ReactNode }[] = [
    { x: 505, y: 42, label: "טופס", icon: <FormIcon /> },
    { x: 505, y: 158, label: "מייל", icon: <MailIcon /> },
    { x: 55, y: 42, label: "גיליון", icon: <SheetIcon /> },
    { x: 55, y: 158, label: "CRM", icon: <DbIcon /> },
  ];
  return (
    <Frame w={560} h={250} className={className}>
      {systems.map((s) => (
        <g key={s.label}>
          <At x={s.x} y={s.y}>
            {s.icon}
          </At>
          <Label x={s.x} y={s.y + 46} size={19} color={MUTED}>
            {s.label}
          </Label>
        </g>
      ))}
      {/* Tangled copy-paste paths, each with a detour, all ending at the person. */}
      <Pen
        color={HUES.red}
        dash="7 8"
        d={curve([
          { x: 470, y: 45 },
          { x: 400, y: 20 },
          { x: 370, y: 75 },
          { x: 425, y: 95 },
          { x: 330, y: 130 },
        ])}
      />
      <Pen
        color={HUES.red}
        dash="7 8"
        d={curve([
          { x: 470, y: 160 },
          { x: 410, y: 195 },
          { x: 395, y: 135 },
          { x: 330, y: 160 },
        ])}
      />
      <Pen
        color={HUES.red}
        dash="7 8"
        d={curve([
          { x: 230, y: 130 },
          { x: 150, y: 100 },
          { x: 195, y: 50 },
          { x: 150, y: 28 },
          { x: 95, y: 45 },
        ])}
      />
      <Pen
        color={HUES.red}
        dash="7 8"
        d={curve([
          { x: 230, y: 160 },
          { x: 170, y: 130 },
          { x: 150, y: 195 },
          { x: 95, y: 160 },
        ])}
      />
      <At x={280} y={145} s={1.7}>
        <Marker d={disc(0, 4, 21)} hue="amber" />
        <PersonIcon />
      </At>
      {/* Sweat. */}
      <Pen d="M322 96c-6 8-8 12-3 15s8-5 3-15z" color={HUES.blue} />
      <Pen d="M238 106c-4 6-6 9-2 11s6-4 2-11z" color={HUES.blue} />
      {/* The clock. */}
      <Ring cx={280} cy={44} r={30} hue="red" />
      <Pen d="M280 24V44L295 53" w={2.6} />
      <Label x={280} y={236} size={20}>
        הכול עובר דרך הידיים
      </Label>
    </Frame>
  );
};

/** The four steps of the section's headline, on a path. */
export const StepsDoodle = ({ className = "" }: { className?: string }) => {
  const steps: { x: number; y: number; label: string; hue: Hue; icon: ReactNode }[] = [
    {
      x: 480,
      y: 72,
      label: "בוחרים",
      hue: "amber",
      icon: (
        <>
          <Ring cx={0} cy={0} r={18} />
          <Ring cx={0} cy={0} r={8} />
          <Ln x1={20} y1={-20} x2={1} y2={-1} color={HUES.purple} w={3} />
        </>
      ),
    },
    {
      x: 340,
      y: 44,
      label: "ממפים",
      hue: "blue",
      icon: (
        <>
          <Ring cx={16} cy={-12} r={6} />
          <Ring cx={-16} cy={-12} r={6} />
          <Ring cx={0} cy={15} r={6} />
          <Ln x1={10} y1={-12} x2={-10} y2={-12} />
          <Ln x1={-13} y1={-6} x2={-3} y2={10} />
          <Ln x1={13} y1={-6} x2={3} y2={10} />
        </>
      ),
    },
    {
      x: 200,
      y: 72,
      label: "בונים",
      hue: "purple",
      icon: (
        <>
          <Box x={-22} y={2} w={20} h={18} r={3} />
          <Box x={2} y={2} w={20} h={18} r={3} />
          <Box x={-10} y={-20} w={20} h={18} r={3} />
        </>
      ),
    },
    {
      x: 60,
      y: 44,
      label: "בודקים",
      hue: "green",
      icon: <CheckMark />,
    },
  ];
  return (
    <Frame w={560} h={160} className={className}>
      {steps.map((s, i) => {
        const prev = steps[i - 1];
        if (!prev) return null;
        const len = Math.hypot(s.x - prev.x, s.y - prev.y);
        const ux = (s.x - prev.x) / len;
        const uy = (s.y - prev.y) / len;
        return <Arrow key={s.x} x1={prev.x + ux * 44} y1={prev.y + uy * 44} x2={s.x - ux * 45} y2={s.y - uy * 45} color={HUES.purple} />;
      })}
      {steps.map((s) => (
        <g key={s.label}>
          <Ring cx={s.x} cy={s.y} r={38} hue={s.hue} />
          <At x={s.x} y={s.y}>
            {s.icon}
          </At>
          <Label x={s.x} y={s.y + 66}>
            {s.label}
          </Label>
        </g>
      ))}
    </Frame>
  );
};

/** Ten stops from an idea to a demo, with the two milestones marked. */
export const RoadDoodle = ({ className = "" }: { className?: string }) => {
  const stops = Array.from({ length: 10 }, (_, i) => {
    const x = 480 - i * 45;
    return { x, y: 66 + Math.sin(i * 1.15) * 20 };
  });
  return (
    <Frame w={560} h={132} className={className}>
      <Pen color={HUES.purple} w={2.6} d={curve([{ x: 530, y: 62 }, ...stops, { x: 40, y: 62 }])} />
      {stops.map((stop, i) => (
        <Ring key={stop.x} cx={stop.x} cy={stop.y} r={i === 2 || i === 6 ? 11 : 7} hue={i === 2 || i === 6 ? "green" : "purple"} />
      ))}
      <Label x={stops[2].x} y={stops[2].y + 44} size={18}>
        זרימה ראשונה
      </Label>
      <Label x={stops[6].x} y={stops[6].y + 44} size={18}>
        אב־טיפוס
      </Label>
      <At x={534} y={46} s={0.8}>
        <BulbIcon />
      </At>
      <Label x={530} y={98} size={18}>
        רעיון
      </Label>
      <Pen d="M30 72V22" w={2.6} />
      <Marker d="M31 23L6 31L31 42Z" hue="green" />
      <Pen d="M30 23L6 31L30 42" />
      <Label x={30} y={98} size={18}>
        דמו
      </Label>
    </Frame>
  );
};

/** One evening, in order: explain, demonstrate, build together, work on your own project. */
export const SessionDoodle = ({ className = "" }: { className?: string }) => {
  const parts: { x: number; label: string; hue: Hue; icon: ReactNode }[] = [
    {
      x: 420,
      label: "הסבר",
      hue: "blue",
      icon: (
        <>
          <Box x={-22} y={-16} w={44} h={30} r={3} />
          <Ln x1={-12} y1={-5} x2={12} y2={-5} />
          <Ln x1={-12} y1={4} x2={4} y2={4} />
        </>
      ),
    },
    {
      x: 280,
      label: "הדגמה",
      hue: "purple",
      icon: <LaptopIcon />,
    },
    {
      x: 140,
      label: "בנייה מודרכת",
      hue: "amber",
      icon: (
        <>
          <At x={-13} y={0} s={0.8}>
            <PersonIcon />
          </At>
          <At x={13} y={0} s={0.8}>
            <PersonIcon color={HUES.purple} />
          </At>
        </>
      ),
    },
    { x: 0, label: "הפרויקט שלכם", hue: "green", icon: <Spark color={HUES.green} /> },
  ];
  return (
    <Frame w={560} h={132} className={className}>
      {parts.map((p) => (
        <g key={p.label}>
          <Box x={p.x + 3} y={10} w={134} h={78} hue={p.hue} r={p.x === 0 || p.x === 420 ? 14 : 6} />
          <At x={p.x + 70} y={49}>
            {p.icon}
          </At>
          <Label x={p.x + 70} y={120} size={19}>
            {p.label}
          </Label>
        </g>
      ))}
    </Frame>
  );
};

/** What a final project must contain: an input, two actions, one condition, a good path, a failure path, documentation. */
export const ProjectDoodle = ({ className = "" }: { className?: string }) => (
  <Frame w={560} h={230} className={className}>
    <Box x={472} y={78} w={80} h={62} hue="blue" />
    <Label x={512} y={116}>
      קלט
    </Label>
    <Arrow x1={468} y1={109} x2={442} y2={109} />
    <Box x={358} y={78} w={80} h={62} hue="purple" />
    <Label x={398} y={116}>
      פעולה
    </Label>
    <Arrow x1={354} y1={109} x2={328} y2={109} />
    <Box x={244} y={78} w={80} h={62} hue="purple" />
    <Label x={284} y={116}>
      פעולה
    </Label>
    <Arrow x1={240} y1={109} x2={214} y2={109} />
    <Marker d="M168 66L212 109L168 152L124 109Z" hue="amber" />
    <Pen d={`${line(168, 64, 214, 109, 3)}${line(214, 109, 168, 154, 5)}${line(168, 154, 122, 109, 7)}${line(122, 109, 168, 64, 9)}`} />
    <Label x={168} y={116} size={19}>
      תנאי
    </Label>
    <Arrow x1={136} y1={82} x2={94} y2={52} color={HUES.green} />
    <Arrow x1={136} y1={136} x2={94} y2={166} color={HUES.red} />
    <Box x={6} y={16} w={84} h={58} hue="green" />
    <At x={48} y={44}>
      <CheckMark />
    </At>
    <Label x={48} y={100} size={18} color={MUTED}>
      תקין
    </Label>
    <Box x={6} y={144} w={84} h={58} hue="red" />
    <At x={48} y={172}>
      <Cross />
    </At>
    <Label x={48} y={226} size={18} color={MUTED}>
      כשל
    </Label>
    <At x={440} y={190}>
      <FormIcon />
    </At>
    <Label x={364} y={198} size={19} color={MUTED}>
      תיעוד
    </Label>
  </Frame>
);

const Icon = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <Frame w={64} h={64} className={className}>
    <At x={32} y={32}>
      {children}
    </At>
  </Frame>
);

const Crowd = () => (
  <>
    <At x={13} y={2} s={0.75}>
      <PersonIcon />
    </At>
    <At x={-13} y={2} s={0.75}>
      <PersonIcon />
    </At>
    <Marker d={disc(0, 4, 10)} hue="purple" />
    <At x={0} y={2}>
      <PersonIcon color={HUES.purple} />
    </At>
  </>
);

const Board = () => (
  <>
    <Box x={-25} y={-20} w={50} h={34} r={3} hue="blue" />
    <Pen d="M-5 -11L8 -3L-5 5Z" color={HUES.purple} />
    <Ln x1={-8} y1={14} x2={-14} y2={26} />
    <Ln x1={8} y1={14} x2={14} y2={26} />
  </>
);

const Nodes = () => (
  <>
    <Box x={8} y={-24} w={18} h={18} r={4} hue="purple" />
    <Box x={-26} y={-9} w={18} h={18} r={4} hue="amber" />
    <Box x={8} y={6} w={18} h={18} r={4} hue="green" />
    <Pen d="M7 -14C-1 -14 -1 -2 -7 -2" />
    <Pen d="M7 15C-1 15 -1 3 -7 3" />
  </>
);

const Fits = () => (
  <>
    <Marker d={disc(0, 0, 25)} hue="green" />
    <Ring cx={0} cy={0} r={26} />
    <CheckMark />
  </>
);

const NoMagic = () => (
  <>
    <Ln x1={-20} y1={22} x2={8} y2={-8} w={3.4} />
    <At x={14} y={-14} s={0.75}>
      <Spark color={HUES.amber} />
    </At>
    <At x={-14} y={-16} s={0.9}>
      <Cross />
    </At>
  </>
);

const CopiedLead = () => (
  <>
    <At x={15} y={-3} s={0.62}>
      <FormIcon />
    </At>
    <At x={-16} y={-3} s={0.62}>
      <SheetIcon />
    </At>
    <Arrow x1={4} y1={20} x2={-8} y2={20} color={HUES.red} />
  </>
);

const OneByOne = () => (
  <>
    <Box x={-24} y={-23} w={30} h={14} r={5} hue="blue" />
    <Box x={-12} y={-6} w={30} h={14} r={5} hue="blue" />
    <Box x={0} y={11} w={24} h={14} r={5} />
  </>
);

const MailedDocument = () => (
  <>
    <At x={0} y={-10} s={0.72}>
      <FormIcon />
    </At>
    <Marker d={box(-20, 3, 40, 20, 3)} hue="amber" />
    <Box x={-21} y={2} w={42} h={22} r={3} />
    <Pen d="M-20 4L0 15L20 4" />
  </>
);

const ScatteredReports = () => (
  <>
    <Box x={-22} y={2} w={11} h={20} r={2} hue="purple" />
    <Box x={-6} y={-20} w={11} h={42} r={2} hue="green" />
    <Box x={10} y={-8} w={11} h={30} r={2} hue="blue" />
  </>
);

const DroppedTask = () => (
  <>
    <Pen d="M-25 -12V25M-25 8H-12V25" />
    <Pen d="M25 -12V25M25 8H12V25" />
    <Box x={-8} y={-24} w={16} h={16} r={3} hue="amber" />
    <Arrow x1={0} y1={-3} x2={0} y2={21} color={HUES.red} />
  </>
);

/** Icons for the manual-work list, in the order of `pains`. */
export const painIcons = [CopiedLead, OneByOne, MailedDocument, ScatteredReports, DroppedTask].map((Picture) => ({ className }: { className?: string }) => (
  <Icon className={className}>
    <Picture />
  </Icon>
));

/** Icons for the four quick answers under the hero, in the order of `highlights`. */
export const highlightIcons = [Crowd, Board, Nodes, LaptopIcon].map((Picture) => ({ className }: { className?: string }) => (
  <Icon className={className}>
    <Picture />
  </Icon>
));

/** Icons for the three "who is it for" cards, in the order of `audience`. */
export const audienceIcons = [Fits, LaptopIcon, NoMagic].map((Picture) => ({ className }: { className?: string }) => (
  <Icon className={className}>
    <Picture />
  </Icon>
));
