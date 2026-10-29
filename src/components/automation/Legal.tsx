import type { ReactNode } from "react";
import "./automation.css";
import { AutomationFooter, AutomationHeader } from "./Chrome";

/** Shared layout for the Hebrew privacy policy and site map. They belong to the whole Hebrew site, so they use the homepage's menu. */
export const LegalPage = ({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) => {
  return (
    <div className="automation-page min-h-screen" dir="rtl" lang="he">
      <AutomationHeader onLanding={false} site="home" />
      <main id="main" className="mx-auto max-w-3xl px-5 pb-24 pt-16 md:px-8 md:pt-24">
        <h1 className="a-h2">{title}</h1>
        {updated && <p className="mt-3 text-[15px] text-[var(--a-muted)]">עודכן לאחרונה: {updated}</p>}
        <div className="mt-12 space-y-12">{children}</div>
      </main>
      <AutomationFooter site="home" />
    </div>
  );
};

export const LegalSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <h2 className="text-2xl font-medium text-[var(--a-ink)]">{title}</h2>
    <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-[var(--a-muted)] [&_a]:text-[var(--a-accent)] [&_a]:underline [&_a]:underline-offset-2 [&_li]:ps-1 [&_strong]:font-medium [&_strong]:text-[var(--a-ink)] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:ps-6">
      {children}
    </div>
  </section>
);
