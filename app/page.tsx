import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getPublishedModules } from "@/lib/modules";

const benefits = [
  "Comprendre exactement quelles prestations IT vendre sans diplome.",
  "Trouver rapidement tes premiers clients avec une methode simple.",
  "Structurer une activite freelance rentable sans complexite technique.",
  "Acceder a un plan d'action 30 jours, scripts et bonus prets a l'emploi."
];

const bonuses = [
  "CV pret a l'emploi",
  "Script pour trouver des clients",
  "Methodes concretes"
];

export default async function LandingPage() {
  const trainingModules = await getPublishedModules();

  return (
    <main>
      <div className="shell">
        <header className="topbar">
          <div className="brand">{siteConfig.brand}</div>
          <nav className="nav">
            <Link href="/login" className="button-ghost">
              Connexion
            </Link>
            <Link href="/checkout" className="button">
              Acheter maintenant
            </Link>
          </nav>
        </header>

        <section className="hero">
          <div className="stack">
            <div className="eyebrow">Formation digitale + ebook + bonus concrets</div>
            <h1>Deviens technicien informatique freelance en 30 jours, meme sans diplome</h1>
            <p className="lead">
              Apprends etape par etape comment trouver tes premiers clients et generer tes
              premiers revenus rapidement.
            </p>
            <div className="cta-row">
              <Link href="/checkout" className="button">
                Acheter maintenant
              </Link>
              <Link href="/register" className="button-secondary">
                Creer un compte
              </Link>
            </div>
            <ul className="bullet-list">
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>

          <aside className="panel price-box">
            <p className="helper">Offre de lancement</p>
            <div className="price">{siteConfig.formattedPrice}</div>
            <p>
              Un pack minimaliste pour vendre vite : ebook, modules video, bonus pratiques et
              acces immediat apres paiement.
            </p>
            <ul className="list">
              <li>Ebook PDF telechargeable</li>
              <li>6 modules video accessibles depuis le dashboard</li>
              <li>Acces prive apres achat</li>
              <li>Paiement securise avec Stripe</li>
            </ul>
            <div className="cta-row">
              <Link href="/checkout" className="button">
                Je prends l'offre
              </Link>
            </div>
          </aside>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Ce que contient le produit</h2>
            <p>Un parcours court, actionnable et pense pour une mise en vente rapide.</p>
          </div>
          <div className="grid-2">
            <article className="card">
              <h3>Ebook premium</h3>
              <p>
                Un guide structure pour comprendre le metier, vendre ses premieres prestations et
                eviter les erreurs du debut.
              </p>
            </article>
            <article className="card">
              <h3>Formation video</h3>
              <p>
                6 modules pour passer du niveau debutant a une offre freelance commercialisable en
                quelques semaines.
              </p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Programme de la formation</h2>
            <p>Les modules sont deja prets dans le dashboard avec des liens video externes.</p>
          </div>
          <div className="grid-3">
            {trainingModules.map((module) => (
              <article className="card" key={module.id}>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Bonus inclus</h2>
            <p>Des ressources pretes a utiliser pour accelerer le passage a l'action.</p>
          </div>
          <div className="grid-3">
            {bonuses.map((bonus) => (
              <article className="card" key={bonus}>
                <h3>{bonus}</h3>
                <p>Inclus sans surcout dans l'offre complete.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="panel">
            <div className="section-title">
              <h2>Pret a lancer les ventes</h2>
              <p>
                Cette version MVP est pensee pour convertir, livrer le contenu et encaisser sans
                friction inutile.
              </p>
            </div>
            <div className="cta-row">
              <Link href="/checkout" className="button">
                Acheter maintenant
              </Link>
              <Link href="/dashboard" className="button-secondary">
                Voir mon espace
              </Link>
            </div>
          </div>
        </section>

        <footer className="footer">
          Plateforme minimaliste propulsee par Next.js, Supabase et Stripe.
        </footer>
      </div>
    </main>
  );
}
