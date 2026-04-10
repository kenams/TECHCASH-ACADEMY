import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { ProductHero } from "@/components/product-hero";
import { PublicFooter } from "@/components/public-footer";
import { getPriorityOfferSlugs } from "@/lib/catalog";
import { getActiveProducts, getFeaturedProduct, getOwnedProducts, getProductBySlug } from "@/lib/products";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";

export const metadata: Metadata = {
  title: "TechCash Academy | Formations digitales rentables",
  description:
    "Catalogue de formations pour lancer une activité digitale rentable : freelance IT, landing pages, sites web clients, outils PME et applications mobiles.",
  alternates: {
    canonical: getAbsoluteUrl("/")
  },
  openGraph: {
    title: "TechCash Academy | Formations digitales rentables",
    description:
      "Catalogue de formations pour lancer une activité digitale rentable : freelance IT, landing pages, sites web clients, outils PME et applications mobiles.",
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
  const priorityOfferSlugs = new Set(getPriorityOfferSlugs());
  const priorityProducts = products.filter((product) => priorityOfferSlugs.has(product.slug));

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

        <Navbar
          brand={siteConfig.brand}
          links={[{ href: "/formations", label: "Formations" }]}
          isLoggedIn={Boolean(user)}
          primaryProductSlug={siteConfig.primaryProductSlug}
          showStartCTA={!user}
        />

        <section className="hero hero-catalog">
          <div className="stack">
            <div className="eyebrow">Formations digitales concrètes et vendables</div>
            <h1>{siteConfig.headline}</h1>
            <p className="lead">
              Apprends à vendre des prestations digitales utiles, structurer une activité propre et
              livrer avec des process simples. Pas de discours miracle, seulement des offres que tu
              peux proposer à de vrais clients.
            </p>
            <div className="cta-row">
              <Link href="/formations" className="button">
                Voir le catalogue
              </Link>
              <Link href={user ? "/dashboard" : "/register"} className="button-secondary">
                {user ? "Accéder à mon espace" : "Créer un compte"}
              </Link>
            </div>
            <div className="hero-proof-strip">
              <div className="metric-pill">
                <strong>{products.length}</strong>
                <span>formations prêtes à vendre</span>
              </div>
              <div className="metric-pill">
                <strong>Stripe</strong>
                <span>checkout propre et rassurant</span>
              </div>
              <div className="metric-pill">
                <strong>Membre</strong>
                <span>accès clair produit par produit</span>
              </div>
            </div>
            <div className="hero-stat-grid">
              <article className="hero-stat-card">
                <span className="helper">Catalogue actuel</span>
                <strong>{products.length} formations</strong>
                <p>Des offres ciblées, structurées pour des besoins clients concrets.</p>
              </article>
              <article className="hero-stat-card">
                <span className="helper">Accès et paiement</span>
                <strong>Stripe + espace membre</strong>
                <p>Un tunnel propre, rassurant et pensé pour une vente sérieuse.</p>
              </article>
              <article className="hero-stat-card">
                <span className="helper">Formats inclus</span>
                <strong>PDF, texte, vidéos, ressources</strong>
                <p>Le contenu peut être publié progressivement sans casser l'expérience.</p>
              </article>
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
                <div className="luxury-note">
                  <strong>Cadre rassurant</strong>
                  <span>
                    Paiement sécurisé, accès membre propre, catalogue lisible et progression par
                    produit acheté.
                  </span>
                </div>
                <div className="confidence-list">
                  <div className="confidence-item">
                    <span className="confidence-dot" />
                    <div>
                      <strong>Positionnement clair</strong>
                      <p>Des offres pensées pour être comprises et revendues à de vrais clients.</p>
                    </div>
                  </div>
                  <div className="confidence-item">
                    <span className="confidence-dot" />
                    <div>
                      <strong>Expérience propre</strong>
                      <p>Pages détaillées, checkout stable et espace membre prêt pour la suite.</p>
                    </div>
                  </div>
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
            ) : (
              <p>Aucune formation active pour le moment.</p>
            )}
          </aside>
        </section>

        {featured ? (
          <ProductHero
            product={featured}
            isOwned={hasGlobalAccess || ownedProductSlugs.has(featured.slug)}
          />
        ) : null}

        {priorityProducts.length ? (
          <section className="section">
            <div className="section-title">
              <div className="eyebrow">Offres à pousser maintenant</div>
              <h2>Les offres commerciales à mettre devant</h2>
              <p>
                Priorité recommandée : <strong>Freelance IT 30 jours</strong> pour l'offre
                principale, <strong>Maintenance informatique PME</strong> pour le revenu récurrent,
                puis <strong>GLPI support PME</strong> pour une spécialisation support claire.
              </p>
            </div>
            <div className="offer-highlight-grid">
              <article className="offer-highlight-card">
                <span className="eyebrow">Entrée</span>
                <h3>Freelance IT 30 jours</h3>
                <p>
                  Le point de départ le plus lisible pour transformer une compétence en offre
                  vendable.
                </p>
              </article>
              <article className="offer-highlight-card">
                <span className="eyebrow">Récurrent</span>
                <h3>Maintenance informatique PME</h3>
                <p>
                  La meilleure base pour vendre du suivi, de la stabilité et du revenu mensuel.
                </p>
              </article>
              <article className="offer-highlight-card">
                <span className="eyebrow">Spécialisation</span>
                <h3>GLPI support PME</h3>
                <p>Une offre support plus pointue, claire à expliquer et crédible en B2B.</p>
              </article>
            </div>
            <div className="product-grid">
              {priorityProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isOwned={hasGlobalAccess || ownedProductSlugs.has(product.slug)}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="section">
          <div className="section-title">
            <div className="eyebrow">Le parcours</div>
            <h2>Comment ça marche</h2>
            <p>
              De la découverte à la livraison client, tout est pensé pour aller vite et rester
              propre.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">1</span>
              <h3>Choisis ta formation</h3>
              <p>
                Parcours le catalogue et sélectionne la compétence digitale la plus adaptée à ton
                contexte. Chaque offre correspond à un service réel que tu peux vendre.
              </p>
            </div>
            <div className="step-card">
              <span className="step-number">2</span>
              <h3>Achète et accède immédiatement</h3>
              <p>
                Paiement sécurisé via Stripe. Ton accès est activé instantanément dans l'espace
                membre dédié, sans attente ni friction.
              </p>
            </div>
            <div className="step-card">
              <span className="step-number">3</span>
              <h3>Applique et vends</h3>
              <p>
                Consulte le contenu structuré, télécharge les ressources et commence à proposer ta
                nouvelle offre à de vrais clients rapidement.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Catalogue des formations</h2>
            <p>
              Un catalogue structuré autour d'offres simples à vendre : support IT, landing pages,
              sites clients, outils métier et applications mobiles monétisables.
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
            <p>
              Des formations faites pour des profils qui veulent vendre vite, livrer proprement et
              progresser sans perdre de temps.
            </p>
          </div>
          <div className="grid-2">
            {siteConfig.audiences.map((audience) => (
              <article className="card" key={audience}>
                <h3>{audience}</h3>
                <p>
                  Le contenu reste praticable, même si tu n'as pas encore construit une activité ou
                  un gros portefeuille client.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Pourquoi la plateforme est utile</h2>
            <p>
              Tu peux publier, vendre et consommer du contenu même si toutes les vidéos ne sont pas
              encore tournées.
            </p>
          </div>
          <div className="grid-3">
            <article className="card">
              <h3>Formats flexibles</h3>
              <p>
                PDF, texte, ressources, liens vidéo externes et modules bientôt disponibles sont
                tous pris en charge.
              </p>
            </article>
            <article className="card">
              <h3>Accès par produit</h3>
              <p>
                Chaque achat débloque une formation précise. Le dashboard sait exactement ce que le
                membre possède.
              </p>
            </article>
            <article className="card">
              <h3>Base solide pour la suite</h3>
              <p>
                Le tunnel de vente, Supabase, Stripe et le dashboard sont déjà prêts pour évoluer
                sans replatforming.
              </p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Une présentation premium, sans discours agressif</h2>
            <p>
              TechCash Academy est pensée pour inspirer confiance : offre lisible, tunnel propre,
              contenu structuré et expérience membre cohérente dès le premier achat.
            </p>
          </div>
          <div className="trust-panel-grid">
            <article className="card trust-panel-card">
              <span className="eyebrow">Conversion</span>
              <h3>Des pages faites pour rassurer avant de vendre</h3>
              <p>
                Le catalogue met en avant les bénéfices concrets, la structure de chaque formation
                et la logique d'accès produit par produit.
              </p>
            </article>
            <article className="card trust-panel-card">
              <span className="eyebrow">Exécution</span>
              <h3>Une plateforme exploitable même si tout n'est pas encore filmé</h3>
              <p>
                Tu peux vendre et publier avec des textes, PDF, ressources téléchargeables et des
                modules "bientôt disponibles".
              </p>
            </article>
            <article className="card trust-panel-card">
              <span className="eyebrow">Image</span>
              <h3>Une présence plus sérieuse qu'une simple page de vente</h3>
              <p>
                Le design reste sobre, net et premium pour porter une activité crédible et durable.
              </p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Questions fréquentes</h2>
            <p>
              Le positionnement reste simple : apprendre à vendre des compétences digitales utiles,
              sans théâtre marketing.
            </p>
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
              <h2>Prendre une formation, puis évoluer</h2>
              <p>
                Commence par l'offre principale ou choisis directement le sujet qui colle à ton
                activité. Le catalogue est conçu pour permettre plusieurs achats successifs.
              </p>
            </div>
            <div className="cta-row">
              <Link href="/formations" className="button">
                Explorer les formations
              </Link>
              <Link
                href={user ? "/dashboard/mes-formations" : "/register"}
                className="button-secondary"
              >
                {user ? "Voir mes formations" : "Créer mon accès"}
              </Link>
            </div>
          </div>
        </section>

        <PublicFooter />
      </div>
    </main>
  );
}
