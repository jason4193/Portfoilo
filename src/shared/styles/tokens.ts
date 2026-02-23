/**
 * Design Tokens (TypeScript)
 * JavaScript/TypeScript export of design tokens for use in Three.js and other JS contexts
 * IMPORTANT: Keep in sync with tokens.css
 */

export type ThemeMode = "light" | "dark";

/**
 * Color tokens organized by theme
 * All values are hex color strings
 */
export const colorTokens = {
  light: {
    // Markdown Mode - Surface
    bgPrimary: "#ffffff",
    bgSecondary: "#f6f8fa",

    // Markdown Mode - Text
    textPrimary: "#24292f",
    textSecondary: "#57606a",

    // Markdown Mode - Borders
    border: "#d0d7de",

    // Markdown Mode - Interactive
    link: "#0969da",
    linkHover: "#0860ca",
    accent: "#0969da",

    // Markdown Mode - Code
    codeBg: "rgba(175, 184, 193, 0.2)",
    codeText: "#24292f",
    preBg: "#f6f8fa",
    preBorder: "#d0d7de",

    // Animated Mode - Canvas
    animatedBgLight: "#f7f4ec",

    // Animated Mode - Panel/Modal
    panelBg: "#f7f4ec",
    panelText: "#0b2b4c",
    panelTextMuted: "rgba(11, 43, 76, 0.8)",
    panelTextSubtle: "rgba(11, 43, 76, 0.95)",
    panelBorder: "rgba(11, 43, 76, 0.1)",
    panelBtn: "#0b2b4c",

    // Animated Mode - 3D Card Materials
    cardNavy: "#2f4668",
    cardYellow: "#f0c34e",
    cardCoral: "#f2a1a1",

    // Section accent colors (modal headers)
    sectionAboutMe: "#facd5a",
    sectionCommunity: "#e88e8b",
    sectionAwards: "#1d365a",
    sectionProjects: "#f2d37b",
    sectionWorking: "#e88e8b",
    sectionEducation: "#1d365a",

    // Shared - InfoCard
    infoCardContentBg: "rgba(255, 251, 235, 0.9)",
  },
  dark: {
    // Markdown Mode - Surface
    bgPrimary: "#0d1117",
    bgSecondary: "#161b22",

    // Markdown Mode - Text
    textPrimary: "#c9d1d9",
    textSecondary: "#8b949e",

    // Markdown Mode - Borders
    border: "#30363d",

    // Markdown Mode - Interactive
    link: "#58a6ff",
    linkHover: "#79c0ff",
    accent: "#58a6ff",

    // Markdown Mode - Code
    codeBg: "rgba(110, 118, 129, 0.4)",
    codeText: "#c9d1d9",
    preBg: "#161b22",
    preBorder: "#30363d",

    // Animated Mode - Canvas
    animatedBgLight: "#0a0e1a",

    // Animated Mode - Panel/Modal
    panelBg: "rgba(15, 20, 35, 0.95)",
    panelText: "#d4e9fe",
    panelTextMuted: "#a8c8ff",
    panelTextSubtle: "#c0deff",
    panelBorder: "rgba(0, 217, 255, 0.3)",
    panelBtn: "#d0e8ff",

    // Animated Mode - 3D Card Materials
    cardNavy: "#00d9ff",
    cardYellow: "#f0c34e",
    cardCoral: "#7c6eff",

    // Section accent colors (modal headers)
    sectionAboutMe: "#f0c34e",
    sectionCommunity: "#7c6eff",
    sectionAwards: "#00d9ff",
    sectionProjects: "#f0c34e",
    sectionWorking: "#7c6eff",
    sectionEducation: "#00d9ff",

    // Animated Mode - Accent Colors
    accentCyan: "#00d9ff",
    accentPurple: "#7c6eff",

    // Shared - InfoCard
    infoCardContentBg: "rgba(20, 30, 45, 0.95)",
  },
} as const;

/**
 * Convert hex color string to Three.js color number
 * @param hex - Hex color string (e.g., "#2f4668" or "rgba(...)")
 * @returns Three.js color number (e.g., 0x2f4668)
 */
export function hexToThreeColor(hex: string): number {
  // Handle rgba colors by extracting hex if needed
  if (hex.startsWith("rgba") || hex.startsWith("rgb")) {
    throw new Error(
      `Cannot convert rgba/rgb color to Three.js format: ${hex}. Please use solid hex colors for 3D materials.`,
    );
  }

  const cleanHex = hex.replace("#", "");
  return parseInt(cleanHex, 16);
}

/**
 * Get color token for current theme
 * @param theme - Current theme mode
 * @param colorKey - Key from colorTokens object
 * @returns Color value as string
 */
export function getColorToken<K extends keyof (typeof colorTokens)["light"]>(
  theme: ThemeMode,
  colorKey: K,
): string {
  return colorTokens[theme][colorKey];
}

/**
 * Get Three.js color number for current theme
 * @param theme - Current theme mode
 * @param colorKey - Key from colorTokens object (must be solid hex)
 * @returns Three.js color number
 */
export function getThreeColorToken<
  K extends keyof (typeof colorTokens)["light"],
>(theme: ThemeMode, colorKey: K): number {
  const color = colorTokens[theme][colorKey];
  return hexToThreeColor(color);
}

/**
 * Typography tokens
 */
export const typographyTokens = {
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

/**
 * Spacing tokens
 */
export const spacingTokens = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
} as const;
