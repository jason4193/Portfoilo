import type { ReactNode } from "react";
import { useThemeStore } from "../../shared/stores";
import { ThemeToggle } from "../../shared/components/ThemeToggle";
import { ModeToggle } from "../../shared/components/ModeToggle";
import { AnimatedLoadingScreen } from "../../shared/components/LoadingScreen";

interface LayoutProps {
  children: ReactNode;
  showLoading?: boolean;
  loadingProgress?: number;
  onLoadingComplete?: () => void;
}

export function Layout({
  children,
  showLoading = false,
  loadingProgress = 0,
  onLoadingComplete,
}: LayoutProps) {
  const { theme } = useThemeStore();

  return (
    <div
      className="h-screen flex flex-col relative"
      style={{
        backgroundColor:
          theme === "light"
            ? "var(--color-animated-bg-light)"
            : "var(--color-bg-primary)",
      }}
    >
      {showLoading && (
        <AnimatedLoadingScreen
          message="Loading 3D Portfolio"
          progress={loadingProgress}
          onComplete={onLoadingComplete}
        />
      )}

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <ModeToggle className="w-9 h-9 sm:w-10 sm:h-10 shadow-lg" />
        <ThemeToggle />
      </div>

      {children}
    </div>
  );
}
