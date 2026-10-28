import { useEffect, useRef, useState } from "react";
import { Check, Quote } from "lucide-react";
import { SketchArrow } from "../automation/Doodles";
import { usePrefersReducedMotion } from "../automation/useReducedMotion";
import { LIGHT_TOP, stories } from "./content";
import { Phone } from "./Phone";
import { AppIcon, AppScreen } from "./Screens";

/**
 * The apps, one per scroll step. On wide screens a single phone stays in place beside the text and
 * switches app as each step reaches the middle of the screen, sliding screens like app navigation and
 * tilting slightly with the scroll. On phones every step shows its own phone above the text.
 */
export const PhoneStory = () => {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let index = 0;
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= mid) index = i;
      });
      setActive(index);

      const tilt = tiltRef.current;
      const step = stepRefs.current[index];
      if (!tilt || !step) return;
      if (reduced) {
        tilt.style.transform = "";
        return;
      }
      // Progress through the current step, 0 to 1: the phone turns a little from one side to the other.
      const rect = step.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (mid - rect.top) / rect.height));
      tilt.style.transform = `perspective(1600px) rotateY(${((0.5 - p) * 18).toFixed(2)}deg) rotateX(${(5 - p * 4).toFixed(2)}deg)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const goTo = (i: number) =>
    stepRefs.current[i]?.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });

  const current = stories[active];

  return (
    <section id="apps" aria-labelledby="apps-title" className="border-t border-[var(--a-line)]">
      <div className="mx-auto max-w-6xl px-5 pt-24 text-center md:px-8">
        <h2 id="apps-title" className="a-h2">
          אפליקציות שבניתי
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[var(--a-muted)]">
          <span className="hidden lg:inline">גללו, והטלפון יעבור בין האפליקציות. </span>
          המסכים הם איורים של האפליקציות האמיתיות.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1240px] px-5 pb-12 md:px-8 lg:grid-cols-2 lg:gap-6 lg:pb-0">
        <ol>
          {stories.map((s, i) => (
            <li
              key={s.id}
              ref={(el) => (stepRefs.current[i] = el)}
              className="flex flex-col justify-center py-14 lg:min-h-[86vh] lg:py-20"
            >
              <div className="mb-10 lg:hidden">
                <div className="m-float mx-auto w-[min(62vw,15rem)]" style={{ animationDelay: `${-i * 0.9}s` }}>
                  <Phone statusDark={LIGHT_TOP.includes(s.id)} label={`איור של מסך מתוך ${s.name}`}>
                    <div className={`absolute inset-0 ${i === active ? "m-live" : ""}`}>
                      <AppScreen id={s.id} />
                    </div>
                  </Phone>
                </div>
              </div>

              <p className="a-kicker flex items-center gap-3">
                <AppIcon id={s.id} className="h-9 w-9" />
                <bdi>{s.name}</bdi>
              </p>
              <h3 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-medium leading-tight text-[var(--a-ink)]">{s.title}</h3>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--a-muted)] max-md:mx-auto">{s.body}</p>
              <ul className="mt-6 grid max-w-md grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] text-[var(--a-ink)] max-md:mx-auto">
                {s.built.map((b) => (
                  <li key={b} className="flex items-center gap-2 max-md:justify-center">
                    <Check className="h-4 w-4 shrink-0 text-[var(--a-ok)]" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              {s.tech.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2 lg:hidden" aria-label="טכנולוגיות">
                  {s.tech.map((t) => (
                    <li key={t} dir="ltr" className="rounded-full border border-[var(--a-line)] px-3 py-1 text-[13px] text-[var(--a-muted)]">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {s.review && (
                <figure className="mt-8 max-w-xl rounded-2xl border border-[var(--a-accent)]/25 bg-[#222524] p-5 max-md:mx-auto">
                  <Quote className="h-5 w-5 text-[var(--a-accent)] max-md:mx-auto" aria-hidden="true" />
                  <blockquote className="mt-2 text-[16px] leading-relaxed text-[var(--a-ink)]">{s.review.quote}</blockquote>
                  <figcaption className="mt-2 text-[14px] text-[var(--a-muted)]">
                    <bdi>{s.review.name}</bdi> · <bdi>{s.name}</bdi>
                  </figcaption>
                </figure>
              )}
            </li>
          ))}
        </ol>

        <div className="relative hidden lg:block">
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center justify-center">
            <div className="relative">
              <nav aria-label="מעבר בין האפליקציות" className="absolute right-full top-1/2 mr-12 -translate-y-1/2 xl:mr-16">
                <ul className="flex flex-col gap-3.5">
                  {stories.map((s, i) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={s.name}
                        aria-current={i === active ? "step" : undefined}
                        title={s.name}
                        className={`block rounded-[24%] transition duration-300 ${
                          i === active
                            ? "scale-110 ring-2 ring-[var(--a-accent)] ring-offset-4 ring-offset-[#1d201f]"
                            : "opacity-45 hover:opacity-90"
                        }`}
                      >
                        <AppIcon id={s.id} className="h-10 w-10" />
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="m-float">
                <div ref={tiltRef} className="transition-transform duration-300 ease-out">
                  <Phone
                    statusDark={LIGHT_TOP.includes(current.id)}
                    label={`איור של מסך מתוך ${current.name}`}
                    className="h-[min(40rem,calc(100vh-10rem))] w-auto"
                  >
                    {stories.map((s, i) => (
                      <div
                        key={s.id}
                        className={`m-screen ${i === active ? "m-live" : ""}`}
                        data-pos={i < active ? "before" : i === active ? "current" : "after"}
                      >
                        <AppScreen id={s.id} />
                      </div>
                    ))}
                  </Phone>
                </div>
              </div>
              <div aria-hidden="true" className="mx-auto mt-7 h-4 w-[70%] rounded-[50%] bg-black/45 blur-md" />

              {/* Handwritten note and the tech used, beside the phone. Keyed so they redraw on every switch. */}
              <div key={current.id} aria-hidden="true" className="absolute left-full top-[13%] ml-6 w-40 xl:ml-10">
                <p className="m-note a-hand text-[22px] leading-snug text-[var(--a-human)]">{current.note}</p>
                <SketchArrow className="m-note mt-1 h-9 w-16 text-[var(--a-human)]" style={{ animationDelay: "0.15s" }} />
              </div>
              {current.tech.length > 0 && (
                <ul key={`${current.id}-tech`} className="absolute bottom-[16%] left-full ml-6 flex flex-col items-start gap-2 xl:ml-10">
                  {current.tech.map((t, i) => (
                    <li
                      key={t}
                      dir="ltr"
                      className="m-note rounded-full border border-[var(--a-line)] bg-[#222524] px-3 py-1 text-[13px] text-[var(--a-muted)]"
                      style={{ animationDelay: `${0.25 + i * 0.1}s` }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
