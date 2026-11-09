import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { englishPage } from "../lib/englishSeo";

/** Keep the static head accurate after navigation inside the React app. */
export function EnglishMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = `/en${pathname === "/" ? "" : pathname}`;
    const page = englishPage(path);
    const title = page?.title ?? "Page Not Found | Tom Cohen";
    const description = page?.description ?? "The requested page could not be found.";
    document.title = title;
    for (const [selector, content] of [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[property="og:url"]', `https://tomcohen.dev${path}`],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', description],
      ['meta[name="robots"]', page ? "index, follow, max-image-preview:large" : "noindex"],
    ]) document.querySelector(selector)?.setAttribute("content", content);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (page) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
      }
      canonical.href = `https://tomcohen.dev${path}`;
    } else canonical?.remove();
    // Homepage language alternatives apply only to the homepage.
    document.querySelectorAll('link[hreflang]').forEach((link) => link.remove());
    if (path === "/en") {
      for (const [lang, href] of [["he", "/"], ["en", "/en"], ["x-default", "/"]]) {
        const link = document.createElement("link");
        link.rel = "alternate";
        link.hreflang = lang;
        link.href = `https://tomcohen.dev${href}`;
        document.head.append(link);
      }
    }
  }, [pathname]);
  return null;
}
