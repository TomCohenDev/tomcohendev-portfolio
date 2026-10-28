import { Link } from "react-router-dom";
import { track } from "@/lib/analytics";
import { CONTACT } from "./content";

const NAV = [
  { href: "#build", label: "מה אפשר לבנות" },
  { href: "#work", label: "עבודות" },
  { href: "#process", label: "איך עובדים" },
  { href: "#faq", label: "שאלות" },
];

export const AutomationHeader = () => (
  <header className="sticky top-0 z-40 border-b border-[var(--a-line)] bg-[#1D201F]/85 backdrop-blur-md">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-[var(--a-accent)] focus:px-4 focus:py-2 focus:text-[#1D201F]"
    >
      דילוג לתוכן
    </a>
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
      <Link to="/" className="flex items-center gap-2.5" aria-label="תום כהן, לעמוד הבית">
        <img src="/icon.svg" alt="" className="h-7 w-auto" />
        <span className="text-lg font-bold text-[var(--a-ink)]">תום כהן</span>
        <span className="hidden text-sm text-[var(--a-muted)] sm:inline">· אוטומציה</span>
      </Link>
      <nav aria-label="ניווט בעמוד" className="hidden lg:block">
        <ul className="flex items-center gap-7 text-[15px] text-[var(--a-muted)]">
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-[var(--a-ink)]">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href="#contact"
        onClick={() => track("automation_cta_click", { location: "header" })}
        className="a-btn a-btn-solid !px-4 !py-2 text-[15px]"
      >
        לשיחת היכרות
      </a>
    </div>
  </header>
);

export const AutomationFooter = () => (
  <footer className="border-t border-[var(--a-line)] bg-[#171a19]">
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
      <div className="space-y-3">
        <p className="text-lg font-bold text-[var(--a-ink)]">תום כהן</p>
        <p className="max-w-xs text-[15px] leading-relaxed text-[var(--a-muted)]">
          אפיון ובנייה של אוטומציות, חיבורים בין מערכות וכלים פנימיים לעסקים ולאנשים פרטיים.
        </p>
      </div>
      <div className="space-y-3 text-[15px]">
        <p className="font-semibold text-[var(--a-ink)]">יצירת קשר</p>
        <ul className="space-y-2 text-[var(--a-muted)]">
          <li>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              onClick={() => track("automation_contact_click", { method: "phone", location: "footer" })}
              className="hover:text-[var(--a-ink)]"
            >
              טלפון: <span dir="ltr">{CONTACT.phoneDisplay}</span>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${CONTACT.email}`}
              onClick={() => track("automation_contact_click", { method: "email", location: "footer" })}
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
              onClick={() => track("automation_contact_click", { method: "linkedin", location: "footer" })}
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
          <li>
            <Link to="/" className="hover:text-[var(--a-ink)]">
              האתר הראשי (באנגלית)
            </Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="hover:text-[var(--a-ink)]">
              מדיניות פרטיות (באנגלית)
            </Link>
          </li>
          <li>
            <Link to="/navigational-policy" className="hover:text-[var(--a-ink)]">
              מפת האתר (באנגלית)
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <p className="border-t border-[var(--a-line)] py-6 text-center text-sm text-[var(--a-muted)]">
      © {new Date().getFullYear()} תום כהן
    </p>
  </footer>
);

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
