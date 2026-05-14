export const testConfig = {
  baseURL: process.env.TEST_BASE_URL || "http://172.19.0.7:3000",
  credentials: {
    email: process.env.TEST_USER_EMAIL || "test@example.com",
    password: process.env.TEST_USER_PASSWORD || "password123",
    name: process.env.TEST_USER_NAME || "Kenneth",
  },
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
    cdpEndpoint: process.env.PLAYWRIGHT_CDP_ENDPOINT || "ws://playwright:3000/",
    localChromiumPath:
      process.env.PLAYWRIGHT_CHROMIUM_PATH ||
      "node_modules/playwright-core/.local-browsers/chromium-1223/chrome-linux64/chrome",
  },
} as const;
