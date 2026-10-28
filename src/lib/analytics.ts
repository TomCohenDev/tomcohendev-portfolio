import posthog from "posthog-js";

type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends an interaction event to the analytics the site already loads (PostHog when it has
 * been initialised with a key, and the existing Google tag). Never pass form field contents.
 */
export function track(event: string, props: EventProps = {}) {
  try {
    if (posthog.__loaded) posthog.capture(event, props);
  } catch {
    // Analytics must never break the page.
  }
  try {
    window.gtag?.("event", event, props);
  } catch {
    // Same as above.
  }
}
