"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface User {
  name: string;
  email: string;
  avatar: string;
}

// Placeholder user data for demonstration
const PLACEHOLDER_USER: User = {
  name: "Kenneth Hastings",
  email: "kenneth@offtheworldlyroad.com",
  avatar: "/images/logo.jpg",
};

export function LoginDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simulate login with placeholder data
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoggedIn(true);
      setUser(PLACEHOLDER_USER);
      setIsLoading(false);
      setEmail("");
      setPassword("");
      setIsOpen(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {isLoggedIn && user ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 rounded-full border border-border bg-surface px-3 py-1.5 hover:bg-surface-elevated transition-colors"
          aria-expanded={isOpen}
        >
          <div className="relative h-7 w-7 overflow-hidden rounded-full">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium text-foreground hidden sm:inline">
            {user.name.split(" ")[0]}
          </span>
          <svg
            className={`h-4 w-4 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-elevated hover:border-primary/30 transition-colors"
          aria-expanded={isOpen}
        >
          <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Sign In</span>
        </button>
      )}

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl border border-border bg-surface shadow-lg ring-1 ring-black/5 z-50">
          {isLoggedIn && user ? (
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border-subtle">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted truncate">{user.email}</p>
                </div>
              </div>
              <nav className="space-y-1">
                <a
                  href="#profile"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface-elevated transition-colors"
                  onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
                >
                  <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </a>
                <a
                  href="#settings"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface-elevated transition-colors"
                  onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
                >
                  <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </a>
                <a
                  href="#orders"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface-elevated transition-colors"
                  onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
                >
                  <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Orders
                </a>
              </nav>
              <div className="mt-3 pt-3 border-t border-border-subtle">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-primary hover:bg-primary/5 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="p-4 space-y-3">
              <div className="text-center pb-1">
                <p className="text-sm font-semibold text-foreground">Welcome back</p>
                <p className="text-xs text-muted mt-0.5">Sign in to your OTWR account</p>
              </div>
              <div>
                <label htmlFor="login-email" className="block text-xs font-medium text-muted mb-1">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-xs font-medium text-muted mb-1">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-primary text-inverse px-4 py-2 text-sm font-medium hover:bg-primary-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
              <div className="text-center pt-1">
                <a
                  href="#forgot"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs text-muted hover:text-primary transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="border-t border-border-subtle pt-2.5 text-center">
                <p className="text-xs text-muted">
                  No account?{" "}
                  <a
                    href="#signup"
                    onClick={(e) => e.preventDefault()}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
