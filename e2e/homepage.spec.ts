import { test, expect } from "./fixtures";

test.describe("Homepage — Desktop", () => {
  test("renders header with logo and navigation", async ({ homePage }) => {
    const { header } = homePage;
    await expect(header.logoImage).toBeVisible();
    await expect(header.brandText).toBeVisible();
    await expect(header.navLink(/^home$/i)).toBeVisible();
    await expect(header.navLink(/gallery/i)).toBeVisible();
  });

  test("theme toggle switches between Canyon and Pine", async ({ homePage }) => {
    const { header, page } = homePage;
    const { themeCanyonBtn, themePineBtn } = header;

    await expect(themeCanyonBtn).toHaveAttribute("aria-pressed", "true");
    await themePineBtn.click();
    await expect(themePineBtn).toHaveAttribute("aria-pressed", "true");
    await expect(themeCanyonBtn).toHaveAttribute("aria-pressed", "false");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "pine");
  });

  test("login flow: sign in and sign out", async ({ homePage }) => {
    const { header } = homePage;

    await header.login();
    await expect(header.loggedInUserBtn).toBeVisible();

    await header.logout();
    await expect(header.signInToggleBtn).toBeVisible();
  });

  test("navigation updates active state", async ({ homePage }) => {
    const { header } = homePage;
    const blogLink = header.navLink(/blog/i);
    await blogLink.click();
    await expect(blogLink).toHaveClass(/text-primary/);
  });
});
