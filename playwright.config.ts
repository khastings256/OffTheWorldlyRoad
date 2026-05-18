import { defineConfig } from "@playwright/test";
import { testConfig } from "./e2e/config";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { outputFolder: "playwright-report" }], ["json", { outputFile: "test-results/results.json" }]]
    : "list",
  use: {
    baseURL: testConfig.baseURL,
    trace: "on-first-retry",
    screenshot: "on",
    video: "retain-on-failure",
  },
  webServer: {
    command: process.env.CI ? "npm start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
