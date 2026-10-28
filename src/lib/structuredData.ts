/**
 * schema.org data for the Hebrew pages. Only facts that are on the page: no ratings, reviews, prices or
 * address. FAQ entries come from the same arrays the pages render, so they cannot drift apart.
 */
const SITE = "https://tomcohen.dev";

export const person = {
  "@type": "Person",
  "@id": `${SITE}/#tom`,
  name: "תום כהן",
  alternateName: "Tom Cohen",
  url: `${SITE}/`,
  jobTitle: "מפתח Full-stack",
  sameAs: ["https://www.linkedin.com/in/tom-cohen-07778585/", "https://github.com/TomCohenDev", "https://x.com/Tom_Ends"],
};

export const service = (path: string, name: string, serviceType: string, description: string) => ({
  "@type": "Service",
  "@id": `${SITE}${path}#service`,
  name,
  serviceType,
  description,
  provider: { "@id": `${SITE}/#tom` },
  areaServed: { "@type": "Country", name: "ישראל" },
  availableLanguage: "he",
  url: `${SITE}${path}`,
});

export const faqPage = (path: string, faqs: readonly { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  "@id": `${SITE}${path}#faq`,
  inLanguage: "he",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
