import { StrictMode } from "react";
import { PostHogProvider } from "posthog-js/react";
import App from "./App";

// Use proxy domain if available, otherwise fall back to direct PostHog
const apiHost = import.meta.env.VITE_PUBLIC_POSTHOG_PROXY || import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

const options = {
  api_host: apiHost,
  ui_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST, // Always use direct PostHog for UI
  defaults: "2025-11-30",
  capture_exceptions: true,
  debug: import.meta.env.MODE === "development",
} as const;

/** The English site, rendered to HTML for each route by EnglishLayout.astro. */
const EnglishApp = ({ path = "/en" }: { path?: string }) => (
  <StrictMode>
    {import.meta.env.VITE_PUBLIC_POSTHOG_KEY ? (
      <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
        <App path={path} />
      </PostHogProvider>
    ) : <App path={path} />}
  </StrictMode>
);

export default EnglishApp;
