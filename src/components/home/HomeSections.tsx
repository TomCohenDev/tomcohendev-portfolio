import { ArrowLeft, Check, Mail, MessageCircle, Phone, Quote } from "lucide-react";
import DynamicVisual from "@/components/DynamicVisual";
import { track } from "@/lib/analytics";
import { Squiggle } from "../automation/Doodles";
import { CONTACT } from "../automation/content";
import { AboutRoles } from "./AboutRoles";
import { HOME_WHATSAPP, reviews, work } from "./content";
import { SideDoodle } from "./SideDoodles";

export const HomeWork = () => (
  <section
    id="work"
    aria-labelledby="work-title"
    className="border-t border-[var(--a-line)] py-20 md:py-28"
  >
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <p className="a-kicker">עבודות</p>
      <h2 id="work-title" className="a-h2 max-w-3xl">
        כמה דברים שבניתי
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--a-muted)]">
        אפליקציות שנמצאות בחנויות ותהליכים שרצים כל יום. הסיפור המלא של כל אחד
        נמצא בעמוד של התחום שלו.
      </p>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {work.map((item) => (
          <li key={item.key}>
            <a
              href={item.href}
              className="a-card group flex h-full flex-col transition-colors hover:border-[rgba(191,149,249,0.55)]"
            >
              <span className="a-hand text-[17px] text-[var(--a-human)]">
                {item.kind}
              </span>
              <span className="mt-1 text-xl font-medium leading-snug text-[var(--a-ink)]">
                {item.name}
              </span>
              <span className="mt-1 text-[15px] text-[var(--a-accent)]">
                {item.title}
              </span>
              <span className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--a-muted)]">
                {item.body}
              </span>
              <span className="mt-4 inline-flex items-center gap-1 text-[14px] text-[var(--a-accent)]">
                לסיפור המלא
                <ArrowLeft
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <h3 className="mt-20 text-2xl font-medium text-[var(--a-ink)]">
        מה אומרים עליי
      </h3>
      <ul className="mt-6 grid gap-5 md:grid-cols-2">
        {reviews.map((r) => (
          <li key={r.name}>
            <figure className="a-card h-full">
              <Quote
                className="h-6 w-6 text-[var(--a-accent)]"
                aria-hidden="true"
              />
              <blockquote className="mt-3 text-[16px] leading-relaxed text-[var(--a-ink)]">
                {r.quote}
              </blockquote>
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
  <section
    id="about"
    aria-labelledby="about-title"
    className="a-grid-bg relative overflow-hidden border-t border-[var(--a-line)] py-20 md:py-24"
  >
    <SideDoodle scene="aboutLeft" side="left" />
    <SideDoodle scene="aboutRight" side="right" />
    <div className="mx-auto grid max-w-5xl items-start gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-14">
      <div className="max-w-[35rem]">
        <p className="a-kicker">קצת עליי</p>
        <h2 id="about-title" className="a-h2">
          נעים מאוד, אני{" "}
          <span className="relative inline-block">
            תום כהן
            <Squiggle className="absolute -bottom-3 start-0 h-3 w-full text-[#f49ac1]" />
          </span>
        </h2>
        <p className="mt-6 text-[17px] leading-[1.8] text-[var(--a-muted)]">
          מפתח <bdi>Full-stack</bdi>, יזם ומרצה, עם חמש שנות ניסיון בבניית
          מוצרים דיגיטליים. אני מפתח אפליקציות, מערכות ווב וכלים שמשלבים AI
          ואוטומציה, ומלווה רעיונות מהשלב שבו הם עדיין שיחה או סקיצה ועד למוצר
          שאנשים משתמשים בו.
        </p>
        <p className="mt-4 text-[17px] leading-[1.8] text-[var(--a-muted)]">
          לאורך הדרך עבדתי עם אנשים פרטיים, עסקים וסטארטאפים, ובניתי גם מוצרים
          עצמאיים משלי. כשאתה בונה מוצר משלך, אתה נדרש לחשוב על הכול: מה המשתמש
          צריך, איך הממשק ירגיש, איך המערכת תעבוד ומה יידרש כדי להמשיך לפתח
          ולתחזק אותה. זו גם הגישה שאני מביא לכל פרויקט.
        </p>
        <p className="mt-4 text-[17px] leading-[1.8] text-[var(--a-muted)]">
          לצד הפיתוח, אני מרצה בתחומי התכנות וההנדסה, מלווה פרויקטי גמר ומפתח
          ומעביר קורסים לשימוש מעשי ב־AI. אני גם יוצר תוכן בתחומים שלי,
          למפתחים וגם למי שלא מגיע מעולם הפיתוח. אני נהנה לפרק נושאים מורכבים
          לחלקים ברורים, לחבר בין התאוריה לעבודה בשטח ולעזור לאנשים להגיע לשלב
          שבו הם יכולים לבנות ולפתור בעצמם.
        </p>
      </div>
      {/* The doodle stands on the section's bottom edge, as on the landing pages. */}
      <div className="flex flex-col items-center gap-4 lg:self-end">
        <AboutRoles />
        <img
          src="/automation/tom.png"
          alt="איור של תום כהן מנופף לשלום"
          width={1402}
          height={1122}
          loading="lazy"
          className="-mb-20 w-52 translate-y-[2.32%] drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)] md:-mb-24 lg:w-56"
        />
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
    text: "וואטסאפ",
    external: true,
  },
  {
    href: `tel:${CONTACT.phoneTel}`,
    method: "phone",
    icon: Phone,
    label: "טלפון",
    text: CONTACT.phoneDisplay,
    external: false,
  },
  {
    href: `mailto:${CONTACT.email}`,
    method: "email",
    icon: Mail,
    label: "דואר אלקטרוני",
    text: CONTACT.email,
    external: false,
  },
] as const;

// The three "I want..." cards are the section's main choice.
const PICK_CARD =
  "a-card a-card-glow group flex flex-col items-center text-center transition-[transform,border-color] hover:-translate-y-1 hover:!border-[var(--a-accent)] motion-reduce:hover:translate-y-0 md:items-start md:text-start";
const PICK_TITLE = "text-2xl font-semibold text-[var(--a-ink)] md:text-xl lg:text-2xl";
const PICK_ICON =
  "mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--a-accent)] text-[#1D201F]";
// The contact buttons wear the same card as the three above.
const CONTACT_BUTTON =
  "a-card a-card-glow group flex w-full items-center justify-center gap-3 !p-4 !shadow-[0_0_0_5px_rgba(191,149,249,0.08),0_16px_44px_-18px_rgba(191,149,249,0.35)] transition-transform hover:-translate-y-1 motion-reduce:hover:translate-y-0";

/** The hero's drawing, small, showing what the card is about. `scene` is a DynamicVisual state: 1 phone, 2 web app, 4 workflow. */
const PickVisual = ({ scene }: { scene: number }) => (
  <div
    aria-hidden="true"
    className="mb-4 flex h-36 w-full items-center justify-center lg:h-40"
  >
    <DynamicVisual currentSvgIndex={scene} />
  </div>
);

const PickPoints = ({ points }: { points: string[] }) => (
  <ul className="mt-3 flex-1 space-y-2">
    {points.map((point) => (
      <li
        key={point}
        className="flex items-start justify-start gap-2 text-start text-[16px] leading-snug text-[var(--a-muted)]"
      >
        <Check
          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--a-accent)]"
          aria-hidden="true"
        />
        {point}
      </li>
    ))}
  </ul>
);

export const HomeContact = () => (
  <section
    id="contact"
    aria-labelledby="contact-title"
    className="relative overflow-hidden border-t border-[var(--a-line)] py-20 md:py-28"
  >
    <SideDoodle scene="contactLeft" side="left" />
    <SideDoodle scene="contactRight" side="right" />
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <p className="a-kicker text-center">יצירת קשר</p>
      <ul className="mx-auto mt-6 grid max-w-5xl gap-4 lg:grid-cols-3">
        {contactLinks.map(
          ({ href, method, icon: Icon, label, text, external }) => (
            <li key={method}>
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                onClick={() =>
                  track("home_contact_click", { method, location: "contact" })
                }
                className={CONTACT_BUTTON}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--a-accent)] text-[#1D201F]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                {!external && <span className="sr-only">{label}: </span>}
                <span dir={method === "whatsapp" ? undefined : "ltr"} className="min-w-0 truncate text-[17px] font-medium text-[var(--a-ink)]">
                  {text}
                </span>
                {external && <span className="sr-only"> (נפתח בחלון חדש)</span>}
              </a>
            </li>
          ),
        )}
      </ul>

      <div className="mx-auto mt-16 max-w-2xl text-center">
        <h2 id="contact-title" className="a-h2">
          מחפשים מפתח או פתרון{" "}
          <span className="relative inline-block">
            לעסק שלכם?
            <Squiggle className="absolute -bottom-3 start-0 h-3 w-full text-[#f49ac1]" />
          </span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-[var(--a-muted)]">
          ספרו לי במה מדובר, ונבדוק יחד מה כדאי לבנות.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
        <a
          href="/mobile#contact"
          className={PICK_CARD}
        >
          <PickVisual scene={1} />
          <span className={PICK_TITLE}>
            אני רוצה אפליקציה
          </span>
          <PickPoints
            points={[
              "אפליקציה לאייפון ולאנדרואיד",
              "תשלומים, צ׳אט והתראות",
              "העלאה לחנויות האפליקציות",
            ]}
          />
          <span className={PICK_ICON}>
            <ArrowLeft
              className="h-5 w-5 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </a>
        <a
          href="/automation#contact"
          className={PICK_CARD}
        >
          <PickVisual scene={4} />
          <span className={PICK_TITLE}>
            אני רוצה אוטומציה
          </span>
          <PickPoints
            points={[
              "חיבור בין המערכות שלכם",
              "סוכני AI לעבודה שחוזרת על עצמה",
              "דוחות, התראות וכלים פנימיים",
            ]}
          />
          <span className={PICK_ICON}>
            <ArrowLeft
              className="h-5 w-5 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </a>
        <a href="/web#contact" className={PICK_CARD}>
          <PickVisual scene={2} />
          <span className={PICK_TITLE}>
            אני רוצה אתר
          </span>
          <PickPoints
            points={[
              "דפי נחיתה ותיקי עבודות",
              "אתרים לעסקים",
              "חנויות אונליין",
              "דשבורדים",
              "מערכות SaaS עם תשלומים",
            ]}
          />
          <span className={PICK_ICON}>
            <ArrowLeft
              className="h-5 w-5 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </a>
      </div>
    </div>
  </section>
);
