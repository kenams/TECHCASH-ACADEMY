import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { PublicFooter } from "@/components/public-footer";
import { ProductCard } from "@/components/product-card";
import { ProductHero } from "@/components/product-hero";
import { ProductModulesList } from "@/components/product-modules-list";
import { getProductSupplement, getRelatedLocalProducts } from "@/lib/catalog";
import { getOwnedProducts, getProductWithModulesBySlug } from "@/lib/products";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductWithModulesBySlug(slug);

  if (!product) {
    return {
      title: "Formation introuvable | TechCash Academy"
    };
  }

  return {
    title: `${product.title} | TechCash Academy`,
    description: product.short_description,
    alternates: {
      canonical: getAbsoluteUrl(`/formations/${product.slug}`)
    },
    openGraph: {
      title: `${product.title} | TechCash Academy`,
      description: product.short_description,
      url: getAbsoluteUrl(`/formations/${product.slug}`)
    }
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductWithModulesBySlug(slug);

  if (!product) {
    notFound();
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const [profile, ownedProducts] = user
    ? await Promise.all([getUserProfile(user.id, supabase), getOwnedProducts(user.id)])
    : [null, []];
  const isOwned = Boolean(profile?.is_premium) || ownedProducts.some((entry) => entry.slug === product.slug);
  const supplement = getProductSupplement(product.slug);
  const relatedProducts = getRelatedLocalProducts(product.slug, 2);
  const publishedModules = product.modules.filter((module) => module.is_published).length;
  const comingSoonModules = product.modules.filter((module) => module.content_type === "coming_soon").length;
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: product.title,
    description: product.long_description,
    provider: {
      "@type": "Organization",
      name: siteConfig.legalEntity,
      url: siteConfig.siteUrl
    },
    offers: {
      "@type": "Offer",
      price: (product.price_cents / 100).toFixed(2),
      priceCurrency: product.currency.toUpperCase(),
      availability: "https://schema.org/InStock",
      url: getAbsoluteUrl(`/formations/${product.slug}`)
    }
  };

  return (
    <main>
      <div className="shell">
        <Script
          id={`course-schema-${product.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
        <Navbar
          brand={siteConfig.brand}
          links={[{ href: "/formations", label: "Retour catalogue" }]}
          isLoggedIn={Boolean(user)}
        />

        <ProductHero
          product={product}
          isOwned={isOwned}
          detailHref={`/dashboard/formations/${product.slug}`}
        />

        <section className="section">
          <div className="product-stats-grid">
            <article className="card">
              <p className="helper">Modules publies</p>
              <h3>{publishedModules}</h3>
              <p>Du contenu deja disponible des l'achat pour avancer tout de suite.</p>
            </article>
            <article className="card">
              <p className="helper">Modules a venir</p>
              <h3>{comingSoonModules}</h3>
              <p>La feuille de route est visible des le depart pour donner une vision claire.</p>
            </article>
            <article className="card">
              <p className="helper">Acces membre</p>
              <h3>{isOwned ? "Actif" : "A debloquer"}</h3>
              <p>Chaque achat ouvre la page privee de cette formation dans le dashboard.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="hero-assurance-grid hero-assurance-grid-wide">
            <article className="assurance-item assurance-item-card">
              <span className="helper">Clarté</span>
              <strong>Le programme est lisible avant achat</strong>
              <p>Les modules disponibles et ceux à venir sont visibles dès la page détail.</p>
            </article>
            <article className="assurance-item assurance-item-card">
              <span className="helper">Confiance</span>
              <strong>Vous achetez un accès structuré, pas une promesse floue</strong>
              <p>Le contenu est organisé pour être consulté, utilisé et réexploité rapidement.</p>
            </article>
            <article className="assurance-item assurance-item-card">
              <span className="helper">Continuité</span>
              <strong>Le dashboard retrouve exactement ce que vous possédez</strong>
              <p>Chaque achat alimente l’espace membre sans ambiguïté.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Ce que tu trouveras dans la formation</h2>
            <p>
              Les modules deja publies sont accessibles immediatement apres achat. Les blocs
              signales comme bientot disponibles apparaissent deja dans la feuille de route.
            </p>
          </div>
          <ProductModulesList modules={product.modules} />
        </section>

        <section className="section">
          <div className="grid-2">
            <article className="card">
              <h3>Ce que cette formation aide a vendre</h3>
              <p>{product.short_description}</p>
              {supplement?.outcomes?.length ? (
                <ul className="bullet-list compact-list">
                  {supplement.outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
            <article className="card">
              <h3>Logique d'acces</h3>
              <p>
                L'achat debloque uniquement cette formation, sauf si tu disposes plus tard d'un
                acces premium global. Le dashboard affichera clairement ce que tu possedes.
              </p>
            </article>
          </div>
        </section>

        {supplement?.bestFor?.length ? (
          <section className="section">
            <div className="grid-2">
              <article className="card">
                <h3>Pour qui cette formation est la plus utile</h3>
                <ul className="bullet-list compact-list">
                  {supplement.bestFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="card">
                <h3>Formats inclus</h3>
                <ul className="bullet-list compact-list">
                  <li>contenu texte structurant pour poser la logique</li>
                  <li>PDF pour cadrer ou executer rapidement</li>
                  <li>ressources telechargeables reutilisables</li>
                  <li>modules bientot disponibles deja visibles dans la roadmap</li>
                </ul>
              </article>
            </div>
          </section>
        ) : null}

        {relatedProducts.length ? (
          <section className="section">
            <div className="section-title">
              <h2>Autres formations utiles</h2>
              <p>Si cette offre te parle, ces autres formations peuvent etendre ton catalogue de services.</p>
            </div>
            <div className="product-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  isOwned={Boolean(profile?.is_premium) || ownedProducts.some((entry) => entry.slug === relatedProduct.slug)}
                />
              ))}
            </div>
          </section>
        ) : null}

        <PublicFooter />
      </div>
    </main>
  );
}
