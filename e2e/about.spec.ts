import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const breakpoints = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
};

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('should be accessible', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize(breakpoints.mobile);
    await expect(page).toHaveScreenshot('about-mobile.png', { fullPage: true });
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize(breakpoints.tablet);
    await expect(page).toHaveScreenshot('about-tablet.png', { fullPage: true });
  });

  test('should be responsive on desktop', async ({ page }) => {
    await page.setViewportSize(breakpoints.desktop);
    await expect(page).toHaveScreenshot('about-desktop.png', { fullPage: true });
  });

  test('should have visible static content', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('p')).toBeVisible();
  });

  test('should be accessible via OTWR menu', async ({ page }) => {
    await page.goto('/');
    await page.click('text=About');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toBeVisible();
  });
});