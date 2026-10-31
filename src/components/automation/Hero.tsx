import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { DoodleUnderline } from "./Chrome";
import { CONTACT } from "./content";
import { AutomationHub } from "./Hub";

export const Hero = () => (
  <section aria-labelledby="hero-title" className="a-grid-bg relative overflow-hidden">
    <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 pb-24 pt-14 md:px-8 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pt-10 lg:gap-12 lg:pb-32 xl:px-12">
      {/* The text column is a size container, so the headline can scale to fit its width. */}
      <div className="[container-type:inline-size]">
        <p className="a-hand mb-3 text-[22px] text-[var(--a-accent)]">תום כהן · מפתח אוטומציות לעסקים</p>
        <h1 id="hero-title" className="text-[clamp(1.9rem,9cqi,3.6rem)] font-medium leading-[1.12] text-[var(--a-ink)]">
          <span className="block text-balance">פחות עבודה ידנית</span>
          <span className="block text-balance">אוטומציה לעסקים וליחידים</span>
        </h1>
        <p className="mt-6 text-2xl font-medium leading-snug text-[var(--a-ink)] md:text-[1.9rem]">
          תנו ל־AI לעבוד בשבילכם{" "}
          <span className="relative inline-block whitespace-nowrap">
            ולחסוך לכם כסף!
            <DoodleUnderline className="absolute -bottom-2 start-0 h-2.5 w-full text-[var(--a-accent)]" />
            <DoodleUnderline className="absolute -bottom-[1.05rem] end-0 h-2.5 w-[88%] -scale-x-100 text-[#f49ac1] [&_path]:[animation-delay:0.8s]" />
          </span>
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#contact" onClick={() => track("automation_cta_click", { location: "hero" })} className="a-btn a-btn-solid">
            בואו נבדוק מה אפשר להפוך לאוטומטי
          </a>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("automation_contact_click", { method: "whatsapp", location: "hero" })}
            className="a-btn a-btn-ghost"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            דברו איתי בוואטסאפ<span className="sr-only"> (נפתח בחלון חדש)</span>
          </a>
        </div>
      </div>
      <AutomationHub />
    </div>
  </section>
);
