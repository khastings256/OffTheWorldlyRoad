import { test, expect } from "./fixtures";

test.describe("Homepage — Mobile", () => {
  const drawer = (page: any) => page.locator("div.md\\:hidden.flex.flex-col");

  test("hamburger opens mobile drawer", async ({ mobilePage }) => {
    await mobilePage.goto("http://172.19.0.7:3000/");
    const openBtn = mobilePage.getByRole("button", { name: /open menu/i });
    await expect(openBtn).toBeVisible();
    await openBtn.click();

    await expect(mobilePage.getByRole("button", { name: /close menu/i })).toBeVisible();
    await expect(drawer(mobilePage).getByText(/faith, wilderness/i)).toBeVisible();
  });

  test("mobile drawer shows all nav links", async ({ mobilePage }) => {
    await mobilePage.goto("http://172.19.0.7:3000/");
    await mobilePage.getByRole("button", { name: /open menu/i }).click();

    const nav = drawer(mobilePage);
    await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Gallery" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Blog" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Shop" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
  });

  test("mobile drawer closes on backdrop tap", async ({ mobilePage }) => {
    await mobilePage.goto("http://172.19.0.7:3000/");
    await mobilePage.getByRole("button", { name: /open menu/i }).click();
    await expect(mobilePage.getByRole("button", { name: /close menu/i })).toBeVisible();

    // Click on the left edge of the screen (backdrop, not covered by drawer)
    await mobilePage.mouse.click(10, 10);
    await expect(mobilePage.getByRole("button", { name: /close menu/i })).not.toBeVisible();
  });

  test("mobile drawer closes on link tap", async ({ mobilePage }) => {
    await mobilePage.goto("http://172.19.0.7:3000/");
    await mobilePage.getByRole("button", { name: /open menu/i }).click();
    await drawer(mobilePage).getByRole("link", { name: "Gallery" }).click();
    await expect(mobilePage.getByRole("button", { name: /close menu/i })).not.toBeVisible();
  });

  test("theme toggle is hidden on mobile", async ({ mobilePage }) => {
    await mobilePage.goto("http://172.19.0.7:3000/");
    await expect(mobilePage.getByRole("button", { name: /canyon/i })).not.toBeVisible();
  });

  test("login button is hidden on mobile", async ({ mobilePage }) => {
    await mobilePage.goto("http://172.19.0.7:3000/");
    await expect(mobilePage.getByRole("button", { name: /sign in/i })).not.toBeVisible();
  });
});
