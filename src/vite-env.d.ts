/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Supabase project URL (primary waitlist sink).
   * POST goes to `${VITE_SUPABASE_URL}/rest/v1/waitlist` with anon key.
   * If unset, WaitlistForm falls back to localStorage.
   */
  readonly VITE_SUPABASE_URL?: string;

  /**
   * Supabase anon (publishable) key. Required alongside VITE_SUPABASE_URL.
   * Row-level security on `waitlist` only allows INSERT — safe to expose.
   */
  readonly VITE_SUPABASE_ANON_KEY?: string;

  /**
   * Optional webhook endpoint for automation fan-out (n8n / Zapier / Make).
   * Fired alongside the Supabase write; failures are non-fatal.
   */
  readonly VITE_WAITLIST_ENDPOINT?: string;

  /**
   * URL of the Shadow app login page (used by "I have access" link in CTAModal).
   * Defaults to "#" if unset.
   */
  readonly VITE_SHADOW_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
