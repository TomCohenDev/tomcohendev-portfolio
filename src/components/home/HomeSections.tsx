import { ArrowLeft, Mail, MessageCircle, Phone, Quote } from "lucide-react";
import { track } from "@/lib/analytics";
import { Squiggle } from "../automation/Doodles";
import { CONTACT } from "../automation/content";
import { aboutFacts, HOME_WHATSAPP, reviews, work } from "./content";

export const HomeWork = () => (
  <section id="work" aria-labelledby="work-title" className="border-t border-[var(--a-line)] py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <p className="a-kicker">עבודות</p>
      <h2 id="work-title" className="a-h2 max-w-3xl">
        כמה דברים שבניתי
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--a-muted)]">
        אפליקציות שנמצאות בחנויות ותהליכים שרצים כל יום. הסיפור המלא של כל אחד נמצא בעמוד של התחום שלו.
      </p>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {work.map((item) => (
          <li key={item.key}>
            <a href={item.href} className="a-card group flex h-full flex-col transition-colors hover:border-[rgba(191,149,249,0.55)]">
              <span className="a-hand text-[17px] text-[var(--a-human)]">{item.kind}</span>
              <span className="mt-1 text-xl font-medium leading-snug text-[var(--a-ink)]">{item.name}</span>
              <span className="mt-1 text-[15px] text-[var(--a-accent)]">{item.title}</span>
              <span className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--a-muted)]">{item.body}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-[14px] text-[var(--a-accent)]">
                לסיפור המלא
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <h3 className="mt-20 text-2xl font-medium text-[var(--a-ink)]">מה אומרים עליי</h3>
      <ul className="mt-6 grid gap-5 md:grid-cols-2">
        {reviews.map((r) => (
          <li key={r.name}>
            <figure className="a-card h-full">
              <Quote className="h-6 w-6 text-[var(--a-accent)]" aria-hidden="true" />
              <blockquote className="mt-3 text-[16px] leading-relaxed text-[var(--a-ink)]">{r.quote}</blockquote>
              <figcaption className="mt-4 text-[15px] text-[var(--a-muted)]">
                <bdi>{r.name}</bdi>
                {r.source && (
                  <>
                    {" · "}
                    <bdi>{r.source}</bdi>
                  </>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const HomeAbout = () => (
  <section id="about" aria-labelledby="about-title" className="a-grid-bg border-t border-[var(--a-line)] py-20 md:py-28">
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.3fr]">
      <div className="relative mx-auto w-full max-w-[22rem]">
        <img
          src="/tom_face.webp"
          alt="תום כהן"
          width={383}
          height={383}
          loading="lazy"
          className="aspect-square w-full -rotate-2 rounded-[2rem] border-2 border-[rgba(191,149,249,0.45)] object-cover"
        />
      </div>
      <div>
        <p className="a-kicker">קצת עליי</p>
        <h2 id="about-title" className="a-h2">
          נעים מאוד, אני{" "}
          <span className="relative inline-block">
            תום
            <Squiggle className="absolute -bottom-3 start-0 h-3 w-full text-[#f49ac1]" />
          </span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--a-muted)]">
          מפתח <bdi>Full-stack</bdi> שבונה מוצרים מקצה לקצה: אפליקציות, מערכות ווב, AI ואוטומציה. עבדתי עם אנשים פרטיים, עסקים
          קטנים, וסטארטאפים קטנים וגדולים.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-[var(--a-muted)]">
          מה שחשוב לי: להבין קודם מה הבעיה, לבנות את הדבר הנכון ולא את הכי מסובך, ולמסור משהו שבאמת עובד, לא רק הדגמה.
        </p>
        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {aboutFacts.map((f) => (
            <div key={f.label} className="rounded-2xl border border-[var(--a-line)] bg-[#222524] p-4">
              <dt className="text-2xl font-medium text-[var(--a-human)]">{f.value}</dt>
              <dd className="mt-1 text-[14px] leading-snug text-[var(--a-muted)]">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
);

const contactLinks = [
  {
    href: HOME_WHATSAPP,
    method: "whatsapp",
    icon: MessageCircle,
    label: "וואטסאפ",
    detail: "הכי מהיר",
    external: true,
  },
  { href: `tel:${CONTACT.phoneTel}`, method: "phone", icon: Phone, label: "טלפון", detail: CONTACT.phoneDisplay, external: false },
  { href: `mailto:${CONTACT.email}`, method: "email", icon: Mail, label: "דואר אלקטרוני", detail: CONTACT.email, external: false },
] as const;

export const HomeContact = () => (
  <section id="contact" aria-labelledby="contact-title" className="border-t border-[var(--a-line)] py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="a-kicker">יצירת קשר</p>
        <h2 id="contact-title" className="a-h2">
          יש לכם רעיון או תהליך{" "}
          <span className="relative inline-block">
            שמעיק?
            <Squiggle className="absolute -bottom-3 start-0 h-3 w-full text-[#f49ac1]" />
          </span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--a-muted)]">
          ספרו לי במה מדובר, ונבדוק יחד מה כדאי לבנות. שיחת ההיכרות הראשונה בחינם וללא התחייבות.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
        <a href="/mobile#contact" className="a-card group transition-colors hover:border-[rgba(191,149,249,0.55)]">
          <span className="text-xl font-medium text-[var(--a-ink)]">טופס לאפליקציה</span>
          <span className="mt-2 block text-[15px] leading-relaxed text-[var(--a-muted)]">
            מה האפליקציה צריכה לעשות, למי היא מיועדת ומה כבר קיים.
          </span>
          <span className="mt-4 inline-flex items-center gap-1 text-[14px] text-[var(--a-accent)]">
            לטופס
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          </span>
        </a>
        <a href="/automation#contact" className="a-card group transition-colors hover:border-[rgba(191,149,249,0.55)]">
          <span className="text-xl font-medium text-[var(--a-ink)]">טופס לאוטומציה</span>
          <span className="mt-2 block text-[15px] leading-relaxed text-[var(--a-muted)]">
            איזה תהליך הייתם רוצים לשפר ובאילו כלים אתם משתמשים היום.
          </span>
          <span className="mt-4 inline-flex items-center gap-1 text-[14px] text-[var(--a-accent)]">
            לטופס
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          </span>
        </a>
      </div>

      <ul className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
        {contactLinks.map(({ href, method, icon: Icon, label, detail, external }) => (
          <li key={method}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => track("home_contact_click", { method, location: "contact" })}
              className="flex items-center gap-3 rounded-2xl border border-[var(--a-line)] p-4 transition-colors hover:border-[var(--a-accent)]"
            >
              <Icon className="h-5 w-5 shrink-0 text-[var(--a-accent)]" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-[15px] text-[var(--a-ink)]">
                  {label}
                  {external && <span className="sr-only"> (נפתח בחלון חדש)</span>}
                </span>
                <span dir={method === "whatsapp" ? undefined : "ltr"} className="block truncate text-right text-[14px] text-[var(--a-muted)]">
                  {detail}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
