"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type ThemeName,
  THEMES,
  DEFAULT_THEME,
  applyTheme,
  getStoredTheme,
  storeTheme,
} from "@/lib/theme";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
  themes: readonly ThemeName[];
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  themes: THEMES,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(DEFAULT_THEME);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // On mount, read localStorage or fallback to default
    const stored = getStoredTheme();
    const initial = stored ?? DEFAULT_THEME;
    setThemeState(initial);
    applyTheme(initial);
    setHydrated(true);
  }, []);

  const setTheme = (name: ThemeName) => {
    setThemeState(name);
    applyTheme(name);
    storeTheme(name);
  };

  // Prevent flash of unstyled content
  if (!hydrated) {
    return (
      <div
        suppressHydrationWarning
        style={{ visibility: "hidden" }}
      >
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}
