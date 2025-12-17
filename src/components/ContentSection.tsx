import type {
  PortfolioContent,
  ContentSection as ContentSectionType,
} from "../types/content";
import { getSectionAnchorId } from "../utils/anchors";
import { SectionHeader } from "./SectionHeader";
import { ExperienceItem } from "./ExperienceItem";
import { ProjectItem } from "./ProjectItem";
import { AcademicItem } from "./AcademicItem";

interface ContentSectionProps {
  section: ContentSectionType;
  content: PortfolioContent;
}

export function ContentSection({ section, content }: ContentSectionProps) {
  const anchorId = getSectionAnchorId(section.id, section.title);

  const renderContent = () => {
    switch (section.type) {
      // Parent sections - use SectionHeader
      case "projects":
      case "competitions":
      case "communityContributions":
      case "workingExperience":
      case "academic":
        return section.title ? (
          <SectionHeader id={section.id} title={section.title} />
        ) : null;

      // Project items
      case "projectItem": {
        const project = section.content;
        if (!project || !section.title) return null;
        return (
          <ProjectItem
            id={section.id}
            title={section.title}
            project={project}
          />
        );
      }

      // Experience items (competitions, community contributions, work experience)
      case "competitionItem":
      case "communityContributionItem":
      case "workingExperienceItem": {
        const experience = section.content;
        if (!experience || !section.title) return null;
        return (
          <ExperienceItem
            id={section.id}
            title={section.title}
            experience={experience}
          />
        );
      }

      // Academic items
      case "academicItem": {
        const academic = section.content;
        if (!academic || !section.title) return null;
        return (
          <AcademicItem
            id={section.id}
            title={section.title}
            academic={academic}
          />
        );
      }

      // Footer
      case "footer":
        return (
          <p
            id={anchorId}
            className="text-sm text-[var(--color-text-secondary)] text-center mt-12"
          >
            {content.footer}
          </p>
        );

      default:
        return null;
    }
  };

  return <div className="mb-8">{renderContent()}</div>;
}
