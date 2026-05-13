"use client";

import { useEffect } from "react";
import Image from "next/image";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

// Placeholder navigation data
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "#gallery" },
  { label: "Blog", href: "#blog" },
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
];

export function MobileNav({ isOpen, onClose, currentPath }: MobileNavProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-80 max-w-full bg-surface border-l border-border z-50 md:hidden flex flex-col">
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg">
              <Image
                src="/images/logo.jpg"
                alt="OTWR"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-semibold text-foreground text-sm tracking-wide">
              OTWR
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_LINKS.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                className={
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors " +
                  (isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-surface-elevated hover:text-primary")
                }
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="ml-auto">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Footer area */}
        <div className="px-5 py-4 border-t border-border-subtle space-y-3">
          <p className="text-xs text-muted leading-relaxed">
            Faith, wilderness, and the beauty of creation. Join the journey.
          </p>
          <div className="flex gap-3">
            <a
              href="#instagram"
              onClick={(e) => e.preventDefault()}
              className="text-muted hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="#youtube"
              onClick={(e) => e.preventDefault()}
              className="text-muted hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
