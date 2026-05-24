import { test, expect } from "@playwright/test";
import { SEL, stubWaitlistApi, openCtaModal, fillEmailAndSubmit } from "./helpers";

/**
 * Cross-product — Landing → App Labs portfolio walkthrough.
 *
 * Goal of this flow: demonstrate the marketing → product story works end-to-end
 * for a portfolio reviewer. Two paths covered:
 *
 *  Path A: marketing → demo/app — visitor arrives at landing, finds Labs copy,
 *          follows "sign in" link out of the success modal to the live app.
 *  Path B: marketing → waitlist — visitor submits email, sees the post-submit
 *          sign-in CTA, and lands on Labs (deep link).
 *
 * App URL is read from APP_URL env (defaults to localhost shadow web).
 */

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

test.describe("Cross-product portfolio flow", () => {
  test("landing communicates Shadow value + routes to Labs", async ({ page }) => {
    await stubWaitlistApi(page);

    await page.goto("/", { waitUntil: "networkidle" });

    // Marketing promise visible.
    await expect(page.locator("body")).toContainText(/Shadow/);
    await expect(page.locator("#capture")).toBeVisible();

    // Labs is part of the narrative on the landing — find a mention.
    const labsMention = page.locator(
      'text=/Labs|self.?knowledge|introspection/i',
    ).first();
    await expect(labsMention).toBeVisible({ timeout: 8_000 });

    // Convert via waitlist.
    await openCtaModal(page);
    await fillEmailAndSubmit(page, "portfolio.viewer@shadow.test");
    await expect(page.locator(SEL.successMsg)).toBeVisible();

    // Sign-in link from success block points at the app (if env wired).
    const signIn = page.locator(`${SEL.successMsg} a`).first();
    if (await signIn.count()) {
      const href = await signIn.getAttribute("href");
      expect(href).toBeTruthy();
      // Either explicit app URL or a hash placeholder while env is unconfigured.
      expect(href === "#" || /^https?:\/\//.test(href!)).toBe(true);
    }
  });

  test("deep link landing → /labs in app shows Self-Knowledge Engine framing", async ({ page }) => {
    // Smoke test against running app — skipped if app not running.
    const reach = await page.goto(`${APP_URL}/labs`).catch(() => null);
    test.skip(!reach || reach.status() >= 500, "Shadow app not reachable for cross-product check");

    // Either Labs page itself OR login redirect.
    const onLabs = page.url().includes("/labs");
    const onLogin = page.url().includes("/login");
    expect(onLabs || onLogin).toBe(true);

    if (onLabs) {
      await expect(page.locator("body")).toContainText(/Self-Knowledge|Labs/i);
      // Honest framing if MVP / empty:
      // "Not a medical diagnosis" OR "Begin your first scan" should appear.
      const honest = page.locator(
        'text=/Not a medical diagnosis|Begin your first scan|Available Modules/i',
      ).first();
      await expect(honest).toBeVisible({ timeout: 6_000 });
    }
  });
});
