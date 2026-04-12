import type { ProductCategory, ProductModuleRecord, ProductRecord } from "@/lib/types";

type ProductSupplement = {
  bestFor: string[];
  outcomes: string[];
  pitch: string;
  salesPriority?: number;
};

const now = new Date("2026-04-12T12:00:00.000Z").toISOString();
const category: ProductCategory = "trading";

function buildModuleBody({
  learn,
  understand,
  tools,
  method,
  behavior,
  deliverables,
  checks
}: {
  learn: string;
  understand: string;
  tools: string[];
  method: string[];
  behavior: string[];
  deliverables: string[];
  checks: string[];
}) {
  return [
    "## Ce que tu vas apprendre",
    learn,
    "",
    "### Ce que tu dois comprendre",
    understand,
    "",
    "### Outils",
    ...tools.map((item) => `- ${item}`),
    "",
    "### Méthode",
    ...method.map((item, index) => `${index + 1}. ${item}`),
    "",
    "### Comportement",
    ...behavior.map((item) => `- ${item}`),
    "",
    "### Livrables",
    ...deliverables.map((item) => `- ${item}`),
    "",
    "### Vérification",
    ...checks.map((item) => `- ${item}`)
  ].join("\n");
}

export const tradingProducts: ProductRecord[] = [
  {
    id: "local-trading-ia-debutant",
    slug: "trading-ia-debutant",
    category,
    title: "Comprendre et utiliser l'IA pour trader sans se ruiner",
    subtitle: "Démarrer avec une méthode sobre, des outils gratuits et une vraie logique de risque",
    short_description:
      "Une formation d'initiation pour utiliser l'IA comme assistant de lecture de marché, construire une première routine et éviter les erreurs les plus coûteuses.",
    long_description:
      "Cette formation pose les bases d'un usage sérieux de l'IA dans un contexte trading : analyse technique assistée, backtesting simple, gestion du risque et routine de décision. L'objectif n'est pas de vendre du rêve, mais de t'apprendre à construire une démarche défendable, répétable et exploitable pour toi ou dans un futur service de veille.",
    price_cents: 5900,
    currency: "eur",
    stripe_price_id: null,
    thumbnail_url: "/visuals/formations/trading-ia-debutant-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-automatisation-portefeuille-ia",
    slug: "automatisation-portefeuille-ia",
    category,
    title: "Automatiser la gestion de son portefeuille avec l'IA",
    subtitle: "Alertes, reporting et suivi de portefeuille sans dépendre d'une app opaque",
    short_description:
      "Tu apprends à construire un suivi de portefeuille automatisé avec IA, APIs financières, n8n et reporting clair.",
    long_description:
      "Cette formation montre comment automatiser le suivi d'un portefeuille actions, ETF ou crypto avec une logique de contrôle sérieuse. Tu vas brancher les bonnes sources, générer des alertes utiles, structurer un reporting propre et comprendre comment transformer cette compétence en offre de service orientée pilotage financier augmenté par IA.",
    price_cents: 6800,
    currency: "eur",
    stripe_price_id: null,
    thumbnail_url: "/visuals/formations/automatisation-portefeuille-ia-cover.svg",
    is_active: true,
    is_featured: true,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-crypto-analyse-fondamentale-ia",
    slug: "crypto-analyse-fondamentale-ia",
    category,
    title: "Analyser les cryptos avec l'IA et construire une thèse d'investissement",
    subtitle: "Lire les projets, structurer une conviction et parler comme quelqu'un de rigoureux",
    short_description:
      "Une formation pour utiliser l'IA afin de lire les projets crypto plus vite, filtrer les signaux utiles et présenter une vraie thèse d'investissement.",
    long_description:
      "Tu apprends à sortir d'une logique de bruit crypto pour revenir à une analyse structurée : whitepapers, tokenomics, métriques on-chain, risques, scénarios et présentation synthétique. L'IA sert ici à accélérer la lecture et la structuration, pas à remplacer ton jugement.",
    price_cents: 5400,
    currency: "eur",
    stripe_price_id: null,
    thumbnail_url: "/visuals/formations/crypto-analyse-fondamentale-ia-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-vendre-services-finance-ia",
    slug: "vendre-services-finance-ia",
    category,
    title: "Vendre des services de conseil financier IA à des PME et particuliers",
    subtitle: "Positionnement, livrables et acquisition pour monétiser ta veille augmentée",
    short_description:
      "Un programme orienté business pour transformer des compétences finance + IA en offre de veille, rapport et accompagnement récurrent.",
    long_description:
      "Cette formation cadre une activité de conseil financier augmenté par IA sans posture floue. Tu y structures une offre, ses limites légales, sa prospection, ses livrables, sa tarification et sa logique de récurrence. L'objectif est de vendre quelque chose de compréhensible, utile et proprement présenté.",
    price_cents: 7200,
    currency: "eur",
    stripe_price_id: null,
    thumbnail_url: "/visuals/formations/vendre-services-finance-ia-cover.svg",
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
  const product = tradingProducts.find((item) => item.slug === productSlug);

  if (!product) {
    throw new Error(`Produit trading introuvable pour ${productSlug}`);
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

export const tradingProductModules: ProductModuleRecord[] = [
  module(
    "trading-ia-debutant",
    "video-overview",
    "Vidéo tutorielle d'introduction",
    "Bienvenue sur la vidéo tutorielle principale de la formation, avec cadre, promesse et méthode d'utilisation.",
    "video",
    0,
    {
      content_url: "/videos/formations/trading-ia-debutant-overview.mp4",
      content_body:
        "## Ce que couvre la vidéo\nLa vidéo pose le cadre de la formation : rôle de l'IA, discipline, outils gratuits et logique de risque. Elle sert à comprendre l'ordre des modules avant d'entrer dans les contenus écrits.\n\n### Ce que tu dois retenir\n- l'IA aide à lire et structurer, elle ne remplace pas la décision\n- le risque est traité avant la stratégie\n- une routine simple vaut mieux qu'un système trop ambitieux"
    }
  ),
  module(
    "trading-ia-debutant",
    "bases-trading-ia",
    "Les bases du trading IA pour débuter sans confusion",
    "Comprendre ce que l'IA peut faire dans un cadre trading et ce qu'elle ne doit jamais décider à ta place.",
    "text",
    1,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas apprendre à replacer l'IA au bon niveau : un assistant de synthèse, de veille et de mise en forme, pas une machine magique qui trouve des gains garantis. Le but du module est de t'éviter les deux pièges les plus fréquents : soit croire que l'IA remplace la méthode, soit refuser de l'utiliser alors qu'elle peut te faire gagner du temps sur l'analyse et la préparation. Tu verras aussi comment articuler l'IA avec une routine de lecture de marché simple, reproductible et compatible avec un petit capital.",
        understand:
          "Tu dois comprendre la différence entre signal, contexte et décision. L'IA peut accélérer l'organisation d'informations, t'aider à résumer un graphique, te proposer des scénarios ou structurer un journal de trading. En revanche, elle ne connaît ni ton risque réel, ni ton exécution, ni ta psychologie devant le marché. Le bon usage consiste à demander des cadres d'analyse, des checklists et des hypothèses, puis à conserver la décision finale dans un processus discipliné. C'est cette séparation qui rend l'outil utile sans te rendre dépendant.",
        tools: [
          "TradingView en plan gratuit pour les graphiques et alertes",
          "ChatGPT ou un modèle équivalent pour structurer l'analyse",
          "Google Sheets ou Notion pour ton journal de trading",
          "Un compte paper trading pour tester sans pression financière"
        ],
        method: [
          "Choisis un seul marché et un seul horizon de temps pour réduire le bruit.",
          "Prépare chaque journée avec une checklist de contexte : tendance, niveaux, volatilité, événements.",
          "Utilise l'IA pour résumer ton plan de la journée, pas pour inventer un trade.",
          "Journalise chaque décision, même si tu n'entres pas en position.",
          "Fais un bilan hebdomadaire pour corriger les erreurs de lecture et de discipline."
        ],
        behavior: [
          "Reste sobre dans les attentes : l'objectif est la régularité, pas l'excitation.",
          "Évite les captures d'écran de performance comme base de décision.",
          "Ne prends pas une position simplement parce qu'une réponse IA sonne bien.",
          "Privilégie les routines courtes que tu peux répéter pendant plusieurs semaines."
        ],
        deliverables: [
          "Une checklist personnelle d'ouverture de session",
          "Un journal de trading simple avec contexte, décision, résultat, correction",
          "Une liste de prompts réutilisables pour synthétiser une analyse technique"
        ],
        checks: [
          "Tu peux expliquer en une phrase le rôle exact de l'IA dans ton process",
          "Tu as choisi un marché, un time frame et une routine cohérente",
          "Tu sais où se situe la décision finale dans ton workflow"
        ]
      })
    }
  ),
  module(
    "trading-ia-debutant",
    "analyse-technique-ia",
    "Faire une analyse technique assistée par IA sans délirer",
    "Lire le marché avec structure, niveaux et scénarios plutôt qu'avec des opinions brutes.",
    "text",
    2,
    {
      content_body: buildModuleBody({
        learn:
          "Ce module t'apprend à utiliser l'IA comme couche de lecture et de reformulation de l'analyse technique. Tu vas apprendre à décrire un contexte marché, faire résumer une structure, demander des scénarios haussier, neutre ou baissier et convertir cela en plan simple. L'objectif n'est pas d'automatiser l'intuition, mais de rendre tes analyses plus comparables dans le temps et plus faciles à revoir après coup.",
        understand:
          "Ce que tu dois comprendre, c'est que l'analyse technique devient dangereuse quand elle se transforme en narration subjective. L'IA est utile quand tu l'obliges à travailler sur des éléments observables : tendance, niveaux, volumes, pattern, invalidation, ratio rendement risque. Plus ton prompt est factuel, plus la sortie est exploitable. Si tu lui demandes d'anticiper le marché comme un oracle, tu obtiendras surtout du bruit bien formulé.",
        tools: [
          "TradingView avec listes de surveillance et captures annotées",
          "ChatGPT pour transformer l'observation en plan écrit",
          "Google Docs ou Notion pour archiver les scénarios par actif",
          "Calendrier macroéconomique gratuit"
        ],
        method: [
          "Capture le graphique ou décris-le proprement avec les niveaux marqués.",
          "Demande une lecture structurée : tendance, niveaux, zones d'invalidation et scénario principal.",
          "Exige une sortie en tableau ou en checklist pour comparer plusieurs actifs.",
          "Transforme chaque scénario retenu en plan d'entrée, risque, objectif et condition d'annulation.",
          "Archive la décision et reviens dessus une fois le mouvement terminé."
        ],
        behavior: [
          "Sois précis dans les faits donnés à l'IA.",
          "Travaille toujours avec une invalidation claire.",
          "Ignore les analyses trop littéraires ou trop confiantes.",
          "Réduis l'univers d'actifs à ceux que tu comprends déjà."
        ],
        deliverables: [
          "Un template de prompt pour analyse technique factuelle",
          "Une fiche scénario par actif observé",
          "Une grille d'évaluation post-trade"
        ],
        checks: [
          "Tu peux expliquer la différence entre description de marché et prédiction",
          "Tu as une invalidation écrite avant toute entrée",
          "Tes prompts utilisent des éléments observables et non des intuitions vagues"
        ]
      })
    }
  ),
  module(
    "trading-ia-debutant",
    "backtesting-no-code",
    "Backtester sans coder pour valider une première idée",
    "Passer d'une intuition de stratégie à une hypothèse testable sans infrastructure lourde.",
    "text",
    3,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas apprendre à construire un mini protocole de backtesting no-code. L'objectif n'est pas d'obtenir une stratégie parfaite, mais de vérifier si une logique mérite d'être approfondie. Tu verras comment formuler des règles simples, utiliser l'IA pour clarifier les conditions d'entrée et de sortie, et consigner les résultats dans un tableau suffisamment propre pour éviter l'auto-illusion.",
        understand:
          "Tu dois comprendre qu'un backtest utile n'a pas besoin d'être complexe. Ce qui compte est la clarté des règles, la cohérence de l'échantillon, l'acceptation des pertes et la capacité à revoir le test froidement. L'IA peut t'aider à reformuler des règles ou à comparer des journaux de résultats, mais elle ne remplace pas la qualité de tes hypothèses.",
        tools: [
          "Tableur avec colonnes d'entrée, sortie, risque, résultat et commentaire",
          "TradingView bar replay ou historique visuel",
          "ChatGPT pour clarifier les règles de la stratégie",
          "Calcul simple de taux de réussite et ratio moyen gain perte"
        ],
        method: [
          "Décris une stratégie en termes simples : contexte, déclencheur, invalidation et objectif.",
          "Choisis un historique cohérent et un nombre minimal de cas à observer.",
          "Renseigne chaque test dans le tableur sans modifier les règles en cours de route.",
          "Observe les points faibles récurrents : faux signaux, mauvais timing, risque mal calibré.",
          "Décide ensuite si la stratégie mérite un paper trading ou doit être abandonnée."
        ],
        behavior: [
          "Résiste à l'envie de changer les règles après chaque perte.",
          "Cherche d'abord la clarté avant la performance.",
          "Ne confonds pas un bon mois et une vraie robustesse.",
          "Accepte qu'une stratégie refusée est un gain de temps."
        ],
        deliverables: [
          "Un template de tableur de backtesting",
          "Une fiche stratégie avec règles fixées noir sur blanc",
          "Un résumé de viabilité : poursuivre, adapter ou jeter"
        ],
        checks: [
          "Les règles d'entrée et de sortie tiennent en quelques lignes claires",
          "Tu peux expliquer pourquoi le test a été arrêté ou poursuivi",
          "Tu ne modifies pas les résultats après coup"
        ]
      })
    }
  ),
  module(
    "trading-ia-debutant",
    "capital-risque",
    "Gestion du capital et du risque pour rester en jeu",
    "Bâtir une discipline qui protège le compte avant même de chercher la performance.",
    "text",
    4,
    {
      content_body: buildModuleBody({
        learn:
          "Dans ce module, tu vas construire une logique de risque adaptée à un débutant sérieux. Le but est de ne plus parler d'entrée sans parler de taille de position, d'invalidation, de perte maximale et de rythme d'exposition. Tu verras comment l'IA peut t'aider à vérifier la cohérence d'un plan de risque, simuler des scénarios simples et formaliser des garde-fous hebdomadaires.",
        understand:
          "Tu dois comprendre qu'un trader débutant échoue rarement par manque d'indicateurs, mais souvent par manque de cadre de risque. Une bonne analyse avec une mauvaise taille de position reste une mauvaise décision. La priorité est donc de définir ce que tu acceptes de perdre sur un trade, sur une journée et sur une semaine. Ensuite seulement tu cherches des opportunités.",
        tools: [
          "Tableur de sizing simple",
          "Calculatrice de position ou script minimal",
          "Journal de risque hebdomadaire",
          "Prompts IA pour vérifier la cohérence de scénarios de perte"
        ],
        method: [
          "Fixe un risque maximal par trade en pourcentage ou en montant fixe.",
          "Définis une limite quotidienne et hebdomadaire de perte.",
          "Calcule ta taille de position avant d'ouvrir le trade.",
          "Arrête la session si tes règles de coupure sont atteintes.",
          "Fais un bilan hebdomadaire de ton respect des règles, indépendamment des gains."
        ],
        behavior: [
          "Reste plus obsédé par la survie que par la performance du jour.",
          "Refuse le revenge trading après une perte.",
          "Réduis l'exposition quand tu sens la fatigue ou l'excitation monter.",
          "Mesure la qualité d'une session par le respect du plan."
        ],
        deliverables: [
          "Une charte de risque personnelle",
          "Un tableau de sizing réutilisable",
          "Une checklist de coupure après perte"
        ],
        checks: [
          "Tu sais dire combien tu peux perdre avant d'entrer",
          "Tu as une limite de session écrite",
          "Tu peux relire une semaine de trading sans zones grises sur le risque"
        ]
      })
    }
  ),
  module(
    "trading-ia-debutant",
    "strategie-personnelle",
    "Construire sa première stratégie simple et défendable",
    "Assembler un cadre marché, un setup et une routine d'exécution qui tiennent dans le temps.",
    "text",
    5,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas assembler les briques précédentes pour formuler ta première stratégie personnelle : contexte, setup, filtre, risque et revue. L'objectif n'est pas d'inventer quelque chose d'original, mais de construire une méthode que tu peux expliquer, tester et exécuter avec une discipline suffisante.",
        understand:
          "Ce que tu dois comprendre, c'est qu'une stratégie valable n'est pas une suite d'indicateurs. C'est une combinaison logique entre un environnement de marché, des règles de déclenchement, une gestion du risque et un comportement cohérent. L'IA peut t'aider à formaliser le tout dans un langage clair et à comparer plusieurs variantes.",
        tools: [
          "Document de stratégie versionné",
          "Tableur de suivi des variantes",
          "Bibliothèque de prompts pour relire ta logique",
          "Captures TradingView annotées"
        ],
        method: [
          "Choisis une seule logique de marché à exploiter.",
          "Décris le setup en trois à cinq règles maximum.",
          "Associe à ce setup un risque, une invalidation et un objectif minimal.",
          "Teste-le d'abord en simulation ou en taille réduite.",
          "Documente les ajustements au lieu de modifier le système dans ta tête."
        ],
        behavior: [
          "Refuse les stratégies trop complexes pour être expliquées clairement.",
          "Préserve une logique stable sur plusieurs semaines.",
          "Ne cherche pas à trader tous les jours si le setup n'est pas présent.",
          "Traite chaque ajustement comme une hypothèse à tester."
        ],
        deliverables: [
          "Une fiche stratégie de une à deux pages",
          "Une liste de prompts de revue hebdomadaire",
          "Un format de présentation simple de ta méthode"
        ],
        checks: [
          "Ta stratégie peut être expliquée sans jargon inutile",
          "Le setup, le risque et l'invalidation sont tous écrits",
          "Tu sais distinguer test, exécution et amélioration"
        ]
      })
    }
  ),
  module(
    "trading-ia-debutant",
    "ressources-alertes",
    "Ressources gratuites et alertes automatisées pour rester discipliné",
    "Consolider ta routine avec des outils simples, peu coûteux et réutilisables.",
    "resource",
    6,
    {
      content_body: buildModuleBody({
        learn:
          "Ce module te donne une trousse opérationnelle : outils gratuits, organisation de la veille, prompts de synthèse et alertes qui t'aident à rester discipliné. L'objectif est de réduire la charge mentale et de t'éviter de bricoler un environnement différent chaque semaine.",
        understand:
          "Tu dois comprendre qu'un environnement léger mais stable a plus de valeur qu'un empilement d'outils premium mal utilisés. Les alertes doivent t'aider à surveiller moins, pas à te stresser plus. Les ressources doivent accélérer la préparation, pas remplacer la réflexion.",
        tools: [
          "TradingView watchlists et alertes simples",
          "Google Sheets ou Airtable pour la veille",
          "Notion pour la bibliothèque d'analyses",
          "ChatGPT pour la synthèse quotidienne ou hebdomadaire"
        ],
        method: [
          "Définis une liste d'actifs limitée et cohérente.",
          "Installe des alertes sur des niveaux précis, pas sur des émotions.",
          "Crée un modèle de revue hebdomadaire avec les mêmes rubriques.",
          "Archive les signaux pertinents et ignore le reste.",
          "Mets à jour ta boîte à outils une fois par mois, pas tous les trois jours."
        ],
        behavior: [
          "Cherche la continuité plutôt que la nouveauté.",
          "Conserve peu d'outils, mais utilise-les vraiment.",
          "Protège ton attention en évitant les flux inutiles.",
          "Reviens à la checklist quand le marché t'agite."
        ],
        deliverables: [
          "Une stack de veille minimale prête à l'emploi",
          "Un template d'alerte et de revue",
          "Une bibliothèque de ressources et prompts réutilisables"
        ],
        checks: [
          "Tes alertes correspondent à des niveaux définis",
          "Ta stack peut être expliquée en moins de deux minutes",
          "Tu peux préparer une session sans ouvrir dix outils différents"
        ]
      })
    }
  ),
  module(
    "trading-ia-debutant",
    "strategie-avancee",
    "Construire une stratégie plus avancée avec plusieurs filtres",
    "Le module avancé approfondira les scénarios multi-timeframe, les filtres macro et la revue de performance détaillée.",
    "coming_soon",
    7
  ),
  module(
    "automatisation-portefeuille-ia",
    "video-overview",
    "Vidéo tutorielle d'introduction",
    "La vue d'ensemble de la formation pour comprendre comment automatiser un portefeuille avec IA, APIs et n8n.",
    "video",
    0,
    {
      content_url: "/videos/formations/automatisation-portefeuille-ia-overview.mp4",
      content_body:
        "## Ce que couvre la vidéo\nTu vas voir l'architecture générale : données, alertes, reporting et logique de service. La vidéo sert de carte de lecture avant les modules détaillés.\n\n### Ce que tu dois retenir\n- chaque automatisation commence par une question métier claire\n- un bon reporting est plus utile qu'un dashboard trop chargé\n- l'automatisation doit rester explicable et maintenable"
    }
  ),
  module(
    "automatisation-portefeuille-ia",
    "apis-financieres",
    "Comprendre les APIs financières avant d'automatiser",
    "Choisir des sources de données fiables, propres et suffisantes pour un suivi portefeuille sérieux.",
    "text",
    1,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas apprendre à sélectionner des APIs financières sans te perdre dans les catalogues d'intégration. Le but n'est pas d'avoir toutes les données possibles, mais d'obtenir des sources propres pour les prix, la composition du portefeuille, les variations et quelques indicateurs utiles. Ce module t'aide à distinguer les données indispensables de celles qui ne font que compliquer le système, surtout si tu veux ensuite proposer un service de suivi automatisé à un client.",
        understand:
          "Tu dois comprendre qu'une automatisation ne vaut que par la fiabilité de ses entrées. Une API gratuite peut suffire si tu sais exactement ce que tu attends d'elle et à quelle fréquence tu dois rafraîchir l'information. En revanche, un mauvais mapping des tickers, une fréquence incohérente ou une source opaque rendront le reporting inutile.",
        tools: [
          "APIs financières gratuites ou à faible coût",
          "Postman ou Bruno pour tester les appels",
          "n8n pour orchestrer les requêtes",
          "Google Sheets ou base Supabase pour stocker les snapshots"
        ],
        method: [
          "Définis les données dont ton portefeuille a réellement besoin.",
          "Teste plusieurs fournisseurs sur un petit périmètre avant d'en choisir un.",
          "Documente les limites de fréquence, de symboles et de stabilité.",
          "Crée un schéma de données commun pour éviter les mappings fragiles.",
          "Prévois une logique de secours si une source devient indisponible."
        ],
        behavior: [
          "Cherche la stabilité avant la sophistication.",
          "Limite les dépendances externes inutiles.",
          "Valide les données avec quelques contrôles simples.",
          "Documente les hypothèses au lieu de les garder en tête."
        ],
        deliverables: [
          "Un tableau comparatif de fournisseurs de données",
          "Un schéma minimal de données portefeuille",
          "Une check-list de validation des sources"
        ],
        checks: [
          "Tu sais quelles données sont indispensables et lesquelles sont accessoires",
          "Tu as documenté les limites de la source choisie",
          "Ton système peut tolérer une API indisponible sans devenir inutilisable"
        ]
      })
    }
  ),
  module(
    "automatisation-portefeuille-ia",
    "scraping-legal",
    "Scraping légal et récupération de données complémentaires",
    "Compléter une API avec des données récupérées prudemment sur le web.",
    "text",
    2,
    {
      content_body: buildModuleBody({
        learn:
          "Ce module t'apprend à compléter une source API avec des données récupérées prudemment sur le web : news, calendrier, pages publiques ou métriques visibles. L'objectif est d'être utile sans basculer dans des pratiques fragiles ou juridiquement douteuses. Tu vas apprendre à distinguer le scraping opportuniste du scraping maintenable.",
        understand:
          "Tu dois comprendre qu'en finance, la question n'est pas seulement technique. Elle est aussi légale, documentaire et réputationnelle. Si tu construis une automatisation pour toi ou pour un client, tu dois savoir expliquer d'où vient l'information et pourquoi elle est collectée.",
        tools: [
          "n8n HTTP Request",
          "Flux RSS ou flux news structurés",
          "Services de parsing HTML simples",
          "Outils d'archivage de la donnée collectée"
        ],
        method: [
          "Privilégie les flux officiels, documentés ou explicitement publics.",
          "Récupère peu, mais bien : titre, source, date et élément pertinent.",
          "Archive le contenu brut avant tout traitement IA.",
          "Génère ensuite une synthèse claire et attribuée.",
          "Révise régulièrement la nécessité réelle de chaque source ajoutée."
        ],
        behavior: [
          "Reste conservateur sur la collecte.",
          "Évite les dépendances à des pages non stables.",
          "Trace l'origine de chaque donnée utilisée dans un rapport.",
          "Supprime les sources faibles plutôt que de les justifier après coup."
        ],
        deliverables: [
          "Une liste courte de sources complémentaires validées",
          "Un modèle de fiche source",
          "Une routine de nettoyage et d'archivage"
        ],
        checks: [
          "Chaque donnée collectée a une justification",
          "La source et la date restent visibles après traitement",
          "Le système continue d'être compréhensible pour un tiers"
        ]
      })
    }
  ),
  module(
    "automatisation-portefeuille-ia",
    "dashboard-portefeuille",
    "Construire un dashboard portefeuille utile plutôt qu'impressionnant",
    "Organiser la lecture d'un portefeuille pour prendre des décisions et communiquer proprement.",
    "text",
    3,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas construire un tableau de bord portefeuille lisible : répartition, performance, exposition, alertes et commentaire. Le but est d'aider à décider et à communiquer, pas de faire un cockpit décoratif. Le module te montre comment choisir quelques indicateurs vraiment utiles.",
        understand:
          "Tu dois comprendre qu'un bon dashboard n'est pas celui qui affiche le plus de cartes, mais celui qui permet de répondre vite à quatre questions : qu'est-ce que je détiens, comment cela évolue, où sont les risques et quelle action mérite mon attention.",
        tools: [
          "Google Sheets ou Metabase léger",
          "n8n pour rafraîchir les données",
          "Supabase pour stocker les snapshots",
          "IA pour générer un résumé texte du tableau"
        ],
        method: [
          "Commence par les métriques indispensables : valorisation, variation, allocation et concentration.",
          "Ajoute ensuite les signaux d'action : alerte prix, dérive d'allocation ou baisse anormale.",
          "Garde un résumé texte court en haut pour orienter la lecture.",
          "Teste le dashboard avec quelqu'un qui n'a pas construit le système.",
          "Supprime les widgets qui n'entraînent aucune décision."
        ],
        behavior: [
          "Privilégie la lisibilité à l'effet waouh.",
          "Garde des couleurs sobres et une hiérarchie simple.",
          "Fais parler le dashboard en actions possibles, pas seulement en chiffres.",
          "Réduis le nombre d'indicateurs avant d'en ajouter."
        ],
        deliverables: [
          "Une maquette de dashboard portefeuille",
          "Un résumé IA réutilisable",
          "Une liste de métriques obligatoires et facultatives"
        ],
        checks: [
          "Le dashboard répond aux questions clés en moins de deux minutes",
          "Les alertes ont une utilité claire",
          "Le résumé IA reprend réellement les signaux importants"
        ]
      })
    }
  ),
  module(
    "automatisation-portefeuille-ia",
    "alertes-prix",
    "Mettre en place des alertes de prix automatiques et pertinentes",
    "Rester informé sans vivre collé aux marchés toute la journée.",
    "text",
    4,
    {
      content_body: buildModuleBody({
        learn:
          "Dans ce module, tu vas apprendre à concevoir un système d'alertes qui sert ta décision au lieu de la polluer. L'objectif est de détecter des niveaux, des écarts ou des événements utiles sans transformer ton téléphone en machine à stress.",
        understand:
          "Tu dois comprendre que la qualité d'une alerte se mesure à sa capacité à déclencher une action précise. Une alerte de prix sans contexte n'a souvent aucune valeur. En revanche, une alerte liée à un seuil, une rupture de fourchette ou une dérive d'allocation peut être très utile si elle arrive dans le bon format.",
        tools: [
          "TradingView alerts",
          "n8n pour router les notifications",
          "Telegram, email ou Discord comme canaux de sortie",
          "IA pour enrichir le message d'alerte"
        ],
        method: [
          "Choisis des déclencheurs rares mais utiles.",
          "Associe à chaque déclencheur un modèle de message clair.",
          "Route les alertes vers un canal adapté au niveau d'urgence.",
          "Journalise les alertes reçues pour mesurer leur pertinence.",
          "Supprime ou fusionne les alertes redondantes."
        ],
        behavior: [
          "Cherche le calme opérationnel, pas l'hyper-surveillance.",
          "Ne conserve que les alertes qui mènent à une décision.",
          "Relis chaque message comme si c'était un livrable client.",
          "Préserve une fréquence soutenable."
        ],
        deliverables: [
          "Une matrice d'alertes par type d'événement",
          "Des modèles de notifications prêts à l'emploi",
          "Un journal d'alertes pour revue mensuelle"
        ],
        checks: [
          "Chaque alerte correspond à une action possible",
          "Le message d'alerte est compréhensible sans contexte caché",
          "Le système n'émet pas plus de bruit que de valeur"
        ]
      })
    }
  ),
  module(
    "automatisation-portefeuille-ia",
    "reporting-hebdo",
    "Automatiser un rapport hebdomadaire portefeuille crédible",
    "Produire un rapport synthétique que toi ou un client avez vraiment envie de lire.",
    "text",
    5,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas structurer un rapport hebdomadaire de portefeuille qui combine données, synthèse IA et points d'attention. Le but est d'avoir un livrable stable pour toi ou pour un client : ce qui a bougé, ce qui mérite d'être surveillé, les risques principaux et les actions possibles.",
        understand:
          "Tu dois comprendre qu'un bon rapport ne répète pas simplement des chiffres déjà visibles. Il sélectionne, hiérarchise et formule. L'IA aide ici à condenser des mouvements, à reformuler des constats et à garder un ton homogène. Mais le rapport reste utile uniquement si les entrées sont bonnes.",
        tools: [
          "n8n pour collecter et assembler les données",
          "Google Docs ou PDF généré automatiquement",
          "Modèle de prompt pour la synthèse hebdomadaire",
          "Template de rapport avec sections fixes"
        ],
        method: [
          "Définis une structure de rapport constante.",
          "Injecte les données clés et les alertes de la semaine.",
          "Génère une synthèse IA courte et factuelle.",
          "Ajoute une section risques et points d'attention.",
          "Archive chaque rapport pour comparer dans le temps."
        ],
        behavior: [
          "Reste plus utile qu'impressionnant.",
          "Conserve un ton simple, factuel et rassurant.",
          "Ne surcharge pas le rapport d'hypothèses non prouvées.",
          "Traite ce document comme un livrable commercial."
        ],
        deliverables: [
          "Un template de rapport hebdomadaire",
          "Un workflow de génération automatisée",
          "Une section de synthèse client prête à adapter"
        ],
        checks: [
          "Le rapport tient dans une structure stable",
          "La synthèse IA est relue et exploitable",
          "Le livrable peut être présenté à un tiers sans gêne"
        ]
      })
    }
  ),
  module(
    "automatisation-portefeuille-ia",
    "offre-service",
    "Transformer l'automatisation portefeuille en offre de service",
    "Positionner, présenter et facturer un service d'automatisation financière assistée par IA.",
    "text",
    6,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas apprendre à transformer cette compétence technique en offre de service vendable : ce qui est inclus, ce qui est exclu, pour qui c'est utile, à quel prix et sous quelle fréquence. Le but n'est pas de te faire passer pour un conseiller financier réglementé, mais de te positionner proprement sur la veille, le reporting et l'automatisation de données financières.",
        understand:
          "Tu dois comprendre que la monétisation de ce type de service repose sur trois piliers : clarté du périmètre, qualité du reporting et confiance dans la maintenance. Le client achète moins une stack n8n qu'une capacité à centraliser l'information, alerter proprement et produire un document lisible.",
        tools: [
          "Page d'offre simple",
          "Exemples de rapport anonymisés",
          "Checklist onboarding client",
          "Outil de devis ou proposition commerciale"
        ],
        method: [
          "Décris un périmètre précis : sources, fréquence, livrables et canaux d'alerte.",
          "Définis ce qui n'est pas couvert pour éviter les malentendus.",
          "Crée un exemple de rapport et une démonstration simple.",
          "Fixe un prix selon la complexité et la fréquence de maintenance.",
          "Prévois une revue mensuelle avec possibilité d'ajustement."
        ],
        behavior: [
          "Positionne-toi avec modestie et précision.",
          "Ne glisse pas vers des promesses de performance.",
          "Vends d'abord la clarté opérationnelle.",
          "Reste carré sur le périmètre et les limites."
        ],
        deliverables: [
          "Une offre de service portefeuille IA d'une page",
          "Une trame d'onboarding client",
          "Un exemple de livrable commercialisable"
        ],
        checks: [
          "Ton offre explique clairement ce qui est livré",
          "Les limites légales et opérationnelles sont explicites",
          "Le prix correspond à une maintenance réelle du système"
        ]
      })
    }
  ),
  module(
    "automatisation-portefeuille-ia",
    "defi-coming-soon",
    "Étendre le suivi à la DeFi et aux données on-chain",
    "Ce module avancé couvrira l'automatisation spécifique aux protocoles DeFi, wallets et métriques on-chain.",
    "coming_soon",
    7
  ),
  module(
    "crypto-analyse-fondamentale-ia",
    "video-overview",
    "Vidéo tutorielle d'introduction",
    "La vidéo principale présente la logique d'analyse fondamentale crypto augmentée par IA.",
    "video",
    0,
    {
      content_url: "/videos/formations/crypto-analyse-fondamentale-ia-overview.mp4",
      content_body:
        "## Ce que couvre la vidéo\nTu vas comprendre comment utiliser l'IA pour lire plus vite un projet crypto, en gardant une logique de filtrage, de risques et de thèse écrite.\n\n### Ce que tu dois retenir\n- l'IA accélère la lecture, pas le jugement\n- la qualité des critères compte plus que le nombre de tokens étudiés\n- une thèse d'investissement doit être présentable à froid"
    }
  ),
  module(
    "crypto-analyse-fondamentale-ia",
    "bases-analyse-fondamentale",
    "Les bases de l'analyse fondamentale crypto",
    "Construire une grille de lecture avant de regarder les métriques avancées.",
    "text",
    1,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas poser une base d'analyse fondamentale crypto qui t'empêche de sauter d'un token à l'autre sans cadre. L'objectif est d'apprendre à lire un projet comme un actif avec promesse, structure, équipe, utilité, distribution et risques.",
        understand:
          "Tu dois comprendre qu'une thèse crypto sérieuse ne commence pas par le prix, mais par le projet et sa logique économique. L'analyse fondamentale sert à répondre à des questions simples : à quoi sert ce protocole, qui l'utilise, comment le token capture-t-il de la valeur et quels sont les risques d'exécution.",
        tools: [
          "Whitepaper ou documentation officielle",
          "Site du projet, docs et tokenomics",
          "Tableur ou Notion pour la grille d'analyse",
          "IA pour synthétiser la lecture initiale"
        ],
        method: [
          "Commence par la proposition de valeur du projet.",
          "Liste ensuite les parties prenantes : utilisateurs, équipe, investisseurs et communauté.",
          "Analyse le rôle exact du token dans l'écosystème.",
          "Repère les risques de dilution, dépendance ou faiblesse d'exécution.",
          "Termine par une première hypothèse de thèse à valider ou rejeter."
        ],
        behavior: [
          "Cherche la clarté avant l'enthousiasme.",
          "Lis moins de projets, mais mieux.",
          "Ne transforme pas une narration marketing en conviction d'investissement.",
          "Accepte de rejeter vite un projet mal cadré."
        ],
        deliverables: [
          "Une grille d'analyse fondamentale crypto",
          "Une fiche projet synthétique",
          "Une première formulation de thèse ou de rejet"
        ],
        checks: [
          "Tu peux expliquer le rôle du token sans jargon vide",
          "Tu as identifié les principaux risques du projet",
          "La thèse tient sur une page compréhensible"
        ]
      })
    }
  ),
  module(
    "crypto-analyse-fondamentale-ia",
    "whitepapers-ia",
    "Utiliser l'IA pour lire les whitepapers plus vite et mieux",
    "Transformer une lecture dense en synthèse exploitable sans perdre le sens du document.",
    "text",
    2,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas apprendre à faire lire un whitepaper ou une documentation longue par l'IA sans tomber dans le résumé creux. Le module te montre comment découper le document, poser les bonnes questions, récupérer une synthèse structurée puis vérifier les points essentiels.",
        understand:
          "Tu dois comprendre qu'un bon résumé dépend d'un bon protocole de lecture. Si tu demandes une synthèse générale d'un document complexe, tu obtiendras souvent une version lissée du marketing. En revanche, si tu segmentes le texte et si tu interroges l'IA sur l'utilité, le modèle économique, les hypothèses et les risques, la sortie devient plus exploitable.",
        tools: [
          "ChatGPT ou équivalent avec upload texte",
          "PDF reader ou markdown viewer",
          "Notion ou document de synthèse",
          "Checklist de questions de lecture"
        ],
        method: [
          "Découpe le document en blocs logiques.",
          "Demande une synthèse par bloc avec questions ciblées.",
          "Identifie les points vagues ou trop marketés.",
          "Recoupe avec la documentation ou les annonces officielles.",
          "Reformule ensuite en fiche projet exploitable."
        ],
        behavior: [
          "Garde un esprit de contrôle sur les synthèses générées.",
          "Repère les réponses trop sûres ou trop vagues.",
          "Conserve les citations utiles du document source.",
          "Sépare clairement faits, hypothèses et interprétations."
        ],
        deliverables: [
          "Un protocole de lecture de whitepaper",
          "Une fiche de synthèse IA par projet",
          "Une liste de points à vérifier manuellement"
        ],
        checks: [
          "La synthèse ne masque pas les zones d'incertitude",
          "Les éléments clés restent traçables au document source",
          "Tu peux distinguer marketing, mécanique et risque"
        ]
      })
    }
  ),
  module(
    "crypto-analyse-fondamentale-ia",
    "metriques-onchain",
    "Les métriques on-chain essentielles sans devenir analyste quant",
    "Sélectionner quelques indicateurs utiles et éviter le survol compliqué des dashboards.",
    "text",
    3,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas voir comment choisir quelques métriques on-chain vraiment utiles : activité réseau, flux vers les exchanges, concentration, TVL, staking et comportement des wallets selon le type de projet. Le but est de relier les métriques à une thèse d'investissement plutôt que d'empiler des données incompréhensibles.",
        understand:
          "Tu dois comprendre qu'une métrique n'a de valeur que dans un contexte. Une hausse d'activité peut être excellente pour un protocole d'usage et insignifiante pour un autre. L'important est donc de partir de la question métier puis de choisir la métrique qui éclaire cette question.",
        tools: [
          "Glassnode, DefiLlama, Dune ou équivalents gratuits",
          "Sheets pour suivre un petit panel d'indicateurs",
          "IA pour transformer des observations en synthèse claire",
          "Captures et annotations pour archive"
        ],
        method: [
          "Pars d'une thèse ou d'une question précise.",
          "Choisis deux à quatre métriques cohérentes avec cette question.",
          "Observe leur évolution sur une période utile.",
          "Relie les signaux à des scénarios, pas à des certitudes.",
          "Archive la lecture et compare avec l'évolution réelle du projet."
        ],
        behavior: [
          "Préfère peu de métriques bien comprises.",
          "Refuse l'effet tableau de bord permanent.",
          "Relis chaque signal avec prudence.",
          "Documente les limites de ton interprétation."
        ],
        deliverables: [
          "Une shortlist de métriques par type de projet",
          "Un modèle de fiche on-chain",
          "Une synthèse de signaux reliée à une thèse"
        ],
        checks: [
          "Chaque métrique répond à une question précise",
          "Tu sais expliquer pourquoi elle compte pour ce projet",
          "La conclusion reste nuancée et défendable"
        ]
      })
    }
  ),
  module(
    "crypto-analyse-fondamentale-ia",
    "these-investissement",
    "Construire une thèse d'investissement claire et défendable",
    "Assembler projet, signaux, risques et scénario en un document vraiment utile.",
    "text",
    4,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas construire une thèse d'investissement complète mais concise. L'objectif est d'assembler la proposition de valeur du projet, les signaux fondamentaux, les métriques utiles, les risques majeurs et les conditions d'invalidation.",
        understand:
          "Tu dois comprendre qu'une thèse n'est pas une déclaration de foi. C'est un document d'aide à la décision qui doit rester falsifiable. Elle répond à une question simple : pourquoi ce projet mérite-t-il d'être observé, accumulé ou rejeté à ce stade.",
        tools: [
          "Template de thèse d'investissement",
          "Notes fondamentales et on-chain des modules précédents",
          "IA pour reformulation et synthèse finale",
          "Support PDF ou doc partageable"
        ],
        method: [
          "Commence par l'hypothèse centrale du projet.",
          "Ajoute les preuves qui soutiennent cette hypothèse.",
          "Liste les risques et les invalidations possibles.",
          "Fixe un horizon de suivi et des points de contrôle.",
          "Relis le document comme si tu devais le défendre devant quelqu'un de sceptique."
        ],
        behavior: [
          "Cherche la clarté et la cohérence avant le style.",
          "Traite les risques avec autant de sérieux que l'opportunité.",
          "Accepte qu'une bonne thèse peut conclure à ne pas investir.",
          "Reste sobre dans le langage utilisé."
        ],
        deliverables: [
          "Une thèse d'investissement d'une à deux pages",
          "Une section risques et invalidation propre",
          "Un format de présentation réutilisable"
        ],
        checks: [
          "La thèse tient sans jargon creux",
          "Les risques sont explicitement écrits",
          "Tu sais ce qui invaliderait la conviction"
        ]
      })
    }
  ),
  module(
    "crypto-analyse-fondamentale-ia",
    "presentation-recommandation",
    "Présenter une recommandation de manière propre et compréhensible",
    "Transformer l'analyse en restitution claire pour toi, un client ou une audience.",
    "text",
    5,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas apprendre à présenter une recommandation de manière responsable : contexte, thèse, scénario, risques et limites. Ce module est particulièrement utile si tu veux monétiser tes compétences sous forme de veille, rapport ou présentation.",
        understand:
          "Tu dois comprendre qu'en finance, la qualité de la restitution compte presque autant que l'analyse elle-même. Une recommandation mal présentée peut créer des attentes fausses ou brouiller la logique. L'IA peut t'aider à normaliser le ton, raccourcir certaines sections et proposer des formulations plus nettes.",
        tools: [
          "Template de rapport ou slides courtes",
          "IA pour reformulation claire",
          "Checklist légale et de prudence",
          "Exemples de synthèse une page"
        ],
        method: [
          "Ouvre par le contexte et la question traitée.",
          "Présente la thèse en quelques points.",
          "Ajoute risques, limites et horizon.",
          "Conclue par les éléments à surveiller, pas par une injonction.",
          "Garde un format stable pour toutes les recommandations."
        ],
        behavior: [
          "Reste clair sur le cadre et les limites.",
          "Évite le langage sensationnaliste.",
          "Relis le document comme si quelqu'un pouvait le transmettre à un tiers.",
          "Soigne l'esthétique sans masquer le fond."
        ],
        deliverables: [
          "Un template de recommandation lisible",
          "Une clause de prudence claire",
          "Une structure de restitution réutilisable"
        ],
        checks: [
          "Le lecteur comprend le contexte, la thèse et les risques",
          "Le format reste sobre et professionnel",
          "Le document ne promet pas ce qu'il ne peut pas garantir"
        ]
      })
    }
  ),
  module(
    "crypto-analyse-fondamentale-ia",
    "defi-avancee",
    "Analyse avancée DeFi, dérivés et protocoles complexes",
    "Le module avancé approfondira les protocoles DeFi, les modèles de capture de valeur et les cas limites d'analyse.",
    "coming_soon",
    6
  ),
  module(
    "vendre-services-finance-ia",
    "video-overview",
    "Vidéo tutorielle d'introduction",
    "La vue d'ensemble de la formation dédiée à la vente de services de conseil financier augmentés par IA.",
    "video",
    0,
    {
      content_url: "/videos/formations/vendre-services-finance-ia-overview.mp4",
      content_body:
        "## Ce que couvre la vidéo\nTu vas comprendre comment positionner une offre de veille et rapport financier assistée par IA sans sortir de ton périmètre.\n\n### Ce que tu dois retenir\n- l'offre vend la clarté, pas une promesse de performance\n- le cadre légal et les limites doivent être visibles dès le départ\n- la récurrence se construit par la qualité du livrable"
    }
  ),
  module(
    "vendre-services-finance-ia",
    "cadre-legal",
    "Le cadre légal minimal du conseil financier en France",
    "Définir précisément ce que tu peux vendre, ce que tu dois éviter et comment présenter tes limites.",
    "text",
    1,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas apprendre à cadrer ton offre pour éviter le flou juridique et commercial. Le module ne remplace pas un conseil réglementaire spécialisé, mais il te donne les distinctions de base pour vendre une veille, un reporting ou une automatisation financière sans te présenter comme ce que tu n'es pas.",
        understand:
          "Tu dois comprendre que la sécurité commerciale d'une offre tient beaucoup à sa formulation. Si tu présentes un livrable comme un outil d'aide à la lecture et à la décision, avec périmètre clair et absence de promesse de rendement, tu restes dans un cadre bien plus propre.",
        tools: [
          "Checklist de périmètre commercial",
          "Templates de clauses et limites de service",
          "Support de présentation d'offre",
          "IA pour reformuler de manière plus claire et prudente"
        ],
        method: [
          "Définis exactement le livrable proposé.",
          "Écris ce qui est inclus et explicitement ce qui ne l'est pas.",
          "Clarifie la cible et l'usage attendu du document.",
          "Relis l'offre pour supprimer toute promesse ambiguë.",
          "Fais valider le vocabulaire critique si nécessaire."
        ],
        behavior: [
          "Privilégie la prudence et la clarté au marketing agressif.",
          "Ne joue pas au conseiller réglementé si ce n'est pas ton statut.",
          "Documente tes limites sans les cacher.",
          "Vends un cadre sérieux avant de vendre une expertise."
        ],
        deliverables: [
          "Une checklist de conformité rédactionnelle",
          "Une trame d'offre avec limites explicites",
          "Une page de périmètre de service"
        ],
        checks: [
          "Le périmètre de l'offre est compréhensible en moins d'une minute",
          "Les limites sont visibles sans être enterrées",
          "Tu peux expliquer clairement ce que tu ne fais pas"
        ]
      })
    }
  ),
  module(
    "vendre-services-finance-ia",
    "offre-veille-rapport",
    "Construire une offre de veille et rapport financier IA",
    "Structurer un service compréhensible, récurrent et défendable autour de la veille augmentée.",
    "text",
    2,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas apprendre à construire une offre de veille et rapport financier qui repose sur la qualité du cadrage, du rythme et du livrable. Le module montre comment choisir un angle de service clair : suivi thématique, portefeuille, secteur, risques ou synthèse d'actualité.",
        understand:
          "Tu dois comprendre qu'une offre vendable ne dit pas seulement ce qu'elle fait, mais aussi ce qu'elle aide à éviter. Dans ce cas, elle réduit la dispersion, le manque de temps, la surcharge d'information et l'absence de synthèse. L'IA t'aide à accélérer la production, mais le client paie surtout pour la clarté, la sélection et la régularité.",
        tools: [
          "Template d'offre une page",
          "Exemple de rapport ou note de veille",
          "Outil d'automatisation léger pour la collecte",
          "IA pour synthèse et reformulation"
        ],
        method: [
          "Choisis un type de client et un besoin précis.",
          "Définis une fréquence et un format de livrable.",
          "Liste les sources et signaux réellement utiles.",
          "Crée un exemple de rapport concret.",
          "Formule une promesse commerciale simple et crédible."
        ],
        behavior: [
          "Reste concret et démonstratif.",
          "Parle de clarté et de gain de temps avant de parler d'IA.",
          "Refuse les offres trop larges pour être tenues proprement.",
          "Teste ton offre sur une cible réelle avant de la complexifier."
        ],
        deliverables: [
          "Une offre de veille d'une page",
          "Un exemple de rapport",
          "Une promesse commerciale courte"
        ],
        checks: [
          "L'offre répond à un besoin clair",
          "Le client comprend la fréquence et le format",
          "Le livrable démonstratif renforce la crédibilité"
        ]
      })
    }
  ),
  module(
    "vendre-services-finance-ia",
    "prospection-acquisition",
    "Prospection et acquisition clients pour une offre finance + IA",
    "Trouver les bons interlocuteurs, ouvrir une conversation claire et éviter les discours flous.",
    "text",
    3,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas construire une prospection adaptée à ce type d'offre : directe, claire, sans surpromesse. Le but est de savoir à qui parler, comment ouvrir la conversation, quoi montrer et comment transformer une curiosité pour l'IA en besoin de service.",
        understand:
          "Tu dois comprendre que vendre une offre finance + IA ne consiste pas à vendre l'IA. Cela consiste à vendre une meilleure lisibilité de l'information, un gain de temps, un reporting plus propre ou une veille mieux structurée. La prospection doit donc partir d'un irritant réel.",
        tools: [
          "Scripts d'ouverture de contact",
          "Fiche découverte client",
          "Exemple de mini-audit ou démonstration",
          "CRM simple ou suivi manuel structuré"
        ],
        method: [
          "Choisis une cible précise et un problème dominant.",
          "Prépare un message d'ouverture centré sur le besoin.",
          "Montre un exemple de livrable plutôt qu'un discours abstrait.",
          "Conduis un échange découverte avec questions simples.",
          "Conclue par une proposition cadrée et limitée."
        ],
        behavior: [
          "Parle simple, sans posture pseudo-experte.",
          "Écoute le besoin réel avant de réciter ton offre.",
          "Utilise des exemples concrets plutôt que des promesses vagues.",
          "Respecte les limites de ton périmètre dès le premier contact."
        ],
        deliverables: [
          "Un script de prospection court",
          "Une grille de découverte client",
          "Une structure de mini-démo ou audit initial"
        ],
        checks: [
          "Ton message d'ouverture peut être compris par un non-tech",
          "Tu sais identifier rapidement si le besoin est réel",
          "La proposition commerciale reste claire et limitée"
        ]
      })
    }
  ),
  module(
    "vendre-services-finance-ia",
    "livrer-rapport-pro",
    "Livrer un rapport financier IA professionnel et rassurant",
    "Construire un livrable qui ressemble à un service sérieux, pas à une sortie d'outil.",
    "text",
    4,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas apprendre à produire un rapport financier IA réellement présentable. Le but n'est pas d'empiler des tableaux, mais de créer un document qui donne confiance : structure stable, résumé clair, points d'attention, risques et prochaine action recommandée.",
        understand:
          "Tu dois comprendre qu'un bon rapport est à la fois synthétique et traçable. Il doit aider le lecteur à comprendre ce qui compte, pourquoi cela compte et quoi surveiller ensuite. L'IA peut accélérer la rédaction et homogénéiser le ton, mais le rapport doit rester vérifiable, sobre et facile à lire.",
        tools: [
          "Template de rapport ou note client",
          "Données collectées ou produites en amont",
          "IA pour synthèse et reformulation finale",
          "Outil PDF ou document partagé propre"
        ],
        method: [
          "Crée une structure fixe : contexte, faits, lecture, risques et suite.",
          "Injecte uniquement les données qui soutiennent la conclusion.",
          "Rédige une synthèse courte en haut du document.",
          "Ajoute les limites et points de vigilance de manière visible.",
          "Relis le rapport comme un livrable commercial, pas seulement technique."
        ],
        behavior: [
          "Recherche la lisibilité avant la densité.",
          "Soigne la hiérarchie visuelle et le ton.",
          "Garde une distance nette avec toute promesse de rendement.",
          "Fais relire le document à froid si possible."
        ],
        deliverables: [
          "Un template de rapport premium",
          "Une structure de synthèse stable",
          "Une check-list qualité avant envoi"
        ],
        checks: [
          "Le rapport peut être compris rapidement",
          "Les limites et risques sont visibles",
          "Le rendu inspire un service sérieux et maintenable"
        ]
      })
    }
  ),
  module(
    "vendre-services-finance-ia",
    "tarification-positionnement",
    "Tarification et positionnement d'une offre finance IA",
    "Fixer un prix, un niveau de service et une logique de récurrence défendables.",
    "text",
    5,
    {
      content_body: buildModuleBody({
        learn:
          "Tu vas apprendre à tarifer ton offre en fonction de la fréquence, de la complexité, du niveau de personnalisation et de la maintenance attendue. L'objectif est d'éviter le piège du tarif trop bas qui détruit la qualité et celui du positionnement prétentieux qui ne se vend pas.",
        understand:
          "Tu dois comprendre qu'en service finance + IA, le prix reflète moins l'outil utilisé que le cadre opérationnel que tu assumes : sélection des signaux, qualité de synthèse, régularité, fiabilité et accompagnement. La tarification doit donc être liée à des livrables et à un rythme, pas à des notions vagues d'intelligence artificielle.",
        tools: [
          "Grille d'offres et niveaux de service",
          "Exemples de devis ou proposition commerciale",
          "Calcul de temps de production réel",
          "IA pour reformuler l'offre et la valeur perçue"
        ],
        method: [
          "Définis une offre d'entrée simple et cadrée.",
          "Ajoute ensuite une version récurrente ou premium si la maintenance le justifie.",
          "Calcule le temps réel de production et de support.",
          "Formule clairement ce qui change d'un niveau à l'autre.",
          "Teste le prix avec le marché et ajuste sans casser le périmètre."
        ],
        behavior: [
          "Assume un prix cohérent avec la qualité du livrable.",
          "Ne vends pas du premium avec un cadre flou.",
          "Reste transparent sur la fréquence et la charge de maintenance.",
          "Cherche la cohérence avant la sophistication tarifaire."
        ],
        deliverables: [
          "Une grille de prix et d'offres",
          "Une proposition commerciale type",
          "Un calcul de rentabilité de l'offre"
        ],
        checks: [
          "Le prix est relié à un livrable clair",
          "Chaque niveau d'offre a un périmètre distinct",
          "La rentabilité reste cohérente avec la production"
        ]
      })
    }
  ),
  module(
    "vendre-services-finance-ia",
    "activite-recurrente",
    "Développer une activité récurrente de conseil financier IA",
    "Le module avancé couvrira le développement commercial, les partenariats et la montée en gamme sur une activité installée.",
    "coming_soon",
    6
  )
];

export const tradingProductSupplements: Record<string, ProductSupplement> = {
  "trading-ia-debutant": {
    bestFor: [
      "débutants sérieux qui veulent un cadre de trading assisté par IA sans fantasme",
      "profils qui veulent apprendre à structurer une routine avant de chercher la performance",
      "personnes qui veulent ensuite transformer cette compétence en veille ou contenu pédagogique"
    ],
    outcomes: [
      "une routine de trading structurée autour du risque",
      "une première stratégie testable et documentée",
      "une stack légère de veille, alertes et prompts IA"
    ],
    pitch:
      "La porte d'entrée la plus sobre pour comprendre comment l'IA peut améliorer une pratique trading sans remplacer la discipline."
  },
  "automatisation-portefeuille-ia": {
    salesPriority: 4,
    bestFor: [
      "freelances qui veulent vendre du suivi portefeuille ou du reporting automatisé",
      "profils finance ou no-code qui veulent créer un service concret avec n8n",
      "personnes qui cherchent une offre récurrente basée sur données et clarté"
    ],
    outcomes: [
      "une architecture de suivi portefeuille exploitable",
      "un système d'alertes et de reporting prêt à maintenir",
      "une offre de service portefeuille IA claire à présenter"
    ],
    pitch:
      "Une formation directement monétisable pour automatiser le suivi d'un portefeuille et le transformer en service clair."
  },
  "crypto-analyse-fondamentale-ia": {
    bestFor: [
      "personnes qui veulent lire les projets crypto avec une grille sérieuse",
      "profils veille ou contenu qui veulent produire des analyses plus propres",
      "curieux crypto qui veulent sortir de la narration purement spéculative"
    ],
    outcomes: [
      "une méthode de lecture whitepaper et tokenomics",
      "une sélection cohérente de métriques on-chain",
      "une thèse d'investissement écrite et présentable"
    ],
    pitch:
      "Le cadre pour transformer une curiosité crypto diffuse en grille d'analyse structurée, documentée et transmissible."
  },
  "vendre-services-finance-ia": {
    bestFor: [
      "indépendants qui veulent monétiser une compétence de veille augmentée par IA",
      "profils finance qui cherchent un positionnement plus moderne et productif",
      "personnes qui veulent vendre un rapport ou une veille récurrente sans flou commercial"
    ],
    outcomes: [
      "une offre finance IA avec périmètre et limites clairs",
      "une prospection et un reporting plus crédibles",
      "une base pour développer une activité récurrente propre"
    ],
    pitch:
      "La formation business pour transformer finance + IA en offre de service vendable, défendable et correctement présentée."
  }
};
