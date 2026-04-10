import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";
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
    <LegalPageLayout
      title="Conditions d'utilisation"
      eyebrow="Accès et usage"
      updatedAt="10 avril 2026"
    >
      <article>
        <h2>Accès à la plateforme</h2>
        <p>
          L'accès membre est réservé aux utilisateurs disposant d'un compte valide et, sauf mention contraire, d'un achat confirmé pour le produit concerné. Un accès premium global peut être attribué par l'éditeur dans certains cas.
        </p>
      </article>

      <article>
        <h2>Usage autorisé</h2>
        <p>
          Les contenus achetés sont destinés à un usage personnel ou interne à l'activité du client. La revente, le partage massif de compte, la duplication des supports ou la republication non autorisée sont interdits.
        </p>
      </article>

      <article>
        <h2>Disponibilité du contenu</h2>
        <p>
          Certains modules peuvent être publiés plus tard et apparaître comme «&nbsp;bientôt disponibles&nbsp;». La plateforme est prévue pour gérer du contenu progressif&nbsp;: texte, PDF, ressources, vidéos et modules en préparation.
        </p>
      </article>

      <article>
        <h2>Support et accès</h2>
        <p>
          En cas de problème d'accès, de connexion ou de commande, le support est joignable à l'adresse {siteConfig.supportEmail}. L'éditeur se réserve le droit de suspendre un accès en cas d'usage abusif manifeste.
        </p>
      </article>
    </LegalPageLayout>
  );
}
