# End2End Startup Website

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

- `/src/pages` - Main page components
- `/src/components` - Reusable UI components
- `/src/components/ui` - shadcn/ui components
- `/public` - Static assets

## Tech Stack

- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Routing:** React Router
- **Backend:** n8n + Resend (for email)

## License

© 2025 End2End Startup. All rights reserved.



