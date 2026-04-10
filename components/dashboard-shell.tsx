"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { cn } from "@/lib/cn";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button, buttonClasses } from "@/components/ui/Button";

type DashboardShellProps = {
  email: string;
  canManageCatalog?: boolean;
  children: React.ReactNode;
};

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

function initialsFromEmail(email: string) {
  const [local = "tc"] = email.split("@");
  return local
    .split(/[.\-_]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 2);
}

export function DashboardShell({ email, canManageCatalog = false, children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [menuOpen, setMenuOpen] = useState(false);
  const displayName = email.split("@")[0] || email;

  const mainNav = useMemo<NavItem[]>(
    () => [
      { href: "/dashboard", label: "Tableau de bord", icon: "🏠" },
      { href: "/dashboard/mes-formations", label: "Mes formations", icon: "📚" },
      { href: "/dashboard/securite", label: "Profil", icon: "👤" }
    ],
    []
  );

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 border-r border-[var(--border)] bg-[var(--surface-strong)]/95 px-5 py-6 backdrop-blur-xl lg:flex lg:flex-col">
          <BrandMark compact className="mb-8" />
          <div className="mb-8 rounded-[24px] border border-[var(--border)] bg-white/5 p-4 shadow-[var(--shadow)]">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[linear-gradient(135deg,rgba(215,184,122,0.18),rgba(255,255,255,0.04))] text-sm font-semibold text-[var(--foreground)]">
              {initialsFromEmail(email)}
            </div>
            <p className="mb-1 text-sm font-semibold text-[var(--foreground)]">Espace membre</p>
            <p className="text-sm text-[var(--muted)]">{email}</p>
          </div>

          <nav className="grid gap-2">
            {mainNav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-200",
                    active
                      ? "border-[rgba(215,184,122,0.3)] bg-[rgba(215,184,122,0.12)] text-[var(--foreground)] shadow-[0_18px_40px_rgba(2,8,23,0.22)]"
                      : "border-transparent text-[var(--muted)] hover:border-[var(--border)] hover:bg-white/5 hover:text-[var(--foreground)]"
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {canManageCatalog ? (
              <Link
                href="/dashboard/admin"
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-200",
                  pathname.startsWith("/dashboard/admin")
                    ? "border-[rgba(215,184,122,0.3)] bg-[rgba(215,184,122,0.12)] text-[var(--foreground)]"
                    : "border-transparent text-[var(--muted)] hover:border-[var(--border)] hover:bg-white/5 hover:text-[var(--foreground)]"
                )}
              >
                <span>🧩</span>
                <span>Admin contenu</span>
              </Link>
            ) : null}
          </nav>

          <div className="mt-auto grid gap-3">
            <Link href="/formations" className={buttonClasses("secondary", "sm", "w-full")}>
              Catalogue public
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full justify-start px-4">
              🚪 Déconnexion
            </Button>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <div className="px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-12 lg:pt-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </div>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--surface-strong)]/95 px-3 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-4 gap-2">
          {mainNav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "grid justify-items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition-all duration-200",
                  active ? "bg-[rgba(215,184,122,0.12)] text-[var(--foreground)]" : "text-[var(--muted)]"
                )}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className={cn(
              "grid justify-items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition-all duration-200",
              menuOpen ? "bg-[rgba(215,184,122,0.12)] text-[var(--foreground)]" : "text-[var(--muted)]"
            )}
          >
            <span className="text-base">☰</span>
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-[rgba(5,8,22,0.72)] p-4 backdrop-blur-md lg:hidden">
          <div className="mx-auto mt-12 max-w-sm rounded-[28px] border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-[var(--shadow)]">
            <div className="mb-5 flex items-center justify-between">
              <BrandMark compact />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-[var(--border)] p-2 text-[var(--foreground)]"
                aria-label="Fermer le menu membre"
              >
                ✕
              </button>
            </div>

            <div className="mb-5 rounded-[22px] border border-[var(--border)] bg-white/5 p-4">
              <p className="mb-1 text-sm font-semibold text-[var(--foreground)]">{displayName}</p>
              <p className="text-sm text-[var(--muted)]">{email}</p>
            </div>

            <div className="grid gap-2">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl border border-transparent bg-white/5 px-4 py-3 text-sm text-[var(--foreground)]"
                >
                  {item.icon} {item.label}
                </Link>
              ))}
              {canManageCatalog ? (
                <Link
                  href="/dashboard/admin"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl border border-transparent bg-white/5 px-4 py-3 text-sm text-[var(--foreground)]"
                >
                  🧩 Admin contenu
                </Link>
              ) : null}
            </div>

            <div className="mt-5 grid gap-3">
              <Link href="/formations" onClick={() => setMenuOpen(false)} className={buttonClasses("secondary", "md", "w-full")}>
                Voir le catalogue
              </Link>
              <Button
                variant="ghost"
                size="md"
                onClick={async () => {
                  setMenuOpen(false);
                  await handleSignOut();
                }}
                className="w-full justify-center"
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
