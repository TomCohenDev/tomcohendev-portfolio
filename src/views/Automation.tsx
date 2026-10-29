import { useState } from "react";
import "@/components/automation/automation.css";
import { AutomationFooter, AutomationHeader } from "@/components/automation/Chrome";
import { Hero } from "@/components/automation/Hero";
import { MarketContext, PainBoard } from "@/components/automation/Problem";
import { WorkSection } from "@/components/automation/Work";
import { ApproachSection, FaqSection, ProcessSection } from "@/components/automation/Approach";
import { ContactSection } from "@/components/automation/LeadForm";

// Page title and description; src/pages/*.astro puts them in the HTML head.
export const TITLE = "אוטומציה לעסקים וליחידים | תום כהן";
export const DESCRIPTION =
  "אפיון ובניית אוטומציות, חיבור בין מערכות וכלים פנימיים שמצמצמים עבודה ידנית. מתחילים מתהליך ממוקד, בודקים ומטמיעים בצורה ברורה.";

const Automation = () => {
  const [seed, setSeed] = useState<string[]>([]);

  return (
    <div className="automation-page min-h-screen" dir="rtl" lang="he">
      <AutomationHeader />
      <main id="main">
        <Hero />
        <PainBoard onUse={setSeed} />
        <MarketContext />
        <WorkSection />
        <ProcessSection />
        <ApproachSection />
        <ContactSection seed={seed} />
        <FaqSection />
      </main>
      <AutomationFooter />
    </div>
  );
};

export default Automation;
