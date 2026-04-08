import type { Metadata } from "next";
import Link from "next/link";
import { PublicFooter } from "@/components/public-footer";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité | TechCash Academy",
  description: "Politique de confidentialité de TechCash Academy.",
  alternates: {
    canonical: getAbsoluteUrl("/politique-confidentialite")
  }
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main>
      <div className="shell legal-page">
        <header className="topbar">
          <div className="brand">{siteConfig.brand}</div>
          <nav className="nav">
            <Link href="/" className="button-ghost">
              Accueil
            </Link>
            <Link href="/formations" className="button">
              Formations
            </Link>
          </nav>
        </header>

        <section className="section section-first">
          <div className="section-title">
            <div className="eyebrow">Données personnelles</div>
            <h1>Politique de confidentialité</h1>
            <p>
              Cette page résume les données traitées pour faire fonctionner l'inscription,
              l'authentification, le paiement et l'accès membre.
            </p>
          </div>

          <div className="stack">
            <article className="card legal-section">
              <h2>Données collectées</h2>
              <p>
                Lors de la création de compte et des achats, la plateforme traite au minimum
                l'adresse e-mail, les identifiants techniques d'authentification, les informations
                de paiement remontées par Stripe et l'historique d'accès aux formations achetées.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Finalités</h2>
              <p>
                Les données sont utilisées pour créer le compte membre, sécuriser la connexion,
                valider les achats, débloquer les formations correspondantes et assurer le support
                client.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Prestataires</h2>
              <p>
                Stripe traite le paiement, Supabase l'authentification et la base de données,
                Vercel l'hébergement du site. Chaque prestataire applique ses propres mesures de
                sécurité et politiques de confidentialité.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Droits et contact</h2>
              <p>
                Pour toute demande relative à l'accès, à la correction ou à la suppression de tes
                données, contacte le support à l'adresse suivante : {siteConfig.supportEmail}.
              </p>
            </article>
          </div>
        </section>

        <PublicFooter />
      </div>
    </main>
  );
}
