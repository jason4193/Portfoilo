import { useState, useEffect } from "react";
import type { PortfolioContent, ContentSection } from "../types/content";
import contentData from "../assets/content.json";

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

      // Generate sections for ToC
      const generatedSections: ContentSection[] = [];
      let sectionIndex = 0;

      // Community Contributions section
      if (data.communityContributions.length > 0) {
        generatedSections.push({
          id: "community-contributions",
          type: "communityContributions",
          title: "Community Contributions",
          level: 1,
        });
      }

      // Competitions section
      if (data.competitions.length > 0) {
        generatedSections.push({
          id: "competitions",
          type: "competitions",
          title: "Competitions",
          level: 1,
        });
      }

      // Projects section
      if (data.projects.length > 0) {
        generatedSections.push({
          id: "projects",
          type: "projects",
          title: "Projects",
          level: 1,
        });
        sectionIndex++;

        // Individual projects
        data.projects.forEach((project, idx) => {
          generatedSections.push({
            id: `project-${idx}`,
            type: "project",
            title: project.title,
            content: project,
            level: 2,
          });
        });
      }

      // Working Experience section
      if (data.workingExperience.length > 0) {
        generatedSections.push({
          id: "working-experience",
          type: "workingExperience",
          title: "Working Experience",
          level: 1,
        });
      }

      // Academic section
      if (data.academic.length > 0) {
        generatedSections.push({
          id: "academic",
          type: "academic",
          title: "Education",
          level: 1,
        });
      }

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
