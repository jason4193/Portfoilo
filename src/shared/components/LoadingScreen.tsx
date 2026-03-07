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
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface-primary transition-opacity"
      style={{
        opacity: progress >= 100 && canHide ? 0 : 1,
        pointerEvents: progress >= 100 && canHide ? "none" : "auto",
      }}
    >
      <div className="text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="relative inline-flex h-12 w-12 items-center justify-center">
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-text-base border-t-transparent" />
              <div className="h-10 w-10 rounded-full bg-text-base/10" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-text-base">{message}</h2>
        <p className="text-sm text-text-muted mb-4 whitespace-pre-line text-left">
          {optionalMessage}
        </p>
        <div className="mx-auto h-1 w-48 overflow-hidden rounded-full bg-stroke">
          <div
            className="h-full bg-link transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-text-muted">{Math.round(progress)}%</p>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface-animated transition-opacity"
      style={{
        opacity: progress >= 100 && canHide ? 0 : 1,
        pointerEvents: progress >= 100 && canHide ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative inline-flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-3 border-text-base border-t-transparent" />
          <div className="h-14 w-14 rounded-full bg-text-base/20" />
        </div>
        <div className="text-2xl font-bold text-text-panel uppercase tracking-wider">
          {message}
        </div>
        {optionalMessage ? (
          <p className="text-text-panel/70 text-sm">{optionalMessage}</p>
        ) : null}
        <div className="w-48 h-1 overflow-hidden rounded-full bg-text-base/30">
          <div
            className="h-full bg-text-base transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-text-panel/80 text-sm font-mono">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
