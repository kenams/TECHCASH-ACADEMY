import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { buttonClasses } from "@/components/ui/Button";
import { MemberProductCard } from "@/components/member-product-card";
import { getActiveProducts, getOwnedProducts } from "@/lib/products";
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

  return (
    <div className="grid gap-8">
      <AnimatedSection className="grid gap-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="grid gap-3">
            <Badge variant="primary">Espace membre</Badge>
            <div className="grid gap-3">
              <h1 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-4xl leading-tight tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
                {getGreeting(profile?.email || user.email || "")}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
                Tu retrouves ici tes formations achetées, ce qui reste à débloquer et la suite logique pour faire monter ton catalogue en gamme sans friction.
              </p>
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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <GlowCard glowColor="indigo">
            <p className="text-sm text-[var(--muted)]">Formations accessibles</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">{accessibleProducts.length}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{hasGlobalAccess ? "Accès global actif sur tout le catalogue visible." : "Débloquées proprement via tes achats confirmés."}</p>
          </GlowCard>
          <GlowCard glowColor="indigo">
            <p className="text-sm text-[var(--muted)]">Catalogue actif</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">{activeProducts.length}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Des offres visibles, vendables et déjà prêtes à être consommées côté membre.</p>
          </GlowCard>
          <GlowCard glowColor="emerald">
            <p className="text-sm text-[var(--muted)]">Statut du compte</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">{hasGlobalAccess ? "Global" : "Par produit"}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">La logique d'accès reste stricte, lisible et cohérente avec ce que tu as réellement acheté.</p>
          </GlowCard>
          <GlowCard glowColor="indigo">
            <p className="text-sm text-[var(--muted)]">Valeur débloquée</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
              {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(totalValue / 100)}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Montant catalogue actuellement accessible dans ton espace membre.</p>
          </GlowCard>
        </div>
      </AnimatedSection>

      {spotlightProduct ? (
        <AnimatedSection delay={50}>
          <GlowCard className="dashboard-spotlight p-8" glowColor="indigo">
            <div className="dashboard-spotlight-copy">
              <Badge variant={accessibleProducts.length ? "success" : "muted"} className="w-fit">
                {accessibleProducts.length ? "Accès recommandé" : "Prochaine étape"}
              </Badge>
              <div className="grid gap-3">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {accessibleProducts.length ? "Reprends ton contenu le plus stratégique" : "Choisis ton point d'entrée le plus rentable"}
                </h2>
                <p className="text-base leading-8 text-[var(--muted)]">
                  {spotlightProduct.title} reste une excellente porte d'entrée pour garder un parcours simple, sérieux et orienté résultat.
                </p>
              </div>
              <div className="confidence-list">
                <div className="confidence-item">
                  <span className="confidence-dot" />
                  <div>
                    <strong>Vision claire</strong>
                    <p>Le dashboard t'aide à voir immédiatement ce que tu possèdes et ce qui mérite d'être ouvert ensuite.</p>
                  </div>
                </div>
                <div className="confidence-item">
                  <span className="confidence-dot" />
                  <div>
                    <strong>Suite logique</strong>
                    <p>Le catalogue suggère des prolongements cohérents au lieu de te noyer dans un choix sans hiérarchie.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-spotlight-card">
              <MemberProductCard product={spotlightProduct} isOwned={ownedSlugs.has(spotlightProduct.slug)} />
            </div>
          </GlowCard>
        </AnimatedSection>
      ) : null}

      <AnimatedSection delay={80} className="grid gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid gap-2">
            <Badge variant="success">Mes formations achetées</Badge>
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">Continue là où tu t'étais arrêté</h2>
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
              <p className="text-base leading-8 text-[var(--muted)]">Ton compte est prêt. Choisis une première formation pour débloquer un espace membre complet et commencer dans un cadre propre.</p>
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
              <p className="mt-2 max-w-3xl text-base leading-8 text-[var(--muted)]">Une sélection courte des offres non encore achetées, pour accélérer la suite sans te disperser.</p>
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
