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
            <div className="eyebrow">Acces et usage</div>
            <h1>Conditions d'utilisation</h1>
            <p>
              Ces conditions encadrent l'utilisation du site, l'acces aux contenus achetes et les
              limites d'usage autorisees.
            </p>
          </div>

          <div className="stack">
            <article className="card legal-section">
              <h2>Acces a la plateforme</h2>
              <p>
                L'acces membre est reserve aux utilisateurs disposant d'un compte valide et, sauf
                mention contraire, d'un achat confirme pour le produit concerne. Un acces premium
                global peut etre attribue par l'editeur dans certains cas.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Usage autorise</h2>
              <p>
                Les contenus achetes sont destines a un usage personnel ou interne a l'activite du
                client. La revente, le partage massif de compte, la duplication des supports ou la
                republication non autorisee sont interdits.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Disponibilite du contenu</h2>
              <p>
                Certains modules peuvent etre publies plus tard et apparaitre comme “bientot
                disponible”. La plateforme est justement prevue pour gerer du contenu progressif :
                texte, PDF, ressources, videos et modules en preparation.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Support et acces</h2>
              <p>
                En cas de probleme d'acces, de connexion ou de commande, le support est joignable a
                l'adresse {siteConfig.supportEmail}. L'editeur se reserve le droit de suspendre un
                acces en cas d'usage abusif manifeste.
              </p>
            </article>
          </div>
        </section>

        <PublicFooter />
      </div>
    </main>
  );
}
