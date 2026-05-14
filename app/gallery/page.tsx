"use client";

import { useState, useCallback } from "react";
import { Carousel } from "@/components/carousel";
import { PhotoCard } from "@/components/cards/PhotoCard";
import { Lightbox } from "@/components/lightbox/Lightbox";
import { photos } from "@/lib/dummy-data";
import type { PhotoItem } from "@/lib/dummy-data";

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePhotoClick = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="flex flex-col flex-1 bg-background transition-colors duration-300">
      <main className="flex-1 w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Carousel<PhotoItem>
          title="Wilderness Photos"
          subtitle="Landscapes captured in the wild places where earth meets sky."
          items={photos}
          visibleCount={3}
          renderItem={(photo, index) => (
            <PhotoCard
              photo={photo}
              onClick={() => handlePhotoClick(index)}
            />
          )}
        />
      </main>

      <Lightbox
        photos={photos}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
