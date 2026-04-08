import type { Metadata } from "next";
import Link from "next/link";
import { AdminCatalogManager } from "@/components/admin-catalog-manager";
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
    <main className="dashboard-frame">
      <section className="dashboard-hero">
        <div className="max-w-3xl">
          <div className="eyebrow">Administration</div>
          <h1>Piloter le catalogue de formations</h1>
          <p className="lead">
            Crée une formation, modifie son positionnement, ajoute des modules texte, PDF,
            ressources, vidéos ou blocs bientôt disponibles.
          </p>
        </div>
        <div className="cta-row">
          <Link href="/dashboard" className="button-secondary">
            Retour dashboard
          </Link>
          <Link href="/formations" className="button">
            Voir le site public
          </Link>
        </div>
      </section>

      <section className="section dashboard-nav-section">
        <div className="dashboard-nav-grid">
          <Link href="/dashboard" className="dashboard-nav-link">
            Vue d'ensemble
          </Link>
          <Link href="/dashboard/mes-formations" className="dashboard-nav-link">
            Mes formations
          </Link>
          <Link href="/dashboard/admin" className="dashboard-nav-link dashboard-nav-link-active">
            Admin contenu
          </Link>
        </div>
      </section>

      <AdminCatalogManager initialSnapshot={snapshot} />
    </main>
  );
}
