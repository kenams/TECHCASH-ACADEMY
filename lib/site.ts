export const siteConfig = {
  brand: "TechCash Academy",
  shortBrand: "KAH-Digital",
  primaryProductSlug: "freelance-it-30-jours",
  headline: "Des formations digitales concretes pour lancer une activite rentable",
  description:
    "Plateforme de formations pour vendre des services digitaux utiles, signer ses premiers clients et structurer une activite durable.",
  defaultEbookUrl: process.env.NEXT_PUBLIC_EBOOK_URL || "https://example.com/ebook.pdf",
  faq: [
    {
      question: "A qui s'adressent ces formations ?",
      answer:
        "A des profils qui veulent vendre des competences digitales utiles sans passer par des promesses irrealistes. Le contenu est centre sur l'execution, la vente et la livraison."
    },
    {
      question: "Faut-il deja etre developpeur ou technicien ?",
      answer:
        "Non. Les parcours sont penses pour partir d'un niveau debutant motive, avec une montee en competence progressive et des livrables simples a vendre."
    },
    {
      question: "Y a-t-il deja des videos ?",
      answer:
        "La plateforme accepte videos, PDF, ressources et contenu texte. Certains modules sont accessibles immediatement, d'autres sont signales comme bientot disponibles."
    },
    {
      question: "L'acces est-il global ou par formation ?",
      answer:
        "Chaque achat debloque la formation correspondante. Un statut premium global peut aussi ouvrir l'ensemble de la plateforme si vous souhaitez gerer des acces specifiques plus tard."
    }
  ],
  audiences: [
    "freelances en lancement",
    "techniciens ou profils support qui veulent vendre autrement",
    "createurs de services digitaux simples et rentables",
    "personnes qui veulent une offre concrete, pas du blabla motivationnel"
  ],
  benefits: [
    "Catalogue de formations centre sur des offres vendables rapidement",
    "Espace membre propre avec contenus textes, PDF, ressources et modules a venir",
    "Paiement Stripe securise, acces par produit achete et evolution simple dans le temps"
  ]
} as const;
