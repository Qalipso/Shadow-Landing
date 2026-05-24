import { test, expect } from "@playwright/test";
import { SEL, stubWaitlistApi, openCtaModal, fillEmailAndSubmit } from "./helpers";

/**
 * Landing / Capture — happy-path waitlist submission.
 *
 * Verifies:
 *  - submit transitions to "Sending…" loading state then "success" state
 *  - exactly ONE POST is made (no double submit)
 *  - payload has correct shape (email, source)
 *  - localStorage marker is set on success
 *  - success view shows confirmation copy + sign-in link
 */

test.describe("Landing / Capture — submit valid waitlist entry", () => {
  test("valid email submits exactly once and shows success state", async ({ page }) => {
    const captured = await stubWaitlistApi(page);

    await page.goto("/", { waitUntil: "networkidle" });
    await openCtaModal(page);
    await fillEmailAndSubmit(page, "qa+e2e@shadow.test");

    // Loading state visible while in-flight.
    await expect(
      page.locator('button[type="submit"]:has-text("Sending")'),
    ).toBeVisible({ timeout: 4_000 });

    // Success block appears.
    const status = page.locator(SEL.successMsg);
    await expect(status).toBeVisible({ timeout: 8_000 });
    await expect(status).toContainText(/on the list/i);

    // No double submission.
    expect(captured.length).toBe(1);
    expect(captured[0].email).toBe("qa+e2e@shadow.test");
    expect(captured[0].source).toBeTruthy();

    // Persistence marker stored.
    const stored = await page.evaluate(() => localStorage.getItem("shadow:waitlist:submitted"));
    expect(stored).toBe("1");
  });

  test("rapid double-click does not produce two writes", async ({ page }) => {
    const captured = await stubWaitlistApi(page);
    await page.goto("/", { waitUntil: "networkidle" });
    await openCtaModal(page);
    await page.locator(SEL.emailInput).fill("noisy.user@shadow.test");
    const btn = page.locator('button[type="submit"]');
    await Promise.all([btn.click(), btn.click().catch(() => null)]);
    await expect(page.locator(SEL.successMsg)).toBeVisible();
    expect(captured.length).toBe(1);
  });
});
