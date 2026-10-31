import "@/components/automation/automation.css";
import "@/components/home/home.css";
import { AutomationFooter, AutomationHeader } from "@/components/automation/Chrome";
import { HomeHero } from "@/components/home/HomeHero";
import { ServiceBranches } from "@/components/home/ServiceBranches";
import { HomeAbout, HomeContact, HomeWork } from "@/components/home/HomeSections";
import { HomeLatest } from "@/components/home/HomeLatest";

// Page title and description; src/pages/index.astro puts them in the HTML head.
export const TITLE = "תום כהן · פיתוח Fullstack, אוטומציה ו-AI | חדשות, מדריכים וכלים למפתחים";
export const DESCRIPTION =
  "תום כהן, פיתוח Fullstack, אוטומציה ו-AI: חדשות יומיות, מדריכים וכלים למפתחים, וגם בניית אפליקציות ואוטומציות לעסקים, מהאפיון ועד שזה עובד.";

const Home = () => (
  <div className="automation-page min-h-screen" dir="rtl" lang="he">
    <AutomationHeader site="home" />
    <main id="main">
      <HomeHero />
      <ServiceBranches />
      <HomeWork />
      <HomeAbout />
      <HomeLatest />
      <HomeContact />
    </main>
    <AutomationFooter site="home" />
  </div>
);

export default Home;
