import type { ReactNode } from "react";
import { usePortfolioModeStore, useThemeStore } from "../../shared/stores";
import { ThemeToggle } from "../../shared/components/ThemeToggle";
import { MarkdownIcon } from "../../shared/components/icons";
import { LoadingScreen } from "../../shared/components/LoadingScreen";

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
  const { toggleMode } = usePortfolioModeStore();
  const { theme } = useThemeStore();

  return (
    <div
      className="h-screen flex flex-col relative"
      style={{
        backgroundColor:
          theme === "light" ? "#DDE4EA" : "var(--color-bg-primary)",
      }}
    >
      {showLoading && (
        <LoadingScreen
          message="Loading 3D Portfolio"
          progress={loadingProgress}
          onComplete={onLoadingComplete}
        />
      )}

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleMode}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-primary)] transition-colors shadow-lg flex items-center justify-center"
          aria-label="Switch to markdown mode"
          title="Switch to markdown mode"
        >
          <MarkdownIcon className="w-5 h-5" aria-hidden={true} />
        </button>
        <ThemeToggle />
      </div>

      {children}
    </div>
  );
}
