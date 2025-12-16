import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollSpy } from "../../src/hooks/useScrollSpy";
import type { TocItem } from "../../src/hooks/useToc";

// Mock window.scrollY and document dimensions
let mockScrollYValue = 0;
const mockInnerHeight = 800;
const mockScrollHeight = 2000;

beforeEach(() => {
  mockScrollYValue = 0;

  // Mock window.scrollY as a getter
  Object.defineProperty(window, "scrollY", {
    get: () => mockScrollYValue,
    configurable: true,
  });

  Object.defineProperty(window, "innerHeight", {
    writable: true,
    value: mockInnerHeight,
    configurable: true,
  });

  Object.defineProperty(document.documentElement, "scrollHeight", {
    writable: true,
    value: mockScrollHeight,
    configurable: true,
  });
});

describe("useScrollSpy", () => {
  let mockElements: HTMLElement[] = [];

  beforeEach(() => {
    mockScrollYValue = 0;
    mockElements = [];

    // Create mock DOM elements
    const createMockElement = (id: string, top: number) => {
      const element = document.createElement("div");
      element.id = id;
      Object.defineProperty(element, "getBoundingClientRect", {
        value: () => ({
          top,
          bottom: top + 100,
          left: 0,
          right: 100,
          width: 100,
          height: 100,
        }),
        configurable: true, // Allow redefinition
      });
      document.body.appendChild(element);
      return element;
    };

    mockElements.push(createMockElement("section-1", 0));
    mockElements.push(createMockElement("section-2", 500));
    mockElements.push(createMockElement("section-3", 1000));
  });

  afterEach(() => {
    mockElements.forEach((el) => el.remove());
    mockElements = [];
  });

  it("calculates progress percent correctly", async () => {
    const tocItems: TocItem[] = [
      {
        id: "section-1",
        title: "Section 1",
        level: 1,
        element: mockElements[0],
      },
      {
        id: "section-2",
        title: "Section 2",
        level: 1,
        element: mockElements[1],
      },
      {
        id: "section-3",
        title: "Section 3",
        level: 1,
        element: mockElements[2],
      },
    ];

    mockScrollYValue = 600; // 50% of scrollable height (1200px)

    const { result } = renderHook(() => useScrollSpy(tocItems));

    // Wait for scroll event to process
    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
      // Wait for requestAnimationFrame
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    // Progress should be approximately 50%
    expect(result.current.progressPercent).toBeGreaterThan(45);
    expect(result.current.progressPercent).toBeLessThan(55);
  });

  it("identifies current section based on scroll position", async () => {
    const tocItems: TocItem[] = [
      {
        id: "section-1",
        title: "Section 1",
        level: 1,
        element: mockElements[0],
      },
      {
        id: "section-2",
        title: "Section 2",
        level: 1,
        element: mockElements[1],
      },
      {
        id: "section-3",
        title: "Section 3",
        level: 1,
        element: mockElements[2],
      },
    ];

    // Scroll to position where section-2 should be active
    mockScrollYValue = 600;
    Object.defineProperty(mockElements[1], "getBoundingClientRect", {
      value: () => ({
        top: 200, // In viewport
        bottom: 300,
        left: 0,
        right: 100,
        width: 100,
        height: 100,
      }),
      configurable: true,
    });

    const { result } = renderHook(() => useScrollSpy(tocItems));

    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
      // Wait for requestAnimationFrame
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    // Should identify section-2 as current
    expect(result.current.currentSectionId).toBe("section-2");
  });

  it("returns null for currentSectionId when no sections match", () => {
    const tocItems: TocItem[] = [];

    const { result } = renderHook(() => useScrollSpy(tocItems));

    expect(result.current.currentSectionId).toBeNull();
    expect(result.current.progressPercent).toBe(0);
  });

  it("clamps progress percent between 0 and 100", async () => {
    const tocItems: TocItem[] = [
      {
        id: "section-1",
        title: "Section 1",
        level: 1,
        element: mockElements[0],
      },
    ];

    // Test at top
    mockScrollYValue = -100;
    const { result: resultTop } = renderHook(() => useScrollSpy(tocItems));
    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
      // Wait for requestAnimationFrame
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(resultTop.current.progressPercent).toBeGreaterThanOrEqual(0);

    // Test at bottom
    mockScrollYValue = 10000;
    const { result: resultBottom } = renderHook(() => useScrollSpy(tocItems));
    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
      // Wait for requestAnimationFrame
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(resultBottom.current.progressPercent).toBeLessThanOrEqual(100);
  });
});
