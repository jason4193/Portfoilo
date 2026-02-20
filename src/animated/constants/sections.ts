export type SectionId =
  | "aboutMe"
  | "community"
  | "awards"
  | "projects"
  | "working"
  | "education";

export const SECTION_TITLES: Record<SectionId, string> = {
  aboutMe: "About Me",
  community: "Community",
  awards: "Awards",
  projects: "Projects",
  working: "Working",
  education: "Education",
};

export const SECTION_COLORS: Record<SectionId, string> = {
  aboutMe: "var(--color-section-aboutMe)",
  community: "var(--color-section-community)",
  awards: "var(--color-section-awards)",
  projects: "var(--color-section-projects)",
  working: "var(--color-section-working)",
  education: "var(--color-section-education)",
};
