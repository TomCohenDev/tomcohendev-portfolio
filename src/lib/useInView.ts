import { useEffect, useState, type RefObject } from "react";

/**
 * True while the element is on screen (or within `margin` of it). Animations use it to stop while scrolled away, so a
 * phone only spends time on what can be seen. Starts true, so the first render matches the server's.
 */
export const useInView = (ref: RefObject<Element | null>, margin = "100px") => {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return inView;
};
