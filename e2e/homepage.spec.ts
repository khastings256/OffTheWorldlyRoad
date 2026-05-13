import { test, expect } from "./fixtures";

test.describe("Homepage — Desktop", () => {
  test("renders header with logo and navigation", async ({ page }) => {
    await page.goto("http://172.19.0.7:3000/");
    await expect(page.getByAltText(/off the worldly road/i).first()).toBeVisible();
    await expect(page.getByText("OTWR")).toBeVisible();
    await expect(page.getByRole("link", { name: /^home$/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /gallery/i })).toBeVisible();
  });

  test("theme toggle switches between Canyon and Pine", async ({ page }) => {
    await page.goto("http://172.19.0.7:3000/");
    const canyonBtn = page.getByRole("button", { name: /canyon/i });
    const pineBtn = page.getByRole("button", { name: /pine/i });

    await expect(canyonBtn).toHaveAttribute("aria-pressed", "true");
    await pineBtn.click();
    await expect(pineBtn).toHaveAttribute("aria-pressed", "true");
    await expect(canyonBtn).toHaveAttribute("aria-pressed", "false");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "pine");
  });

  test("login flow: sign in and sign out", async ({ page }) => {
    await page.goto("http://172.19.0.7:3000/");
    await page.getByRole("button", { name: /sign in/i }).first().click();
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/password/i).fill("password123");
    await page.locator("form").getByRole("button", { name: /^sign in$/i }).click();

    await expect(page.getByText("Kenneth")).toBeVisible();

    await page.getByText("Kenneth").click();
    await page.getByRole("button", { name: /sign out/i }).click();

    await expect(page.getByRole("button", { name: /sign in/i }).first()).toBeVisible();
  });

  test("navigation updates active state", async ({ page }) => {
    await page.goto("http://172.19.0.7:3000/");
    const blogLink = page.getByRole("link", { name: /blog/i });
    await blogLink.click();
    await expect(blogLink).toHaveClass(/text-primary/);
  });
});
