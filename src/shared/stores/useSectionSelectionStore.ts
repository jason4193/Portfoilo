import { create } from "zustand";
import type { SectionId } from "../../animated/constants/sections";

export interface SectionSelection {
  id: SectionId;
  target: [number, number, number];
}

interface SectionSelectionStore {
  selectedSection: SectionSelection | null;
  focusTarget: [number, number, number] | null;
  isFocused: boolean;
  setSelectedSection: (selection: SectionSelection) => void;
  clearSelectedSection: () => void;
}

export const useSectionSelectionStore = create<SectionSelectionStore>((set) => ({
  selectedSection: null,
  focusTarget: null,
  isFocused: false,
  setSelectedSection: (selection) =>
    set({
      selectedSection: selection,
      focusTarget: selection.target,
      isFocused: true,
    }),
  clearSelectedSection: () =>
    set({
      selectedSection: null,
      focusTarget: null,
      isFocused: false,
    }),
}));
