import type { ReactNode } from "react";
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
  return (
    <div className="h-screen flex flex-col relative bg-surface-animated">
      {showLoading && (
        <AnimatedLoadingScreen
          message="Loading 3D Portfolio"
          progress={loadingProgress}
          onComplete={onLoadingComplete}
        />
      )}

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <ModeToggle />
        <ThemeToggle />
      </div>

      {children}
    </div>
  );
}
