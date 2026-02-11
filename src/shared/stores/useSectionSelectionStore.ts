import { create } from "zustand";
import type { SectionId } from "../../animated/constants/sections";

export interface SectionSelection {
  id: SectionId;
  target: [number, number, number];
}

interface SectionSelectionStore {
  selectedSection: SectionSelection | null;
  setSelectedSection: (selection: SectionSelection) => void;
  clearSelectedSection: () => void;
}

export const useSectionSelectionStore = create<SectionSelectionStore>((set) => ({
  selectedSection: null,
  setSelectedSection: (selection) => set({ selectedSection: selection }),
  clearSelectedSection: () => set({ selectedSection: null }),
}));
