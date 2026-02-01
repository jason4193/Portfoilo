import { usePortfolioModeStore } from "../shared/stores";
import { ThemeToggle } from "../shared/components/ThemeToggle";
import { MarkdownIcon } from "../shared/components/icons";

export function AnimatedApp() {
  const { toggleMode } = usePortfolioModeStore();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Minimal floating toggle buttons */}
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

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Animated 3D Portfolio</h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Coming soon! The interactive 3D business card experience is under development.
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-4">
            Switch back to markdown mode using the button in the top right.
          </p>
        </div>
      </main>
    </div>
  );
}
