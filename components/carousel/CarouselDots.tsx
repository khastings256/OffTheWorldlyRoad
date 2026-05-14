"use client";

interface CarouselDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export function CarouselDots({ total, current, onSelect }: CarouselDotsProps) {
  if (total <= 1) return null;

  return (
    <div
      role="tablist"
      aria-label="Carousel navigation"
      className="mt-4 flex items-center justify-center gap-2"
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => onSelect(index)}
            className={`
              h-2 rounded-full transition-all duration-300 focus:outline-none
              focus-visible:ring-2 focus-visible:ring-primary/50
              ${isActive
                ? "w-6 bg-primary"
                : "w-2 bg-muted hover:bg-muted-foreground/60"
              }
            `}
          />
        );
      })}
    </div>
  );
}
