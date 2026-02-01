interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-block w-12 h-12 border-4 border-[var(--color-border)] border-t-[var(--color-link)] rounded-full animate-spin"></div>
        </div>
        <p className="text-lg text-[var(--color-text-secondary)]">{message}</p>
      </div>
    </div>
  );
}
