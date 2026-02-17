import { useMemo } from "react";
import { useDebugStore, type DebugRotationMode } from "../../shared/stores";

function formatValue(value: number) {
  return value.toFixed(2);
}

export function DebugPanel() {
  const debugEnabled = useDebugStore((state) => state.enabled);
  const setDebugEnabled = useDebugStore((state) => state.setEnabled);
  const rotationMode = useDebugStore((state) => state.rotationMode);
  const setRotationMode = useDebugStore((state) => state.setRotationMode);
  const intensities = useDebugStore((state) => state.lightIntensities);
  const setIntensity = useDebugStore((state) => state.setLightIntensity);

  const sliders = useMemo(
    () => [
      { key: "ambient", label: "Ambient", min: 0, max: 1.5, step: 0.05 },
      { key: "key", label: "Key", min: 0, max: 2.5, step: 0.05 },
      { key: "fill", label: "Fill", min: 0, max: 2, step: 0.05 },
      { key: "rim", label: "Rim", min: 0, max: 2, step: 0.05 },
    ],
    [],
  );

  const rotationOptions: { value: DebugRotationMode; label: string }[] = [
    { value: "object", label: "Object" },
    { value: "orbit", label: "Orbit" },
  ];

  if (!debugEnabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-60 rounded-xl bg-black/75 p-3 text-white shadow-lg backdrop-blur">
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

      <div className="mt-4">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-white/60">
          Light Tuning
        </div>
        <div className="mt-2 space-y-3">
          {sliders.map((slider) => {
            const value = intensities[slider.key as keyof typeof intensities];
            return (
              <label key={slider.key} className="block text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">{slider.label}</span>
                  <span className="tabular-nums text-white/60">
                    {formatValue(value)}
                  </span>
                </div>
                <input
                  className="mt-1 w-full"
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={value}
                  onChange={(event) => {
                    const nextValue = Number(event.target.value);
                    setIntensity(
                      slider.key as keyof typeof intensities,
                      nextValue,
                    );
                  }}
                />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
