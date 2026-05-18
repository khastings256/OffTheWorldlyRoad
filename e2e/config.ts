function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const testConfig = {
  baseURL: process.env.TEST_BASE_URL || "http://localhost:3000",
  credentials: process.env.TEST_USER_EMAIL ? {
    email: requireEnv("TEST_USER_EMAIL"),
    password: requireEnv("TEST_USER_PASSWORD"),
    name: requireEnv("TEST_USER_NAME"),
  } : undefined,
  timeouts: {
    navigation: 10_000,
    element: 5_000,
    animation: 500,
  },
  viewports: {
    desktop: { width: 1280, height: 720 },
    mobile: { width: 390, height: 844 },
  },
  browser: {
    cdpEndpoint: process.env.PLAYWRIGHT_CDP_ENDPOINT || (process.env.CI ? undefined : "ws://playwright:3000/"),
    localChromiumPath:
      process.env.PLAYWRIGHT_CHROMIUM_PATH ||
      "node_modules/playwright-core/.local-browsers/chromium-1223/chrome-linux64/chrome",
  },
} as const;
