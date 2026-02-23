import { useThemeStore } from "../stores";
import { SunIcon, MoonIcon } from "./icons";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Toggle theme. Current: ${isDark ? "Dark" : "Light"}`}
      title={`Current theme: ${isDark ? "Dark" : "Light"}. Click to toggle`}
      className={`flex items-center justify-center rounded-full w-10 h-10 border border-stroke transition-colors duration-300 ${
        isDark
          ? "bg-neutral-800 text-white hover:bg-neutral-700"
          : "bg-white/70 text-neutral-700 hover:bg-white"
      }`}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
