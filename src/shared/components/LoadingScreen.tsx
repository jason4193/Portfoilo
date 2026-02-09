import { useEffect } from "react";

interface LoadingScreenProps {
  message?: string;
  optionalMessage?: string;
  progress: number;
  onComplete?: () => void;
}

export function LoadingScreen({
  message = "Loading...",
  optionalMessage = "",
  progress,
  onComplete,
}: LoadingScreenProps) {
  // Auto-hide when progress reaches 100%
  useEffect(() => {
    let timeoutId: number | undefined;

    if (progress >= 100 && onComplete) {
      timeoutId = window.setTimeout(() => {
        onComplete();
      }, 500);
    }

    return () => {
      if (timeoutId != null) {
        clearTimeout(timeoutId);
      }
    };
  }, [progress, onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg-primary)] transition-opacity duration-500"
      style={{
        opacity: progress >= 100 ? 0 : 1,
        pointerEvents: progress >= 100 ? "none" : "auto",
      }}
    >
      <div className="text-center">
        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-[var(--color-border)] border-t-[var(--color-accent)] rounded-full animate-spin mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-4">{message}</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 whitespace-pre-line text-left">
          {optionalMessage}
        </p>
        <div className="w-64 h-2 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-[var(--color-accent)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-[var(--color-text-secondary)]">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
