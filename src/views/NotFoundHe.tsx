import "@/components/automation/automation.css";
import { AutomationFooter, AutomationHeader } from "@/components/automation/Chrome";

export const TITLE = "העמוד לא נמצא | תום כהן";
export const DESCRIPTION = "העמוד שחיפשתם לא קיים. אפשר לחזור לעמוד הבית או לעבור לאחד השירותים.";

/** Served by Workers Assets for any path without a file (not_found_handling: "404-page" in wrangler.jsonc). */
const NotFoundHe = () => (
  <div className="automation-page flex min-h-screen flex-col" dir="rtl" lang="he">
    <AutomationHeader onLanding={false} site="home" />
    <main id="main" className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <p className="a-hand text-[64px] leading-none text-[var(--a-accent)]">404</p>
      <h1 className="a-h2 mt-4">העמוד הזה לא נמצא</h1>
      <p className="mt-4 text-lg leading-relaxed text-[var(--a-muted)]">אולי הקישור ישן, או שהייתה טעות קטנה בכתובת.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a href="/" className="a-btn a-btn-solid">
          לעמוד הבית
        </a>
        <a href="/mobile" className="a-btn a-btn-ghost">
          פיתוח אפליקציות
        </a>
        <a href="/automation" className="a-btn a-btn-ghost">
          אוטומציה לעסקים
        </a>
      </div>
      <p lang="en" dir="ltr" className="mt-10 text-[15px] text-[var(--a-muted)]">
        Looking for the English site?{" "}
        <a href="/en" className="text-[var(--a-accent)] underline underline-offset-2">
          tomcohen.dev/en
        </a>
      </p>
    </main>
    <AutomationFooter site="home" />
  </div>
);

export default NotFoundHe;
