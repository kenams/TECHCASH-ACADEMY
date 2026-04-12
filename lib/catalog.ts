import type { ProductModuleRecord, ProductRecord, ProductWithModules } from "@/lib/types";

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
    is_active: true,
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
    is_active: true,
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
    is_active: true,
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
    is_active: true,
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
    is_active: true,
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
    is_active: true,
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
    is_active: true,
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
    is_active: true,
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
    is_active: true,
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
    "cas-clients-a-venir",
    "Cas clients terrain et gestion des objections avancées",
    "Études de cas réels, scénarios de mission complexe, gestion des clients difficiles et stratégies pour fidéliser sur le long terme. Module en cours de production.",
    "coming_soon",
    7
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
        "Une landing page vend surtout par clarté.\n\nTu dois faire comprendre en quelques secondes le problème traité, la promesse, les preuves et l'action attendue.\n\nDans ce module, tu apprends à construire un squelette vendable avant même d'ouvrir ton outil de design."
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
        "Un site client devient vite improductif si le cadrage est flou.\n\nLe but est d'obtenir vite les bons éléments : pages nécessaires, objectifs, ton, CTA et contraintes techniques.\n\nTu apprendras à garder le projet simple et rentable."
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
        "Les bons outils internes résolvent un irritant clair : tickets, suivi, demandes, workflow ou reporting.\n\nCe module t'aide à traduire un problème flou en solution simple et finie, donc en proposition commerciale crédible."
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
    "etudes-de-cas-a-venir",
    "Études de cas et mini-démos",
    "Des mini-cas réels de demandes PME et support seront ajoutés.",
    "coming_soon",
    5
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
        "Une bonne application rentable ne commence pas par une liste infinie de features.\n\nElle commence par un problème clair, une cible précise, un premier flux utile et un mode de monétisation réaliste.\n\nTu vas cadrer cela avant d'écrire du code."
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
  )
];

type ProductSupplement = {
  bestFor: string[];
  outcomes: string[];
  pitch: string;
  salesPriority?: number;
};

const productSupplements: Record<string, ProductSupplement> = {
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