import type { Metadata } from "next";
import Link from "next/link";
import { PublicFooter } from "@/components/public-footer";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions legales | TechCash Academy",
  description: "Informations legales et editeur du site TechCash Academy.",
  alternates: {
    canonical: getAbsoluteUrl("/mentions-legales")
  }
};

export default function MentionsLegalesPage() {
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
            <div className="eyebrow">Cadre legal</div>
            <h1>Mentions legales</h1>
            <p>
              Les informations ci-dessous encadrent l'exploitation du site, la diffusion des
              contenus et les moyens de contact du service.
            </p>
          </div>

          <div className="stack">
            <article className="card legal-section">
              <h2>Editeur du site</h2>
              <p>
                {siteConfig.legalEntity}
                <br />
                Marque exploitee : {siteConfig.brand}
                <br />
                Contact : {siteConfig.supportEmail}
              </p>
            </article>

            <article className="card legal-section">
              <h2>Hebergement</h2>
              <p>
                Le site est heberge sur l'infrastructure Vercel. Les paiements sont traites par
                Stripe et l'authentification ainsi que la base de donnees sont gerees via
                Supabase.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Propriete intellectuelle</h2>
              <p>
                L'ensemble des contenus, supports, modules, textes, PDF, ressources et elements
                graphiques de la plateforme sont proteges. Toute reproduction, diffusion ou revente
                non autorisee est interdite.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Responsabilite</h2>
              <p>
                Les contenus proposes ont une vocation pedagogique et operationnelle. Ils ne
                constituent ni une promesse de revenus ni un conseil juridique, fiscal ou
                comptable. L'utilisateur reste responsable de ses decisions commerciales et
                techniques.
              </p>
            </article>
          </div>
        </section>

        <PublicFooter />
      </div>
    </main>
  );
}
