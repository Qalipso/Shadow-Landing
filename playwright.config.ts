import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E config for Shadow Landing.
 *
 * Defaults to production URL (shadow-landing-sage.vercel.app) so flows can be
 * verified against the live deployment without spinning up a dev server.
 * Override with: BASE_URL=http://localhost:3008 npx playwright test
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["list"],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? "https://shadow-landing-sage.vercel.app",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "webkit-mobile",
      use: { ...devices["iPhone 13"] },
    },
    {
      name: "chromium-tablet",
      use: { ...devices["iPad (gen 7)"] },
    },
  ],
});
