"use client";

import Link from "next/link";
import { useState } from "react";

type NavLink = {
  href: string;
  label: string;
  variant?: "ghost" | "primary" | "secondary";
};

type NavbarProps = {
  brand: string;
  links?: NavLink[];
  isLoggedIn: boolean;
  primaryProductSlug?: string;
  showStartCTA?: boolean;
};

export function Navbar({
  brand,
  links = [],
  isLoggedIn,
  primaryProductSlug = "freelance-it-30-jours",
  showStartCTA = false
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const startHref = `/register?next=${encodeURIComponent(`/checkout?product=${primaryProductSlug}`)}`;

  const userLinks: NavLink[] = isLoggedIn
    ? [{ href: "/dashboard", label: "Mon espace", variant: "primary" }]
    : showStartCTA
    ? [
        { href: "/login", label: "Connexion", variant: "ghost" },
        { href: startHref, label: "Commencer", variant: "primary" }
      ]
    : [
        { href: "/login", label: "Connexion", variant: "primary" }
      ];

  const allLinks = [...links, ...userLinks];

  return (
    <header className="topbar">
      <Link href="/" className="brand">
        {brand}
      </Link>

      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <nav className={`nav${menuOpen ? " nav-open" : ""}`} role="navigation">
        {allLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              link.variant === "primary"
                ? "button"
                : link.variant === "secondary"
                ? "button-secondary"
                : "button-ghost"
            }
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {menuOpen && (
        <div
          className="nav-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
