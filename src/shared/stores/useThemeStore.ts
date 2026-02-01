import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

interface ThemeStore {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

function getInitialTheme(): ThemeMode {
  // Check localStorage first
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme-storage");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.state?.theme === "light" || parsed.state?.theme === "dark") {
          return parsed.state.theme;
        }
      } catch {
        // Fall through to system preference
      }
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  // Default to light if window is not available
  return "light";
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      setTheme: (newTheme: ThemeMode) => {
        set({ theme: newTheme });
        // Apply theme to document
        if (typeof window !== "undefined") {
          document.documentElement.setAttribute("data-theme", newTheme);
        }
      },
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === "light" ? "dark" : "light";
        set({ theme: newTheme });
        // Apply theme to document
        if (typeof window !== "undefined") {
          document.documentElement.setAttribute("data-theme", newTheme);
        }
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        // Apply theme after rehydration from localStorage
        if (state && typeof window !== "undefined") {
          document.documentElement.setAttribute("data-theme", state.theme);
        }
      },
    }
  )
);

// Apply theme on initial load (before React hydration)
if (typeof window !== "undefined") {
  const initialTheme = getInitialTheme();
  document.documentElement.setAttribute("data-theme", initialTheme);
}
