"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoginDropdown } from "./login-dropdown";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/components/theme";

// Placeholder navigation data — easily swapped for real CMS/routing data
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "#gallery" },
  { label: "Blog", href: "#blog" },
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  // Simulated navigation handler — updates active state without actual routing
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setCurrentPath(href);
    // Scroll to top for "home", otherwise a placeholder behavior
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-lg ring-1 ring-border group-hover:ring-primary/30 transition-all">
              <Image
                src="/images/logo.jpg"
                alt="Off The Worldly Road"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold tracking-wide text-foreground group-hover:text-primary transition-colors">
                OTWR
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={
                    "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors " +
                    (isActive
                      ? "text-primary"
                      : "text-muted hover:text-foreground hover:bg-surface-elevated")
                  }
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-primary" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right side: Theme toggle + Login + Mobile menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <div className="hidden sm:block">
              <LoginDropdown />
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-muted hover:text-foreground hover:bg-surface-elevated transition-colors md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentPath={currentPath}
      />
    </>
  );
}
