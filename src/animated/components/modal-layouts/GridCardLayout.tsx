import { type ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

export interface GridPlacement {
    rowIdx?: number;
    colSpan?: number;
}

interface GridCardLayoutProps<T> {
    items: T[];
    renderCard: (item: T, placement: GridPlacement, index: number) => ReactNode;
    getItemKey: (item: T, index: number) => string | number;
    className?: string;
}

export function GridCardLayout<T>({
    items,
    renderCard,
    getItemKey,
    className = "",
}: GridCardLayoutProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Reset and trigger animation
        if (!containerRef.current || items.length === 0) return;

        const ctx = gsap.context(() => {
            const cards = containerRef.current!.querySelectorAll("[data-grid-item]");

            // Lighter animation for smoother performance:
            // avoid expensive blur/filter and heavy scaling on large cards.
            gsap.fromTo(
                cards,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.12,
                    ease: "power3.out",
                    overwrite: true, // Prevents animation stacking
                }
            );
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, [items]);

    // Force 1 or 2 columns, but ensure they take up equal height
    const gridCols = items.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2";

    return (
        <div
            ref={containerRef}
            className={`grid ${gridCols} gap-6 w-full h-full items-stretch ${className}`}
        >
            {items.slice(0, 2).map((item, index) => (
                <div
                    key={getItemKey(item, index)}
                    data-grid-item
                    className="relative w-full h-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 flex flex-col"
                >
                    <div className="h-full pb-4 select-none pointer-events-none *:pointer-events-auto">
                        {renderCard(item, {}, index)}
                    </div>
                </div>
            ))}
        </div>
    );
}