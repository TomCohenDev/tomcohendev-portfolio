import { useEffect, useRef, type MouseEvent, type PointerEvent, type UIEvent } from "react";
import { ArrowLeft, ArrowUpLeft, Newspaper, Rocket, Zap } from "lucide-react";
import { Tag } from "@/components/content/ContentPage";
import { usePrefersReducedMotion } from "@/components/automation/useReducedMotion";
import { formatDay } from "@/lib/dates";
import { latestIssue, topicColors, topics, type Flash, type Release, type Story } from "@/lib/news";

/** What the small parts need: a story and a flash both have these. */
type Item = Story | Flash;

const href = (item: Item) => `/news#${item.id}`;

/** The source's own image, linked to the item. `credit` puts the source's name on the image. */
const Picture = ({ item, className, credit = false }: { item: Item; className: string; credit?: boolean }) =>
  item.image ? (
    <a
      href={href(item)}
      tabIndex={-1}
      aria-hidden="true"
      className={`relative block overflow-hidden rounded-xl bg-[#222524] ${className}`}
    >
      <img
        src={item.image.url}
        alt={item.image.alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
      />
      {credit && (
        <span className="absolute bottom-3 start-3 rounded-md bg-black/70 px-2 py-0.5 text-[12px] text-white/90">
          תמונה: {item.source.name}
        </span>
      )}
    </a>
  ) : null;

const Topic = ({ item }: { item: Item }) => (
  <span className="text-[13px] font-medium" style={{ color: topicColors[item.topic] }}>
    {topics[item.topic]}
  </span>
);

const Source = ({ item, tabbable = true }: { item: Item | Release; tabbable?: boolean }) => (
  <a
    href={item.source.url}
    target="_blank"
    rel="noopener noreferrer"
    tabIndex={tabbable ? undefined : -1}
    className="inline-flex items-center gap-1 text-[13px] text-[var(--a-muted)] hover:text-[var(--a-accent)]"
  >
    {item.source.name}
    <ArrowUpLeft className="h-3 w-3" aria-hidden="true" />
    <span className="sr-only">(נפתח בחלון חדש)</span>
  </a>
);

/** One of the two stories in the middle column. */
const MiddleStory = ({ story }: { story: Story }) => (
  <article aria-labelledby={`home-${story.id}`}>
    <Picture item={story} credit className="mb-4 aspect-[16/9]" />
    <Topic item={story} />
    <h3 id={`home-${story.id}`} className="mt-1 text-[20px] font-medium leading-snug text-[var(--a-ink)]">
      <a href={href(story)} className="hover:text-[var(--a-accent)]">
        {story.headline}
      </a>
    </h3>
    <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-[var(--a-muted)]">{story.summary}</p>
    <div className="mt-2">
      <Source item={story} />
    </div>
  </article>
);

/** A line in the ticker: a story's headline, or a flash with its bolt. The copy for the loop is hidden from screen readers. */
const TickerLine = ({ entry, copy }: { entry: { story: Story } | { flash: Flash }; copy: boolean }) => {
  const item = "story" in entry ? entry.story : entry.flash;
  return (
    <li className="border-b border-[var(--a-line)] px-5 py-4" style={{ borderInlineStart: `3px solid ${topicColors[item.topic]}` }}>
      <p className="flex items-center gap-1.5">
        {"flash" in entry && (
          <>
            <Zap className="h-3.5 w-3.5 fill-[var(--a-human)] text-[var(--a-human)]" aria-hidden="true" />
            <span className="text-[13px] font-medium text-[var(--a-human)]">מבזק</span>
            <span aria-hidden="true" className="text-[var(--a-muted)]">
              ·
            </span>
          </>
        )}
        <Topic item={item} />
      </p>
      {"story" in entry ? (
        <a
          href={href(entry.story)}
          tabIndex={copy ? -1 : undefined}
          className="mt-1 block text-[16px] font-medium leading-snug text-[var(--a-ink)] hover:text-[var(--a-accent)]"
        >
          {entry.story.headline}
        </a>
      ) : (
        <p className="mt-1 text-[15px] leading-snug text-[var(--a-ink)]">{entry.flash.text}</p>
      )}
      <div className="mt-1">
        <Source item={item} tabbable={!copy} />
      </div>
    </li>
  );
};

/** After a wheel scroll or a swipe, a loop waits this long before it moves on its own again. */
const LOOP_REST_MS = 1500;

/**
 * Keeps a looping list inside its middle copy (of three), so it scrolls forever both ways: positions one copy apart look
 * the same. "Progress" is how far along the list is: scrollTop going down, or -scrollLeft, since the page is right to
 * left and scrollLeft runs from 0 down to negative values. Returns how far the scroll position jumped.
 */
const wrapLoop = (el: HTMLElement, axis: "x" | "y") => {
  const copy = el.querySelector("ul") as HTMLElement | null;
  const size = (axis === "x" ? copy?.offsetWidth : copy?.offsetHeight) ?? 0;
  if (!size) return 0;
  const before = axis === "x" ? el.scrollLeft : el.scrollTop;
  const progress = axis === "x" ? -before : before;
  const next = progress < size ? progress + size : progress > 2 * size ? progress - size : progress;
  if (next === progress) return 0;
  if (axis === "x") el.scrollLeft = -next;
  else el.scrollTop = next;
  return (axis === "x" ? el.scrollLeft : el.scrollTop) - before;
};

/**
 * A list that moves slowly on its own, sideways (x) or up (y), and that the visitor can also drag with the mouse, swipe,
 * or scroll with the wheel. It stops under the pointer, while something in it has focus, and for a moment after a wheel
 * scroll or a swipe; with reduced motion it only moves when the visitor moves it. Spread the result on the scrolling
 * element, which holds the list three times.
 */
const useLoopScroll = (axis: "x" | "y", speed: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const hover = useRef(false);
  const focus = useRef(false);
  const lastTouch = useRef(0);
  const drag = useRef<{ from: number; pos: number; moved: boolean } | null>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    wrapLoop(el, axis);

    // Up and down, the wheel scrolls the list by itself. Sideways, the wheel's up and down turns into sideways.
    const onWheel = (e: WheelEvent) => {
      lastTouch.current = performance.now();
      if (axis === "y" || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft -= e.deltaY;
      wrapLoop(el, axis);
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    let frame = 0;
    let last = performance.now();
    let carry = 0;
    const tick = (now: number) => {
      const resting = now - lastTouch.current < LOOP_REST_MS;
      if (!reduced && !hover.current && !focus.current && !drag.current && !resting) {
        carry += (speed * (now - last)) / 1000;
        const step = Math.floor(carry);
        if (step) {
          if (axis === "x") el.scrollLeft -= step;
          else el.scrollTop += step;
          carry -= step;
          wrapLoop(el, axis);
        }
      }
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("wheel", onWheel);
    };
  }, [axis, speed, reduced]);

  const at = (e: PointerEvent<HTMLDivElement>) => (axis === "x" ? e.clientX : e.clientY);
  const scrollPos = (el: HTMLElement) => (axis === "x" ? el.scrollLeft : el.scrollTop);

  return {
    ref,
    onPointerEnter: (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse") hover.current = true;
    },
    onPointerLeave: () => {
      hover.current = false;
    },
    // Mouse dragging. Touch and pen use the browser's own swipe.
    onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse" || e.button !== 0) {
        lastTouch.current = performance.now();
        return;
      }
      drag.current = { from: at(e), pos: scrollPos(e.currentTarget), moved: false };
    },
    onPointerMove: (e: PointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d) return;
      const moved = at(e) - d.from;
      if (!d.moved && Math.abs(moved) > 4) {
        d.moved = true;
        e.currentTarget.setPointerCapture(e.pointerId);
      }
      if (!d.moved) return;
      if (axis === "x") e.currentTarget.scrollLeft = d.pos - moved;
      else e.currentTarget.scrollTop = d.pos - moved;
      d.pos += wrapLoop(e.currentTarget, axis);
    },
    onPointerUp: () => {
      if (drag.current?.moved) dragged.current = true;
      drag.current = null;
    },
    onPointerCancel: () => {
      drag.current = null;
    },
    onTouchMove: () => {
      lastTouch.current = performance.now();
    },
    onScroll: (e: UIEvent<HTMLDivElement>) => {
      wrapLoop(e.currentTarget, axis);
    },
    onFocus: () => {
      focus.current = true;
    },
    onBlur: () => {
      focus.current = false;
    },
    // A drag ends with a click on whatever is under the pointer; that click should not open a link.
    onClickCapture: (e: MouseEvent<HTMLDivElement>) => {
      if (!dragged.current) return;
      e.preventDefault();
      e.stopPropagation();
      dragged.current = false;
    },
  };
};

/**
 * The left column: the other stories and the flashes, moving up on their own (see useLoopScroll): drag them, swipe them,
 * or scroll them with the wheel.
 */
const Ticker = ({ stories, flashes }: { stories: Story[]; flashes: Flash[] }) => {
  const entries = [...stories.map((story) => ({ story })), ...flashes.map((flash) => ({ flash }))];
  const key = (e: (typeof entries)[number]) => ("story" in e ? e.story.id : e.flash.id);
  const loop = useLoopScroll("y", 30);
  return (
    <aside
      aria-labelledby="ticker-title"
      className="flex flex-col overflow-hidden rounded-[1.25rem] border border-[var(--a-line)] bg-[#222524] lg:min-h-0 lg:flex-1"
    >
      <h3 id="ticker-title" className="flex items-center gap-2 border-b border-[var(--a-line)] px-5 py-4 text-[17px] font-medium text-[var(--a-ink)]">
        <Zap className="h-5 w-5 fill-[var(--a-human)] text-[var(--a-human)]" aria-hidden="true" />
        מבזקים ועוד חדשות
        <span className="text-[14px] font-normal text-[var(--a-muted)]">{entries.length}</span>
      </h3>
      {/* The scroller is absolute, so the list never sets the height: the ticker fills the row the other columns set. */}
      <div className="relative h-[460px] lg:h-auto lg:min-h-0 lg:flex-1">
        <div
          {...loop}
          className="absolute inset-0 cursor-grab select-none overflow-y-auto active:cursor-grabbing"
          style={{ scrollbarWidth: "none" }}
        >
          {[0, 1, 2].map((copy) => (
            <ul key={copy} aria-hidden={copy ? true : undefined}>
              {entries.map((e) => (
                <TickerLine key={key(e)} entry={e} copy={copy > 0} />
              ))}
            </ul>
          ))}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#222524] to-transparent" />
      </div>
    </aside>
  );
};

/**
 * A release's picture: the launch image, or else the product's own icon in the same slot, so the text lines up.
 * Shared with /news.
 */
export const ReleaseThumb = ({ release: r }: { release: Release }) =>
  r.image ? (
    <img
      src={r.image.url}
      alt={r.image.alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className="aspect-[4/3] w-24 shrink-0 self-start rounded-lg bg-[#222524] object-cover"
    />
  ) : r.icon ? (
    <span className="flex aspect-[4/3] w-24 shrink-0 items-center justify-center self-start">
      <img
        src={r.icon}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="h-[72px] w-[72px] rounded-2xl object-cover"
      />
    </span>
  ) : null;

/** One release in the strip: a box with its icon, its name, and under it what it does in one line. */
const ReleaseChip = ({ release: r, copy }: { release: Release; copy: boolean }) => (
  <li className="me-3 shrink-0">
    <a
      href={r.source.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={copy ? -1 : undefined}
      draggable={false}
      title={`${r.name}: ${r.text}`}
      className="flex w-[360px] items-center gap-3 rounded-xl border border-[var(--a-line)] bg-[#222524] px-3 py-2.5 transition-colors hover:border-[var(--a-accent)]"
    >
      {r.icon && (
        <img
          src={r.icon}
          alt=""
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          draggable={false}
          className="h-9 w-9 shrink-0 rounded-lg bg-white/5 object-cover"
        />
      )}
      {/* text-right: the name is usually English, and bdi would otherwise align it left. */}
      <span className="block min-w-0 flex-1 text-right">
        <bdi className="block truncate text-right text-[14px] font-medium leading-tight text-[var(--a-ink)]">{r.name}</bdi>
        <span className="mt-0.5 block truncate text-[13px] leading-tight text-[var(--a-muted)]">{r.text}</span>
      </span>
      <span className="sr-only">(נפתח בחלון חדש)</span>
    </a>
  </li>
);

/**
 * The row under the columns: the day's new tools and apps, one line each, moving slowly sideways on their own (see
 * useLoopScroll): drag them, swipe them, or scroll them with the wheel.
 */
const Releases = ({ releases }: { releases: Release[] }) => {
  const loop = useLoopScroll("x", 37);

  return (
    <section aria-labelledby="releases-title" className="relative mt-14 border-t border-[var(--a-line)] pt-8">
      {/* The title sits on the line, centered; its background (the page color) cuts the line around it. */}
      <h3
        id="releases-title"
        className="absolute start-1/2 top-0 flex -translate-y-1/2 translate-x-1/2 items-center gap-2 whitespace-nowrap bg-[#1d201f] px-5 text-xl font-medium text-[var(--a-ink)]"
      >
        <Rocket className="h-5 w-5 text-[var(--a-accent)]" aria-hidden="true" />
        חדש בכלים ואפליקציות
      </h3>
      <div
        {...loop}
        className="flex cursor-grab select-none overflow-x-auto active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          maskImage: "linear-gradient(to left, transparent, black 4%, black 96%, transparent)",
        }}
      >
        {[0, 1, 2].map((copy) => (
          <ul key={copy} className="flex shrink-0" aria-hidden={copy ? true : undefined}>
            {releases.map((r) => (
              <ReleaseChip key={r.id} release={r} copy={copy > 0} />
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
};

/**
 * The newest news issue as a front page, right under the hero, in three columns: the lead story, two stories, and a
 * ticker of the other stories and the flashes. Under them, the day's new tools and apps. Images come from the sources.
 */
export const HomeNews = () => {
  if (!latestIssue) return null;
  const [lead, ...others] = latestIssue.stories;
  const middle = others.slice(0, 2);
  const rest = others.slice(2);
  const flashes = latestIssue.flashes ?? [];
  const releases = latestIssue.releases ?? [];

  return (
    <section aria-labelledby="news-title" className="border-t border-[var(--a-line)] py-16 text-start md:py-20">
      <div className="mx-auto max-w-[1920px] px-5 md:px-8 xl:px-10 2xl:px-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--a-line)] pb-4">
          <div>
            <p className="a-kicker">
              <time dateTime={latestIssue.date}>{formatDay(latestIssue.date)}</time>
            </p>
            <h2 id="news-title" className="a-h2">
              חדשות <bdi>Tech</bdi> ו-<bdi>AI</bdi>
            </h2>
          </div>
          <a href="/news" className="a-btn a-btn-ghost group">
            <Newspaper className="h-5 w-5 text-[var(--a-accent)]" aria-hidden="true" />
            לגיליון המלא
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <article aria-labelledby={`home-${lead.id}`} className="lg:col-span-5">
            <Picture item={lead} credit className="aspect-[16/9]" />
            <div className={lead.image ? "mt-5" : ""}>
              <Tag color={topicColors[lead.topic]}>{topics[lead.topic]}</Tag>
              <h3
                id={`home-${lead.id}`}
                className={`mt-3 font-medium leading-tight text-[var(--a-ink)] ${lead.image ? "text-[clamp(1.6rem,2.6vw,2.3rem)]" : "text-[clamp(2rem,4.5vw,3.2rem)]"}`}
              >
                <a href={href(lead)} className="hover:text-[var(--a-accent)]">
                  {lead.headline}
                </a>
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-[var(--a-muted)]">{lead.summary}</p>
              <p className="mt-4 rounded-xl border-s-[3px] border-[var(--a-human)] bg-[rgba(242,196,109,0.07)] px-4 py-3 text-[15px] leading-relaxed text-[var(--a-ink)]">
                <span className="a-hand me-1 text-[17px] text-[var(--a-human)]">מה זה אומר לעסק:</span> {lead.forBusiness}
              </p>
              <div className="mt-3">
                <Source item={lead} />
              </div>
            </div>
          </article>

          {middle.length > 0 && (
            <div className="flex flex-col gap-8 lg:col-span-4 lg:border-s lg:border-[var(--a-line)] lg:ps-8">
              {middle.map((s, i) => (
                <div key={s.id} className={i ? "border-t border-[var(--a-line)] pt-8" : ""}>
                  <MiddleStory story={s} />
                </div>
              ))}
            </div>
          )}

          {rest.length + flashes.length > 0 && (
            <div className="flex flex-col lg:col-span-3">
              <Ticker stories={rest} flashes={flashes} />
            </div>
          )}
        </div>

        {releases.length > 0 && <Releases releases={releases} />}
      </div>
    </section>
  );
};
