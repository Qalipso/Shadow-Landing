// Lightweight analytics wrapper.
// Default: Plausible (privacy-first, no cookies, GDPR compliant).
// To activate: add Plausible script to index.html with your domain.
//
// <script defer data-domain="shadow.so" src="https://plausible.io/js/script.js"></script>
//
// Events are no-ops when Plausible is not loaded (dev / no script).
// Swap `plausibleEvent` for `gtag`/`posthog` calls if needed.

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
  }
}

export function track(event: string, props?: Props): void {
  try {
    if (typeof window !== "undefined" && typeof window.plausible === "function") {
      window.plausible(event, props ? { props } : undefined);
    }
  } catch {
    // Never throw for analytics failures.
  }
}

// Pre-defined events to keep naming consistent across the codebase.
export const events = {
  ctaOpen: (source: string) => track("CTA Open", { source }),
  waitlistSubmit: (source: string) => track("Waitlist Submit", { source }),
  waitlistSuccess: (source: string) => track("Waitlist Success", { source }),
  signInClick: () => track("Sign In Click"),
  navLinkClick: (label: string) => track("Nav Link Click", { label }),
} as const;
