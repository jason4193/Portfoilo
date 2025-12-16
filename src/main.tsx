import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./components/Layout";
import { ContentSection } from "./components/ContentSection";
import { TocRail } from "./components/TocRail";
import { useContent } from "./hooks/useContent";
import { useToc } from "./hooks/useToc";
import { useTheme } from "./hooks/useTheme";
import "./styles/tailwind.css";
import "./styles/theme.css";

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
    </Layout>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
