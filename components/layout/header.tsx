"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoginDropdown } from "./login-dropdown";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/components/theme";
import { useCart } from "@/lib/cart";

// Placeholder navigation data — easily swapped for real CMS/routing data
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "#gallery" },
  { label: "Blog", href: "#blog" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
];

function ShoppingCartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const { totalItems } = useCart();

  // Update active state on navigation
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setCurrentPath(href);
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

          {/* Right side: Theme toggle + Cart + Login + Mobile menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <button
              onClick={() => console.log("Cart clicked")}
              className="relative inline-flex items-center justify-center rounded-lg p-2 text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
              aria-label={`Shopping cart${totalItems > 0 ? `, ${totalItems} items` : ""}`}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-inverse">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            <div>
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
