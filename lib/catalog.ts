import type { ProductModuleRecord, ProductRecord, ProductWithModules } from "@/lib/types";
import {
  tradingProductModules,
  tradingProducts,
  tradingProductSupplements
} from "@/lib/catalog-trading";
import { newProducts, newProductModules } from "@/lib/catalog-new";

function isoDate() {
  return new Date("2026-04-08T10:00:00.000Z").toISOString();
}

const now = isoDate();
const sampleVideos = {
  freelanceIt: "/videos/formations/freelance-it-30-jours-overview.mp4",
  landingPages: "/videos/formations/landing-pages-rentables-overview.mp4",
  sitesWeb: "/videos/formations/sites-web-clients-overview.mp4",
  outilsPme: "/videos/formations/outils-pme-glpi-overview.mp4",
  mobileApps: "/videos/formations/applications-mobiles-rentables-overview.mp4",
  glpiSupport: "/videos/formations/glpi-support-pme-overview.mp4",
  maintenancePme: "/videos/formations/maintenance-informatique-pme-overview.mp4",
  appsMetier: "/videos/formations/apps-metier-supabase-overview.mp4",
  microsoft365: "/videos/formations/microsoft-365-pme-overview.mp4",
  cybersecurite: "/videos/formations/cybersecurite-pme-overview.mp4",
  automatisationN8n: "/videos/formations/automatisation-n8n-overview.mp4"
} as const;

export const localProducts: ProductRecord[] = [
  {
    id: "local-freelance-it-30-jours",
    slug: "freelance-it-30-jours",
    title: "Devenir technicien informatique freelance sans diplôme en 30 jours",
    subtitle: "L'offre principale pour lancer une activité IT rentable sans théâtre",
    short_description:
      "Apprendre à lancer une activité freelance IT rentable sans diplôme, avec méthode, positionnement, acquisition client et livrables simples.",
    long_description:
      "Cette formation principale t'aide à structurer une activité freelance IT vendable rapidement. Tu y trouves le positionnement, les prestations les plus faciles à vendre, la manière de parler à un client PME et des ressources concrètes pour passer de l'idée à une offre qui tient la route.",
    price_cents: 5900,
    currency: "eur",
    stripe_price_id: "price_1TJrENGSZgm5QCNLNNJSXbQS",
    thumbnail_url: "/visuals/formations/freelance-it-30-jours-cover.svg",
    is_active: true,
    is_featured: true,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-landing-pages-rentables",
    slug: "landing-pages-rentables",
    title: "Créer des landing pages qui vendent",
    subtitle: "Une offre claire, simple à packager et facile à justifier",
    short_description:
      "Apprendre à concevoir, vendre et livrer des landing pages professionnelles pour des clients.",
    long_description:
      "Cette formation montre comment construire une offre de landing pages qui convertit vraiment, comment la vendre sans jargon inutile et comment livrer des pages propres, rapides et orientées business pour des clients qui veulent des résultats concrets.",
    price_cents: 4900,
    currency: "eur",
    stripe_price_id: "price_1TJrEOGSZgm5QCNLeTwUULYt",
    thumbnail_url: "/visuals/formations/landing-pages-rentables-cover.svg",
    is_active: false,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-sites-web-clients",
    slug: "sites-web-clients",
    title: "Créer des sites web professionnels pour ses clients",
    subtitle: "Des sites simples à vendre, rapides à produire et propres à livrer",
    short_description:
      "Apprendre à créer des sites web modernes, simples à vendre et à livrer rapidement.",
    long_description:
      "Le programme est centré sur des sites clients utiles et sobres : cadrage du besoin, structure, livraison, maintenance et communication client. L'objectif est de rendre la prestation lisible, rentable et répétable.",
    price_cents: 5400,
    currency: "eur",
    stripe_price_id: "price_1TJrEPGSZgm5QCNLEAP6iWha",
    thumbnail_url: "/visuals/formations/sites-web-clients-cover.svg",
    is_active: false,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-outils-pme-glpi",
    slug: "outils-pme-glpi",
    title: "Créer des outils métier pour PME, support et GLPI",
    subtitle: "Transformer un besoin interne en solution simple à vendre",
    short_description:
      "Apprendre à créer des outils concrets pour PME, support informatique et besoins métier internes, comme un outil support GLPI.",
    long_description:
      "Cette formation se concentre sur des outils à forte valeur perçue : support, tickets, formulaires, tableaux de bord internes, micro-outils pour PME. Le but est de savoir transformer un problème métier en produit ou en mission facturable.",
    price_cents: 6900,
    currency: "eur",
    stripe_price_id: "price_1TJrEQGSZgm5QCNLSgVsDabX",
    thumbnail_url: "/visuals/formations/outils-pme-glpi-cover.svg",
    is_active: false,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-applications-mobiles-rentables",
    slug: "applications-mobiles-rentables",
    title: "Créer des applications mobiles simples et rentables",
    subtitle: "Concevoir une app monétisable sans partir sur un produit trop lourd",
    short_description:
      "Apprendre à concevoir et structurer une application mobile monétisable.",
    long_description:
      "Tu y trouves une méthode pour cadrer une application mobile simple, définir une proposition de valeur claire, organiser les écrans, poser la logique produit et envisager une monétisation réaliste sans complexité inutile.",
    price_cents: 6200,
    currency: "eur",
    stripe_price_id: "price_1TJrERGSZgm5QCNLa5B2Z3BH",
    thumbnail_url: "/visuals/formations/applications-mobiles-rentables-cover.svg",
    is_active: false,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-glpi-support-pme",
    slug: "glpi-support-pme",
    title: "Déployer GLPI et structurer un support interne pour PME",
    subtitle: "Installer un support propre, simple à vendre et utile dès la première semaine",
    short_description:
      "Apprendre à cadrer, déployer et faire adopter GLPI dans une PME sans transformer le projet en usine à gaz.",
    long_description:
      "Cette formation te montre comment transformer un besoin flou de support interne en dispositif clair : tickets, catégories, SLA simples, base de connaissances, automatisations utiles et reporting compréhensible par le dirigeant.",
    price_cents: 6500,
    currency: "eur",
    stripe_price_id: null,
    thumbnail_url: "/visuals/formations/glpi-support-pme-cover.svg",
    is_active: false,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-maintenance-informatique-pme",
    slug: "maintenance-informatique-pme",
    title: "Vendre et livrer une offre de maintenance informatique pour PME",
    subtitle: "Forfaits, routines, reporting et rétention sans improviser",
    short_description:
      "Apprendre à vendre une maintenance claire à des TPE/PME et à la livrer de manière répétable.",
    long_description:
      "Le programme structure une vraie offre de maintenance : promesse commerciale, périmètre, onboarding, visites préventives, reporting, relances et renouvellement. L'objectif est de créer un revenu récurrent propre et défendable.",
    price_cents: 5800,
    currency: "eur",
    stripe_price_id: null,
    thumbnail_url: "/visuals/formations/maintenance-informatique-pme-cover.svg",
    is_active: false,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-apps-metier-supabase",
    slug: "apps-metier-supabase",
    title: "Créer des applications métier simples avec Supabase",
    subtitle: "Des apps utiles, livrables vite et faciles à maintenir",
    short_description:
      "Apprendre à cadrer et produire une application métier simple avec base de données, auth, rôles et livraison propre.",
    long_description:
      "Cette formation s'adresse aux profils qui veulent livrer des apps métier crédibles sans partir sur une architecture trop lourde. Tu y trouves le cadrage, le schéma de données, l'authentification, les rôles, le back-office et la logique de mise en production.",
    price_cents: 6800,
    currency: "eur",
    stripe_price_id: null,
    thumbnail_url: "/visuals/formations/apps-metier-supabase-cover.svg",
    is_active: false,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-microsoft-365-pme",
    slug: "microsoft-365-pme",
    title: "Déployer Microsoft 365 en PME et en faire une offre facturable",
    subtitle: "Migration, formation utilisateurs et revenu récurrent sur M365",
    short_description:
      "Apprendre à déployer Microsoft 365 en PME, structurer une offre de migration reproductible et facturer l'accompagnement utilisateurs.",
    long_description:
      "Cette formation structure une offre de déploiement M365 complète : audit de l'existant, migration des boîtes mail, configuration SharePoint et Teams, formation utilisateurs et contrat de support. L'objectif est de transformer chaque déploiement en mission récurrente défendable.",
    price_cents: 5900,
    currency: "eur",
    stripe_price_id: null,
    thumbnail_url: "/visuals/formations/microsoft-365-pme-cover.svg",
    is_active: false,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-cybersecurite-pme",
    slug: "cybersecurite-pme",
    title: "Sécuriser une PME et vendre une offre cybersécurité accessible",
    subtitle: "Protéger les postes, les accès et les données sans devenir expert ANSSI",
    short_description:
      "Apprendre à auditer, sécuriser et vendre une offre cybersécurité claire à des PME sans jargon et sans sur-ingénierie.",
    long_description:
      "Cette formation structure une offre cybersécurité réaliste pour des PME : audit basique, sécurisation des postes et des accès, sauvegarde, sensibilisation des équipes et contrat de suivi. L'objectif est de vendre une protection crédible et défendable sans prétendre être un prestataire grand compte.",
    price_cents: 6400,
    currency: "eur",
    stripe_price_id: null,
    thumbnail_url: "/visuals/formations/cybersecurite-pme-cover.svg",
    is_active: false,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-automatisation-n8n",
    slug: "automatisation-n8n",
    title: "Automatiser les tâches répétitives avec n8n et en faire une offre",
    subtitle: "Workflows, intégrations et revenus récurrents sans développement lourd",
    short_description:
      "Apprendre à créer des automatisations utiles avec n8n et à les vendre comme offre de service à des PME et des indépendants.",
    long_description:
      "Cette formation t'apprend à identifier les tâches automatisables, à créer des workflows n8n clairs et maintenables, et à packager l'automatisation comme une offre de service récurrente. Tu y trouveras des cas d'usage concrets, des connexions aux outils courants et une logique pour facturer l'automatisation de manière défendable.",
    price_cents: 6100,
    currency: "eur",
    stripe_price_id: null,
    thumbnail_url: "/visuals/formations/automatisation-n8n-cover.svg",
    is_active: false,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-agent-ia-autonome",
    slug: "agent-ia-autonome",
    title: "Créer son Agent IA autonome et le monétiser",
    subtitle: "De zéro à un agent opérationnel avec mémoire, outils et autonomie réelle",
    short_description:
      "Apprendre à construire un agent IA autonome avec mémoire persistante, outils connectés et capacité d'action réelle — puis le vendre ou l'utiliser comme levier business.",
    long_description:
      "Cette formation te montre comment construire un vrai agent IA — pas un chatbot, un agent qui agit, mémorise, décide et s'améliore. Tu apprendras à choisir ton LLM, configurer la mémoire persistante, connecter des outils (MCP, API, base de données), automatiser des tâches complexes et packager tout ça comme offre de service ou outil interne. Basé sur un cas réel opérationnel.",
    price_cents: 9700,
    currency: "eur",
    stripe_price_id: "price_1ThQNhGSZgm5QCNLGLOTxwOX",
    thumbnail_url: "/visuals/formations/agent-ia-autonome-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-prospection-automatisee",
    slug: "prospection-automatisee",
    title: "Prospecter 100 clients par jour en automatique",
    subtitle: "L'outil, la méthode et les scripts pour une prospection B2B qui tourne sans toi",
    short_description:
      "Construire un système de prospection automatisée qui contacte 100 à 150 entreprises par jour, qualifie les réponses et remplit ton agenda — basé sur un outil réel en production.",
    long_description:
      "Cette formation te montre comment construire et déployer un vrai système de prospection automatisée : scraping de leads qualifiés, personnalisation des messages, envoi automatique, suivi des réponses et relances. Basé sur un outil réel qui tourne en production et génère des contacts qualifiés chaque jour sans intervention manuelle.",
    price_cents: 7700,
    currency: "eur",
    stripe_price_id: "price_1ThQNiGSZgm5QCNLzlNMe0L0",
    thumbnail_url: "/visuals/formations/prospection-automatisee-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-agence-digitale-ia",
    slug: "agence-digitale-ia",
    title: "Lancer une agence digitale avec des agents IA",
    subtitle: "Positionner, vendre et livrer des prestations digitales avec l'IA comme levier principal",
    short_description:
      "Créer une agence digitale lean et rentable en utilisant les agents IA pour livrer plus vite, prospecter automatiquement et scaler sans recruter.",
    long_description:
      "Cette formation te montre comment structurer une agence digitale moderne où les agents IA font le travail lourd : prospection, production de contenu, développement, support client. Tu apprendras à positionner ton offre, trouver tes premiers clients, livrer avec des process IA et construire une structure qui scale sans dépendre d'une équipe.",
    price_cents: 9700,
    currency: "eur",
    stripe_price_id: "price_1ThQNiGSZgm5QCNLpNPqmGws",
    thumbnail_url: "/visuals/formations/agence-digitale-ia-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  ...tradingProducts,
  ...newProducts
];

localProducts.forEach((product) => {
  product.category ??= "it";
});

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
    "Positionnement et offre commerciale",
    "Construire une offre IT lisible et vendable dès le premier contact client. Les 3 formats qui se signent le plus vite et comment rédiger ta phrase de positionnement.",
    "text",
    1,
    {
      content_body:
        "## Construire une offre IT vendable en 2026\n\nLe problème de la plupart des techniciens freelance est simple : ils proposent \"tout\". Réseau, dev, téléphonie, cybersécurité, support... Le client ne retient rien et ne rappelle pas.\n\n**La règle d'or** : une offre qui tient en une phrase se signe. Une offre qui demande une explication se perd.\n\n### Les 3 offres qui se signent le plus vite\n\n- **Dépannage urgent** : intervention dans les 4h, facturation à la demi-journée, clientèle : TPE et indépendants\n- **Audit poste de travail** : 90 minutes sur site, livrable écrit, prix fixe entre 180 € et 290 €\n- **Maintenance préventive mensuelle** : forfait 150–350 €/mois par site, 3–5 visites annuelles + support à distance\n\n> Ces 3 formats couvrent 80 % des demandes réelles que tu recevras de PME et TPE en 2026.\n\n### Rédiger ta phrase de positionnement\n\nVoici le modèle à remplir :\n\n**\"Je [service principal] pour [type de client] à [zone géographique], [promesse différenciante].\"**\n\nExemples concrets :\n- \"Je dépanne et optimise les postes de travail des artisans et commerces de ma ville, avec une intervention garantie sous 4h.\"\n- \"J'installe et maintiens les infrastructures réseau des cabinets médicaux en région, avec un contrat de maintenance simple et lisible.\"\n\n---\n\n### Ce que tu dois décider avant de prospecter\n\nAvant de contacter le moindre client, fixe ces 4 points :\n\n- **Secteur principal** : généraliste ou spécialisé (médical, bâtiment, restauration...)\n- **Zone géographique** : 30 km maximum pour démarrer, on élargit ensuite\n- **Format de facturation** : TJM ou forfait ? Les deux marchent, mais le forfait rassure plus les PME\n- **Canal de contact** : email à froid, LinkedIn, bouche-à-oreille, annuaire local\n\n### Chiffres de référence 2026\n\n- TJM technicien IT généraliste (province) : **280–420 €/jour**\n- TJM technicien IT spécialisé (médical, juridique) : **380–560 €/jour**\n- Forfait maintenance mensuelle PME 10 postes : **200–450 €/mois**\n- Ticket de dépannage urgent (demi-journée) : **150–280 €**\n\n> Ne bradez pas dès le départ. Un prix trop bas signale un problème de confiance, pas un avantage commercial."
    }
  ),
  module(
    "freelance-it-30-jours",
    "video-introduction",
    "Le marché IT freelance en France en 2026",
    "Chiffres clés, secteurs porteurs, directive NIS2, migration Windows 10/11 — comprendre pourquoi la demande n'a jamais été aussi forte pour les techniciens indépendants.",
    "text",
    2,
    {
      content_body:
        "## Le marché IT freelance en France en 2026\n\n### Un marché en croissance structurelle\n\nLa demande de support IT externalisé n'a jamais été aussi forte dans les TPE et PME. Trois facteurs structurels expliquent cette tendance :\n\n- **La numérisation forcée post-Covid** : des dizaines de milliers de commerces et artisans ont adopté des outils digitaux sans les maîtriser\n- **Le coût d'un salarié IT interne** : entre 42 000 € et 65 000 € chargés par an, inaccessible pour une structure de moins de 20 personnes\n- **La cybersécurité devenue obligatoire** : la directive NIS2 (entrée en vigueur en 2024) contraint les entreprises à sécuriser leur infrastructure, même petite\n\n> En 2026, 7 PME sur 10 en France n'ont aucun référent IT interne. C'est ton marché.\n\n### Les secteurs les plus accessibles\n\n- **Artisans et commerçants** (plombiers, électriciens, boulangers, coiffeurs) : 2–4 postes, besoin de maintenance simple et rapide\n- **Professions libérales** (médecins, notaires, comptables) : besoin fort de conformité RGPD et de sauvegarde sécurisée\n- **Restauration et hôtellerie** : caisse enregistreuse, réseau Wi-Fi, TPE, écrans de commande\n- **Petites agences** (communication, immobilier) : 5–15 postes, outils cloud, accès à distance\n\n### Ce que les clients veulent vraiment\n\nPas le technicien le plus compétent. Celui qui :\n\n- **Répond vite** : le premier à répondre signe souvent le devis\n- **Explique simplement** : pas de jargon, un problème = une solution = un prix\n- **Revient** : la fidélisation d'un client IT coûte 5x moins cher que d'en acquérir un nouveau\n- **Facture clairement** : un devis en 2 lignes vaut mieux qu'un document de 6 pages\n\n---\n\n### Les demandes les plus fréquentes en 2026\n\n- **Windows 11** : migration depuis Windows 10 (fin de support en octobre 2025, vague de demandes massive en cours)\n- **Microsoft 365** : installation, migration boîtes mail, partage de fichiers SharePoint\n- **NAS Synology / QNAP** : sauvegarde locale + cloud pour remplacer les disques USB\n- **Pare-feu pfSense / OPNsense** : sécurisation des réseaux PME\n- **Antivirus EDR** : remplacement des antivirus classiques (Bitdefender GravityZone, SentinelOne)\n\n> La migration Windows 10 → Windows 11 représente à elle seule des millions de postes à traiter en France en 2025–2026. C'est une opportunité massive pour démarrer maintenant.\n\n### Freelance vs DSI externalisée : où tu te positionnes\n\nUne DSI externalisée classique facture 600–1 200 €/mois pour une PME. Elle répond en 48h et dépêche un technicien junior.\n\nToi, tu factures moins, tu réponds en 2h, et tu es sur place le jour même. Pour une PME de 10 personnes, tu gagnes à tous les niveaux. **C'est cet écart de réactivité que tu dois vendre.**"
    }
  ),
  module(
    "freelance-it-30-jours",
    "plan-30-jours-pdf",
    "Plan d'action 30 jours — semaine par semaine",
    "Le programme complet pour passer de zéro à tes premiers clients en 30 jours : structure légale, identité commerciale, prospection, premières missions et fidélisation.",
    "text",
    3,
    {
      content_body:
        "## Plan d'action 30 jours : de zéro à tes premiers clients IT\n\nCe plan est conçu pour être exécuté en parallèle d'une autre activité. Il ne demande pas 8h/jour — il demande de la régularité sur 4 semaines.\n\n---\n\n### Semaine 1 — Poser les bases légales et commerciales\n\n**Jour 1–2 : Structure juridique**\n- Créer sa micro-entreprise sur `autoentrepreneur.urssaf.fr` (10 minutes, gratuit)\n- Code APE recommandé : **6209Z** (autres activités informatiques)\n- Franchise de TVA si CA < 37 500 €/an — sinon opter pour la TVA dès le départ\n\n**Jour 3–4 : Identité commerciale**\n- Choisir un nom commercial simple (ex : \"TechSupport Prénom\" ou \"Ville IT Services\")\n- Créer une adresse email professionnelle (Zoho Mail, 2 €/mois)\n- Ouvrir un compte bancaire professionnel (Shine, Qonto ou Revolut Business)\n\n**Jour 5–7 : Tarifs et outils de facturation**\n- Fixer son TJM et ses tarifs forfaitaires (voir module Tarification)\n- Créer un compte sur **Indy** ou **Facture.net** pour les devis et factures conformes\n- Préparer un devis modèle en PDF\n\n> À la fin de la semaine 1, tu as une structure légale, une identité et un outil de facturation. Tu peux signer un client.\n\n---\n\n### Semaine 2 — Premiers contacts et prospection\n\n**Jour 8–9 : Ton réseau proche**\n- Lister 20 personnes dans ton entourage qui ont ou connaissent des TPE\n- Envoyer un message simple : \"Je lance une activité de support IT pour les petites entreprises. Tu connais quelqu'un qui aurait besoin d'aide ?\"\n\n**Jour 10–11 : Prospection locale physique**\n- Identifier 30 commerces et artisans dans un rayon de 5 km\n- Passer les voir avec une carte de visite et une phrase d'accroche (voir module Scripts)\n- Objectif : 5 rendez-vous pris, pas 5 ventes signées\n\n**Jour 12–14 : Présence en ligne minimale**\n- Profil LinkedIn complet avec ton positionnement en titre\n- Fiche Google Business (gratuit, 15 minutes) pour apparaître dans les recherches locales\n- Optionnel : une page Malt pour les demandes entrantes\n\n---\n\n### Semaine 3 — Premiers devis et premières missions\n\n**Jour 15–17 : Qualifier les prospects**\n- Appeler les contacts pris en semaine 2\n- Poser 3 questions : Quel est le problème ? Combien de postes ? Quel est le budget approximatif ?\n- Envoyer un devis dans les 24h après chaque entretien\n\n**Jour 18–20 : Exécuter ta première mission**\n- Arriver à l'heure, en tenue propre\n- Documenter ce que tu fais (photos avant/après, liste des actions)\n- Livrer un compte-rendu écrit d'une page, même pour une intervention simple\n\n**Jour 21 : Demander un témoignage**\n- \"Est-ce que tu serais d'accord pour laisser un avis Google ?\"\n- 80 % des clients satisfaits acceptent si tu le demandes dans la foulée\n\n---\n\n### Semaine 4 — Ancrer les habitudes et préparer la suite\n\n**Jour 22–24 : Systèmes et process**\n- Créer un tableau de suivi client simple (Notion ou Google Sheets)\n- Règle de relance : tout devis non signé après 5 jours = un appel\n- Configurer des rappels de maintenance préventive pour tes premiers clients\n\n**Jour 25–27 : Développer le bouche-à-oreille**\n- Rejoindre 2–3 groupes Facebook locaux de commerçants / entrepreneurs\n- Proposer un bilan rapide gratuit (15 min) à un client satisfait pour encourager la recommandation\n\n**Jour 28–30 : Bilan et ajustements**\n- Compter tes devis envoyés, signés, perdus\n- Identifier ce qui a le mieux fonctionné pour prospecter\n- Fixer tes objectifs du mois 2 : CA cible, nombre de clients récurrents\n\n---\n\n> **Objectif réaliste mois 1** : 2 à 4 clients, 800 € à 2 000 € de CA. Ce n'est pas un revenu de remplacement — c'est une base solide pour le mois 2."
    }
  ),
  module(
    "freelance-it-30-jours",
    "scripts-prospection",
    "Scripts de prospection et qualification",
    "Textes testés sur le terrain pour prendre contact, qualifier au téléphone et gérer les 5 objections les plus fréquentes. Adaptables à ta région et ton style.",
    "text",
    4,
    {
      content_body:
        "## Scripts de prospection et qualification\n\nCes scripts ont été testés sur le terrain. Adapte-les à ta région et ton style — l'important est la structure, pas les mots exacts.\n\n---\n\n### Script de prise de contact physique (commerce / artisan)\n\n**Contexte** : tu entres dans un commerce local pour te présenter.\n\n> \"Bonjour, je me permets de passer rapidement — je suis technicien informatique indépendant, je travaille avec des commerces et artisans de la région pour dépanner les postes, les caisses et les réseaux. Je laisse ma carte. Si un jour vous avez un souci informatique, appelez-moi directement, j'interviens en général dans la journée.\"\n\n**Ce qui fonctionne dans ce script** :\n- Court (20 secondes maximum)\n- Pas de question intrusive\n- La carte de visite laisse une trace physique\n- \"dans la journée\" = réactivité, c'est le vrai différenciateur\n\n---\n\n### Script email à froid (PME, professions libérales)\n\n**Objet** : Support informatique pour [Nom de l'entreprise]\n\n> Bonjour [Prénom],\n>\n> Je suis technicien IT freelance basé à [Ville]. Je travaille avec des [type d'entreprise] pour assurer le support informatique de proximité : dépannage rapide, maintenance préventive, sécurisation des postes et des sauvegardes.\n>\n> Seriez-vous disponible 15 minutes cette semaine pour échanger ? Je peux me déplacer ou faire un appel selon votre préférence.\n>\n> [Ton prénom] — [Numéro de téléphone]\n\n**Taux de réponse constaté** : 8 à 15 % selon le secteur. Les professions libérales répondent mieux que les artisans à l'email.\n\n---\n\n### Script de qualification au téléphone\n\nQuand un prospect rappelle ou accepte un appel, pose ces 4 questions dans cet ordre :\n\n**1. \"Qu'est-ce qui se passe en ce moment côté informatique ?\"**\n— Laisse-le parler. Note les mots qu'il utilise.\n\n**2. \"Vous avez combien de postes en tout ?\"**\n— En dessous de 5 : dépannage ponctuel. Au-dessus : penser forfait maintenance.\n\n**3. \"Est-ce que vous avez déjà travaillé avec un technicien informatique ?\"**\n— Si oui : \"Qu'est-ce qui s'est bien passé ? Moins bien ?\" — tu sauras exactement ce qu'il veut.\n— Si non : rassurer et éduquer sur le format d'intervention.\n\n**4. \"Quel est votre timing ?\"**\n— \"C'est urgent\" → propose une intervention demain. Prix majoré OK.\n— \"Pas pressé\" → propose un rendez-vous de diagnostic.\n\n> Ne parle pas de prix pendant la qualification. Le prix vient après avoir compris le besoin — jamais avant.\n\n---\n\n### Gérer les 5 objections les plus fréquentes\n\n**\"C'est trop cher.\"**\n— \"Par rapport à quoi exactement ? Si vous comparez à quelqu'un qui facture moins, la question c'est : est-ce qu'il intervient le jour même quand votre système tombe ?\"\n\n**\"On a déjà quelqu'un.\"**\n— \"Très bien. Est-ce qu'il est disponible rapidement en cas d'urgence ? Je peux être un backup si besoin.\"\n\n**\"Je vais y réfléchir.\"**\n— \"Bien sûr. Juste pour mieux revenir vers vous : c'est plutôt une question de timing ou de budget ?\"\n\n**\"On se débrouille tout seuls.\"**\n— \"Je comprends. La plupart de mes clients me disaient la même chose avant leur première panne. Je vous laisse ma carte pour ce jour-là.\"\n\n**\"Envoyez-moi un email.\"**\n— Envoie dans les 2h. Relance 5 jours après si pas de réponse."
    }
  ),
  module(
    "freelance-it-30-jours",
    "tarification-devis",
    "Tarification, devis et facturation",
    "Grille tarifaire complète 2026, structure d'un devis professionnel, outils de facturation recommandés et techniques pour défendre ton prix sans brader.",
    "text",
    5,
    {
      content_body:
        "## Tarification, devis et facturation\n\n### Fixer ses tarifs : la bonne logique\n\nNe fixe pas tes tarifs en fonction de ce que tu \"mérites\" — fixe-les en fonction de ce que le client perd s'il n'a pas de solution.\n\nUne PME qui perd sa connexion internet un jeudi matin perd en moyenne 800 € à 2 000 € de productivité par heure. Ton intervention à 280 € est une évidence.\n\n---\n\n### Grille tarifaire de référence 2026\n\n**Dépannage à distance**\n- Durée : 30–60 minutes\n- Tarif : 65–95 € l'heure, minimum de facturation 1h\n\n**Dépannage sur site (demi-journée)**\n- Durée : 3–4 heures\n- Tarif : 180–280 € selon zone et complexité\n- Frais de déplacement si > 15 km : 0,45 €/km\n\n**Audit informatique**\n- Durée : 90 minutes sur site + livrable écrit\n- Tarif : 220–350 €\n- Ce qui le justifie : rapport de 2–3 pages avec priorités et recommandations chiffrées\n\n**Installation poste de travail**\n- Installation OS + logiciels métier + configuration : 120–180 €/poste\n- Migration Windows 10 → Windows 11 : 95–150 €/poste\n\n**Forfait maintenance mensuelle**\n- 1 à 5 postes : 90–180 €/mois\n- 6 à 15 postes : 200–420 €/mois\n- Inclut : 1 visite préventive/trimestre + support à distance illimité + rapport mensuel\n\n> **Règle d'or** : un forfait maintenance doit couvrir au minimum 1,5 jours de travail par mois. En dessous, tu travailles à perte.\n\n---\n\n### Structure d'un devis professionnel\n\nUn bon devis tient sur une page. Voici la structure :\n\n- **En-tête** : ton nom/société, SIRET, adresse, email, téléphone\n- **Coordonnées client** : nom, adresse\n- **Numéro et date du devis**\n- **Objet** : une ligne claire (\"Intervention dépannage réseau — 1 demi-journée\")\n- **Détail des prestations** : ligne par ligne, quantité × prix unitaire\n- **Total HT** + mention TVA (ou \"TVA non applicable — article 293B du CGI\" si franchise)\n- **Conditions de paiement** : 30 % à la commande recommandé pour les missions > 300 €\n- **Validité** : 30 jours\n\n**Outils recommandés** :\n- **Indy** : idéal auto-entrepreneur, comptabilité intégrée, 9,99 €/mois\n- **Facture.net** : gratuit, simple, conforme\n- **Pennylane** : si tu veux déléguer la comptabilité plus tard\n\n---\n\n### Défendre ton prix sans brader\n\n**Ne pas brader les premières missions.** Un premier client payé 50 % moins cher que ton tarif normal n'attendra pas ton tarif normal — il demandera la même remise la prochaine fois.\n\nSi un client hésite :\n- Proposer un paiement en 2 fois sans frais\n- Réduire le périmètre (pas le prix) : \"Je peux faire uniquement les 3 postes prioritaires cette semaine.\"\n- Offrir une garantie de résultat : \"Si le problème revient sous 30 jours, j'interviens sans frais supplémentaires.\""
    }
  ),
  module(
    "freelance-it-30-jours",
    "outils-technicien-2026",
    "Les outils indispensables du technicien IT en 2026",
    "Stack complète testée : accès à distance, gestion des tickets, cybersécurité EDR, sauvegarde NAS/cloud, facturation et image professionnelle. Ce que tu dois avoir avant ta première mission.",
    "text",
    6,
    {
      content_body:
        "## Les outils indispensables du technicien IT freelance en 2026\n\nUn bon technicien IT freelance travaille avec des outils professionnels. Voici la stack complète recommandée, testée sur le terrain.\n\n---\n\n### Accès à distance\n\n**AnyDesk** (recommandé)\n- Gratuit en usage personnel, 14,90 €/mois en professionnel\n- Plus rapide que TeamViewer sur connexions lentes\n- Sessions non surveillées avec mot de passe permanent\n\n**Remote Desktop (RDP) natif Windows**\n- Gratuit, intégré à Windows Pro\n- À configurer avec un VPN — ne jamais ouvrir le port 3389 directement sur internet\n- Idéal pour les clients sur Microsoft 365 avec Azure AD\n\n> Ne jamais ouvrir le port RDP (3389) directement sur internet. Toujours passer par un VPN ou un tunnel SSH.\n\n---\n\n### Gestion des tickets et suivi client\n\n**Freshdesk** (gratuit jusqu'à 10 agents)\n- Centralise toutes les demandes par email\n- Envoie des rapports d'intervention automatiques\n- Interface propre et intuitive pour les clients\n\n**Notion** (pour démarrer)\n- Tableau de suivi client simple\n- Templates pour les rapports d'intervention\n- Gratuit jusqu'à usage personnel\n\n---\n\n### Cybersécurité et diagnostic\n\n**Bitdefender GravityZone** (EDR PME)\n- Console cloud centralisée pour gérer plusieurs clients\n- Licence revendeur disponible : 8–12 €/poste/an\n- Indispensable pour remplacer les antivirus classiques\n\n**CrystalDiskInfo**\n- Diagnostic santé des disques durs et SSD\n- Gratuit et portable (pas d'installation requise)\n- À lancer systématiquement lors de tout audit poste\n\n**HWiNFO64**\n- Relevé complet matériel : CPU, RAM, températures, SMART\n- Gratuit et portable\n- Indispensable pour les rapports d'audit\n\n---\n\n### Sauvegarde et récupération\n\n**Synology DiskStation** (NAS sur site)\n- Gamme DS223 ou DS423+ recommandée pour les PME 5–20 postes\n- Combine sauvegarde locale + Synology C2 Cloud\n- Prix matériel : 300–600 €, disques en supplément\n\n**Veeam Agent for Windows** (gratuit)\n- Sauvegarde complète ou incrémentale du système\n- Restore bare-metal en cas de panne totale\n- Compatible avec les NAS Synology\n\n**Backblaze B2**\n- Stockage cloud à 6 $/To/mois (10x moins cher que AWS S3)\n- S'intègre à Veeam et à la plupart des solutions de backup\n\n---\n\n### Facturation et paiement\n\n**Indy** (anciennement Georges)\n- Comptabilité automatisée pour auto-entrepreneurs\n- Catégorisation automatique des dépenses\n- 9,99 €/mois\n\n**SumUp** (paiement sur site)\n- Lecteur de carte physique à 39 €\n- 1,69 % par transaction, sans abonnement\n- Idéal pour les interventions chez les artisans\n\n---\n\n### Image professionnelle\n\n**Zoho Mail** (2,70 €/mois)\n- Adresse email toi@tondomaine.fr\n- Indispensable pour paraître professionnel dès le premier email\n\n**Google Business Profile** (gratuit)\n- Fiche entreprise sur Google Maps\n- Permet aux clients de te trouver et de laisser des avis\n- Référencement local : essentiel en 2026\n\n**Canva** (gratuit)\n- Créer une carte de visite en 15 minutes\n- Impression via Vistaprint : 250 cartes pour 15 €\n\n> **À retenir** : investis dans les outils avant d'investir dans la communication. Un technicien bien outillé résout 2x plus vite, fidélise mieux, et inspire plus confiance au premier rendez-vous."
    }
  ),
  module(
    "freelance-it-30-jours",
    "cas-clients-terrain",
    "Cas clients terrain et gestion des objections avancées",
    "3 scénarios réels : PME en panique, client qui ne paye pas, mission qui dérape. Comment gérer, facturer et en sortir proprement.",
    "text",
    7,
    {
      content_body:
        "## Cas clients terrain : 3 scénarios réels\n\nCes situations arrivent. Mieux vaut les avoir lues avant de les vivre.\n\n---\n\n### Cas 1 — La PME en panique\n\n**Situation** : Le gérant t'appelle à 8h30. \"Personne ne peut ouvrir ses fichiers. On a une réunion client à 10h.\"\n\n**Ce que tu fais** :\n1. Calmer immédiatement : \"Je comprends, on va gérer ça. Je suis disponible maintenant.\"\n2. Diagnostiquer à distance en premier (5 minutes) avant de te déplacer\n3. Identifier la cause : ransomware, serveur HS, problème réseau, disque mort\n4. Si déplacement nécessaire : annoncer un tarif d'urgence **majoré de 30–50 %** avant d'arriver\n\n**Ce qu'il ne faut pas faire** :\n- Promettre de régler en 30 minutes si tu ne sais pas encore ce que c'est\n- Aller sur place sans annoncer les frais supplémentaires\n- Paniquer à la place du client\n\n**Facturation** : Intervention d'urgence = tarif majoré. Tu peux facturer 250–400 € pour une demi-journée d'urgence, même si le problème est résolu en 1h. La valeur, c'est la disponibilité immédiate.\n\n---\n\n### Cas 2 — Le client qui ne paye pas\n\n**Situation** : Tu as livré une installation M365 sur 12 postes il y a 45 jours. Devis signé à 1 480 €. Aucun paiement, aucune réponse aux relances email.\n\n**Protocole de relance** :\n\n**Jour 30** : Email de rappel simple\n> \"Objet : Facture [N°] en attente de règlement\"\n> \"Je me permets de vous relancer pour la facture [N°] du [date]. N'hésitez pas si vous avez un problème ou une question. Règlement par virement ou chèque selon vos préférences.\"\n\n**Jour 45** : Appel téléphonique direct\n- \"Vous avez bien reçu ma relance par email ? Y a-t-il un problème ?\"\n- Écouter avant de relancer\n\n**Jour 60** : Mise en demeure par lettre recommandée\n- Modèle disponible sur service-public.fr (gratuit)\n- Mentionne les intérêts de retard légaux (2,5x taux légal en vigueur)\n\n**Jour 75** : Injonction de payer via le tribunal de proximité\n- Gratuit si < 5 000 €\n- Formulaire CERFA 12948*06\n- 90 % des impayés se règlent avant cette étape\n\n**Prévention** : 30 % d'acompte à la commande sur toute mission > 300 €. Si refus de l'acompte = signal d'alarme.\n\n---\n\n### Cas 3 — La mission qui dérape\n\n**Situation** : Tu installes un nouveau serveur. Pendant la migration, tu perds des données d'un dossier partagé. Le client réalise 3 jours après.\n\n**Réaction immédiate** :\n1. Ne pas minimiser ni te défausser\n2. \"Je prends ça très au sérieux. Je reviens demain matin pour analyser ce qui peut être récupéré.\"\n3. Tenter la récupération avec Recuva ou Veeam (selon la situation)\n\n**Si les données sont irrécupérables** :\n- Assumer sa responsabilité sur la partie qui te revient\n- Proposer un geste commercial proportionnel (remise sur la prochaine facture, non-facturation des heures de récupération)\n- Ne jamais promettre ce que tu ne peux pas tenir\n\n**La leçon à retenir** : Avant toute migration, créer une sauvegarde complète et la vérifier. Documenter la sauvegarde avec une capture d'écran dans ton rapport. Cette étape doit figurer dans tous tes devis de migration.\n\n---\n\n### Gérer un client difficile chronique\n\nCertains clients appellent pour tout, exigent des délais impossibles, contestent chaque facture et envoient des messages à 22h.\n\n**Les 3 règles** :\n- **Cadrer dès le départ** : \"Je réponds aux urgences le jour même. Pour les demandes non urgentes, je réponds sous 24h ouvrées.\"\n- **Facturer les dépassements** : Si un client dépasse le forfait habituel, envoyer une ligne supplémentaire sur la facture. Une fois, deux fois — il comprend ou il part.\n- **Savoir mettre fin à une relation** : \"Je ne suis plus en mesure de vous accompagner dans les meilleures conditions. Je vous recommande [nom d'un confrère].\" Un client toxique coûte plus qu'il ne rapporte."
    }
  ),

  module(
    "freelance-it-30-jours",
    "fidelisation-recurrent",
    "Fidélisation et revenus récurrents",
    "Comment transformer un client de dépannage en client mensuel : forfaits, rapports d'activité, rituels de suivi et techniques pour augmenter naturellement la valeur par client.",
    "text",
    8,
    {
      content_body:
        "## Fidélisation et revenus récurrents\n\nUn client récurrent vaut 5x un client ponctuel. Le coût d'acquisition est nul, la confiance est déjà là, et la prévisibilité de ton revenu change tout.\n\n---\n\n### La bascule : de l'urgence au forfait\n\nLa plupart des techniciens attendent que le client propose un forfait. C'est une erreur. C'est **toi** qui proposes.\n\n**Le bon moment pour proposer** :\n- Après une intervention réussie (le client est soulagé, il dit \"merci\")\n- Quand tu interviens pour la 2e ou 3e fois chez le même client\n- Quand tu identifies des interventions récurrentes prévisibles\n\n**La phrase qui fonctionne** :\n> \"Je remarque que vous avez souvent des petites demandes. Je propose une formule maintenance à [X €/mois] qui couvre tout ça — vous avez un contact direct et je passe une fois par trimestre faire un état des lieux. Ça vous évite d'appeler à chaque fois.\"\n\n---\n\n### 3 formats de forfait qui se vendent bien\n\n**Forfait Starter (90–150 €/mois)**\n- Support à distance illimité (temps raisonnable)\n- 1 visite préventive semestrielle\n- Rapport de suivi trimestriel\n- Cible : artisan, commerçant, 1–3 postes\n\n**Forfait Standard (200–350 €/mois)**\n- Support à distance + déplacements inclus jusqu'à 2h/mois\n- 1 visite préventive trimestrielle\n- Rapport mensuel + alerte proactive\n- Cible : petite agence, cabinet libéral, 4–10 postes\n\n**Forfait Premium (400–700 €/mois)**\n- Support prioritaire (réponse < 2h)\n- Visites mensuelles\n- Supervision des sauvegardes\n- Plan de continuité en cas de panne majeure\n- Cible : PME avec dépendance forte à l'informatique\n\n---\n\n### Le rapport d'activité mensuel : ton meilleur outil de rétention\n\nUn rapport mensuel d'une page transforme ton travail invisible en preuve de valeur.\n\n**Structure du rapport (15 minutes à rédiger)** :\n- **Interventions du mois** : liste des actions réalisées\n- **État de santé du parc** : 3 indicateurs (postes, sauvegardes, sécurité)\n- **Recommandations** : 1 à 2 actions prioritaires pour le mois suivant\n- **Prochaine visite** : date confirmée\n\nEnvoie-le le **1er du mois**. Automatiquement, le client pense à toi, voit que tu travailles, et se souvient de renouveler.\n\n---\n\n### Augmenter la valeur par client sans augmenter les prix\n\n**L'upsell naturel** :\nTu installes un NAS → tu proposes la supervision des sauvegardes (+30 €/mois)\nTu gères les postes → tu proposes la gestion des licences antivirus (+20 €/mois)\nTu dépannes le réseau → tu proposes un audit sécurité annuel (forfait 350 €)\n\n**La règle des 3 touchpoints** :\nContact mensuel (rapport ou appel rapide) → Contact trimestriel (visite) → Contact annuel (bilan et renouvellement). Un client qui n'a pas de nouvelles pendant 2 mois part.\n\n---\n\n### Renouveler sans friction\n\n2 semaines avant l'échéance annuelle d'un forfait :\n1. Envoyer un bilan de l'année (1 page)\n2. Proposer la reconduction avec éventuellement un ajustement tarifaire justifié\n3. Ne pas attendre que le client relance — il ne le fera pas\n\n**Tarif recommandé pour la revalorisation** : +5 à +8 % par an maximum. Au-delà, justifier précisément (nouveau matériel à superviser, volume de tickets en hausse).\n\n> **Objectif à 6 mois** : 4 clients en forfait mensuel à 200 €/mois = 800 € récurrents. Ajoutés aux interventions ponctuelles, c'est une base solide qui rend ton activité prévisible."
    }
  ),

  module(
    "freelance-it-30-jours",
    "premier-contrat-modele",
    "Modèle de contrat de prestation et CGV",
    "Les clauses indispensables pour un contrat simple et solide, les CGV à mettre en place dès le départ et les erreurs juridiques à éviter absolument.",
    "text",
    9,
    {
      content_body:
        "## Contrat de prestation et CGV : les bases légales\n\nPas besoin d'un avocat pour démarrer. Mais il te faut un minimum de cadre légal — sans ça, tu n'as aucun recours si un client conteste ou ne paye pas.\n\n---\n\n### Le devis signé = le contrat\n\nEn droit français, un devis signé par le client vaut contrat. C'est suffisant pour la majorité des interventions.\n\n**Ce qui doit figurer sur le devis pour qu'il soit juridiquement solide** :\n- Ton nom / dénomination commerciale + SIRET\n- Coordonnées complètes du client\n- Description précise de la prestation\n- Prix HT et mention TVA\n- Délai d'exécution\n- Conditions de paiement\n- Date et signature des deux parties\n\n> Une signature par email (\"Je confirme ma commande\" ou \"OK pour ce devis\") a valeur légale en France depuis la loi du 13 mars 2000.\n\n---\n\n### Clauses indispensables pour une prestation IT\n\n**Clause de périmètre**\n> \"La prestation couvre exclusivement les éléments listés ci-dessus. Toute demande supplémentaire fera l'objet d'un nouveau devis.\"\n\nSans cette clause, le client peut considérer que tout ce qu'il demande pendant la mission est inclus.\n\n**Clause de responsabilité limitée**\n> \"Le prestataire ne peut être tenu responsable des pertes de données survenant lors de l'intervention si aucune sauvegarde récente n'a été effectuée par le client avant le début de la mission.\"\n\n**Clause de propriété intellectuelle (si tu crées du code)**\n> \"Les livrables développés spécifiquement pour le client lui sont cédés à réception du paiement intégral. Les composants réutilisables restent la propriété du prestataire.\"\n\n**Clause de confidentialité simple**\n> \"Le prestataire s'engage à ne pas divulguer les informations techniques et commerciales auxquelles il aura accès dans le cadre de la mission.\"\n\n---\n\n### CGV : ce que tu dois afficher\n\nEn tant qu'auto-entrepreneur B2B, tu dois avoir des CGV (Conditions Générales de Vente) disponibles sur demande ou en annexe de tes devis.\n\n**Les points minimaux à couvrir** :\n- Tarifs et modalités de paiement\n- Délais d'exécution et conditions de retard\n- Clause de résiliation (préavis requis pour mettre fin à un forfait)\n- Droit applicable (droit français, tribunal compétent)\n- Politique de garantie (durée pendant laquelle tu couvres une intervention)\n\n**Ressource gratuite** : Le site `service-public.fr` propose des modèles de CGV pour les auto-entrepreneurs. Adapte, ne pars pas de zéro.\n\n---\n\n### Les 3 erreurs juridiques à éviter absolument\n\n**Erreur 1 — Intervenir sans devis signé**\nMême pour une \"petite\" intervention à 80 €. Le client peut toujours contester après coup. Un email de confirmation suffit si le client refuse de signer un PDF.\n\n**Erreur 2 — Oublier la clause de périmètre**\nSans elle, \"installer les postes\" peut vouloir dire \"configurer les imprimantes, migrer les données, former les utilisateurs et créer les comptes email\". Ça peut doubler la durée d'une mission.\n\n**Erreur 3 — Ne pas demander d'acompte sur les grosses missions**\nPour toute intervention > 400 €, demander 30 % à la commande. Si le client refuse sans explication valable, c'est un signal d'alerte sur sa solvabilité."
    }
  ),

  module(
    "freelance-it-30-jours",
    "video-explicative-ia",
    "Vidéo tutorielle : lancer une activité freelance IT rentable",
    "Une vidéo guidée avec voix IA pour comprendre les étapes clés et le résultat concret de cette formation.",
    "video",
    0,
    {
      content_url: sampleVideos.freelanceIt,
      content_body:
        "## Ce que tu vas apprendre\n\nCette vidéo tutorielle guidée couvre les étapes clés de la formation : méthode, cas concrets et résultat attendu.\n\n### Points clés\n\n- la promesse commerciale de l'offre\n- les modules les plus structurants\n- le résultat concret que tu pourras vendre ou livrer ensuite\n\n### Conseil d'utilisation\n\nRegarde la vidéo en entier, puis enchaîne sur les modules texte et les ressources pour passer à l'application."
    }
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
        "## Structure d'une landing page qui convertit\n\nUne landing page vend par clarté, pas par quantité. Le visiteur décide en 5 secondes s'il reste ou s'il part. Ta seule mission : lui donner une raison de rester.\n\n### Les 6 blocs dans le bon ordre\n\n**1. Hero (au-dessus de la ligne de flottaison)**\n- Titre : la promesse principale en une phrase\n- Sous-titre : pour qui et quel résultat concret\n- CTA primaire : un seul bouton, une seule action\n- Preuve rapide : 1 chiffre ou 1 logo client\n\n**2. Problème (ce que le visiteur ressent)**\n- Nommer le problème exactement comme le client le vit\n- Pas de jargon — les mots du client, pas les tiens\n- 3 à 5 lignes maximum\n\n**3. Solution (ce que tu proposes)**\n- Comment tu résous ce problème, en 2–3 étapes\n- Résultat attendu clairement formulé\n- Pas de liste de fonctionnalités — des bénéfices\n\n**4. Preuves**\n- Témoignages clients avec photo et nom réel\n- Chiffres concrets (\"87 clients servis\", \"4,9/5\")\n- Logos, captures, avant/après\n\n**5. Offre détaillée**\n- Ce qui est inclus, ligne par ligne\n- Ce qui n'est pas inclus (évite les surprises)\n- Prix ou range de prix si applicable\n\n**6. CTA final + FAQ**\n- Reformuler la promesse principale\n- CTA répété\n- 3 à 5 questions qui lèvent les dernières objections\n\n---\n\n### Les 3 erreurs qui plombent la conversion\n\n**Erreur 1 — Le titre vague**\n- ❌ \"Solutions digitales innovantes pour votre entreprise\"\n- ✓ \"Votre site vitrine livré en 7 jours, clé en main\"\n\n**Erreur 2 — Trop de CTA**\n- Une page = une action. Pas de liens vers d'autres pages, pas de menu.\n\n**Erreur 3 — Aucune preuve**\n- Sans preuve sociale, le visiteur ne te connaît pas. Une page sans preuve convertit 3 à 5 fois moins.\n\n---\n\n### Ce que tu dois faire maintenant\n\n1. Prendre une landing page existante (la tienne ou celle d'un client)\n2. Vérifier que les 6 blocs sont présents dans le bon ordre\n3. Supprimer tout ce qui ne sert pas directement l'action principale\n4. Tester le titre en le lisant à voix haute — si tu hésites, retravailler"
    }
  ),
  module(
    "landing-pages-rentables",
    "checklist-livraison",
    "Checklist de livraison client",
    "Checklist PDF pour livrer une page propre, relire le copywriting et cadrer les allers-retours.",
    "pdf",
    2,
    {
      content_body:
        "## Checklist de livraison d'une landing page client\n\nUne landing page n'est pas livrée quand elle est jolie. Elle est livrée quand elle est **prête à convertir** et facile à reprendre si le client veut une iteration.\n\n### Vérification avant envoi\n\n- **Titre hero** : la promesse est comprise en moins de 5 secondes\n- **CTA principal** : visible sans scroller sur desktop et mobile\n- **Preuves** : avis, références, chiffres ou captures présentes\n- **Offre** : ce qui est inclus est explicite\n- **Contact / formulaire** : testé avec un vrai envoi\n\n### Vérification technique\n\n- vitesse correcte sur mobile\n- aucun bloc cassé sur petit écran\n- favicon, meta title et description renseignés\n- pixels / analytics posés si prévus\n- formulaires reliés à la bonne destination\n\n### Ce que tu remets au client\n\n- lien live\n- récapitulatif de ce qui a été livré\n- liste des accès si nécessaire\n- 3 recommandations d'optimisation pour la suite\n\n> Une bonne livraison anticipe déjà les 3 questions du client : comment modifier, comment mesurer, et quoi tester ensuite."
    }
  ),
  module(
    "landing-pages-rentables",
    "templates-blocs",
    "Templates de sections réutilisables",
    "Bibliothèque de sections hero, preuves, FAQ et CTA pour gagner du temps.",
    "resource",
    3,
    {
      content_body:
        "## Bibliothèque de blocs réutilisables\n\nLe but n'est pas de copier-coller les mêmes pages. Le but est de partir d'une base solide pour produire plus vite.\n\n### Bloc hero\n\nStructure minimale :\n- problème principal\n- promesse courte\n- preuve immédiate\n- CTA unique\n\n### Bloc preuve\n\nUtilise au moins 2 formats :\n- témoignage client\n- chiffre ou résultat\n- logos ou références\n- avant / après\n\n### Bloc FAQ\n\nLes 5 questions les plus utiles sont souvent :\n- pour qui est cette offre ?\n- en combien de temps c'est livré ?\n- qu'est-ce qui est inclus ?\n- combien d'allers-retours ?\n- comment on démarre ?\n\n### Bloc CTA final\n\nLe dernier CTA doit reformuler l'action, pas juste afficher `Contactez-nous`.\n\n> Un bon template économise du temps de production, mais surtout du temps de décision chez le client."
    }
  ),
  module(
    "landing-pages-rentables",
    "video-introduction",
    "Video explicative : vendre une landing page rentable",
    "Une capsule qui pose la promesse commerciale, la structure attendue et le cadre de livraison d'une landing page client.",
    "video",
    0,
    {
      content_url: sampleVideos.landingPages,
      content_body:
        "## Comment utiliser cette vidéo\n\nLa vidéo sert à illustrer le raisonnement du module, pas à le remplacer.\n\n### Ce que tu dois vérifier pendant le visionnage\n\n- comment la promesse est formulée\n- où la preuve arrive dans la page\n- comment le CTA est répété sans lourdeur\n- quels blocs peuvent être supprimés sans perdre la conversion\n\n### À faire juste après\n\n- reprendre une landing page déjà livrée\n- supprimer 20 % du texte inutile\n- renforcer un seul CTA principal\n- ajouter une preuve concrète en haut de page"
    }
  ),
  module(
    "landing-pages-rentables",
    "cas-a-b-testing",
    "Cas de tests et d'optimisation",
    "Une série d'exemples d'avant / après et d'idées d'optimisation sera ajoutée.",
    "coming_soon",
    5
  ),

  module(
    "sites-web-clients",
    "cadrage-site-client",
    "Cadrer un site client sans perdre du temps",
    "Questions de cadrage, architecture simple, priorités business et limites de projet à poser dès le début.",
    "text",
    1,
    {
      content_body:
        "## Cadrer un site client sans perdre du temps\n\nUn projet de site mal cadré dure 3 fois plus longtemps que prévu et génère autant d'allers-retours que de pages livrées. La solution : poser les bonnes questions avant de produire la moindre ligne.\n\n### Les 5 questions indispensables en réunion de cadrage\n\n**1. Quel est l'objectif principal du site ?**\n- Générer des appels / demandes de devis ?\n- Vendre directement (e-commerce) ?\n- Présenter l'activité et rassurer (vitrine) ?\n- Recruter ?\n\n→ Un site = un objectif principal. Tout le reste est secondaire.\n\n**2. Qui est le visiteur cible ?**\n- Particulier ou professionnel ?\n- Tranche d'âge, secteur, niveau tech ?\n- Ce qu'il cherche quand il arrive sur le site ?\n\n**3. Quelles pages sont indispensables ?**\n- Liste avec le client, pas pour lui\n- La plupart des PME n'ont besoin que de 4 à 6 pages\n- Chaque page = un objectif clairement défini\n\n**4. Quels assets tu as ?**\n- Logo en vecteur (SVG ou PDF) ?\n- Photos professionnelles ou stock ?\n- Textes existants ou à rédiger ?\n- Informations légales (SIRET, mentions) ?\n\n**5. Quel est le budget et le délai réels ?**\n- Ne jamais démarrer sans budget décidé\n- Délai côté client : date impérative ? Souplesse ?\n- Combien d'allers-retours sont inclus ?\n\n---\n\n### Les limites à poser dès le cadrage\n\n```\nCe qui est inclus :\n- X pages (liste)\n- 2 allers-retours de corrections\n- Responsive mobile\n- Formulaire de contact\n- Installation sur l'hébergement du client\n\nCe qui n'est pas inclus :\n- Rédaction des textes\n- Photos ou illustrations\n- Référencement SEO avancé\n- Maintenance après livraison\n- Modifications de structure après validation\n```\n\n> Mettre les limites dans le devis = pas de mauvaise surprise. Ni pour toi, ni pour le client.\n\n---\n\n### Les signaux d'alarme à identifier en amont\n\n- Client qui ne sait pas ce qu'il veut mais \"veut quelque chose de moderne\"\n- Pas de logo, pas de textes, pas de photos → prévoir 2× plus de temps\n- \"On verra les détails plus tard\" → non, on les voit maintenant\n- Demande de refaire \"comme le site de ce concurrent\" → risque de plagiat, cadrer différemment"
    }
  ),
  module(
    "sites-web-clients",
    "brief-client-pdf",
    "Modele de brief client",
    "Un PDF de brief pour cadrer les demandes avant de produire.",
    "pdf",
    2,
    {
      content_body:
        "## Brief client à faire remplir avant toute production\n\nLe brief n'est pas un document décoratif. Il sert à éviter les demandes floues du type \"on veut un site moderne\".\n\n### Les questions obligatoires\n\n- objectif principal du site\n- pages indispensables\n- action attendue sur chaque page\n- cibles prioritaires\n- références aimées / détestées\n- contraintes de délai et de budget\n\n### Les assets à demander\n\n- logo en bonne qualité\n- textes existants si disponibles\n- photos ou banque d'images autorisee\n- informations légales\n- accès domaine / hébergement si déjà existants\n\n### Les limites à poser\n\n- nombre de pages incluses\n- nombre d'allers-retours\n- contenu fourni par qui\n- maintenance incluse ou non\n\n> Si le brief est vide ou flou, le projet le sera aussi. Le brief est déjà une partie du delivery."
    }
  ),
  module(
    "sites-web-clients",
    "boite-a-outils-delivery",
    "Boite a outils de delivery",
    "Ressources pour hebergement, validation, recette et maintenance post-livraison.",
    "resource",
    3,
    {
      content_body:
        "## Boîte à outils de delivery web\n\nPour livrer proprement un site client, tu as besoin d'un process plus que d'un outil miracle.\n\n### Stack minimale recommandée\n\n- environnement de préproduction\n- checklist SEO technique minimale\n- formulaire testé en réel\n- sauvegarde ou export avant mise en ligne\n- accès client documentés\n\n### Checklist recette\n\n- vérifier menu et liens\n- vérifier responsive mobile\n- vérifier titres H1 / H2 et metas\n- vérifier les formulaires\n- vérifier les redirections et pages légales\n\n### Maintenance de base à proposer\n\n- mises à jour mensuelles\n- correction de petits bugs\n- sauvegarde / restauration\n- ajout de contenus simples\n\n> Le client ne juge pas seulement le site. Il juge aussi la propreté de la passation."
    }
  ),
  module(
    "sites-web-clients",
    "video-introduction",
    "Video explicative : cadrer et vendre un site client",
    "Une capsule pour comprendre le type de projet, le niveau de sobriété attendu et la logique de livraison de la formation.",
    "video",
    0,
    {
      content_url: sampleVideos.sitesWeb,
      content_body:
        "## Ce que la vidéo doit t'aider à voir\n\nLa vidéo montre surtout le niveau de simplicité à viser.\n\n### Pendant le visionnage\n\nobserve :\n- la hiérarchie des pages\n- ce qui relève du site et ce qui relève d'une future évolution\n- la logique de navigation\n- le niveau de finition suffisant pour livrer sans surproduire\n\n### Exercice recommandé\n\nReprends un projet client passé et demande-toi :\n- quelles pages étaient inutiles ?\n- quel bloc pouvait être mutualisé ?\n- qu'est-ce qui aurait pu passer en option ?"
    }
  ),
  module(
    "sites-web-clients",
    "pack-maintenance",
    "Pack maintenance et evolution",
    "Le module sur les offres de maintenance sera complété avec scripts et devis.",
    "coming_soon",
    5
  ),

  module(
    "outils-pme-glpi",
    "problemes-metier-a-vendre",
    "Problèmes métier simples à transformer en outil",
    "Identifier les irritants internes d'une PME et les transformer en besoins concrètement facturables.",
    "text",
    1,
    {
      content_body:
        "## Transformer un irritant PME en outil facturable\n\nLes meilleures missions d'outils internes ne viennent pas d'une demande technique. Elles viennent d'une phrase comme : **\"On perd du temps à chercher qui fait quoi\"** ou **\"On a eu un incident parce que personne ne savait que ce poste n'était plus à jour.\"**\n\n### Les 5 irritants les plus fréquents en PME\n\n**1. Le support par WhatsApp ou téléphone**\n- Demandes perdues, pas de traçabilité, pas de priorité\n- Solution : portail de tickets simple (GLPI, Freshdesk, ou outil custom)\n- Facturable : 500–1 500 € de mise en place + maintenance mensuelle\n\n**2. Les tableaux Excel de suivi**\n- Versions multiples, conflits, données périmées\n- Solution : base de données simple avec interface web\n- Facturable : 800–2 500 € selon la complexité\n\n**3. L'onboarding / offboarding manuel**\n- Oubli de créer ou supprimer des accès\n- Solution : checklist numérique avec validation par étape\n- Facturable : 400–800 € de mise en place\n\n**4. Les rapports recopiés à la main**\n- Données collectées manuellement chaque semaine ou mois\n- Solution : automatisation n8n + dashboard Metabase ou Notion\n- Facturable : 600–1 200 € + 80–150 €/mois de maintenance\n\n**5. La gestion du parc matériel dans la tête du technicien**\n- Aucun inventaire, aucune garantie suivie\n- Solution : module inventaire GLPI ou Snipe-IT\n- Facturable : 400–900 € de déploiement\n\n---\n\n### Comment identifier l'irritant à traiter en priorité\n\nPose ces 3 questions au dirigeant :\n\n1. **\"Quelle tâche répétitive prend le plus de temps à vos équipes chaque semaine ?\"**\n2. **\"Quel sujet génère le plus de malentendus ou d'erreurs ?\"**\n3. **\"Si vous pouviez automatiser une chose demain, ce serait laquelle ?\"**\n\nLa réponse la plus émotionnelle = l'irritant à traiter en premier.\n\n---\n\n### La règle des 3 semaines\n\nUn bon outil métier PME doit pouvoir être :\n- **cadré** en 2 jours\n- **livré** en 1 à 2 semaines\n- **adopté** dans les 3 premières semaines\n\nSi ce n'est pas faisable dans ces délais, le périmètre est trop large. Réduis."
    }
  ),
  module(
    "outils-pme-glpi",
    "schema-outil-pme",
    "Schema de cadrage d'un outil support",
    "Un PDF de cadrage pour auditer les besoins support et support GLPI.",
    "pdf",
    2,
    {
      content_body:
        "## Schéma de cadrage pour un outil support ou métier\n\nUn mini-outil rentable commence par un schéma très simple : problème, utilisateur, action, résultat.\n\n### Les 5 blocs du cadrage\n\n- **Problème** : quelle perte de temps ou quel risque existe aujourd'hui ?\n- **Utilisateur** : qui ouvre, traite ou valide ?\n- **Données** : que faut-il enregistrer au minimum ?\n- **Workflow** : quelles sont les 3 à 5 étapes réelles ?\n- **Résultat** : qu'est-ce que le dirigeant verra de mieux en 30 jours ?\n\n### Questions de qualification\n\n- combien de personnes sont impliquées ?\n- quel outil remplace-t-on ?\n- qu'est-ce qui bloque aujourd'hui ?\n- quelle action doit devenir plus rapide ?\n\n### Livrable de cadrage\n\ntermine toujours par:\n- périmètre inclus\n- périmètre exclu\n- étape 1 en production\n- évolutions possibles plus tard"
    }
  ),
  module(
    "outils-pme-glpi",
    "pack-ressources-support",
    "Ressources de support et GLPI",
    "Documents, canevas et exemples pour structurer un outil metier ou support.",
    "resource",
    3,
    {
      content_body:
        "## Ressources de support et GLPI à réutiliser\n\nCe module regroupe les briques qui permettent de standardiser ton offre.\n\n### À réutiliser dans chaque mission\n\n- catégories de tickets de départ\n- priorités simples\n- trame de base de connaissances\n- modèle de compte-rendu de support\n- structure de reporting mensuel\n\n### Ce qui doit rester simple\n\n- peu de catégories\n- peu de niveaux de priorité\n- un responsable clair par sujet\n- un tableau de bord compréhensible en 1 minute\n\n### Ce que tu vends au client\n\n- plus de traçabilité\n- moins de demandes perdues\n- une base pour grandir ensuite\n\n> Plus le système reste simple au départ, plus il a de chances d'être vraiment utilisé."
    }
  ),
  module(
    "outils-pme-glpi",
    "video-introduction",
    "Video explicative : transformer un irritant PME en outil",
    "Une capsule pour voir comment partir d'un besoin support ou GLPI et le traduire en mission concrète et facturable.",
    "video",
    0,
    {
      content_url: sampleVideos.outilsPme,
      content_body:
        "## Comment utiliser cette vidéo dans la formation\n\nLa vidéo te sert à visualiser la traduction d'un besoin flou en offre concrète.\n\n### Ce qu'il faut retenir\n\n- un irritant visible vaut mieux qu'un besoin technique abstrait\n- le premier livrable doit être simple et adopté rapidement\n- la valeur se voit dans le temps gagné, pas dans la complexité technique\n\n### A appliquer ensuite\n\nreprends 3 demandes client déjà vues et reformule-les en:\n- problème\n- utilisateur\n- flux minimal\n- promesse vendable"
    }
  ),
  module(
    "outils-pme-glpi",
    "construire-mini-outil-no-code",
    "Construire un mini-outil PME sans coder",
    "Créer un outil de suivi ou de ticketing simple avec Notion, Airtable ou un formulaire connecté.",
    "text",
    4,
    {
      content_body:
        "## Construire un mini-outil sans coder\n\nAvant d'installer GLPI ou de développer une app sur mesure, il existe des outils no-code qui répondent à 80 % des besoins PME.\n\n### Option 1 — Notion (pour les PME qui aiment les docs)\n\n**Cas d'usage** : base de connaissances interne, suivi de projets, wiki équipe\n\n**Setup en 1h :**\n- Créer un espace de travail partagé\n- 1 base de données \"Demandes\" avec statuts (En attente / En cours / Résolu)\n- 1 base de données \"Matériel\" avec colonnes (Nom, Type, Utilisateur, Garantie)\n- Formulaire public Tally connecté pour les demandes\n\n**Coût pour le client** : 0 à 16 €/mois\n**À facturer** : mise en place 300–500 € + formation 150 €\n\n---\n\n### Option 2 — Airtable (pour les PME avec data)\n\n**Cas d'usage** : suivi des interventions, inventaire matériel, CRM simple\n\n**Setup en 2h :**\n- Table principale + vues filtrées par technicien ou statut\n- Formulaire d'entrée pour les demandes utilisateurs\n- Automatisation : email au responsable quand priorité = Urgente\n- Vue calendrier pour les maintenances préventives\n\n**Coût pour le client** : 0 à 20 €/mois\n**À facturer** : mise en place 400–700 €\n\n---\n\n### Option 3 — Tally + Google Sheets (le plus simple)\n\n**Cas d'usage** : formulaire de demande IT → suivi dans un tableau\n\n**Setup en 30 min :**\n- Formulaire Tally public (gratuit) pour les demandes\n- Connexion automatique à Google Sheets via webhook\n- Colonne \"Statut\" mise à jour manuellement\n- Email de confirmation automatique via n8n\n\n**Coût pour le client** : 0 €\n**À facturer** : mise en place 150–250 €\n\n---\n\n### Quand passer à GLPI ?\n\n- Plus de 5 personnes qui ouvrent des demandes régulièrement\n- Besoin de SLA et de reporting structuré\n- Besoin d'inventaire matériel intégré\n- Direction qui veut des métriques de suivi\n\n> Commence avec le no-code. Upgrades vers GLPI quand le client a prouvé qu'il utilise vraiment l'outil."
    }
  ),
  module(
    "outils-pme-glpi",
    "vendre-outil-interne",
    "Vendre un outil interne à un dirigeant PME",
    "Les arguments qui convainquent, le bon format de devis et comment éviter le projet qui s'étire.",
    "text",
    5,
    {
      content_body:
        "## Vendre un outil interne sans effrayer le budget\n\nUn dirigeant PME ne veut pas acheter un \"outil\". Il veut résoudre un problème. Vends le résultat, pas la technologie.\n\n### Le pitch en 3 phrases\n\n> \"Aujourd'hui, vos équipes gèrent les demandes IT par email et WhatsApp. Certaines tombent entre les mailles. Je vous propose un portail simple, opérationnel en une semaine, qui centralise tout et donne de la visibilité à vos managers.\"\n\n---\n\n### Les 3 formats de tarification\n\n**Forfait projet (one-shot)**\n- Cadrage + build + formation + documentation\n- 400 € à 2 000 € selon complexité\n- Adapté aux dirigeants qui \"n'aiment pas les abonnements\"\n\n**Projet + maintenance mensuelle**\n- 600 € de mise en place + 80–150 €/mois\n- Meilleur pour toi : tu gardes la main sur l'outil\n- Meilleur pour le client : il a un interlocuteur si ça plante\n\n**Audit + recommandation seulement**\n- 150–350 € pour un livrable écrit\n- Porte d'entrée idéale pour les prospects hésitants\n- Souvent suivi d'une mission de build\n\n---\n\n### Le devis qui rassure\n\n```\nPhase 1 — Cadrage (2h) : inclus\nPhase 2 — Build et configuration : [X] €\nPhase 3 — Formation équipe (1h) : inclus\nPhase 4 — Semaine de support post-lancement : inclus\nDocumentation remise : inclus\n\nDélai de livraison : [X] jours ouvrés\nNombre d'allers-retours inclus : 2\n```\n\n---\n\n### Ce qui fait dérailler le projet\n\n- Ajouter des fonctionnalités en cours de route sans avenant\n- Ne pas définir qui valide les livraisons côté client\n- Livrer sans formation → l'outil n'est pas utilisé → contrat non renouvelé\n- Promettre plus que ce que l'outil no-code peut faire\n\n> Mets toujours un interlocuteur unique côté client. Un projet avec 3 décideurs dure 3 fois plus longtemps."
    }
  ),
  module(
    "outils-pme-glpi",
    "etudes-de-cas-a-venir",
    "Études de cas et mini-démos",
    "Des mini-cas réels de demandes PME et support seront ajoutés.",
    "coming_soon",
    6
  ),

  module(
    "applications-mobiles-rentables",
    "cadrer-une-app-simple",
    "Cadrer une application mobile simple",
    "Transformer une idée en application courte, monétisable et tenable techniquement.",
    "text",
    1,
    {
      content_body:
        "## Cadrer une application mobile rentable\n\nUne app qui essaie de tout faire ne fait rien bien. Le MVP rentable est une app qui fait **une chose mieux que les alternatives existantes**.\n\n### Les 4 questions de cadrage obligatoires\n\n**1. Quel problème précis cette app résout-elle ?**\n- Pas \"simplifier la vie des gens\"\n- Oui : \"Les artisans perdent 45 min par chantier à remplir leurs bons de livraison sur papier\"\n\n**2. Qui est l'utilisateur cible ?**\n- Âge, contexte, niveau tech\n- Quand et où utilise-t-il l'app ? (en déplacement, au bureau, en urgence)\n- Qu'est-ce qu'il fait aujourd'hui à la place ?\n\n**3. Quel est le flux minimal viable ?**\n- Le parcours utilisateur en 3 à 5 étapes maximum\n- Exemple : Créer bon → Ajouter ligne → Signer → Envoyer PDF\n- Tout le reste est version 2\n\n**4. Comment l'app génère-t-elle de l'argent ?**\n- Abonnement mensuel (SaaS B2B : 20–100 €/mois)\n- Achat unique (B2C : 1,99–9,99 €)\n- Freemium avec limite sur le volume\n- Licence entreprise (facturation annuelle)\n\n---\n\n### La matrice de validation rapide\n\nAvant de coder quoi que ce soit, valide ces 3 points :\n\n| Question | Réponse attendue |\n|----------|------------------|\n| J'ai parlé à 5 utilisateurs cibles | OUI |\n| Au moins 2 seraient prêts à payer | OUI |\n| Le flux principal tient en 5 écrans | OUI |\n\nSi une réponse est NON → retravaille le cadrage avant de démarrer.\n\n---\n\n### Stack recommandée pour un MVP mobile en 2026\n\n- **Expo React Native** : iOS + Android depuis une seule base de code\n- **Supabase** : base de données, auth, stockage\n- **Stripe** : paiements in-app\n- **EAS Build** : compilation cloud, pas besoin de Mac pour iOS\n\n> Avec cette stack, un développeur solo peut livrer un MVP fonctionnel en 3 à 6 semaines."
    }
  ),
  module(
    "applications-mobiles-rentables",
    "wireframes-app",
    "Pack wireframes et structure de screens",
    "Pack PDF avec architecture de navigation et écrans de base.",
    "pdf",
    2,
    {
      content_body:
        "## Construire des wireframes utiles pour un MVP mobile\n\nUn wireframe doit clarifier le flux, pas faire croire que le design est terminé.\n\n### Les écrans qui suffisent souvent au démarrage\n\n- onboarding ou connexion\n- home / dashboard\n- liste principale\n- fiche détail\n- création ou action principale\n- profil ou paramètres\n\n### Questions à trancher avant design détaillé\n\n- quel est l'écran que l'utilisateur verra le plus ?\n- quelle action doit être faisable en moins de 30 secondes ?\n- quelle information est prioritaire sur mobile ?\n- que peut-on repousser à la v2 ?\n\n### Règle simple\n\nsi un écran n'apporte pas une action, une décision ou une preuve, il est probablement inutile dans le MVP."
    }
  ),
  module(
    "applications-mobiles-rentables",
    "ressources-monetisation",
    "Ressources monétisation et MVP",
    "Ressources pour monetiser, pre-vendre et tester une application mobile.",
    "resource",
    3,
    {
      content_body:
        "## Monétiser un MVP mobile sans se raconter d'histoire\n\nLa monétisation doit être pensée dès le cadrage.\n\n### Les 4 modèles les plus simples\n\n- abonnement mensuel\n- paiement one-shot\n- freemium avec upgrade\n- licence B2B simple\n\n### Test de pré-vente minimal\n\n- page simple de presentation\n- promesse claire\n- formulaire de demande ou pré-inscription\n- 3 entretiens avec utilisateurs cibles\n- un prix annoncé, même approximatif\n\n### Ce qu'il faut mesurer\n\n- qui comprend l'offre en moins de 10 secondes\n- qui serait prêt à payer\n- quelle fonctionnalité déclenche le plus de valeur\n- quelle objection revient le plus souvent"
    }
  ),
  module(
    "applications-mobiles-rentables",
    "video-introduction",
    "Video explicative : cadrer une application mobile rentable",
    "Une capsule pour comprendre le type de MVP visé, la monétisation et le niveau de simplicité recherchée.",
    "video",
    0,
    {
      content_url: sampleVideos.mobileApps,
      content_body:
        "## Le rôle de la vidéo dans ce module\n\nLa vidéo sert à renforcer les arbitrages de produit.\n\n### À regarder en priorité\n\n- quelles fonctionnalités sont vraiment centrales\n- où passe la limite entre MVP et surproduction\n- comment la monétisation influence le flux produit\n- quel niveau de finition suffit pour lancer\n\n### Exercice rapide\n\nÉcris ton application en une phrase :\n- pour qui\n- pour quoi\n- contre quel résultat\n- avec quel mode de paiement"
    }
  ),
  module(
    "applications-mobiles-rentables",
    "cas-d-usages-a-venir",
    "Cas d'usages et extensions futures",
    "Des cas supplémentaires seront ajoutés pour aller vers un produit plus ambitieux.",
    "coming_soon",
    5
  ),

  module(
    "glpi-support-pme",
    "cadrer-support-interne",
    "Cadrer le besoin support avant d'ouvrir GLPI",
    "Identifier les vrais irritants, choisir le bon périmètre, éviter le projet trop large et vendre un premier cadrage simple.",
    "text",
    1,
    {
      content_body:
        "## Cadrer un projet support sans partir trop large\n\nAvant de parler de GLPI, il faut clarifier **ce qu'on veut résoudre** : demandes IT, demandes internes, suivi matériel, validation managériale ou simple traçabilité.\n\n### Les 4 questions à poser au client\n\n- **Qui ouvre les demandes aujourd'hui ?** salariés, managers, support externe\n- **Quels sujets reviennent le plus souvent ?** poste, accès, mails, imprimantes, achats, arrivée/départ collaborateur\n- **Qui traite ?** une seule personne, un prestataire, plusieurs niveaux\n- **Quel niveau de suivi est attendu ?** simple historique ou vrai reporting mensuel\n\n> Un bon projet GLPI commence rarement par “on veut un outil de ticketing”. Il commence par “on perd du temps et personne ne sait qui fait quoi”.\n\n### Périmètre recommandé pour une PME de 5 à 50 personnes\n\n- portail de demande unique\n- 5 à 8 catégories maximum\n- 2 niveaux de priorité\n- 1 SLA simple\n- 1 tableau de bord dirigeant\n\n### Ce que tu vends vraiment\n\nTu ne vends pas GLPI. Tu vends :\n- moins de messages WhatsApp ou appels perdus\n- une priorisation visible\n- un historique des demandes\n- une base pour professionnaliser le support"
    }
  ),
  module(
    "glpi-support-pme",
    "deploiement-glpi-propre",
    "Déployer GLPI proprement et le faire adopter",
    "Installation, catégories, profils, notifications et bonnes pratiques pour que l'outil soit utilisé dès la mise en ligne.",
    "text",
    2,
    {
      content_body:
        "## Déployer GLPI sans décourager les équipes\n\nLe premier enjeu n'est pas technique. C'est l'adoption.\n\n### Configuration minimale qui fonctionne\n\n- **Profils** : demandeur, technicien, manager\n- **Catégories** : matériel, comptes, réseau, applications, achats, onboarding\n- **Priorités** : normale et urgente suffisent au départ\n- **Notifications** : confirmation d'ouverture + résolution\n- **Templates** : titre, description, capture, impact métier\n\n### Ce qu'il ne faut pas faire au démarrage\n\n- ouvrir 30 catégories\n- créer des workflows de validation trop tôt\n- tout connecter à l'AD, l'inventaire et les plugins dès la semaine 1\n- promettre un “ITSM complet” à une PME de 12 postes\n\n### Plan de lancement en 7 jours\n\n- Jour 1 : cadrage et choix du périmètre\n- Jour 2 : installation et branding basique\n- Jour 3 : catégories, profils, droits\n- Jour 4 : formulaires et notifications\n- Jour 5 : test avec 3 utilisateurs pilotes\n- Jour 6 : corrections et base de connaissances\n- Jour 7 : mise en service + mini formation équipe"
    }
  ),
  module(
    "glpi-support-pme",
    "sla-base-connaissance",
    "SLA simples, base de connaissances et reporting dirigeant",
    "Mettre en place des délais crédibles, une base de réponses utiles et un reporting qui parle au patron.",
    "text",
    3,
    {
      content_body:
        "## Structurer le support après la mise en ligne\n\nUne fois GLPI installé, la vraie valeur vient du process.\n\n### SLA simples que tu peux assumer\n\n- **Urgent** : prise en charge sous 2h ouvrées\n- **Normal** : prise en charge sous 8h ouvrées\n- **Faible** : traitement sous 2 jours ouvrés\n\n### Base de connaissances utile\n\nCrée d'abord 6 à 10 articles maximum :\n- réinitialiser son mot de passe\n- ajouter une imprimante\n- accéder au Wi-Fi invité\n- configurer Outlook ou Microsoft 365\n- demander un nouveau matériel\n- procédure d'arrivée / départ collaborateur\n\n### Reporting mensuel lisible\n\nLe dirigeant veut 3 choses :\n- nombre de tickets ouverts / fermés\n- sujets les plus fréquents\n- temps moyen de résolution\n\n> Si ton reporting tient sur une page et montre une tendance claire, tu augmentes fortement les chances de renouvellement."
    }
  ),
  module(
    "glpi-support-pme",
    "checklist-lancement-glpi",
    "Checklist de lancement et modèle de gouvernance",
    "Une ressource réutilisable pour lancer GLPI, animer les rôles et cadrer les points de suivi avec le client.",
    "resource",
    4,
    {
      content_body:
        "## Ce que contient la ressource\n\n- checklist de lancement GLPI en 30 points\n- modèle de réunion de cadrage support\n- structure de com interne pour annoncer l'outil\n- modèle de compte-rendu mensuel dirigeant\n\nUtilise cette ressource comme base de delivery pour standardiser ton offre GLPI."
    }
  ),
  module(
    "glpi-support-pme",
    "automatisations-glpi-a-venir",
    "Automatisations, inventaire et extensions avancées",
    "La suite du programme couvrira l'inventaire, les plugins utiles, les workflows plus poussés et les connexions annexes.",
    "coming_soon",
    5
  ),

  module(
    "glpi-support-pme",
    "video-explicative-ia",
    "Vidéo explicative IA : déployer GLPI et structurer un support PME",
    "Une vidéo avec voix IA et visuels explicatifs pour comprendre rapidement la logique, la promesse et le résultat concret de cette formation.",
    "video",
    0,
    {
      content_url: sampleVideos.glpiSupport,
      content_body:
        "## Comment utiliser cette vidéo\n\nCette vidéo explicative générée en IA te donne une vue rapide de la promesse, des modules et du résultat concret visé par la formation.\n\n### Ce qu'il faut retenir\n\n- la promesse commerciale de l'offre\n- les modules les plus structurants\n- le résultat concret que tu pourras vendre ou livrer ensuite\n\n### Conseil d'utilisation\n\nCommence par cette vue d'ensemble, puis enchaîne sur les modules texte, PDF et ressources pour passer à l'application."
    }
  ),

  module(
    "maintenance-informatique-pme",
    "offre-maintenance-qui-se-vend",
    "Construire une offre de maintenance qui se vend",
    "Positionner ton forfait, éviter le support illimité mal cadré et rendre la promesse simple pour une PME.",
    "text",
    1,
    {
      content_body:
        "## Construire une offre de maintenance lisible\n\nUne offre de maintenance doit rassurer sans devenir une promesse impossible à tenir.\n\n### Ce que ton forfait peut inclure au départ\n\n- support à distance sur horaires ouvrés\n- 1 visite préventive mensuelle ou trimestrielle\n- supervision légère ou checklist de contrôle\n- sauvegarde et sécurité de base\n- reporting synthétique\n\n### Ce qu'il faut exclure noir sur blanc\n\n- développement spécifique\n- interventions hors horaires sans majoration\n- remplacement matériel inclus\n- assistance illimitée sur tout et n'importe quoi\n\n### Formule simple qui se vend\n\n**“Je maintiens vos postes, vos accès et vos sauvegardes avec un point régulier, un support réactif et un historique clair des interventions.”**"
    }
  ),
  module(
    "maintenance-informatique-pme",
    "onboarding-client-maintenance",
    "Onboarding, checklists et première visite",
    "Structurer l'entrée du client, sécuriser les accès et démarrer la maintenance sans dépendre de ta mémoire.",
    "text",
    2,
    {
      content_body:
        "## Réussir l'onboarding d'un nouveau client maintenance\n\nLe premier mois décide souvent si le contrat sera reconduit.\n\n### À récupérer dès le départ\n\n- liste des postes et utilisateurs\n- accès routeur, NAS, Microsoft 365, antivirus, sauvegardes\n- historique des incidents connus\n- personnes à contacter selon les sujets\n\n### Première visite type\n\n- état des postes critiques\n- vérification sauvegarde\n- audit comptes admin et mots de passe partagés\n- antivirus / EDR en place\n- documentation minimale\n\n### Livrable attendu\n\nUn document court avec :\n- les priorités immédiates\n- les risques visibles\n- ce qui a été fait\n- la suite recommandée sur 30 jours"
    }
  ),
  module(
    "maintenance-informatique-pme",
    "reporting-renouvellement",
    "Reporting mensuel, relances et renouvellement",
    "Montrer la valeur tous les mois, préparer les relances et transformer la maintenance en revenu récurrent durable.",
    "text",
    3,
    {
      content_body:
        "## Garder le client grâce à un reporting utile\n\nUn client renouvelle quand il comprend ce que tu fais, même quand rien ne casse.\n\n### Ton reporting mensuel doit contenir\n\n- interventions réalisées\n- incidents évités ou sécurisés\n- points de vigilance du mois suivant\n- recommandations simples avec coût estimé\n\n### Les 3 relances qui marchent\n\n- relance devis d'amélioration après 5 jours\n- point trimestriel de prévention\n- proposition de montée de forfait quand la volumétrie augmente\n\n> La maintenance ne se défend pas par la technique. Elle se défend par la tranquillité qu'elle apporte au client."
    }
  ),
  module(
    "maintenance-informatique-pme",
    "pack-contrat-maintenance",
    "Pack contrat, reporting et compte-rendu de visite",
    "Des modèles réutilisables pour cadrer le forfait, documenter les interventions et préparer les renouvellements.",
    "resource",
    4,
    {
      content_body:
        "## Contenu du pack maintenance\n\n- trame de contrat ou lettre de mission\n- modèle de reporting mensuel\n- checklist de visite préventive\n- modèle de compte-rendu d'intervention\n- structure de proposition d'évolution\n\nLe but est d'avoir une base de delivery réutilisable sur chaque client."
    }
  ),
  module(
    "maintenance-informatique-pme",
    "cas-clients-maintenance-a-venir",
    "Cas clients, upsell et gestion des urgences",
    "Ce module ajoutera plusieurs cas réels de maintenance, de rétention et de montée en gamme chez des PME.",
    "coming_soon",
    5
  ),

  module(
    "maintenance-informatique-pme",
    "video-explicative-ia",
    "Vidéo explicative IA : vendre une maintenance informatique récurrente",
    "Une vidéo avec voix IA et visuels explicatifs pour comprendre rapidement la logique, la promesse et le résultat concret de cette formation.",
    "video",
    0,
    {
      content_url: sampleVideos.maintenancePme,
      content_body:
        "## Comment utiliser cette vidéo\n\nCette vidéo explicative générée en IA te donne une vue rapide de la promesse, des modules et du résultat concret visé par la formation.\n\n### Ce qu'il faut retenir\n\n- la promesse commerciale de l'offre\n- les modules les plus structurants\n- le résultat concret que tu pourras vendre ou livrer ensuite\n\n### Conseil d'utilisation\n\nCommence par cette vue d'ensemble, puis enchaîne sur les modules texte, PDF et ressources pour passer à l'application."
    }
  ),

  module(
    "apps-metier-supabase",
    "cadrer-application-metier",
    "Cadrer une application métier avant de coder",
    "Choisir le bon périmètre, le bon utilisateur cible et le bon MVP pour éviter les projets trop gros ou trop flous.",
    "text",
    1,
    {
      content_body:
        "## Cadrer une application métier qui reste livrable\n\nUne app métier rentable commence par un flux clair, pas par 25 écrans.\n\n### Les questions à poser\n\n- qui utilise l'outil chaque semaine ?\n- quelle action doit être plus rapide ou mieux tracée ?\n- quelle donnée est centrale ?\n- quel résultat visible le client attend-il en 30 jours ?\n\n### Les MVP qui se vendent bien\n\n- suivi de demandes ou interventions\n- app de collecte terrain\n- back-office simple avec rôles\n- portail client avec historique et documents\n\n> Si le client ne peut pas résumer l'app en une phrase, le cadrage n'est pas fini."
    }
  ),
  module(
    "apps-metier-supabase",
    "schema-donnees-supabase",
    "Schéma de données, rôles et sécurité de base",
    "Poser une base Supabase propre: tables, relations, auth, rôles et règles simples de sécurité.",
    "text",
    2,
    {
      content_body:
        "## Poser une base Supabase propre\n\nSupabase te fait gagner du temps si la structure est simple et lisible.\n\n### Base recommandée pour une app métier\n\n- table `profiles`\n- table métier principale (`tickets`, `missions`, `reports`, `clients`...)\n- table `attachments` ou `notes` si nécessaire\n- statuts limités et normalisés\n- rôles simples: admin, opérateur, client\n\n### Règles utiles\n\n- l'utilisateur ne voit que ses données\n- l'admin voit tout\n- le client externe ne modifie que ce qui lui appartient\n- les pièces jointes sont isolées par dossier logique\n\n### Ce que tu évites\n\n- 15 tables dès le départ\n- rôles trop fins\n- logique métier critique uniquement côté front"
    }
  ),
  module(
    "apps-metier-supabase",
    "ux-flux-et-delivery",
    "Flux UX, back-office et livraison au client",
    "Concevoir les écrans utiles, le back-office minimum et une livraison rassurante pour un client métier.",
    "text",
    3,
    {
      content_body:
        "## Construire un flux produit simple\n\nUne app métier doit être comprise vite par quelqu'un qui n'est pas technique.\n\n### Les écrans qui suffisent souvent au départ\n\n- connexion\n- tableau de bord\n- liste filtrable\n- fiche détail\n- formulaire de création / mise à jour\n- espace documents ou historique\n\n### Livraison propre\n\n- environnement de prod séparé\n- accès admin remis au client\n- mini formation utilisateur\n- documentation de reprise\n- plan d'évolution par lot\n\n> Une bonne livraison ne dépend pas d'un long manuel. Elle dépend d'une interface claire et d'un passage de relais propre."
    }
  ),
  module(
    "apps-metier-supabase",
    "starter-kit-app-metier",
    "Starter kit Supabase, rôles et déploiement",
    "Une ressource pour démarrer plus vite avec structure de tables, rôles, vues clés et checklist de mise en ligne.",
    "resource",
    4,
    {
      content_body:
        "## Ce que contient le starter kit\n\n- structure de tables de départ\n- checklist auth / rôles / permissions\n- modèle de back-office minimal\n- checklist de mise en production\n- logique de reprise et maintenance\n\nUtilise ce starter kit pour standardiser tes premières apps métier sans repartir de zéro."
    }
  ),
  module(
    "apps-metier-supabase",
    "facturation-evolution-a-venir",
    "Facturation, maintenance et feuille de route produit",
    "Le module final couvrira la tarification projet, la maintenance et la gestion des évolutions après livraison.",
    "coming_soon",
    5
  ),
  module(
    "apps-metier-supabase",
    "video-explicative-ia",
    "Vidéo tutorielle : créer une application métier simple avec Supabase",
    "Une vidéo guidée avec voix IA pour comprendre la logique, les étapes et le résultat concret de cette formation.",
    "video",
    0,
    {
      content_url: sampleVideos.appsMetier,
      content_body:
        "## Comment utiliser cette vidéo\n\nCette vidéo tutorielle te donne une vue d'ensemble de la formation : la promesse, les modules et le résultat concret visé.\n\n### Ce qu'il faut retenir\n\n- la promesse commerciale de l'offre\n- les modules les plus structurants\n- le résultat concret que tu pourras vendre ou livrer ensuite\n\n### Conseil d'utilisation\n\nCommence par cette vue d'ensemble, puis enchaine sur les modules texte, PDF et ressources pour passer à l'application."
    }
  ),

  // ─── Microsoft 365 PME ────────────────────────────────────────────────────

  module(
    "microsoft-365-pme",
    "video-tutorielle",
    "Vidéo tutorielle : déployer Microsoft 365 en PME",
    "Une vidéo guidée pour comprendre la méthode complète : audit, migration, configuration et contrat de support M365.",
    "video",
    0,
    {
      content_url: sampleVideos.microsoft365,
      content_body:
        "## Ce que tu vas apprendre\n\nCette vidéo tutorielle couvre les étapes clés du déploiement Microsoft 365 en PME : de l'audit initial jusqu'à la mise en service et au contrat de suivi.\n\n### Points clés\n\n- audit de l'environnement existant\n- migration des boîtes mail et données\n- configuration Teams, SharePoint et OneDrive\n- formation des utilisateurs et adoption\n- contrat de support et revenu récurrent\n\n### Après la vidéo\n\nParcours les modules texte et les ressources téléchargeables pour mettre en pratique chaque étape."
    }
  ),
  module(
    "microsoft-365-pme",
    "audit-migration",
    "Audit de l'existant et plan de migration",
    "Évaluer l'environnement actuel, préparer la migration et éviter les erreurs classiques dès le départ.",
    "text",
    1,
    {
      content_body:
        "## Préparer une migration M365 sans surprise\n\nUne migration réussie commence par un audit honnête de l'existant.\n\n### Ce qu'il faut évaluer avant de commencer\n\n- nombre de boîtes mail et leur taille\n- licences existantes et fournisseur actuel\n- données à migrer : mails, fichiers, calendriers, contacts\n- points bloquants : alias, domaines, MFA non configuré\n- personnes clés à impliquer : DG, comptable, assistante de direction\n\n### Plan de migration type\n\n- Semaine 1 : audit, achat licences, vérification DNS\n- Semaine 2 : migration par lot (5 à 10 boîtes par nuit)\n- Semaine 3 : vérification, Teams et SharePoint de base\n- Semaine 4 : formation utilisateurs et bascule complète\n\n### Ce que tu vends vraiment\n\nTu ne vends pas des licences. Tu vends la **tranquillité de la bascule** : pas de perte de données, pas d'interruption, pas de panique le lundi matin."
    }
  ),
  module(
    "microsoft-365-pme",
    "configuration-teams-sharepoint",
    "Configuration Teams, SharePoint et OneDrive",
    "Mettre en place les espaces de travail, les droits et les bonnes pratiques de partage pour une PME.",
    "text",
    2,
    {
      content_body:
        "## Configurer M365 pour une PME sans sur-ingénierie\n\nLa plupart des PME n'ont pas besoin de 40 canaux Teams ni d'une arborescence SharePoint à 5 niveaux.\n\n### Structure Teams recommandée pour une PME\n\n- 1 équipe principale par département (Général, Commercial, Compta, RH)\n- 3 canaux maximum par équipe au départ\n- Réunions récurrentes configurées dès le départ\n\n### SharePoint et OneDrive\n\n- 1 site SharePoint par département si nécessaire\n- OneDrive pour les documents personnels uniquement\n- Partage externe désactivé par défaut sauf exception validée\n\n### Bonnes pratiques à imposer dès le départ\n\n- pas de fichiers importants dans les messages Teams\n- nommage des fichiers normalisé\n- dossiers d'archivage annuels\n\n> La plupart des problèmes M365 viennent d'une structure mal posée au départ. Prends 2h au début pour éviter 2 ans de désordre."
    }
  ),
  module(
    "microsoft-365-pme",
    "formation-utilisateurs-adoption",
    "Formation utilisateurs et adoption de l'outil",
    "Faire adopter M365 sans résistance : session de formation, guide utilisateur et suivi post-migration.",
    "text",
    3,
    {
      content_body:
        "## Faire adopter M365 sans friction\n\nLa technique est souvent la partie la plus simple. L'adoption, c'est le vrai défi.\n\n### Session de formation type (2h)\n\n- 30 min : accès, mots de passe, MFA\n- 30 min : Outlook et calendrier partagé\n- 30 min : Teams et réunions\n- 30 min : OneDrive et partage de fichiers\n\n### Ce qui marche\n\n- format en petits groupes de 5 à 8 personnes\n- support visuel simple avec captures d'écran\n- guide utilisateur d'une page par outil\n- suivi à J+7 et J+30 pour répondre aux questions\n\n### Livrable attendu\n\n- guide utilisateur PDF personnalisé\n- fiche d'accès rapide Teams/Outlook/OneDrive\n- compte-rendu de la session\n- recommandations post-migration"
    }
  ),
  module(
    "microsoft-365-pme",
    "contrat-support-m365",
    "Contrat de support et revenu récurrent M365",
    "Transformer chaque déploiement en mission récurrente avec un contrat de support mensuel défendable.",
    "text",
    4,
    {
      content_body:
        "## De la migration au contrat récurrent\n\nChaque migration réussie est une porte d'entrée vers un contrat mensuel.\n\n### Ce que tu peux facturer après la migration\n\n- gestion des licences et des nouvelles arrivées/départs\n- support utilisateurs sur Teams, Outlook, OneDrive\n- monitoring de base et sécurité (MFA, alertes)\n- point trimestriel et recommandations d'évolution\n\n### Forfait type\n\n- PME jusqu'à 15 postes : 150 à 300 €/mois\n- PME de 15 à 50 postes : 300 à 600 €/mois\n- inclure : 2h de support incluses, facturation heure sup au-delà\n\n### Argument commercial\n\n\"Vous avez investi dans les licences M365. Je m'assure que vos équipes les utilisent bien, que les accès sont sécurisés et que vous tirez vraiment parti de l'outil au fil du temps.\""
    }
  ),
  module(
    "microsoft-365-pme",
    "pack-migration-m365",
    "Pack migration et guide utilisateur M365",
    "Tous les modèles pour préparer, exécuter et documenter une migration M365 professionnelle.",
    "resource",
    5,
    {
      content_body:
        "## Contenu du pack M365\n\n- checklist de pré-migration (DNS, licences, boîtes)\n- modèle de planning de migration\n- guide utilisateur PDF personnalisable (Outlook, Teams, OneDrive)\n- trame de contrat de support mensuel\n- modèle de rapport post-migration\n\nUtilise ces ressources pour standardiser chaque mission M365 et gagner en crédibilité dès le premier rendez-vous."
    }
  ),
  module(
    "microsoft-365-pme",
    "intune-entra-a-venir",
    "Intune, Entra ID et gestion avancée des appareils",
    "Ce module couvrira la gestion des appareils, les politiques de conformité et l'administration avancée M365.",
    "coming_soon",
    6
  ),

  // ─── Cybersécurité PME ────────────────────────────────────────────────────

  module(
    "cybersecurite-pme",
    "video-tutorielle",
    "Vidéo tutorielle : sécuriser une PME et vendre une offre cyber",
    "Une vidéo guidée pour comprendre la méthode d'audit, les protections essentielles et comment packager une offre cybersécurité accessible.",
    "video",
    0,
    {
      content_url: sampleVideos.cybersecurite,
      content_body:
        "## Ce que tu vas apprendre\n\nCette vidéo tutorielle couvre les étapes essentielles de la cybersécurité en PME : de l'audit initial jusqu'à la vente d'une offre de protection récurrente.\n\n### Points clés\n\n- audit cybersécurité accessible pour une PME\n- sécurisation des postes, accès et sauvegardes\n- sensibilisation des équipes aux risques courants\n- construction d'une offre de protection facturable\n- suivi et renouvellement du contrat\n\n### Après la vidéo\n\nParcours les modules texte pour appliquer chaque point avec tes clients."
    }
  ),
  module(
    "cybersecurite-pme",
    "audit-cyber-pme",
    "Réaliser un audit cybersécurité simple pour une PME",
    "Évaluer le niveau de protection existant, identifier les risques prioritaires et présenter les résultats au dirigeant.",
    "text",
    1,
    {
      content_body:
        "## Auditer une PME sans être expert certifié\n\nUn audit cybersécurité basique peut être réalisé par tout technicien rigoureux.\n\n### Les 6 points à évaluer\n\n- **Mises à jour** : Windows, logiciels critiques, antivirus à jour ?\n- **Mots de passe** : politique de mots de passe, comptes partagés, MFA ?\n- **Sauvegardes** : existe-t-il ? Testé récemment ? Hors site ?\n- **Accès distants** : VPN ou RDP exposé ? Accès avec quel contrôle ?\n- **Emails** : SPF, DKIM, DMARC configurés ?\n- **Sensibilisation** : les équipes savent-elles reconnaître un phishing ?\n\n### Format de présentation au dirigeant\n\n- feu tricolore par domaine (vert / orange / rouge)\n- 3 risques prioritaires avec impact business estimé\n- recommandations concrètes avec coût estimé\n- plan d'action sur 30 / 90 jours\n\n> Ne cherche pas à tout corriger le jour 1. Montre que tu comprends les risques et que tu peux les traiter progressivement."
    }
  ),
  module(
    "cybersecurite-pme",
    "securisation-postes-acces",
    "Sécurisation des postes, des accès et des sauvegardes",
    "Les actions concrètes pour protéger une PME sans budget illimité ni équipement entreprise.",
    "text",
    2,
    {
      content_body:
        "## Sécuriser une PME avec des moyens raisonnables\n\nLa plupart des incidents PME viennent de 3 causes : mots de passe faibles, sauvegardes absentes, mises à jour non faites.\n\n### Postes de travail\n\n- Windows Update activé et suivi\n- EDR ou antivirus professionnel (pas Windows Defender seul)\n- chiffrement disque (BitLocker)\n- compte utilisateur non administrateur en usage quotidien\n\n### Accès et identités\n\n- MFA sur les comptes Microsoft 365, Google Workspace, VPN\n- gestionnaire de mots de passe recommandé\n- suppression des comptes des anciens collaborateurs dès le départ\n- pas de mots de passe partagés entre plusieurs personnes\n\n### Sauvegardes\n\n- règle 3-2-1 expliquée simplement : 3 copies, 2 supports, 1 hors site\n- test de restauration au moins une fois par trimestre\n- sauvegarde des données critiques : comptabilité, clients, contrats\n\n> Une PME bien protégée sur ces 3 points résiste à 80% des incidents courants."
    }
  ),
  module(
    "cybersecurite-pme",
    "sensibilisation-equipes",
    "Sensibilisation des équipes aux risques courants",
    "Former les collaborateurs aux attaques les plus fréquentes sans les noyer dans un cours de sécurité.",
    "text",
    3,
    {
      content_body:
        "## Former les équipes sans ennuyer personne\n\nLa sensibilisation réussit quand elle part du concret et du quotidien.\n\n### Session type (1h30)\n\n- 20 min : phishing — comment reconnaître un mail frauduleux\n- 20 min : mots de passe — pourquoi et comment bien les gérer\n- 20 min : navigation et téléchargements — les pièges les plus courants\n- 30 min : simulation d'incident — que faire si ça arrive ?\n\n### Ce qui marche\n\n- exemples réels d'entreprises similaires touchées\n- test de phishing simulé avant et après la session\n- fiche récapitulative d'une page\n- canal de signalement clair pour les incidents suspects\n\n### Livrable\n\n- support de formation simplifié\n- fiche de bons réflexes\n- procédure d'alerte en cas d'incident"
    }
  ),
  module(
    "cybersecurite-pme",
    "offre-cyber-recurring",
    "Packager et vendre une offre cyber récurrente",
    "Construire une offre de protection mensuelle crédible et la défendre face à un dirigeant de PME.",
    "text",
    4,
    {
      content_body:
        "## Vendre la cybersécurité sans effrayer\n\nLe dirigeant PME a peur des mots techniques et du budget. Parle en risques et en tranquillité.\n\n### Offre de base défendable\n\n- audit initial (facturation unique : 300 à 600 €)\n- suivi mensuel : vérification des sauvegardes, mises à jour, alertes antivirus\n- sensibilisation annuelle des équipes\n- rapport trimestriel de sécurité\n- prix : 100 à 250 €/mois selon taille\n\n### Argument commercial\n\n\"Un incident ransomware coûte en moyenne 10 000 € à une PME entre la perte de données, le temps d'arrêt et la récupération. Mon offre à 150 €/mois, c'est l'assurance de ne pas en arriver là.\"\n\n### Renouvellement\n\n- chaque incident signalé et traité renforce le contrat\n- rapport annuel de synthèse pour justifier la valeur\n- proposition d'évolution basée sur les risques résiduels"
    }
  ),
  module(
    "cybersecurite-pme",
    "pack-audit-cyber",
    "Pack audit cybersécurité et trame de contrat",
    "Les ressources pour réaliser un audit professionnel et vendre un contrat de protection récurrent.",
    "resource",
    5,
    {
      content_body:
        "## Contenu du pack cybersécurité\n\n- grille d'audit cybersécurité PME\n- modèle de rapport feu tricolore pour le dirigeant\n- trame de contrat de protection mensuelle\n- checklist de sécurisation poste par poste\n- guide de sensibilisation équipe (support de formation)\n\nUtilise ces ressources pour standardiser tes missions cyber et prouver ton sérieux dès le premier rendez-vous."
    }
  ),
  module(
    "cybersecurite-pme",
    "pentest-conformite-a-venir",
    "Pentest basique, conformité RGPD et gestion des incidents",
    "Ce module couvrira les tests d'intrusion simples, les obligations RGPD et la procédure en cas d'incident.",
    "coming_soon",
    6
  ),

  // ─── Automatisation n8n ───────────────────────────────────────────────────

  module(
    "automatisation-n8n",
    "video-tutorielle",
    "Vidéo tutorielle : automatiser et vendre des workflows n8n",
    "Une vidéo guidée pour comprendre n8n, identifier les automatisations rentables et les packager en offre de service.",
    "video",
    0,
    {
      content_url: sampleVideos.automatisationN8n,
      content_body:
        "## Ce que tu vas apprendre\n\nCette vidéo tutorielle couvre les bases de n8n et la logique pour en faire une offre de service : de l'identification des tâches automatisables jusqu'à la facturation du workflow.\n\n### Points clés\n\n- comprendre n8n sans être développeur\n- identifier les automatisations les plus rentables\n- créer un workflow de démonstration convaincant\n- packager l'automatisation comme offre récurrente\n- vendre et maintenir des workflows pour des PME\n\n### Après la vidéo\n\nParcours les modules texte pour appliquer chaque étape avec tes premiers clients."
    }
  ),
  module(
    "automatisation-n8n",
    "comprendre-n8n",
    "Comprendre n8n et identifier les tâches automatisables",
    "Découvrir n8n, ses concepts clés et les cas d'usage les plus rentables à proposer à des PME.",
    "text",
    1,
    {
      content_body:
        "## n8n en 10 minutes\n\nn8n est un outil d'automatisation open-source que tu peux héberger toi-même ou utiliser en cloud.\n\n### Concepts essentiels\n\n- **Workflow** : une suite d'étapes automatisées déclenchées par un événement\n- **Noeud** : chaque action (envoyer un mail, créer une ligne, appeler une API)\n- **Trigger** : l'événement qui démarre le workflow (webhook, planification, formulaire...)\n- **Credentials** : les connexions aux services externes\n\n### Les automatisations les plus rentables pour une PME\n\n- création automatique de facture ou devis depuis un formulaire\n- notification Slack/Teams quand un ticket GLPI est ouvert\n- synchronisation CRM vers tableur ou base Supabase\n- rapport hebdomadaire envoyé automatiquement par mail\n- onboarding collaborateur automatisé\n\n### Ce qu'il faut éviter\n\n- promettre des automatisations trop complexes dès le début\n- utiliser n8n pour tout ce qui a déjà un outil natif simple\n- créer des workflows sans documentation de maintenance"
    }
  ),
  module(
    "automatisation-n8n",
    "creer-workflow-utile",
    "Créer un workflow utile et le tester",
    "Construire un premier workflow concret, le tester, le déboguer et le livrer à un client.",
    "text",
    2,
    {
      content_body:
        "## Créer ton premier workflow vendable\n\nCommence toujours par un workflow simple avec un résultat visible.\n\n### Exemple : alerte email quand un formulaire est rempli\n\n- Trigger : Webhook ou formulaire Typeform / Tally\n- Action 1 : envoyer un email de confirmation au client\n- Action 2 : créer une ligne dans Google Sheets ou Airtable\n- Action 3 : envoyer une notification interne sur Slack ou Teams\n\n### Méthode de construction\n\n- commence par le résultat attendu, pas par les outils\n- construis noeud par noeud en testant chaque étape\n- utilise les données d'exemple de n8n pour tester sans vrai trafic\n- nomme chaque noeud clairement pour la maintenance\n\n### Avant de livrer\n\n- tester le workflow complet avec de vraies données\n- documenter chaque connexion et credential nécessaire\n- prévoir ce qui se passe en cas d'erreur (notifications, reprise)\n- former le client à surveiller les exécutions"
    }
  ),
  module(
    "automatisation-n8n",
    "hebergement-securite",
    "Hébergement n8n, sécurité et maintenance",
    "Installer n8n sur un VPS, sécuriser l'accès et proposer un contrat de maintenance des workflows.",
    "text",
    3,
    {
      content_body:
        "## Héberger n8n correctement\n\nSelf-hosted n8n = tu contrôles tout mais tu en es responsable.\n\n### Installation recommandée\n\n- VPS 2 vCPU / 4 Go RAM minimum (Hetzner, OVH, Infomaniak)\n- Docker + Traefik ou Nginx pour le reverse proxy\n- HTTPS obligatoire avec Let's Encrypt\n- Accès protégé par mot de passe fort et si possible IP whitelist\n\n### Sécurité des credentials\n\n- ne jamais stocker les credentials clients dans les noeuds en clair\n- utiliser les variables d'environnement pour les secrets\n- séparer les environnements client si possible\n\n### Contrat de maintenance\n\n- vérification mensuelle des workflows actifs\n- alertes en cas d'échec d'exécution\n- mise à jour n8n trimestrielle\n- rapport mensuel des automatisations actives et leur statut\n- prix type : 80 à 200 €/mois selon volume de workflows"
    }
  ),
  module(
    "automatisation-n8n",
    "packager-offre-automatisation",
    "Packager et vendre une offre d'automatisation",
    "Transformer un workflow en offre de service claire, avec tarification, contrat et arguments de vente.",
    "text",
    4,
    {
      content_body:
        "## Vendre l'automatisation sans la sur-vendre\n\nL'automatisation se vend sur le gain de temps et la réduction des erreurs, pas sur la technique.\n\n### Les offres qui se signent\n\n- **Offre audit** (ponctuelle) : cartographie des tâches automatisables — 150 à 300 €\n- **Offre workflow** (projet) : création d'un workflow livré et documenté — 300 à 800 €\n- **Offre récurrente** : hébergement + maintenance + évolutions — 80 à 200 €/mois\n\n### Argument commercial\n\n\"Vous perdez X heures par semaine sur cette tâche répétitive. En automatisant ça avec n8n, vous récupérez du temps et supprimez les erreurs de saisie. Le ROI est visible dès le premier mois.\"\n\n### Ce qu'il faut documenter pour chaque client\n\n- liste des workflows actifs\n- services connectés et credentials\n- fréquence d'exécution\n- point de contact en cas de problème\n- conditions de modification ou extension"
    }
  ),
  module(
    "automatisation-n8n",
    "templates-workflows",
    "Templates de workflows et guide de démarrage",
    "Des workflows prêts à utiliser et un guide pour démarrer rapidement avec n8n sur les cas les plus courants.",
    "resource",
    5,
    {
      content_body:
        "## Contenu du pack n8n\n\n- 5 templates de workflows courants (notification, rapport, formulaire, sync CRM, onboarding)\n- guide d'installation n8n sur VPS (Docker + HTTPS)\n- trame de contrat de maintenance workflows\n- checklist de livraison workflow client\n- modèle de documentation workflow\n\nUtilise ces templates comme base pour tes premières missions et adapte-les au contexte de chaque client."
    }
  ),
  module(
    "automatisation-n8n",
    "make-zapier-comparaison-a-venir",
    "Make, Zapier et intégrations avancées",
    "Ce module couvrira la comparaison n8n / Make / Zapier et les intégrations plus complexes avec des APIs externes.",
    "coming_soon",
    6
  ),
  // ── Agent IA autonome ──────────────────────────────────────────────────
  module(
    "agent-ia-autonome",
    "agent-ia-intro-video",
    "Introduction : qu'est-ce qu'un vrai agent IA ?",
    "La différence entre un chatbot, un assistant et un agent autonome. Ce que fait un agent en coulisses et pourquoi ça change tout.",
    "video",
    0,
    {
      content_url: null,
      content_body:
        "## Qu'est-ce qu'un vrai agent IA ?\n\nCette vidéo d'introduction pose les bases : ce qui distingue un agent autonome d'un simple chatbot, et pourquoi cette distinction est fondamentale avant de construire quoi que ce soit.\n\n### Ce que tu vas comprendre\n\n- La différence chatbot / assistant / agent\n- Ce qu'un agent peut faire que ChatGPT ne peut pas\n- Comment fonctionne la boucle perception → décision → action\n- Le cas réel présenté dans cette formation\n\n### Conseil\n\nRegarde cette vidéo en entier avant de passer aux modules techniques — elle donne le cadre mental nécessaire pour tout ce qui suit."
    }
  ),

  module(
    "agent-ia-autonome",
    "agent-vs-chatbot",
    "Agent vs chatbot vs assistant : les vraies différences",
    "Comprendre l'architecture d'un agent autonome : perception, mémoire, décision, action. Pourquoi ChatGPT seul ne suffit pas et ce qu'il faut ajouter pour en faire un agent.",
    "text",
    1,
    {
      content_body:
        "## Agent vs chatbot vs assistant : les vraies différences\n\nAvant de construire quoi que ce soit, il faut comprendre ce que tu construis vraiment.\n\n---\n\n### Le chatbot classique\n\nUn chatbot répond à des questions. Il n'a pas de mémoire entre les sessions, pas d'accès à des outils externes, et il ne prend aucune initiative. Il attend qu'on lui parle.\n\nExemples : ChatGPT sans plugins, Intercom bot, FAQ automatisée.\n\n### L'assistant IA\n\nUn assistant peut utiliser des outils (chercher sur internet, lire un fichier, appeler une API). Mais il attend toujours une instruction humaine pour chaque action. Il ne décide pas seul.\n\nExemples : Claude avec accès aux outils, Copilot, Gemini Advanced.\n\n### L'agent autonome\n\nUn agent :\n- **Perçoit** son environnement (fichiers, APIs, état du système)\n- **Mémorise** ce qu'il a appris (mémoire persistante entre sessions)\n- **Décide** quelle action effectuer pour atteindre un objectif\n- **Agit** sans attendre une instruction pour chaque étape\n- **S'améliore** en enregistrant ce qui a fonctionné ou échoué\n\nC'est la différence entre un employé qui exécute des tâches et un collaborateur qui gère des projets.\n\n---\n\n### L'architecture d'un agent en 4 composants\n\n**1. Le LLM (cerveau)**\nLe modèle de langage qui prend les décisions. Claude, GPT-4o, Mistral — le choix du modèle détermine la qualité du raisonnement.\n\n**2. La mémoire**\nCe qui permet à l'agent de se souvenir entre les sessions. Sans mémoire, chaque conversation repart de zéro — l'agent ne connaît pas le projet, ne reconnaît pas les préférences, ne capitalise pas sur l'expérience.\n\nDeux types de mémoire :\n- **Mémoire contextuelle** : ce qui est dans la fenêtre de contexte actuelle (temporaire)\n- **Mémoire persistante** : fichiers, base de données, notes structurées (permanent)\n\n**3. Les outils**\nCe qui permet à l'agent d'agir sur le monde réel : lire/écrire des fichiers, appeler des APIs, accéder à une base de données, exécuter du code, envoyer des emails.\n\n**4. Les instructions système**\nLe cadre de comportement : identité, règles, limites, style de réponse. C'est la \"personnalité\" et les \"réflexes\" de l'agent.\n\n---\n\n### Pourquoi cette architecture change tout\n\nAvec un chatbot, tu répètes les mêmes informations à chaque session. Tu reformules le contexte. Tu corriges les mêmes erreurs.\n\nAvec un agent à mémoire persistante, il sait déjà :\n- Qui tu es et comment tu travailles\n- L'état de tes projets en cours\n- Ce qu'il a déjà essayé et ce qui a échoué\n- Tes préférences de communication\n\n> C'est exactement ce que tu vas construire dans cette formation : un agent qui te connaît, qui mémorise, et qui agit sans que tu répètes le contexte à chaque fois."
    }
  ),

  module(
    "agent-ia-autonome",
    "choisir-son-llm",
    "Choisir son LLM : Claude, GPT, Mistral — comparatif honnête",
    "Forces, faiblesses, tarifs et cas d'usage réels de chaque modèle. Quel LLM choisir selon ce que tu veux faire construire.",
    "text",
    2,
    {
      content_body:
        "## Choisir son LLM : comparatif honnête 2026\n\nLe choix du modèle de langage détermine les capacités, les coûts et les limites de ton agent. Voici un comparatif sans marketing.\n\n---\n\n### Claude (Anthropic) — Recommandé pour les agents\n\n**Points forts** :\n- Meilleur raisonnement multi-étapes du marché en 2026\n- Fenêtre de contexte 200K tokens (peut lire des projets entiers)\n- Suivit d'instructions complexes très fiable\n- Excellent pour les tâches de code, analyse et rédaction structurée\n- API stable avec support natif des outils (tool use)\n\n**Points faibles** :\n- Légèrement plus cher que GPT-4o sur les gros volumes\n- Pas d'image generation native\n\n**Tarifs API (Claude Sonnet 4.6)** : ~3$/M tokens input, ~15$/M tokens output\n\n**Idéal pour** : agents de développement, agents de recherche, agents de gestion de projets\n\n---\n\n### GPT-4o (OpenAI)\n\n**Points forts** :\n- Multimodal natif (texte, image, audio, vidéo)\n- Écosystème le plus large (plugins, assistants, GPTs)\n- Très bonne performance générale\n- ChatGPT interface si tu veux tester rapidement\n\n**Points faibles** :\n- Moins fiable que Claude sur les instructions complexes à respecter\n- Hallucinations légèrement plus fréquentes sur des tâches factuelles précises\n- Politique d'utilisation plus restrictive sur certains sujets\n\n**Tarifs API** : ~2,5$/M tokens input, ~10$/M tokens output\n\n**Idéal pour** : agents multimodaux, agents avec traitement d'images ou audio\n\n---\n\n### Mistral (français, open source)\n\n**Points forts** :\n- Open source — tu peux l'héberger toi-même (coût zéro en tokens)\n- Données hébergées en Europe (conformité RGPD)\n- Mistral Large rivalise avec GPT-4 sur le français\n- Idéal pour les projets avec contraintes de confidentialité\n\n**Points faibles** :\n- Infrastructure à gérer si auto-hébergé\n- Légèrement en retrait sur les tâches de raisonnement très complexes\n\n**Tarifs API** : Mistral Small à 0,2$/M tokens — très accessible\n\n**Idéal pour** : agents pour clients avec données sensibles, projets B2B français\n\n---\n\n### La règle de choix en 3 questions\n\n**1. Ton agent traite des données confidentielles ?**\n→ Oui : Mistral en auto-hébergement ou API EU\n→ Non : Claude ou GPT\n\n**2. Ton agent a besoin de traiter des images ou de l'audio ?**\n→ Oui : GPT-4o\n→ Non : Claude Sonnet\n\n**3. Ton agent est un développeur/analyste/chef de projet ?**\n→ Claude Sonnet ou Opus — meilleur raisonnement structuré\n\n---\n\n### Coût réel d'un agent en production\n\nUn agent qui tourne 8h/jour avec 50 interactions de 2 000 tokens chacune :\n- **Claude Sonnet** : ~2–4 $/mois\n- **GPT-4o** : ~1,5–3 $/mois\n- **Mistral Large** : ~0,5–1 $/mois\n\n> Pour un usage individuel ou une PME, le coût LLM est négligeable — moins de 10 $/mois dans la majorité des cas. Le vrai investissement, c'est le temps de configuration initiale."
    }
  ),

  module(
    "agent-ia-autonome",
    "memoire-persistante",
    "Construire la mémoire persistante de l'agent",
    "Comment donner une vraie mémoire à ton agent : fichiers structurés, index MEMORY.md, types de mémoire (user/feedback/project/reference) et règles d'auto-apprentissage.",
    "text",
    3,
    {
      content_body:
        "## Construire la mémoire persistante de l'agent\n\nC'est le composant le plus important et le plus sous-estimé. Un agent sans mémoire est un chatbot qui repart de zéro à chaque session. Un agent avec mémoire est un collaborateur qui s'améliore.\n\n---\n\n### Pourquoi les fichiers, pas une base de données\n\nL'instinct initial est d'utiliser une base de données (PostgreSQL, Supabase, Pinecone). C'est souvent une erreur pour commencer.\n\n**Les fichiers Markdown sont supérieurs pour la mémoire agent parce que** :\n- Le LLM les lit directement sans traduction\n- Pas d'infrastructure à maintenir\n- Versionnable avec Git\n- Modifiable manuellement en cas d'erreur\n- Chargés dans le contexte sans overhead\n\n---\n\n### Les 4 types de mémoire\n\n**1. Mémoire utilisateur** (`user_*.md`)\nTout ce qui concerne la personne avec qui l'agent travaille : rôle, préférences, style de communication, niveau technique, objectifs.\n\nExemple de contenu :\n```\nNom : Kenams | Entrepreneur digital, 12 ans d'expérience IT\nStyle : direct, MVP rapide, zéro blabla\nObjectif 2026 : indépendance financière via projets digitaux\nStacks favorites : Next.js, Expo, Supabase, Stripe\n```\n\n**2. Mémoire feedback** (`feedback_*.md`)\nLes corrections et validations de comportement. Quand l'agent fait une erreur et se fait corriger — ou quand une approche est validée.\n\nStructure recommandée :\n```\n# Règle : [intitulé court]\n**Why:** [raison donnée par l'utilisateur]\n**How to apply:** [dans quelles situations appliquer]\n```\n\n**3. Mémoire projet** (`project_*.md`)\nL'état de chaque projet actif : stack, credentials, URL, état d'avancement, décisions importantes.\n\n**4. Mémoire référence** (`reference_*.md`)\nLes pointeurs vers les ressources externes : tokens API, URLs de services, accès aux outils.\n\n---\n\n### L'index MEMORY.md\n\nL'index est le fichier chargé en premier à chaque session. Il liste tous les fichiers mémoire avec une ligne de résumé.\n\n```markdown\n# Memory Index\n\n## Profil\n- [Identité utilisateur](user_identity.md) — Prénom, rôle, objectifs\n- [Profil psychologique](user_profile_deep.md) — Style de travail, préférences\n\n## Règles comportement\n- [Autonomie maximale](feedback_autonomy.md) — Agir sans demander permission\n- [Git push fréquent](feedback_git_push.md) — Pusher après chaque tâche\n\n## Projets actifs\n- [Inventaire projets](project_inventory.md) — 20 projets avec stack et état\n```\n\nRègle : l'index doit tenir en moins de 200 lignes. Au-delà, il n'est pas chargé entièrement.\n\n---\n\n### Le système d'auto-apprentissage\n\nL'agent ne doit pas attendre qu'on lui demande de mémoriser. Il doit identifier seul ce qui mérite d'être retenu.\n\n**Triggers automatiques** :\n- Correction d'approche → `feedback_*.md`\n- Validation d'une décision non-évidente → `feedback_*.md`\n- Nouveau projet mentionné → `project_*.md`\n- Credential ou accès découvert → `reference_*.md`\n- Deadline ou milestone → roadmap\n\n**La règle du test à 3 mois** : une information mérite d'être mémorisée si elle sera encore utile dans 3 mois. Si c'est éphémère, on ne mémorise pas.\n\n---\n\n### Mise en place pratique (15 minutes)\n\n```bash\n# Structure de départ\nmkdir -p ~/.claude/projects/mon-projet/memory\ntouch ~/.claude/projects/mon-projet/memory/MEMORY.md\ntouch ~/.claude/projects/mon-projet/memory/user_identity.md\ntouch ~/.claude/projects/mon-projet/memory/user_profile.md\n```\n\nFichier `MEMORY.md` minimal :\n```markdown\n# Memory Index\n## Profil\n- [Identité](user_identity.md) — Qui je suis\n- [Profil](user_profile.md) — Comment je travaille\n```\n\nFichier `user_identity.md` :\n```markdown\n---\nname: user-identity\ndescription: Identité et rôle de l'utilisateur\nmetadata:\n  type: user\n---\nNom : [ton prénom]\nRôle : [ce que tu fais]\nObjectif principal : [en une phrase]\nStyle de travail : [direct/détaillé/etc.]\n```\n\n> Remplis ces 2 fichiers maintenant — ton agent s'en souviendra à chaque session."
    }
  ),

  module(
    "agent-ia-autonome",
    "connecter-les-outils-mcp",
    "Connecter des outils à l'agent : MCP, APIs et actions réelles",
    "Ce que sont les Model Context Protocol servers, comment les configurer, et quels outils connecter en premier pour un agent réellement utile.",
    "text",
    4,
    {
      content_body:
        "## Connecter des outils à l'agent : MCP, APIs et actions réelles\n\nUn agent sans outils ne peut que répondre. Un agent avec outils peut agir. C'est la différence entre un conseiller et un exécutant.\n\n---\n\n### Qu'est-ce que le MCP (Model Context Protocol) ?\n\nLe MCP est un protocole standardisé créé par Anthropic pour connecter des outils externes à un agent de manière sécurisée et structurée.\n\nConcrètement : au lieu de coder l'appel à chaque API manuellement, tu installes un serveur MCP qui expose des \"outils\" que l'agent peut appeler directement.\n\n**Architecture** :\n```\nAgent (LLM) → [decide d'utiliser un outil]\n  → appelle mcp__supabase__execute_sql\n  → le serveur MCP Supabase exécute la requête\n  → retourne le résultat à l'agent\n  → l'agent continue son raisonnement\n```\n\n---\n\n### Les 5 serveurs MCP essentiels pour démarrer\n\n**1. Filesystem** (lecture/écriture de fichiers)\n```json\n{\n  \"filesystem\": {\n    \"command\": \"npx\",\n    \"args\": [\"-y\", \"@modelcontextprotocol/server-filesystem\", \"/ton/projet\"]\n  }\n}\n```\nPermet à l'agent de lire et modifier les fichiers de ton projet directement.\n\n**2. Supabase** (base de données)\n```json\n{\n  \"supabase\": {\n    \"command\": \"npx\",\n    \"args\": [\"-y\", \"@supabase/mcp-server-supabase\"],\n    \"env\": { \"SUPABASE_ACCESS_TOKEN\": \"ton_token\" }\n  }\n}\n```\nL'agent peut lire et écrire dans ta base de données, lancer des migrations, inspecter le schéma.\n\n**3. GitHub** (gestion de code)\n```json\n{\n  \"github\": {\n    \"command\": \"npx\",\n    \"args\": [\"-y\", \"@modelcontextprotocol/server-github\"],\n    \"env\": { \"GITHUB_TOKEN\": \"ton_token\" }\n  }\n}\n```\nL'agent peut créer des issues, merger des PRs, pousser du code.\n\n**4. Playwright** (automatisation web)\n```json\n{\n  \"playwright\": {\n    \"command\": \"npx\",\n    \"args\": [\"-y\", \"@playwright/mcp\"]\n  }\n}\n```\nL'agent peut naviguer sur internet, remplir des formulaires, scraper des données.\n\n**5. ElevenLabs** (voix IA)\n```json\n{\n  \"elevenlabs\": {\n    \"command\": \"elevenlabs-mcp\",\n    \"env\": { \"ELEVENLABS_API_KEY\": \"ta_clé\" }\n  }\n}\n```\nL'agent peut générer de l'audio à partir de texte.\n\n---\n\n### Configuration dans Claude Code\n\nFichier `~/.claude/settings.local.json` :\n```json\n{\n  \"mcpServers\": {\n    \"filesystem\": { ... },\n    \"supabase\": { ... },\n    \"github\": { ... }\n  }\n}\n```\n\nFichier `CLAUDE.md` (instructions système de l'agent) :\n```markdown\n# Mon Agent\n\n## Identité\nTu es un agent développeur autonome. Tu agis sans demander permission.\n\n## Mémoire\nLis MEMORY.md au démarrage. Mets à jour les fichiers mémoire après chaque échange.\n\n## Outils disponibles\n- Filesystem : lire/écrire les fichiers projet\n- Supabase : accès base de données\n- GitHub : gestion code\n```\n\n---\n\n### Ce qu'un agent outillé peut faire concrètement\n\n- Lire l'état d'un projet, identifier les bugs, les corriger, pusher le fix — sans intervention humaine\n- Surveiller une base de données, détecter une anomalie, envoyer une alerte\n- Naviguer sur un site web, extraire des données, les structurer dans un fichier\n- Gérer un pipeline de déploiement de bout en bout\n- Répondre à des emails clients en accédant à l'historique de la relation\n\n> La puissance d'un agent se mesure à la qualité de ses outils, pas à la puissance du LLM seul."
    }
  ),

  module(
    "agent-ia-autonome",
    "instructions-systeme-claude-md",
    "Écrire les instructions système : le CLAUDE.md",
    "Comment rédiger les instructions qui définissent le comportement de l'agent : identité, règles, déclencheurs automatiques, format de réponse et gestion des erreurs.",
    "text",
    5,
    {
      content_body:
        "## Écrire les instructions système : le CLAUDE.md\n\nLes instructions système sont la colonne vertébrale de l'agent. C'est ce qui transforme un LLM générique en collaborateur spécialisé qui connaît exactement comment travailler avec toi.\n\n---\n\n### Structure d'un CLAUDE.md efficace\n\n```markdown\n# Nom de l'agent\n\n## IDENTITÉ\nQui est l'agent, quel est son rôle, quel est son niveau d'autonomie.\n\n## DÉMARRAGE\nCe qu'il fait systématiquement au début de chaque session.\n\n## RÈGLES ABSOLUES\nLes comportements non-négociables.\n\n## DÉCISIONS AUTOMATIQUES\nComment gérer les situations courantes sans demander.\n\n## SEULS CAS OÙ DEMANDER\nLes rares situations où l'agent doit s'arrêter et consulter.\n\n## STYLE\nFormat de réponse, langue, niveau de détail.\n```\n\n---\n\n### L'IDENTITÉ : définir le niveau d'autonomie\n\nC'est la section la plus importante. Elle définit si l'agent est passif (attend des instructions) ou actif (prend des décisions).\n\n**Agent passif** (chatbot amélioré) :\n```markdown\nTu es un assistant qui répond aux questions et exécute les tâches demandées.\nTu demandes confirmation avant chaque action.\n```\n\n**Agent autonome** (collaborateur) :\n```markdown\nTu es un agent développeur senior. Tu travailles seul jusqu'au résultat.\nTu ne demandes jamais la permission sur ce qui est déductible.\nEn cas d'ambiguïté → prendre l'interprétation la plus utile et avancer.\nEn cas d'erreur → analyser, corriger, relancer (loop jusqu'à 5x).\n```\n\n---\n\n### Les RÈGLES ABSOLUES : ce qui ne change jamais\n\nExemples concrets :\n```markdown\n- Jamais de question si la réponse est déductible du contexte\n- Jamais de pseudo-code — toujours du code fonctionnel complet\n- En cas d'erreur → lire l'erreur complète, corriger la cause racine\n- Fichier manquant → le créer avec des valeurs par défaut sensibles\n- Package manquant → l'installer sans demander\n```\n\n---\n\n### Les DÉCISIONS AUTOMATIQUES : un tableau de cas\n\n```markdown\n| Situation | Action automatique |\n|-----------|-------------------|\n| Port occupé | Essayer port+1 |\n| Fichier à écraser | Écraser (pas de backup sauf DB prod) |\n| Import manquant | npm install sans demander |\n| Commande échoue | Lire l'erreur, corriger, relancer |\n| Commit à faire | Committer avec message descriptif |\n```\n\n---\n\n### Les cas où l'agent DOIT s'arrêter\n\nDéfinir ces cas précisément évite les accidents :\n```markdown\n## SEULS CAS OÙ DEMANDER\n- Suppression irréversible de données de production (DB live)\n- Force push sur main d'un repo partagé\n- Dépense financière réelle (API payante non encore utilisée)\n- Action visible par des tiers (email envoyé, post publié)\n```\n\n---\n\n### Le FORMAT : définir ce que l'agent répond\n\nSans format défini, l'agent répond de manière inconsistante. Avec format défini, chaque réponse suit la même structure :\n\n```markdown\n## FORMAT DE RÉPONSE\n[Ce qui a été fait — bullets courts]\nLancer : `commande exacte`\nReste : [liste courte ou \"rien\"]\n```\n\n---\n\n### Les déclencheurs d'auto-apprentissage\n\nL'agent doit savoir quand mémoriser sans qu'on le lui demande :\n\n```markdown\n## AUTO-APPRENTISSAGE\nAprès chaque échange, se demander : \"Ai-je appris quelque chose d'utile ?\"\n\nTriggers automatiques :\n- Correction → feedback_*.md\n- Validation d'approche non-évidente → feedback_*.md  \n- Nouveau projet → project_*.md\n- Credential découvert → reference_*.md\n```\n\n> **Règle de qualité** : un bon CLAUDE.md se lit en 2 minutes et couvre 95 % des situations. Si tu dois ajouter une règle à chaque session, c'est qu'elle manque dans le fichier."
    }
  ),

  module(
    "agent-ia-autonome",
    "cas-usage-monetisables",
    "Cas d'usage monétisables : vendre un agent à une PME",
    "5 types d'agents qui se vendent aujourd'hui, comment les packager, les tarifer et les maintenir. Du projet client concret à la facturation récurrente.",
    "text",
    6,
    {
      content_body:
        "## Cas d'usage monétisables : vendre un agent IA à une PME\n\nUn agent IA bien configuré peut se vendre entre 500 € et 5 000 € en setup + 200 à 800 €/mois en maintenance. Voici les 5 types qui se signent le plus facilement en 2026.\n\n---\n\n### Agent 1 — Support client automatisé\n\n**Ce qu'il fait** : répond aux questions des clients par email ou chat, escalade vers un humain si besoin, apprend des nouvelles FAQ au fil du temps.\n\n**Stack** : Claude + MCP Gmail + base de connaissances Markdown + Supabase pour les tickets\n\n**Vendu comment** :\n- Setup : 800–1 500 €\n- Maintenance mensuelle : 200–350 €/mois\n- Argument : \"Vos 80 % de questions répétitives traitées automatiquement, 24h/24\"\n\n**Clients cibles** : e-commerce, agences, SaaS, cabinets avec volume de demandes répétitives\n\n---\n\n### Agent 2 — Assistant commercial (qualification de leads)\n\n**Ce qu'il fait** : analyse les leads entrants, pose les questions de qualification, priorise la liste de rappel, rédige des emails de suivi personnalisés.\n\n**Stack** : Claude + MCP CRM (HubSpot, Notion) + Gmail + mémoire des profils clients\n\n**Vendu comment** :\n- Setup : 1 200–2 500 €\n- Maintenance : 300–500 €/mois\n- Argument : \"Votre commercial ne perd plus de temps sur les leads froids\"\n\n**Clients cibles** : agences immobilières, agences de recrutement, commerciaux indépendants\n\n---\n\n### Agent 3 — Agent de veille et rapport\n\n**Ce qu'il fait** : surveille des sources définies (concurrents, presse sectorielle, LinkedIn), synthétise en rapport hebdomadaire, alerte sur les événements importants.\n\n**Stack** : Claude + Playwright (scraping) + Gmail + mémoire des sujets à surveiller\n\n**Vendu comment** :\n- Setup : 600–1 200 €\n- Maintenance : 150–300 €/mois\n- Argument : \"Votre rapport de veille concurrentielle, sans y passer 4h par semaine\"\n\n**Clients cibles** : directions marketing, cabinets de conseil, gérants de PME\n\n---\n\n### Agent 4 — Agent développeur interne\n\n**Ce qu'il fait** : gère les tâches de développement répétitives (corrections de bugs, mises à jour, tests), documente le code, génère des rapports d'état.\n\n**Stack** : Claude Code + MCP GitHub + MCP Filesystem + mémoire du projet\n\n**Vendu comment** :\n- Setup : 1 500–3 000 € (configuration + onboarding équipe)\n- Maintenance : 400–700 €/mois\n- Argument : \"Un développeur junior autonome qui ne dort pas\"\n\n**Clients cibles** : startups avec petites équipes tech, agences web, DSI PME\n\n---\n\n### Agent 5 — Agent de prospection automatisée\n\n**Ce qu'il fait** : identifie des prospects selon des critères définis, rédige des emails personnalisés, suit les relances, rapporte les résultats.\n\n**Stack** : Claude + Playwright + Gmail + mémoire des prospects et statuts\n\n**Vendu comment** :\n- Setup : 1 000–2 000 €\n- Maintenance : 250–500 €/mois\n- Argument : \"50 à 150 contacts qualifiés par jour sans y toucher\"\n\n**Clients cibles** : freelances, agences, commerciaux B2B\n\n---\n\n### Comment packager et vendre\n\n**Étape 1 — L'audit (gratuit ou 150 €)**\nAnalyse les tâches répétitives du client. Identifie les 2–3 qui se prêtent le mieux à l'automatisation. Présente un ROI estimé.\n\n**Étape 2 — Le POC (Proof of Concept, 500–800 €)**\nLivre un agent fonctionnel sur UN cas d'usage en 5–7 jours. Le client teste en conditions réelles pendant 2 semaines.\n\n**Étape 3 — Le déploiement complet (1 500–3 000 €)**\nIntègre l'agent dans les workflows existants, forme l'équipe, documente.\n\n**Étape 4 — La maintenance récurrente (200–700 €/mois)**\nMise à jour du LLM, ajustement des instructions, nouvelles intégrations, rapport mensuel.\n\n---\n\n### Ce que tu dois avoir avant de prospecter\n\n- Un agent démo fonctionnel (même simple) que tu peux montrer en 5 minutes\n- 1–2 cas clients réels ou fictifs documentés avec résultats\n- Un devis type pour chaque format (audit / POC / complet / maintenance)\n\n> En 2026, la majorité des PME n'ont encore jamais vu un agent IA en action. La démonstration live vend à elle seule."
    }
  ),

  module(
    "agent-ia-autonome",
    "deployer-son-agent",
    "Déployer et maintenir son agent en production",
    "Hébergement, sécurité des credentials, monitoring, mises à jour du modèle et gestion des erreurs. Ce qu'il faut mettre en place pour qu'un agent tourne de manière fiable.",
    "text",
    7,
    {
      content_body:
        "## Déployer et maintenir son agent en production\n\nUn agent qui fonctionne en local est un prototype. Un agent en production doit être fiable, sécurisé et maintenable sans intervention constante.\n\n---\n\n### Options d'hébergement\n\n**Option 1 — Claude Code en local (gratuit pour démarrer)**\n- L'agent tourne sur ta machine\n- Accès direct au filesystem local\n- Idéal pour un usage personnel ou un agent de développement\n- Limite : disponible seulement quand ta machine est allumée\n\n**Option 2 — Serveur VPS (DigitalOcean, Hetzner, Render)**\n- Agent disponible 24h/24\n- Coût : 5–20 €/mois selon les ressources\n- Idéal pour les agents de support client ou de veille\n- Configuration : Ubuntu + Node.js/Python + cron jobs\n\n**Option 3 — Vercel Functions ou AWS Lambda (serverless)**\n- Parfait pour les agents déclenchés par événement (email reçu, formulaire soumis)\n- Coût : quasi nul pour des volumes modérés\n- Limite : pas de mémoire contextuelle entre appels (utiliser une DB externe)\n\n---\n\n### Sécuriser les credentials\n\nJamais de clés API en dur dans le code. Toujours dans des variables d'environnement.\n\n**En local** :\n```bash\n# ~/.claude/settings.local.json — jamais versionné\n{\n  \"mcpServers\": {\n    \"supabase\": {\n      \"env\": { \"SUPABASE_TOKEN\": \"sk_...\" }\n    }\n  }\n}\n```\n\n**En production (Vercel/Render)** :\n```bash\n# Ajouter via CLI, jamais dans le code\nvercel env add ANTHROPIC_API_KEY production\n```\n\n**Règle absolue** : le fichier `.env` et `settings.local.json` doivent être dans `.gitignore`. Vérifier avant chaque push.\n\n---\n\n### Monitoring : savoir quand l'agent échoue\n\nSans monitoring, un agent peut échouer silencieusement pendant des heures.\n\n**Solution minimale** : logger chaque action dans un fichier\n```javascript\nfs.appendFileSync('agent.log', \n  `${new Date().toISOString()} | ${action} | ${status}\\n`\n);\n```\n\n**Solution intermédiaire** : alertes Telegram ou email sur erreur critique\n```javascript\nif (error.critical) {\n  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {\n    body: JSON.stringify({ chat_id: CHAT_ID, text: `⚠️ Agent error: ${error.message}` })\n  });\n}\n```\n\n---\n\n### Mises à jour du modèle\n\nLes LLM évoluent vite. Un modèle meilleur sort tous les 3–4 mois. Stratégie recommandée :\n\n1. Garder la version actuelle en production (stable)\n2. Tester la nouvelle version sur des cas de régression avant de migrer\n3. Mettre à jour les instructions système si le comportement change\n\nLes identifiants de modèle Claude à utiliser en 2026 :\n- `claude-sonnet-4-6` — meilleur rapport qualité/prix pour la plupart des agents\n- `claude-opus-4-8` — pour les tâches de raisonnement très complexes\n- `claude-haiku-4-5` — pour les tâches simples à fort volume (10x moins cher)\n\n---\n\n### Checklist avant mise en production\n\n- [ ] Credentials dans variables d'environnement (jamais en dur)\n- [ ] `.env` et `settings.local.json` dans `.gitignore`\n- [ ] Logging des actions principales\n- [ ] Alerte sur erreur critique (Telegram ou email)\n- [ ] Test sur 10 scénarios représentatifs\n- [ ] Documentation des instructions système\n- [ ] Plan de rollback si le modèle est mis à jour\n- [ ] Limite de dépense API configurée (dashboard Anthropic/OpenAI)\n\n> Un agent en production mal monitoré peut dépenser des centaines d'euros en tokens en quelques heures si une boucle infinie se produit. Configure toujours une limite de dépense journalière."
    }
  ),

  // ── Prospection automatisée ────────────────────────────────────────────
  module(
    "prospection-automatisee",
    "prospection-intro-video",
    "Introduction : comment fonctionne une machine à prospects",
    "La logique complète du système : scraping → personnalisation → envoi → suivi. Ce que fait l'outil en production et ce que tu vas construire.",
    "video",
    0,
    {
      content_url: null,
      content_body:
        "## Comment fonctionne une machine à prospects\n\nCette vidéo présente le système complet de prospection automatisée en production : comment il identifie les leads, personnalise les messages et gère les relances sans intervention humaine.\n\n### Ce que tu vas voir\n- L'architecture complète du système\n- Une démo en live de l'outil en action\n- Les résultats réels : volume, taux de réponse, conversions\n- Ce que tu vas construire dans cette formation"
    }
  ),

  module(
    "prospection-automatisee",
    "trouver-leads-qualifies",
    "Trouver 100 leads qualifiés par jour",
    "Sources de données B2B, techniques de scraping légal, filtres de qualification et constitution d'une base de prospects propre et exploitable.",
    "text",
    1,
    {
      content_body:
        "## Trouver 100 leads qualifiés par jour\n\nLa prospection automatisée commence par une base de données propre. Un message parfait envoyé au mauvais prospect ne donne rien.\n\n---\n\n### Les 5 meilleures sources de leads B2B en France\n\n**1. Google Maps / Google Business**\nLa source la plus accessible et la plus fiable pour les PME locales.\n- Recherche : `[secteur] [ville]` → liste d'entreprises avec email, téléphone, site\n- Outil : `playwright` ou `puppeteer` pour scraper les résultats\n- Volume : 50 à 200 résultats par recherche\n- Qualité : très haute — ce sont des entreprises réelles avec une présence active\n\n```javascript\n// Exemple de scraping Google Maps avec Playwright\nconst results = await page.evaluate(() => {\n  return [...document.querySelectorAll('.hfpxzc')].map(el => ({\n    name: el.getAttribute('aria-label'),\n    href: el.href\n  }));\n});\n```\n\n**2. LinkedIn (Sales Navigator ou scraping)**\n- Filtres puissants : secteur, taille entreprise, poste décisionnaire\n- Outil recommandé : Phantombuster (Legal), ou scraping manuel avec Playwright\n- Volume : 25 à 100 leads/jour selon les filtres\n- Qualité : excellente pour le B2B décisionnaire\n\n**3. Pages Jaunes / Societe.com**\n- Base de données légale des entreprises françaises\n- SIRET, adresse, secteur d'activité, chiffre d'affaires\n- Gratuit avec scraping, API payante disponible\n- Idéal pour cibler par code NAF (secteur exact)\n\n**4. Annuaires sectoriels**\n- Chaque secteur a son annuaire : BTP, santé, restauration, immobilier\n- Google : `annuaire [secteur] site:fr` pour trouver les bons\n- Moins connus = moins de concurrence dans ta prospection\n\n**5. Scraping de sites d'offres d'emploi**\n- Une entreprise qui recrute un commercial ou un responsable IT a un budget\n- Indeed, Welcome to the Jungle, LinkedIn Jobs → leads chauds\n- Signal : ils ont un problème à résoudre maintenant\n\n---\n\n### Structurer ta base de données\n\nFormat minimal pour chaque lead :\n```json\n{\n  \"company\": \"Boulangerie Martin\",\n  \"sector\": \"restauration\",\n  \"city\": \"Lyon\",\n  \"email\": \"contact@boulangerie-martin.fr\",\n  \"phone\": \"04 78 XX XX XX\",\n  \"website\": \"boulangerie-martin.fr\",\n  \"source\": \"google_maps\",\n  \"scraped_at\": \"2026-06-12\",\n  \"status\": \"à contacter\"\n}\n```\n\nStockage recommandé : **Google Sheets** (simple, partageable, gratuit) ou **Supabase** (si tu veux automatiser les statuts).\n\n---\n\n### Les règles du scraping légal en France\n\n- Scraper des données **publiques** (Google Maps, annuaires) = légal\n- Scraper derrière une authentification = illégal\n- Respecter le `robots.txt` des sites\n- Ne pas surcharger les serveurs (délai entre requêtes : 2–5 secondes)\n- Les emails pro (contact@entreprise.fr) sont des données B2B — prospecter par email B2B est légal sous RGPD avec mention de désabonnement\n\n> **Règle pratique** : si l'information est visible sans être connecté sur le site, tu peux la collecter."
    }
  ),

  module(
    "prospection-automatisee",
    "messages-personnalises",
    "Écrire des messages qui obtiennent des réponses",
    "Structure des emails à froid qui convertissent, personnalisation automatique avec les données du lead, A/B testing et optimisation du taux de réponse.",
    "text",
    2,
    {
      content_body:
        "## Écrire des messages qui obtiennent des réponses\n\nLe taux de réponse moyen d'un email à froid non personnalisé : 1–3 %. Personnalisé correctement : 8–18 %. La différence, c'est la méthode.\n\n---\n\n### La structure d'un email à froid qui convertit\n\n**Règle des 4 lignes** : un bon email à froid tient en 4 lignes.\n\n```\nLigne 1 : Personnalisation — montre que tu les connais\nLigne 2 : Problème — nomme ce qu'ils vivent probablement\nLigne 3 : Solution — ce que tu fais en une phrase\nLigne 4 : CTA — une seule question fermée\n```\n\n**Exemple concret :**\n> Objet : [Prénom], question rapide pour [Nom entreprise]\n>\n> J'ai vu que vous êtes [secteur] à [ville] — la plupart des [secteur] que je croise perdent du temps sur [problème typique].\n>\n> J'ai un outil qui règle ça automatiquement. Est-ce que ça vaut 15 minutes cette semaine ?\n>\n> [Prénom] — [lien calendrier]\n\n---\n\n### Personnalisation automatique avec les données du lead\n\nAvec une base de données structurée, tu peux générer des emails personnalisés en masse avec un LLM.\n\n```javascript\n// Génération de message personnalisé via API Claude\nasync function generateEmail(lead) {\n  const prompt = `\n    Écris un email à froid en français pour prospecter cette entreprise.\n    Entreprise : ${lead.company}\n    Secteur : ${lead.sector}\n    Ville : ${lead.city}\n    Mon service : support informatique de proximité\n    \n    Règles : 4 lignes max, ton naturel, une question en CTA.\n    Pas de \"J'espère que vous allez bien\".\n  `;\n  \n  const response = await anthropic.messages.create({\n    model: 'claude-haiku-4-5-20251001', // rapide et pas cher pour ce use case\n    max_tokens: 200,\n    messages: [{ role: 'user', content: prompt }]\n  });\n  \n  return response.content[0].text;\n}\n```\n\nCoût : ~0,001 € par email généré avec Claude Haiku. Pour 100 emails/jour = 0,10 €/jour.\n\n---\n\n### Les objets d'email qui fonctionnent en B2B français\n\n- `[Prénom], question rapide` → taux d'ouverture : 38–52 %\n- `[Nom entreprise] + [problème]` → 32–45 %\n- `Idée pour [Nom entreprise]` → 28–40 %\n- `Re: [sujet vague]` → éviter, trop utilisé, perçu comme spam\n\n**Ce qui tue le taux d'ouverture :**\n- Majuscules dans l'objet\n- Mots spam : \"gratuit\", \"offre\", \"promotion\", \"urgent\"\n- Objet > 50 caractères (tronqué sur mobile)\n\n---\n\n### Séquence de relance automatique\n\nUn seul email convertit rarement. Une séquence de 3 convertit 3x plus.\n\n```\nJour 1  : Email initial (personnalisé)\nJour 4  : Relance 1 — angle différent, 2 lignes\nJour 9  : Relance 2 — \"dernière tentative\", proposer une ressource\nJour 14 : Archiver si toujours pas de réponse\n```\n\nRelance 1 exemple :\n> \"Je me permets de relancer — je sais que les boîtes débordent. Est-ce que le sujet est pertinent ou pas du tout pour vous ?\"\n\nRelance 2 exemple :\n> \"Dernière tentative de ma part. Je laisse [lien article/ressource utile] si jamais ça peut vous aider de toute façon. Bonne continuation.\""
    }
  ),

  module(
    "prospection-automatisee",
    "automatiser-envoi",
    "Automatiser l'envoi et gérer les réponses",
    "Stack technique complète : service d'envoi, rotation d'adresses, warming, gestion des bounces, détection des réponses positives et alertes en temps réel.",
    "text",
    3,
    {
      content_body:
        "## Automatiser l'envoi et gérer les réponses\n\n---\n\n### Choisir son service d'envoi\n\nNe jamais envoyer depuis Gmail ou Outlook directement — tu seras banni en quelques jours.\n\n**Resend** (recommandé pour démarrer)\n- 3 000 emails/mois gratuits, 1 $/1 000 emails ensuite\n- API simple, intégration Node.js en 5 minutes\n- Excellent delivrabilité si domaine bien configuré\n\n```javascript\nimport { Resend } from 'resend';\nconst resend = new Resend(process.env.RESEND_API_KEY);\n\nawait resend.emails.send({\n  from: 'prenom@tondomaine.fr',\n  to: lead.email,\n  subject: generateSubject(lead),\n  html: generateEmail(lead)\n});\n```\n\n**Brevo (ex-Sendinblue)**\n- 300 emails/jour gratuits\n- Interface visuelle pour les séquences\n- Idéal si tu veux gérer sans coder\n\n**Instantly.ai / Lemlist**\n- Outils SaaS dédiés à la prospection à froid\n- Warming automatique, rotation d'adresses, séquences visuelles\n- 30–100 $/mois — justifié si tu envoies > 500/jour\n\n---\n\n### Configurer ton domaine pour le delivrabilité\n\nSans ces 3 configs DNS, tes emails vont en spam :\n\n```\nSPF  : v=spf1 include:resend.com ~all\nDKIM : clé fournie par ton service d'envoi (à copier dans DNS)\nDMARC: v=DMARC1; p=none; rua=mailto:dmarc@tondomaine.fr\n```\n\nVérification : `mail-tester.com` — objectif score 9/10 minimum avant de lancer.\n\n---\n\n### Pipeline complet en Node.js\n\n```javascript\n// pipeline.js — tourne toutes les heures via cron\nasync function runProspectionPipeline() {\n  // 1. Récupérer les leads à contacter\n  const leads = await getLeadsToContact({ limit: 50, status: 'pending' });\n  \n  // 2. Pour chaque lead\n  for (const lead of leads) {\n    // Générer le message personnalisé\n    const email = await generateEmail(lead);\n    \n    // Envoyer\n    await sendEmail(lead.email, email);\n    \n    // Mettre à jour le statut\n    await updateLeadStatus(lead.id, 'contacted', new Date());\n    \n    // Délai pour éviter le spam (2–4 secondes)\n    await sleep(2000 + Math.random() * 2000);\n  }\n  \n  console.log(`Pipeline: ${leads.length} emails envoyés`);\n}\n\n// Cron : toutes les heures en semaine 8h-18h\n// GitHub Actions ou serveur cron\n```\n\n---\n\n### Détecter les réponses positives automatiquement\n\nAvec l'API Gmail + Claude, tu peux analyser les réponses et distinguer :\n- Intéressé → alerte Telegram immédiate\n- Pas intéressé → archiver\n- Désinscription → supprimer de la base\n- Absence du bureau → relancer dans 10 jours\n\n```javascript\nasync function classifyReply(emailContent) {\n  const response = await anthropic.messages.create({\n    model: 'claude-haiku-4-5-20251001',\n    max_tokens: 50,\n    messages: [{\n      role: 'user',\n      content: `Classe cette réponse email en: INTERESTED / NOT_INTERESTED / UNSUBSCRIBE / OUT_OF_OFFICE\\n\\n${emailContent}`\n    }]\n  });\n  return response.content[0].text.trim();\n}\n```\n\n---\n\n### Résultats attendus avec ce système\n\n| Volume/jour | Taux réponse | Réponses positives | RDV/mois |\n|-------------|-------------|-------------------|----------|\n| 50 emails   | 8–12 %      | 4–6               | 8–15     |\n| 100 emails  | 8–12 %      | 8–12              | 15–30    |\n| 200 emails  | 6–10 %      | 12–20             | 25–50    |\n\n> Avec 100 emails/jour et 20 RDV/mois, si tu signes 20 % = 4 clients. À 200 €/mois chacun = 800 €/mois récurrents ajoutés."
    }
  ),

  module(
    "prospection-automatisee",
    "deployer-systeme-prod",
    "Déployer le système en production avec GitHub Actions",
    "Héberger le pipeline sur GitHub Actions (gratuit), planifier les envois, monitorer les résultats et maintenir le système sans serveur à gérer.",
    "text",
    4,
    {
      content_body:
        "## Déployer le système en production avec GitHub Actions\n\nGitHub Actions permet de faire tourner ton pipeline de prospection gratuitement, sans serveur à gérer, jusqu'à 2 000 minutes/mois.\n\n---\n\n### Structure du projet\n\n```\nprospection-tool/\n├── .github/\n│   └── workflows/\n│       ├── prospection.yml     # Pipeline principal\n│       └── relances.yml        # Gestion des relances\n├── src/\n│   ├── scraper.js              # Collecte des leads\n│   ├── generator.js            # Génération des messages IA\n│   ├── sender.js               # Envoi des emails\n│   └── classifier.js          # Classification des réponses\n├── data/\n│   └── leads.json              # Base locale (ou Supabase)\n└── package.json\n```\n\n---\n\n### Workflow GitHub Actions\n\n```yaml\n# .github/workflows/prospection.yml\nname: Pipeline Prospection\n\non:\n  schedule:\n    - cron: '0 8,10,12,14,16 * * 1-5'  # Lun-Ven, toutes les 2h de 8h à 16h\n  workflow_dispatch:  # Déclenchement manuel possible\n\njobs:\n  prospect:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      \n      - uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n      \n      - run: npm ci\n      \n      - name: Run prospection pipeline\n        env:\n          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}\n          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}\n          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}\n          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}\n        run: node src/pipeline.js\n```\n\n---\n\n### Configurer les secrets GitHub\n\n1. Repo → Settings → Secrets and variables → Actions\n2. Ajouter : `RESEND_API_KEY`, `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_KEY`\n3. Ces secrets sont chiffrés et jamais visibles dans les logs\n\n---\n\n### Dashboard de suivi dans Supabase\n\nTable `leads` :\n```sql\nCREATE TABLE leads (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  company text,\n  email text UNIQUE,\n  sector text,\n  city text,\n  status text DEFAULT 'pending', -- pending/contacted/replied/interested/signed\n  contacted_at timestamptz,\n  replied_at timestamptz,\n  reply_type text, -- INTERESTED/NOT_INTERESTED/UNSUBSCRIBE\n  created_at timestamptz DEFAULT now()\n);\n```\n\n---\n\n### Alertes Telegram en temps réel\n\nQuand un lead répond positivement, tu reçois une alerte immédiate :\n\n```javascript\nasync function sendTelegramAlert(lead, replyContent) {\n  const message = `🔥 Réponse positive !\\n\\n` +\n    `Entreprise : ${lead.company}\\n` +\n    `Email : ${lead.email}\\n` +\n    `Ville : ${lead.city}\\n\\n` +\n    `Message : ${replyContent.slice(0, 200)}`;\n    \n  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ chat_id: CHAT_ID, text: message })\n  });\n}\n```\n\n> **Résultat** : le pipeline tourne 5 fois par jour en semaine, envoie 20 emails par run, soit 100 emails/jour — complètement automatique, zéro intervention manuelle."
    }
  ),

  module(
    "prospection-automatisee",
    "vendre-systeme-clients",
    "Vendre ce système à des clients",
    "Comment packager l'outil comme offre de service : setup, maintenance, résultats garantis et tarification. De ton propre outil à une prestation récurrente pour des PME.",
    "text",
    5,
    {
      content_body:
        "## Vendre ce système à des clients\n\nUne fois ton système en production et testé sur ta propre activité, tu as la meilleure preuve de concept possible : des résultats réels.\n\n---\n\n### Le positionnement qui vend\n\n**Ne vends pas \"un outil de prospection\"** — tout le monde dit ça.\n\n**Vends \"des rendez-vous qualifiés\"** :\n> \"Je mets en place un système qui vous apporte 10 à 20 rendez-vous qualifiés par mois dans votre secteur, de manière automatique. Vous fermez les deals, je m'occupe du reste.\"\n\nC'est la même chose techniquement — mais l'angle résultat convertit 5x mieux.\n\n---\n\n### Les offres à proposer\n\n**Offre 1 — Setup clé en main (one-shot)**\n- Tu construis et déploies le système pour le client\n- Tu formes sur l'utilisation et le suivi\n- Prix : **1 500 – 3 000 €** selon le volume et la complexité\n- Délai : 5–7 jours\n\n**Offre 2 — Prospection en tant que service (récurrent)**\n- Tu gères tout : leads, messages, relances, reporting\n- Le client reçoit un rapport hebdomadaire + alertes Telegram\n- Prix : **500 – 1 200 €/mois** selon le volume\n- Résiliation possible chaque mois\n\n**Offre 3 — Formation + accompagnement**\n- Tu formes le client à utiliser son propre système (cette formation)\n- 3 sessions de 1h sur 3 semaines\n- Prix : **400 – 800 €**\n\n---\n\n### Clients cibles prioritaires\n\n- **Agences** (web, comm, recrutement, immo) — dépendantes de l'acquisition\n- **Freelances** qui veulent remplir leur agenda sans prospecter manuellement\n- **Commerciaux indépendants** — cherchent des leads en continu\n- **Formateurs et consultants** — ont besoin de prospects qualifiés B2B\n\n---\n\n### Ton argument de vente ultime\n\nTu peux dire à n'importe quel prospect :\n> \"Ce système tourne sur ma propre activité depuis [X mois]. Je l'ai affiné jusqu'à obtenir [X réponses/semaine]. Je vous livre exactement la même chose, configurée pour votre secteur.\"\n\nAucun concurrent SaaS ne peut dire ça — ils vendent un outil générique. Toi tu vends une expertise prouvée."
    }
  ),

  // ── Agence Digitale IA ─────────────────────────────────────────────────
  module(
    "agence-digitale-ia",
    "agence-ia-intro-video",
    "Introduction : l'agence digitale en 2026",
    "Pourquoi les agences classiques perdent des marchés et comment les agences IA gagnent. Le modèle lean qui permet de livrer plus vite avec moins de personnes.",
    "video",
    0,
    {
      content_url: null,
      content_body:
        "## L'agence digitale en 2026\n\nCette vidéo d'introduction pose le contexte : pourquoi le modèle d'agence classique est en train d'être disrupté par les agences qui intègrent les agents IA dans leur production.\n\n### Ce que tu vas voir\n- Le modèle agence classique vs agence IA\n- Les types de clients qui cherchent ce nouveau modèle\n- Les services qui se vendent le mieux en 2026\n- La structure minimale pour démarrer seul"
    }
  ),

  module(
    "agence-digitale-ia",
    "modele-agence-lean",
    "Le modèle agence lean : seul ou à 2, jusqu'à 20k€/mois",
    "Comment structurer une agence digitale rentable sans équipe : les bons services, la bonne tarification, le bon positionnement pour facturer haut sans embaucher.",
    "text",
    1,
    {
      content_body:
        "## Le modèle agence lean : seul ou à 2, jusqu'à 20k€/mois\n\nUne agence classique a besoin d'une équipe pour scaler. Une agence IA peut doubler son volume de production sans embaucher — les agents font le travail lourd.\n\n---\n\n### Pourquoi les agences classiques perdent\n\n- Coûts salariaux élevés → marges faibles (15–30 %)\n- Délais de production lents → clients impatients\n- Dépendance aux freelances → qualité inconsistante\n- Pas de scalabilité sans recrutement\n\n### Pourquoi les agences IA gagnent\n\n- Un agent produit du contenu/code en minutes\n- Les marges sont élevées (50–70 %)\n- La production scale sans coût variable proportionnel\n- Tu peux prendre plus de clients sans perdre en qualité\n\n---\n\n### Les 4 services à vendre en 2026\n\n**1. Sites web + landing pages (1 500 – 5 000 € / projet)**\nAvec Next.js + Cursor/Claude : un site vitrine livrable en 3–5 jours au lieu de 3 semaines. Marge : 70–80 %.\n\n**2. Prospection automatisée (500 – 1 200 €/mois)**\nSystème de prospection clé en main. Une fois configuré, ça tourne seul. Tu as 5 clients = 5 pipelines = revenu passif.\n\n**3. Contenu et SEO IA-assisté (800 – 2 500 €/mois)**\nArticles, posts LinkedIn, newsletters — produits avec des agents IA et validés par toi. Coût de production : 30 minutes/client/semaine.\n\n**4. Agent IA sur mesure (2 000 – 8 000 € setup + récurrent)**\nL'offre premium. Un agent configuré pour le métier du client. Support client, qualification leads, veille — chaque client a son agent.\n\n---\n\n### Modèle économique réaliste\n\n**Solo, 6 mois après lancement :**\n- 3 sites/mois × 2 500 € = 7 500 €\n- 4 clients prospection × 700 €/mois = 2 800 €\n- 3 clients contenu × 1 000 €/mois = 3 000 €\n- **Total : ~13 300 €/mois — marge ~65 % = 8 600 € net**\n\nC'est atteignable seul, avec des agents IA qui font la production.\n\n---\n\n### Ce qui change avec les agents IA\n\nAvant les agents IA, un site vitrine prenait 3 semaines et impliquait 3 personnes. Aujourd'hui :\n- Maquette : 2h avec Figma + Claude\n- Développement : 1–2 jours avec Claude Code\n- Contenu : 1h avec un agent de rédaction\n- Total : 3–4 jours solo\n\nTu peux livrer 3x plus vite avec 3x moins d'effort. C'est ça le levier."
    }
  ),

  module(
    "agence-digitale-ia",
    "positionner-son-agence",
    "Positionner son agence : niche, offre et message",
    "Choisir sa niche, construire une offre claire, rédiger un message qui attire les bons clients et éviter le piège du généralisme qui noie tout le monde.",
    "text",
    2,
    {
      content_body:
        "## Positionner son agence : niche, offre et message\n\nLa principale erreur des nouvelles agences : vouloir tout faire pour tout le monde. Résultat — personne ne les comprend, personne ne les contacte.\n\n---\n\n### Choisir sa niche\n\nUne niche n'est pas une limitation — c'est un accélérateur. Une agence \"spécialiste sites web pour cabinets médicaux\" signe plus facilement qu'une agence \"sites web pour tous\".\n\n**Les 4 critères d'une bonne niche :**\n1. Tu connais déjà le secteur (ou tu l'apprends vite)\n2. Le secteur a les moyens de payer (éviter les associations, artistes...)\n3. Les acteurs du secteur se parlent (effet bouche-à-oreille)\n4. Le problème est récurrent (pas un projet one-shot)\n\n**Niches rentables en 2026 :**\n- Professions libérales (médecins, notaires, avocats, experts-comptables)\n- Immobilier (agences, mandataires, promoteurs)\n- Restauration et hôtellerie\n- TPE et artisans locaux\n- Formateurs et consultants indépendants\n- E-commerce de niche\n\n---\n\n### Construire ton offre de lancement\n\nN'essaie pas de vendre 4 services dès le départ. Commence avec **1 service principal, bien packagé**.\n\n**Format recommandé — le pack de lancement :**\n```\nNom : [Nom du pack]\nPromesse : [résultat en une phrase]\nInclus :\n  - [livrable 1]\n  - [livrable 2]\n  - [livrable 3]\nDélai : [X jours]\nPrix : [montant fixe]\nGarantie : [satisfaction / retouches incluses]\n```\n\nExemple concret :\n```\nNom : Pack Présence Digitale\nPromesse : Votre site vitrine professionnel livré en 7 jours\nInclus :\n  - Site 5 pages (Next.js, mobile-first, rapide)\n  - Formulaire de contact + Google Analytics\n  - Référencement local configuré (Google Business)\nDélai : 7 jours ouvrés\nPrix : 1 800 €\nGarantie : 2 tours de retouches inclus\n```\n\n---\n\n### Le message qui attire les bons clients\n\n**Formule** : `[Qui tu aides] + [résultat concret] + [différenciateur]`\n\nExemples :\n- \"J'aide les cabinets médicaux à avoir un site professionnel conforme RGPD livré en 7 jours.\"\n- \"Je mets en place des systèmes de prospection automatique pour les agences immobilières — 20 RDV qualifiés par mois.\"\n- \"J'équipe les indépendants d'un agent IA qui gère leur support client 24h/24.\"\n\n---\n\n### Où mettre ce message\n\n1. **LinkedIn** : titre de profil + banner\n2. **Site** : hero de ta page d'accueil\n3. **Signature email** : en dessous de ton prénom\n4. **Carte de visite** : si tu en as encore\n\nRègle : quelqu'un qui te croise pour la première fois doit comprendre en 5 secondes ce que tu fais et pour qui."
    }
  ),

  module(
    "agence-digitale-ia",
    "agents-ia-production",
    "Utiliser les agents IA pour la production",
    "Comment intégrer Claude Code, les agents de rédaction et les outils IA dans ta chaîne de production pour livrer en 3x moins de temps sans sacrifier la qualité.",
    "text",
    3,
    {
      content_body:
        "## Utiliser les agents IA pour la production\n\nC'est le cœur du modèle agence IA : les agents font le travail de production répétitif, toi tu fais la stratégie, la relation client et le contrôle qualité.\n\n---\n\n### Agent 1 — Développement (Claude Code)\n\n**Ce qu'il fait pour toi :**\n- Génère la structure complète d'un site Next.js depuis un brief\n- Crée les composants, les pages, les APIs\n- Corrige les bugs et optimise le code\n- Rédige la documentation\n\n**Temps gagné :** 60–70 % sur le développement standard\n\n**Workflow :**\n```\nBrief client (30 min) \n→ Prompt Claude Code détaillé (15 min)\n→ Agent génère la base (2–4h)\n→ Tu reviews et ajustes (2–3h)\n→ Livraison (jour 2–3 au lieu de jour 10)\n```\n\n---\n\n### Agent 2 — Rédaction et contenu\n\n**Ce qu'il fait pour toi :**\n- Articles SEO optimisés en 10 minutes\n- Posts LinkedIn adaptés au ton du client\n- Newsletters mensuelles\n- Textes de pages web (accueil, à propos, services)\n\n**Workflow pour 1 client contenu :**\n```\n1. Définir 4 sujets du mois (15 min)\n2. Prompt pour chaque article (5 min × 4)\n3. Génération + relecture (20 min × 4)\n4. Planification et envoi (15 min)\nTotal : ~2h/mois par client contenu\n```\n\nAvec 5 clients contenu à 800 €/mois = 4 000 €/mois pour ~10h de travail.\n\n---\n\n### Agent 3 — Support client et réponses emails\n\n**Ce qu'il fait pour toi :**\n- Répond aux questions fréquentes des clients\n- Classe les demandes par urgence\n- Rédige les premières réponses pour les demandes complexes\n- Relance automatiquement les devis non signés\n\n**Configuration :**\nAgent connecté à Gmail via MCP, avec accès à la base de connaissances du client.\n\n---\n\n### Agent 4 — Prospection (voir formation dédiée)\n\n100 emails/jour personnalisés, gestion des relances, classification des réponses. Ton pipeline commercial tourne sans toi.\n\n---\n\n### L'organisation d'une journée type agence IA\n\n```\n9h00  — Review des alertes Telegram (réponses positives)\n9h30  — Appels/RDV clients du jour\n11h00 — Brief des tâches pour les agents (Claude Code, rédaction)\n12h00 — Déjeuner\n13h00 — Review et validation des productions IA\n15h00 — Retouches et livraisons clients\n16h30 — Prospection (1 séquence de nouveaux leads)\n17h00 — Fin\n```\n\nNote : 4–5 heures de travail réel par jour pour une agence à 10k€+/mois. Le reste, c'est les agents.\n\n---\n\n### Les outils de l'agence IA en 2026\n\n| Tâche | Outil | Coût mensuel |\n|-------|-------|-------------|\n| Développement | Claude Code | 20 $/mois |\n| Rédaction | Claude API | 5–20 $/mois |\n| Design | Figma + IA | 15 $/mois |\n| Prospection | Resend + Claude | 5–15 $/mois |\n| Gestion projet | Notion | Gratuit |\n| Facturation | Indy | 10 €/mois |\n| **Total** | | **~70–80 €/mois** |"
    }
  ),

  module(
    "agence-digitale-ia",
    "premiers-clients-agence",
    "Trouver et signer ses premiers clients",
    "Les 5 canaux d'acquisition qui fonctionnent pour une nouvelle agence, les scripts de vente adaptés, et comment transformer un premier client en machine à recommandations.",
    "text",
    4,
    {
      content_body:
        "## Trouver et signer ses premiers clients\n\nUne agence qui démarre n'a pas de réputation. Elle a une méthode et de l'énergie. C'est suffisant pour les 3 premiers clients.\n\n---\n\n### Canal 1 — Ton réseau immédiat (clients 1 et 2)\n\nTes 3 premiers clients viennent presque toujours de ton réseau. Pas besoin d'un site ou d'une marque — juste un message direct.\n\nMessage à envoyer à 20 personnes de ton réseau :\n> \"Je lance mon agence digitale spécialisée [niche]. Je cherche 2–3 premiers clients pour tester mon offre à tarif de lancement. Tu connais quelqu'un qui aurait besoin de [service] ?\"\n\n80 % ne répondront pas. Les 20 % qui répondent te donneront 1 à 2 leads chauds.\n\n---\n\n### Canal 2 — LinkedIn outbound (clients 3 à 10)\n\nPostes + messages directs combinés :\n- 1 post/semaine sur ton sujet d'expertise\n- 10 messages directs/jour à des prospects de ta niche\n- Demandes de connexion personnalisées\n\nLe post qui génère le plus d'inbound :\n> \"J'ai livré un site pour [type de client] en 4 jours. Voici comment [résultat concret]. Fil de discussion si ça t'intéresse.\"\n\n---\n\n### Canal 3 — Prospection automatisée (voir formation dédiée)\n\nAvec 100 emails/jour ciblés sur ta niche, tu génères 15–30 réponses/mois. 20 % = intéressés = 3–6 RDV. Sur 6 RDV, tu signes 2.\n\n---\n\n### Canal 4 — Plateformes freelance (Malt, Upwork, Codeur)\n\nPour les 3 premiers mois, les plateformes donnent de la visibilité sans réputation.\n- Malt : meilleur pour le B2B français\n- Profil complet avec cas clients fictifs bien construits\n- Première mission acceptée à prix légèrement bas → témoignage → montée en tarif\n\n---\n\n### Canal 5 — Partenariats comptables/avocats\n\nLes comptables et avocats voient passer des PME qui ont besoin de sites, d'outils et de systèmes. Un partenariat de prescription (10–15 % de commission) te donne accès à des leads chauds sans prospection.\n\n---\n\n### Le script de vente en 3 étapes\n\n**Étape 1 — Le brief (20 min)**\nComprendre le problème, pas vendre.\n> \"Avant de vous parler de mes tarifs, dites-moi : quel est votre principal problème aujourd'hui ?\"\n\n**Étape 2 — La solution sur mesure (10 min)**\nPrésenter 1 option, pas 3.\n> \"Ce que je vous recommande dans votre cas précis, c'est [offre]. Voici ce que ça inclut et le résultat que vous pouvez attendre.\"\n\n**Étape 3 — Le closing (5 min)**\n> \"On peut commencer la semaine prochaine. Est-ce que vous préférez régler par virement ou carte ?\"\n\n---\n\n### Transformer un client en machine à recommandations\n\n1. Livrer avant la deadline promise\n2. Envoyer un rapport de clôture avec les résultats\n3. Demander un témoignage dans la foulée\n4. Proposer un système de parrainage : \"Si vous me recommandez un client, je vous offre 1 mois de maintenance gratuit\"\n\n> 1 client satisfait dans une niche parle à 3–5 autres acteurs de la même niche. Tes 3 premiers clients bien servis = ton équipe commerciale naturelle."
    }
  ),

  module(
    "agence-digitale-ia",
    "scaler-sans-recruter",
    "Scaler à 20k€/mois sans recruter",
    "Comment augmenter le volume de clients sans augmenter le temps de travail : productisation des services, automatisation des livrables et organisation pour gérer 15+ clients seul.",
    "text",
    5,
    {
      content_body:
        "## Scaler à 20k€/mois sans recruter\n\nLa plupart des agences stagnent à 5–8k€/mois parce qu'elles vendent du temps. Pour scaler, tu dois vendre des résultats produits en partie par des agents IA.\n\n---\n\n### La règle de la productisation\n\nUn service n'est scalable que s'il est **standardisé**. Si chaque client demande quelque chose de différent, tu ne peux pas accélérer.\n\n**Avant productisation :**\n- Chaque site est unique, codé from scratch\n- 15–20 jours par client\n- 3–4 clients maximum en parallèle\n\n**Après productisation :**\n- Template de base, personnalisé par agents IA\n- 4–7 jours par client\n- 8–12 clients en parallèle\n\n---\n\n### Les systèmes à mettre en place\n\n**Système 1 — Templates réutilisables**\nPour chaque type de service, un template de départ :\n- Template site vitrine (Next.js, 5 pages, design configurable)\n- Template landing page (1 page, A/B testable)\n- Template email de prospection (personnalisable par IA)\n\n**Système 2 — Briefs standardisés**\nUn formulaire Notion ou Typeform qui collecte tout ce dont tu as besoin avant de commencer. Zéro aller-retour pour récupérer des infos.\n\n**Système 3 — Pipeline de production IA**\n```\nBrief reçu → Agent génère la base → Tu review (2h) → Ajustements → Livraison\n```\nCe pipeline doit être documenté et répétable pour chaque type de service.\n\n**Système 4 — Tableau de bord client**\nUn Notion ou Google Sheet visible par le client : statut du projet, prochaines étapes, date de livraison. Réduit les emails \"où en est-on ?\" à zéro.\n\n---\n\n### Objectif 20k€/mois : le mix de services\n\n```\n3 sites/mois × 2 500 €       =  7 500 €\n5 clients prospection × 700 € =  3 500 €\n5 clients contenu × 900 €    =  4 500 €\n2 agents IA × 2 500 €        =  5 000 €\n                               ─────────\nTotal                         = 20 500 €\nMarge (65%)                   = 13 325 €\n```\n\nTemps de travail réel : 35–40h/semaine. Le reste est géré par les agents.\n\n---\n\n### Quand recruter (et pourquoi pas avant)\n\nRecruter avant 15k€/mois stable = prendre un risque inutile.\n\nLe bon moment pour recruter :\n- Tu refuserais des clients faute de temps depuis 2 mois consécutifs\n- Tu as un CA stable à 15k€+ depuis 3 mois\n- Tu as identifié 1 type de tâche précis que tu peux déléguer sans risque\n\nLe premier recrutement recommandé : un VA (assistant virtuel) à 500–800 €/mois pour les tâches administratives — pas un développeur, pas un commercial."
    }
  ),

  ...tradingProductModules,
  ...newProductModules
];

type ProductSupplement = {
  bestFor: string[];
  outcomes: string[];
  pitch: string;
  salesPriority?: number;
};

const productSupplements: Record<string, ProductSupplement> = {
  "prospection-automatisee": {
    salesPriority: 1,
    bestFor: [
      "freelances et agences qui veulent remplir leur agenda sans prospecter manuellement",
      "commerciaux indépendants qui cherchent des leads qualifiés en continu",
      "entrepreneurs qui veulent une acquisition client automatique"
    ],
    outcomes: [
      "un système de prospection qui tourne 24h/24 sans intervention",
      "100 à 150 contacts qualifiés par jour en automatique",
      "une offre de service packagée à revendre à des clients"
    ],
    pitch:
      "La formation basée sur un outil réel en production : comment construire et déployer un système qui prospecte automatiquement pendant que tu travailles sur autre chose."
  },
  "agence-digitale-ia": {
    salesPriority: 2,
    bestFor: [
      "freelances qui veulent structurer une activité agence sans recruter",
      "développeurs et créatifs qui veulent scaler leur CA avec les agents IA",
      "personnes qui veulent lancer une activité digitale sérieuse et rentable"
    ],
    outcomes: [
      "un positionnement agence clair et une offre packagée",
      "un système de production IA qui réduit le temps de livraison de 60 %",
      "un modèle pour atteindre 10 à 20k€/mois seul ou à 2"
    ],
    pitch:
      "Comment lancer et scaler une agence digitale lean en 2026 — avec les agents IA comme levier principal de production, pas comme gadget."
  },
  "agent-ia-autonome": {
    salesPriority: 0,
    bestFor: [
      "développeurs et freelances qui veulent se différencier avec l'IA",
      "entrepreneurs digitaux qui veulent automatiser leur activité",
      "consultants IT qui veulent proposer des agents à leurs clients PME"
    ],
    outcomes: [
      "un agent IA opérationnel avec mémoire persistante",
      "une offre packagée vendable à des PME",
      "une compétence rare et très demandée en 2026"
    ],
    pitch:
      "La seule formation qui te montre comment construire un vrai agent IA autonome à partir d'un cas réel opérationnel — et comment le vendre."
  },
  "freelance-it-30-jours": {
    salesPriority: 1,
    bestFor: [
      "profils support ou tech qui veulent vendre en indépendant",
      "débutants motivés qui veulent une offre terrain simple",
      "personnes qui veulent vite structurer une première proposition commerciale"
    ],
    outcomes: [
      "une offre claire de prestations IT",
      "un plan de prospection concret",
      "des ressources pour vendre et livrer sans improviser"
    ],
    pitch:
      "La formation principale pour passer d'une compétence IT floue à une activité freelance lisible et vendable."
  },
  "landing-pages-rentables": {
    bestFor: [
      "freelances web qui veulent une offre facile à cadrer",
      "profils marketing ou design qui veulent vendre du concret",
      "indépendants qui veulent livrer vite avec une forte valeur perçue"
    ],
    outcomes: [
      "une méthode de structure de page qui convertit",
      "un process de livraison client plus propre",
      "des templates réutilisables"
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
      "Le cadre pour transformer la prestation site web en offre simple, propre et facile à livrer."
  },
  "outils-pme-glpi": {
    bestFor: [
      "profils support / système qui veulent vendre plus que du support",
      "freelances qui veulent adresser des besoins internes PME",
      "personnes qui veulent structurer des mini-outils métier"
    ],
    outcomes: [
      "une logique de cadrage métier",
      "une offre autour du support et des outils internes",
      "des ressources pour transformer un irritant en mission facturable"
    ],
    pitch:
      "Une formation plus technique pour vendre des outils simples mais utiles à des PME qui ont de vrais irritants opérationnels."
  },
  "applications-mobiles-rentables": {
    bestFor: [
      "profils produit ou freelance qui veulent lancer une app simple",
      "indépendants qui veulent cadrer un MVP monétisable",
      "créateurs qui veulent partir d'un besoin clair plutôt que d'une usine à gaz"
    ],
    outcomes: [
      "une structure d'application claire",
      "une logique de monétisation simple",
      "des ressources pour cadrer et pré-vendre un MVP"
    ],
    pitch:
      "Le programme pour cadrer une application mobile rentable sans partir sur un produit trop ambitieux dès le jour 1."
  },
  "glpi-support-pme": {
    salesPriority: 3,
    bestFor: [
      "profils support ou sysadmin qui veulent professionnaliser une offre GLPI",
      "freelances IT qui vendent du support à des PME",
      "personnes qui veulent transformer un besoin de support en offre IT structurée"
    ],
    outcomes: [
      "un déploiement GLPI propre et maintenable",
      "un process de tickets et SLA lisible",
      "une offre support vendable à des PME"
    ],
    pitch:
      "La formation pour déployer GLPI sérieusement et en faire une offre facturable, pas juste un outil interne."
  },
  "maintenance-informatique-pme": {
    salesPriority: 2,
    bestFor: [
      "techniciens freelance qui veulent un revenu récurrent stable",
      "profils support qui veulent vendre du suivi PME",
      "indépendants IT qui veulent sortir du modèle 100% à la demande"
    ],
    outcomes: [
      "une offre de maintenance mensuelle claire",
      "un process d'onboarding et de renouvellement",
      "des outils pour livrer et reporter proprement"
    ],
    pitch:
      "La formation pour construire une offre de maintenance récurrente sérieuse, défendable et rentable face à des PME."
  },
  "apps-metier-supabase": {
    bestFor: [
      "freelances qui veulent livrer des apps métier crédibles",
      "profils tech qui veulent structurer des bases de données et des rôles proprement",
      "personnes qui veulent facturer du développement d'outil interne"
    ],
    outcomes: [
      "une architecture Supabase propre et maintenable",
      "un process de cadrage et livraison d'app métier",
      "des ressources pour vendre et maintenir des apps simples"
    ],
    pitch:
      "La formation pour livrer des applications métier crédibles avec Supabase, sans surarchitecture ni délais excessifs."
  },
  "microsoft-365-pme": {
    bestFor: [
      "techniciens IT qui veulent vendre du déploiement Microsoft 365",
      "freelances qui accompagnent des PME dans leur migration cloud",
      "profils support qui veulent structurer une offre M365 reproductible"
    ],
    outcomes: [
      "un process de déploiement M365 propre",
      "une offre de migration et formation utilisateurs",
      "des ressources pour vendre et maintenir des environnements M365 en PME"
    ],
    pitch:
      "La formation pour déployer Microsoft 365 en PME de manière structurée et en faire une offre facturable répétable."
  },
  "cybersecurite-pme": {
    bestFor: [
      "techniciens IT qui veulent ajouter une offre cybersécurité à leur catalogue",
      "freelances qui veulent vendre une protection PME crédible sans être expert certifié",
      "profils support qui veulent transformer un audit en mission récurrente"
    ],
    outcomes: [
      "une méthode d'audit cybersécurité accessible pour les PME",
      "un pack de sécurisation postes, accès et sauvegardes",
      "une offre de protection mensuelle défendable et facturable"
    ],
    pitch:
      "La formation pour sécuriser une PME de manière réaliste et en faire une offre récurrente crédible sans sur-ingénierie."
  },
  "automatisation-n8n": {
    bestFor: [
      "freelances qui veulent ajouter l'automatisation à leur catalogue de services",
      "profils IT qui veulent vendre des workflows sans développement lourd",
      "indépendants qui cherchent à créer un revenu récurrent sur la maintenance de workflows"
    ],
    outcomes: [
      "une maîtrise de n8n pour créer des workflows vendables",
      "une offre d'automatisation packagée et facturable",
      "des templates réutilisables pour démarrer vite avec des clients"
    ],
    pitch:
      "La formation pour créer des automatisations utiles avec n8n et les transformer en offre de service récurrente pour des PME."
  },
  ...tradingProductSupplements,
  "ia-revenus-actifs": {
    salesPriority: 0,
    bestFor: [
      "toute personne qui veut transformer une compétence en activité indépendante",
      "profils IT, IA ou Finance qui veulent une méthode complète de lancement",
      "freelances qui démarrent sans réseau et sans budget marketing"
    ],
    outcomes: [
      "une offre de service claire et tarifiée",
      "un premier client dans les 30 jours",
      "un système de livraison automatisé et des revenus récurrents"
    ],
    pitch:
      "Le programme flagship pour passer d'une compétence floue à une activité indépendante rentable — IT, IA ou Finance."
  },
  "chatbot-client-make-gpt": {
    bestFor: [
      "freelances no-code ou automation qui veulent une offre simple à vendre",
      "profils support ou relation client qui veulent automatiser les demandes répétitives",
      "personnes qui veulent livrer un premier chatbot utile sans développement lourd"
    ],
    outcomes: [
      "une architecture Make + GPT claire et vendable",
      "un chatbot client déployable sur un canal concret",
      "une offre installation + maintenance facile à pitcher"
    ],
    pitch:
      "La formation pour construire un chatbot client propre, le déployer vite et le transformer en prestation de service crédible."
  },
  "agent-ia-business": {
    bestFor: [
      "freelances qui veulent vendre des automatisations plus avancées que de simples workflows",
      "profils business ou opérations qui veulent déléguer une partie du travail répétitif à un agent",
      "personnes qui veulent monétiser n8n et GPT sous forme de service"
    ],
    outcomes: [
      "une compréhension claire de ce qu'est un agent IA utile",
      "un premier agent métier construit avec n8n et GPT",
      "une offre de service orientée gain de temps et reporting"
    ],
    pitch:
      "La formation pour passer du discours sur les agents IA à un vrai système utile, livrable et facturable à un client."
  },
  "facturation-compta-freelance": {
    bestFor: [
      "freelances qui démarrent et veulent éviter les erreurs administratives coûteuses",
      "indépendants qui veulent facturer proprement sans dépendre d'un comptable au quotidien",
      "profils tech ou créatifs qui négligent la partie gestion"
    ],
    outcomes: [
      "une base légale et comptable propre pour travailler sereinement",
      "un process de devis, facture et déclaration compréhensible",
      "une routine de gestion mensuelle simple et tenable"
    ],
    pitch:
      "La formation pour encaisser proprement, comprendre ses charges et tenir sa gestion freelance sans panique administrative."
  },
  "offre-mensuelle-recurrente": {
    bestFor: [
      "freelances qui veulent sortir du modèle mission par mission",
      "profils IT, automation ou conseil qui peuvent livrer de la valeur chaque mois",
      "indépendants qui veulent un revenu plus stable et plus défendable"
    ],
    outcomes: [
      "un forfait mensuel clair avec inclusions et exclusions",
      "un pitch et un contrat de récurrence simples",
      "une routine de livraison mensuelle qui réduit les résiliations"
    ],
    pitch:
      "La formation pour transformer un savoir-faire ponctuel en offre récurrente stable, lisible et plus rentable face à des PME."
  },
  "pack-it-freelance": {
    bestFor: [
      "techniciens qui veulent lancer une activité IT indépendante avec une logique complète",
      "freelances qui veulent combiner acquisition, maintenance et support structuré",
      "personnes qui veulent un parcours cohérent plutôt qu'une seule brique"
    ],
    outcomes: [
      "une vision claire du parcours IT freelance de bout en bout",
      "un angle de vente plus lisible pour les PME",
      "des briques complémentaires pour créer une activité durable"
    ],
    pitch:
      "Le pack le plus cohérent pour passer d'une capacité technique IT à une activité indépendante structurée et plus récurrente."
  },
  "pack-finance-ia": {
    bestFor: [
      "profils curieux de la finance augmentée par IA qui veulent un parcours complet",
      "personnes qui veulent relier lecture de marché, automatisation et offre de service",
      "indépendants qui veulent construire une logique Finance IA crédible"
    ],
    outcomes: [
      "une vue d'ensemble du catalogue Finance IA",
      "des briques complémentaires entre usage personnel et service vendable",
      "un parcours plus cohérent pour monter en niveau"
    ],
    pitch:
      "Le pack pour relier trading assisté, portefeuille automatisé, analyse crypto et offre de service Finance IA dans une seule logique."
  }
};

// ─── Exported catalog helpers ─────────────────────────────────────────────────

export function getLocalProductBySlug(slug: string): ProductRecord | null {
  return localProducts.find((product) => product.slug === slug) || null;
}

export function getLocalProductById(id: string): ProductRecord | null {
  return localProducts.find((product) => product.id === id) || null;
}

export function getLocalActiveProducts(): ProductRecord[] {
  return localProducts.filter((product) => product.is_active);
}

export function getLocalModulesByProductId(productId: string): ProductModuleRecord[] {
  return localProductModules.filter((module) => module.product_id === productId);
}

export function getProductSupplement(slug: string): ProductSupplement | null {
  return productSupplements[slug] || null;
}

export function getRelatedLocalProducts(currentSlug: string, limit = 2): ProductRecord[] {
  return localProducts.filter((product) => product.slug !== currentSlug && product.is_active).slice(0, limit);
}

export function getPriorityOfferSlugs(): string[] {
  return Object.entries(productSupplements)
    .filter(([, supplement]) => supplement.salesPriority !== undefined)
    .sort(([, a], [, b]) => (a.salesPriority ?? 99) - (b.salesPriority ?? 99))
    .map(([slug]) => slug);
}

export function findLocalProductByPurchaseName(productName: string): ProductRecord | null {
  if (!productName) return null;
  const normalized = productName.trim().toLowerCase();
  return (
    localProducts.find((product) => product.title.trim().toLowerCase() === normalized) ||
    localProducts.find((product) => normalized.includes(product.slug.replace(/-/g, " "))) ||
    null
  );
}
