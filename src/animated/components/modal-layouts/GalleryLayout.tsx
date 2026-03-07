import { useState, useEffect, useCallback, type ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import gsap from 'gsap';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Inline SVGs for no-dependency icons
const ArrowLeft = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6" /></svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6" /></svg>
);

interface GalleryLayoutProps<T> {
    items: T[];
    renderCard: (item: T, index: number) => ReactNode;
    getItemKey: (item: T, index: number) => string | number;
    className?: string;
    itemClassName?: string;
    headerLeftContent?: ReactNode;
}

export function GalleryLayout<T>({
    items,
    renderCard,
    getItemKey,
    className,
    itemClassName,
    headerLeftContent,
}: GalleryLayoutProps<T>) {
    const [carouselRef, api] = useEmblaCarousel({
        align: 'start',
        dragFree: true,
        containScroll: 'trimSnaps',
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    // GSAP Entrance Animation to hint horizontality
    useEffect(() => {
        if (items.length > 0) {
            gsap.fromTo(
                '.gallery-item',
                { opacity: 0, x: 100 },
                { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', clearProps: 'all' }
            );
        }
    }, [items]);

    const onSelect = useCallback(() => {
        if (!api) return;
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, [api]);

    useEffect(() => {
        if (!api) return;
        onSelect();
        api.on('select', onSelect);
        api.on('reInit', onSelect);
        return () => {
            api.off('select', onSelect);
            api.off('reInit', onSelect);
        }
    }, [api, onSelect]);

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);

    if (!items || items.length === 0) return null;

    return (
        <div className={cn("relative w-full h-full flex flex-col", className)}>
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-4 shrink-0 sm:px-2 h-11">
                {headerLeftContent ? (
                    <div className="flex-1 min-w-0 pr-4">
                        {headerLeftContent}
                    </div>
                ) : (
                    <span className="text-sm font-medium opacity-60 uppercase tracking-widest hidden sm:block">Scroll / Drag to explore</span>
                )}
                <div className="flex gap-3 px-2 sm:px-0 ml-auto shrink-0">
                    <button
                        type="button"
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-full border bg-black/50 text-white shadow-xl backdrop-blur-md transition-all",
                            !canScrollPrev ? "opacity-30 border-white/10 cursor-not-allowed" : "border-white/30 hover:bg-black/80 hover:scale-105 active:scale-95 cursor-pointer"
                        )}
                        aria-label="Previous items"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-full border bg-black/50 text-white shadow-xl backdrop-blur-md transition-all",
                            !canScrollNext ? "opacity-30 border-white/10 cursor-not-allowed" : "border-white/30 hover:bg-black/80 hover:scale-105 active:scale-95 cursor-pointer"
                        )}
                        aria-label="Next items"
                    >
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="overflow-hidden flex-1 min-h-0 cursor-grab active:cursor-grabbing" ref={carouselRef}>
                <div className="flex h-full -ml-4 pl-4 sm:pl-2">
                    {items.map((item, index) => (
                        <div
                            key={getItemKey(item, index)}
                            className={cn(
                                "gallery-item min-w-0 h-full shrink-0 grow-0 pl-4 sm:pl-6",
                                // Mobile: 1 card wide tightly packed, Desktop: roughly 2.5 visible
                                "basis-[85%] sm:basis-[60%] lg:basis-[40%]",
                                itemClassName
                            )}
                        >
                            <div className="h-full pb-4 select-none pointer-events-none *:pointer-events-auto">
                                {renderCard(item, index)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
