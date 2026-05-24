import { test, expect } from "@playwright/test";
import { SEL, stubWaitlistApi } from "./helpers";

/**
 * Landing / Capture — every CTA opens the same waitlist flow.
 *
 * The landing wires multiple CTA buttons (nav, hero, proof scene, final
 * cta scene) into a single CTAModalProvider. This spec walks each visible
 * button and verifies it opens the dialog (and reports its `source` properly).
 */

test.describe("Landing / CTAs converge on capture modal", () => {
  test("every visible 'early access' CTA opens the waitlist dialog", async ({ page }) => {
    const captured = await stubWaitlistApi(page);
    await page.goto("/", { waitUntil: "networkidle" });

    const ctas = page.locator(
      'button:has-text("Get early access"), button:has-text("Early access"), button:has-text("Get in line"), button:has-text("Join the waitlist")',
    );
    const count = await ctas.count();
    expect(count).toBeGreaterThan(0);

    const seenSources = new Set<string>();
    for (let i = 0; i < count; i++) {
      const cta = ctas.nth(i);
      if (!(await cta.isVisible())) continue;

      await cta.scrollIntoViewIfNeeded();
      await cta.click();

      const dialog = page.locator(SEL.ctaDialog);
      await expect(dialog).toBeVisible();
      await expect(page.locator(SEL.ctaDialogTitle)).toBeVisible();

      // Submit once to capture the source attribution.
      await page.locator(SEL.emailInput).fill(`probe-${i}@shadow.test`);
      await page.locator('button[type="submit"]').click();
      await expect(page.locator(SEL.successMsg)).toBeVisible({ timeout: 8_000 });

      const last = captured[captured.length - 1];
      if (last?.source) seenSources.add(String(last.source));

      // Close — escape works due to focus trap.
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
    }

    // At least one distinct source attribution recorded.
    expect(seenSources.size).toBeGreaterThan(0);
  });

  test("nav CTA tagged with source=nav", async ({ page }) => {
    const captured = await stubWaitlistApi(page);
    await page.goto("/", { waitUntil: "networkidle" });
    const navBtn = page.locator("nav button").last();
    await navBtn.click();
    await expect(page.locator(SEL.ctaDialog)).toBeVisible();
    await page.locator(SEL.emailInput).fill("nav-cta@shadow.test");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator(SEL.successMsg)).toBeVisible();
    expect(captured[0].source).toBe("nav");
  });
});
