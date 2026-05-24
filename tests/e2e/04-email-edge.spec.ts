import { test, expect } from "@playwright/test";
import { SEL, stubWaitlistApi, openCtaModal, fillEmailAndSubmit } from "./helpers";

/**
 * Landing / Capture — email edge cases.
 *
 * Regex used by WaitlistForm: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  (lowercased, trimmed)
 *
 * Goal: garbage rejected, real-world variants accepted.
 */

const INVALID = [
  "test",
  "test@",
  "test@mail",          // no TLD
  "@domain.com",
  "name with space@domain.com",
  "no.tld@",
];

const VALID = [
  "  Trim.Me@Domain.COM  ",                                  // whitespace + case
  "user+plus.tag@sub.domain.co",                             // plus addressing + subdomain
  "name.with.dots@domain.io",
  "x@y.zz",                                                  // minimal
  "verylongbutstillok-user-12345@somewhere-cool.example.org",
];

test.describe("Landing / Capture — email validation edge cases", () => {
  for (const email of INVALID) {
    test(`rejects invalid email: "${email}"`, async ({ page }) => {
      const captured = await stubWaitlistApi(page);
      await page.goto("/", { waitUntil: "networkidle" });
      await openCtaModal(page);
      await fillEmailAndSubmit(page, email);
      // Should NOT reach success. Either error alert OR network never called.
      await expect(page.locator(SEL.successMsg)).toHaveCount(0);
      expect(captured.length).toBe(0);
    });
  }

  for (const email of VALID) {
    test(`accepts valid email: "${email.trim()}"`, async ({ page }) => {
      const captured = await stubWaitlistApi(page);
      await page.goto("/", { waitUntil: "networkidle" });
      await openCtaModal(page);
      await fillEmailAndSubmit(page, email);
      await expect(page.locator(SEL.successMsg)).toBeVisible({ timeout: 8_000 });
      expect(captured.length).toBe(1);
      // Stored as lowercase + trimmed.
      expect(captured[0].email).toBe(email.trim().toLowerCase());
    });
  }
});
