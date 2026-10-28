import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bot, FileText, Hand, LayoutDashboard, Link2, Sparkles, UserRound, Users } from "lucide-react";
import { track } from "@/lib/analytics";
import { capabilities, caseKindLabel, caseStudies, scenarios, type CaseStudy } from "./content";

const CAPABILITY_ICONS = {
  connect: Link2,
  leads: Users,
  docs: FileText,
  tools: LayoutDashboard,
  ai: Sparkles,
  personal: UserRound,
} as const;

/** Fires one analytics event the first time an element is mostly on screen. */
const useSeenOnce = (event: string, props: Record<string, string>) => {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track(event, props);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
};

export const Capabilities = () => (
  <section id="build" aria-labelledby="build-title" className="border-t border-[var(--a-line)] bg-[#171a19]">
    <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <p className="a-kicker">מה אפשר לבנות</p>
      <h2 id="build-title" className="a-h2 max-w-3xl">
        לא חבילות מוכנות. פתרון שמתאים לתהליך שלכם.
      </h2>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap) => {
          const Icon = CAPABILITY_ICONS[cap.id];
          return (
            <li key={cap.id} className="a-card">
              <Icon className="h-6 w-6 text-[var(--a-accent)]" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-bold text-[var(--a-ink)]">{cap.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-[var(--a-muted)]">{cap.body}</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-8 max-w-3xl text-[16px] leading-relaxed text-[var(--a-ink)]">
        הפתרון המדויק נקבע אחרי שמבינים את התהליך, את המערכות הקיימות, את רגישות המידע ואת היקף השימוש.
      </p>
    </div>
  </section>
);

const KindBadge = ({ kind }: { kind: CaseStudy["kind"] }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
      kind === "client"
        ? "bg-[var(--a-accent)] text-[#1D201F]"
        : kind === "in-development"
          ? "border border-dashed border-[var(--a-muted)]/60 text-[var(--a-muted)]"
          : "border border-[var(--a-accent)]/50 text-[var(--a-accent)]"
    }`}
  >
    {caseKindLabel[kind]}
  </span>
);

const Systems = ({ items }: { items: string[] }) => (
  <ul className="flex flex-wrap gap-1.5" aria-label="מה מחובר">
    {items.map((s) => (
      <li key={s} className="rounded-md border border-[var(--a-line)] bg-[var(--a-ink)]/[0.06] px-2 py-1 text-[13px] text-[var(--a-ink)]/90">
        <bdi>{s}</bdi>
      </li>
    ))}
  </ul>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <dt className="text-[13px] font-semibold text-[var(--a-accent)]">{label}</dt>
    <dd className="mt-1 text-[16px] leading-relaxed text-[var(--a-ink)]/90">{children}</dd>
  </div>
);

const HumanNote = ({ text }: { text: string }) => (
  <div className="flex gap-3 rounded-xl border border-[var(--a-human)]/35 bg-[var(--a-human)]/[0.06] px-4 py-3">
    <Hand className="mt-0.5 h-4 w-4 flex-none text-[var(--a-human)]" aria-hidden="true" />
    <p className="text-[15px] leading-relaxed text-[var(--a-ink)]">
      <span className="font-semibold">מה נשאר בידי אדם: </span>
      {text}
    </p>
  </div>
);

const CaseLink = ({ study }: { study: CaseStudy }) =>
  study.link ? (
    <Link
      to={study.link.href}
      onClick={() => track("automation_case_study_view", { case: study.id, action: "open_full" })}
      className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--a-accent)] hover:underline"
    >
      {study.link.label}
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
    </Link>
  ) : null;

/** The Nightwing order flow, redrawn from the n8n workflow file (nightwing-api.json). */
const NightwingFlow = () => {
  const node = "rounded-lg border border-[var(--a-line)] bg-[#1D201F] px-3 py-2.5 text-center text-[14px] leading-snug text-[var(--a-ink)]";
  const down = (
    <li aria-hidden="true" className="text-center leading-none text-[var(--a-muted)]">
      ↓
    </li>
  );
  return (
    <figure className="rounded-2xl border border-[var(--a-line)] bg-[#171a19] p-5">
      <figcaption className="mb-4 text-[13px] text-[var(--a-muted)]">
        מסלול ההזמנה, כפי שהוא מוגדר בתהליך ב־<bdi>n8n</bdi>
      </figcaption>
      <ol className="grid gap-2">
        <li className={node}>הלקוח מזמין באתר</li>
        {down}
        <li className={`${node} border-[var(--a-accent)]/50`}>
          מספר הזמנה ופירוק הקומבו לרכיבים
          <span className="mt-0.5 block text-[12px] text-[var(--a-muted)]">
            תהליך אוטומטי ב־<bdi>n8n</bdi>
          </span>
        </li>
        {down}
        <li className="grid grid-cols-2 gap-2">
          <span className={node}>
            הודעה למטבח
            <span className="block text-[12px] text-[var(--a-muted)]">
              <bdi>Telegram</bdi>
            </span>
          </span>
          <span className={node}>
            רישום הזמנה + גיבוי
            <span className="block text-[12px] text-[var(--a-muted)]">
              <bdi>Google Sheets</bdi>
            </span>
          </span>
        </li>
      </ol>
      <p className="mt-3 rounded-lg border border-dashed border-red-300/40 px-3 py-2 text-center text-[13px] text-[var(--a-ink)]/85">
        אם שלב נכשל: התראת שגיאה נשלחת לצוות
      </p>
    </figure>
  );
};

const FeaturedCase = ({ study }: { study: CaseStudy }) => {
  const ref = useSeenOnce("automation_case_study_view", { case: study.id, action: "seen" });
  return (
    <article ref={ref as React.RefObject<HTMLElement>} aria-labelledby={`case-${study.id}`} className="a-card !p-0 overflow-hidden">
      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        <div className="space-y-6 p-6 md:p-9">
          <div className="flex flex-wrap items-center gap-3">
            <KindBadge kind={study.kind} />
            <span className="text-[14px] text-[var(--a-muted)]">{study.context}</span>
          </div>
          <h3 id={`case-${study.id}`} className="text-3xl font-extrabold text-[var(--a-ink)]">
            <bdi>{study.name}</bdi>: הזמנות שמגיעות למטבח לבד
          </h3>
          <dl className="space-y-5">
            <Row label="בשביל מי">{study.audience}</Row>
            <Row label="האתגר">{study.challenge}</Row>
            <Row label="הפתרון">{study.solution}</Row>
            <Row label="התוצאה">{study.result}</Row>
          </dl>
          <HumanNote text={study.human} />
          {study.status && <p className="text-[14px] leading-relaxed text-[var(--a-muted)]">{study.status}</p>}
          <CaseLink study={study} />
        </div>
        <div className="space-y-5 border-t border-[var(--a-line)] bg-[#1a1d1c] p-6 md:p-9 lg:border-s lg:border-t-0">
          <NightwingFlow />
          {study.images
            ?.filter((img) => !img.wide)
            .map((img) => (
              <figure key={img.src}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={img.width}
                  height={img.height}
                  className="mx-auto h-auto max-h-[440px] w-auto rounded-xl border border-[var(--a-line)]"
                />
                <figcaption className="mt-2 text-center text-[13px] text-[var(--a-muted)]">{img.caption}</figcaption>
              </figure>
            ))}
          <Systems items={study.systems} />
        </div>
      </div>
      {study.images
        ?.filter((img) => img.wide)
        .map((img) => (
          <figure key={img.src} className="border-t border-[var(--a-line)] bg-[#1a1d1c] p-6 md:p-9">
            <div tabIndex={0} role="region" aria-label="גיליון ההזמנות, אפשר לגלול לצדדים" className="overflow-x-auto rounded-xl border border-[var(--a-line)]">
              <img src={img.src} alt={img.alt} loading="lazy" width={img.width} height={img.height} className="h-auto w-full min-w-[640px]" />
            </div>
            <figcaption className="mt-3 text-[14px] text-[var(--a-muted)]">{img.caption}</figcaption>
          </figure>
        ))}
    </article>
  );
};

const CaseCard = ({ study, wide }: { study: CaseStudy; wide?: boolean }) => {
  const ref = useSeenOnce("automation_case_study_view", { case: study.id, action: "seen" });
  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby={`case-${study.id}`}
      className={`a-card flex flex-col gap-5 ${wide ? "md:col-span-2" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <KindBadge kind={study.kind} />
        <span className="text-[14px] text-[var(--a-muted)]">
          <bdi>{study.context}</bdi>
        </span>
      </div>
      <h3 id={`case-${study.id}`} className="text-2xl font-bold text-[var(--a-ink)]">
        {study.name}
      </h3>
      <dl className={`grid gap-5 ${wide ? "md:grid-cols-3" : ""}`}>
        <Row label="האתגר">{study.challenge}</Row>
        <Row label="הפתרון">{study.solution}</Row>
        <Row label="התוצאה">{study.result}</Row>
      </dl>
      <HumanNote text={study.human} />
      {study.status && (
        <p className="text-[14px] font-medium text-[var(--a-muted)]">
          <span className="text-[var(--a-ink)]">סטטוס: </span>
          {study.status}
        </p>
      )}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-1">
        <Systems items={study.systems} />
        <CaseLink study={study} />
      </div>
    </article>
  );
};

export const WorkSection = () => {
  const [featured, ...rest] = caseStudies;
  const inDev = rest.filter((c) => c.kind === "in-development");
  const others = rest.filter((c) => c.kind !== "in-development");

  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-[var(--a-line)]">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
        <p className="a-kicker">עבודות</p>
        <h2 id="work-title" className="a-h2 max-w-3xl">
          אוטומציות שבניתי ועובדות
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--a-muted)]">
          פרויקט אחד ללקוח, וכמה כלים שבניתי למוצרים שלי ולעבודה שלי. ליד כל אחד כתוב בדיוק מה הוא, מה נבנה, ומה
          נשאר בידיים של אדם.
        </p>

        <div className="mt-12 space-y-5">
          <FeaturedCase study={featured} />
          <div className="grid gap-5 md:grid-cols-2">
            {others.map((study) => (
              <CaseCard key={study.id} study={study} />
            ))}
            {inDev.map((study) => (
              <CaseCard key={study.id} study={study} wide />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-[var(--a-ink)] md:text-3xl">תרחישים נפוצים, להמחשה</h3>
              <p className="mt-2 text-[16px] text-[var(--a-muted)]">
                אלה דוגמאות לתהליכים שאפשר לבנות. הם לא עבודות לקוח ולא מבוססים על נתוני לקוח.
              </p>
            </div>
            <Bot className="hidden h-8 w-8 text-[var(--a-muted)] md:block" aria-hidden="true" />
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {scenarios.map((sc) => (
              <li key={sc.id} className="rounded-2xl border border-dashed border-[var(--a-line)] p-5">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-lg font-bold text-[var(--a-ink)]">{sc.title}</h4>
                  <span className="text-xs text-[var(--a-muted)]">תרחיש לדוגמה</span>
                </div>
                <ol className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[14px]">
                  {sc.steps.map((step, i) => (
                    <li key={step} className="flex items-center gap-1.5">
                      <span className="rounded-md bg-[var(--a-ink)]/[0.07] px-2 py-1 text-[var(--a-ink)]">{step}</span>
                      {i < sc.steps.length - 1 && (
                        <span aria-hidden="true" className="text-[var(--a-muted)]">
                          ←
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 flex items-center gap-2 text-[14px] text-[var(--a-ink)]/85">
                  <Hand className="h-4 w-4 text-[var(--a-human)]" aria-hidden="true" />
                  בידי אדם: {sc.human}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
