import type { Page, Locator } from "@playwright/test";

export class MobileNavComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get drawer(): Locator {
    return this.page.locator("div.md\\:hidden.flex.flex-col");
  }

  get openMenuBtn(): Locator {
    return this.page.getByRole("button", { name: /open menu/i });
  }

  get closeMenuBtn(): Locator {
    return this.page.getByRole("button", { name: /close menu/i });
  }

  navLink(name: string): Locator {
    return this.drawer.getByRole("link", { name });
  }

  get tagline(): Locator {
    return this.drawer.getByText(/faith, wilderness/i);
  }

  async open() {
    await this.openMenuBtn.click();
  }

  async closeViaBackdrop() {
    // Click on the left edge of the screen (backdrop area)
    await this.page.mouse.click(10, 10);
  }

  async closeViaLink(name: string) {
    await this.navLink(name).click();
  }
}
