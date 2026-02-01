import type { PortfolioContent, ContentSection } from "../types/content";
import contentData from "../assets/content.json";
import { generateSectionGroup, sectionConfigs } from "../config/sections";

// Helper function to generate sections from content
function generateSections(data: PortfolioContent): ContentSection[] {
  const generatedSections: ContentSection[] = [];

  // Generate sections for each content type
  generatedSections.push(
    ...generateSectionGroup(
      sectionConfigs.communityContributions,
      data.communityContributions
    )
  );

  generatedSections.push(
    ...generateSectionGroup(sectionConfigs.competitions, data.competitions)
  );

  generatedSections.push(
    ...generateSectionGroup(sectionConfigs.projects, data.projects)
  );

  generatedSections.push(
    ...generateSectionGroup(
      sectionConfigs.workingExperience,
      data.workingExperience
    )
  );

  generatedSections.push(
    ...generateSectionGroup(sectionConfigs.academic, data.academic)
  );

  // Footer
  generatedSections.push({
    id: "footer",
    type: "footer",
    level: 1,
  });

  return generatedSections;
}

// Load content immediately (synchronous since it's a JSON import)
let content: PortfolioContent | null = null;
let sections: ContentSection[] = [];
let error: string | null = null;

try {
  const data = contentData as PortfolioContent;
  content = data;
  sections = generateSections(data);
} catch (err) {
  error = err instanceof Error ? err.message : "Failed to load content";
}

export { content, sections, error };
