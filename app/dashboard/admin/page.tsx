import type { Metadata } from "next";
import Link from "next/link";
import { AdminCatalogManager } from "@/components/admin-catalog-manager";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";
import { getCatalogSnapshot } from "@/lib/catalog-admin";
import { requireAdminSession } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Admin contenu | TechCash Academy",
  description: "Gestion des formations et des modules de contenu."
};

export default async function AdminDashboardPage() {
  await requireAdminSession();
  const snapshot = await getCatalogSnapshot();

  return (
    <div className="grid gap-8">
      <AnimatedSection className="grid gap-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="grid gap-3">
            <Badge variant="primary">Administration</Badge>
            <div className="grid gap-3">
              <h1 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-4xl leading-tight tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
                Piloter le catalogue de formations
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
                Crée une formation, affine son positionnement et ajoute des modules texte, PDF, ressources, vidéos ou contenus à venir dans un back-office plus lisible.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className={buttonClasses("ghost", "sm")}>
              Retour au tableau de bord
            </Link>
            <Link href="/formations" className={buttonClasses("secondary", "sm")}>
              Voir le site public
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <GlowCard>
            <p className="text-sm text-[var(--muted)]">Formations</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">{snapshot.products.length}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Nombre d'offres actuellement présentes dans le catalogue administrable.</p>
          </GlowCard>
          <GlowCard>
            <p className="text-sm text-[var(--muted)]">Modules</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
              {snapshot.products.reduce((sum, product) => sum + product.modules.length, 0)}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Blocs de contenu déjà reliés aux formations et prêts à être enrichis.</p>
          </GlowCard>
          <GlowCard glowColor="emerald">
            <p className="text-sm text-[var(--muted)]">État</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">Live</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Le catalogue administré ici est celui qui porte directement l'expérience publique et membre.</p>
          </GlowCard>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={80}>
        <AdminCatalogManager initialSnapshot={snapshot} />
      </AnimatedSection>
    </div>
  );
}
