# SEO and Google indexing

The production canonical origin is `https://tomcohen.dev`. Hebrew content lives at the root and English content under `/en`. Both languages render content into HTML at build time.

## Publish and verify

1. Deploy the changes through the existing Cloudflare Workers Builds connection (a push to `main`), or authenticate Wrangler with `npx wrangler login` and run `npm run deploy`.
2. Run `node scripts/check-site.mjs --live https://tomcohen.dev` after the deployment. Confirm `/sitemap.xml` and `/robots.txt` return 200 and unknown English paths return 404.
3. In [Google Search Console](https://search.google.com/search-console), add a **Domain property** for `tomcohen.dev` if it is not already verified. Add the exact Google-provided TXT verification record in Cloudflare DNS and complete verification. Keep this record in DNS.
4. Alternatively, add a URL-prefix property for `https://tomcohen.dev/` and choose HTML-tag verification. Set the token from Google's `content` attribute as `PUBLIC_GOOGLE_SITE_VERIFICATION` in the Cloudflare **build environment**, rebuild and deploy, then verify. This public token is optional and needs no runtime Worker binding. The existing Google Ads tag does not itself verify ownership.
5. In Search Console → Sitemaps, submit `https://tomcohen.dev/sitemap.xml`.
6. Use URL Inspection → Test Live URL → Request Indexing for `/`, `/automation`, `/mobile`, `/web`, `/en`, and important published articles. Inspect the final production URLs. There is no need to submit each archived issue manually.
7. Review Page indexing, the Sitemaps report and Core Web Vitals after Google has processed the deployment. Check the selected canonical when inspecting a page. Indexing and ranking are Google's decisions; submission does not guarantee either or a deadline.

There is no Search Console connector or authenticated Wrangler session available in the environment where this setup was implemented. The repository changes alone do not publish them, verify ownership, or submit a sitemap in the user's Google account.

## What the build maintains

- `scripts/seo-integration.mjs` generates `/sitemap.xml` from the final HTML of pages with canonical tags and without `noindex`. New published routes automatically enter it on rebuild. It includes reciprocal language alternatives where supplied. It deliberately omits invented modification dates and ranking priorities.
- `public/robots.txt` allows crawling, excludes API endpoints, and advertises the sitemap. Noindex pages remain crawlable so Google can read their noindex tag.
- `src/layouts/HebrewLayout.astro` and `EnglishLayout.astro` supply titles, descriptions, canonical URLs, social metadata and optional Search Console verification. Share images are local production assets.
- `src/lib/englishSeo.ts` defines the concrete English routes and their metadata. Add a metadata entry when adding an English route in `src/App.tsx`; the catch-all Astro route pre-renders it automatically. Add service IDs here only when they exist in `ServiceMap.tsx`.
- English client navigation updates head metadata through `EnglishMetadata.tsx`. Static deep links receive their own HTML and canonical. Unknown direct URLs return an HTTP 404 instead of the previous 200 app shell.
- Homepage language alternatives link `/` and `/en`. Published translated articles use reciprocal language alternatives and self canonicals. Distinct service pages are not incorrectly declared translations of one another.
- Structured data describes the real person, website, services and visible FAQs. Published articles have BlogPosting data, publication dates and article images. FAQ markup is not a promise of a Google FAQ rich result.
- Demo blog posts, demo courses, the unfinished business automation course and 404 pages retain their existing noindex settings and are excluded from the sitemap. Remove noindex only after replacing placeholder content and confirming course details.
- Old English URLs retain their permanent redirects through `public/_redirects`.

## Checks and maintenance

```sh
npm run build
node scripts/check-site.mjs
npm run lint
npx tsc --noEmit -p tsconfig.app.json
```

The site check validates metadata, pre-rendered headings, local share images, JSON-LD syntax, reciprocal hreflang links, sitemap coverage and internal links. Existing CI runs it after building and on Cloudflare preview deployments.

The initial live audit found no resolvable `www.tomcohen.dev` host. If you want that hostname to work, configure it in Cloudflare and redirect it permanently to `https://tomcohen.dev`, preserving paths and query strings. Likewise, keep any old domains you still own redirected to the canonical domain. A canonical tag cannot repair a DNS or TLS failure. Preview hosts should be protected from indexing through Cloudflare access controls or an `X-Robots-Tag: noindex` response header configured for preview deployments only.

Use descriptive, helpful original content and keep project information accurate. Avoid adding keyword-stuffed pages, invented reviews or business addresses, and irrelevant schema. Measure search performance in Search Console before expanding content or changing titles based on assumptions.

Google references: [Sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
