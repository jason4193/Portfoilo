import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContentSection } from "../../src/components/ContentSection";
import type {
  ContentSection as ContentSectionType,
  PortfolioContent,
} from "../../src/types/content";

describe("ContentSection", () => {
  const mockContent: PortfolioContent = {
    header: "Test Header",
    intro: "Test introduction text",
    projects: [],
    competitions: [],
    communityContributions: [],
    workingExperience: [],
    academic: [],
    contact: {
      email: "test@example.com",
      links: [],
    },
    footer: "Test footer",
  };

  it("renders footer section correctly", () => {
    const section: ContentSectionType = {
      id: "footer",
      type: "footer",
      level: 1,
    };

    render(<ContentSection section={section} content={mockContent} />);
    expect(screen.getByText("Test footer")).toBeInTheDocument();
  });

  it("handles missing content gracefully", () => {
    const section: ContentSectionType = {
      id: "footer",
      type: "footer",
      level: 1,
    };

    const emptyContent: PortfolioContent = {
      header: "",
      intro: "",
      projects: [],
      competitions: [],
      communityContributions: [],
      workingExperience: [],
      academic: [],
      contact: {
        email: "",
        links: [],
      },
      footer: "",
    };

    render(<ContentSection section={section} content={emptyContent} />);
    // Check that the footer element exists even with empty content
    const footerElement = document.getElementById("footer");
    expect(footerElement).toBeInTheDocument();
    expect(footerElement?.textContent).toBe("");
  });
});
