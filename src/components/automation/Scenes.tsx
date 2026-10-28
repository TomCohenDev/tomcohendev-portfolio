import type { ReactNode } from "react";
import {
  Bot,
  Check,
  CircleCheck,
  CreditCard,
  GitBranch,
  Hand,
  MessageCircle,
  Music,
  Play,
  Send,
  ShieldAlert,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";

/**
 * Small, non-interactive product screens for the projects carousel: what the automation looks like
 * from the outside (a message arrives, a row is added, a draft waits for approval). The order numbers
 * and texts inside are illustrative, like the visuals on the main site's case-study pages.
 */

/** Hand-drawn arrow. `flip` mirrors it, `down` points it downwards. */
const Arrow = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg viewBox="0 0 60 40" fill="none" aria-hidden="true" className={`${className} ${flip ? "-scale-x-100" : ""}`}>
    <path d="M56 30C44 8 22 4 8 14" stroke="#c48bf5" strokeWidth="3" strokeLinecap="round" />
    <path d="M14 6L7 14L16 19" stroke="#c48bf5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Frame = ({ children }: { children: ReactNode }) => (
  <div className="relative h-48 overflow-hidden rounded-xl border border-[var(--a-line)] bg-[#17191a] text-start" aria-hidden="true">
    {children}
  </div>
);

const Bubble = ({ out = false, children, className = "" }: { out?: boolean; children: ReactNode; className?: string }) => (
  <div
    className={`max-w-[82%] rounded-2xl px-3 py-1.5 text-[11px] leading-snug ${
      out ? "self-end rounded-bl-md bg-[#2c5674] text-white" : "self-start rounded-br-md bg-[#232a33] text-[var(--a-ink)]"
    } ${className}`}
  >
    {children}
  </div>
);

const ChatHeader = ({ icon, name, status, color }: { icon: ReactNode; name: string; status: string; color: string }) => (
  <div className="flex items-center gap-2 border-b border-white/5 px-3 py-1.5">
    <span className={`flex h-6 w-6 items-center justify-center rounded-full ${color}`}>{icon}</span>
    <span className="text-[11px] font-medium text-[var(--a-ink)]">{name}</span>
    <span className="text-[10px] text-[var(--a-muted)]">{status}</span>
  </div>
);

/* ---------------------------------------------------------------- Nightwing */
const NightwingScene = () => (
  <Frame>
    {/* Order site */}
    <div className="absolute left-1/2 top-4 w-[40%] -translate-x-1/2 overflow-hidden rounded-lg border border-white/10 bg-[#111] shadow-[0_0_30px_rgba(191,149,249,0.15)]">
      <div className="flex items-center gap-1 border-b border-white/5 px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-green-400/70" />
        <span dir="ltr" className="ms-1 truncate text-[8px] text-gray-400">nightwing-ph.com</span>
      </div>
      <img src="/case_studies/nightwing-ph/assets/web-app-menu-display.webp" alt="" loading="lazy" className="h-32 w-full object-cover object-top" />
    </div>
    {/* Order sheet */}
    <div className="absolute right-2 top-3 z-10 w-[40%] overflow-hidden sm:w-[33%] rounded-lg border border-green-500/30 bg-[#1c2533] shadow-xl">
      <div className="bg-[#0f9d58] px-2 py-1 text-[10px] font-medium text-white">גיליון הזמנות</div>
      <div className="space-y-1.5 p-1.5">
        <div className="h-1.5 rounded-sm bg-white/10" />
        <div className="relative rounded border border-green-500/50 bg-green-500/20 px-1.5 py-1">
          <span className="absolute -left-0.5 -top-0.5 h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          <div className="flex items-center justify-between gap-1 whitespace-nowrap text-[8px] text-green-300">
            <span>הזמנה חדשה</span>
            <span dir="ltr">#NW-892</span>
          </div>
        </div>
        <div className="h-1.5 rounded-sm bg-white/10" />
      </div>
    </div>
    {/* Telegram alert */}
    <div className="absolute bottom-3 left-2 z-10 w-[46%] rounded-xl sm:w-[38%] border border-white/10 bg-[#1c2533] p-2 shadow-xl">
      <div className="flex items-center gap-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d946ef]">
          <Send className="h-3 w-3 text-white" />
        </span>
        <div className="leading-tight">
          <div className="text-[8px] text-gray-400">טלגרם · עכשיו</div>
          <div className="whitespace-nowrap text-[10px] font-medium text-white">התראת הזמנה 🔔</div>
        </div>
      </div>
      <div className="mt-1.5 space-y-0.5 whitespace-nowrap rounded bg-black/25 px-1.5 py-1 text-[9px] text-gray-300">
        <div className="flex justify-between">
          <span>הזמנה</span>
          <span dir="ltr" className="text-[#d946ef]">#NW-892</span>
        </div>
        <div className="flex justify-between">
          <span>פריטים</span>
          <span className="text-white">קומבו x2</span>
        </div>
      </div>
    </div>
    <Arrow className="absolute right-[22%] top-[52%] z-20 w-9 -rotate-[60deg]" />
    <Arrow className="absolute left-[16%] top-[14%] z-20 w-9 rotate-[95deg]" />
  </Frame>
);

/* ---------------------------------------------------------- Content agent */
const SocialScene = () => (
  <Frame>
    <div className="flex h-full flex-col">
      <ChatHeader icon={<Bot className="h-3.5 w-3.5 text-white" />} name="בוט התוכן" status="מחובר" color="bg-[#8b5cf6]" />
      <div className="flex flex-1 flex-col gap-1 px-3 py-1.5">
        <Bubble>
          <div className="font-medium">🚀 טיוטה חדשה מוכנה</div>
          <div className="mt-0.5 text-[10px] text-[var(--a-muted)]">״כלי חדש שהופך הקלטה קולית לפוסט מוכן. העתיד של יצירת תוכן...״</div>
        </Bubble>
        <Bubble out>לפרסם ב־X ובלינקדאין</Bubble>
        <Bubble className="text-[#4ade80]">✅ פורסם ב־X ובלינקדאין</Bubble>
      </div>
    </div>
  </Frame>
);

/* ------------------------------------------------------------- Blog drafts */
const BlogScene = () => (
  <Frame>
    {/* Idea in Telegram */}
    <div className="absolute right-3 top-4 w-[42%]">
      <div className="mb-1 flex items-center gap-1 text-[9px] text-[var(--a-muted)]">
        <Send className="h-3 w-3 text-[#38bdf8]" /> טלגרם
      </div>
      <div className="rounded-2xl rounded-bl-md bg-[#2c5674] px-3 py-2 text-[11px] leading-snug text-white">
        רעיון: למה כל עסק קטן צריך תהליך אחד אוטומטי
      </div>
    </div>
    <Arrow className="absolute left-[44%] top-[34%] w-10 rotate-[10deg]" flip />
    {/* Article draft */}
    <div className="absolute bottom-3 left-3 w-[48%] rounded-xl border border-white/10 bg-[#1f2326] p-2.5 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-[var(--a-human)]/50 px-1.5 text-[8px] text-[var(--a-human)]">טיוטה</span>
        <span className="text-[8px] text-[var(--a-muted)]">מערכת התוכן</span>
      </div>
      <div className="mt-1.5 text-[11px] font-medium leading-snug text-[var(--a-ink)]">למה כל עסק קטן צריך תהליך אחד אוטומטי</div>
      <div className="mt-1.5 space-y-1">
        <div className="h-1 rounded bg-white/10" />
        <div className="h-1 w-4/5 rounded bg-white/10" />
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1 text-[8px]">
        <span className="rounded bg-[var(--a-accent)]/15 px-1 text-[var(--a-accent)]">#אוטומציה</span>
        <span className="rounded bg-[var(--a-accent)]/15 px-1 text-[var(--a-accent)]">#עסקים</span>
        <span className="rounded bg-white/5 px-1 text-[var(--a-muted)]">תמונת כותרת</span>
      </div>
    </div>
  </Frame>
);

/* ------------------------------------------------------------------- Helix */
const AdFrame = ({ className, label }: { className: string; label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className={`relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-[#6d28d9] via-[#a855f7] to-[#ec4899] ${className}`}>
      <div className="absolute inset-x-[18%] top-[18%] bottom-[34%] rounded-sm bg-black/30" />
      <div className="absolute inset-x-[14%] bottom-[12%] h-[10%] rounded-sm bg-white/80" />
    </div>
    <span className="text-[9px] text-[var(--a-muted)]">{label}</span>
  </div>
);

const HelixScene = () => (
  <Frame>
    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full border border-[var(--a-human)]/50 bg-[#17191a] px-2 py-0.5 text-[9px] text-[var(--a-human)]">
      <Hand className="h-3 w-3" /> ממתין לאישור
    </div>
    <div className="absolute right-2 top-2 flex items-center gap-1 text-[9px] text-[var(--a-muted)]">
      <Sparkles className="h-3 w-3 text-[var(--a-accent)]" /> טיוטות מתוך המוצר
    </div>
    <div className="absolute inset-x-0 bottom-3 flex items-end justify-center gap-3">
      <AdFrame className="h-28 w-16" label="סטורי" />
      <AdFrame className="h-20 w-20" label="פיד" />
      <AdFrame className="h-16 w-28" label="מסך רחב" />
    </div>
  </Frame>
);

/* ------------------------------------------------------------------ Gomlin */
const Bar = ({ label, w }: { label: string; w: string }) => (
  <div className="flex items-center gap-1.5">
    <span className="w-[4.5rem] shrink-0 whitespace-nowrap text-[9px] text-[var(--a-muted)]">{label}</span>
    <span className="h-1.5 rounded-full bg-[#25d366]/70" style={{ width: w }} />
  </div>
);

const GomlinScene = () => (
  <Frame>
    <div className="flex h-full flex-col">
      <ChatHeader icon={<MessageCircle className="h-3.5 w-3.5 text-white" />} name="Gomlin" status="וואטסאפ" color="bg-[#1f9c55]" />
      <div className="flex flex-1 flex-col gap-1 px-3 py-1.5">
        <Bubble className="w-[78%]">
          <div className="mb-1 font-medium">📊 הדוח היומי</div>
          <div className="space-y-1">
            <Bar label="משתמשים חדשים" w="55%" />
            <Bar label="משרות חדשות" w="80%" />
            <Bar label="הגשות" w="40%" />
          </div>
        </Bubble>
        <Bubble out>אילו תחומים הכי מבוקשים השבוע?</Bubble>
        <Bubble>הנה הפירוט לפי תחום 👇</Bubble>
      </div>
    </div>
  </Frame>
);

/* ---------------------------------------------------------------- Mintkola */
const MintkolaScene = () => (
  <Frame>
    {/* Payment event */}
    <div className="absolute right-3 top-4 w-[37%] rounded-xl border border-white/10 bg-[#1f2326] p-2.5 shadow-xl">
      <div className="flex items-center gap-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#7047eb]">
          <CreditCard className="h-3 w-3 text-white" />
        </span>
        <span dir="ltr" className="text-[9px] text-[var(--a-muted)]">Lemon Squeezy</span>
      </div>
      <div className="mt-1.5 text-[11px] font-medium text-[var(--a-ink)]">תשלום התקבל</div>
      <div className="mt-1 text-[9px] text-[var(--a-muted)]">מנוי חודשי</div>
    </div>
    <div className="absolute left-1/2 top-[38%] z-10 flex -translate-x-1/2 flex-col items-center">
      <Arrow className="w-10 rotate-[25deg]" flip />
      <span className="mt-0.5 whitespace-nowrap rounded-full bg-[#17191a] px-1.5 text-[8px] text-[var(--a-accent)] ring-1 ring-[var(--a-accent)]/30">אימות חתימה ✓</span>
    </div>
    {/* Customer record */}
    <div className="absolute bottom-4 left-3 w-[37%] rounded-xl border border-white/10 bg-[#1f2326] p-2.5 shadow-xl">
      <div className="text-[9px] text-[var(--a-muted)]">רשומת לקוח</div>
      <div className="mt-1.5 flex items-center justify-between text-[10px] text-[var(--a-ink)]">
        <span>מנוי</span>
        <span className="flex items-center gap-1 text-[#4ade80]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" /> פעיל
        </span>
      </div>
      <div className="mt-1 flex items-center justify-between text-[10px] text-[var(--a-ink)]">
        <span>גישה</span>
        <span className="flex items-center gap-0.5 text-[#4ade80]">
          <Check className="h-3 w-3" /> פתוחה
        </span>
      </div>
    </div>
  </Frame>
);

/* --------------------------------------------------------------------- ITA */
const ItaScene = () => (
  <Frame>
    {/* Shared screen with an exercise and the AI's marks drawn on top */}
    <div className="absolute inset-x-3 top-3 bottom-12 rounded-lg border border-white/10 bg-[#f4f1ea] px-4 py-3" dir="ltr">
      <div className="flex items-center gap-2 font-mono text-[19px] font-semibold text-[#1d201f]">
        <span>2x</span>
        <span className="rounded-[50%] px-2 ring-2 ring-[#a855f7]">+ 6</span>
        <span>= 14</span>
      </div>
      <div className="mt-2 font-mono text-[13px] text-[#a855f7]">2x = 8 → x = 4</div>
      <svg viewBox="0 0 60 30" className="absolute left-[44%] top-[14%] w-12" fill="none">
        <path d="M4 22C18 6 34 4 50 10" stroke="#a855f7" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M44 4L51 10L44 16" stroke="#a855f7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div dir="rtl" className="absolute right-3 top-3 rounded-md bg-[#a855f7] px-1.5 py-0.5 text-[9px] font-medium text-white">
        מחסירים 6 משני הצדדים
      </div>
    </div>
    {/* The teacher's question */}
    <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 rounded-full bg-[#2c5674] px-3 py-1 text-[10px] text-white">
      <MessageCircle className="h-3 w-3" /> איך פותרים את זה?
    </div>
    <div className="absolute bottom-2.5 left-3 flex items-center gap-1 rounded-full border border-[var(--a-accent)]/40 px-2 py-0.5 text-[9px] text-[var(--a-accent)]">
      <Sparkles className="h-3 w-3" /> GPT סימן על המסך
    </div>
  </Frame>
);

/* ------------------------------------------------------------------- CI/CD */
const CheckRow = ({ label, time }: { label: string; time: string }) => (
  <div className="flex items-center gap-2 text-[10px] text-[var(--a-ink)]">
    <CircleCheck className="h-3.5 w-3.5 shrink-0 text-[#3fb950]" />
    <span className="flex-1">{label}</span>
    <span dir="ltr" className="font-mono text-[9px] text-[var(--a-muted)]">{time}</span>
  </div>
);

const CicdScene = () => (
  <Frame>
    <div className="absolute right-3 top-3 w-[56%] rounded-xl border border-white/10 bg-[#0d1117] p-2.5 shadow-xl">
      <div className="flex items-center gap-1.5 text-[10px] text-[var(--a-muted)]">
        <GitBranch className="h-3 w-3" />
        <span dir="ltr" className="font-mono">main</span>
        <span>· עדכון טקסט בדף הבית</span>
      </div>
      <div className="mt-2 space-y-1.5">
        <CheckRow label="התקנה" time="12s" />
        <CheckRow label="בנייה" time="41s" />
        <CheckRow label="עלייה לאוויר" time="9s" />
      </div>
    </div>
    <Arrow className="absolute bottom-[30%] left-[38%] w-10 rotate-[200deg]" />
    <div className="absolute bottom-3 left-3 w-[40%] rounded-xl border border-[#3fb950]/40 bg-[#3fb950]/10 p-2 text-[10px] text-[var(--a-ink)]">
      <div className="flex items-center gap-1 font-medium text-[#3fb950]">
        <Check className="h-3 w-3" /> האתר עודכן
      </div>
      <div className="mt-1 text-[9px] text-[var(--a-muted)]">בלי העלאה ידנית</div>
    </div>
    <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-[var(--a-human)]/50 px-2 py-0.5 text-[9px] text-[var(--a-human)]">
      הצעה לשינוי · קישור לתצוגה מקדימה
    </div>
  </Frame>
);

/* ------------------------------------------------------------------ Luxcal */
const DAYS = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

const LuxcalScene = () => (
  <Frame>
    <div className="absolute inset-3">
      <div className="mb-1.5 flex items-center justify-between text-[10px] text-[var(--a-muted)]">
        <span className="text-[var(--a-ink)]">היומן · החודש הקרוב</span>
        <span className="flex items-center gap-1 text-[var(--a-accent)]">
          <Sparkles className="h-3 w-3" /> נוצר אוטומטית
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-[var(--a-muted)]">
        {DAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: 28 }, (_, i) => {
          const day = i % 7;
          const shabbat = day === 5 || day === 6;
          return (
            <span
              key={i}
              className={`flex h-6 items-center justify-center rounded text-[8px] ${
                shabbat ? "bg-[var(--a-accent)]/25 text-[var(--a-accent)] ring-1 ring-[var(--a-accent)]/40" : "bg-white/[0.04]"
              }`}
            >
              {day === 5 ? "17:00" : day === 6 ? "21:00" : ""}
            </span>
          );
        })}
      </div>
      <div className="mt-1.5 text-[9px] text-[var(--a-muted)]">שבת · משישי 17:00 עד מוצאי שבת 21:00</div>
    </div>
  </Frame>
);

/* ---------------------------------------------------------------- Eldritch */
const BARS = [6, 12, 9, 16, 11, 18, 8, 14, 10, 17, 7, 13, 9, 15, 6, 11, 16, 8, 12, 10];

const EldritchScene = () => (
  <Frame>
    <div className="absolute inset-3 rounded-xl border border-[#2f6f5e]/40 bg-gradient-to-br from-[#0f1d1a] to-[#141216] p-3">
      <div className="text-[9px] uppercase tracking-wider text-[#5fb39a]">מפגש חדש</div>
      <div className="mt-1 text-[13px] font-medium text-[var(--a-ink)]">המגדלור בערפל</div>
      <div className="mt-1.5 space-y-1">
        <div className="h-1 rounded bg-white/10" />
        <div className="h-1 w-5/6 rounded bg-white/10" />
      </div>
      {/* Narration player */}
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-black/30 px-2 py-1.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5fb39a] text-[#0f1d1a]">
          <Play className="h-3 w-3 fill-current" />
        </span>
        <div className="flex h-5 flex-1 items-center gap-[2px]" dir="ltr">
          {BARS.map((h, i) => (
            <span key={i} className={`w-[3px] rounded-full ${i < 8 ? "bg-[#5fb39a]" : "bg-white/20"}`} style={{ height: h }} />
          ))}
        </div>
        <span className="text-[9px] text-[var(--a-muted)]">קריינות</span>
      </div>
      <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-[var(--a-accent)]/40 px-2 py-0.5 text-[9px] text-[var(--a-accent)]">
        <Music className="h-3 w-3" /> מוזיקת רקע נוצרה
      </div>
    </div>
  </Frame>
);

/* ---------------------------------------------------- n8n chat assistant */
const MiniNode = ({ label }: { label: string }) => (
  <span className="rounded-md border border-white/15 bg-[#1d201f] px-1.5 py-0.5 text-[9px] text-[var(--a-ink)]">{label}</span>
);

const N8nChatScene = () => (
  <Frame>
    <div className="flex h-full flex-col">
      <ChatHeader icon={<Workflow className="h-3.5 w-3.5 text-white" />} name="עוזר n8n" status="Claude" color="bg-[#ea4b71]" />
      <div className="flex flex-1 flex-col gap-1.5 px-3 py-2">
        <Bubble out>כל ליד מהטופס באתר שייכנס לגיליון וישלח לי הודעה</Bubble>
        <Bubble className="w-[86%]">
          <div className="mb-1.5">הנה תהליך מוכן:</div>
          <div className="flex flex-wrap items-center gap-1">
            <MiniNode label="טופס" />
            <span className="text-[var(--a-accent)]">←</span>
            <MiniNode label="גיליון" />
            <span className="text-[var(--a-accent)]">←</span>
            <MiniNode label="וואטסאפ" />
          </div>
          <div className="mt-1.5 inline-block rounded bg-[#ea4b71]/20 px-1.5 py-0.5 text-[9px] text-[#ff8aa5]">ייבוא ל־n8n</div>
        </Bubble>
      </div>
    </div>
  </Frame>
);

/* ------------------------------------------------------- Vulnerability MCP */
const SevRow = ({ label, n, w, color }: { label: string; n: number; w: string; color: string }) => (
  <div className="flex items-center gap-2 text-[9px] text-[var(--a-muted)]">
    <span className="w-10 shrink-0">{label}</span>
    <span className="h-1.5 rounded-full" style={{ width: w, background: color }} />
    <span className="text-[var(--a-ink)]">{n}</span>
  </div>
);

const McpScene = () => (
  <Frame>
    <div className="flex h-full flex-col gap-1.5 px-3 py-2.5">
      <Bubble out>אילו פגיעויות קריטיות יש לספק הזה?</Bubble>
      <div className="flex items-center gap-1.5 self-start rounded-md border border-white/10 bg-black/30 px-2 py-1 text-[9px] text-[var(--a-muted)]">
        <Wrench className="h-3 w-3 text-[var(--a-accent)]" />
        <span dir="ltr" className="font-mono text-[var(--a-ink)]">search_vulnerabilities</span>
        <span>· מתוך המאגר</span>
      </div>
      <Bubble className="w-[80%]">
        <div className="mb-1 flex items-center gap-1 font-medium">
          <ShieldAlert className="h-3 w-3 text-[#f87171]" /> מה נמצא במאגר
        </div>
        <div className="space-y-1">
          <SevRow label="קריטית" n={2} w="30%" color="#f87171" />
          <SevRow label="גבוהה" n={5} w="60%" color="#fb923c" />
          <SevRow label="בינונית" n={3} w="40%" color="#facc15" />
        </div>
      </Bubble>
    </div>
  </Frame>
);

const SCENES: Record<string, () => JSX.Element> = {
  nightwing: NightwingScene,
  social: SocialScene,
  blog: BlogScene,
  helix: HelixScene,
  gomlin: GomlinScene,
  mintkola: MintkolaScene,
  ita: ItaScene,
  cicd: CicdScene,
  luxcal: LuxcalScene,
  eldritch: EldritchScene,
  n8nchat: N8nChatScene,
  mcp: McpScene,
};

/** The product screen for one project, or nothing if it has none. */
export const ProjectScene = ({ id }: { id: string }) => {
  const Scene = SCENES[id];
  return Scene ? <Scene /> : null;
};
