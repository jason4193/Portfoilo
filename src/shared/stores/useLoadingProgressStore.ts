import { create } from "zustand";

interface LoadingProgressStore {
  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;
}

export const useLoadingProgressStore = create<LoadingProgressStore>((set) => ({
  loadingProgress: 0,
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
}));
