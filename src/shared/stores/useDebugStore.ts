import { create } from "zustand";

type DebugRotationMode = "orbit" | "object";

type LightIntensities = {
  ambient: number;
  key: number;
  fill: number;
  rim: number;
};

interface DebugStore {
  // Debug panel visibility
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;

  // Rotation mode
  rotationMode: DebugRotationMode;
  setRotationMode: (mode: DebugRotationMode) => void;

  // Light intensities
  lightIntensities: LightIntensities;
  setLightIntensity: (key: keyof LightIntensities, value: number) => void;
  setLightIntensities: (next: LightIntensities) => void;
}

const defaultLightIntensities: LightIntensities = {
  ambient: 0.45,
  key: 1.3,
  fill: 0.5,
  rim: 0.35,
};

export const useDebugStore = create<DebugStore>((set) => ({
  enabled: false,
  setEnabled: (enabled) => set({ enabled }),

  rotationMode: "object",
  setRotationMode: (mode) => set({ rotationMode: mode }),

  lightIntensities: defaultLightIntensities,
  setLightIntensity: (key, value) =>
    set((state) => ({
      lightIntensities: {
        ...state.lightIntensities,
        [key]: value,
      },
    })),
  setLightIntensities: (next) => set({ lightIntensities: next }),
}));

export type { DebugRotationMode, LightIntensities };
