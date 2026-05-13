import { test as base, chromium, expect, type Page } from "@playwright/test";
import path from "path";

const LOCAL_CHROMIUM = path.resolve(
  __dirname,
  "../node_modules/playwright-core/.local-browsers/chromium-1223/chrome-linux64/chrome"
);

export const test = base.extend<{ mobilePage: Page }>({
  browser: async ({}, use) => {
    const browser = await chromium.connectOverCDP("ws://playwright:3000/");
    await use(browser);
    // Don't close the shared remote browser
  },
  // Desktop page uses remote CDP browser with default viewport
  page: async ({ browser }, use) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
  // Mobile page uses locally launched Chromium for proper viewport + touch emulation
  mobilePage: async ({}, use) => {
    const browser = await chromium.launch({
      headless: true,
      executablePath: LOCAL_CHROMIUM,
    });
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
    await browser.close();
  },
});

export { expect };
