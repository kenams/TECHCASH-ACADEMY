import type { Metadata } from "next";
import Link from "next/link";
import { PublicFooter } from "@/components/public-footer";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales | TechCash Academy",
  description: "Informations légales et éditeur du site TechCash Academy.",
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
            <div className="eyebrow">Cadre légal</div>
            <h1>Mentions légales</h1>
            <p>
              Les informations ci-dessous encadrent l'exploitation du site, la diffusion des
              contenus et les moyens de contact du service.
            </p>
          </div>

          <div className="stack">
            <article className="card legal-section">
              <h2>Éditeur du site</h2>
              <p>
                {siteConfig.legalEntity}
                <br />
                Marque exploitée : {siteConfig.brand}
                <br />
                Contact : {siteConfig.supportEmail}
              </p>
            </article>

            <article className="card legal-section">
              <h2>Hébergement</h2>
              <p>
                Le site est hébergé sur l'infrastructure Vercel. Les paiements sont traités par
                Stripe et l'authentification ainsi que la base de données sont gérées via
                Supabase.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Propriété intellectuelle</h2>
              <p>
                L'ensemble des contenus, supports, modules, textes, PDF, ressources et éléments
                graphiques de la plateforme sont protégés. Toute reproduction, diffusion ou revente
                non autorisée est interdite.
              </p>
            </article>

            <article className="card legal-section">
              <h2>Responsabilité</h2>
              <p>
                Les contenus proposés ont une vocation pédagogique et opérationnelle. Ils ne
                constituent ni une promesse de revenus ni un conseil juridique, fiscal ou
                comptable. L'utilisateur reste responsable de ses décisions commerciales et
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
