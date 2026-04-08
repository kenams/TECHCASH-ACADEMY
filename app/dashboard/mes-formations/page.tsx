import type { Metadata } from "next";
import Link from "next/link";
import { MemberProductCard } from "@/components/member-product-card";
import { isAdminEmail } from "@/lib/admin";
import { getActiveProducts, getOwnedProducts } from "@/lib/products";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Mes formations | TechCash Academy",
  description: "Toutes les formations débloquées sur ton compte membre."
};

export default async function MemberProductsPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [profile, ownedProducts, activeProducts] = await Promise.all([
    getUserProfile(user.id, supabase),
    getOwnedProducts(user.id),
    getActiveProducts()
  ]);

  const hasGlobalAccess = Boolean(profile?.is_premium);
  const canManageCatalog = isAdminEmail(user.email);
  const products = hasGlobalAccess
    ? activeProducts.map((product) => ({
        ...product,
        purchase: null,
        has_access: true
      }))
    : ownedProducts;

  return (
    <main className="dashboard-frame">
      <section className="dashboard-hero">
        <div className="max-w-3xl">
          <div className="eyebrow">Mes formations</div>
          <h1>Tout ce que tu as débloqué</h1>
          <p className="lead">
            Cette vue rassemble uniquement les produits accessibles avec ton compte.
          </p>
        </div>
        <div className="cta-row">
          <Link href="/dashboard" className="button-secondary">
            Retour dashboard
          </Link>
          <Link href="/formations" className="button">
            Voir le catalogue
          </Link>
        </div>
      </section>

      <section className="section dashboard-nav-section">
        <div className="dashboard-nav-grid">
          <Link href="/dashboard" className="dashboard-nav-link">
            Vue d'ensemble
          </Link>
          <Link href="/dashboard/mes-formations" className="dashboard-nav-link dashboard-nav-link-active">
            Mes formations
          </Link>
          <Link href="/formations" className="dashboard-nav-link">
            Catalogue complet
          </Link>
          {canManageCatalog ? (
            <Link href="/dashboard/admin" className="dashboard-nav-link">
              Admin contenu
            </Link>
          ) : null}
        </div>
      </section>

      {products.length ? (
        <section className="section">
          <div className="product-grid">
            {products.map((product) => (
              <MemberProductCard
                key={product.id}
                product={product}
                isOwned
                purchaseDate={"purchase" in product ? product.purchase?.created_at || null : null}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="section">
          <article className="card empty-state-card">
            <h3>Aucune formation débloquée</h3>
            <p>Ton espace membre est vide pour l'instant. Choisis une formation pour commencer.</p>
            <div className="cta-row">
              <Link href="/formations" className="button">
                Explorer les formations
              </Link>
            </div>
          </article>
        </section>
      )}
    </main>
  );
}
