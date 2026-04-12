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
import { siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";

export const metadata: Metadata = {
  title: "Dashboard membre | TechCash Academy",
  description: "Retrouve tes formations achetées, tes accès actifs et le catalogue disponible."
};

type DashboardPageProps = {
  searchParams: Promise<{
    product?: string;
  }>;
};

function getGreeting(email: string) {
  const hour = new Date().getHours();
  const name = email.split("@")[0] || email;

  if (hour < 12) return `Bonjour ${name} 👋`;
  if (hour < 18) return `Bon après-midi ${name} 👋`;
  return `Bonsoir ${name} 👋`;
}

function getFocusLine(accessibleCount: number, discoverCount: number) {
  if (accessibleCount === 0) {
    return "Ton espace est prêt. Il ne manque qu’une première formation pour ouvrir un vrai parcours membre.";
  }
  if (discoverCount === 0) {
    return "Tout le catalogue visible est déjà aligné avec ton compte. Le cadre membre est complet et cohérent.";
  }
  return "Tu peux reprendre tes contenus actifs et ouvrir ensuite la prochaine formation la plus logique, sans dispersion.";
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedProduct = resolvedSearchParams.product?.trim();

  if (requestedProduct) {
    redirect(`/checkout?product=${encodeURIComponent(requestedProduct)}`);
  }

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
  const accessibleProducts = hasGlobalAccess
    ? activeProducts.map((product) => ({ ...product, purchase: null, has_access: true }))
    : ownedProducts;
  const ownedSlugs = new Set(accessibleProducts.map((product) => product.slug));
  const discoverProducts = activeProducts.filter((product) => !ownedSlugs.has(product.slug)).slice(0, 3);
  const totalValue = accessibleProducts.reduce((sum, product) => sum + product.price_cents, 0);
  const spotlightProduct = accessibleProducts[0] ?? discoverProducts[0] ?? null;
  const focusLine = getFocusLine(accessibleProducts.length, discoverProducts.length);

  const accessibleWithModules = await Promise.all(
    accessibleProducts.map((product) => getProductWithModulesBySlug(product.slug))
  );
  const progressBySlug = await getUserModuleProgressByProducts(
    user.id,
    accessibleWithModules.filter(Boolean) as NonNullable<(typeof accessibleWithModules)[number]>[]
  );
  const continueProduct =
    accessibleProducts
      .map((product) => ({
        product,
        progress: progressBySlug[product.slug]
      }))
      .filter((entry) => entry.progress && entry.progress.totalModules > 0)
      .sort((a, b) => {
        const aTime = a.progress?.lastCompletedAt ? new Date(a.progress.lastCompletedAt).getTime() : 0;
        const bTime = b.progress?.lastCompletedAt ? new Date(b.progress.lastCompletedAt).getTime() : 0;
        return bTime - aTime;
      })[0] ?? null;

  return (
    <div className="grid gap-8">
      <AnimatedSection className="grid gap-6">
        <GlowCard className="dashboard-luxury-hero p-6 md:p-8" glowColor="indigo">
          <div className="dashboard-luxury-hero-copy">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary">Espace membre</Badge>
              <Badge variant={accessibleProducts.length ? "success" : "muted"}>
                {accessibleProducts.length ? "Contenus actifs" : "Compte prêt"}
              </Badge>
            </div>
            <div className="grid gap-3">
              <h1 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-4xl leading-tight tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
                {getGreeting(profile?.email || user.email || "")}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
                Un tableau de bord plus net pour reprendre tes formations, suivre ta progression et voir la suite la plus rentable sans friction.
              </p>
            </div>
            <div className="dashboard-hero-metrics">
              <div className="metric-pill">
                <strong>{accessibleProducts.length}</strong>
                <span>formations actives dans ton espace</span>
              </div>
              <div className="metric-pill">
                <strong>{discoverProducts.length}</strong>
                <span>offres complémentaires prêtes à ouvrir</span>
              </div>
              <div className="metric-pill">
                <strong>{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(totalValue / 100)}</strong>
                <span>valeur déjà disponible côté membre</span>
              </div>
            </div>
            <div className="luxury-note">
              <strong>Focus du moment</strong>
              <span>{focusLine}</span>
            </div>
          </div>
          <div className="dashboard-luxury-hero-side">
            <div className="offer-highlight-grid">
              <div className="offer-highlight-card">
                <h3>Lecture immédiate</h3>
                <p>Tu vois en un coup d’œil ce que tu possèdes et la prochaine formation à ouvrir.</p>
              </div>
              <div className="offer-highlight-card">
                <h3>Progression suivie</h3>
                <p>Chaque formation affiche désormais un repère clair entre modules vus et modules restants.</p>
              </div>
              <div className="offer-highlight-card">
                <h3>Cadre premium</h3>
                <p>Le rendu membre reste dense, rassurant et cohérent avec une academy vendable.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/formations" className={buttonClasses("secondary", "md")}>
                Explorer le catalogue
              </Link>
              <Link href="/dashboard/mes-formations" className={buttonClasses("primary", "md")}>
                Voir mes formations
              </Link>
            </div>
          </div>
        </GlowCard>
      </AnimatedSection>

      {continueProduct ? (
        <AnimatedSection delay={40}>
          <GlowCard className="dashboard-spotlight p-8" glowColor="indigo">
            <div className="dashboard-spotlight-copy">
              <Badge variant="success" className="w-fit">
                Continuer l&apos;apprentissage
              </Badge>
              <div className="grid gap-3">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  Reprends là où ta progression est la plus avancée
                </h2>
                <p className="text-base leading-8 text-[var(--muted)]">
                  {continueProduct.product.title} est la meilleure reprise actuelle pour continuer dans un cadre déjà engagé.
                </p>
              </div>
              <div className="course-progress-bar-shell">
                <div className="course-progress-bar-track">
                  <div className="course-progress-bar-fill" style={{ width: `${continueProduct.progress.percent}%` }} />
                </div>
                <span className="course-progress-label">
                  {continueProduct.progress.completedModules}/{continueProduct.progress.totalModules} modules vus
                </span>
              </div>
              <div className="confidence-list">
                <div className="confidence-item">
                  <span className="confidence-dot" />
                  <div>
                    <strong>Prochaine étape</strong>
                    <p>{continueProduct.progress.nextModuleTitle ?? "Parcours terminé sur cette formation."}</p>
                  </div>
                </div>
                <div className="confidence-item">
                  <span className="confidence-dot" />
                  <div>
                    <strong>Action directe</strong>
                    <p>Un clic te renvoie vers la page membre puis vers le module suivant sans détour.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={
                    continueProduct.progress.nextModuleSlug
                      ? `/dashboard/formations/${continueProduct.product.slug}#module-${continueProduct.progress.nextModuleSlug}`
                      : `/dashboard/formations/${continueProduct.product.slug}`
                  }
                  className={buttonClasses("primary", "md")}
                >
                  Reprendre maintenant
                </Link>
              </div>
            </div>
            <div className="dashboard-spotlight-card">
              <MemberProductCard
                product={continueProduct.product}
                isOwned
                progress={continueProduct.progress}
              />
            </div>
          </GlowCard>
        </AnimatedSection>
      ) : null}

      {spotlightProduct ? (
        <AnimatedSection delay={60}>
          <GlowCard className="dashboard-spotlight p-8" glowColor="indigo">
            <div className="dashboard-spotlight-copy">
              <Badge variant={accessibleProducts.length ? "success" : "muted"} className="w-fit">
                {accessibleProducts.length ? "Accès recommandé" : "Point d’entrée conseillé"}
              </Badge>
              <div className="grid gap-3">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {accessibleProducts.length ? "Reprends ton contenu le plus stratégique" : "Choisis ton premier produit le plus rentable"}
                </h2>
                <p className="text-base leading-8 text-[var(--muted)]">
                  {spotlightProduct.title} reste une excellente porte d’entrée pour garder un parcours simple, sérieux et orienté résultat.
                </p>
              </div>
            </div>
            <div className="dashboard-spotlight-card">
              <MemberProductCard
                product={spotlightProduct}
                isOwned={ownedSlugs.has(spotlightProduct.slug)}
                progress={progressBySlug[spotlightProduct.slug]}
              />
            </div>
          </GlowCard>
        </AnimatedSection>
      ) : null}

      <AnimatedSection delay={80} className="grid gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid gap-2">
            <Badge variant="success">Mes formations achetées</Badge>
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">Continue là où tu t&apos;étais arrêté</h2>
              <p className="mt-2 max-w-3xl text-base leading-8 text-[var(--muted)]">
                Accède à tes contenus, reprends un module ou ouvre directement ton espace membre dédié sans repasser par le catalogue.
              </p>
            </div>
          </div>
          {accessibleProducts.length ? (
            <Link href="/dashboard/mes-formations" className={buttonClasses("ghost", "sm")}>
              Tout voir
            </Link>
          ) : null}
        </div>

        {accessibleProducts.length ? (
          <div className="grid gap-5 xl:grid-cols-2">
            {accessibleProducts.slice(0, 4).map((product) => (
              <MemberProductCard
                key={product.id}
                product={product}
                isOwned
                purchaseDate={"purchase" in product ? product.purchase?.created_at || null : null}
                progress={progressBySlug[product.slug]}
              />
            ))}
          </div>
        ) : (
          <GlowCard className="grid gap-5 p-8 text-center">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-white/5 text-2xl">
              ✦
            </div>
            <div className="grid gap-2">
              <h3 className="text-2xl font-semibold text-[var(--foreground)]">Aucune formation achetée</h3>
              <p className="text-base leading-8 text-[var(--muted)]">
                Ton compte est prêt. Choisis une première formation pour débloquer un espace membre complet et commencer dans un cadre propre.
              </p>
            </div>
            <div className="flex justify-center">
              <Link href={`/checkout?product=${siteConfig.primaryProductSlug}`} className={buttonClasses("primary", "md")}>
                Commencer maintenant
              </Link>
            </div>
          </GlowCard>
        )}
      </AnimatedSection>

      <AnimatedSection delay={160} className="grid gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid gap-2">
            <Badge variant="muted">Découvrir d'autres formations</Badge>
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">Étends ton catalogue de compétences</h2>
              <p className="mt-2 max-w-3xl text-base leading-8 text-[var(--muted)]">
                Une sélection courte des offres non encore achetées, pour accélérer la suite sans te disperser.
              </p>
            </div>
          </div>
          <Link href="/formations" className={buttonClasses("secondary", "sm")}>
            Voir tout le catalogue
          </Link>
        </div>

        {discoverProducts.length ? (
          <div className="grid gap-5 xl:grid-cols-3">
            {discoverProducts.map((product) => (
              <MemberProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <GlowCard className="grid gap-3 p-8">
            <h3 className="text-2xl font-semibold text-[var(--foreground)]">Tout est déjà débloqué</h3>
            <p className="text-base leading-8 text-[var(--muted)]">Ton compte a déjà accès à tout le catalogue actuellement actif.</p>
          </GlowCard>
        )}
      </AnimatedSection>
    </div>
  );
}
