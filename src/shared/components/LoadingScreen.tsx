import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  message?: string;
  optionalMessage?: string;
  progress: number;
  onComplete?: () => void;
  minDurationMs?: number;
}

function useCompletionGate(
  progress: number,
  onComplete?: () => void,
  minDurationMs = 0,
) {
  const [canHide, setCanHide] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (startTimeRef.current == null || progress === 0) {
      startTimeRef.current = performance.now();
    }
  }, [progress]);

  useEffect(() => {
    if (progress < 100) {
      setCanHide(false);
      return;
    }

    const startTime = startTimeRef.current ?? performance.now();
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, minDurationMs - elapsed);
    const hideTimeoutId = window.setTimeout(() => {
      setCanHide(true);
    }, remaining);

    const completeTimeoutId = onComplete
      ? window.setTimeout(() => {
          onComplete();
        }, remaining + 500)
      : undefined;

    return () => {
      window.clearTimeout(hideTimeoutId);
      if (completeTimeoutId != null) {
        window.clearTimeout(completeTimeoutId);
      }
    };
  }, [progress, onComplete, minDurationMs]);

  return canHide;
}

export function LoadingScreen({
  message = "Loading...",
  optionalMessage = "",
  progress,
  onComplete,
  minDurationMs = 0,
}: LoadingScreenProps) {
  const canHide = useCompletionGate(progress, onComplete, minDurationMs);

  return (
    <div
      className="loading-screen"
      style={{
        opacity: progress >= 100 && canHide ? 0 : 1,
        pointerEvents: progress >= 100 && canHide ? "none" : "auto",
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

export function AnimatedLoadingScreen({
  message = "Loading 3D Portfolio",
  optionalMessage = "",
  progress,
  onComplete,
  minDurationMs = 0,
}: LoadingScreenProps) {
  const canHide = useCompletionGate(progress, onComplete, minDurationMs);

  return (
    <div
      className="animated-loading-screen"
      style={{
        opacity: progress >= 100 && canHide ? 0 : 1,
        pointerEvents: progress >= 100 && canHide ? "none" : "auto",
      }}
    >
      <div className="animated-loading-content">
        <div className="animated-loading-spinner" aria-hidden="true" />
        <div className="animated-loading-text">{message}</div>
        {optionalMessage ? (
          <p className="animated-loading-subtext">{optionalMessage}</p>
        ) : null}
        <div className="animated-loading-bar">
          <div
            className="animated-loading-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="animated-loading-percent">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
