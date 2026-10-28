import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./useReducedMotion";

const SPEED = 40; // px per second when gliding on its own
const DRAG_THRESHOLD = 6; // px before a press counts as a drag (and the click is swallowed)

/**
 * Endless, draggable carousel. The track holds two identical copies of the list; its offset is kept
 * within one copy width, so it loops without a seam in either direction.
 *
 * - Glides on its own, and pauses while hovered, focused or being dragged.
 * - Mouse and touch drag with pointer events. `touch-action: pan-y` (in CSS) keeps vertical page
 *   scrolling on phones; horizontal swipes move the carousel.
 * - A drag doesn't trigger the link it started on.
 * - Reduced motion: no gliding, dragging still works.
 */
export const useMarquee = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLUListElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!viewport || !track || !copy) return;

    let copyWidth = copy.offsetWidth;
    let offset = 0;
    let paused = false;
    let drag: { id: number; startX: number; startOffset: number; moved: boolean } | null = null;
    let suppressClick = false;
    let last = performance.now();
    let frame = 0;

    // In RTL the second copy sits to the left of the first, so the loop runs over [0, copyWidth).
    const wrap = (v: number) => ((v % copyWidth) + copyWidth) % copyWidth;
    const paint = () => {
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (!reduced && !paused && !drag && copyWidth > 0) {
        offset = wrap(offset + SPEED * dt);
        paint();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const resize = new ResizeObserver(() => {
      copyWidth = copy.offsetWidth;
      offset = wrap(offset);
      paint();
    });
    resize.observe(copy);

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      drag = { id: e.pointerId, startX: e.clientX, startOffset: offset, moved: false };
    };
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.startX;
      if (!drag.moved && Math.abs(dx) > DRAG_THRESHOLD) {
        drag.moved = true;
        try {
          viewport.setPointerCapture(e.pointerId);
        } catch {
          // The pointer is already gone (e.g. the browser took over the gesture); keep following moves anyway.
        }
        viewport.classList.add("is-dragging");
      }
      if (drag.moved) {
        offset = wrap(drag.startOffset + dx);
        paint();
      }
    };
    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      suppressClick = drag.moved;
      drag = null;
      viewport.classList.remove("is-dragging");
      if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
    };
    const onClick = (e: MouseEvent) => {
      if (suppressClick) {
        e.preventDefault();
        e.stopPropagation();
        suppressClick = false;
      }
    };
    const pause = () => (paused = true);
    const resume = () => (paused = viewport.matches(":focus-within"));
    const onFocusOut = () => requestAnimationFrame(() => (paused = viewport.matches(":hover, :focus-within")));

    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    viewport.addEventListener("click", onClick, true);
    viewport.addEventListener("mouseenter", pause);
    viewport.addEventListener("mouseleave", resume);
    viewport.addEventListener("focusin", pause);
    viewport.addEventListener("focusout", onFocusOut);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("click", onClick, true);
      viewport.removeEventListener("mouseenter", pause);
      viewport.removeEventListener("mouseleave", resume);
      viewport.removeEventListener("focusin", pause);
      viewport.removeEventListener("focusout", onFocusOut);
    };
  }, [reduced]);

  return { viewportRef, trackRef, copyRef };
};
