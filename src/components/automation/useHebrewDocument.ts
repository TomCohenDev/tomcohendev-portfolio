import { useEffect } from "react";

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Playpen+Sans+Hebrew:wght@400;500;600&display=swap";

/**
 * Applies Hebrew document settings while a Hebrew page is mounted. dist/automation.html already ships
 * them for direct visits to /automation; this covers the other Hebrew pages and in-app navigation
 * from the English pages.
 */
export const useHebrewDocument = (title: string, description: string) => {
  useEffect(() => {
    const html = document.documentElement;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prev = { lang: html.lang, dir: html.dir, title: document.title, description: meta?.content };

    html.lang = "he";
    html.dir = "rtl";
    document.title = title;
    if (meta) meta.content = description;

    if (!document.querySelector(`link[href="${FONTS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = FONTS_HREF;
      document.head.appendChild(link);
    }

    return () => {
      html.lang = prev.lang || "en";
      html.dir = prev.dir || "ltr";
      document.title = prev.title;
      if (meta && prev.description) meta.content = prev.description;
    };
  }, [title, description]);
};
