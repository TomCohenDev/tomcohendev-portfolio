# tomcohen.dev: Hebrew site plan

Status: agreed with Tom on 2026-10-28. This file is the reference for every phase and for the agents that work on the site.

## Goal

tomcohen.dev becomes Tom Cohen's own site as a provider: services, a blog, daily news, and courses and meetings.
Hebrew first, at the root. English comes later, at `/en`. The brand is only "תום כהן" (no End2End).
The homepage leads to the two services, `/automation` and `/mobile`. Work and reviews are proof, not the main thing.

## Decisions

| Topic | Decision |
| --- | --- |
| Framework | Astro, in this repository. React components (hero, phone story, forms) stay as islands. Static HTML per page. |
| Hosting | Cloudflare Workers static assets, as today. `edge/index.ts` keeps the lead API. |
| Content | Files in this repository: blog posts, news issues, Tom's updates, courses and meetings. No CMS. |
| Releases | Cloudflare Workers Builds (already connected to the repository) deploys every merge to `main` and builds other branches as previews. GitHub Actions run the checks on pull requests and check the live site after each deploy. The daily news commit also publishes posts dated for that day. Roll back from the Cloudflare dashboard or with `wrangler rollback`. No version tags. |
| Services | Only automation and mobile. A Hebrew version of the radial "My Services" map (`src/components/ServiceMap.tsx`), with Tom in the centre and two branches. |
| Hero | Hebrew words that write themselves, with the visual that changes with each word (as in `HandwritingMVP.tsx` and `DynamicVisual.tsx`). Claude draws a stroke path for each Hebrew letter. |
| News | Daily, in Hebrew, for business owners. Built by an agent with the same flow as Yarden Zamir's paper (github.com/Yarden-zamir/news), but on Tom's own code and sources only. Published automatically from day one. |
| News runner | A T3 scheduled task on Tom's VPS in Vienna, where T3 runs. |
| Courses and meetings | One section. Each item states its type: paid course, free meeting, 1-on-1, workshop. Sign-up through the contact form, WhatsApp or a link per item. |
| Email list | None for now. |
| Current English site | Moves to `/en` as it is. `/case-studies/*` keeps working. |
| Tracking | No new services. Form contents never go to analytics. |

## Site map

| Page | Path | Phase |
| --- | --- | --- |
| Home | `/` | 3 |
| Automation (exists) | `/automation` | moves in phase 2 |
| Mobile apps (ready, not deployed) | `/mobile` | 1 |
| Blog | `/blog`, `/blog/<slug>` | 4 |
| News | `/news` (today), `/news/<YYYY-MM-DD>`, `/news/archive`, `/news/feed.xml` | 5 |
| Courses and meetings | `/courses`, `/courses/<slug>` | 6 |
| About, contact | `/about`, `/contact` | 3 |
| Privacy, accessibility, site map | shared Hebrew pages | 2 |
| English | `/en/...` | later |

## Repository layout (target)

```text
src/
  pages/                 Astro routes (Hebrew at the root, /en later)
  layouts/               Hebrew base layout: header, footer, metadata, fonts
  components/            React islands and Astro components (automation/, mobile/, home/, news/)
  content/
    blog/                <slug>.mdx: title, description, date, tags, draft, image
    updates/             <date>-<slug>.md: Tom's own updates, shown in the news feed
    courses/             <slug>.md: type, dates, online or place, price text, sign-up
  styles/                shared Hebrew design system (from automation.css)
news/
  sources.yaml           the feeds, each with a name, URL, language and topic
  schedule.md            the steps of the daily run; the T3 task prompt points here
  skill/SKILL.md         editorial rules, file formats, checks
  scripts/               fetch_items, render, site (archive, feed, sitemap), check
  desk/<date>/picks.json the editorial choices of each issue (in git)
  deny.txt               words that must never be published (local, not in git)
  issues/<date>/         issue data + covered.json (stories already shown)
edge/index.ts            the lead API (unchanged)
.github/workflows/       ci.yml (checks + preview), deploy.yml (main + daily rebuild)
```

## Phases

Each phase ships on its own.

1. **Ship `/mobile`.** It is built and tested locally. Before it goes live Tom confirms: "4 years of Flutter", the Yellow Candle wording, and the reviews.
2. **Foundation.** No URL changes.
   - Astro in this repository, with the shared Hebrew design, header, footer and metadata.
   - `/automation` and `/mobile` move across with the same URLs and behaviour.
   - The English site stays where it is, as the fallback for every other path.
   - CI/CD:
     - Pull requests: types, lint, build, broken links and Hebrew metadata, then the same check on the Workers Builds preview.
     - `main`: Workers Builds deploys; a GitHub workflow waits for it and checks the live site.
     - No secrets are needed: deploys run in Cloudflare.
3. **Homepage.**
   - The current English site moves to `/en`, and its old URLs redirect there.
   - The Hebrew handwriting hero with the changing visual.
   - The radial services map with two branches.
   - Work and reviews (the existing carousel, shorter).
   - The newest news issue, blog posts and events.
   - A short "about Tom", and contact.
4. **Blog.** Post template, tags, RSS, a share image per post, sitemap, and scheduled publishing.
5. **News.** See below.
6. **Courses and meetings.** List, item page, sign-up, and past items moving to an archive on their own.
7. **English** at `/en`, with hreflang.

## Daily news

The flow follows Yarden Zamir's paper; the code and the sources are Tom's.

1. `news/scripts/fetch_items` reads `news/sources.yaml` (RSS and Atom feeds, release pages) and writes `news/desk/<date>/items.json` with the last 30 hours.
2. The agent reads the items, and every `covered.json` of earlier issues: no story appears twice.
   It may add a few stories from web search, each with its real source.
3. The agent writes `news/desk/<date>/picks.json`:
   - 4 to 6 stories, ranked.
   - Each story has a Hebrew headline, two sentences in its own words, and a line about what it means for a business.
   - Developments link the earlier story they continue.
   - Tom's updates from `src/content/updates/` of that day go on top, marked as his.
4. `news/scripts/render` builds the issue. The build stops when:
   - a story has no source,
   - a source URL does not answer,
   - a word from `deny.txt` appears,
   - or a story repeats.
5. `news/scripts/site` updates `/news`, the archive, `feed.xml` and the sitemap.
6. The agent checks the page in a browser on desktop and phone.
7. It commits `feat(news): issue <date>` and pushes to `main`. CI deploys, and the agent checks the live page.
8. It replies in the T3 thread with the link, the headlines and anything that failed.

Every story links to its source. Images are only the publisher's share image, with credit. The text is summaries in the agent's own words, never copied articles.
If the build stops, nothing is published and the run reports why.
A file `news/PAUSED` stops the daily run.

**Schedule:** a T3 scheduled task on the Vienna VPS, every day at 07:00 Israel time.
Its prompt is one line: "In the tomcohendev-portfolio checkout, run `git pull --ff-only`, then read `news/schedule.md` and do its steps."

## Open items

- `/mobile`: Tom confirms the three points in phase 1.
- Reviews on `/automation` and `/mobile`: confirm each client agreed to publication.
- Privacy page: the retention period is not decided yet.
- Whether an accessibility statement (הצהרת נגישות) is required: check with a qualified person.
- The VPS: this PC has no role on the T3 machine map. Either give it a role in the portal, or create the scheduled task from a thread on the VPS.
