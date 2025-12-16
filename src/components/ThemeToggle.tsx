import { useTheme } from "../hooks/useTheme";
import { SunIcon, MoonIcon } from "./icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-primary)] transition-all duration-300 flex items-center justify-center group overflow-hidden"
      aria-label={`Toggle theme. Current: ${isDark ? "Dark" : "Light"}`}
      title={`Current theme: ${isDark ? "Dark" : "Light"}. Click to toggle`}
    >
      {/* Animated Sun/Moon toggle with sector transformation */}
      <div className="relative w-6 h-6">
        {/* Sun icon (light mode) - rotates and scales */}
        <SunIcon
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
            isDark
              ? "opacity-0 rotate-[135deg] scale-0"
              : "opacity-100 rotate-0 scale-100"
          }`}
          aria-hidden={true}
        />

        {/* Moon icon (dark mode) - rotates and scales with crescent */}
        <MoonIcon
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-[135deg] scale-0"
          }`}
          aria-hidden={true}
        />
      </div>
    </button>
  );
}
