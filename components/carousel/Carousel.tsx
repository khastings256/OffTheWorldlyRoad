"use client";

import { useState, useEffect, useCallback, useRef, useId } from "react";
import type { CarouselProps } from "./types";
import { CarouselArrow } from "./CarouselArrow";
import { CarouselDots } from "./CarouselDots";

export function Carousel<T>({
  items,
  renderItem,
  title,
  subtitle,
  cta,
  className = "",
  itemClassName = "",
  visibleCount = 3,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  pauseOnHover = true,
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const liveId = useId();

  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - visibleCount);

  // Clamp visible count to available items
  const effectiveVisibleCount = Math.min(visibleCount, totalItems);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clamped);
    },
    [maxIndex]
  );

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return 0;
      return prev + 1;
    });
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxIndex;
      return prev - 1;
    });
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || totalItems <= effectiveVisibleCount) return;
    if (isPaused) return;

    const timer = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isPaused, goNext, totalItems, effectiveVisibleCount]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("keydown", handleKeyDown);
    return () => track.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Scroll the track to the active slide
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slideWidth = track.scrollWidth / totalItems;
    track.scrollTo({
      left: slideWidth * currentIndex,
      behavior: "smooth",
    });
  }, [currentIndex, totalItems]);

  if (totalItems === 0) {
    return null;
  }

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;
  const showNavigation = totalItems > effectiveVisibleCount;

  return (
    <section
      className={`w-full ${className}`}
      aria-labelledby={title ? titleId : undefined}
      onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {title && (
              <h2 id={titleId} className="text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-muted">{subtitle}</p>
            )}
          </div>
          {cta && (
            <a
              href={cta.href}
              className="text-sm font-medium text-primary hover:text-primary-muted transition-colors"
            >
              {cta.label} →
            </a>
          )}
        </div>
      )}

      {/* Carousel viewport */}
      <div className="relative group">
        {/* Track */}
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={title || "Carousel"}
          aria-live="polite"
          aria-atomic="false"
          tabIndex={0}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth
                     scrollbar-hide gap-4 pb-2
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                     rounded-xl"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${totalItems}`}
              aria-hidden={index < currentIndex || index >= currentIndex + effectiveVisibleCount}
              className={`
                flex-shrink-0 snap-start
                w-[calc(100%-1rem)]
                sm:w-[calc(50%-0.5rem)]
                ${itemClassName}
              `}
              style={{
                flex: `0 0 calc(${100 / effectiveVisibleCount}% - ${((effectiveVisibleCount - 1) * 16) / effectiveVisibleCount}px)`,
              }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>

        {/* Live region for screen readers */}
        <div id={liveId} className="sr-only" aria-live="polite">
          Showing items {currentIndex + 1} to {Math.min(currentIndex + effectiveVisibleCount, totalItems)} of {totalItems}
        </div>

        {/* Arrows */}
        {showArrows && showNavigation && (
          <>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <CarouselArrow
                direction="prev"
                onClick={goPrev}
                disabled={!canGoPrev}
                label="Previous slide"
              />
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <CarouselArrow
                direction="next"
                onClick={goNext}
                disabled={!canGoNext}
                label="Next slide"
              />
            </div>
          </>
        )}
      </div>

      {/* Dots */}
      {showDots && showNavigation && (
        <CarouselDots
          total={maxIndex + 1}
          current={currentIndex}
          onSelect={goTo}
        />
      )}
    </section>
  );
}
