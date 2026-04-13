import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { buttonClasses } from "@/components/ui/Button";
import { MemberProductCard } from "@/components/member-product-card";
import { getUserModuleProgressByProducts } from "@/lib/progress";
import { getActiveProducts, getOwnedProducts, getProductWithModulesBySlug } from "@/lib/products";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";

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
  const products = hasGlobalAccess
    ? activeProducts.map((product) => ({ ...product, purchase: null, has_access: true }))
    : ownedProducts;
  const fullProducts = await Promise.all(products.map((product) => getProductWithModulesBySlug(product.slug)));
  const progressBySlug = await getUserModuleProgressByProducts(
    user.id,
    fullProducts.filter(Boolean) as NonNullable<(typeof fullProducts)[number]>[]
  );
  const unlockedValue = products.reduce((sum, product) => sum + product.price_cents, 0);
  const remainingProducts = Math.max(activeProducts.length - products.length, 0);
  const featuredOwned = products[0] ?? null;

  return (
    <div className="grid gap-8">
      <AnimatedSection className="grid gap-5">
        <GlowCard className="dashboard-luxury-hero p-6 md:p-8" glowColor="indigo">
          <div className="dashboard-luxury-hero-copy">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary">Mes formations</Badge>
              <Badge variant={products.length ? "success" : "muted"}>
                {products.length ? "Accès complet" : "Aucun accès actif"}
              </Badge>
            </div>
            <div className="grid gap-3">
              <h1 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-4xl leading-tight tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
                Tout ce que tu as débloqué
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
                Une vue complète de tes accès actifs, pensée pour reprendre vite un contenu, suivre ta progression et garder une lecture claire dans l&apos;espace membre.
              </p>
            </div>
            <div className="dashboard-hero-metrics">
              <div className="metric-pill">
                <strong>{products.length}</strong>
                <span>formations déjà ouvertes</span>
              </div>
              <div className="metric-pill">
                <strong>{remainingProducts}</strong>
                <span>formations encore disponibles au catalogue</span>
              </div>
              <div className="metric-pill">
                <strong>{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(unlockedValue / 100)}</strong>
                <span>valeur membre déjà débloquée</span>
              </div>
            </div>
          </div>
          <div className="dashboard-luxury-hero-side">
            <div className="offer-highlight-grid">
              <div className="offer-highlight-card">
                <h3>Reprendre vite</h3>
                <p>Chaque carte affiche la progression et mène directement au bon espace membre.</p>
              </div>
              <div className="offer-highlight-card">
                <h3>Lecture claire</h3>
                <p>Les formations actives et les options restantes sont séparées sans confusion.</p>
              </div>
              <div className="offer-highlight-card">
                <h3>Suite logique</h3>
                <p>Le catalogue reste accessible sans casser l&apos;impression premium du parcours membre.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard" className={buttonClasses("ghost", "sm")}>
                Retour au tableau de bord
              </Link>
              <Link href="/formations" className={buttonClasses("secondary", "sm")}>
                Voir le catalogue
              </Link>
            </div>
          </div>
        </GlowCard>
      </AnimatedSection>

      {featuredOwned ? (
        <AnimatedSection delay={50}>
          <GlowCard className="dashboard-spotlight p-8" glowColor="indigo">
            <div className="dashboard-spotlight-copy">
              <Badge variant="success" className="w-fit">
                Reprendre maintenant
              </Badge>
              <div className="grid gap-3">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  Continue là où tu t&apos;étais arrêté
                </h2>
                <p className="text-base leading-8 text-[var(--muted)]">
                  {featuredOwned.title} est la formation la plus récente dans ton espace membre.
                </p>
              </div>
              <div className="confidence-list">
                <div className="confidence-item">
                  <span className="confidence-dot" />
                  <div>
                    <strong>Progression suivie</strong>
                    <p>Tu gardes un repère clair sur ce qui est vu, à reprendre ou à terminer.</p>
                  </div>
                </div>
                <div className="confidence-item">
                  <span className="confidence-dot" />
                  <div>
                    <strong>Accès direct</strong>
                    <p>Tu arrives immédiatement sur le bon module, sans repasser par le catalogue.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-spotlight-card">
              <MemberProductCard
                product={featuredOwned}
                isOwned={true}
                progress={progressBySlug[featuredOwned.slug]}
              />
            </div>
          </GlowCard>
        </AnimatedSection>
      ) : null}

      <AnimatedSection delay={80} className="grid gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid gap-2">
            <Badge variant="success">Mes formations débloquées</Badge>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
              {products.length ? "Toutes tes formations actives" : "Aucune formation débloquée pour l'instant"}
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
              {products.length
                ? "Chaque carte mène directement à l'espace membre dédié, avec la progression visible au premier regard."
                : "Explore le catalogue et achète une première formation pour accéder à ton espace membre dédié."}
            </p>
          </div>
          {products.length > 0 ? (
            <Link href="/formations" className={buttonClasses("ghost", "sm")}>
              Voir le catalogue
            </Link>
          ) : null}
        </div>

        {products.length ? (
          <div className="grid gap-5 xl:grid-cols-2">
            {products.map((product) => (
              <MemberProductCard
                key={product.id}
                product={product}
                isOwned={true}
                purchaseDate={"purchase" in product && product.purchase ? product.purchase.created_at : null}
                progress={progressBySlug[product.slug]}
              />
            ))}
          </div>
        ) : (
          <GlowCard className="grid gap-5 p-8 text-center">
            <div className="grid gap-3">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                Aucune formation achetée
              </h3>
              <p className="mx-auto max-w-xl text-base leading-8 text-[var(--muted)]">
                Le catalogue contient des formations pensées pour être directement vendables. Choisis celle qui correspond le mieux à ton projet.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/formations" className={buttonClasses("primary", "md")}>
                Explorer le catalogue
              </Link>
              <Link href="/dashboard" className={buttonClasses("secondary", "md")}>
                Retour au tableau de bord
              </Link>
            </div>
          </GlowCard>
        )}
      </AnimatedSection>
    </div>
  );
}
