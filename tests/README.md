# Shadow Landing — E2E Tests

Playwright suite for the marketing landing (`shadow-landing-sage.vercel.app`).

## Install

```bash
cd shadowwwLanding
npm install                     # picks up @playwright/test
npx playwright install chromium webkit
```

## Run

```bash
# Against production (default)
npm run test:e2e

# Against local dev server (start it first: npm run dev → :3008)
npm run test:e2e:local

# Interactive UI
npm run test:e2e:ui

# HTML report from last run
npm run test:e2e:report
```

## Environment variables

| Var        | Default                                            | Purpose                                |
|------------|----------------------------------------------------|----------------------------------------|
| `BASE_URL` | `https://shadow-landing-sage.vercel.app`           | Landing URL under test                 |
| `APP_URL`  | `http://localhost:3000`                            | Shadow app URL (cross-product spec)    |
| `CI`       | unset                                              | Enables retries + reduced parallelism  |

## Spec map (8 files / 20 flows)

| File                                  | Flow                                                       |
|---------------------------------------|------------------------------------------------------------|
| `01-capture-anchor.spec.ts`           | Direct `#capture` navigation, layout, context              |
| `02-waitlist-submit.spec.ts`          | Valid submit, loading state, no double-submit              |
| `03-validation.spec.ts`               | Empty / required field validation                          |
| `04-email-edge.spec.ts`               | Invalid + valid edge-case emails (trim, case, plus, dots)  |
| `05-duplicate-email.spec.ts`          | 409 Conflict path, no SQL leak, retry with fresh email     |
| `06-cta-buttons.spec.ts`              | All "early access" CTAs converge on same dialog            |
| `07-responsive.spec.ts`               | 5 viewports — capture + modal fit, no horizontal overflow  |
| `08-cross-product-portfolio.spec.ts`  | Landing → Labs deep-link, honest framing check             |

All write paths are network-stubbed (`page.route(/rest\/v1\/waitlist/)`) so
the suite never pollutes the production waitlist.

## Notes for selectors

The waitlist form lives inside `CTAModal` (opened by buttons across the page,
not in `CaptureScene` itself). Stable hooks used by the helpers:

- `#capture`                   — section anchor (CaptureScene)
- `div[role="dialog"]`         — CTAModal
- `#cta-modal-title`           — modal heading
- `#waitlist-email`            — form input
- `input[name="company"]`      — honeypot (always empty)
- `div[role="status"]`         — success block
- `p[role="alert"]`            — error block
