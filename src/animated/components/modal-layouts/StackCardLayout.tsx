import { type ReactNode } from "react";
import { useStackCardCycle } from "../../hooks/useStackCardCycle";
import { STACK_LEFT_OFFSET, STACK_TOP_OFFSET } from "../../constants/mobile";
import { CardStackIndicator } from "./CardStackIndicator";

interface StackCardLayoutProps<T> {
  /** Array of items to render in the stack */
  items: T[];
  /** Function to render each card */
  renderCard: (item: T, index: number) => ReactNode;
  /** Extract unique key from item */
  getItemKey: (item: T, index: number) => string | number;
  /** Accessible label for swipe gesture */
  swipeLabel: string;
}

/**
 * Reusable stack card layout with swipe-to-cycle interaction
 * Used on mobile viewports for interactive card browsing
 */
export function StackCardLayout<T>({
  items,
  renderCard,
  getItemKey,
  swipeLabel,
}: StackCardLayoutProps<T>) {
  const { stackRef, handleTouchStart, handleTouchEnd, currentIndex } =
    useStackCardCycle(items.length);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Stack container - takes available space minus indicator */}
      <div
        ref={stackRef}
        className="relative flex-1 w-full overflow-visible pl-10 pt-10 [perspective:1000px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
        aria-label={swipeLabel}
      >
        {items.map((item, index) => (
          <div
            key={getItemKey(item, index)}
            data-card
            className="absolute top-0 h-full"
            style={{
              left: index * STACK_LEFT_OFFSET,
              top: index * STACK_TOP_OFFSET,
              width: `calc(100% - ${items.length * 3}%)`,
              zIndex: items.length - index,
            }}
          >
            {renderCard(item, index)}
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      {items.length > 1 && (
        <div className="shrink-0">
          <CardStackIndicator
            total={items.length}
            currentIndex={currentIndex}
          />
        </div>
      )}
    </div>
  );
}
