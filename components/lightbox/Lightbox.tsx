"use client";

import { useEffect, useRef, useCallback } from "react";
import type { PhotoItem } from "@/lib/dummy-data";

export interface LightboxProps {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

export function Lightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isMulti = photos.length > 1;

  // Store previously focused element and lock body scroll
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      // Focus close button after a short delay to ensure modal is rendered
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 10);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Return focus on close
  useEffect(() => {
    if (!isOpen && previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (!isMulti) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
        onNavigate?.(newIndex);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
        onNavigate?.(newIndex);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, photos.length, isMulti, onClose, onNavigate]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handlePrev = useCallback(() => {
    if (!isMulti) return;
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    onNavigate?.(newIndex);
  }, [currentIndex, photos.length, isMulti, onNavigate]);

  const handleNext = useCallback(() => {
    if (!isMulti) return;
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    onNavigate?.(newIndex);
  }, [currentIndex, photos.length, isMulti, onNavigate]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 transition-opacity"
        aria-hidden="true"
        onClick={handleBackdropClick}
      />

      {/* Close button */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white
                   hover:bg-black/70 transition-colors focus:outline-none focus-visible:ring-2
                   focus-visible:ring-white/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Navigation arrows */}
      {isMulti && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full
                       bg-black/50 text-white hover:bg-black/70 transition-colors
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full
                       bg-black/50 text-white hover:bg-black/70 transition-colors
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Image container */}
      <div
        className="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentPhoto.src}
          alt={currentPhoto.alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
      </div>

      {/* Counter */}
      {isMulti && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
          {currentIndex + 1} / {photos.length}
        </div>
      )}
    </div>
  );
}
