import { useState, useEffect } from "react";

export type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  // Check localStorage first
  const saved = localStorage.getItem("theme") as ThemeMode | null;
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  // Check system preference on initial load
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  // Default to light if window is not available
  return "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);

  const setThemeMode = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return {
    theme,
    setTheme: setThemeMode,
  };
}
