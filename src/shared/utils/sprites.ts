/**
 * CSS Sprite utilities for grid-based sprite sheet layouts
 */

export interface SpriteGridConfig {
  /** Number of columns in the sprite grid */
  columns: number;
  /** Number of rows in the sprite grid */
  rows: number;
}

export interface SpriteCellStyle {
  /** CSS background-size value for the sprite */
  backgroundSize: string;
  /** CSS background-position value for the specific cell */
  backgroundPosition: string;
}

/**
 * Calculate CSS sprite background properties for a specific grid cell
 * @param index Cell index (0-based, left-to-right, top-to-bottom)
 * @param columns Number of columns in the sprite grid (default: 3)
 * @param rows Number of rows in the sprite grid (default: 2)
 * @returns Object with backgroundSize and backgroundPosition for CSS
 */
export function getSpriteCellStyle(
  index: number,
  columns: number = 3,
  rows: number = 2,
): SpriteCellStyle {
  const col = index % columns;
  const row = Math.floor(index / columns);

  // Calculate background-size as percentage (e.g., 3 cols = 300%, 2 rows = 200%)
  const backgroundSize = `${columns * 100}% ${rows * 100}%`;

  // Calculate background-position as percentage to show the specific cell
  const xPosition = col * 50; // 0%, 50%, 100% for 3 columns
  const yPosition = row * 100; // 0%, 100% for 2 rows
  const backgroundPosition = `${xPosition}% ${yPosition}%`;

  return { backgroundSize, backgroundPosition };
}

/**
 * Get the default 3x2 grid sprite cell style
 * @param index Cell index in the 3x2 grid (0-5)
 * @returns Object with backgroundSize and backgroundPosition
 */
export function getProjectSpriteCellStyle(index: number): SpriteCellStyle {
  return getSpriteCellStyle(index, 3, 2);
}
