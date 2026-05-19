import { test, expect } from "./fixtures";

const paths = ["/", "/about", "/gallery", "/videos", "/shop", "/shop/product-1"];

for (const path of paths) {
  test(`no internal console errors on ${path}`, async ({ page }) => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const failedResources: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
      if (msg.type() === "warning") warnings.push(msg.text());
    });

    page.on("pageerror", (err) => {
      errors.push(err.message);
    });

    page.on("response", (response) => {
      if (response.status() === 404) {
        failedResources.push(response.url());
      }
    });

    page.on("requestfailed", (request) => {
      failedResources.push(request.url());
    });

    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    // Determine if a resource failure is external
    const isExternal = (url: string) =>
      url.includes("youtube.com") ||
      url.includes("picsum.photos") ||
      url.includes("ytimg.com");

    const hasExternalFailures = failedResources.some(isExternal);
    const hasInternalFailures = failedResources.some((url) => !isExternal(url));

    // If the only failures are external, also allow generic "Failed to load resource" console errors
    const internalErrors = hasExternalFailures && !hasInternalFailures
      ? errors.filter((e) => !e.includes("Failed to load resource"))
      : errors;

    expect(internalErrors).toEqual([]);
    expect(failedResources.filter((url) => !isExternal(url))).toEqual([]);

    // Log external issues for info but don't fail
    const externalFailures = failedResources.filter(isExternal);
    if (externalFailures.length > 0) {
      console.log(`External resource issues on ${path}:`, externalFailures);
    }
    if (warnings.length > 0) {
      console.warn(`Warnings on ${path}:`, warnings);
    }
  });
}
