# Waitlist Setup

The landing-page CTA modal collects emails via `components/forms/WaitlistForm.tsx`.
This document explains how to wire it to real backends.

## Architecture

```
Landing (Vite SPA, browser)
   │
   ├── POST { email, source, utm_* }
   │      to ${VITE_SUPABASE_URL}/rest/v1/waitlist   ← primary, durable sink
   │      with apikey = ${VITE_SUPABASE_ANON_KEY}
   │
   └── POST same payload
          to ${VITE_WAITLIST_ENDPOINT}                ← optional automation
                                                        (n8n / Zapier / Make /
                                                         Loops / Resend / Slack)
```

The Supabase write is the source of truth. The webhook is fire-and-forget for
notifications and downstream automations.

If neither env var is set, the form falls back to `localStorage` so the signal
is never lost during development.

## 1. Supabase (primary)

### Apply migration

The migration is colocated with the Shadow app:

```bash
cd /home/edu/Automatization-AI/shadow
supabase db push --db-url "postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres"
```

The migration creates `public.waitlist` with:

- `id uuid pk`, `email text not null`, `source text`, `user_agent`, `referrer`, `utm_*`
- `created_at timestamptz default now()`
- Check constraint: email contains `@`, length 5..320
- RLS **enabled** with a single policy: `anon` + `authenticated` may **INSERT** only.
- No SELECT / UPDATE / DELETE granted to anon. Reads happen via the Supabase
  dashboard or via `service_role` keys (server-side only — never in the browser).

### Verify

```sql
-- via dashboard SQL editor
select count(*) from public.waitlist;
select email, source, created_at from public.waitlist order by created_at desc limit 20;
```

### Env vars for landing

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xxxx
```

(Same project used by the Shadow app — both surfaces share a Supabase instance.)

## 2. Webhook fan-out (optional)

Set `VITE_WAITLIST_ENDPOINT` to any HTTP endpoint that accepts
`POST application/json` with the payload above.

### Examples

#### n8n (local Docker)

1. Create a new workflow with a **Webhook** trigger node.
2. Method: `POST`. Path: `shadow-waitlist`. Response Mode: `Immediately`.
3. Add downstream nodes:
   - **Slack** node — `#waitlist` channel: "New signup: {{$json.email}} ({{$json.source}})"
   - **Gmail** / **Resend** node — welcome email to `{{$json.email}}`
   - **Notion** / **Google Sheets** node — append row for ops review
4. Activate the workflow.
5. Copy the production webhook URL → `VITE_WAITLIST_ENDPOINT`.

#### Zapier

1. New Zap → Trigger: **Webhooks by Zapier** → **Catch Hook**.
2. Copy the URL → `VITE_WAITLIST_ENDPOINT`.
3. Add actions: Slack notify, Mailerlite/ConvertKit add subscriber, etc.

#### Resend (direct welcome email)

Cannot post directly from the browser (CORS + key exposure). Use an
intermediate worker (Cloudflare Worker, Vercel function, n8n) that listens
on `VITE_WAITLIST_ENDPOINT` and calls the Resend API server-side.

#### Loops.so (waitlist with built-in audience)

Loops exposes a public form endpoint. Set:

```
VITE_WAITLIST_ENDPOINT=https://app.loops.so/api/newsletter-form/<form-id>
```

The current code posts JSON; Loops also accepts JSON via their newer API.

## 3. Reading the waitlist

For an MVP review the rows in the Supabase dashboard. Later, build a small
admin page in the Shadow app at `/settings/admin/waitlist` that uses the
service_role key on the server (Next.js API route — never exposed to the
client).

## 4. Security / abuse

The current implementation has:

- Honeypot field (`name="company"`) — silently succeeds without writing if bots fill it.
- Email format check before POST.
- Lowercased before insert.
- Supabase RLS: INSERT-only.
- Supabase check constraint blocks malformed emails server-side.

For higher traffic add:

- Cloudflare Turnstile (free) — small JS widget in the form.
- Edge rate limit (Cloudflare WAF or Vercel Edge Config with Upstash).
- Postgres trigger to dedup or block disposable-email domains.

## 5. Verification checklist

- [ ] Migration applied; `select 1 from public.waitlist limit 0;` works.
- [ ] `.env.local` contains both Supabase vars.
- [ ] `npm run dev`, open landing, submit a test email.
- [ ] Network tab shows `POST /rest/v1/waitlist` returning `201`.
- [ ] Row visible in Supabase dashboard.
- [ ] (Optional) webhook fired; Slack / sheet / email confirms.
