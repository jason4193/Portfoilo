import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./tldr/components/Layout";
import { ContentSection } from "./tldr/components/ContentSection";
import { TocRail } from "./tldr/components/TocRail";
import { MobileProgressIndicator } from "./tldr/components/MobileProgressIndicator";
import { useContent } from "./shared/hooks/useContent";
import { useToc } from "./tldr/hooks/useToc";
import { useTheme } from "./shared/hooks/useTheme";
import "./shared/styles/tailwind.css";
import "./shared/styles/theme.css";

function App() {
  const { content, sections, loading, error } = useContent();
  const { tocItems } = useToc(sections);

  // Initialize theme (applies theme to document)
  useTheme();

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
