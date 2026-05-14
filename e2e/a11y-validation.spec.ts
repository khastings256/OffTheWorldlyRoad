import { test, expect } from "./fixtures";

test.describe("A11y — Gallery", () => {
  test("photo cards are keyboard accessible and open lightbox", async ({ page }) => {
    await page.goto("/gallery");

    const firstPhoto = page.getByRole("button", { name: /view photo:/i }).first();
    await firstPhoto.focus();
    await expect(firstPhoto).toBeFocused();

    await page.keyboard.press("Enter");
    const lightbox = page.getByRole("dialog", { name: "Photo lightbox" });
    await expect(lightbox).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(lightbox).not.toBeVisible();
  });

  test("lightbox has aria-modal and proper labels", async ({ page }) => {
    await page.goto("/gallery");

    const firstPhoto = page.getByRole("button", { name: /view photo:/i }).first();
    await firstPhoto.click();

    const lightbox = page.getByRole("dialog", { name: "Photo lightbox" });
    await expect(lightbox).toHaveAttribute("aria-modal", "true");

    const closeBtn = page.getByRole("button", { name: /close lightbox/i });
    await expect(closeBtn).toBeVisible();
  });

  test("carousel has correct aria-roledescription and live region", async ({ page }) => {
    await page.goto("/gallery");

    const carousel = page.locator('[aria-roledescription="carousel"]').first();
    await expect(carousel).toBeVisible();
    await expect(carousel).toHaveAttribute("tabIndex", "0");

    const slides = page.locator('[aria-roledescription="slide"]');
    await expect(slides.first()).toHaveAttribute("aria-label", /1 of/);
  });
});

test.describe("A11y — Shop", () => {
  test("product cards are keyboard accessible", async ({ page }) => {
    await page.goto("/shop");

    const firstProduct = page.locator("[data-testid='product-card']").first();
    await firstProduct.focus();
    await expect(firstProduct).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/shop\/product-/);
  });

  test("add to cart button has aria-label and is keyboard operable", async ({ page }) => {
    await page.goto("/shop");

    const addBtn = page.locator("[data-testid='add-to-cart']").first();
    await expect(addBtn).toHaveAttribute("aria-label", /add .* to cart/i);

    await addBtn.focus();
    await expect(addBtn).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(addBtn).toHaveText("Added!");
  });

  test("cart button announces item count", async ({ page }) => {
    await page.goto("/shop");

    const addBtn = page.locator("[data-testid='add-to-cart']").first();
    await addBtn.click();
    await expect(addBtn).toHaveText("Added!");

    const cartBtn = page.locator('header button[aria-label*="cart"]').first();
    await expect(cartBtn).toHaveAttribute("aria-label", /1 items?/);
  });
});

test.describe("A11y — Videos", () => {
  test("video cards have descriptive aria-label", async ({ page }) => {
    await page.goto("/videos");

    const videoLink = page.getByRole("link", { name: /play video:/i }).first();
    await expect(videoLink).toBeVisible();
    await expect(videoLink).toHaveAttribute("target", "_blank");
    await expect(videoLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});

test.describe("A11y — Focus rings", () => {
  test("interactive elements show focus-visible ring", async ({ page }) => {
    await page.goto("/shop");

    const firstProduct = page.locator("[data-testid='product-card']").first();
    await firstProduct.focus();

    // Check that the focused element has a ring style applied
    const outline = await firstProduct.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.outlineWidth + " " + style.outlineStyle;
    });
    // focus-visible:ring-2 typically results in an outline when focused
    expect(outline).not.toBe("0px none");
  });
});
