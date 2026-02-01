import { Layout } from "./components/Layout";
import { ContentSection } from "./components/ContentSection";
import { TocRail } from "./components/TocRail";
import { MobileProgressIndicator } from "./components/MobileProgressIndicator";
import { content, sections, error } from "../shared/data/content";
import { useToc } from "./hooks/useToc";

export function MarkdownApp() {
  const { tocItems } = useToc(sections);

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

  // At this point, content is guaranteed to be non-null due to the check above
  return (
    <Layout>
      <article className="prose prose-lg max-w-none">
        {sections.map((section) => (
          <ContentSection
            key={section.id}
            section={section}
            content={content!}
          />
        ))}
      </article>
      <TocRail tocItems={tocItems} />
      <MobileProgressIndicator tocItems={tocItems} />
    </Layout>
  );
}
