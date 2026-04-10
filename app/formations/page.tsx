import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { PublicFooter } from "@/components/public-footer";
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
            <p>Chaque formation correspond à une offre claire à vendre. Tu peux acheter une seule formation ou construire ton catalogue de compétences pas à pas.</p>
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
          <div className="offer-highlight-grid">
            <article className="offer-highlight-card">
              <span className="eyebrow">Clarté</span>
              <h3>Un catalogue centré sur des offres vendables</h3>
              <p>Tu ne parcours pas une bibliothèque technique abstraite. Chaque page te rapproche d'un service que tu peux vraiment proposer.</p>
            </article>
            <article className="offer-highlight-card">
              <span className="eyebrow">Rassurance</span>
              <h3>Une expérience plus sérieuse qu'une simple landing page</h3>
              <p>Les fiches formation, le checkout et l'espace membre gardent la même logique visuelle et commerciale.</p>
            </article>
            <article className="offer-highlight-card">
              <span className="eyebrow">Progression</span>
              <h3>Un catalogue qui accompagne une montée en gamme</h3>
              <p>Tu peux commencer avec une offre simple puis compléter ton positionnement sans brouiller ton image.</p>
            </article>
          </div>
        </section>

        {priorityProducts.length ? (
          <section className="section">
            <div className="section-title">
              <div className="eyebrow">Priorités commerciales</div>
              <h2>Les offres à pousser en premier</h2>
              <p>
                Commence par <strong>Freelance IT 30 jours</strong>, puis pousse <strong>Maintenance informatique PME</strong> et <strong>GLPI support PME</strong> comme extensions plus spécialisées.
              </p>
            </div>
            <div className="product-grid">
              {priorityProducts.map((product) => (
                <ProductCard key={product.id} product={product} isOwned={hasGlobalAccess || ownedSlugs.has(product.slug)} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="section">
          <div className="hero-stat-grid">
            <article className="hero-stat-card">
              <span className="helper">Positionnement</span>
              <strong>Catalogue structuré autour d'offres vendables</strong>
              <p>Chaque formation répond à un service digital précis, présentable et commercialisable sans flou.</p>
            </article>
            <article className="hero-stat-card">
              <span className="helper">Parcours</span>
              <strong>Achat clair, accès membre immédiat</strong>
              <p>Le membre comprend ce qu'il achète, puis retrouve directement le bon contenu dans son espace.</p>
            </article>
            <article className="hero-stat-card">
              <span className="helper">Image</span>
              <strong>Un rendu sobre, haut de gamme et cohérent</strong>
              <p>Le catalogue porte une activité crédible, pas un simple assemblage de pages de vente disparates.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Toutes les formations disponibles</h2>
            <p>Explore le catalogue complet et choisis la porte d'entrée la plus adaptée à ton activité, ton niveau actuel et ton objectif commercial.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} isOwned={hasGlobalAccess || ownedSlugs.has(product.slug)} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="panel">
            <div className="section-title">
              <h2>Construire une présence plus premium</h2>
              <p>Le catalogue n'est pas seulement une liste de produits. Il sert aussi de vitrine crédible pour montrer que ton offre est claire, structurée et sérieuse.</p>
            </div>
            <div className="cta-row">
              <Link href={user ? "/dashboard/mes-formations" : "/register"} className="button">
                {user ? "Voir mes formations" : "Créer mon accès"}
              </Link>
              <Link href="/" className="button-secondary">
                Revenir à l'accueil
              </Link>
            </div>
          </div>
        </section>

        <PublicFooter />
      </div>
    </main>
  );
}
