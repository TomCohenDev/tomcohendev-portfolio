import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { DoodleUnderline } from "../automation/Chrome";
import { SketchArrow, SketchCircle } from "../automation/Doodles";
import { CONTACT } from "../automation/content";
import { Phone } from "./Phone";
import { AppScreen, HomeScreen } from "./Screens";

/** An iPhone and an Android phone running the same code, with handwritten labels. */
const HeroPhones = () => (
  <div aria-hidden="true" className="relative mx-auto aspect-[17/18] w-full max-w-[25rem] sm:max-w-[31rem] lg:max-w-[34rem]">
    <div className="absolute left-[5%] top-[10%] w-[39%] -rotate-[8deg]">
      <div className="m-float" style={{ animationDelay: "-3.2s" }}>
        <Phone android>
          <div className="m-live absolute inset-0">
            <AppScreen id="gomlin" />
          </div>
        </Phone>
      </div>
    </div>
    <div className="absolute right-[7%] top-[2%] w-[43%] rotate-[5deg]">
      <div className="m-float">
        <Phone>
          <div className="m-live absolute inset-0">
            <HomeScreen />
          </div>
        </Phone>
      </div>
    </div>

    <p className="a-hand absolute left-0 top-0 text-[20px] text-[var(--a-accent)] sm:text-[24px]">Android</p>
    <SketchArrow className="absolute left-[17%] top-[1%] h-7 w-12 -scale-x-100 rotate-[35deg] text-[var(--a-accent)] sm:h-8 sm:w-14" />
    <p className="a-hand absolute bottom-[14%] right-0 text-[20px] text-[#f49ac1] sm:text-[24px]">iOS</p>
    <SketchArrow className="absolute bottom-[19%] right-[4%] h-7 w-12 rotate-[200deg] text-[#f49ac1] sm:h-8 sm:w-14" />

    {/* Between the two phones, below them: one codebase for both. */}
    <div className="absolute -bottom-[9%] left-1/2 grid h-28 w-28 -translate-x-1/2 place-items-center sm:h-32 sm:w-32">
      <SketchCircle seed={1.3} className="absolute inset-0 h-full w-full text-[var(--a-human)]" />
      <p className="a-hand relative text-center text-[18px] leading-tight text-[var(--a-ink)] sm:text-[22px]">
        קוד אחד
        <br />
        <span dir="ltr" className="text-[var(--a-human)]">
          Flutter
        </span>
      </p>
    </div>
  </div>
);

export const MobileHero = () => (
  <section aria-labelledby="hero-title" className="a-grid-bg relative overflow-hidden">
    <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 pb-24 pt-14 md:px-8 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pb-28 lg:pt-12 xl:px-12">
      <div className="[container-type:inline-size]">
        <p className="a-hand mb-3 text-[22px] text-[var(--a-accent)]">תום כהן · מפתח אפליקציות</p>
        <h1 id="hero-title" className="text-[clamp(1.9rem,9cqi,3.6rem)] font-medium leading-[1.12] text-[var(--a-ink)]">
          <span className="block text-balance">האפליקציה שלכם</span>
          <span className="block text-balance">באייפון ובאנדרואיד</span>
        </h1>
        <p className="mt-6 text-2xl font-medium leading-snug text-[var(--a-ink)] md:text-[1.9rem]">
          מהרעיון{" "}
          <span className="relative inline-block whitespace-nowrap">
            ועד החנויות
            <DoodleUnderline className="absolute -bottom-2 start-0 h-2.5 w-full text-[var(--a-accent)]" />
            <DoodleUnderline className="absolute -bottom-[1.05rem] end-0 h-2.5 w-[88%] -scale-x-100 text-[#f49ac1] [&_path]:[animation-delay:0.8s]" />
          </span>
        </p>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--a-muted)] max-md:mx-auto">
          ארבע שנים של פיתוח ב־<bdi>Flutter</bdi>: קוד אחד שרץ גם באייפון וגם באנדרואיד, עם כל מה שמאחורי הקלעים, מהתחברות
          ותשלומים ועד ההעלאה ל־<bdi>App Store</bdi> ול־<bdi>Google Play</bdi>.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#contact" onClick={() => track("mobile_cta_click", { location: "hero" })} className="a-btn a-btn-solid">
            בואו נדבר על האפליקציה שלכם
          </a>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("mobile_contact_click", { method: "whatsapp", location: "hero" })}
            className="a-btn a-btn-ghost"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            דברו איתי בוואטסאפ<span className="sr-only"> (נפתח בחלון חדש)</span>
          </a>
        </div>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--a-muted)] max-md:mx-auto">
          שיחת ההיכרות הראשונה בחינם וללא התחייבות.
        </p>
      </div>
      <HeroPhones />
    </div>
  </section>
);
