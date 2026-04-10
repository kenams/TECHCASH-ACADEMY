import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";
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
    <LegalPageLayout title="Mentions légales" eyebrow="Cadre légal" updatedAt="10 avril 2026">
      <article>
        <h2>Éditeur du site</h2>
        <p>
          {siteConfig.legalEntity}
          <br />
          Marque exploitée&nbsp;: {siteConfig.brand}
          <br />
          Contact&nbsp;: {siteConfig.supportEmail}
        </p>
      </article>

      <article>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé sur l'infrastructure Vercel. Les paiements sont traités par Stripe. L'authentification et la base de données sont gérées via Supabase.
        </p>
      </article>

      <article>
        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus, supports, modules, textes, PDF, ressources et éléments graphiques de la plateforme est protégé. Toute reproduction, diffusion ou revente non autorisée est interdite.
        </p>
      </article>

      <article>
        <h2>Responsabilité</h2>
        <p>
          Les contenus proposés ont une vocation pédagogique et opérationnelle. Ils ne constituent ni une promesse de revenus ni un conseil juridique, fiscal ou comptable. L'utilisateur reste responsable de ses décisions commerciales et techniques.
        </p>
      </article>
    </LegalPageLayout>
  );
}
