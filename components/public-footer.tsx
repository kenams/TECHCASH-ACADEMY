import Link from "next/link";
import { localProducts } from "@/lib/catalog";
import { siteConfig } from "@/lib/site";
import { BrandMark } from "@/components/ui/BrandMark";

function slugLabel(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function PublicFooter() {
  const popularCourses = localProducts.slice(0, 3);

  return (
    <footer className="mt-16 border-t border-transparent pt-10">
      <div className="h-px w-full bg-[linear-gradient(90deg,rgba(215,184,122,0.5),transparent)]" />

      <div className="grid gap-8 py-10 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.8fr))]">
        <div className="grid gap-5">
          <BrandMark />
          <p className="max-w-md text-sm leading-7 text-[var(--muted)]">Formations digitales vendables et livrables.</p>
          <div className="flex flex-wrap gap-3 text-sm text-[var(--foreground)]">
            <span className="rounded-full border border-[var(--border)] bg-white/5 px-4 py-2">Stripe sécurisé</span>
            <span className="rounded-full border border-[var(--border)] bg-white/5 px-4 py-2">Accès immédiat</span>
            <span className="rounded-full border border-[var(--border)] bg-white/5 px-4 py-2">Éditeur français</span>
          </div>
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="w-fit text-sm text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
          >
            {siteConfig.supportEmail}
          </a>
        </div>

        <div className="grid gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]">Navigation</h3>
          <div className="grid gap-3 text-sm text-[var(--muted)]">
            <Link href="/" className="transition-colors duration-200 hover:text-[var(--foreground)]">
              Accueil
            </Link>
            <Link href="/formations" className="transition-colors duration-200 hover:text-[var(--foreground)]">
              Formations
            </Link>
            <Link href="/login" className="transition-colors duration-200 hover:text-[var(--foreground)]">
              Connexion
            </Link>
            <Link href="/register" className="transition-colors duration-200 hover:text-[var(--foreground)]">
              Commencer
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]">Formations populaires</h3>
          <div className="grid gap-3 text-sm">
            {popularCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/formations/${course.slug}`}
                className="grid gap-1 rounded-2xl border border-[var(--border)] bg-white/5 px-4 py-3 transition-colors duration-200 hover:text-[var(--foreground)]"
              >
                <span className="text-[var(--foreground)]">{slugLabel(course.slug)}</span>
                <span className="text-[var(--muted)]">{course.slug}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]">Légal</h3>
          <div className="grid gap-3 text-sm text-[var(--muted)]">
            <Link href="/mentions-legales" className="transition-colors duration-200 hover:text-[var(--foreground)]">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="transition-colors duration-200 hover:text-[var(--foreground)]">
              Politique de confidentialité
            </Link>
            <Link href="/conditions-utilisation" className="transition-colors duration-200 hover:text-[var(--foreground)]">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-[rgba(148,163,184,0.12)] py-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} TechCash Academy - KAH-Digital</p>
        <p>{siteConfig.legalEntity}</p>
      </div>
    </footer>
  );
}
