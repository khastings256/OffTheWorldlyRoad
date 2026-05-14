import type { Page, Locator } from "@playwright/test";
import { testConfig } from "../config";

export abstract class BasePage {
  readonly page: Page;
  readonly url: string;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  async goto() {
    await this.page.goto(this.url, { timeout: testConfig.timeouts.navigation });
  }

  async waitForLoad() {
    await this.page.waitForLoadState("networkidle", {
      timeout: testConfig.timeouts.navigation,
    });
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
