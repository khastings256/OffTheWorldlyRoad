"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface p-1 shadow-sm">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={
            "px-3 py-1.5 rounded-md text-sm font-medium transition-colors " +
            (theme === t
              ? "bg-primary text-inverse"
              : "text-muted hover:text-foreground hover:bg-surface-elevated")
          }
          aria-pressed={theme === t}
        >
          {t === "canyon" ? "Canyon" : "Pine"}
        </button>
      ))}
    </div>
  );
}
