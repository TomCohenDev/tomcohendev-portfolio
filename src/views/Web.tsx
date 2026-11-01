import "@/components/automation/automation.css";
import { FaqSection, ProcessSection } from "@/components/automation/Approach";
import { AutomationFooter, AutomationHeader } from "@/components/automation/Chrome";
import { Squiggle } from "@/components/automation/Doodles";
import { ContactSection } from "@/components/automation/LeadForm";
import { webFaqs, webProcess, webQuote } from "@/components/web/content";
import { WebHero } from "@/components/web/WebHero";
import { WebReviews, WebTypes } from "@/components/web/WebTypes";

// Page title and description; src/pages/web.astro puts them in the HTML head.
export const TITLE = "בניית אתרים, דפי נחיתה ומערכות ווב | תום כהן";
export const DESCRIPTION =
  "בניית אתרים לעסקים, דפי נחיתה, תיקי עבודות ומערכות SaaS: עיצוב, צד שרת, תשלומים וחיבור למערכות שלכם, מהרעיון ועד שזה באוויר.";

const Web = () => (
  <div className="automation-page min-h-screen" dir="rtl" lang="he">
    <AutomationHeader site="web" />
    <main id="main">
      <WebHero />
      <WebTypes />
      <WebReviews />
      <ProcessSection
        title="מהרעיון ועד אתר באוויר"
        intro="מתחילים מגרסה ראשונה ממוקדת ומשפרים משם. לאורך כל הדרך יש לכם קישור לאתר עצמו, כך שאתם רואים התקדמות אמיתית ולא רק מצגת."
        steps={webProcess}
      />
      <ContactSection
        site="web"
        heading={
          <>
            בואו נבנה את האתר{" "}
            <span className="relative inline-block">
              שאתם צריכים
              <Squiggle className="absolute -bottom-3 start-0 h-3 w-full text-[#f49ac1]" />
            </span>
          </>
        }
        intro="ספרו לי מה האתר צריך לעשות ולמי הוא מיועד. נבדוק יחד מה כדאי לבנות קודם, כמה זמן זה ייקח ומה זה יעלה."
        quote={webQuote}
      />
      <FaqSection items={webFaqs} />
    </main>
    <AutomationFooter site="web" />
  </div>
);

export default Web;
