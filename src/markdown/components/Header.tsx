import { useState } from "react";
import { HeaderBase } from "../../shared/components/HeaderBase";
import { content } from "../../shared/data/content";

function renderBoldText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`bold-${index}`}>{part.slice(2, -2)}</strong>;
    }
    return <span key={`text-${index}`}>{part}</span>;
  });
}

export function Header() {
  const [isExpanded, setIsExpanded] = useState(false);

  const paragraphs = content?.introMarkdown
    ? content.introMarkdown.split(/\n\s*\n/).filter(Boolean)
    : [];

  return (
    <HeaderBase>
      {/* Intro - Markdown specific */}
      {content && (
        <>
          <div className="hidden sm:block text-lg text-[var(--color-text-secondary)] leading-snug space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={`intro-desktop-${index}`} className="whitespace-pre-line">
                {renderBoldText(paragraph)}
              </p>
            ))}
          </div>
          <div className="sm:hidden text-lg text-[var(--color-text-secondary)] leading-snug space-y-4">
            {paragraphs.slice(0, 2).map((paragraph, index) => (
              <p key={`intro-mobile-${index}`} className="whitespace-pre-line">
                {renderBoldText(paragraph)}
              </p>
            ))}
            {paragraphs[2] && !isExpanded && (
              <p className="truncate">{renderBoldText(paragraphs[2])}</p>
            )}
            {isExpanded &&
              paragraphs.slice(2).map((paragraph, index) => (
                <p
                  key={`intro-mobile-rest-${index}`}
                  className="whitespace-pre-line"
                >
                  {renderBoldText(paragraph)}
                </p>
              ))}
            {!isExpanded && paragraphs.length > 2 && (
              <button
                type="button"
                className="text-sm text-[var(--color-text-secondary)] underline underline-offset-4"
                onClick={() => setIsExpanded(true)}
              >
                Read more
              </button>
            )}
          </div>
        </>
      )}
    </HeaderBase>
  );
}
