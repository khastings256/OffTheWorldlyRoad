"use client";

import type { PhotoItem } from "@/lib/dummy-data";

export interface PhotoCardProps {
  photo: PhotoItem;
  onClick?: () => void;
}

export function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View photo: ${photo.alt}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="relative overflow-hidden rounded-xl border border-border cursor-pointer
                 hover:scale-[1.02] transition-transform duration-200
                 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none"
      style={{ aspectRatio: "4 / 3" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
