import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Navbar } from "@/components/navbar";
import { PublicFooter } from "@/components/public-footer";
import { ProductCard } from "@/components/product-card";
import { getPriorityOfferSlugs } from "@/lib/catalog";
import { getActiveProducts, getFeaturedProduct, getOwnedProducts } from "@/lib/products";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";

export const metadata: Metadata = {
  title: "Catalogue des formations | TechCash Academy",
  description:
    "Découvre les formations TechCash Academy : freelance IT, landing pages, sites clients, outils PME et applications mobiles.",
  alternates: {
    canonical: getAbsoluteUrl("/formations")
  },
  openGraph: {
    title: "Catalogue des formations | TechCash Academy",
    description:
      "Découvre les formations TechCash Academy : freelance IT, landing pages, sites clients, outils PME et applications mobiles.",
    url: getAbsoluteUrl("/formations")
  }
};

export default async function FormationsPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const [profile, products, featured, owned] = await Promise.all([
    user ? getUserProfile(user.id, supabase) : Promise.resolve(null),
    getActiveProducts(),
    getFeaturedProduct(),
    user ? getOwnedProducts(user.id) : Promise.resolve([])
  ]);
  const ownedSlugs = new Set(owned.map((product) => product.slug));
  const hasGlobalAccess = Boolean(profile?.is_premium);
  const priorityOfferSlugs = new Set(getPriorityOfferSlugs());
  const priorityProducts = products.filter((product) => priorityOfferSlugs.has(product.slug));
  const catalogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Catalogue des formations TechCash Academy",
    url: getAbsoluteUrl("/formations"),
    hasPart: products.map((product) => ({
      "@type": "Course",
      name: product.title,
      description: product.short_description,
      url: getAbsoluteUrl(`/formations/${product.slug}`)
    }))
  };

  return (
    <main>
      <div className="shell">
        <Script
          id="formations-collection-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
        />

        <Navbar brand={siteConfig.brand} links={[{ href: "/", label: "Accueil" }]} isLoggedIn={Boolean(user)} />

        <section className="section section-first">
          <div className="section-title">
            <div className="eyebrow">Catalogue des formations</div>
            <h1>Choisis la compétence digitale la plus rentable pour ton contexte</h1>
            <p>
              Chaque formation correspond à une offre claire à vendre. Tu peux acheter une seule
              formation ou construire ton catalogue de compétences pas à pas.
            </p>
          </div>

          {featured ? (
            <div className="featured-strip featured-strip-luxury">
              <div>
                <p className="helper">Offre principale</p>
                <h2>{featured.title}</h2>
                <p>{featured.short_description}</p>
              </div>
              <div className="cta-row">
                <Link href={`/formations/${featured.slug}`} className="button-secondary">
                  Voir le détail
                </Link>
                <Link href={`/checkout?product=${featured.slug}`} className="button">
                  Acheter
                </Link>
              </div>
            </div>
          ) : null}
        </section>

        <section className="section">
          {priorityProducts.length ? (
            <div className="section-title">
              <div className="eyebrow">Priorités commerciales</div>
              <h2>Les offres à pousser en premier</h2>
              <p>
                Commence par <strong>Freelance IT 30 jours</strong>, puis pousse{" "}
                <strong>Maintenance informatique PME</strong> et <strong>GLPI support PME</strong>{" "}
                comme extensions plus spécialisées.
              </p>
            </div>
          ) : null}
          {priorityProducts.length ? (
            <div className="product-grid">
              {priorityProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isOwned={hasGlobalAccess || ownedSlugs.has(product.slug)}
                />
              ))}
            </div>
          ) : null}
        </section>

        <section className="section">
          <div className="hero-stat-grid">
            <article className="hero-stat-card">
              <span className="helper">Positionnement</span>
              <strong>Catalogue structuré autour d'offres vendables</strong>
              <p>Chaque formation répond à un service digital précis et commercialisable.</p>
            </article>
            <article className="hero-stat-card">
              <span className="helper">Parcours</span>
              <strong>Achat clair, accès membre immédiat</strong>
              <p>Le client comprend ce qu'il achète et retrouve vite le bon contenu.</p>
            </article>
            <article className="hero-stat-card">
              <span className="helper">Crédibilité</span>
              <strong>Une image sobre et haut de gamme</strong>
              <p>Le catalogue inspire davantage confiance qu'une simple page de vente brute.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isOwned={hasGlobalAccess || ownedSlugs.has(product.slug)}
              />
            ))}
          </div>
        </section>

        <PublicFooter />
      </div>
    </main>
  );
}
