import { Layout } from "./components/Layout";
import { ContentSection } from "./components/ContentSection";
import { TocRail } from "./components/TocRail";
import { MobileProgressIndicator } from "./components/MobileProgressIndicator";
import { useContent } from "../shared/hooks/useContent";
import { useToc } from "./hooks/useToc";

export function TLDRApp() {
  const { content, sections, loading, error } = useContent();
  const { tocItems } = useToc(sections);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-[var(--color-text-secondary)]">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error || !content) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600">
            Error: {error || "Failed to load content"}
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="prose prose-lg max-w-none">
        {sections.map((section) => (
          <ContentSection
            key={section.id}
            section={section}
            content={content}
          />
        ))}
      </article>
      <TocRail tocItems={tocItems} />
      <MobileProgressIndicator tocItems={tocItems} />
    </Layout>
  );
}
