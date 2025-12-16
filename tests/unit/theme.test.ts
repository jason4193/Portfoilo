import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme } from "../../src/hooks/useTheme";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock matchMedia
const createMatchMedia = (matches: boolean) => {
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

describe("useTheme", () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("defaults to system preference when no preference is saved", () => {
    window.matchMedia = createMatchMedia(false); // light mode
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("light");
  });

  it("loads saved theme preference from localStorage", () => {
    localStorageMock.setItem("theme", "dark");
    window.matchMedia = createMatchMedia(true);
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("dark");
  });

  it("persists theme preference to localStorage", () => {
    window.matchMedia = createMatchMedia(false);
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme("dark");
    });

    expect(localStorageMock.getItem("theme")).toBe("dark");
    expect(result.current.theme).toBe("dark");
  });

  it("uses system preference on initial load when no saved theme exists", () => {
    window.matchMedia = createMatchMedia(true); // dark mode
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("dark");
  });

  it("applies theme to document element", () => {
    window.matchMedia = createMatchMedia(false);
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme("dark");
    });

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    act(() => {
      result.current.setTheme("light");
    });

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
