import type {
  PortfolioContent,
  ContentSection as ContentSectionType,
} from "../types/content";
import { getSectionAnchorId } from "../utils/anchors";

interface ContentSectionProps {
  section: ContentSectionType;
  content: PortfolioContent;
}

export function ContentSection({ section, content }: ContentSectionProps) {
  const anchorId = getSectionAnchorId(section.id, section.title);

  const renderContent = () => {
    switch (section.type) {
      case "projects":
        return (
          <div id={anchorId} className="border-t border-[var(--color-border)]">
            <div className="text-3xl font-semibold mt-5 mb-8 border-b border-[var(--color-border)] pb-4">
              Projects
            </div>
            {content.projects.map((project, idx) => (
              <div key={idx} id={`project-${idx}`} className="mb-12">
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                {project.date && (
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    {project.date}
                  </p>
                )}
                <div className="mb-3">
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {project.techStack.join(", ")}
                  </span>
                </div>
                <p className="mb-4">{project.description}</p>
                {project.achievements.length > 0 && (
                  <ul className="list-disc list-inside mb-4 space-y-1">
                    {project.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
                {project.links.length > 0 && (
                  <div className="flex gap-4 flex-wrap">
                    {project.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-link)] hover:underline"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "competitions":
        return (
          <div id={anchorId} className="border-t border-[var(--color-border)]">
            <div className="text-3xl font-semibold mt-5 mb-8 border-b border-[var(--color-border)] pb-4">
              Competitions
            </div>
            {content.competitions.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <h4 className="text-xl font-semibold mb-2">{exp.title}</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                  {exp.date}
                  {exp.role && ` • ${exp.role}`}
                </p>
                <p className="mb-3">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 mb-3">
                    {exp.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
                {exp.links && exp.links.length > 0 && (
                  <div className="flex gap-4 flex-wrap">
                    {exp.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-link)] hover:underline text-sm"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "communityContributions":
        return (
          <div id={anchorId} className="border-t border-[var(--color-border)]">
            <div className="text-3xl font-semibold mt-5 mb-8 border-b border-[var(--color-border)] pb-4">
              Community Contributions
            </div>
            {content.communityContributions.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <h4 className="text-xl font-semibold mb-2">{exp.title}</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                  {exp.date} • {exp.role}
                </p>
                <p className="mb-3">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 mb-3">
                    {exp.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
                {exp.links && exp.links.length > 0 && (
                  <div className="flex gap-4 flex-wrap">
                    {exp.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-link)] hover:underline text-sm"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "workingExperience":
        return (
          <div id={anchorId} className="border-t border-[var(--color-border)]">
            <div className="text-3xl font-semibold mt-5 mb-8 border-b border-[var(--color-border)] pb-4">
              Working Experience
            </div>
            {content.workingExperience.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <h4 className="text-xl font-semibold mb-2">{exp.title}</h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                  {exp.date} • {exp.role}
                </p>
                <p className="mb-3">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 mb-3">
                    {exp.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
                {exp.links && exp.links.length > 0 && (
                  <div className="flex gap-4 flex-wrap">
                    {exp.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-link)] hover:underline text-sm"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "academic":
        return (
          <div id={anchorId} className="border-t border-[var(--color-border)]">
            <div className="text-3xl font-semibold mt-5 mb-8 border-b border-[var(--color-border)] pb-4">
              Education
            </div>
            {content.academic.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <h4 className="text-xl font-semibold mb-2">
                  {exp.institution}
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                  {exp.program}
                </p>
                <p className="mb-3">{exp.summary}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1">
                    {exp.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );

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
