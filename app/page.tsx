import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { PublicFooter } from "@/components/public-footer";
import { ProductCard } from "@/components/product-card";
import { ProductHero } from "@/components/product-hero";
import { getActiveProducts, getFeaturedProduct, getOwnedProducts, getProductBySlug } from "@/lib/products";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";

export const metadata: Metadata = {
  title: "TechCash Academy | Formations digitales rentables",
  description:
    "Catalogue de formations pour lancer une activite digitale rentable : freelance IT, landing pages, sites web clients, outils PME et applications mobiles.",
  alternates: {
    canonical: getAbsoluteUrl("/")
  },
  openGraph: {
    title: "TechCash Academy | Formations digitales rentables",
    description:
      "Catalogue de formations pour lancer une activite digitale rentable : freelance IT, landing pages, sites web clients, outils PME et applications mobiles.",
    url: getAbsoluteUrl("/")
  }
};

export default async function LandingPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const [profile, products, featuredCard, ownedProducts] = await Promise.all([
    user ? getUserProfile(user.id, supabase) : Promise.resolve(null),
    getActiveProducts(),
    getFeaturedProduct(),
    user ? getOwnedProducts(user.id) : Promise.resolve([])
  ]);

  const featured =
    (featuredCard && (await getProductBySlug(featuredCard.slug))) ||
    (products[0] ? await getProductBySlug(products[0].slug) : null);
  const ownedProductSlugs = new Set(ownedProducts.map((product) => product.slug));
  const hasGlobalAccess = Boolean(profile?.is_premium);
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brand,
    url: siteConfig.siteUrl,
    description: siteConfig.description
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalEntity,
    url: siteConfig.siteUrl,
    email: siteConfig.supportEmail
  };
  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catalogue des formations TechCash Academy",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getAbsoluteUrl(`/formations/${product.slug}`),
      name: product.title
    }))
  };

  return (
    <main>
      <div className="shell">
        <Script
          id="homepage-website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="homepage-organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="homepage-product-list-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
        />
        <header className="topbar">
          <div className="brand">{siteConfig.brand}</div>
          <nav className="nav">
            <Link href="/formations" className="button-ghost">
              Formations
            </Link>
            {user ? (
              <Link href="/dashboard" className="button">
                Mon espace
              </Link>
            ) : (
              <>
                <Link href="/login" className="button-ghost">
                  Connexion
                </Link>
                <Link href={`/checkout?product=${siteConfig.primaryProductSlug}`} className="button">
                  Commencer
                </Link>
              </>
            )}
          </nav>
        </header>

        <section className="hero hero-catalog">
          <div className="stack">
            <div className="eyebrow">Formations digitales sobres, concretes et vendables</div>
            <h1>{siteConfig.headline}</h1>
            <p className="lead">
              Apprends a vendre des prestations digitales utiles, structurer une activite propre et
              livrer avec des process simples. Pas de discours miracle, seulement des offres que tu
              peux proposer a de vrais clients.
            </p>
            <div className="cta-row">
              <Link href="/formations" className="button">
                Voir le catalogue
              </Link>
              <Link href={user ? "/dashboard" : "/register"} className="button-secondary">
                {user ? "Acceder a mon espace" : "Creer un compte"}
              </Link>
            </div>
            <ul className="bullet-list">
              {siteConfig.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <div className="trust-row">
              {siteConfig.trustPoints.map((point) => (
                <span key={point} className="trust-pill">
                  {point}
                </span>
              ))}
            </div>
          </div>

          <aside className="panel hero-side-panel">
            <p className="helper">Offre principale</p>
            {featured ? (
              <div className="stack">
                <h2>{featured.title}</h2>
                <p>{featured.short_description}</p>
                <div className="cta-row">
                  <Link href={`/formations/${featured.slug}`} className="button-secondary">
                    Voir le detail
                  </Link>
                  <Link href={`/checkout?product=${featured.slug}`} className="button">
                    Acheter
                  </Link>
                </div>
              </div>
            ) : (
              <p>Aucune formation active pour le moment.</p>
            )}
          </aside>
        </section>

        {featured ? (
          <ProductHero product={featured} isOwned={hasGlobalAccess || ownedProductSlugs.has(featured.slug)} />
        ) : null}

        <section className="section">
          <div className="section-title">
            <h2>Catalogue des formations</h2>
            <p>
              Un catalogue structure autour d'offres simples a vendre : support IT, landing pages,
              sites clients, outils metier et applications mobiles monetisables.
            </p>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isOwned={hasGlobalAccess || ownedProductSlugs.has(product.slug)}
              />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Pour qui</h2>
            <p>Des formations faites pour des profils qui veulent vendre vite, livrer proprement et progresser sans perdre de temps.</p>
          </div>
          <div className="grid-2">
            {siteConfig.audiences.map((audience) => (
              <article className="card" key={audience}>
                <h3>{audience}</h3>
                <p>
                  Le contenu reste praticable, meme si tu n'as pas encore construit une activite
                  ou un gros portefeuille client.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Pourquoi la plateforme est utile</h2>
            <p>Tu peux publier, vendre et consommer du contenu meme si toutes les videos ne sont pas encore tournees.</p>
          </div>
          <div className="grid-3">
            <article className="card">
              <h3>Formats flexibles</h3>
              <p>PDF, texte, ressources, liens video externes et modules bientot disponibles sont tous pris en charge.</p>
            </article>
            <article className="card">
              <h3>Acces par produit</h3>
              <p>Chaque achat debloque une formation precise. Le dashboard sait exactement ce que le membre possede.</p>
            </article>
            <article className="card">
              <h3>Base solide pour la suite</h3>
              <p>Le tunnel de vente, Supabase, Stripe et le dashboard sont deja prets pour evoluer sans replatforming.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Questions frequentes</h2>
            <p>Le positionnement reste simple : apprendre a vendre des competences digitales utiles, sans theatre marketing.</p>
          </div>
          <div className="faq-list">
            {siteConfig.faq.map((entry) => (
              <article className="card" key={entry.question}>
                <h3>{entry.question}</h3>
                <p>{entry.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="panel">
            <div className="section-title">
              <h2>Prendre une formation, puis evoluer</h2>
              <p>
                Commence par l'offre principale ou choisis directement le sujet qui colle a ton
                activite. Le catalogue est concu pour permettre plusieurs achats successifs.
              </p>
            </div>
            <div className="cta-row">
              <Link href="/formations" className="button">
                Explorer les formations
              </Link>
              <Link href={user ? "/dashboard/mes-formations" : "/register"} className="button-secondary">
                {user ? "Voir mes formations" : "Creer mon acces"}
              </Link>
            </div>
          </div>
        </section>

        <PublicFooter />
      </div>
    </main>
  );
}
