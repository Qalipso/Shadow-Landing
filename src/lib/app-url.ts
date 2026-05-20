/**
 * Builds a URL to the Shadow app login/signup page with tracking params.
 *
 * APP_URL = `VITE_SHADOW_APP_URL` (e.g. http://localhost:3007/login).
 * Falls back to "#" if env unset — link still renders but no-op.
 *
 * The app side sanitizes `source` (whitelist) and `email` (regex) before use.
 */
const APP_URL = process.env.NEXT_PUBLIC_SHADOW_APP_URL ?? "#";

export type AppUrlSource =
  | "landing"
  | "landing-modal"
  | "landing-waitlist"
  | "landing-cta";

export function buildAppUrl(opts: {
  source: AppUrlSource;
  email?: string;
  mode?: "password" | "signup" | "magic";
}): string {
  if (APP_URL === "#") return "#";

  // Build query string manually so we tolerate APP_URL being relative
  // (no origin) — URL constructor would throw on a path-only base.
  const params = new URLSearchParams();
  params.set("source", opts.source);
  if (opts.email) params.set("email", opts.email);
  if (opts.mode) params.set("mode", opts.mode);

  const sep = APP_URL.includes("?") ? "&" : "?";
  return `${APP_URL}${sep}${params.toString()}`;
}
