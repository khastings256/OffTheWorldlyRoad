"use strict";

import { test, expect } from "./fixtures";

// Breakpoints for responsiveness testing
const breakpoints = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
};

test.describe("About Page", () => {
  // Test responsiveness
  for (const [device, viewport] of Object.entries(breakpoints)) {
    test(`should be responsive on ${device} viewport`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/about");
      await page.waitForLoadState("networkidle");
      
      // Check if the page renders without errors
      const heroSection = page.locator("h1:has-text('About Us')");
      await expect(heroSection).toBeVisible();
      
      // Check if static content is visible
      const missionSection = page.locator("h2:has-text('Our Mission')");
      await expect(missionSection).toBeVisible();
      
      const teamSection = page.locator("h2:has-text('Meet the Team')");
      await expect(teamSection).toBeVisible();
      
      const valuesSection = page.locator("h2:has-text('Our Values')");
      await expect(valuesSection).toBeVisible();
    });
  }
  
  // Test menu integration
  test("should navigate to /about from the menu", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    
    // Click the About link in the menu
    const aboutLink = page.locator("a:has-text('About')");
    await aboutLink.click();
    
    // Verify navigation to /about
    await expect(page).toHaveURL("/about");
    const heroSection = page.locator("h1:has-text('About Us')");
    await expect(heroSection).toBeVisible();
  });
  
  // Test static content visibility
  test("should display static content correctly", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    
    // Verify hero section
    const heroTitle = page.locator("h1:has-text('About Us')");
    await expect(heroTitle).toBeVisible();
    
    // Verify mission section
    const missionTitle = page.locator("h2:has-text('Our Mission')");
    await expect(missionTitle).toBeVisible();
    const missionText = page.locator("text=To inspire and equip believers");
    await expect(missionText).toBeVisible();
    
    // Verify team section
    const teamTitle = page.locator("h2:has-text('Meet the Team')");
    await expect(teamTitle).toBeVisible();
    const teamMember = page.locator("h3:has-text('John Doe')");
    await expect(teamMember).toBeVisible();
    
    // Verify values section
    const valuesTitle = page.locator("h2:has-text('Our Values')");
    await expect(valuesTitle).toBeVisible();
    const valueItem = page.locator("text=Faith: We believe in the power of faith");
    await expect(valueItem).toBeVisible();
  });
});