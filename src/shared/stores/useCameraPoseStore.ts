import { create } from "zustand";

interface CameraPoseStore {
  cameraPosition: [number, number, number];
  hasCameraPose: boolean;
  setCameraPosition: (position: [number, number, number]) => void;
}

export const useCameraPoseStore = create<CameraPoseStore>((set) => ({
  cameraPosition: [0, 0, 0],
  hasCameraPose: false,
  setCameraPosition: (position) =>
    set({ cameraPosition: position, hasCameraPose: true }),
}));
