import { test, expect } from "@playwright/test";
import { SEL, stubWaitlistApi, openCtaModal, fillEmailAndSubmit } from "./helpers";

/**
 * Landing / Capture — duplicate email behavior.
 *
 * Supabase's `waitlist` table normally has a UNIQUE(email) constraint, so the
 * second insert returns 409 (Conflict) with code 23505. Current implementation
 * surfaces this as an error state — this test pins that behavior and asserts
 * the message is human-readable (no raw SQL leak).
 *
 * If product later decides "soft accept" (treat dup as success), update the
 * expectations in the second block.
 */

test.describe("Landing / Capture — duplicate email", () => {
  test("second submit with same email shows error state, not silent crash", async ({ page }) => {
    // Simulate Supabase unique violation on duplicate insert.
    await page.route(/\/rest\/v1\/waitlist/, async (route, request) => {
      const body = JSON.parse(request.postData() ?? "{}");
      const isDupe = body.email === "dup@shadow.test";
      if (isDupe) {
        await route.fulfill({
          status: 409,
          contentType: "application/json",
          body: JSON.stringify({
            code: "23505",
            message: "duplicate key value violates unique constraint",
          }),
        });
        return;
      }
      await route.fulfill({ status: 201, body: "" });
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await openCtaModal(page);
    await fillEmailAndSubmit(page, "dup@shadow.test");

    const err = page.locator(SEL.errorMsg);
    await expect(err).toBeVisible({ timeout: 8_000 });
    // No raw SQL terms in user-facing copy.
    const text = (await err.textContent()) ?? "";
    expect(text).not.toMatch(/SQLSTATE|constraint|23505|RLS|postgrest/i);
  });

  test("subsequent retry with a fresh email after dup error still works", async ({ page }) => {
    const captured: Array<Record<string, unknown>> = [];
    await page.route(/\/rest\/v1\/waitlist/, async (route, request) => {
      const body = JSON.parse(request.postData() ?? "{}");
      captured.push(body);
      if (body.email === "dup@shadow.test") {
        await route.fulfill({ status: 409, body: "{}" });
        return;
      }
      await route.fulfill({ status: 201, body: "" });
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await openCtaModal(page);
    await fillEmailAndSubmit(page, "dup@shadow.test");
    await expect(page.locator(SEL.errorMsg)).toBeVisible();

    // Recover with a new email.
    await page.locator(SEL.emailInput).fill("fresh@shadow.test");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator(SEL.successMsg)).toBeVisible();
    expect(captured.map((c) => c.email)).toEqual([
      "dup@shadow.test",
      "fresh@shadow.test",
    ]);
  });
});
