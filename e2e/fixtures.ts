import { test as base, chromium, type Page } from "@playwright/test";
import path from "path";
import { testConfig } from "./config";
import { HomePage } from "./pages/HomePage";

const LOCAL_CHROMIUM = testConfig.browser.localChromiumPath
  ? path.resolve(__dirname, "..", testConfig.browser.localChromiumPath)
  : undefined;

export const test = base.extend<{
  homePage: HomePage;
  mobileHomePage: HomePage;
}>({
  browser: async ({}, use) => {
    if (process.env.CI || !testConfig.browser.cdpEndpoint) {
      const browser = await chromium.launch({ headless: true });
      await use(browser);
      await browser.close();
    } else {
      const browser = await chromium.connectOverCDP(testConfig.browser.cdpEndpoint);
      await use(browser);
      // Don't close the shared remote browser
    }
  },

  // Desktop page uses remote CDP browser with default viewport
  page: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: testConfig.viewports.desktop,
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },

  // Mobile page uses locally launched Chromium for proper viewport + touch emulation
  mobileHomePage: async ({}, use) => {
    const launchOptions: Parameters<typeof chromium.launch>[0] = { headless: true };
    if (!process.env.CI && LOCAL_CHROMIUM) {
      launchOptions.executablePath = LOCAL_CHROMIUM;
    }
    const browser = await chromium.launch(launchOptions);
    const context = await browser.newContext({
      viewport: testConfig.viewports.mobile,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    });
    const page = await context.newPage();
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
    await context.close();
    await browser.close();
  },
});

export { expect } from "@playwright/test";
