import { defineConfig } from "@playwright/test";
import { testConfig } from "./e2e/config";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: testConfig.baseURL,
    trace: "on-first-retry",
  },
  webServer: process.env.CI
    ? {
        command: "npm start",
        url: "http://localhost:3000",
        reuseExistingServer: false,
        timeout: 120_000,
      }
    : undefined,
});
