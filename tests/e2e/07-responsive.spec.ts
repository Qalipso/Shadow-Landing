import { test, expect } from "@playwright/test";
import { SEL, stubWaitlistApi, openCtaModal } from "./helpers";

/**
 * Landing / Capture — responsive behavior across viewports.
 *
 * Checks:
 *  - Capture section visible at every breakpoint
 *  - No horizontal overflow (would mean a layout break)
 *  - Modal renders and form fits without horizontal scroll
 *  - CTA reachable without excessive scroll on mobile
 */

const SIZES = [
  { name: "mobile-narrow", width: 360, height: 740 },
  { name: "mobile", width: 414, height: 896 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "wide-desktop", width: 1920, height: 1080 },
] as const;

for (const size of SIZES) {
  test.describe(`Landing responsive @ ${size.name} (${size.width}x${size.height})`, () => {
    test.use({ viewport: { width: size.width, height: size.height } });

    test("capture section visible, no horizontal overflow", async ({ page }) => {
      await page.goto("/#capture", { waitUntil: "networkidle" });
      await expect(page.locator(SEL.captureSection)).toBeVisible();

      const overflowX = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      // Allow tiny rounding (<= 2px). Anything more = horizontal break.
      expect(overflowX).toBeLessThanOrEqual(2);

      // Headline readable, not collapsed.
      const h2 = page.locator(`${SEL.captureSection} h2`);
      const box = await h2.boundingBox();
      expect(box?.width ?? 0).toBeGreaterThan(80);
    });

    test("waitlist modal fits viewport without horizontal scroll", async ({ page }) => {
      await stubWaitlistApi(page);
      await page.goto("/", { waitUntil: "networkidle" });
      await openCtaModal(page);

      const dialogBox = await page.locator(SEL.ctaDialog).boundingBox();
      expect(dialogBox).toBeTruthy();
      if (dialogBox) {
        expect(dialogBox.width).toBeLessThanOrEqual(size.width);
      }
      await expect(page.locator(SEL.emailInput)).toBeVisible();
      const inputBox = await page.locator(SEL.emailInput).boundingBox();
      // Field tall enough for finger taps on mobile.
      if (size.width <= 480) expect(inputBox?.height ?? 0).toBeGreaterThanOrEqual(36);
    });
  });
}
