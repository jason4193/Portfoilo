import type {
  PortfolioContent,
  ContentSection,
  Project,
  CompetitionExperience,
  CommunityContributionExperience,
  WorkingExperience,
  AcademicExperience,
} from "../types/content";

export interface SectionConfig<T> {
  key: keyof PortfolioContent;
  parentId: string;
  parentTitle: string;
  parentType: ContentSection["type"];
  itemType: ContentSection["type"];
  itemIdPrefix: string;
  getItemTitle: (item: T) => string;
}

/**
 * Generate a section group (parent + items) from configuration
 */
export function generateSectionGroup<T>(
  config: SectionConfig<T>,
  items: T[]
): ContentSection[] {
  const sections: ContentSection[] = [];

  if (items.length === 0) {
    return sections;
  }

  // Add parent section (level 1)
  sections.push({
    id: config.parentId,
    type: config.parentType,
    title: config.parentTitle,
    level: 1,
  });

  // Add item sections (level 2)
  items.forEach((item, idx) => {
    sections.push({
      id: `${config.itemIdPrefix}-${idx}`,
      type: config.itemType,
      title: config.getItemTitle(item),
      content: item,
      level: 2,
    });
  });

  return sections;
}

/**
 * Section configurations for each content type
 */
export const sectionConfigs = {
  communityContributions: {
    key: "communityContributions" as const,
    parentId: "community-contributions",
    parentTitle: "Community Contributions",
    parentType: "communityContributions" as const,
    itemType: "communityContributionItem" as const,
    itemIdPrefix: "community-contribution",
    getItemTitle: (item: CommunityContributionExperience) => item.title,
  },

  competitions: {
    key: "competitions" as const,
    parentId: "competitions",
    parentTitle: "Competitions",
    parentType: "competitions" as const,
    itemType: "competitionItem" as const,
    itemIdPrefix: "competition",
    getItemTitle: (item: CompetitionExperience) => item.title,
  },

  projects: {
    key: "projects" as const,
    parentId: "projects",
    parentTitle: "Projects",
    parentType: "projects" as const,
    itemType: "projectItem" as const,
    itemIdPrefix: "project",
    getItemTitle: (item: Project) => item.title,
  },

  workingExperience: {
    key: "workingExperience" as const,
    parentId: "working-experience",
    parentTitle: "Working Experience",
    parentType: "workingExperience" as const,
    itemType: "workingExperienceItem" as const,
    itemIdPrefix: "working-experience",
    getItemTitle: (item: WorkingExperience) => item.title,
  },

  academic: {
    key: "academic" as const,
    parentId: "academic",
    parentTitle: "Education",
    parentType: "academic" as const,
    itemType: "academicItem" as const,
    itemIdPrefix: "academic",
    getItemTitle: (item: AcademicExperience) => item.institution,
  },
};
