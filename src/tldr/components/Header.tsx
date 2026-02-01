import { HeaderBase } from "../../shared/components/HeaderBase";
import { useContent } from "../../shared/hooks/useContent";

export function Header() {
  const { content, loading } = useContent();

  return (
    <HeaderBase showModeToggle={true}>
      {/* Intro - TLDR specific */}
      {!loading && content && (
        <p className="text-lg text-[var(--color-text-secondary)] whitespace-pre-line">
          {content.intro}
        </p>
      )}
    </HeaderBase>
  );
}
