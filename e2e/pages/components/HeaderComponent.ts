import type { Page, Locator } from "@playwright/test";
import { testConfig } from "../../config";

export class HeaderComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get logoImage(): Locator {
    return this.page.getByAltText(/off the worldly road/i).first();
  }

  get brandText(): Locator {
    return this.page.getByText("OTWR");
  }

  navLink(name: string | RegExp): Locator {
    return this.page.getByRole("link", { name });
  }

  get themeCanyonBtn(): Locator {
    return this.page.getByRole("button", { name: /canyon/i });
  }

  get themePineBtn(): Locator {
    return this.page.getByRole("button", { name: /pine/i });
  }

  get signInToggleBtn(): Locator {
    return this.page.getByRole("button", { name: /sign in/i }).first();
  }

  get emailInput(): Locator {
    return this.page.getByLabel(/email/i);
  }

  get passwordInput(): Locator {
    return this.page.getByLabel(/password/i);
  }

  get signInSubmitBtn(): Locator {
    return this.page.locator("form").getByRole("button", { name: /^sign in$/i });
  }

  get loggedInUserBtn(): Locator {
    return this.page.getByText(testConfig.credentials?.name || "Test User").first();
  }

  get signOutBtn(): Locator {
    return this.page.getByRole("button", { name: /sign out/i });
  }

  get openMenuBtn(): Locator {
    return this.page.getByRole("button", { name: /open menu/i });
  }

  get closeMenuBtn(): Locator {
    return this.page.getByRole("button", { name: /close menu/i });
  }

  async login(email?: string, password?: string) {
    await this.signInToggleBtn.click();
    await this.emailInput.fill((email ?? testConfig.credentials?.email) || "test@example.com");
    await this.passwordInput.fill((password ?? testConfig.credentials?.password) || "password123");
    await this.signInSubmitBtn.click();
  }

  async logout() {
    await this.loggedInUserBtn.click();
    await this.signOutBtn.click();
  }
}
