import { test, expect } from "./fixtures";

test.describe("Gallery page", () => {
  test("loads with visible carousel and opens lightbox", async ({ page }) => {
    await page.goto("/gallery");

    // Carousel is visible
    const carousel = page.locator('[aria-roledescription="carousel"]').first();
    await expect(carousel).toBeVisible();

    // First photo card is visible
    const firstPhoto = page.getByRole("button", { name: /view photo:/i }).first();
    await expect(firstPhoto).toBeVisible();

    // Click opens lightbox
    await firstPhoto.click();
    const lightbox = page.getByRole("dialog", { name: "Photo lightbox" });
    await expect(lightbox).toBeVisible();

    // Escape closes lightbox
    await page.keyboard.press("Escape");
    await expect(lightbox).not.toBeVisible();
  });

  test("lightbox arrow navigation works with multiple photos", async ({ page }) => {
    await page.goto("/gallery");

    const firstPhoto = page.getByRole("button", { name: /view photo:/i }).first();
    await firstPhoto.click();

    const lightbox = page.getByRole("dialog", { name: "Photo lightbox" });
    await expect(lightbox).toBeVisible();

    // Navigate with arrow right
    await page.keyboard.press("ArrowRight");
    await expect(lightbox).toBeVisible();

    // Navigate with arrow left
    await page.keyboard.press("ArrowLeft");
    await expect(lightbox).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(lightbox).not.toBeVisible();
  });
});

test.describe("Videos page", () => {
  test("loads with visible carousel and video links have correct href", async ({ page }) => {
    await page.goto("/videos");

    const carousel = page.locator('[aria-roledescription="carousel"]').first();
    await expect(carousel).toBeVisible();

    const videoLink = page.getByRole("link", { name: /play video:/i }).first();
    await expect(videoLink).toBeVisible();

    const href = await videoLink.getAttribute("href");
    expect(href).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/);
    await expect(videoLink).toHaveAttribute("target", "_blank");
    await expect(videoLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});

test.describe("Shop page", () => {
  test("loads with visible carousel and product navigation works", async ({ page }) => {
    await page.goto("/shop");

    const carousel = page.locator('[aria-roledescription="carousel"]').first();
    await expect(carousel).toBeVisible();

    // First product card navigates to detail page
    const firstProduct = page.locator("[data-testid='product-card']").first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();

    await expect(page).toHaveURL(/\/shop\/product-/);
  });

  test("add to cart updates cart badge in header", async ({ page }) => {
    await page.goto("/shop");

    const firstProductAddBtn = page.locator("[data-testid='add-to-cart']").first();
    await expect(firstProductAddBtn).toBeVisible();
    await firstProductAddBtn.click();

    // Wait for "Added!" state
    await expect(firstProductAddBtn).toHaveText("Added!");

    // Cart badge should show 1
    const cartButton = page.locator('header button[aria-label*="cart"]').first();
    await expect(cartButton).toContainText("1");
  });
});

test.describe("Product detail page", () => {
  test("loads with product name and add to cart works", async ({ page }) => {
    await page.goto("/shop/product-1");

    // Product name visible
    await expect(page.getByRole("heading", { name: /Wilderness Journal/i })).toBeVisible();

    // Add to cart
    const addBtn = page.locator("[data-testid='add-to-cart-detail']");
    await expect(addBtn).toBeVisible();
    await addBtn.click();
    await expect(addBtn).toHaveText("Added!");

    // Cart badge should show 1
    const cartButton = page.locator('header button[aria-label*="cart"]').first();
    await expect(cartButton).toContainText("1");
  });

  test("back link navigates to /shop", async ({ page }) => {
    await page.goto("/shop/product-1");

    const backLink = page.getByRole("link", { name: /back to shop/i });
    await expect(backLink).toBeVisible();
    await backLink.click();

    await expect(page).toHaveURL("/shop");
  });
});

test.describe("Theme validation", () => {
  test("toggles between canyon and pine themes", async ({ page }) => {
    await page.goto("/gallery");

    const themeCanyonBtn = page.getByRole("button", { name: /canyon/i });
    const themePineBtn = page.getByRole("button", { name: /pine/i });

    await expect(themeCanyonBtn).toBeVisible();
    await expect(themePineBtn).toBeVisible();

    // Default is canyon
    await expect(themeCanyonBtn).toHaveAttribute("aria-pressed", "true");

    // Switch to pine
    await themePineBtn.click();
    await expect(themePineBtn).toHaveAttribute("aria-pressed", "true");
    await expect(themeCanyonBtn).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "pine");

    // Switch back to canyon
    await themeCanyonBtn.click();
    await expect(themeCanyonBtn).toHaveAttribute("aria-pressed", "true");
    await expect(themePineBtn).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "canyon");
  });

  test("dark mode renders correctly on shop page", async ({ page }) => {
    await page.goto("/shop");

    // Emulate dark mode
    await page.emulateMedia({ colorScheme: "dark" });

    const carousel = page.locator('[aria-roledescription="carousel"]').first();
    await expect(carousel).toBeVisible();

    const firstProduct = page.locator("[data-testid='product-card']").first();
    await expect(firstProduct).toBeVisible();

    // Ensure text is visible (not invisible) by checking the product name contrast
    const productName = firstProduct.locator("h3");
    await expect(productName).toBeVisible();

    // Check computed color to ensure it's not transparent or white-on-white
    const color = await productName.evaluate((el) => getComputedStyle(el).color);
    expect(color).not.toBe("rgba(0, 0, 0, 0)");
  });
});
