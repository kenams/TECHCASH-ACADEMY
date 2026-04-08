import type { ProductModuleRecord, ProductRecord, ProductWithModules } from "@/lib/types";

function isoDate() {
  return new Date("2026-04-08T10:00:00.000Z").toISOString();
}

const now = isoDate();
const sampleVideos = {
  freelanceIt: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  landingPages: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  sitesWeb: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  outilsPme: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  mobileApps: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
} as const;

export const localProducts: ProductRecord[] = [
  {
    id: "local-freelance-it-30-jours",
    slug: "freelance-it-30-jours",
    title: "Devenir technicien informatique freelance sans diplome en 30 jours",
    subtitle: "L'offre principale pour lancer une activite IT rentable sans theatre",
    short_description:
      "Apprendre a lancer une activite freelance IT rentable sans diplome, avec methode, positionnement, acquisition client et livrables simples.",
    long_description:
      "Cette formation principale t'aide a structurer une activite freelance IT vendable rapidement. Tu y trouves le positionnement, les prestations les plus faciles a vendre, la maniere de parler a un client PME et des ressources concretes pour passer de l'idee a une offre qui tient la route.",
    price_cents: 5900,
    currency: "eur",
    stripe_price_id: "price_1TJrENGSZgm5QCNLNNJSXbQS",
    thumbnail_url:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    is_featured: true,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-landing-pages-rentables",
    slug: "landing-pages-rentables",
    title: "Creer des landing pages qui vendent",
    subtitle: "Une offre claire, simple a packager et facile a justifier",
    short_description:
      "Apprendre a concevoir, vendre et livrer des landing pages professionnelles pour des clients.",
    long_description:
      "Cette formation montre comment construire une offre de landing pages qui convertit vraiment, comment la vendre sans jargon inutile et comment livrer des pages propres, rapides et orientees business pour des clients qui veulent des resultats concrets.",
    price_cents: 4900,
    currency: "eur",
    stripe_price_id: "price_1TJrEOGSZgm5QCNLeTwUULYt",
    thumbnail_url:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-sites-web-clients",
    slug: "sites-web-clients",
    title: "Creer des sites web professionnels pour ses clients",
    subtitle: "Des sites simples a vendre, rapides a produire et propres a livrer",
    short_description:
      "Apprendre a creer des sites web modernes, simples a vendre et a livrer rapidement.",
    long_description:
      "Le programme est centre sur des sites clients utiles et sobres : cadrage du besoin, structure, livraison, maintenance et communication client. L'objectif est de rendre la prestation lisible, rentable et repetable.",
    price_cents: 5400,
    currency: "eur",
    stripe_price_id: "price_1TJrEPGSZgm5QCNLEAP6iWha",
    thumbnail_url:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-outils-pme-glpi",
    slug: "outils-pme-glpi",
    title: "Creer des outils metier pour PME, support et GLPI",
    subtitle: "Transformer un besoin interne en solution simple a vendre",
    short_description:
      "Apprendre a creer des outils concrets pour PME, support informatique et besoins metier internes, comme un outil support GLPI.",
    long_description:
      "Cette formation se concentre sur des outils a forte valeur percue : support, tickets, formulaires, tableaux de bord internes, micro-outils pour PME. Le but est de savoir transformer un probleme metier en produit ou en mission facturable.",
    price_cents: 6900,
    currency: "eur",
    stripe_price_id: "price_1TJrEQGSZgm5QCNLSgVsDabX",
    thumbnail_url:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-applications-mobiles-rentables",
    slug: "applications-mobiles-rentables",
    title: "Creer des applications mobiles simples et rentables",
    subtitle: "Concevoir une app monetisable sans partir sur un produit trop lourd",
    short_description:
      "Apprendre a concevoir et structurer une application mobile monetisable.",
    long_description:
      "Tu y trouves une methode pour cadrer une application mobile simple, definir une proposition de valeur claire, organiser les ecrans, poser la logique produit et envisager une monetisation realiste sans complexity inutile.",
    price_cents: 6200,
    currency: "eur",
    stripe_price_id: "price_1TJrERGSZgm5QCNLa5B2Z3BH",
    thumbnail_url:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  }
];

function module(
  productSlug: string,
  slug: string,
  title: string,
  description: string,
  content_type: ProductModuleRecord["content_type"],
  sort_order: number,
  extra?: Partial<ProductModuleRecord>
): ProductModuleRecord {
  const product = localProducts.find((item) => item.slug === productSlug);

  if (!product) {
    throw new Error(`Produit local introuvable pour ${productSlug}`);
  }

  return {
    id: `${product.id}-${slug}`,
    product_id: product.id,
    slug,
    title,
    description,
    content_type,
    content_url: extra?.content_url || null,
    content_body: extra?.content_body || null,
    is_published: extra?.is_published ?? true,
    sort_order,
    created_at: now,
    updated_at: now
  };
}

export const localProductModules: ProductModuleRecord[] = [
  module(
    "freelance-it-30-jours",
    "positionnement-offre",
    "Trouver un positionnement vendable",
    "Clarifier les prestations IT qui se vendent facilement et le langage a utiliser face a un prospect PME.",
    "text",
    1,
    {
      content_body:
        "Commence par une offre lisible : audit poste de travail, support a distance, installation et maintenance.\n\nLe but n'est pas d'impressionner avec un catalogue immense mais de rassurer avec un service simple, propre et directement compréhensible.\n\nDans ce module, tu poses ton terrain de jeu commercial, tes livrables et ta promesse de resultat."
    }
  ),
  module(
    "freelance-it-30-jours",
    "plan-30-jours-pdf",
    "Plan d'action 30 jours",
    "Le plan de demarrage en PDF avec les actions a realiser semaine par semaine.",
    "pdf",
    2,
    { content_url: "https://example.com/techcash/freelance-it-30-jours-plan.pdf" }
  ),
  module(
    "freelance-it-30-jours",
    "scripts-prospection",
    "Scripts de prospection et qualification",
    "Scripts de messages, scripts d'appel et canevas de qualification pour obtenir les premiers rendez-vous.",
    "resource",
    3,
    { content_url: "https://example.com/techcash/freelance-it-30-jours-scripts.zip" }
  ),
  module(
    "freelance-it-30-jours",
    "video-introduction",
    "Video explicative : lancer une offre freelance IT",
    "Une capsule d'introduction qui resitue le positionnement, les clients cibles et la logique commerciale de la formation.",
    "video",
    4,
    { content_url: sampleVideos.freelanceIt }
  ),
  module(
    "freelance-it-30-jours",
    "cas-clients-a-venir",
    "Cas clients et objections terrain",
    "Des exemples concrets de conversations, de cadrage et de vente seront ajoutes progressivement.",
    "coming_soon",
    5
  ),

  module(
    "landing-pages-rentables",
    "structure-qui-convertit",
    "Structure d'une landing page qui convertit",
    "Les blocs a utiliser, l'ordre, la preuve, le CTA et les erreurs qui plombent la conversion.",
    "text",
    1,
    {
      content_body:
        "Une landing page vend surtout par clarte.\n\nTu dois faire comprendre en quelques secondes le probleme traite, la promesse, les preuves et l'action attendue.\n\nDans ce module, tu apprends a construire un squelette vendable avant meme d'ouvrir ton outil de design."
    }
  ),
  module(
    "landing-pages-rentables",
    "checklist-livraison",
    "Checklist de livraison client",
    "Checklist PDF pour livrer une page propre, relire le copywriting et cadrer les allers-retours.",
    "pdf",
    2,
    { content_url: "https://example.com/techcash/landing-pages-livraison.pdf" }
  ),
  module(
    "landing-pages-rentables",
    "templates-blocs",
    "Templates de sections reutilisables",
    "Bibliotheque de sections hero, preuves, FAQ et CTA pour gagner du temps.",
    "resource",
    3,
    { content_url: "https://example.com/techcash/landing-pages-templates.zip" }
  ),
  module(
    "landing-pages-rentables",
    "video-introduction",
    "Video explicative : vendre une landing page rentable",
    "Une capsule qui pose la promesse commerciale, la structure attendue et le cadre de livraison d'une landing page client.",
    "video",
    4,
    { content_url: sampleVideos.landingPages }
  ),
  module(
    "landing-pages-rentables",
    "cas-a-b-testing",
    "Cas de tests et d'optimisation",
    "Une serie d'exemples d'avant / apres et d'idees d'optimisation sera ajoutee.",
    "coming_soon",
    5
  ),

  module(
    "sites-web-clients",
    "cadrage-site-client",
    "Cadrer un site client sans perdre du temps",
    "Questions de cadrage, architecture simple, priorites business et limites de projet a poser des le debut.",
    "text",
    1,
    {
      content_body:
        "Un site client devient vite improductif si le cadrage est flou.\n\nLe but est d'obtenir vite les bons elements : pages necessaires, objectifs, ton, CTA et contraintes techniques.\n\nTu apprendras a garder le projet simple et rentable."
    }
  ),
  module(
    "sites-web-clients",
    "brief-client-pdf",
    "Modele de brief client",
    "Un PDF de brief pour cadrer les demandes avant de produire.",
    "pdf",
    2,
    { content_url: "https://example.com/techcash/sites-web-clients-brief.pdf" }
  ),
  module(
    "sites-web-clients",
    "boite-a-outils-delivery",
    "Boite a outils de delivery",
    "Ressources pour hebergement, validation, recette et maintenance post-livraison.",
    "resource",
    3,
    { content_url: "https://example.com/techcash/sites-web-clients-delivery.zip" }
  ),
  module(
    "sites-web-clients",
    "video-introduction",
    "Video explicative : cadrer et vendre un site client",
    "Une capsule pour comprendre le type de projet, le niveau de sobriete attendu et la logique de livraison de la formation.",
    "video",
    4,
    { content_url: sampleVideos.sitesWeb }
  ),
  module(
    "sites-web-clients",
    "pack-maintenance",
    "Pack maintenance et evolution",
    "Le module sur les offres de maintenance sera complete avec scripts et devis.",
    "coming_soon",
    5
  ),

  module(
    "outils-pme-glpi",
    "problemes-metier-a-vendre",
    "Problemes metier simples a transformer en outil",
    "Identifier les irritants internes d'une PME et les transformer en besoins concretement facturables.",
    "text",
    1,
    {
      content_body:
        "Les bons outils internes resolvent un irritant clair : tickets, suivi, demandes, workflow ou reporting.\n\nCe module t'aide a traduire un probleme flou en solution simple et finie, donc en proposition commerciale credible."
    }
  ),
  module(
    "outils-pme-glpi",
    "schema-outil-pme",
    "Schema de cadrage d'un outil support",
    "Un PDF de cadrage pour auditer les besoins support et support GLPI.",
    "pdf",
    2,
    { content_url: "https://example.com/techcash/outils-pme-glpi-cadrage.pdf" }
  ),
  module(
    "outils-pme-glpi",
    "pack-ressources-support",
    "Ressources de support et GLPI",
    "Documents, canevas et exemples pour structurer un outil metier ou support.",
    "resource",
    3,
    { content_url: "https://example.com/techcash/outils-pme-glpi-ressources.zip" }
  ),
  module(
    "outils-pme-glpi",
    "video-introduction",
    "Video explicative : transformer un irritant PME en outil",
    "Une capsule pour voir comment partir d'un besoin support ou GLPI et le traduire en mission concrete et facturable.",
    "video",
    4,
    { content_url: sampleVideos.outilsPme }
  ),
  module(
    "outils-pme-glpi",
    "etudes-de-cas-a-venir",
    "Etudes de cas et mini-demos",
    "Des mini-cas reels de demandes PME et support seront ajoutes.",
    "coming_soon",
    5
  ),

  module(
    "applications-mobiles-rentables",
    "cadrer-une-app-simple",
    "Cadrer une application mobile simple",
    "Transformer une idee en application courte, monnayable et tenable techniquement.",
    "text",
    1,
    {
      content_body:
        "Une bonne application rentable ne commence pas par une liste infinie de features.\n\nElle commence par un probleme clair, une cible precise, un premier flux utile et un mode de monetisation realiste.\n\nTu vas cadrer cela avant d'ecrire du code."
    }
  ),
  module(
    "applications-mobiles-rentables",
    "wireframes-app",
    "Pack wireframes et structure de screens",
    "Pack PDF avec architecture de navigation et ecrans de base.",
    "pdf",
    2,
    { content_url: "https://example.com/techcash/applications-mobiles-wireframes.pdf" }
  ),
  module(
    "applications-mobiles-rentables",
    "ressources-monetisation",
    "Ressources monetisation et MVP",
    "Ressources pour monetiser, pre-vendre et tester une application mobile.",
    "resource",
    3,
    { content_url: "https://example.com/techcash/applications-mobiles-mvp.zip" }
  ),
  module(
    "applications-mobiles-rentables",
    "video-introduction",
    "Video explicative : cadrer une application mobile rentable",
    "Une capsule pour comprendre le type de MVP vise, la monetisation et le niveau de simplicite recherche.",
    "video",
    4,
    { content_url: sampleVideos.mobileApps }
  ),
  module(
    "applications-mobiles-rentables",
    "cas-d-usages-a-venir",
    "Cas d'usages et extensions futures",
    "Des cas supplementaires seront ajoutes pour aller vers un produit plus ambitieux.",
    "coming_soon",
    5
  )
];

const productSupplements = {
  "freelance-it-30-jours": {
    bestFor: [
      "profils support ou tech qui veulent vendre en independant",
      "debutants motives qui veulent une offre terrain simple",
      "personnes qui veulent vite structurer une premiere proposition commerciale"
    ],
    outcomes: [
      "une offre claire de prestations IT",
      "un plan de prospection concret",
      "des ressources pour vendre et livrer sans improviser"
    ],
    pitch:
      "La formation principale pour passer d'une competence IT floue a une activite freelance lisible et vendable."
  },
  "landing-pages-rentables": {
    bestFor: [
      "freelances web qui veulent une offre facile a cadrer",
      "profils marketing ou design qui veulent vendre du concret",
      "independants qui veulent livrer vite avec une forte valeur percue"
    ],
    outcomes: [
      "une methode de structure de page qui convertit",
      "un process de livraison client plus propre",
      "des templates reutilisables"
    ],
    pitch:
      "Une offre courte et rentable pour vendre des pages de conversion sans transformer chaque mission en projet interminable."
  },
  "sites-web-clients": {
    bestFor: [
      "freelances qui veulent standardiser leurs sites clients",
      "profils no-code ou code qui veulent un process de delivery plus propre",
      "vendeurs de sites vitrines et sites PME"
    ],
    outcomes: [
      "un cadrage plus rapide des demandes",
      "une offre de site plus lisible",
      "une livraison plus stable et plus rentable"
    ],
    pitch:
      "Le cadre pour transformer la prestation site web en offre simple, propre et facile a livrer."
  },
  "outils-pme-glpi": {
    bestFor: [
      "profils support / systeme qui veulent vendre plus que du support",
      "freelances qui veulent adresser des besoins internes PME",
      "personnes qui veulent structurer des mini-outils metier"
    ],
    outcomes: [
      "une logique de cadrage metier",
      "une offre autour du support et des outils internes",
      "des ressources pour transformer un irritant en mission facturable"
    ],
    pitch:
      "Une formation plus technique pour vendre des outils simples mais utiles a des PME qui ont de vrais irritants operationnels."
  },
  "applications-mobiles-rentables": {
    bestFor: [
      "profils produit ou freelance qui veulent lancer une app simple",
      "independants qui veulent cadrer un MVP monetisable",
      "createurs qui veulent partir d'un besoin clair plutot que d'une usine a gaz"
    ],
    outcomes: [
      "une structure d'application claire",
      "une logique de monetisation simple",
      "des ressources pour cadrer et pre-vendre un MVP"
    ],
    pitch:
      "Le programme pour cadrer une application mobile rentable sans partir sur un produit trop ambitieux des le jour 1."
  }
} as const;

export function getLocalActiveProducts() {
  return localProducts
    .filter((product) => product.is_active)
    .sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
}

export function getLocalFeaturedProduct() {
  return getLocalActiveProducts().find((product) => product.is_featured) || getLocalActiveProducts()[0] || null;
}

export function getLocalProductBySlug(slug: string) {
  return localProducts.find((product) => product.slug === slug) || null;
}

export function getLocalProductById(productId: string) {
  return localProducts.find((product) => product.id === productId) || null;
}

export function getLocalModulesByProductId(productId: string) {
  return localProductModules
    .filter((module) => module.product_id === productId)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function getLocalProductWithModulesBySlug(slug: string): ProductWithModules | null {
  const product = getLocalProductBySlug(slug);
  if (!product) {
    return null;
  }

  return {
    ...product,
    modules: getLocalModulesByProductId(product.id)
  };
}

export function findLocalProductByPurchaseName(productName: string) {
  return (
    localProducts.find((product) => product.title === productName) ||
    localProducts.find((product) => product.slug === productName) ||
    null
  );
}

export function getProductSupplement(slug: string) {
  return productSupplements[slug as keyof typeof productSupplements] || null;
}

export function getRelatedLocalProducts(slug: string, limit = 2) {
  const featured = getLocalFeaturedProduct();
  const ordered = getLocalActiveProducts().filter((product) => product.slug !== slug);

  if (featured && featured.slug !== slug) {
    const withoutFeatured = ordered.filter((product) => product.slug !== featured.slug);
    return [featured, ...withoutFeatured].slice(0, limit);
  }

  return ordered.slice(0, limit);
}
