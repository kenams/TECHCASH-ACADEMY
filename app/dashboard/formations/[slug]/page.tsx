import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ContentRenderer } from "@/components/content-renderer";
import { MemberProductCard } from "@/components/member-product-card";
import { ProductHero } from "@/components/product-hero";
import { ProductModulesList } from "@/components/product-modules-list";
import { getProductSupplement, getRelatedLocalProducts } from "@/lib/catalog";
import { getActiveProducts, getOwnedProducts, getProductWithModulesBySlug } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { userHasProductAccess } from "@/lib/access";

type MemberProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: MemberProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductWithModulesBySlug(slug);

  if (!product) {
    return {
      title: "Formation introuvable | TechCash Academy"
    };
  }

  return {
    title: `${product.title} | Espace membre`,
    description: product.short_description
  };
}

export default async function MemberProductPage({ params }: MemberProductPageProps) {
  const { slug } = await params;
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const access = await userHasProductAccess(user.id, slug);

  if (!access.product) {
    notFound();
  }

  const product = await getProductWithModulesBySlug(access.product.slug);

  if (!product) {
    notFound();
  }

  const [ownedProducts, activeProducts] = await Promise.all([getOwnedProducts(user.id), getActiveProducts()]);
  const supplement = getProductSupplement(product.slug);
  const publishedModules = product.modules.filter((module) => module.is_published).length;
  const comingSoonModules = product.modules.filter((module) => module.content_type === "coming_soon").length;
  const directResources = product.modules.filter(
    (module) => module.content_type === "resource" || module.content_type === "pdf"
  ).length;
  const recommendedProducts = getRelatedLocalProducts(product.slug, 2).filter(
    (candidate) => !ownedProducts.some((owned) => owned.slug === candidate.slug)
  );

  if (!access.hasAccess) {
    return (
      <main>
        <div className="shell">
          <header className="topbar">
            <div className="brand">{siteConfig.brand}</div>
            <nav className="nav">
              <Link href="/formations" className="button-ghost">
                ← Catalogue
              </Link>
              <Link href="/dashboard" className="button-secondary">
                Dashboard
              </Link>
              <Link href={`/checkout?product=${product.slug}`} className="button">
                Acheter la formation
              </Link>
            </nav>
          </header>

          <ProductHero product={product} />

          <section className="section">
            <article className="card empty-state-card">
              <h3>Accès réservé aux membres</h3>
              <p>
                Ton compte existe bien, mais cette formation n'a pas encore été achetée. Tu peux
                consulter le détail public, puis passer au checkout si le sujet t'intéresse.
              </p>
              <div className="cta-row">
                <Link href={`/checkout?product=${product.slug}`} className="button">
                  Débloquer cette formation
                </Link>
                <Link href={`/formations/${product.slug}`} className="button-secondary">
                  Voir la version publique
                </Link>
              </div>
            </article>
          </section>

          <section className="section">
            <div className="section-title">
              <h2>Modules inclus</h2>
              <p>Voici la structure que tu débloqueras après achat.</p>
            </div>
            <ProductModulesList modules={product.modules} />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-frame">
      <section className="dashboard-hero">
        <div className="max-w-3xl">
          <div className="eyebrow">Formation débloquée</div>
          <h1>{product.title}</h1>
          <p className="lead">{product.long_description}</p>
        </div>
        <div className="cta-row">
          <Link href="/dashboard/mes-formations" className="button-secondary">
            Mes formations
          </Link>
          <Link href={`/formations/${product.slug}`} className="button-ghost">
            ← Page publique
          </Link>
          <Link href="/dashboard" className="button-ghost">
            Dashboard
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
          <Link href={`/dashboard/formations/${product.slug}`} className="dashboard-nav-link dashboard-nav-link-active">
            Formation ouverte
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="member-stats-grid">
          <article className="card">
            <p className="helper">Modules publiés</p>
            <h2>{publishedModules}</h2>
            <p>Des ressources déjà accessibles dans l'espace membre.</p>
          </article>
          <article className="card">
            <p className="helper">Ressources directes</p>
            <h2>{directResources}</h2>
            <p>PDF et ressources téléchargeables disponibles immédiatement.</p>
          </article>
          <article className="card">
            <p className="helper">Bientôt disponible</p>
            <h2>{comingSoonModules}</h2>
            <p>La roadmap est visible, même quand tout n'est pas encore publié.</p>
          </article>
          <article className="card">
            <p className="helper">Positionnement</p>
            <h2>{product.is_featured ? "Principal" : "Spécialisé"}</h2>
            <p>Cette formation s'intègre dans un catalogue plus large d'offres monétisables.</p>
          </article>
        </div>
      </section>

      {supplement ? (
        <section className="section">
          <div className="dashboard-spotlight">
            <div className="dashboard-spotlight-copy">
              <div className="eyebrow">Ce que tu vas vraiment en tirer</div>
              <h2>{supplement.pitch}</h2>
              <ul className="bullet-list">
                {supplement.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <aside className="card dashboard-spotlight-card">
              <p className="helper">Pour qui ce module est idéal</p>
              <ul className="list">
                {supplement.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="section-title">
          <h2>Modules et contenus</h2>
          <p>
            Le contenu peut mélanger texte, PDF, ressources et modules à venir, sans attendre que
            toute la production vidéo soit terminée.
          </p>
        </div>
        <div className="content-stack">
          {product.modules.map((module) => (
            <ContentRenderer key={module.id} module={module} />
          ))}
        </div>
      </section>

      {recommendedProducts.length ? (
        <section className="section">
          <div className="section-title">
            <h2>Aller plus loin</h2>
            <p>Ces formations complètent bien ce que tu es déjà en train de débloquer.</p>
          </div>
          <div className="product-grid">
            {recommendedProducts.map((candidate) => (
              <MemberProductCard key={candidate.id} product={candidate} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
