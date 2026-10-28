import { useEffect, useState } from "react";
import "@/components/automation/automation.css";
import { AutomationFooter, AutomationHeader } from "@/components/automation/Chrome";
import { Hero } from "@/components/automation/Hero";
import { MarketContext, PainBoard } from "@/components/automation/Problem";
import { Capabilities, WorkSection } from "@/components/automation/Work";
import { ApproachSection, FaqSection, ProcessSection, TrustSection } from "@/components/automation/Approach";
import { ContactSection } from "@/components/automation/LeadForm";

const TITLE = "אוטומציה לעסקים וליחידים | תום כהן";
const DESCRIPTION =
  "אפיון ובניית אוטומציות, חיבור בין מערכות וכלים פנימיים שמצמצמים עבודה ידנית. מתחילים מתהליך ממוקד, בודקים ומטמיעים בצורה ברורה.";
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&family=Rubik:wght@400;500;600;700;800&display=swap";

/**
 * Applies Hebrew document settings while the page is mounted. dist/automation.html already ships
 * them for direct visits; this covers in-app navigation from the English pages.
 */
const useHebrewDocument = () => {
  useEffect(() => {
    const html = document.documentElement;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prev = { lang: html.lang, dir: html.dir, title: document.title, description: meta?.content };

    html.lang = "he";
    html.dir = "rtl";
    document.title = TITLE;
    if (meta) meta.content = DESCRIPTION;

    if (!document.querySelector(`link[href="${FONTS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = FONTS_HREF;
      document.head.appendChild(link);
    }

    return () => {
      html.lang = prev.lang || "en";
      html.dir = prev.dir || "ltr";
      document.title = prev.title;
      if (meta && prev.description) meta.content = prev.description;
    };
  }, []);
};

const Automation = () => {
  useHebrewDocument();
  const [seed, setSeed] = useState<string[]>([]);

  return (
    <div className="automation-page min-h-screen" dir="rtl" lang="he">
      <AutomationHeader />
      <main id="main">
        <Hero />
        <PainBoard onUse={setSeed} />
        <MarketContext />
        <Capabilities />
        <WorkSection />
        <ProcessSection />
        <ApproachSection />
        <TrustSection />
        <FaqSection />
        <ContactSection seed={seed} />
      </main>
      <AutomationFooter />
    </div>
  );
};

export default Automation;
