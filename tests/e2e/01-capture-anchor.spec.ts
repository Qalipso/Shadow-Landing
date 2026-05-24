import { test, expect } from "@playwright/test";
import { SEL } from "./helpers";

/**
 * Landing / Capture — direct anchor navigation.
 *
 * Verifies that opening the page with `#capture` lands the user inside the
 * capture section (scrolled into viewport), layout stays intact, context copy
 * is visible, and there are no console errors.
 */

test.describe("Landing / Capture anchor", () => {
  test("opening /#capture scrolls capture into view and preserves layout", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("pageerror", (e) => consoleErrors.push(e.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto("/#capture", { waitUntil: "networkidle" });

    const capture = page.locator(SEL.captureSection);
    await expect(capture).toBeVisible();

    // Section is actually scrolled into viewport (within fold).
    const inView = await capture.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    });
    expect(inView, "capture section should be in viewport after anchor jump").toBe(true);

    // Capture copy / context is rendered (headline + subhead).
    await expect(capture.locator("h2")).toBeVisible();
    await expect(capture.locator("p").first()).toBeVisible();

    // Sticky nav still anchored — layout not broken.
    await expect(page.locator("nav").first()).toBeVisible();

    // No catastrophic JS errors.
    expect(consoleErrors.filter((m) => !/favicon|third-party|sentry/i.test(m))).toEqual([]);
  });

  test("clicking nav CTA opens waitlist modal with context heading", async ({ page }) => {
    await page.goto("/#capture", { waitUntil: "networkidle" });
    // Any visible early-access CTA.
    const cta = page
      .locator('button:has-text("Get early access"), button:has-text("Early access"), button:has-text("Join")')
      .first();
    await cta.click();
    const dialog = page.locator(SEL.ctaDialog);
    await expect(dialog).toBeVisible();
    await expect(page.locator(SEL.ctaDialogTitle)).toContainText(/Shadow|line|Get/i);
    // Modal explains what's next (helper/copy).
    await expect(dialog).toContainText(/early access|waitlist|signal/i);
  });
});
