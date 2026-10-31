import type { ReactNode } from "react";
import "../automation/automation.css";
import "./content.css";
import { AutomationFooter, AutomationHeader } from "../automation/Chrome";

/** Shell of the blog, news and courses pages: the homepage menu, a demo note on mock pages, and the footer. */
export const ContentPage = ({ demo = false, children }: { demo?: boolean; children: ReactNode }) => (
  <div className="automation-page min-h-screen" dir="rtl" lang="he">
    <AutomationHeader onLanding={false} site="home" />
    {demo && <DemoBanner />}
    <main id="main">{children}</main>
    <AutomationFooter site="home" />
  </div>
);

export const DemoBanner = () => (
  <div role="note" className="border-b border-dashed border-[rgba(242,196,109,0.45)] bg-[rgba(242,196,109,0.08)]">
    <p className="mx-auto max-w-6xl px-5 py-2.5 text-center text-[14px] text-[var(--a-human)] md:px-8">
      <span className="font-medium">עמוד לדוגמה.</span> התוכן כאן הוא דמה, כדי לראות איך העמוד ייראה. המאמרים, המפגשים והתאריכים אינם אמיתיים.
    </p>
  </div>
);

/** Page title block shared by the three sections. */
export const PageIntro = ({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) => (
  <div className="max-w-3xl">
    <p className="a-kicker">{kicker}</p>
    <h1 className="text-[clamp(2.3rem,5.5vw,3.8rem)] font-medium leading-[1.1] text-[var(--a-ink)]">{title}</h1>
    {children && <div className="mt-5 text-lg leading-relaxed text-[var(--a-muted)] md:text-xl">{children}</div>}
  </div>
);

export const Tag = ({ children, color = "var(--a-accent)" }: { children: ReactNode; color?: string }) => (
  <span
    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[13px] leading-6"
    style={{ borderColor: `color-mix(in srgb, ${color} 45%, transparent)`, color }}
  >
    {children}
  </span>
);
