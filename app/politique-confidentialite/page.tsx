import type { Metadata } from "next";
import Link from "next/link";
import { PublicFooter } from "@/components/public-footer";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialite | TechCash Academy",
  description: "Politique de confidentialite de TechCash Academy.",
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
            <div className="eyebrow">Donnees personnelles</div>
            <h1>Politique de confidentialite</h1>
            <p>
              Cette page resume les donnees traitees pour faire fonctionner l'inscription,
              l'authentification, le paiement et l'acces membre.
            </p>
          </div>

          <div className="stack">
            <article className="card legal-section">
              <h2>Donnees collectees</h2>
              <p>
                Lors de la creation de compte et des achats, la plateforme traite au minimum
                l'adresse e-mail, les identifiants techniques d'authentification, les informations
                de paiement remontees par Stripe et l'historique d'acces aux formations achetees.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Finalites</h2>
              <p>
                Les donnees sont utilisees pour creer le compte membre, securiser la connexion,
                valider les achats, debloquer les formations correspondantes et assurer le support
                client.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Prestataires</h2>
              <p>
                Stripe traite le paiement, Supabase l'authentification et la base de donnees,
                Vercel l'hebergement du site. Chaque prestataire applique ses propres mesures de
                securite et politiques de confidentialite.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Droits et contact</h2>
              <p>
                Pour toute demande relative a l'acces, a la correction ou a la suppression de tes
                donnees, contacte le support a l'adresse suivante : {siteConfig.supportEmail}.
              </p>
            </article>
          </div>
        </section>

        <PublicFooter />
      </div>
    </main>
  );
}
