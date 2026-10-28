# Tom Cohen Website

Damn good at building products. We help founders, businesses, and individuals launch faster, scale better, and automate more — from full-scale platforms to small essential apps.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Environment Configuration

### Contact Form Setup

The contact form supports both development and production webhook endpoints for testing and live submissions.

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure the environment:**
   
   Edit `.env.local` and set:
   ```
   VITE_ENVIRONMENT=development  # For testing
   # or
   VITE_ENVIRONMENT=production   # For live submissions
   ```

### Webhook Endpoints

- **Development (Testing):** `https://n8n.yarden-zamir.com/webhook-test/client-contact-form`
- **Production (Live):** `https://n8n.yarden-zamir.com/webhook/client-contact-form`

The form automatically uses the correct endpoint based on the `VITE_ENVIRONMENT` variable.

### Testing the Contact Form

1. Set `VITE_ENVIRONMENT=development` in `.env.local`
2. Restart the dev server
3. Submit the form - it will use the test webhook
4. Check your n8n instance to verify the test webhook received the data

### Going Live

1. Set `VITE_ENVIRONMENT=production` in `.env.local`
2. Build and deploy your application
3. Form submissions will go to the production webhook

## Project Structure

- `/src/pages` - Astro routes: the Hebrew site at the root, `404.astro`, and `en.astro`, which mounts the English app at `/en`
- `/src/views` - Page components (React)
- `/src/layouts` - `HebrewLayout.astro`: the HTML head of the Hebrew pages
- `/src/components` - Reusable UI components
- `/src/components/ui` - shadcn/ui components
- `/public` - Static assets

## Tech Stack

- **Framework:** React + TypeScript
- **Build Tool:** Astro (static output; React components as islands)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Routing:** React Router
- **Backend:** n8n + Resend (for email)

## License

© 2025 Tom Cohen. All rights reserved.




## Hebrew pages (`/`, `/automation`, `/mobile`)

The plan for the Hebrew site is in [`docs/site-plan.md`](docs/site-plan.md).

- Routes: `src/pages/index.astro` (homepage), `automation.astro`, `mobile.astro` and `automation/*.astro`. Each renders its React page (`src/views/`) to HTML at build time and hydrates it in the browser.
- Homepage: `src/components/home/`. The hero writes Hebrew words by hand: each letter is a set of marker strokes in `handLetters.ts`; to add a hero word, use only letters defined there (add a letter's strokes if needed) and pick the `DynamicVisual` state that goes with it in `content.ts`.
- Copy: `src/components/home/`, `src/components/automation/` and `src/components/mobile/` (`content.ts` holds the facts and the open `TODO(tom)` items). `sites.ts` holds what differs between the pages.
- Head: `src/layouts/HebrewLayout.astro` (`lang="he" dir="rtl"`, Open Graph, the Google tag). JSON-LD comes from `src/lib/structuredData.ts`, with the FAQ taken from the same arrays the pages show.
- The English site is the React Router app (`src/App.tsx`, basename `/en`, mounted by `src/pages/en.astro`). The Worker serves `dist/en.html` for every `/en/*` page path; `public/_redirects` sends the old English URLs (`/services`, `/case-studies/*`, ...) to `/en/...`. Any other unknown path gets the Hebrew 404 page (`dist/404.html`).
- Lead form → `POST /api/automation-lead`, handled by the Worker in `edge/index.ts`:
  - saves the inquiry in D1 (`tomcohendev-leads`, table `automation_leads`, schema in `migrations/`),
  - emails it to tom.cohen99@gmail.com through Cloudflare Email Routing (`send_email` binding, sender `automation@tomcohen.dev`),
  - rate limit 5 requests/minute per IP, origin check, honeypot field. IP addresses are not stored.
- Read leads: `npx wrangler d1 execute tomcohendev-leads --remote --command "SELECT * FROM automation_leads ORDER BY created_at DESC"`
- After changing bindings in `wrangler.jsonc`, run `npm run cf-typegen`.

## Development and deploys

- `npm run dev` (Astro, port 8080) and `npm run dev:api` (the Worker, port 8787) for the lead form.
- `npm run build`, then `node scripts/check-site.mjs`: metadata of the Hebrew pages and internal links.
- Deploys: Cloudflare Workers Builds is connected to this repository (Cloudflare dashboard → the Worker → Settings → Builds). A push to `main` builds and deploys; other branches get a preview version. Roll back from the dashboard (Deployments) or with `npx wrangler rollback`. Previews use the production leads database and email.
- Pull requests (`.github/workflows/ci.yml`): lint, type check, build, site check, then the site check on the Workers Builds preview.
- `main` (`.github/workflows/live-check.yml`): waits for the Workers Builds deploy, then runs `check-site.mjs --live https://tomcohen.dev`.
- `npm run deploy` from a computer still works, but a push to `main` deploys again on top of it.
