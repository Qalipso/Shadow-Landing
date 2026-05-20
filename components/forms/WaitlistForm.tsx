"use client";

import { useState, type FormEvent } from "react";
import { buildAppUrl } from "@/src/lib/app-url";
import { events } from "@/src/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LOCAL_KEY = "shadow:waitlist:pending";
const SUBMITTED_KEY = "shadow:waitlist:submitted";

function readUtm() {
  if (typeof window === "undefined") return {};
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get("utm_source") ?? undefined,
      utm_medium: p.get("utm_medium") ?? undefined,
      utm_campaign: p.get("utm_campaign") ?? undefined,
    };
  } catch {
    return {};
  }
}

function pushLocalFallback(payload: Record<string, unknown>) {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    const list = raw ? (JSON.parse(raw) as unknown[]) : [];
    list.push(payload);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

async function postSupabase(payload: Record<string, unknown>) {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const endpoint = `${url.replace(/\/+$/, "")}/rest/v1/waitlist`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: key,
      authorization: `Bearer ${key}`,
      // Don't return inserted row — avoids needing select RLS.
      prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status}: ${text.slice(0, 160)}`);
  }
  return res;
}

async function postWebhook(payload: Record<string, unknown>) {
  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT;
  if (!endpoint) return null;
  // Fire-and-forget (e.g. n8n / Zapier / Resend / Loops). Failures are non-fatal.
  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // swallow — primary write is Supabase
  }
  return null;
}

export function WaitlistForm({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setError("Enter a valid email.");
      return;
    }

    // Honeypot — if filled, silently succeed without writing.
    const form = e.currentTarget;
    const honey = (form.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
    if (honey.length > 0) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    events.waitlistSubmit(source);

    const utm = readUtm();
    const payload = {
      email: trimmed,
      source,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 240) : null,
      referrer: typeof document !== "undefined" ? document.referrer.slice(0, 240) || null : null,
      ...utm,
    };

    try {
      const supa = await postSupabase(payload);
      if (!supa) {
        // No Supabase env configured — keep signal locally + still try webhook.
        pushLocalFallback({ ...payload, ts: Date.now() });
      }
      // Fan-out to optional automation (n8n / Zapier / etc.) — fire-and-forget.
      void postWebhook(payload);

      try {
        localStorage.setItem(SUBMITTED_KEY, "1");
      } catch {
        // ignore
      }
      setSubmittedEmail(trimmed);
      setStatus("success");
      events.waitlistSuccess(source);
    } catch (err) {
      // Supabase failed — keep locally so signal isn't lost.
      pushLocalFallback({ ...payload, ts: Date.now(), error: (err as Error).message });
      setStatus("error");
      setError((err as Error).message || "Could not save. Try again.");
    }
  }

  if (status === "success") {
    const signInHref = buildAppUrl({
      source: "landing-waitlist",
      email: submittedEmail ?? undefined,
      mode: "magic",
    });
    return (
      <div
        role="status"
        className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-text-secondary"
      >
        <p className="text-text-primary mb-1">You&rsquo;re on the list.</p>
        <p className="text-xs">
          Shadow will reach out when early access opens. No spam, no noise.
        </p>
        {signInHref !== "#" ? (
          <a
            href={signInHref}
            className="mt-3 inline-flex items-center text-xs text-text-primary border border-white/15 hover:border-white/30 px-3 py-1.5 rounded-full transition-colors"
          >
            Sign in now →
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <label htmlFor="waitlist-email" className="sr-only">
        Email
      </label>
      <input
        id="waitlist-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@domain.com"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-white/30 disabled:opacity-50"
      />
      {/* Honeypot — bots fill this; humans don't see it. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
        className="absolute -left-[10000px] h-0 w-0 opacity-0"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-ink-base hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === "submitting" ? "Sending…" : "Join the waitlist"}
      </button>
      {error ? (
        <p className="text-xs text-rose-400" role="alert">
          {error}
        </p>
      ) : null}
      <p className="text-[11px] text-text-tertiary leading-snug">
        We&rsquo;ll only email you about Shadow. Unsubscribe anytime.
      </p>
    </form>
  );
}
