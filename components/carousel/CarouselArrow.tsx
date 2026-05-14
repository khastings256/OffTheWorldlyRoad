"use client";

import type { CarouselArrowProps } from "./types";

export function CarouselArrow({ direction, onClick, disabled, label }: CarouselArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label || (direction === "prev" ? "Previous" : "Next")}
      className={`
        flex h-10 w-10 items-center justify-center rounded-full
        bg-background/90 backdrop-blur-sm border border-border
        text-foreground shadow-sm
        hover:bg-surface-elevated hover:shadow-md
        active:scale-95
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
        disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-background/90
      `}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        {direction === "prev" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}
