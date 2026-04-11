import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { buttonClasses } from "@/components/ui/Button";
import { MemberProductCard } from "@/components/member-product-card";
import { getActiveProducts, getOwnedProducts } from "@/lib/products";
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
                Une vue complète de tes accès actifs, pensée pour reprendre vite un contenu, garder une lecture claire et éviter toute friction dans l’espace membre.
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
            <div className="luxury-note">
              <strong>Rituel recommandé</strong>
              <span>
                Reprends d’abord un contenu déjà acheté, termine-le proprement, puis ouvre seulement la prochaine offre qui renforce ton positionnement.
              </span>
            </div>
          </div>
          <div className="dashboard-luxury-hero-side">
            <div className="offer-highlight-grid">
              <div className="offer-highlight-card">
                <h3>Accès direct</h3>
                <p>Chaque carte mène au bon contenu sans détour et garde la logique membre intacte.</p>
              </div>
              <div className="offer-highlight-card">
                <h3>Lecture propre</h3>
                <p>Les formations actives et les options restantes sont clairement séparées pour éviter toute confusion.</p>
              </div>
              <div className="offer-highlight-card">
                <h3>Suite maîtrisée</h3>
                <p>Le catalogue reste accessible sans casser l’impression premium du parcours déjà débloqué.</p>
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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <GlowCard>
            <p className="text-sm text-[var(--muted)]">Formations débloquées</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">{products.length}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Uniquement les accès disponibles sur ton compte aujourd'hui.</p>
          </GlowCard>
          <GlowCard>
            <p className="text-sm text-[var(--muted)]">Catalogue à explorer</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">{remainingProducts}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Des offres complémentaires restent disponibles si tu veux élargir ton positionnement.</p>
          </GlowCard>
          <GlowCard glowColor="emerald">
            <p className="text-sm text-[var(--muted)]">Statut d'accès</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">{hasGlobalAccess ? "Global" : "Par produit"}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{hasGlobalAccess ? "Toutes les formations actives sont ouvertes." : "Chaque achat débloque son espace membre dédié."}</p>
          </GlowCard>
          <GlowCard>
            <p className="text-sm text-[var(--muted)]">Valeur débloquée</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
              {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(unlockedValue / 100)}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Montant catalogue total déjà disponible dans ton espace membre.</p>
          </GlowCard>
        </div>
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
                  Continue là où tu t'étais arrêté
                </h2>
                <p className="text-base leading-8 text-[var(--muted)]">
                  {featuredOwned.title} est la formation la plus récemment débloquée dans ton espace.
                </p>
              </div>
              <div className="confidence-list">
                <div className="confidence-item">
                  <span className="confidence-dot" />
                  <div>
                    <strong>Accès direct</strong>
                    <p>Tu arrives immédiatement sur les modules disponibles, sans passer par le catalogue.</p>
                  </div>
                </div>
                <div className="confidence-item">
                  <span className="confidence-dot" />
                  <div>
                    <strong>Contenu actif</strong>
                    <p>Les modules publiés sont disponibles dès maintenant, sans délai supplémentaire.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-spotlight-card">
              <MemberProductCard product={featuredOwned} isOwned={true} />
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
                ? "Chaque carte mène directement à l'espace membre dédié de la formation, sans passer par le catalogue."
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

      {remainingProducts > 0 ? (
        <AnimatedSection delay={140}>
          <GlowCard className="p-8" glowColor="indigo">
            <div className="grid gap-4 sm:flex sm:items-center sm:justify-between">
              <div className="grid gap-2">
                <Badge variant="muted">Aller plus loin</Badge>
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {remainingProducts} formation{remainingProducts > 1 ? "s" : ""} encore disponible{remainingProducts > 1 ? "s" : ""} au catalogue
                </h2>
                <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                  Tu peux compléter ton catalogue de compétences et élargir ton positionnement en ajoutant une nouvelle formation.
                </p>
              </div>
              <Link href="/formations" className={buttonClasses("secondary", "md")}>
                Voir le catalogue
              </Link>
            </div>
          </GlowCard>
        </AnimatedSection>
      ) : null}
    </div>
  );
}
