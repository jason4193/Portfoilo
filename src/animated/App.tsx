import { usePortfolioModeStore } from "../shared/stores";
import { ThemeToggle } from "../shared/components/ThemeToggle";

export function AnimatedApp() {
  const { toggleMode } = usePortfolioModeStore();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Minimal floating toggle buttons */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleMode}
          className="px-3 py-1.5 text-sm border border-[var(--color-border)] rounded-md bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-primary)] transition-colors shadow-lg"
          aria-label="Switch to TLDR mode"
        >
          TLDR
        </button>
        <ThemeToggle />
      </div>

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Animated 3D Portfolio</h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Coming soon! The interactive 3D business card experience is under development.
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-4">
            Switch back to TLDR mode using the button in the top right.
          </p>
        </div>
      </main>
    </div>
  );
}
