const trimmed = (value: string | undefined) => value?.trim();

export function getSiteUrl() {
  const configuredUrl = trimmed(process.env.NEXT_PUBLIC_SITE_URL);
  const productionUrl = trimmed(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  const previewUrl = trimmed(process.env.VERCEL_URL);

  if (productionUrl) {
    if (configuredUrl && !configuredUrl.includes("localhost")) {
      return configuredUrl;
    }

    return `https://${productionUrl}`;
  }

  if (previewUrl) {
    if (configuredUrl && !configuredUrl.includes("localhost")) {
      return configuredUrl;
    }

    return `https://${previewUrl}`;
  }

  if (configuredUrl) {
    return configuredUrl;
  }

  return "https://techcash-academy.vercel.app";
}

export function getAbsoluteUrl(path = "/") {
  const baseUrl = getSiteUrl().replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export const siteConfig = {
  brand: "TechCash Academy",
  shortBrand: "KAH-Digital",
  primaryProductSlug: "freelance-it-30-jours",
  legalEntity: "KAH-Digital",
  supportEmail: trimmed(process.env.NEXT_PUBLIC_SUPPORT_EMAIL) || "kahdigital42@gmail.com",
  siteUrl: getSiteUrl(),
  headline: "Des formations digitales concrètes pour lancer une activité rentable",
  description:
    "Plateforme de formations pour vendre des services digitaux utiles, signer ses premiers clients et structurer une activité durable.",
  defaultEbookUrl: process.env.NEXT_PUBLIC_EBOOK_URL || "https://example.com/ebook.pdf",
  trustPoints: [
    "Paiement Stripe sécurisé et facture unique par formation",
    "Accès membre par produit acheté avec dashboard dédié",
    "Contenus exploitables même sans vidéos : texte, PDF, ressources et modules à venir"
  ],
  faq: [
    {
      question: "À qui s'adressent ces formations ?",
      answer:
        "À des profils qui veulent vendre des compétences digitales utiles sans passer par des promesses irréalistes. Le contenu est centré sur l'exécution, la vente et la livraison."
    },
    {
      question: "Faut-il déjà être développeur ou technicien ?",
      answer:
        "Non. Les parcours sont pensés pour partir d'un niveau débutant motivé, avec une montée en compétence progressive et des livrables simples à vendre."
    },
    {
      question: "Y a-t-il déjà des vidéos ?",
      answer:
        "La plateforme accepte vidéos, PDF, ressources et contenu texte. Certains modules sont accessibles immédiatement, d'autres sont signalés comme bientôt disponibles."
    },
    {
      question: "L'accès est-il global ou par formation ?",
      answer:
        "Chaque achat débloque la formation correspondante. Un statut premium global peut aussi ouvrir l'ensemble de la plateforme si vous souhaitez gérer des accès spécifiques plus tard."
    }
  ],
  audiences: [
    "freelances en lancement",
    "techniciens ou profils support qui veulent vendre autrement",
    "créateurs de services digitaux simples et rentables",
    "personnes qui veulent une offre concrète, pas du blabla motivationnel"
  ],
  benefits: [
    "Catalogue de formations centré sur des offres vendables rapidement",
    "Espace membre propre avec contenus textes, PDF, ressources et modules à venir",
    "Paiement Stripe sécurisé, accès par produit acheté et évolution simple dans le temps"
  ]
} as const;
