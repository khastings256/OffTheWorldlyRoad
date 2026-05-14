import { test, expect } from "./fixtures";

test.describe("Homepage — Mobile", () => {
  test("hamburger opens mobile drawer", async ({ mobileHomePage }) => {
    const { mobileNav } = mobileHomePage;
    await expect(mobileNav.openMenuBtn).toBeVisible();
    await mobileNav.open();

    await expect(mobileNav.closeMenuBtn).toBeVisible();
    await expect(mobileNav.tagline).toBeVisible();
  });

  test("mobile drawer shows all nav links", async ({ mobileHomePage }) => {
    const { mobileNav } = mobileHomePage;
    await mobileNav.open();

    await expect(mobileNav.navLink("Home")).toBeVisible();
    await expect(mobileNav.navLink("Gallery")).toBeVisible();
    await expect(mobileNav.navLink("Blog")).toBeVisible();
    await expect(mobileNav.navLink("Shop")).toBeVisible();
    await expect(mobileNav.navLink("About")).toBeVisible();
  });

  test("mobile drawer closes on backdrop tap", async ({ mobileHomePage }) => {
    const { mobileNav } = mobileHomePage;
    await mobileNav.open();
    await expect(mobileNav.closeMenuBtn).toBeVisible();

    await mobileNav.closeViaBackdrop();
    await expect(mobileNav.closeMenuBtn).not.toBeVisible();
  });

  test("mobile drawer closes on link tap", async ({ mobileHomePage }) => {
    const { mobileNav } = mobileHomePage;
    await mobileNav.open();
    await mobileNav.closeViaLink("Gallery");
    await expect(mobileNav.closeMenuBtn).not.toBeVisible();
  });

  test("theme toggle is hidden on mobile", async ({ mobileHomePage }) => {
    const { header } = mobileHomePage;
    await expect(header.themeCanyonBtn).not.toBeVisible();
  });

  test("login button is hidden on mobile", async ({ mobileHomePage }) => {
    const { header } = mobileHomePage;
    await expect(header.signInToggleBtn).not.toBeVisible();
  });
});
