import "@/components/automation/automation.css";
import "@/components/mobile/mobile.css";
import { AutomationFooter, AutomationHeader } from "@/components/automation/Chrome";
import { FaqSection, ProcessSection } from "@/components/automation/Approach";
import { Squiggle } from "@/components/automation/Doodles";
import { ContactSection } from "@/components/automation/LeadForm";
import { Capabilities } from "@/components/mobile/Capabilities";
import { MobileHero } from "@/components/mobile/MobileHero";
import { PhoneStory } from "@/components/mobile/PhoneStory";
import { mobileFaqs, mobileProcess, mobileQuote } from "@/components/mobile/content";

// Page title and description; src/pages/*.astro puts them in the HTML head.
export const TITLE = "פיתוח אפליקציות לאייפון ולאנדרואיד | תום כהן";
export const DESCRIPTION =
  "פיתוח אפליקציות ב־Flutter מקוד אחד לאייפון ולאנדרואיד: עיצוב, צד שרת, תשלומים, התראות והעלאה ל־App Store ול־Google Play.";

const Mobile = () => {
  return (
    <div className="automation-page min-h-screen" dir="rtl" lang="he">
      <AutomationHeader site="mobile" />
      <main id="main">
        <MobileHero />
        <PhoneStory />
        <Capabilities />
        <ProcessSection
          title="מהרעיון ועד אפליקציה בחנות"
          intro="מתחילים מגרסה ראשונה ממוקדת שאפשר להוריד מהחנות ולבדוק עם משתמשים אמיתיים, ומשפרים משם. לאורך כל הדרך אתם רואים את האפליקציה בטלפון שלכם, לא רק במצגת."
          steps={mobileProcess}
        />
        <ContactSection
          site="mobile"
          heading={
            <>
              בואו נהפוך את הרעיון שלכם{" "}
              <span className="relative inline-block">
                לאפליקציה
                <Squiggle className="absolute -bottom-3 start-0 h-3 w-full text-[#f49ac1]" />
              </span>
            </>
          }
          intro="ספרו לי מה האפליקציה צריכה לעשות ולמי היא מיועדת. נבדוק יחד מה כדאי לבנות בגרסה הראשונה, כמה זמן זה ייקח ומה זה יעלה."
          quote={mobileQuote}
        />
        <FaqSection items={mobileFaqs} />
      </main>
      <AutomationFooter site="mobile" />
    </div>
  );
};

export default Mobile;
