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
      className="loading-screen"
      style={{
        opacity: progress >= 100 ? 0 : 1,
        pointerEvents: progress >= 100 ? "none" : "auto",
      }}
    >
      <div className="text-center">
        <div className="mb-8">
          <div className="loading-spinner mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-4">{message}</h2>
        <p className="text-sm text-secondary mb-4 whitespace-pre-line text-left">
          {optionalMessage}
        </p>
        <div className="loading-progress-bg mx-auto">
          <div
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-secondary">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
