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
  appsMetier: "/videos/formations/apps-metier-supabase-overview.mp4"
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
    "VidÃ©o explicative IA : lancer une activitÃ© freelance IT rentable",
    "Une vidÃ©o avec voix IA et visuels explicatifs pour comprendre rapidement la logique, la promesse et le rÃ©sultat concret de cette formation.",
    "video",
    8,
    {
      content_url: sampleVideos.freelanceIt,
      content_body:
        "## Comment utiliser cette vidÃ©o\n\nCette vidÃ©o explicative gÃ©nÃ©rÃ©e en IA te donne une vue rapide de la promesse, des modules et du rÃ©sultat concret visÃ© par la formation.\n\n### Ce qu'il faut retenir\n\n- la promesse commerciale de l'offre\n- les modules les plus structurants\n- le rÃ©sultat concret que tu pourras vendre ou livrer ensuite\n\n### Conseil d'utilisation\n\nCommence par cette vue d'ensemble, puis enchaÃ®ne sur les modules texte, PDF et ressources pour passer Ã  l'application."
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
    4,
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
    4,
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
    4,
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
    4,
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
    "VidÃ©o explicative IA : dÃ©ployer GLPI et structurer un support PME",
    "Une vidÃ©o avec voix IA et visuels explicatifs pour comprendre rapidement la logique, la promesse et le rÃ©sultat concret de cette formation.",
    "video",
    6,
    {
      content_url: sampleVideos.glpiSupport,
      content_body:
        "## Comment utiliser cette vidÃ©o\n\nCette vidÃ©o explicative gÃ©nÃ©rÃ©e en IA te donne une vue rapide de la promesse, des modules et du rÃ©sultat concret visÃ© par la formation.\n\n### Ce qu'il faut retenir\n\n- la promesse commerciale de l'offre\n- les modules les plus structurants\n- le rÃ©sultat concret que tu pourras vendre ou livrer ensuite\n\n### Conseil d'utilisation\n\nCommence par cette vue d'ensemble, puis enchaÃ®ne sur les modules texte, PDF et ressources pour passer Ã  l'application."
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
    "VidÃ©o explicative IA : vendre une maintenance informatique rÃ©currente",
    "Une vidÃ©o avec voix IA et visuels explicatifs pour comprendre rapidement la logique, la promesse et le rÃ©sultat concret de cette formation.",
    "video",
    6,
    {
      content_url: sampleVideos.maintenancePme,
      content_body:
        "## Comment utiliser cette vidÃ©o\n\nCette vidÃ©o explicative gÃ©nÃ©rÃ©e en IA te donne une vue rapide de la promesse, des modules et du rÃ©sultat concret visÃ© par la formation.\n\n### Ce qu'il faut retenir\n\n- la promesse commerciale de l'offre\n- les modules les plus structurants\n- le rÃ©sultat concret que tu pourras vendre ou livrer ensuite\n\n### Conseil d'utilisation\n\nCommence par cette vue d'ensemble, puis enchaÃ®ne sur les modules texte, PDF et ressources pour passer Ã  l'application."
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
    "Video explicative IA : creer une application metier simple avec Supabase",
    "Une video avec voix IA et visuels explicatifs pour comprendre rapidement la logique, la promesse et le resultat concret de cette formation.",
    "video",
    6,
    {
      content_url: sampleVideos.appsMetier,
      content_body:
        "## Comment utiliser cette video\n\nCette video explicative generee en IA te donne une vue rapide de la promesse, des modules et du resultat concret vise par la formation.\n\n### Ce qu'il faut retenir\n\n- la promesse commerciale de l'offre\n- les modules les plus structurants\n- le resultat concret que tu pourras vendre ou livrer ensuite\n\n### Conseil d'utilisation\n\nCommence par cette vue d'ensemble, puis enchaine sur les modules texte, PDF et ressources pour passer a l'application."
    }
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
      "personnes qui veulent transformer un besoin de tickets en mission claire"
    ],
    outcomes: [
      "un cadrage GLPI vendable",
      "un plan de déploiement simple et crédible",
      "une logique de reporting et d'adoption côté client"
    ],
    pitch:
      "La formation pour transformer GLPI en vraie offre de support interne, utile au client et simple à faire adopter."
  },
  "maintenance-informatique-pme": {
    salesPriority: 2,
    bestFor: [
      "techniciens IT qui veulent créer un revenu récurrent",
      "freelances support qui veulent sortir du dépannage ponctuel",
      "profils terrain qui veulent mieux cadrer leurs forfaits"
    ],
    outcomes: [
      "une offre de maintenance plus lisible",
      "un onboarding client plus propre",
      "des routines de reporting et de renouvellement"
    ],
    pitch:
      "Le cadre pour vendre et livrer une maintenance PME rentable, sans promesse floue ni support mal borné."
  },
  "apps-metier-supabase": {
    bestFor: [
      "profils produit ou dev qui veulent livrer des apps métier simples",
      "freelances qui travaillent avec Supabase et veulent standardiser leur delivery",
      "créateurs qui veulent vendre autre chose qu'un site vitrine"
    ],
    outcomes: [
      "un cadrage MVP plus propre",
      "une base Supabase bien structurée",
      "une logique de livraison et de maintenance plus vendable"
    ],
    pitch:
      "Une formation orientée delivery pour produire des applications métier utiles avec Supabase, sans architecture trop lourde."
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

export function getPriorityOfferSlugs() {
  return Object.entries(productSupplements)
    .filter(([, supplement]) => typeof supplement.salesPriority === "number")
    .sort((a, b) => (a[1].salesPriority || 99) - (b[1].salesPriority || 99))
    .map(([slug]) => slug);
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
