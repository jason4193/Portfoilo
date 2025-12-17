import { useState, useEffect } from "react";
import type { PortfolioContent, ContentSection } from "../types/content";
import contentData from "../assets/content.json";
import { generateSectionGroup, sectionConfigs } from "../config/sections";

export function useContent() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Load content from JSON
      const data = contentData as PortfolioContent;
      setContent(data);

      // Generate sections for ToC using configuration-driven approach
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

      setSections(generatedSections);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load content");
      setLoading(false);
    }
  }, []);

  return { content, sections, loading, error };
}
