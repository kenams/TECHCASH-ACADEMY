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
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Montant catalogue actuellement accessible dans ton espace.</p>
          </GlowCard>
        </div>
      </AnimatedSection>

      {featuredOwned ? (
        <AnimatedSection delay={40}>
          <GlowCard className="dashboard-spotlight p-8" glowColor="emerald">
            <div className="dashboard-spotlight-copy">
              <Badge variant="success" className="w-fit">Formation à reprendre</Badge>
              <div className="grid gap-3">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  Remets-toi vite dans le bon module
                </h2>
                <p className="text-base leading-8 text-[var(--muted)]">
                  {featuredOwned.title} est prête à être reprise immédiatement, avec son espace membre, ses modules publiés et son accès déjà actif.
                </p>
              </div>
              <div className="confidence-list">
                <div className="confidence-item">
                  <span className="confidence-dot" />
                  <div>
                    <strong>Moins de friction</strong>
                    <p>Tu repars depuis le bon produit sans repasser par le catalogue ni relire toute la structure.</p>
                  </div>
                </div>
                <div className="confidence-item">
                  <span className="confidence-dot" />
                  <div>
                    <strong>Accès consolidé</strong>
                    <p>Le compte, le contenu et la page privée restent alignés dans le même parcours membre.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-spotlight-card">
              <MemberProductCard
                product={featuredOwned}
                isOwned
                purchaseDate={"purchase" in featuredOwned ? featuredOwned.purchase?.created_at || null : null}
              />
            </div>
          </GlowCard>
        </AnimatedSection>
      ) : null}

      <AnimatedSection delay={80} className="grid gap-5">
        {products.length ? (
          <>
            <div className="grid gap-2">
              <Badge variant="success">Accès complet</Badge>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">Formations prêtes à être consultées</h2>
              <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">Chaque carte te donne un accès direct au bon contenu, dans un espace membre plus clair et plus cohérent.</p>
            </div>
            <div className="grid gap-5 xl:grid-cols-2">
              {products.map((product) => (
                <MemberProductCard
                  key={product.id}
                  product={product}
                  isOwned
                  purchaseDate={"purchase" in product ? product.purchase?.created_at || null : null}
                />
              ))}
            </div>
          </>
        ) : (
          <GlowCard className="grid gap-5 p-8 text-center">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-white/5 text-2xl">
              ✦
            </div>
            <div className="grid gap-2">
              <h3 className="text-2xl font-semibold text-[var(--foreground)]">Aucune formation débloquée</h3>
              <p className="text-base leading-8 text-[var(--muted)]">Ton espace membre est prêt. Choisis une première formation pour commencer dans un cadre clair, premium et immédiatement exploitable.</p>
            </div>
            <div className="flex justify-center">
              <Link href="/formations" className={buttonClasses("primary", "md")}>
                Voir le catalogue
              </Link>
            </div>
          </GlowCard>
        )}
      </AnimatedSection>
    </div>
  );
}
