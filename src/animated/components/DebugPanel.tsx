import { useDebugStore, type DebugRotationMode } from "../../shared/stores";
import { Leva } from "leva";

export function DebugPanel() {
  const debugEnabled = useDebugStore((state) => state.enabled);
  const setDebugEnabled = useDebugStore((state) => state.setEnabled);
  const rotationMode = useDebugStore((state) => state.rotationMode);
  const setRotationMode = useDebugStore((state) => state.setRotationMode);

  const rotationOptions: { value: DebugRotationMode; label: string }[] = [
    { value: "object", label: "Object" },
    { value: "orbit", label: "Orbit" },
  ];

  // Always render Leva so we can control its visibility
  if (!debugEnabled) {
    return <Leva hidden />;
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[999] w-60 rounded-xl bg-black/75 p-3 text-white shadow-lg backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-wide text-white/80">
            Debug Panel
          </div>
          <button
            className="rounded-md px-2 py-1 text-[10px] uppercase tracking-wide text-white/60 hover:text-white"
            type="button"
            onClick={() => setDebugEnabled(false)}
          >
            Close
          </button>
        </div>

        <div className="mt-3">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-white/60">
            Rotation Mode
          </div>
          <div className="mt-2 flex gap-2">
            {rotationOptions.map((option) => {
              const isActive = rotationMode === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isActive}
                  className={
                    "flex-1 rounded-md px-2 py-1 text-xs transition " +
                    (isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10")
                  }
                  onClick={() => setRotationMode(option.value)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Render Leva UI here so it is not caught in the React Three Fiber Canvas context */}
      <div className="fixed top-16 right-4 z-[999]">
        <Leva fill hidden={!debugEnabled} />
      </div>
    </>
  );
}
