// OTWR Configurable Theme System
// Supports: "canyon" (Option 1) | "pine" (Option 2)
// Designed for admin-console override in the future.

export const THEMES = ["canyon", "pine"] as const;
export type ThemeName = (typeof THEMES)[number];

export interface ThemeColors {
  // Backgrounds
  background: string;
  surface: string;
  surfaceElevated: string;

  // Text
  text: string;
  textMuted: string;
  textInverse: string;

  // Accents
  primary: string;
  primaryMuted: string;
  secondary: string;

  // Utility
  border: string;
  borderSubtle: string;

  // Dark mode backgrounds
  darkBackground: string;
  darkSurface: string;
  darkSurfaceElevated: string;

  // Dark mode accents
  darkPrimary: string;
  darkPrimaryMuted: string;
  darkSecondary: string;
}

export const themePresets: Record<ThemeName, ThemeColors> = {
  canyon: {
    // Light
    background: "#FDF8F3",
    surface: "#FFFFFF",
    surfaceElevated: "#F5EDE4",
    text: "#3D2B1F",
    textMuted: "#8C7B6B",
    textInverse: "#FDF8F3",
    primary: "#8C4A2F",
    primaryMuted: "#B87A5A",
    secondary: "#BFA36F",
    border: "#E8DDD0",
    borderSubtle: "#F0E6DA",
    // Dark
    darkBackground: "#1C1512",
    darkSurface: "#2E211A",
    darkSurfaceElevated: "#3A2A20",
    darkPrimary: "#D4A574",
    darkPrimaryMuted: "#B88B5E",
    darkSecondary: "#C4A97D",
  },
  pine: {
    // Light
    background: "#F6F5F0",
    surface: "#FFFFFF",
    surfaceElevated: "#EDECE6",
    text: "#1E2622",
    textMuted: "#6B756F",
    textInverse: "#F6F5F0",
    primary: "#3A4D39",
    primaryMuted: "#5C7A6B",
    secondary: "#8B7E66",
    border: "#D8D4C9",
    borderSubtle: "#E5E2D9",
    // Dark
    darkBackground: "#121C17",
    darkSurface: "#1A2A22",
    darkSurfaceElevated: "#22332A",
    darkPrimary: "#7A9E87",
    darkPrimaryMuted: "#5E856B",
    darkSecondary: "#9A8E76",
  },
};

export const DEFAULT_THEME: ThemeName = "canyon";

/** Applies a theme to CSS custom properties on the document element. */
export function applyTheme(name: ThemeName) {
  const t = themePresets[name];
  const root = document.documentElement;

  // Light tokens
  root.style.setProperty("--otwr-bg", t.background);
  root.style.setProperty("--otwr-surface", t.surface);
  root.style.setProperty("--otwr-surface-elevated", t.surfaceElevated);
  root.style.setProperty("--otwr-text", t.text);
  root.style.setProperty("--otwr-text-muted", t.textMuted);
  root.style.setProperty("--otwr-text-inverse", t.textInverse);
  root.style.setProperty("--otwr-primary", t.primary);
  root.style.setProperty("--otwr-primary-muted", t.primaryMuted);
  root.style.setProperty("--otwr-secondary", t.secondary);
  root.style.setProperty("--otwr-border", t.border);
  root.style.setProperty("--otwr-border-subtle", t.borderSubtle);

  // Dark tokens
  root.style.setProperty("--otwr-dark-bg", t.darkBackground);
  root.style.setProperty("--otwr-dark-surface", t.darkSurface);
  root.style.setProperty("--otwr-dark-surface-elevated", t.darkSurfaceElevated);
  root.style.setProperty("--otwr-dark-primary", t.darkPrimary);
  root.style.setProperty("--otwr-dark-primary-muted", t.darkPrimaryMuted);
  root.style.setProperty("--otwr-dark-secondary", t.darkSecondary);

  root.setAttribute("data-theme", name);
}

export function getStoredTheme(): ThemeName | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("otwr-theme") as ThemeName | null;
  return THEMES.includes(raw as ThemeName) ? raw : null;
}

export function storeTheme(name: ThemeName) {
  if (typeof window !== "undefined") {
    localStorage.setItem("otwr-theme", name);
  }
}
