import type { Metadata } from "next";
import Link from "next/link";
import { PublicFooter } from "@/components/public-footer";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions d'utilisation | TechCash Academy",
  description: "Conditions d'utilisation de la plateforme TechCash Academy.",
  alternates: {
    canonical: getAbsoluteUrl("/conditions-utilisation")
  }
};

export default function ConditionsUtilisationPage() {
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
            <div className="eyebrow">Accès et usage</div>
            <h1>Conditions d'utilisation</h1>
            <p>
              Ces conditions encadrent l'utilisation du site, l'accès aux contenus achetés et les
              limites d'usage autorisées.
            </p>
          </div>

          <div className="stack">
            <article className="card legal-section">
              <h2>Accès à la plateforme</h2>
              <p>
                L'accès membre est réservé aux utilisateurs disposant d'un compte valide et, sauf
                mention contraire, d'un achat confirmé pour le produit concerné. Un accès premium
                global peut être attribué par l'éditeur dans certains cas.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Usage autorisé</h2>
              <p>
                Les contenus achetés sont destinés à un usage personnel ou interne à l'activité du
                client. La revente, le partage massif de compte, la duplication des supports ou la
                republication non autorisée sont interdits.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Disponibilité du contenu</h2>
              <p>
                Certains modules peuvent être publiés plus tard et apparaître comme "bientôt
                disponible". La plateforme est justement prévue pour gérer du contenu progressif :
                texte, PDF, ressources, vidéos et modules en préparation.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Support et accès</h2>
              <p>
                En cas de problème d'accès, de connexion ou de commande, le support est joignable à
                l'adresse {siteConfig.supportEmail}. L'éditeur se réserve le droit de suspendre un
                accès en cas d'usage abusif manifeste.
              </p>
            </article>
          </div>
        </section>

        <PublicFooter />
      </div>
    </main>
  );
}
