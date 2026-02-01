import { HeaderBase } from "../../shared/components/HeaderBase";
import { content } from "../../shared/data/content";

export function Header() {

  return (
    <HeaderBase showModeToggle={true}>
      {/* Intro - Markdown specific */}
      {content && (
        <p className="text-lg text-[var(--color-text-secondary)] whitespace-pre-line">
          {content.intro}
        </p>
      )}
    </HeaderBase>
  );
}
