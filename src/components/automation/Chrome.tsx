import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { CONTACT } from "./content";
import { HOME_WHATSAPP } from "../home/content";
import { SITES, type SiteKey } from "./sites";

/** The homepage uses the same header and footer, with its own menu and no section label. */
export type PageKey = SiteKey | "home";

const HOME = {
  path: "/",
  label: "",
  event: "home",
  nav: [
    { href: "/mobile", label: "אפליקציות" },
    { href: "/automation", label: "אוטומציה" },
    { href: "/blog", label: "בלוג" },
    { href: "/news", label: "חדשות" },
    { href: "/courses", label: "קורסים ומפגשים" },
    { href: "#about", label: "קצת עליי" },
  ],
  blurb: "פיתוח אפליקציות ואוטומציות לעסקים, מהאפיון ועד שזה עובד.",
  whatsappHref: HOME_WHATSAPP,
};

/** Blog, news and courses: in every footer, since the phone header has no menu. */
const CONTENT_LINKS = [
  { href: "/blog", label: "בלוג" },
  { href: "/news", label: "חדשות הבוקר" },
  { href: "/courses", label: "קורסים ומפגשים" },
];

const page = (key: PageKey) => (key === "home" ? HOME : { ...SITES[key], whatsappHref: CONTACT.whatsappHref });

/** `onLanding` is false on the other Hebrew pages, where in-page links lead back to the landing page. */
export const AutomationHeader = ({ onLanding = true, site = "automation" }: { onLanding?: boolean; site?: PageKey }) => {
  const s = page(site);
  const base = onLanding ? "" : s.path;
  const link = (href: string) => (href.startsWith("#") ? base + href : href);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--a-line)] bg-[#1D201F]/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-[var(--a-accent)] focus:px-4 focus:py-2 focus:text-[#1D201F]"
      >
        דילוג לתוכן
      </a>
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-5 md:px-8 xl:px-12">
        <a href="/" className="flex shrink-0 items-center gap-2 whitespace-nowrap sm:gap-2.5" aria-label="תום כהן, לעמוד הבית">
          <img src="/icon.svg" alt="" className="h-7 w-auto" />
          <span className="text-lg font-medium text-[var(--a-ink)] max-[359px]:text-base">תום כהן</span>
          {s.label && (
            <span className="text-base font-normal text-[var(--a-accent)] max-[359px]:text-sm sm:text-lg">· {s.label}</span>
          )}
        </a>
        <nav aria-label={site === "home" ? "ניווט ראשי" : "ניווט בעמוד"} className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[15px] text-[var(--a-muted)]">
            {s.nav.map((item) => (
              <li key={item.href}>
                <a href={link(item.href)} className="transition-colors hover:text-[var(--a-ink)]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          {/* Hidden on narrow phones to make room; the hero has a WhatsApp button right below. */}
          <a
            href={s.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="וואטסאפ (נפתח בחלון חדש)"
            onClick={() => track(`${s.event}_contact_click`, { method: "whatsapp", location: "header" })}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--a-line)] text-[var(--a-ink)] transition-colors hover:border-[var(--a-accent)] hover:text-[var(--a-accent)] min-[420px]:flex"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={`${base}#contact`}
            onClick={() => track(`${s.event}_cta_click`, { location: "header" })}
            className="a-btn a-btn-solid whitespace-nowrap !px-3 !py-2 text-[14px] max-[359px]:text-[13px] sm:!px-4 sm:text-[15px]"
          >
            לשיחת היכרות
          </a>
        </div>
      </div>
    </header>
  );
};

export const AutomationFooter = ({ site = "automation" }: { site?: PageKey }) => {
  const s = page(site);
  const more =
    site === "home"
      ? [
          { href: "/mobile", label: "פיתוח אפליקציות" },
          { href: "/automation", label: "אוטומציה לעסקים" },
        ]
      : [
          { href: "/", label: "עמוד הבית" },
          { href: SITES[site].other.to, label: SITES[site].other.label },
        ];
  return (
    <footer className="border-t border-[var(--a-line)] bg-[#171a19]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div className="space-y-3">
          <p className="text-lg font-bold text-[var(--a-ink)]">תום כהן</p>
          <p className="max-w-xs text-[15px] leading-relaxed text-[var(--a-muted)]">
            {s.blurb}
          </p>
        </div>
        <div className="space-y-3 text-[15px]">
          <p className="font-semibold text-[var(--a-ink)]">יצירת קשר</p>
          <ul className="space-y-2 text-[var(--a-muted)]">
            <li>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                onClick={() => track(`${s.event}_contact_click`, { method: "phone", location: "footer" })}
                className="hover:text-[var(--a-ink)]"
              >
                טלפון: <span dir="ltr">{CONTACT.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={s.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track(`${s.event}_contact_click`, { method: "whatsapp", location: "footer" })}
                className="hover:text-[var(--a-ink)]"
              >
                וואטסאפ<span className="sr-only"> (נפתח בחלון חדש)</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                onClick={() => track(`${s.event}_contact_click`, { method: "email", location: "footer" })}
                className="hover:text-[var(--a-ink)]"
              >
                דואר אלקטרוני: <span dir="ltr">{CONTACT.email}</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/tom-cohen-07778585/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track(`${s.event}_contact_click`, { method: "linkedin", location: "footer" })}
                className="hover:text-[var(--a-ink)]"
              >
                LinkedIn<span className="sr-only"> (נפתח בחלון חדש)</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-3 text-[15px]">
          <p className="font-semibold text-[var(--a-ink)]">עוד באתר</p>
          <ul className="space-y-2 text-[var(--a-muted)]">
            {more.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-[var(--a-ink)]">
                  {item.label}
                </a>
              </li>
            ))}
            {CONTENT_LINKS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-[var(--a-ink)]">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/en" lang="en" dir="ltr" className="hover:text-[var(--a-ink)]">
                English site
              </a>
            </li>
            <li>
              <a href="/automation/privacy" className="hover:text-[var(--a-ink)]">
                מדיניות פרטיות
              </a>
            </li>
            <li>
              <a href="/automation/site-map" className="hover:text-[var(--a-ink)]">
                מפת האתר
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-[var(--a-line)] py-6 text-center text-sm text-[var(--a-muted)]">
        © {new Date().getFullYear()} תום כהן
      </p>
    </footer>
  );
};

/** Hand-drawn underline, in the spirit of the chalk lines used across the main site. */
export const DoodleUnderline = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 300 14" preserveAspectRatio="none" fill="none" aria-hidden="true" className={className}>
    <path
      d="M3 9C40 5 92 4 150 6C204 8 252 4 297 7"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      className="a-draw"
    />
  </svg>
);
