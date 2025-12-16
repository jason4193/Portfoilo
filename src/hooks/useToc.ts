import { useState, useEffect } from "react";
import type { ContentSection } from "../types/content";
import { getSectionAnchorId } from "../utils/anchors";

export interface TocItem {
  id: string;
  title: string;
  level: number;
  element?: HTMLElement;
}

export function useToc(sections: ContentSection[]) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // Extract headings from sections and create TOC items
    const items: TocItem[] = sections
      .filter((section) => section.title && section.level <= 3)
      .map((section) => {
        const id = getSectionAnchorId(section.id, section.title);
        return {
          id,
          title: section.title || "",
          level: section.level,
        };
      });

    // After DOM is ready, attach element references
    const attachElements = () => {
      const itemsWithElements = items.map((item) => {
        const element = document.getElementById(item.id);
        return { ...item, element: element || undefined };
      });
      setTocItems(itemsWithElements);
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(attachElements, 100);

    // Also try immediately in case DOM is already ready
    attachElements();

    return () => clearTimeout(timeoutId);
  }, [sections]);

  return { tocItems };
}
