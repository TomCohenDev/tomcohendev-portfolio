/**
 * Drawn screens of Tom's apps, modelled on the real screenshots (public/case_studies/*) and the apps'
 * own colours. They are illustrations, not screenshots, and the page says so. Every size is in cqw
 * (the phone screen is the container). Animations only run inside `.m-live` (see mobile.css), and the
 * resting styles are the finished state, so reduced motion simply shows the end result.
 */
import type { ReactNode } from "react";
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  Flame,
  GraduationCap,
  Hand,
  Home,
  Info,
  MapPin,
  MessageCircle,
  Phone as PhoneIcon,
  Plus,
  Rocket,
  User,
  X,
  Zap,
} from "lucide-react";
import type { AppId } from "./content";

const delay = (s: number) => ({ animationDelay: `${s}s` });

const DroneGlyph = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
    <path d="M7 7l3.5 3.5M17 7l-3.5 3.5M7 17l3.5-3.5M17 17l-3.5-3.5" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1.2" />
    <circle cx="5.5" cy="5.5" r="2.6" />
    <circle cx="18.5" cy="5.5" r="2.6" />
    <circle cx="5.5" cy="18.5" r="2.6" />
    <circle cx="18.5" cy="18.5" r="2.6" />
  </svg>
);

const ICONS: Record<AppId, { bg: string; glyph: ReactNode }> = {
  gomlin: { bg: "linear-gradient(145deg,#a274f5,#5b2fb8)", glyph: <BriefcaseBusiness className="h-[55%] w-[55%] text-white" /> },
  dronebag: { bg: "linear-gradient(145deg,#42a5f5,#1565c0)", glyph: <DroneGlyph className="h-[60%] w-[60%] text-white" /> },
  spidclass: { bg: "linear-gradient(145deg,#1d2f57,#0c1426)", glyph: <GraduationCap className="h-[58%] w-[58%] text-[#5fb4ff]" /> },
  luxcal: { bg: "linear-gradient(145deg,#4a4270,#2c2640)", glyph: <CalendarDays className="h-[54%] w-[54%] text-[#FFCB66]" /> },
  candle: { bg: "linear-gradient(145deg,#ffd75e,#f5b400)", glyph: <Flame className="h-[56%] w-[56%] text-[#e8572a]" /> },
  launch: { bg: "linear-gradient(145deg,#bf95f9,#f49ac1)", glyph: <Rocket className="h-[52%] w-[52%] text-white" /> },
};

/** Rounded app icon. Sized by the caller. */
export const AppIcon = ({ id, className = "" }: { id: AppId; className?: string }) => (
  <span
    aria-hidden="true"
    className={`grid shrink-0 place-items-center rounded-[24%] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_12px_-4px_rgba(0,0,0,0.6)] ${className}`}
    style={{ background: ICONS[id].bg }}
  >
    {ICONS[id].glyph}
  </span>
);

/* ------------------------------------------------------------------ Home screen (hero) */

const HOME_APPS: { id: AppId; label: string }[] = [
  { id: "gomlin", label: "Gomlin" },
  { id: "dronebag", label: "Dronebag" },
  { id: "spidclass", label: "Spidclass" },
  { id: "luxcal", label: "Luxcal" },
  { id: "candle", label: "Candle" },
];

export const HomeScreen = () => (
  <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(120%_70%_at_80%_0%,#5b3d8f_0%,#2a2140_45%,#161519_100%)] text-white">
    <div className="absolute -left-[20cqw] top-[70cqw] h-[70cqw] w-[70cqw] rounded-full bg-[#f49ac1]/25 blur-[10cqw]" />
    <div dir="rtl" className="relative px-[7cqw] pt-[17cqw]">
      {/* Clock widget */}
      <div className="m-pop rounded-[6cqw] bg-white/10 p-[5cqw] backdrop-blur-sm" style={delay(0.05)}>
        <p className="text-[4cqw] text-white/70">יום רביעי, 28 באוקטובר</p>
        <p dir="ltr" className="text-end text-[15cqw] font-semibold leading-none tracking-tight">9:41</p>
      </div>
      <div className="mt-[8cqw] grid grid-cols-3 gap-x-[5cqw] gap-y-[6cqw]">
        {HOME_APPS.map((app, i) => (
          <div key={app.id} className="m-pop flex flex-col items-center gap-[1.6cqw]" style={delay(0.2 + i * 0.09)}>
            <AppIcon id={app.id} className="h-[17cqw] w-[17cqw]" />
            <span dir="ltr" className="text-[3.3cqw] text-white/85">
              {app.label}
            </span>
          </div>
        ))}
        <div className="m-pop flex flex-col items-center gap-[1.6cqw]" style={delay(0.7)}>
          <span className="m-yours grid h-[17cqw] w-[17cqw] place-items-center rounded-[24%] border-[0.6cqw] border-dashed border-white/60">
            <Plus className="h-[45%] w-[45%] text-white/80" />
          </span>
          <span className="text-[3.3cqw] text-white/85">שלכם</span>
        </div>
      </div>
    </div>
    {/* Dock */}
    <div className="absolute inset-x-[5cqw] bottom-[5cqw] flex justify-around rounded-[7cqw] bg-white/15 px-[3cqw] py-[3.2cqw] backdrop-blur-md">
      {[PhoneIcon, MessageCircle, Camera, Clock3].map((Icon, i) => (
        <span key={i} className="grid h-[14cqw] w-[14cqw] place-items-center rounded-[24%] bg-white/15">
          <Icon className="h-[50%] w-[50%] text-white" />
        </span>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ Gomlin Jobs */

const JOBS = [
  { title: "מפתח/ת Flutter", tags: ["משרה מלאה", "היברידי"], place: "תל אביב" },
  { title: "מעצב/ת מוצר", tags: ["פרילנס", "מרחוק"], place: "מרחוק" },
  { title: "מנהל/ת קהילה", tags: ["חצי משרה", "שעתי"], place: "חיפה" },
];

// Front, middle and back of the stack at the start (see m-swipe in mobile.css).
const CARD_DELAYS = [0, -5.2, -2.6];

const GomlinScreen = () => (
  <div dir="rtl" className="absolute inset-0 overflow-hidden bg-[#16151b] text-white">
    <div className="absolute inset-x-0 top-0 h-[75cqw] bg-[radial-gradient(70%_100%_at_50%_0%,rgba(142,92,230,0.55),transparent)]" />
    <div className="relative flex items-center justify-between px-[6cqw] pt-[14cqw]">
      <span dir="ltr" className="text-[5.4cqw] font-bold">
        Gomlin Jobs
      </span>
      <span className="grid h-[9cqw] w-[9cqw] place-items-center rounded-full bg-[#9b6bf2]">
        <Filter className="h-[48%] w-[48%]" />
      </span>
    </div>
    <div className="relative mx-[7cqw] mt-[5cqw] h-[112cqw]">
      {JOBS.map((job, i) => (
        <div
          key={job.title}
          className={`m-card m-card-${i} absolute inset-0 rounded-[6cqw] border border-white/10 bg-[#25232d] p-[5.5cqw] shadow-[0_3cqw_8cqw_-2cqw_rgba(0,0,0,0.7)]`}
          style={delay(CARD_DELAYS[i])}
        >
          <p className="text-[6cqw] font-bold leading-tight">{job.title}</p>
          <p className="mt-[1.5cqw] flex items-center gap-[1.5cqw] text-[3.4cqw] text-[#b79cf2]">
            <BriefcaseBusiness className="h-[3.6cqw] w-[3.6cqw]" />
            Gomlin Jobs
          </p>
          <div className="mt-[3.5cqw] flex flex-wrap gap-[2cqw]">
            {job.tags.map((t) => (
              <span key={t} className="rounded-[2cqw] border border-[#9b6bf2]/50 bg-[#9b6bf2]/15 px-[2.4cqw] py-[1cqw] text-[3.2cqw]">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-[3.5cqw] flex items-center gap-[1.5cqw] text-[3.2cqw] text-white/55">
            <MapPin className="h-[3.4cqw] w-[3.4cqw]" />
            {job.place} · פורסם היום
          </p>
          <p className="mt-[5cqw] text-[3.8cqw] font-semibold">תיאור</p>
          <div className="mt-[2cqw] space-y-[2cqw]">
            {[92, 100, 78, 86].map((w, j) => (
              <span key={j} className="block h-[2.2cqw] rounded-full bg-white/10" style={{ width: `${w}%` }} />
            ))}
          </div>
          <p className="mt-[5cqw] text-[3.8cqw] font-semibold">כישורים</p>
          <div className="mt-[2cqw] flex flex-wrap gap-[1.6cqw]">
            {[22, 30, 18, 26].map((w, j) => (
              <span key={j} className="h-[6cqw] rounded-full border border-white/15" style={{ width: `${w}cqw` }} />
            ))}
          </div>
          <span className="m-stamp absolute left-[5cqw] top-[6cqw] -rotate-12 rounded-[2cqw] border-[0.8cqw] border-[#43b581] px-[2.4cqw] py-[0.6cqw] text-[5cqw] font-bold text-[#43b581] opacity-0">
            מעוניין
          </span>
        </div>
      ))}
    </div>
    <div className="relative mt-[5cqw] flex items-center justify-center gap-[12cqw]">
      <span className="grid h-[13cqw] w-[13cqw] place-items-center rounded-full border-[0.6cqw] border-white/80 bg-black/40">
        <X className="h-[50%] w-[50%]" />
      </span>
      <span className="m-like grid h-[13cqw] w-[13cqw] place-items-center rounded-full bg-[#9b6bf2]">
        <Check className="h-[50%] w-[50%]" />
      </span>
    </div>
    <div className="absolute inset-x-0 bottom-[4cqw] flex justify-around px-[6cqw]">
      {[Hand, MessageCircle, Zap, User].map((Icon, i) => (
        <span key={i} className={`grid h-[8cqw] w-[13cqw] place-items-center rounded-full ${i === 0 ? "bg-[#9b6bf2]" : ""}`}>
          <Icon className="h-[5cqw] w-[5cqw] text-white/85" />
        </span>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ Dronebag */

const DRONES = [
  { name: "Alpha", maint: 45, air: 104, battery: 92, ok: true },
  { name: "Bravo", maint: 12, air: 188, battery: 64, ok: false },
  { name: "Charlie", maint: 92, air: 61, battery: 81, ok: true },
];

const DronebagScreen = () => (
  <div dir="ltr" className="absolute inset-0 overflow-hidden bg-[#0b0b0d] text-white">
    <div className="flex items-center gap-[4cqw] px-[6cqw] pt-[15cqw]">
      <ChevronLeft className="h-[6cqw] w-[6cqw]" />
      <span className="text-[5.4cqw] font-semibold">Drone List</span>
      <span className="ms-auto text-end text-[3cqw] font-semibold leading-tight text-[#42a5f5]">
        Add New
        <br />
        Drone
      </span>
    </div>
    <div className="mt-[5cqw] space-y-[4cqw] px-[8cqw]">
      {DRONES.map((d, i) => (
        <div key={d.name} className="m-rise rounded-[4cqw] bg-[#34333f] px-[5cqw] py-[4cqw]" style={delay(0.1 + i * 0.12)}>
          <div className="flex items-center gap-[2.5cqw]">
            <DroneGlyph className="h-[6cqw] w-[6cqw] text-[#42a5f5]" />
            <span className="text-[5cqw] font-semibold">{d.name}</span>
          </div>
          <p className="mt-[1.5cqw] text-[3.1cqw] text-white/50">Maintenance in ~{d.maint} hours</p>
          <p className="text-[3.1cqw] text-white/50">Airtime: ~{d.air} hours</p>
          <div className="mt-[2cqw] flex items-center gap-[2cqw]">
            <span className="text-[3cqw] text-white/60">Battery</span>
            <span className="h-[2cqw] flex-1 overflow-hidden rounded-full bg-white/10">
              <span
                className="m-fill block h-full origin-left rounded-full"
                style={{ width: `${d.battery}%`, background: d.battery > 70 ? "#43b581" : "#f2c46d", ...delay(0.5 + i * 0.15) }}
              />
            </span>
          </div>
          <p className={`mt-[1.5cqw] text-[3.1cqw] ${d.ok ? "text-[#43b581]" : "text-[#f26d6d]"}`}>
            {d.ok ? "Ready to fly" : "Open issues: 1"}
          </p>
        </div>
      ))}
    </div>
    <div className="absolute inset-x-0 bottom-[9cqw] flex justify-center">
      <span className="m-glow rounded-full bg-[#2196f3] px-[10cqw] py-[3.6cqw] text-[4cqw] font-semibold">Start Flight</span>
    </div>
    <div className="m-toast absolute inset-x-[6cqw] top-[13cqw] z-20 flex items-center gap-[3cqw] rounded-[4cqw] bg-[#1f2b38]/95 px-[4cqw] py-[3cqw] opacity-0 shadow-lg ring-1 ring-white/10" style={delay(1.9)}>
      <span className="grid h-[7cqw] w-[7cqw] place-items-center rounded-full bg-[#43b581]">
        <Check className="h-[60%] w-[60%]" />
      </span>
      <span className="text-[3.5cqw]">Flight logged · Alpha · 42 min</span>
    </div>
  </div>
);

/* ------------------------------------------------------------------ Spidclass */

const STUDENTS = [
  { name: "נועה", paid: true, here: true },
  { name: "איתי", paid: true, here: true },
  { name: "מאיה", paid: false, here: true },
  { name: "יונתן", paid: true, here: false },
  { name: "תמר", paid: true, here: true },
];

const SpidclassScreen = () => (
  <div dir="rtl" className="absolute inset-0 overflow-hidden bg-[#0c0b0c] text-white">
    <div className="px-[6cqw] pt-[15cqw]">
      <p className="text-[3.4cqw] text-[#5fb4ff]">יום שלישי · 17:00</p>
      <p className="text-[6.4cqw] font-bold">קבוצת שלישי</p>
    </div>
    <div className="mx-[6cqw] mt-[4cqw] flex rounded-[3cqw] bg-[#23262b] p-[1cqw] text-[3.6cqw]">
      <span className="flex-1 rounded-[2.4cqw] bg-[#2693f4] py-[2cqw] text-center font-semibold">נוכחות</span>
      <span className="flex-1 py-[2cqw] text-center text-white/60">תשלומים</span>
    </div>
    <ul className="mt-[4cqw] space-y-[2.4cqw] px-[6cqw]">
      {STUDENTS.map((s, i) => (
        <li key={s.name} className="flex items-center gap-[3cqw] rounded-[3.5cqw] bg-[#17181b] px-[3.5cqw] py-[3cqw]">
          <span className="grid h-[9cqw] w-[9cqw] place-items-center rounded-full bg-[#2693f4]/20 text-[4cqw] font-semibold text-[#5fb4ff]">
            {s.name[0]}
          </span>
          <span className="flex-1 text-[4.2cqw]">{s.name}</span>
          <span
            className={`rounded-full px-[2.4cqw] py-[0.8cqw] text-[2.9cqw] ${
              s.paid ? "bg-[#43b581]/15 text-[#6fd3a0]" : "bg-[#f2c46d]/15 text-[#f2c46d]"
            }`}
          >
            {s.paid ? "שולם" : "ממתין"}
          </span>
          <span
            className={`m-tick grid h-[7cqw] w-[7cqw] place-items-center rounded-[2cqw] ${s.here ? "bg-[#2693f4]" : "bg-white/10"}`}
            style={delay(0.35 + i * 0.32)}
          >
            {s.here ? <Check className="h-[70%] w-[70%]" /> : <X className="h-[60%] w-[60%] text-white/50" />}
          </span>
        </li>
      ))}
    </ul>
    <div className="m-rise mx-[6cqw] mt-[4cqw] rounded-[3.5cqw] bg-[#17181b] p-[3.5cqw]" style={delay(2.1)}>
      <div className="flex items-center justify-between text-[3.4cqw]">
        <span className="text-white/70">שולם החודש</span>
        <span className="font-semibold">4 מתוך 5</span>
      </div>
      <span className="mt-[2cqw] block h-[2cqw] overflow-hidden rounded-full bg-white/10">
        <span className="m-fill block h-full w-[80%] origin-right rounded-full bg-[#43b581]" style={delay(2.3)} />
      </span>
    </div>
    <div className="absolute inset-x-[6cqw] bottom-[8cqw] flex items-center justify-between">
      <span className="m-rise text-[3.8cqw] text-white/70" style={delay(2)}>
        נוכחים <b className="text-white">4</b> מתוך 5
      </span>
      <span className="rounded-[3cqw] bg-[#2693f4] px-[6cqw] py-[2.8cqw] text-[3.8cqw] font-semibold">שמירה</span>
    </div>
  </div>
);

/* ------------------------------------------------------------------ Luxcal */

// November 2026 starts on a Sunday, so the grid needs no blank days.
const DAYS = "אבגדהוש".split("");
const DOTS: Record<number, string> = { 3: "#86D8CA", 10: "#CF5EAF", 11: "#86D8CA", 17: "#1C9FE9", 24: "#CF5EAF", 25: "#86D8CA" };

const LuxcalScreen = () => (
  <div dir="rtl" className="absolute inset-0 overflow-hidden bg-[#38324e] text-white">
    <div className="flex items-center justify-between px-[6cqw] pt-[15cqw]">
      <span className="text-[6cqw] font-bold">נובמבר 2026</span>
      <span className="flex gap-[2cqw] text-white/70">
        <ChevronRight className="h-[5cqw] w-[5cqw]" />
        <ChevronLeft className="h-[5cqw] w-[5cqw]" />
      </span>
    </div>
    <div className="mx-[4cqw] mt-[4cqw] rounded-[5cqw] bg-[#403a60] p-[3cqw]">
      <div className="grid grid-cols-7 text-center text-[3cqw] text-white/50">
        {DAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="relative mt-[1.5cqw] grid grid-cols-7 gap-y-[1.2cqw] text-center text-[3.4cqw]">
        {/* Shabbat events, Friday 17:00 to Saturday 21:00, created by the script for each week. */}
        {[0, 1, 2, 3].map((w) => (
          <span
            key={w}
            className="m-bar pointer-events-none absolute left-[0.5%] h-[9.6cqw] w-[28%] origin-right rounded-full bg-[#FFCB66]/90"
            style={{ top: `calc(${w} * (9.6cqw + 1.2cqw))`, ...delay(0.5 + w * 0.25) }}
          />
        ))}
        {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
          const col = (d - 1) % 7;
          const shabbat = col >= 5 && d <= 28;
          return (
            <span key={d} className="relative grid h-[9.6cqw] place-items-center">
              <span
                className={`relative grid h-[7cqw] w-[7cqw] place-items-center rounded-full ${
                  d === 17 ? "ring-[0.5cqw] ring-[#FFCB66]" : ""
                } ${shabbat ? "font-semibold text-[#38324e]" : ""}`}
              >
                {d}
              </span>
              {DOTS[d] && <span className="absolute bottom-0 h-[1.2cqw] w-[1.2cqw] rounded-full" style={{ background: DOTS[d] }} />}
            </span>
          );
        })}
      </div>
    </div>
    <div className="mt-[4cqw] space-y-[3cqw] px-[4cqw]">
      <div className="m-rise flex items-stretch gap-[3cqw] rounded-[4cqw] bg-[#2c2640] p-[3cqw]" style={delay(1.6)}>
        <span className="w-[1.4cqw] rounded-full bg-[#FFCB66]" />
        <div>
          <p className="text-[4cqw] font-semibold">שבת</p>
          <p className="text-[3.2cqw] text-white/60">שישי 17:00 עד מוצאי שבת 21:00</p>
        </div>
        <span className="ms-auto self-center rounded-full bg-[#FFCB66]/20 px-[2.4cqw] py-[0.8cqw] text-[2.8cqw] text-[#FFCB66]">נוצר לבד</span>
      </div>
      <div className="m-rise flex items-center gap-[3cqw] rounded-[4cqw] bg-[#2c2640] p-[3cqw]" style={delay(1.85)}>
        <span className="h-[12cqw] w-[16cqw] rounded-[2.4cqw] bg-[linear-gradient(135deg,#CF5EAF,#E9D66B)]" />
        <div>
          <p className="text-[3.9cqw] font-semibold">חדשות</p>
          <p className="text-[3.2cqw] text-white/60">תמונות מהאירוע עלו לגלריה</p>
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ Yellow Candle */

const CandleScreen = () => (
  <div dir="ltr" className="absolute inset-0 overflow-hidden bg-[#121212] text-white">
    <div className="relative z-10 bg-[#ffc93c] px-[6cqw] pb-[3.5cqw] pt-[13cqw] text-center text-[#14213f]">
      <p className="text-[3cqw] font-semibold">FJMC Virtual Shoah Yellow Candle</p>
      <p className="text-[6cqw] font-bold leading-tight">Light a Candle</p>
    </div>
    <div className="m-halo absolute left-1/2 top-[36cqw] h-[110cqw] w-[110cqw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,190,80,0.55)_0%,rgba(255,150,40,0.18)_35%,transparent_65%)]" style={delay(1)} />
    {/* Memorial candle: a plain yellow tin with a Star of David */}
    <div className="absolute left-1/2 top-[48cqw] -translate-x-1/2">
      <span className="m-ignite absolute -top-[15cqw] left-1/2 block h-[13cqw] w-[6.5cqw]" style={delay(1)}>
        <span className="m-flicker block h-full w-full rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[radial-gradient(ellipse_at_50%_75%,#fff_0%,#ffe9a0_30%,#ffb02e_65%,#ff7a1a_100%)] shadow-[0_0_6cqw_2cqw_rgba(255,170,60,0.55)]" />
      </span>
      <span className="absolute -top-[3cqw] left-1/2 block h-[3.4cqw] w-[0.8cqw] -translate-x-1/2 rounded-full bg-[#2b2b2b]" />
      <span className="block h-[24cqw] w-[26cqw] rounded-[2cqw] bg-[linear-gradient(90deg,#b8930e,#f3cf3a_45%,#c79f12)] shadow-[inset_0_1.5cqw_0_rgba(255,255,255,0.25)]">
        <svg viewBox="0 0 24 24" className="mx-auto mt-[5cqw] h-[12cqw] w-[12cqw] text-[#5a4706]" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3l7.8 13.5H4.2zM12 21L4.2 7.5h15.6z" />
        </svg>
      </span>
    </div>
    <div className="absolute inset-x-[10cqw] top-[86cqw] space-y-[3cqw] text-[3.7cqw] font-semibold">
      <span className="m-press flex items-center justify-center gap-[2cqw] rounded-[3cqw] bg-[#ff7043] py-[3.4cqw]" style={delay(0.6)}>
        <Flame className="h-[4.4cqw] w-[4.4cqw]" /> Light Candle
      </span>
      <span className="flex items-center justify-center gap-[2cqw] rounded-[3cqw] bg-[#8a8d93] py-[3.4cqw]">
        <CalendarDays className="h-[4.4cqw] w-[4.4cqw]" /> Schedule a Reminder
      </span>
      <span className="flex items-center justify-center gap-[2cqw] rounded-[3cqw] bg-[#8a8d93] py-[3.4cqw]">
        <Info className="h-[4.4cqw] w-[4.4cqw]" /> More Information
      </span>
      <span className="m-rise !mt-[6cqw] flex items-center gap-[3cqw] rounded-[3cqw] bg-white/10 px-[3.5cqw] py-[3cqw] text-start font-normal" style={delay(1.8)}>
        <Bell className="h-[5cqw] w-[5cqw] shrink-0 text-[#ffc93c]" />
        <span>
          <b className="block text-[3.4cqw]">Reminder set</b>
          <span className="text-[3cqw] text-white/60">Yom HaShoah · 8:00 PM</span>
        </span>
      </span>
    </div>
    <div className="absolute inset-x-0 bottom-0 flex justify-around bg-[#ffc93c] pb-[6cqw] pt-[2.4cqw] text-[2.8cqw] text-[#14213f]">
      {[
        { Icon: Home, label: "Home" },
        { Icon: Info, label: "Why" },
        { Icon: BarChart3, label: "Recite" },
      ].map(({ Icon, label }, i) => (
        <span key={label} className={`flex flex-col items-center ${i ? "opacity-60" : "font-semibold"}`}>
          <Icon className="h-[5cqw] w-[5cqw]" />
          {label}
        </span>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ Launch */

const LAUNCH_STEPS = ["הגרסה נבנתה", "נבדקה על מכשירים", "הוגשה ל־App Store", "הוגשה ל־Google Play", "פורסמה בחנויות"];

const LaunchScreen = () => (
  <div dir="rtl" className="absolute inset-0 overflow-hidden bg-[#0f1012] text-white">
    <div className="m-banner absolute inset-x-[4cqw] top-[12cqw] z-20 flex items-center gap-[3cqw] rounded-[5cqw] bg-[#2a2b30]/95 p-[3.4cqw] shadow-xl ring-1 ring-white/10" style={delay(2.4)}>
      <AppIcon id="launch" className="h-[9cqw] w-[9cqw]" />
      <div className="min-w-0">
        <p dir="ltr" className="text-end text-[2.9cqw] text-white/60">App Store Connect</p>
        <p className="text-[3.5cqw] font-semibold">הגרסה אושרה ועלתה לחנות</p>
      </div>
    </div>
    <div className="flex items-center gap-[4cqw] px-[6cqw] pt-[17cqw]">
      <AppIcon id="launch" className="h-[22cqw] w-[22cqw]" />
      <div>
        <p className="text-[5.6cqw] font-bold leading-tight">האפליקציה שלכם</p>
        <p className="text-[3.3cqw] text-white/55">גרסה 1.0</p>
        <span className="mt-[2cqw] inline-block rounded-full bg-[#0a84ff] px-[5cqw] py-[1.4cqw] text-[3.4cqw] font-semibold">קבלה</span>
      </div>
    </div>
    <div className="mx-[6cqw] mt-[5cqw] flex justify-between border-y border-white/10 py-[3cqw] text-center text-[2.9cqw] text-white/55">
      <span>
        <b className="block text-[3.8cqw] text-white">iOS</b>אייפון
      </span>
      <span>
        <b className="block text-[3.8cqw] text-white">Android</b>אנדרואיד
      </span>
      <span>
        <b className="block text-[3.8cqw] text-white">1.0</b>גרסה
      </span>
    </div>
    <ul className="mx-[6cqw] mt-[5cqw] space-y-[3.4cqw]">
      {LAUNCH_STEPS.map((s, i) => (
        <li key={s} className="flex items-center gap-[3cqw] text-[3.9cqw]">
          <span className="m-tick grid h-[6.4cqw] w-[6.4cqw] place-items-center rounded-full bg-[#43b581]" style={delay(0.3 + i * 0.4)}>
            <Check className="h-[65%] w-[65%]" />
          </span>
          <span className="m-rise" style={delay(0.3 + i * 0.4)}>
            {s}
          </span>
        </li>
      ))}
    </ul>
    <p className="mx-[6cqw] mt-[6cqw] text-[3.6cqw] font-semibold">תצוגה מקדימה</p>
    <div className="mx-[6cqw] mt-[2.5cqw] flex gap-[3cqw]">
      {["#5b3d8f", "#1565c0", "#f5b400"].map((c, i) => (
        <span
          key={c}
          className="m-rise h-[38cqw] flex-1 rounded-[3cqw] border border-white/10 p-[2cqw]"
          style={{ background: `linear-gradient(180deg,${c}55,#18191c 70%)`, ...delay(0.6 + i * 0.15) }}
        >
          <span className="block h-[3cqw] w-[60%] rounded-full bg-white/30" />
          <span className="mt-[2cqw] block h-[12cqw] rounded-[2cqw] bg-white/10" />
          <span className="mt-[2cqw] block h-[2cqw] w-[80%] rounded-full bg-white/15" />
          <span className="mt-[1.5cqw] block h-[2cqw] w-[50%] rounded-full bg-white/15" />
        </span>
      ))}
    </div>
  </div>
);

const SCREENS: Record<AppId, () => JSX.Element> = {
  gomlin: GomlinScreen,
  dronebag: DronebagScreen,
  spidclass: SpidclassScreen,
  luxcal: LuxcalScreen,
  candle: CandleScreen,
  launch: LaunchScreen,
};

export const AppScreen = ({ id }: { id: AppId }) => {
  const Screen = SCREENS[id];
  return <Screen />;
};
