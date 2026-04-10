"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button, buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type NavbarProps = {
  brand: string;
  isLoggedIn: boolean;
  primaryProductSlug?: string;
  links?: Array<{ href: string; label: string }>;
  showStartCTA?: boolean;
};

function initialsFromEmail(email: string) {
  return email
    .split("@")[0]
    .split(/[.\-_]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 2);
}

export function Navbar({ brand, isLoggedIn, primaryProductSlug = "freelance-it-30-jours" }: NavbarProps) {
  const supabase = getSupabaseBrowserClient();
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authState, setAuthState] = useState<{ loggedIn: boolean; email: string }>({
    loggedIn: isLoggedIn,
    email: ""
  });

  useEffect(() => {
    async function syncSession() {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      setAuthState({
        loggedIn: Boolean(session?.user),
        email: session?.user.email || ""
      });
    }

    void syncSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState({
        loggedIn: Boolean(session?.user),
        email: session?.user.email || ""
      });
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const startHref = `/register?next=${encodeURIComponent(`/checkout?product=${primaryProductSlug}`)}`;

  const baseLinks = useMemo(
    () => [
      { href: "/", label: "Accueil" },
      { href: "/formations", label: "Formations" },
      ...(authState.loggedIn ? [{ href: "/dashboard", label: "Mon espace" }] : [])
    ],
    [authState.loggedIn]
  );

  async function handleSignOut() {
    await supabase.auth.signOut();
    setDropdownOpen(false);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const email = authState.email;
  const initials = email ? initialsFromEmail(email) : "TC";

  return (
    <>
      <header
        className={cn(
          "topbar !mb-8 !mt-4 !flex-nowrap !gap-4 !overflow-visible !px-5 transition-all duration-300",
          scrolled ? "border-[rgba(215,184,122,0.22)] bg-[rgba(7,12,24,0.9)]" : ""
        )}
      >
        <Link href="/" className="shrink-0" aria-label={brand}>
          <BrandMark />
        </Link>

        <nav className="nav ml-auto hidden items-center gap-3 md:flex">
          {baseLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  active ? "bg-white/8 text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          {authState.loggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((value) => !value)}
                className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/5 px-2 py-2 text-sm text-[var(--foreground)] transition-all duration-200 hover:border-[rgba(215,184,122,0.22)] hover:bg-white/8"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[linear-gradient(135deg,rgba(215,184,122,0.18),rgba(255,255,255,0.04))] font-semibold">
                  {initials}
                </span>
                <span className="hidden max-w-[160px] truncate text-left lg:block">{email || "Mon espace"}</span>
              </button>

              {dropdownOpen ? (
                <div className="absolute right-0 mt-3 grid min-w-[220px] gap-1 rounded-[24px] border border-[var(--border)] bg-[var(--surface-strong)]/95 p-3 shadow-[var(--shadow)] backdrop-blur-xl">
                  <Link href="/dashboard" className="rounded-2xl px-4 py-3 text-sm text-[var(--foreground)] hover:bg-white/5">
                    Mon espace
                  </Link>
                  <Link href="/dashboard/mes-formations" className="rounded-2xl px-4 py-3 text-sm text-[var(--foreground)] hover:bg-white/5">
                    Mes formations
                  </Link>
                  <Link href="/dashboard/securite" className="rounded-2xl px-4 py-3 text-sm text-[var(--foreground)] hover:bg-white/5">
                    Sécurité 2FA
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="rounded-2xl px-4 py-3 text-left text-sm text-[var(--danger)] hover:bg-white/5"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <Link href="/login" className={buttonClasses("ghost", "sm")}>
                Connexion
              </Link>
              <Link href={startHref} className={buttonClasses("primary", "sm")}>
                Commencer
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="nav-hamburger md:!hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          <span className="relative block h-4 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                menuOpen ? "top-[7px] rotate-45" : ""
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                menuOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                menuOpen ? "top-[7px] -rotate-45" : ""
              )}
            />
          </span>
        </button>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-[rgba(5,8,22,0.86)] backdrop-blur-lg md:hidden">
          <div className="flex min-h-screen flex-col px-6 pt-6">
            <div className="mb-8 flex items-center justify-between">
              <BrandMark />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-[var(--border)] p-3 text-[var(--foreground)]"
                aria-label="Fermer le menu"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-3">
              {baseLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="animate-fade-in rounded-[24px] border border-[var(--border)] bg-white/5 px-5 py-4 text-lg text-[var(--foreground)]"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {link.label}
                </Link>
              ))}
              {authState.loggedIn ? (
                <Link
                  href="/dashboard/securite"
                  onClick={() => setMenuOpen(false)}
                  className="animate-fade-in rounded-[24px] border border-[var(--border)] bg-white/5 px-5 py-4 text-lg text-[var(--foreground)]"
                  style={{ animationDelay: `${baseLinks.length * 80}ms` }}
                >
                  Sécurité 2FA
                </Link>
              ) : null}
            </div>

            <div className="mt-auto grid gap-3 pb-8 pt-8">
              {authState.loggedIn ? (
                <>
                  <div className="rounded-[24px] border border-[var(--border)] bg-white/5 px-5 py-4">
                    <p className="mb-1 text-sm text-[var(--muted)]">Connecté avec</p>
                    <p className="truncate text-base text-[var(--foreground)]">{email}</p>
                  </div>
                  <Button variant="secondary" onClick={() => { setMenuOpen(false); router.push("/dashboard/mes-formations"); }}>
                    Mes formations
                  </Button>
                  <Button variant="ghost" onClick={handleSignOut}>
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className={buttonClasses("ghost", "md")}>
                    Connexion
                  </Link>
                  <Link href={startHref} onClick={() => setMenuOpen(false)} className={buttonClasses("primary", "md")}>
                    Commencer
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
