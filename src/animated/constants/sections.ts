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
  aboutMe: "#FACD5A",
  community: "#E88E8B",
  awards: "#1D365A",
  projects: "#F2D37B",
  working: "#E88E8B",
  education: "#1D365A",
};
