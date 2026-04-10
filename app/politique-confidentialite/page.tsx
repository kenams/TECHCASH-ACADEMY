import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal-page-layout";
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
    <LegalPageLayout
      title="Politique de confidentialité"
      eyebrow="Données personnelles"
      updatedAt="10 avril 2026"
    >
      <article>
        <h2>Données collectées</h2>
        <p>
          Lors de la création de compte et des achats, la plateforme traite au minimum l'adresse e-mail, les identifiants techniques d'authentification, les informations de paiement remontées par Stripe et l'historique d'accès aux formations achetées.
        </p>
      </article>

      <article>
        <h2>Finalités</h2>
        <p>
          Les données sont utilisées pour créer le compte membre, sécuriser la connexion, valider les achats, débloquer les formations correspondantes et assurer le support client.
        </p>
      </article>

      <article>
        <h2>Prestataires</h2>
        <p>
          Stripe traite le paiement, Supabase l'authentification et la base de données, Vercel l'hébergement du site. Chaque prestataire applique ses propres mesures de sécurité et ses propres politiques de confidentialité.
        </p>
      </article>

      <article>
        <h2>Droits et contact</h2>
        <p>
          Pour toute demande relative à l'accès, à la correction ou à la suppression de tes données, contacte le support à l'adresse suivante&nbsp;: {siteConfig.supportEmail}.
        </p>
      </article>
    </LegalPageLayout>
  );
}
