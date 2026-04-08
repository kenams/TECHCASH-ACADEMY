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
    title: "Devenir technicien informatique freelance sans diplôme en 30 jours",
    subtitle: "L'offre principale pour lancer une activité IT rentable sans théâtre",
    short_description:
      "Apprendre à lancer une activité freelance IT rentable sans diplôme, avec méthode, positionnement, acquisition client et livrables simples.",
    long_description:
      "Cette formation principale t'aide à structurer une activité freelance IT vendable rapidement. Tu y trouves le positionnement, les prestations les plus faciles à vendre, la manière de parler à un client PME et des ressources concrètes pour passer de l'idée à une offre qui tient la route.",
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
