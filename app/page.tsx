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

const audienceCards = [
  {
    title: "Freelances en lancement",
    description:
      "Pour passer d'une compétence floue à une offre vendable, avec un positionnement simple à expliquer et des premiers livrables crédibles."
  },
  {
    title: "Techniciens et profils support",
    description:
      "Pour transformer une logique de dépannage ou de maintenance en offre plus lisible, mieux tarifée et plus rassurante pour des PME."
  },
  {
    title: "Créateurs de services digitaux",
    description:
      "Pour structurer des landing pages, sites clients ou outils métier comme de vraies prestations, pas comme des expérimentations improvisées."
  },
  {
    title: "Profils orientés exécution",
    description:
      "Pour ceux qui veulent un cadre concret, des modules directement exploitables et une progression utile sans théâtre marketing."
  }
];

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
              Apprends à vendre des prestations digitales utiles, structurer une activité propre et livrer avec des process simples. Pas de promesse miracle, seulement des offres compréhensibles, vendables et exploitables.
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
                <span>formations pensées comme de vraies offres</span>
              </div>
              <div className="metric-pill">
                <strong>Checkout</strong>
                <span>un tunnel plus propre qu'une simple page de vente brute</span>
              </div>
              <div className="metric-pill">
                <strong>Espace membre</strong>
                <span>accès clair, produit par produit, sans ambiguïté</span>
              </div>
            </div>

            <div className="hero-stat-grid">
              <article className="hero-stat-card">
                <span className="helper">Catalogue actuel</span>
                <strong>{products.length} offres publiées</strong>
                <p>Des sujets utiles pour vendre vite : support IT, maintenance, landing pages, outils métier et services digitaux concrets.</p>
              </article>
              <article className="hero-stat-card">
                <span className="helper">Positionnement</span>
                <strong>Un cadre premium et lisible</strong>
                <p>Chaque page cherche à rassurer, clarifier et donner envie d'acheter sans surpromesse ni friction inutile.</p>
              </article>
              <article className="hero-stat-card">
                <span className="helper">Formats inclus</span>
                <strong>Texte, PDF, ressources, vidéos</strong>
                <p>Le contenu peut monter en puissance progressivement sans casser l'expérience ni dégrader la valeur perçue.</p>
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
                  <strong>Une présentation rassurante de bout en bout</strong>
                  <span>Catalogue lisible, détails clairs, checkout propre et espace membre cohérent dès le premier achat.</span>
                </div>

                <div className="confidence-list">
                  <div className="confidence-item">
                    <span className="confidence-dot" />
                    <div>
                      <strong>Promesse claire</strong>
                      <p>Une offre qui se comprend rapidement, sans longs tunnels ni langage creux.</p>
                    </div>
                  </div>
                  <div className="confidence-item">
                    <span className="confidence-dot" />
                    <div>
                      <strong>Livrable crédible</strong>
                      <p>Un contenu structuré pour être utilisé, vendu et réexploité dans la vraie vie client.</p>
                    </div>
                  </div>
                  <div className="confidence-item">
                    <span className="confidence-dot" />
                    <div>
                      <strong>Montée en gamme</strong>
                      <p>Le catalogue te permet d'ajouter ensuite d'autres compétences sans perdre la cohérence du positionnement.</p>
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

        {featured ? <ProductHero product={featured} isOwned={hasGlobalAccess || ownedProductSlugs.has(featured.slug)} /> : null}

        {priorityProducts.length ? (
          <section className="section">
            <div className="section-title">
              <div className="eyebrow">Offres à pousser maintenant</div>
              <h2>Les offres commerciales à mettre devant</h2>
              <p>
                Priorité recommandée : <strong>Freelance IT 30 jours</strong> pour l'offre d'entrée, <strong>Maintenance informatique PME</strong> pour le revenu récurrent, puis <strong>GLPI support PME</strong> pour une spécialisation support claire et crédible.
              </p>
            </div>
            <div className="offer-highlight-grid">
              <article className="offer-highlight-card">
                <span className="eyebrow">Entrée</span>
                <h3>Freelance IT 30 jours</h3>
                <p>La formation la plus simple à comprendre et la plus efficace pour transformer une compétence technique en offre vendable.</p>
              </article>
              <article className="offer-highlight-card">
                <span className="eyebrow">Récurrent</span>
                <h3>Maintenance informatique PME</h3>
                <p>Le meilleur point d'appui pour vendre du suivi, de la stabilité et un revenu mensuel plus lisible.</p>
              </article>
              <article className="offer-highlight-card">
                <span className="eyebrow">Spécialisation</span>
                <h3>GLPI support PME</h3>
                <p>Une offre support plus précise, plus B2B et plus facile à présenter comme solution d'organisation.</p>
              </article>
            </div>
            <div className="product-grid">
              {priorityProducts.map((product) => (
                <ProductCard key={product.id} product={product} isOwned={hasGlobalAccess || ownedProductSlugs.has(product.slug)} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="section">
          <div className="section-title">
            <div className="eyebrow">Le parcours</div>
            <h2>Comment l'expérience est pensée</h2>
            <p>De la découverte à l'accès membre, le site est construit pour rester clair, rassurant et exploitable sans surcharge.</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">1</span>
              <h3>Choisir une compétence rentable</h3>
              <p>Tu parcours un catalogue orienté business réel, pas un simple empilement de sujets techniques sans logique commerciale.</p>
            </div>
            <div className="step-card">
              <span className="step-number">2</span>
              <h3>Acheter dans un cadre propre</h3>
              <p>Paiement Stripe, pages lisibles, accès membre clair et continuité immédiate entre achat, dashboard et consommation du contenu.</p>
            </div>
            <div className="step-card">
              <span className="step-number">3</span>
              <h3>Appliquer et vendre</h3>
              <p>Les contenus sont conçus pour t'aider à structurer une vraie offre, un vrai discours et des livrables qui tiennent la route.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Catalogue des formations</h2>
            <p>Un catalogue structuré autour d'offres simples à vendre : support IT, landing pages, sites clients, outils métier et applications monétisables.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} isOwned={hasGlobalAccess || ownedProductSlugs.has(product.slug)} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Pour qui</h2>
            <p>Le catalogue est pensé pour des profils qui veulent vendre vite, livrer proprement et construire une présence crédible sans bruit inutile.</p>
          </div>
          <div className="grid-2">
            {audienceCards.map((audience) => (
              <article className="card" key={audience.title}>
                <h3>{audience.title}</h3>
                <p>{audience.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Pourquoi la plateforme tient la route</h2>
            <p>Tu peux publier, vendre et faire évoluer les contenus sans attendre d'avoir tout filmé ni refaire tout le tunnel à chaque ajout.</p>
          </div>
          <div className="grid-3">
            <article className="card">
              <h3>Formats flexibles</h3>
              <p>Texte, PDF, ressources, vidéos externes et modules à venir cohabitent proprement dans une expérience unifiée.</p>
            </article>
            <article className="card">
              <h3>Accès par produit</h3>
              <p>Chaque achat débloque ce qu'il faut, au bon endroit, sans confusion pour le membre ni bricolage dans le dashboard.</p>
            </article>
            <article className="card">
              <h3>Base évolutive</h3>
              <p>Supabase, Stripe, le catalogue et l'espace membre sont déjà assez propres pour monter en gamme sans repartir de zéro.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Une présence premium, sans agressivité marketing</h2>
            <p>TechCash Academy cherche à inspirer confiance : design net, structure claire, contenus sérieux et parcours d'achat cohérent.</p>
          </div>
          <div className="trust-panel-grid">
            <article className="card trust-panel-card">
              <span className="eyebrow">Conversion</span>
              <h3>Des pages pensées pour rassurer avant de vendre</h3>
              <p>Le catalogue met en avant les bénéfices concrets, la structure de chaque formation et une logique d'achat lisible.</p>
            </article>
            <article className="card trust-panel-card">
              <span className="eyebrow">Exécution</span>
              <h3>Une plateforme exploitable même si tout n'est pas encore filmé</h3>
              <p>Tu peux publier progressivement avec des textes, des PDF, des ressources téléchargeables et des modules à venir déjà intégrés.</p>
            </article>
            <article className="card trust-panel-card">
              <span className="eyebrow">Image</span>
              <h3>Un rendu plus sérieux qu'une simple page de vente</h3>
              <p>Le site vise un rendu sobre, luxueux et durable, pour porter une activité crédible plutôt qu'une simple promesse de lancement.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Questions fréquentes</h2>
            <p>Le positionnement reste volontairement simple : apprendre à vendre des compétences digitales utiles, sans théâtre marketing.</p>
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
              <h2>Commencer avec une offre, puis élargir proprement</h2>
              <p>Tu peux entrer par l'offre principale ou choisir directement le sujet qui colle à ton activité. Le catalogue est pensé pour permettre plusieurs achats successifs sans perdre la cohérence globale.</p>
            </div>
            <div className="cta-row">
              <Link href="/formations" className="button">
                Explorer les formations
              </Link>
              <Link href={user ? "/dashboard/mes-formations" : "/register"} className="button-secondary">
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
