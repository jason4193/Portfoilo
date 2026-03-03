import { useRef, useState, type RefObject, type ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { BaseModalContent } from "./BaseModalContent";
import { useModalContent } from "@animated/hooks";
import { StackCardLayout } from "@animated/components/modal-layouts/StackCardLayout";
import {
  GridCardLayout,
  type GridPlacement,
} from "@animated/components/modal-layouts/GridCardLayout";
import { MOBILE_MAX_WIDTH } from "@animated/constants/mobile";
import { GenericDetailPanel } from "./GenericDetailPanel";

export interface GenericModalConfig<T extends Record<string, any>> {
  overlayRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  icon: ReactNode;
  title: string;
  accentColor: string;
  introText: string;
  items: T[];
  onClose: () => void;
  renderCard: (item: T, placement?: GridPlacement, index?: number) => ReactNode;
  getItemKey: (item: T, index: number) => string;
  swipeLabel?: string;
  enableDetailPanel?: boolean;
  getFieldValue?: (item: T, field: string) => unknown;
  groupFn?: (items: T[]) => T[][];
  headerTextColor?: string;
}

export function GenericModalContent<T extends Record<string, any>>({
  overlayRef,
  panelRef,
  icon,
  title,
  accentColor,
  introText,
  items,
  onClose,
  renderCard,
  getItemKey,
  swipeLabel = "Swipe left to see next item",
  enableDetailPanel = false,
  getFieldValue,
  groupFn,
  headerTextColor,
}: GenericModalConfig<T>) {
  const headerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  // Standardized modal content animation
  useModalContent({
    headerRef,
    closeRef,
    introRef,
    cardsRef,
    stackRef,
    isMobile,
  });

  return (
    <BaseModalContent
      overlayRef={overlayRef}
      panelRef={panelRef}
      icon={icon}
      title={title}
      accentColor={accentColor}
      headerTextColor={headerTextColor}
      headerRef={headerRef}
      closeRef={closeRef}
      onClose={onClose}
      showCloseFooter={!selectedItem}
      contentClassName="flex min-h-0 flex-1 flex-col gap-1 sm:gap-4 overflow-hidden px-4 py-5 sm:px-8 sm:py-8"
    >
      <p
        ref={introRef}
        className="text-xs leading-relaxed sm:text-lg"
        style={{ color: "var(--color-panel-text-subtle)" }}
      >
        {introText}
      </p>

      {!selectedItem &&
        (isMobile ? (
          <div ref={stackRef} className="flex-1 min-h-0">
            <StackCardLayout
              items={items}
              renderCard={(item, index) =>
                enableDetailPanel ? (
                  <button
                    type="button"
                    className="size-full text-left group"
                    onClick={() => setSelectedItem(item)}
                  >
                    {renderCard(item, undefined, index)}
                  </button>
                ) : (
                  renderCard(item, undefined, index)
                )
              }
              getItemKey={getItemKey}
              swipeLabel={swipeLabel}
            />
          </div>
        ) : (
          <div ref={cardsRef} className="flex-1 min-h-0">
            <GridCardLayout
              items={items}
              groupFn={groupFn}
              renderCard={(item, placement, index) =>
                enableDetailPanel ? (
                  <button
                    type="button"
                    className="size-full text-left group"
                    onClick={() => setSelectedItem(item)}
                  >
                    {renderCard(item, placement, index)}
                  </button>
                ) : (
                  renderCard(item, placement, index)
                )
              }
              getItemKey={getItemKey}
              gridMode="equal"
              enforceAspectRatio={false}
            />
          </div>
        ))}

      {selectedItem && enableDetailPanel && (
        <GenericDetailPanel
          item={selectedItem}
          onBack={() => setSelectedItem(null)}
          getFieldValue={getFieldValue}
        />
      )}
    </BaseModalContent>
  );
}
