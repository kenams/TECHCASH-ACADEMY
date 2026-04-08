import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { PublicFooter } from "@/components/public-footer";
import { ProductCard } from "@/components/product-card";
import { getActiveProducts, getFeaturedProduct, getOwnedProducts } from "@/lib/products";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";

export const metadata: Metadata = {
  title: "Catalogue des formations | TechCash Academy",
  description:
    "Decouvre les formations TechCash Academy : freelance IT, landing pages, sites clients, outils PME et applications mobiles.",
  alternates: {
    canonical: getAbsoluteUrl("/formations")
  },
  openGraph: {
    title: "Catalogue des formations | TechCash Academy",
    description:
      "Decouvre les formations TechCash Academy : freelance IT, landing pages, sites clients, outils PME et applications mobiles.",
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
        <header className="topbar">
          <div className="brand">{siteConfig.brand}</div>
          <nav className="nav">
            <Link href="/" className="button-ghost">
              Accueil
            </Link>
            <Link href={user ? "/dashboard" : "/login"} className="button">
              {user ? "Mon espace" : "Connexion"}
            </Link>
          </nav>
        </header>

        <section className="section section-first">
          <div className="section-title">
            <div className="eyebrow">Catalogue des formations</div>
            <h1>Choisis la competence digitale la plus rentable pour ton contexte</h1>
            <p>
              Chaque formation correspond a une offre claire a vendre. Tu peux acheter une seule
              formation ou construire ton catalogue de competences pas a pas.
            </p>
          </div>

          {featured ? (
            <div className="featured-strip">
              <div>
                <p className="helper">Offre principale</p>
                <h2>{featured.title}</h2>
                <p>{featured.short_description}</p>
              </div>
              <div className="cta-row">
                <Link href={`/formations/${featured.slug}`} className="button-secondary">
                  Voir le detail
                </Link>
                <Link href={`/checkout?product=${featured.slug}`} className="button">
                  Acheter
                </Link>
              </div>
            </div>
          ) : null}
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
