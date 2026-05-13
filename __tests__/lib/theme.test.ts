import {
  THEMES,
  DEFAULT_THEME,
  themePresets,
  applyTheme,
  getStoredTheme,
  storeTheme,
  type ThemeName,
} from "@/lib/theme";

describe("theme utilities", () => {
  let root: HTMLHtmlElement;
  let storage: Record<string, string> = {};

  beforeEach(() => {
    // Build a fake documentElement we can inspect
    root = document.createElement("html") as unknown as HTMLHtmlElement;
    Object.defineProperty(document, "documentElement", {
      value: root,
      configurable: true,
    });

    // Fake localStorage
    storage = {};
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: (key: string) => storage[key] ?? null,
        setItem: (key: string, value: string) => {
          storage[key] = value;
        },
        removeItem: (key: string) => {
          delete storage[key];
        },
      },
      configurable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("themePresets", () => {
    it("contains canyon and pine", () => {
      expect(THEMES).toContain("canyon");
      expect(THEMES).toContain("pine");
      expect(themePresets.canyon).toBeDefined();
      expect(themePresets.pine).toBeDefined();
    });

    it("canyon has expected light tokens", () => {
      const c = themePresets.canyon;
      expect(c.background).toBe("#FDF8F3");
      expect(c.primary).toBe("#8C4A2F");
      expect(c.secondary).toBe("#BFA36F");
    });

    it("pine has expected light tokens", () => {
      const p = themePresets.pine;
      expect(p.background).toBe("#F6F5F0");
      expect(p.primary).toBe("#3A4D39");
      expect(p.secondary).toBe("#8B7E66");
    });

    it("each theme has dark mode tokens", () => {
      for (const name of THEMES) {
        const t = themePresets[name as ThemeName];
        expect(t.darkBackground).toBeTruthy();
        expect(t.darkPrimary).toBeTruthy();
      }
    });
  });

  describe("applyTheme", () => {
    it("sets CSS custom properties for canyon", () => {
      applyTheme("canyon");
      expect(root.style.getPropertyValue("--otwr-bg")).toBe("#FDF8F3");
      expect(root.style.getPropertyValue("--otwr-primary")).toBe("#8C4A2F");
      expect(root.style.getPropertyValue("--otwr-dark-bg")).toBe("#1C1512");
    });

    it("sets CSS custom properties for pine", () => {
      applyTheme("pine");
      expect(root.style.getPropertyValue("--otwr-bg")).toBe("#F6F5F0");
      expect(root.style.getPropertyValue("--otwr-primary")).toBe("#3A4D39");
      expect(root.style.getPropertyValue("--otwr-dark-bg")).toBe("#121C17");
    });

    it("sets data-theme attribute", () => {
      applyTheme("canyon");
      expect(root.getAttribute("data-theme")).toBe("canyon");
      applyTheme("pine");
      expect(root.getAttribute("data-theme")).toBe("pine");
    });

    it("overwrites previous theme properties when switching", () => {
      applyTheme("canyon");
      expect(root.style.getPropertyValue("--otwr-bg")).toBe("#FDF8F3");
      applyTheme("pine");
      expect(root.style.getPropertyValue("--otwr-bg")).toBe("#F6F5F0");
    });
  });

  describe("getStoredTheme", () => {
    it("returns null when nothing is stored", () => {
      expect(getStoredTheme()).toBeNull();
    });

    it("returns the stored valid theme", () => {
      storage["otwr-theme"] = "pine";
      expect(getStoredTheme()).toBe("pine");
    });

    it("returns null for invalid stored value", () => {
      storage["otwr-theme"] = "ocean";
      expect(getStoredTheme()).toBeNull();
    });

    it("returns null during SSR (no window)", () => {
      const originalWindow = global.window;
      // @ts-expect-error simulate SSR
      delete global.window;
      expect(getStoredTheme()).toBeNull();
      global.window = originalWindow;
    });
  });

  describe("storeTheme", () => {
    it("writes theme to localStorage", () => {
      storeTheme("pine");
      expect(storage["otwr-theme"]).toBe("pine");
    });

    it("does not throw during SSR (no window)", () => {
      const originalWindow = global.window;
      // @ts-expect-error simulate SSR
      delete global.window;
      expect(() => storeTheme("canyon")).not.toThrow();
      global.window = originalWindow;
    });
  });

  describe("DEFAULT_THEME", () => {
    it("is canyon", () => {
      expect(DEFAULT_THEME).toBe("canyon");
    });
  });
});
