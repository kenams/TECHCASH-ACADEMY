import type { Metadata } from "next";
import Link from "next/link";
import { MemberProductCard } from "@/components/member-product-card";
import { getProductSupplement } from "@/lib/catalog";
import { getActiveProducts, getOwnedProducts } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard membre | TechCash Academy",
  description: "Retrouve tes formations achetees, tes acces actifs et le catalogue disponible."
};

export default async function DashboardPage() {
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

  const ownedSlugs = new Set(ownedProducts.map((product) => product.slug));
  const hasGlobalAccess = Boolean(profile?.is_premium);
  const accessibleProducts = hasGlobalAccess
    ? activeProducts.map((product) => ({
        ...product,
        purchase: null,
        has_access: true
      }))
    : ownedProducts;
  const totalOwnedValue = accessibleProducts.reduce((sum, product) => sum + product.price_cents, 0);
  const spotlightProduct = accessibleProducts[0] || null;
  const spotlightSupplement = spotlightProduct ? getProductSupplement(spotlightProduct.slug) : null;
  const discoverProducts = activeProducts.filter((product) => !ownedSlugs.has(product.slug));

  return (
    <main className="dashboard-frame">
      <section className="dashboard-hero">
        <div className="max-w-3xl">
          <div className="eyebrow">Espace membre</div>
          <h1>Ton catalogue personnel de formations</h1>
          <p className="lead">
            Connecte avec {profile?.email || user.email}. Tu retrouves ici ce que tu as achete,
            ce qui reste a debloquer et les ressources disponibles immediatement.
          </p>
        </div>
        <div className="cta-row">
          <Link href="/formations" className="button-secondary">
            Explorer le catalogue
          </Link>
          <form action="/auth/sign-out" method="post">
            <button className="button-ghost" type="submit">
              Deconnexion
            </button>
          </form>
        </div>
      </section>

      <section className="section dashboard-nav-section">
        <div className="dashboard-nav-grid">
          <Link href="/dashboard" className="dashboard-nav-link dashboard-nav-link-active">
            Vue d'ensemble
          </Link>
          <Link href="/dashboard/mes-formations" className="dashboard-nav-link">
            Mes formations
          </Link>
          <Link href="/formations" className="dashboard-nav-link">
            Catalogue complet
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="member-stats-grid">
          <article className="card">
            <p className="helper">Formations accessibles</p>
            <h2>{accessibleProducts.length}</h2>
            <p>
              {hasGlobalAccess
                ? "Statut premium global actif."
                : "Debloquees via tes achats confirmes Stripe."}
            </p>
          </article>
          <article className="card">
            <p className="helper">Catalogue actif</p>
            <h2>{activeProducts.length}</h2>
            <p>Formations actuellement visibles et commercialisables sur la plateforme.</p>
          </article>
          <article className="card">
            <p className="helper">Statut compte</p>
            <h2>{hasGlobalAccess ? "Global" : "Par produit"}</h2>
            <p>La logique d'acces s'appuie sur tes achats ou sur un override premium global.</p>
          </article>
          <article className="card">
            <p className="helper">Valeur catalogue debloquee</p>
            <h2>
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR"
              }).format(totalOwnedValue / 100)}
            </h2>
            <p>Montant total des formations actuellement accessibles sur ton compte.</p>
          </article>
        </div>
      </section>

      {spotlightProduct ? (
        <section className="section">
          <div className="dashboard-spotlight">
            <div className="dashboard-spotlight-copy">
              <div className="eyebrow">Continuer maintenant</div>
              <h2>{spotlightProduct.title}</h2>
              <p>{spotlightSupplement?.pitch || spotlightProduct.short_description}</p>
              {spotlightSupplement?.outcomes?.length ? (
                <ul className="bullet-list">
                  {spotlightSupplement.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              <div className="cta-row">
                <Link href={`/dashboard/formations/${spotlightProduct.slug}`} className="button">
                  Ouvrir la formation
                </Link>
                <Link href="/dashboard/mes-formations" className="button-secondary">
                  Voir toutes mes formations
                </Link>
              </div>
            </div>
            <aside className="card dashboard-spotlight-card">
              <p className="helper">A faire maintenant</p>
              <ul className="list">
                <li>Ouvrir les modules deja publies</li>
                <li>Telecharger les ressources et PDF</li>
                <li>Revenir plus tard pour les modules a venir</li>
              </ul>
            </aside>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="section-title">
          <h2>Mes formations</h2>
          <p>
            Accede rapidement aux contenus que tu possedes deja. Chaque fiche membre ouvre la page
            privee de la formation correspondante.
          </p>
        </div>
        {accessibleProducts.length ? (
          <div className="product-grid">
            {accessibleProducts.map((product) => (
              <MemberProductCard
                key={product.id}
                product={product}
                isOwned
                purchaseDate={"purchase" in product ? product.purchase?.created_at || null : null}
              />
            ))}
          </div>
        ) : (
          <article className="card empty-state-card">
            <h3>Aucun achat pour le moment</h3>
            <p>
              Ton compte est pret. Choisis une premiere formation pour debloquer l'espace membre et
              demarrer proprement.
            </p>
            <div className="cta-row">
              <Link href={`/checkout?product=${siteConfig.primaryProductSlug}`} className="button">
                Commencer par l'offre principale
              </Link>
              <Link href="/formations" className="button-secondary">
                Voir tout le catalogue
              </Link>
            </div>
          </article>
        )}
      </section>

      {discoverProducts.length ? (
        <section className="section">
          <div className="section-title">
            <h2>Formations recommandees</h2>
            <p>
              Des produits complementaires pour etendre ton offre : acquisition, delivery web,
              outils metier et applications mobiles.
            </p>
          </div>
          <div className="product-grid">
            {discoverProducts.map((product) => (
              <MemberProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
