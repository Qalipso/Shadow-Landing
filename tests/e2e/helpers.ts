import { Page, expect } from "@playwright/test";

/** Stable selectors derived from real markup. Keep in one place. */
export const SEL = {
  captureSection: "#capture",
  navCta: 'nav button:has-text("Get early access"), nav button:has-text("Join the waitlist"), nav button:has-text("Early access")',
  // CTAModal dialog & form
  ctaDialog: 'div[role="dialog"][aria-modal="true"]',
  ctaDialogTitle: "#cta-modal-title",
  emailInput: "#waitlist-email",
  submitBtn: 'button[type="submit"]:has-text("Join the waitlist"), button[type="submit"]:has-text("Sending")',
  successMsg: 'div[role="status"]',
  errorMsg: 'p[role="alert"]',
  closeBtn: 'button[aria-label="Close dialog"]',
  // honeypot
  honeypot: 'input[name="company"]',
} as const;

/**
 * Stub Supabase + webhook endpoints so tests don't depend on real services
 * and don't pollute production waitlist with junk emails. Stubs ALL POSTs to
 * /rest/v1/waitlist with 201 by default. Returns a controller you can reuse.
 */
export async function stubWaitlistApi(
  page: Page,
  opts: { status?: number; body?: string; capture?: Array<Record<string, unknown>> } = {},
) {
  const captured: Array<Record<string, unknown>> = opts.capture ?? [];
  await page.route(/\/rest\/v1\/waitlist/, async (route) => {
    const req = route.request();
    try {
      const body = req.postDataJSON?.() ?? JSON.parse(req.postData() ?? "{}");
      captured.push(body);
    } catch {
      /* ignore */
    }
    await route.fulfill({
      status: opts.status ?? 201,
      contentType: "application/json",
      body: opts.body ?? "",
    });
  });
  // Optional webhook fan-out — always swallow.
  await page.route(/n8n|hooks\.zapier|webhook/, (route) =>
    route.fulfill({ status: 200, body: "{}" }),
  );
  return captured;
}

/** Open the CTA modal by clicking any visible "early access" / waitlist CTA. */
export async function openCtaModal(page: Page) {
  const button = page
    .locator('button:has-text("Get early access"), button:has-text("Early access"), button:has-text("Get in line"), button:has-text("Join the waitlist")')
    .first();
  await button.scrollIntoViewIfNeeded();
  await button.click();
  await expect(page.locator(SEL.ctaDialog)).toBeVisible();
}

export async function fillEmailAndSubmit(page: Page, email: string) {
  await page.locator(SEL.emailInput).fill(email);
  await page.locator('button[type="submit"]', { hasText: /Join the waitlist|Sending/i }).click();
}

/** Wait for either success status node or error alert. */
export async function waitForSubmitOutcome(page: Page) {
  await expect(
    page.locator(`${SEL.successMsg}, ${SEL.errorMsg}`).first(),
  ).toBeVisible({ timeout: 8_000 });
}
