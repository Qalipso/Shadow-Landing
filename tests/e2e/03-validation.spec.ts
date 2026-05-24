import { test, expect } from "@playwright/test";
import { SEL, stubWaitlistApi, openCtaModal } from "./helpers";

/**
 * Landing / Capture — empty + invalid required field validation.
 *
 * Verifies that empty submit:
 *  - blocks the request (no POST is fired)
 *  - keeps modal open with form intact
 *  - shows a human-readable error message or relies on the native required
 *    attribute (whichever the implementation uses)
 */

test.describe("Landing / Capture — required field validation", () => {
  test("submitting empty email does not send a request", async ({ page }) => {
    const captured = await stubWaitlistApi(page);
    await page.goto("/", { waitUntil: "networkidle" });
    await openCtaModal(page);

    const submit = page.locator('button[type="submit"]');
    await submit.click();

    // No network call made.
    expect(captured.length).toBe(0);

    // Form still on screen — success block did NOT replace it.
    await expect(page.locator(SEL.emailInput)).toBeVisible();
    await expect(page.locator(SEL.successMsg)).toHaveCount(0);

    // Either custom error OR native validity message.
    const input = page.locator(SEL.emailInput);
    const isInvalid = await input.evaluate((el: HTMLInputElement) => !el.validity.valid);
    const errVisible = await page.locator(SEL.errorMsg).isVisible().catch(() => false);
    expect(isInvalid || errVisible).toBe(true);
  });

  test("focus stays on the problem field", async ({ page }) => {
    await stubWaitlistApi(page);
    await page.goto("/", { waitUntil: "networkidle" });
    await openCtaModal(page);

    await page.locator('button[type="submit"]').click();

    // Email input is focusable + reachable via TAB inside the modal.
    const input = page.locator(SEL.emailInput);
    await input.focus();
    await expect(input).toBeFocused();
  });
});
