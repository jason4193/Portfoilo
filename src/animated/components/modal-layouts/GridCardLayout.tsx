import { type ReactNode } from "react";

export interface GridPlacement {
  rowIdx: number;
  colSpan: number;
  colStart: number;
  landscape: boolean;
}

export interface GridLayoutItem<T> {
  item: T;
  placement: GridPlacement;
}

interface GridCardLayoutProps<T> {
  /** Array of items to render in the grid */
  items: T[];
  /** Function to group items into rows (returns array of row arrays) */
  groupFn?: (items: T[]) => T[][];
  /** Function to render each card with its layout placement */
  renderCard: (item: T, placement: GridPlacement, index: number) => ReactNode;
  /** Extract unique key from item */
  getItemKey: (item: T, index: number) => string | number;
  /** Additional className for the grid container */
  className?: string;
  /** Grid row sizing mode: 'auto' for natural heights, 'equal' for equal row heights, 'fill' for expanding rows */
  gridMode?: "auto" | "equal" | "fill";
  /** Whether to enforce aspect ratios on cards */
  enforceAspectRatio?: boolean;
  /** Maximum number of visible rows (default: 2). More rows will require scrolling. */
  maxVisibleRows?: number;
}

/**
 * Computes grid placement for items based on row grouping
 * Supports explicit gridColumn/gridRow positioning for drag-drop
 */
function computeGridLayout<T>(
  items: T[],
  groupFn?: (items: T[]) => T[][],
): GridLayoutItem<T>[] {
  // Default grouping: 3 items per row
  const defaultGroupFn = (arr: T[]) => {
    const rows: T[][] = [];
    for (let i = 0; i < arr.length; i += 3) {
      rows.push(arr.slice(i, i + 3));
    }
    return rows;
  };

  const grouped = groupFn ? groupFn(items) : defaultGroupFn(items);

  return grouped.flatMap((row, rowIdx) => {
    const colSpan = row.length === 1 ? 6 : row.length === 2 ? 3 : 2;
    let colStart = 1;
    return row.map((item) => {
      const placement: GridPlacement = {
        rowIdx,
        colSpan,
        colStart,
        landscape: row.length <= 2,
      };
      colStart += colSpan;
      return { item, placement };
    });
  });
}

/**
 * Reusable grid card layout with support for custom grouping
 * Designed for desktop viewports with drag-drop support in mind
 */
export function GridCardLayout<T>({
  items,
  groupFn,
  renderCard,
  getItemKey,
  className = "",
  gridMode = "auto",
  enforceAspectRatio = true,
  maxVisibleRows = 2,
}: GridCardLayoutProps<T>) {
  const layout = computeGridLayout(items, groupFn);

  // Calculate number of rows for explicit grid-template-rows
  const numRows = layout.length === 0
    ? 0
    : Math.max(...layout.map(({ placement }) => placement.rowIdx)) + 1;

  const gridRowClass =
    gridMode === "equal"
      ? "" // Handle with inline style instead
      : gridMode === "fill"
        ? ""
        : "sm:auto-rows-auto";

  // Calculate row heights based on number of rows
  // 1 row: use full height (60vh), 2+ rows: divide evenly (30vh per row)
  const baseHeight = 70; // vh
  const gapAdjustment = 3; // Total gap between rows in vh (e.g. 3vh gap * (numRows - 1))
  const rowHeight =
    numRows === 1
      ? baseHeight
      : baseHeight / maxVisibleRows - gapAdjustment / numRows;
  const maxHeight = `${baseHeight}vh`;

  const gridStyle: React.CSSProperties =
    gridMode === "equal"
      ? {
          gridTemplateRows: `repeat(${numRows}, ${rowHeight}vh)`,
          maxHeight,
        }
      : gridMode === "fill"
        ? { gridAutoRows: "minmax(min-content, 1fr)", maxHeight }
        : { maxHeight };

  return (
    <div
      className={`flex flex-col gap-3 sm:grid sm:grid-cols-6 ${gridRowClass} sm:gap-6 sm:overflow-y-auto ${className}`}
      style={gridStyle}
    >
      {layout.map(({ item, placement }, index) => {
        const { rowIdx, colSpan, colStart, landscape } = placement;

        let cardClassName = "sm:w-full sm:rounded-2xl sm:bg-white sm:shadow-md";
        if (enforceAspectRatio) {
          // With aspect ratios: let aspect ratio determine height, don't use h-full to avoid conflicts
          if (gridMode === "auto") {
            cardClassName = landscape
              ? "sm:aspect-[5/2] sm:w-full sm:rounded-2xl sm:bg-white sm:shadow-md"
              : "sm:aspect-square sm:w-full sm:rounded-2xl sm:bg-white sm:shadow-md";
          } else {
            // With equal/fill modes: use h-full to fill the row
            cardClassName = landscape
              ? "sm:aspect-[5/2] sm:h-full sm:w-full sm:rounded-2xl sm:bg-white sm:shadow-md"
              : "sm:aspect-square sm:h-full sm:w-full sm:rounded-2xl sm:bg-white sm:shadow-md";
          }
        } else {
          // Without aspect ratios: always use h-full to fill available space
          cardClassName =
            "sm:h-full sm:w-full sm:rounded-2xl sm:bg-white sm:shadow-md";
        }

        return (
          <div
            key={getItemKey(item, index)}
            data-card
            className={cardClassName}
            style={{
              minWidth: 0,
              gridColumn: `${colStart} / span ${colSpan}`,
              gridRow: `${rowIdx + 1}`,
            }}
          >
            {renderCard(item, placement, index)}
          </div>
        );
      })}
    </div>
  );
}
