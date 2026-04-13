import type { ProductModuleRecord, ProductRecord } from "@/lib/types";

const now = new Date("2026-04-13T10:00:00.000Z").toISOString();

function body({
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

export const newProducts: ProductRecord[] = [
  {
    id: "local-ia-revenus-actifs",
    slug: "ia-revenus-actifs",
    category: "flagship",
    title: "IA & Revenus Actifs - Le programme complet",
    subtitle: "De la compétence brute à une offre de service vendable en 30 jours",
    short_description:
      "Le programme flagship de TechCash Academy pour choisir un angle clair, créer une offre solide, trouver ses premiers clients et automatiser sa livraison.",
    long_description:
      "Ce programme aide à transformer une compétence existante en activité indépendante rentable. Tu y trouves le positionnement, la création d'offre, la prospection, la livraison automatisée et la gestion des premiers clients. Chaque module aboutit à un livrable ou à une décision concrète.",
    price_cents: 9700,
    currency: "eur",
    stripe_price_id: "price_1TLmtYGSZgm5QCNLvP7DYjNV",
    thumbnail_url: "/visuals/formations/ia-revenus-actifs-cover.svg",
    is_active: true,
    is_featured: true,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-chatbot-client-make-gpt",
    slug: "chatbot-client-make-gpt",
    category: "ia",
    title: "Créer un chatbot client avec Make et GPT",
    subtitle: "Un assistant automatisé opérationnel en moins d'une journée",
    short_description:
      "Concevoir, déployer et vendre un chatbot client no-code avec Make et GPT-4o, sans développement lourd.",
    long_description:
      "Cette formation montre comment créer un chatbot fonctionnel sans coder : connexion à une base de connaissances, traitement des questions fréquentes, escalade vers un humain et déploiement sur un site ou un canal de messagerie. Chaque étape est pensée pour être revendable à des PME.",
    price_cents: 6800,
    currency: "eur",
    stripe_price_id: "price_1TLmtYGSZgm5QCNLl3xx7jlR",
    thumbnail_url: "/visuals/formations/chatbot-client-make-gpt-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-agent-ia-business",
    slug: "agent-ia-business",
    category: "ia",
    title: "Créer un agent IA pour son business",
    subtitle: "Automatiser ses tâches les plus chronophages avec un agent autonome",
    short_description:
      "Construire un agent IA qui aide à prospecter, qualifier, rédiger et reporter sans multiplier les outils fragiles.",
    long_description:
      "Cette formation couvre la création d'agents IA avec n8n, GPT-4o et des APIs tierces. Tu y apprends à déléguer des tâches complexes à un agent autonome : veille, rédaction, analyse, prospection et reporting. L'objectif est de réduire le travail manuel et de transformer cette compétence en offre vendable.",
    price_cents: 7900,
    currency: "eur",
    stripe_price_id: "price_1TLmtYGSZgm5QCNLZFPC1SZT",
    thumbnail_url: "/visuals/formations/agent-ia-business-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-facturation-compta-freelance",
    slug: "facturation-compta-freelance",
    category: "business",
    title: "Facturer et gérer sa compta freelance sans comptable",
    subtitle: "Les bases légales, fiscales et pratiques pour encaisser proprement",
    short_description:
      "Micro-entreprise, TVA, devis, facturation, cotisations et déclarations : les bases à maîtriser pour rester propre.",
    long_description:
      "Cette formation couvre la gestion administrative et comptable d'un freelance en micro-entreprise : création, obligations déclaratives, outils de facturation, TVA, cotisations URSSAF et protection sociale. L'approche est concrète, sans jargon et orientée action.",
    price_cents: 5900,
    currency: "eur",
    stripe_price_id: "price_1TLmtYGSZgm5QCNLe4qnO7Si",
    thumbnail_url: "/visuals/formations/facturation-compta-freelance-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-offre-mensuelle-recurrente",
    slug: "offre-mensuelle-recurrente",
    category: "business",
    title: "Créer une offre mensuelle récurrente pour PME",
    subtitle: "Transformer des missions ponctuelles en contrats stables",
    short_description:
      "Apprendre à packager, pitcher et signer des contrats mensuels avec des PME sans se retrouver à sous-livrer.",
    long_description:
      "Cette formation aide à sortir du modèle mission par mission en construisant une offre récurrente solide. Tu y trouves les bons formats de forfait, les arguments pour convaincre un dirigeant PME, la structure contractuelle et les outils pour livrer sans te noyer.",
    price_cents: 6900,
    currency: "eur",
    stripe_price_id: "price_1TLmtYGSZgm5QCNLqvc43USq",
    thumbnail_url: "/visuals/formations/offre-mensuelle-recurrente-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-pack-it-freelance",
    slug: "pack-it-freelance",
    category: "bundle",
    title: "Pack IT Freelance - 3 formations essentielles",
    subtitle: "Tout pour lancer, vendre et maintenir une activité IT indépendante",
    short_description:
      "Freelance IT 30 jours + Maintenance PME + GLPI Support dans un pack simple à comprendre et immédiat à exploiter.",
    long_description:
      "Ce pack regroupe les trois formations fondamentales pour un technicien IT qui veut se lancer en indépendant : structurer son offre, vendre de la maintenance récurrente et déployer GLPI comme outil de support professionnel.",
    price_cents: 14900,
    currency: "eur",
    stripe_price_id: "price_1TLmtYGSZgm5QCNLAAG59rXD",
    thumbnail_url: "/visuals/formations/pack-it-freelance-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  {
    id: "local-pack-finance-ia",
    slug: "pack-finance-ia",
    category: "bundle",
    title: "Pack Finance IA - 4 formations complètes",
    subtitle: "De la lecture de marché à la vente de services financiers augmentés",
    short_description:
      "Trading IA, portefeuille automatisé, crypto IA et services Finance IA réunis dans un seul parcours cohérent.",
    long_description:
      "Ce pack regroupe les quatre formations du catalogue Finance IA : comprendre et utiliser l'IA pour trader, automatiser son portefeuille, analyser les cryptos et vendre des services financiers récurrents.",
    price_cents: 19700,
    currency: "eur",
    stripe_price_id: "price_1TLmtYGSZgm5QCNLQetVn6hW",
    thumbnail_url: "/visuals/formations/pack-finance-ia-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  }
];

function productBySlug(productSlug: string) {
  const product = newProducts.find((item) => item.slug === productSlug);
  if (!product) throw new Error(`Produit introuvable : ${productSlug}`);
  return product;
}

function hero(productSlug: string, title: string, description: string): ProductModuleRecord {
  const product = productBySlug(productSlug);
  return {
    id: `${product.id}-video-overview`,
    product_id: product.id,
    slug: "video-overview",
    title,
    description,
    content_type: "video",
    content_url: `/videos/formations/${productSlug}-overview.mp4`,
    content_body:
      "## Ce que couvre la vidéo\nCette vidéo pose le cadre de la formation, le résultat attendu, la logique du programme et la manière d'utiliser les modules écrits pour avancer de façon concrète.\n\n### Vérification\n- Tu sais ce que la formation promet réellement\n- Tu comprends l'ordre des modules\n- Tu sais quel livrable viser en priorité",
    is_published: true,
    sort_order: 0,
    created_at: now,
    updated_at: now
  };
}

function mod(
  productSlug: string,
  slug: string,
  title: string,
  description: string,
  content_type: ProductModuleRecord["content_type"],
  sort_order: number,
  content_body?: string
): ProductModuleRecord {
  const product = productBySlug(productSlug);
  return {
    id: `${product.id}-${slug}`,
    product_id: product.id,
    slug,
    title,
    description,
    content_type,
    content_url: null,
    content_body: content_body ?? null,
    is_published: true,
    sort_order,
    created_at: now,
    updated_at: now
  };
}

export const newProductModules: ProductModuleRecord[] = [
  hero("ia-revenus-actifs", "Vidéo tutorielle d'introduction", "Vue d'ensemble du programme flagship : angle, offre, prospection, livraison et récurrence."),
  mod("ia-revenus-actifs", "choisir-son-angle", "Choisir son angle : IT, IA ou Finance", "Évaluer ses compétences actuelles et choisir le marché le plus accessible pour démarrer vite.", "text", 1, body({ learn: "Tu vas apprendre à choisir un angle de départ réaliste entre IT, IA et Finance, sans t'éparpiller ni te raconter une histoire trop ambitieuse.", understand: "Le bon angle n'est pas celui qui te fait rêver. C'est celui qui te permet d'apporter une valeur claire à un client joignable cette semaine avec les compétences que tu possèdes déjà ou que tu peux consolider rapidement.", tools: ["Un tableau simple Notion ou Google Sheets", "Une liste de 20 prospects potentiels", "Ton historique de compétences et d'expériences"], method: ["Liste tes compétences réellement exploitables aujourd'hui.", "Associe chaque compétence à un problème client précis.", "Choisis l'angle qui a le délai de vente le plus court et la mise en oeuvre la plus claire.", "Écarte tout angle qui demande six mois de montée en compétence."], behavior: ["Reste sobre dans tes promesses.", "Ne choisis pas un marché uniquement parce qu'il semble tendance.", "Cherche la clarté commerciale avant la sophistication."], deliverables: ["Une phrase d'offre par angle", "Un angle principal choisi pour 90 jours", "Une liste de prospects cohérente avec cet angle"], checks: ["Tu peux expliquer ton angle en moins de 30 secondes", "Tu sais à quel client tu t'adresses", "Tu connais le problème que tu résous"] })),
  mod("ia-revenus-actifs", "creer-offre-48h", "Créer son offre de service en 48h", "Passer d'une compétence floue à une offre claire, tarifiée et prête à être présentée.", "text", 2, body({ learn: "Tu vas structurer une offre claire avec promesse, périmètre, livrable, prix et délai, de façon à pouvoir la présenter sans hésiter.", understand: "Une offre vendable n'est pas une liste de compétences. C'est une transformation concrète promise à un type de client dans un cadre précis, avec un résultat compréhensible et un prix défendable.", tools: ["Template d'offre en une phrase", "Exemples de devis simples", "Un document de cadrage d'une page"], method: ["Rédige une phrase d'offre simple et lisible.", "Définis ce qui est inclus et ce qui ne l'est pas.", "Fixe un prix initial cohérent avec la charge réelle.", "Teste ton offre à voix haute auprès de trois personnes."], behavior: ["Évite le jargon.", "Ne mélange pas trois services différents dans la même offre.", "Privilégie un résultat concret à une longue liste de tâches."], deliverables: ["Une offre en une phrase", "Une version courte du devis", "Une version courte du livrable promis"], checks: ["Une personne externe comprend l'offre immédiatement", "Le prix est annoncé sans gêne", "Le périmètre est clair"] })),
  mod("ia-revenus-actifs", "trouver-premiers-clients", "Trouver ses trois premiers clients", "Stratégie terrain pour les 30 premiers jours : réseau proche, prospection locale et LinkedIn ciblé.", "text", 3, body({ learn: "Tu vas construire un plan d'acquisition simple pour générer des conversations utiles sans dépendre d'un site, d'une audience ou d'un budget publicitaire.", understand: "Les premiers clients viennent rarement d'un tunnel complexe. Ils viennent d'une offre claire, d'une prospection régulière et d'une posture simple : montrer que tu peux résoudre un problème concret sans faire perdre du temps.", tools: ["Un CRM minimaliste", "LinkedIn", "Une liste locale de TPE/PME à contacter"], method: ["Contacte ton cercle proche avec une demande de mise en relation simple.", "Construis une liste locale de prospects cohérents.", "Prends dix contacts par semaine au minimum.", "Relance proprement après cinq à sept jours."], behavior: ["Ne cherche pas à impressionner, cherche à être clair.", "Accepte que la répétition fasse partie du travail.", "Ne raconte pas ta vie, parle du problème du client."], deliverables: ["Une liste de 30 prospects", "Un script de prise de contact", "Un tableau de suivi des relances"], checks: ["Tu as lancé les premiers messages", "Tu sais relancer sans improviser", "Tu mesures le nombre de conversations ouvertes"] })),
  mod("ia-revenus-actifs", "automatiser-livraison", "Automatiser sa livraison avec n8n et l'IA", "Gagner du temps sur chaque mission en automatisant les tâches répétitives.", "text", 4, body({ learn: "Tu vas identifier les tâches répétitives qui mangent ta marge et les convertir en workflows simples pour accélérer l'onboarding, le suivi et la livraison.", understand: "L'automatisation rentable n'est pas celle qui fait tout. C'est celle qui supprime les répétitions à faible valeur : relances, rapports, organisation, rappels, génération de documents et transmission d'informations.", tools: ["n8n ou Make", "Gmail", "Notion ou Google Drive"], method: ["Choisis une seule routine répétitive à automatiser en premier.", "Décris le workflow avec déclencheur, action et résultat.", "Teste le scénario sur un cas simple.", "Documente le workflow pour pouvoir le corriger ou le revendre."], behavior: ["Commence simple.", "Ne déploie pas en production un workflow non testé.", "Reste capable de reprendre la main manuellement."], deliverables: ["Un workflow onboarding", "Un workflow de relance", "Un mini guide de maintenance"], checks: ["Le workflow tourne sans erreur", "Tu sais où corriger si ça casse", "Le client comprend la valeur créée"] })),
  mod("ia-revenus-actifs", "facturer-encaisser", "Facturer et encaisser proprement", "Structure légale, outils de facturation, paiement en ligne et gestion de la TVA.", "text", 5, body({ learn: "Tu vas poser un cadre simple pour vendre, facturer, encaisser et suivre tes paiements sans te créer des problèmes administratifs.", understand: "Une activité rentable ne tient pas si l'encaissement est flou. Le client doit savoir ce qu'il paie, quand il paie et ce qu'il reçoit. Toi, tu dois savoir ce que tu gardes après charges.", tools: ["Facture.net ou Indy", "Stripe", "Un compte bancaire dédié"], method: ["Choisis une structure légale adaptée à ton démarrage.", "Prépare un modèle de devis et de facture propre.", "Installe un lien de paiement ou un process d'encaissement simple.", "Provisionne automatiquement une part des encaissements pour les charges."], behavior: ["N'attends pas pour envoyer une facture.", "Relance rapidement les impayés.", "Sépare toujours ton argent perso et ton argent pro."], deliverables: ["Un modèle de devis", "Un modèle de facture", "Un process d'encaissement lisible"], checks: ["Tu sais facturer aujourd'hui", "Tu sais combien tu gardes réellement", "Tu sais comment relancer proprement"] })),
  mod("ia-revenus-actifs", "recurrence-client", "Passer à des revenus récurrents", "Transformer une mission ponctuelle en contrat mensuel propre et défendable.", "text", 6, body({ learn: "Tu vas apprendre à passer d'une mission one-shot à une relation mensuelle plus stable, plus visible et plus rentable.", understand: "La récurrence ne se vend pas comme un abonnement abstrait. Elle se vend comme une tranquillité d'esprit, une disponibilité prioritaire et une continuité de service.", tools: ["Un modèle de rapport mensuel", "Un contrat de prestation simple", "Un calendrier de suivi client"], method: ["Repère les besoins continus chez tes premiers clients.", "Transforme ces besoins en forfait clair.", "Présente le forfait avec bénéfice, périmètre et exclusions.", "Livre chaque mois une preuve visible de valeur."], behavior: ["Sois clair sur ce qui est inclus et exclu.", "Ne sous-vends pas la disponibilité.", "Ne laisse jamais une facture partir sans preuve de valeur."], deliverables: ["Un forfait mensuel", "Un contrat simple", "Un template de rapport mensuel"], checks: ["Le forfait est compréhensible", "Le client sait ce qu'il achète", "Tu sais tenir le rythme de livraison"] })),
  mod("ia-revenus-actifs", "kit-templates", "Kit complet de démarrage", "Templates de devis, relances, scripts de closing et contrat court.", "resource", 7, "## Ressources incluses\n- Modèle de devis\n- Script de relance devis\n- Script de closing simple\n- Contrat de prestation court\n\n### Vérification\n- Tu as téléchargé les documents\n- Tu as adapté les modèles à ton activité\n- Tu sais lequel utiliser selon le contexte"),
  mod("ia-revenus-actifs", "bilan-90-jours", "Bilan des 90 premiers jours", "Prendre du recul et décider quoi renforcer : acquisition, delivery, automatisation ou récurrence.", "coming_soon", 8),
  hero("chatbot-client-make-gpt", "Vidéo tutorielle d'introduction", "Vue d'ensemble : cas d'usage, architecture Make + GPT et logique commerciale."),
  mod("chatbot-client-make-gpt", "comprendre-chatbot", "Comprendre ce qu'un chatbot client peut vraiment faire", "Définir les cas d'usage rentables, les limites et les attentes réalistes d'un chatbot no-code.", "text", 1, body({ learn: "Tu vas apprendre à cadrer le rôle réel d'un chatbot client : filtrer, répondre, qualifier et escalader sans vendre une fausse promesse d'autonomie totale.", understand: "Le chatbot ne remplace pas une équipe. Il absorbe les demandes répétitives et accélère les premiers échanges. C'est ce cadre qui permet de le vendre proprement à une PME.", tools: ["Crisp ou un widget web", "Un document de FAQ", "Une boîte de contact ou un canal d'escalade"], method: ["Liste les questions les plus répétitives du client.", "Sépare ce qui peut être automatisé de ce qui doit rester humain.", "Définis une promesse simple : gain de temps, disponibilité, qualification.", "Prépare une logique d'escalade propre."], behavior: ["Ne promets jamais un support parfait.", "Reste concret sur les cas d'usage.", "Traite le chatbot comme un outil de service, pas comme un gadget."], deliverables: ["Une liste de cas d'usage", "Une limite claire du périmètre", "Une logique d'escalade"], checks: ["Le client comprend ce que le bot fait", "Tu sais ce que le bot ne fera pas", "Le gain de temps est explicite"] })),
  mod("chatbot-client-make-gpt", "architecture-make-gpt", "Architecture Make + GPT qui tient debout", "Comprendre comment Make orchestre les appels à GPT et les connecte aux canaux du client.", "text", 2, body({ learn: "Tu vas construire le schéma fonctionnel d'un chatbot fiable : entrée, contexte, appel modèle, réponse et escalade.", understand: "La qualité du bot dépend d'abord du contexte injecté et du parcours technique. Make ne sert pas seulement à connecter des blocs, il sert à garder la logique lisible et corrigeable.", tools: ["Make", "OpenAI API", "Base de connaissances ou FAQ client"], method: ["Décris le flux entrant et sortant.", "Prépare le prompt système avec règles et contexte.", "Ajoute une branche d'escalade humaine.", "Teste dix questions avant la mise en ligne."], behavior: ["Reste minimal sur la première version.", "Journalise les erreurs dès le début.", "Corrige les réponses à partir des cas réels, pas de suppositions."], deliverables: ["Un schéma du workflow", "Un prompt système initial", "Un scénario Make documenté"], checks: ["Le flux est clair", "Le prompt est défendable", "L'escalade est opérationnelle"] })),
  mod("chatbot-client-make-gpt", "deployer-chatbot", "Déployer le chatbot sur un site ou un canal", "Passer d'un prototype à un déploiement lisible pour le client.", "text", 3, body({ learn: "Tu vas apprendre à déployer proprement un chatbot sur site web, WhatsApp ou email en gardant un protocole de test simple.", understand: "Le déploiement n'est pas qu'une mise en ligne. C'est une phase de sécurisation du canal, des réponses et de l'escalade. Sans ça, tu livres quelque chose de fragile.", tools: ["Crisp ou Wati", "Make", "Une checklist de tests"], method: ["Choisis un canal principal.", "Installe le point d'entrée et connecte le scénario.", "Teste les cas simples, les cas limites et l'escalade.", "Remets une mini documentation au client."], behavior: ["Documente la livraison.", "Ne livre jamais sans tests.", "Reste joignable dans la première semaine."], deliverables: ["Un chatbot en ligne", "Une checklist de tests", "Une note d'usage client"], checks: ["Le bot répond", "Le bot escalade", "Le client sait l'utiliser"] })),
  mod("chatbot-client-make-gpt", "packager-vendre", "Packager et vendre le chatbot comme offre de service", "Tarification, pitch client et logique de maintenance mensuelle.", "text", 4, body({ learn: "Tu vas structurer une offre simple à vendre : mise en place, maintenance, support et amélioration continue.", understand: "Le client n'achète pas Make ni GPT. Il achète moins de friction, moins de temps perdu et une meilleure disponibilité. C'est ce résultat qu'il faut vendre.", tools: ["Un devis simple", "Un pitch de 30 secondes", "Une grille de prix claire"], method: ["Choisis un format forfaitaire lisible.", "Rédige le bénéfice principal en une phrase.", "Prévois une maintenance mensuelle légère.", "Prépare des réponses aux objections classiques."], behavior: ["Parle résultat, pas technologie.", "Reste simple dans le devis.", "Ne promets pas un chatbot universel."], deliverables: ["Une offre d'installation", "Une offre installation + maintenance", "Un script de pitch"], checks: ["L'offre est claire", "Le prix est défendable", "Le client comprend le gain de temps"] })),
  mod("chatbot-client-make-gpt", "extensions-avancees", "Extensions avancées et CRM", "Qualification de leads, prise de rendez-vous et intégration CRM.", "coming_soon", 5),
  hero("agent-ia-business", "Vidéo tutorielle d'introduction", "Vue d'ensemble : agent IA, workflows n8n et offre de service exploitable."),
  mod("agent-ia-business", "qu-est-ce-qu-un-agent", "Comprendre ce qu'est un agent IA", "Différence entre chatbot, workflow et agent autonome orienté objectif.", "text", 1, body({ learn: "Tu vas distinguer clairement un workflow, un chatbot et un agent autonome pour éviter les effets d'annonce creux.", understand: "Un agent utile n'est pas une démo spectaculaire. C'est un système qui reçoit un objectif, enchaîne des étapes, appelle des outils et te restitue un résultat contrôlable.", tools: ["n8n", "GPT-4o", "Un cas d'usage métier simple"], method: ["Choisis un objectif métier simple.", "Décompose l'objectif en sous-tâches.", "Identifie les outils appelés par l'agent.", "Définis une validation humaine aux bons endroits."], behavior: ["Reste précis sur le périmètre.", "Ne confonds pas autonomie et absence de supervision.", "Privilégie des cas d'usage répétitifs."], deliverables: ["Une définition claire du cas d'usage", "Une carte des étapes de l'agent", "Une politique de validation"], checks: ["Le cas d'usage est clair", "L'agent a un but unique", "Le risque est maîtrisé"] })),
  mod("agent-ia-business", "construire-agent-n8n", "Construire son premier agent avec n8n et GPT", "Créer un agent simple de veille ou de reporting sans se perdre dans la complexité.", "text", 2, body({ learn: "Tu vas construire un premier agent simple avec déclencheur, collecte, synthèse, sortie et journalisation.", understand: "Le premier agent doit être stable avant d'être intelligent. La robustesse du workflow compte plus que l'ambition du prompt.", tools: ["n8n", "Une source RSS ou une API", "Gmail ou Slack"], method: ["Commence par un agent de veille ou de reporting.", "Crée une séquence simple de bout en bout.", "Ajoute les erreurs et les logs.", "Teste plusieurs fois avant d'automatiser."], behavior: ["Ne multiplie pas les branches trop tôt.", "Observe le coût et le temps de traitement.", "Documente ce que fait chaque bloc."], deliverables: ["Un scénario n8n stable", "Un prompt système clair", "Une routine de supervision"], checks: ["Le scénario s'exécute", "Le résultat est utile", "Tu sais corriger un plantage"] })),
  mod("agent-ia-business", "agent-prospection", "Agent de prospection automatisée", "Trouver, scorer et préparer des messages sans perdre la main sur la qualité.", "text", 3, body({ learn: "Tu vas préparer un agent de prospection qui collecte, score et pré-rédige sans transformer ta prospection en spam.", understand: "L'automatisation ne remplace pas la validation commerciale. Elle accélère la préparation. C'est à toi de garder la qualité du ciblage et la cohérence du message.", tools: ["CSV ou Google Sheets", "n8n", "GPT-4o"], method: ["Choisis une niche et un critère de qualification.", "Prépare une source de prospects propre.", "Crée un scoring simple.", "Fais valider les messages avant envoi automatisé."], behavior: ["Ne sur-personnalise pas artificiellement.", "Garde un volume raisonnable.", "Teste manuellement avant de généraliser."], deliverables: ["Une grille de scoring", "Un flux de qualification", "Un template de message"], checks: ["Le scoring est cohérent", "Le message est naturel", "Le système ne spamme pas"] })),
  mod("agent-ia-business", "vendre-agent", "Vendre un agent IA à un client", "Pitch, tarification, documentation et maintenance d'un agent livré en prestation.", "text", 4, body({ learn: "Tu vas apprendre à vendre un agent comme gain de temps ou gain de qualité mesurable, pas comme une prouesse technique floue.", understand: "Le client paie pour un résultat : veille, reporting, tri, préparation, relance. Il ne paie pas pour le mot agent. Tu dois donc vendre une transformation observable.", tools: ["Un devis clair", "Un exemple de rapport", "Une grille de maintenance mensuelle"], method: ["Cadre le besoin par résultat attendu.", "Présente une démo ou un scénario simple.", "Facture la création séparément de la maintenance.", "Prévois une documentation courte et une phase de support."], behavior: ["Reste prudent sur la sécurité et les limites.", "Ne survends pas l'autonomie.", "Parle toujours en heures gagnées ou erreurs évitées."], deliverables: ["Un devis mission", "Un contrat de maintenance", "Une fiche de valeur client"], checks: ["L'offre est lisible", "Le prix est défendable", "La maintenance est prévue"] })),
  mod("agent-ia-business", "agents-avances", "Agents multi-étapes et mémoire longue", "Construire des agents plus autonomes avec mémoire, boucles et outils externes.", "coming_soon", 5),
  hero("facturation-compta-freelance", "Vidéo tutorielle d'introduction", "Vue d'ensemble : structure, facture, charges, outils et routine de gestion."),
  mod("facturation-compta-freelance", "creer-micro-entreprise", "Créer sa micro-entreprise en 30 minutes", "Démarches légales, choix du statut, code APE et ouverture du compte professionnel.", "text", 1, body({ learn: "Tu vas apprendre à lancer une micro-entreprise proprement, sans te noyer dans l'administratif ni reporter l'essentiel.", understand: "Le bon statut de départ est celui qui te permet de vendre vite, de comprendre tes charges et de garder une gestion simple. Pour la plupart des profils qui démarrent, la micro-entreprise reste la base logique.", tools: ["Site Urssaf", "Compte bancaire dédié", "Checklist de documents"], method: ["Crée ton activité sur le portail officiel.", "Choisis le code d'activité cohérent.", "Ouvre un compte bancaire dédié.", "Range les documents de base dès le départ."], behavior: ["Ne mélange pas perso et pro.", "Ne reporte pas l'administratif au premier client.", "Reste sur une structure simple au départ."], deliverables: ["Une structure créée", "Un compte bancaire dédié", "Un dossier administratif rangé"], checks: ["Tu connais ton statut", "Tu sais quand tu peux facturer", "Tu sais où sont tes documents"] })),
  mod("facturation-compta-freelance", "facturation-tva", "Facturation, TVA et cotisations", "Bien rédiger une facture, gérer la TVA et comprendre ce que tu gardes réellement.", "text", 2, body({ learn: "Tu vas apprendre à facturer correctement, à comprendre la TVA et à provisionner tes charges sans te faire surprendre.", understand: "Le chiffre d'affaires n'est pas ton revenu. Tant que tu ne sais pas ce que tu gardes après cotisations et fiscalité, tu pilotes ton activité à l'aveugle.", tools: ["Modèle de facture", "Tableur de charges", "Calendrier de déclaration"], method: ["Prépare une facture avec toutes les mentions utiles.", "Détermine si tu factures ou non la TVA.", "Calcule un taux de provision à appliquer à chaque encaissement.", "Planifie tes déclarations."], behavior: ["N'attends pas le trimestre pour découvrir les charges.", "Reste carré sur la numérotation des factures.", "Ne facture jamais sans périmètre clair."], deliverables: ["Un modèle de facture", "Une règle de provision", "Un calendrier administratif"], checks: ["Tu sais rédiger une facture", "Tu sais si tu appliques la TVA", "Tu connais ton taux de charges"] })),
  mod("facturation-compta-freelance", "outils-suivi", "Outils de suivi et déclarations", "Les outils simples pour gérer ses encaissements et ses obligations sans stress inutile.", "text", 3, body({ learn: "Tu vas choisir une stack légère de suivi comptable et administratif adaptée à ton niveau de chiffre d'affaires et à ton temps disponible.", understand: "Un bon système de gestion n'a pas besoin d'être complexe. Il doit surtout être régulier, compréhensible et rapide à tenir.", tools: ["Google Sheets ou Notion", "Facture.net, Indy ou équivalent", "Dossier cloud dédié"], method: ["Choisis un outil de facturation adapté à ton niveau.", "Crée un tableau de suivi des encaissements.", "Bloque un créneau mensuel de gestion.", "Archive systématiquement tes pièces."], behavior: ["Reste constant dans la routine.", "Évite de changer d'outil tous les mois.", "Garde un système que tu comprends."], deliverables: ["Une routine mensuelle", "Un tableau de suivi", "Un dossier d'archivage"], checks: ["Tu sais où suivre tes paiements", "Tu sais quoi déclarer", "Tu peux retrouver une pièce rapidement"] })),
  mod("facturation-compta-freelance", "protection-sociale", "Protection sociale et retraite du freelance", "Mutuelle, prévoyance, retraite et sécurité minimale pour éviter les angles morts.", "text", 4, body({ learn: "Tu vas poser un socle de protection minimal pour éviter qu'un problème de santé ou d'arrêt de travail détruise ta trésorerie.", understand: "Le freelance gère souvent bien la vente mais oublie sa protection. Sans mutuelle, sans prévoyance et sans vision retraite, la situation peut devenir fragile très vite.", tools: ["Comparateur mutuelle", "Tableau de charges fixes", "Plan d'épargne ou de sécurité"], method: ["Liste tes protections actuelles.", "Ajoute mutuelle et prévoyance minimales.", "Définis une épargne de sécurité.", "Revois ce socle chaque année."], behavior: ["Ne traite pas la protection comme un sujet secondaire.", "Reste réaliste sur tes charges fixes.", "Prépare avant d'en avoir besoin."], deliverables: ["Une checklist de protection", "Un budget fixe réaliste", "Une décision claire sur la prévoyance"], checks: ["Tu sais ce qui te couvre", "Tu connais tes angles morts", "Tu as un plan de sécurité minimum"] })),
  mod("facturation-compta-freelance", "optimisation-fiscale", "Optimisation fiscale légale pour freelance", "Les déductions légitimes, le versement libératoire et comment payer moins d'impôts légalement.", "coming_soon", 5),
  hero("offre-mensuelle-recurrente", "Vidéo tutorielle d'introduction", "Vue d'ensemble : forfait, contrat, livraison mensuelle et renouvellement."),
  mod("offre-mensuelle-recurrente", "pourquoi-recurrence", "Pourquoi la récurrence change tout", "Comprendre l'écart entre missions ponctuelles et contrats mensuels défendables.", "text", 1, body({ learn: "Tu vas comprendre pourquoi les revenus récurrents transforment la stabilité, la visibilité et la valeur de ton activité.", understand: "Le problème du one-shot n'est pas seulement la fatigue commerciale. C'est l'instabilité. La récurrence améliore la trésorerie, la prévisibilité et la qualité de relation client.", tools: ["Un tableur simple", "Exemples de forfaits", "Un calendrier de suivi client"], method: ["Compare ponctuel et récurrent sur six mois.", "Identifie les besoins continus chez tes clients.", "Repère les services qui se livrent par cycle.", "Choisis un format de forfait simple."], behavior: ["Ne cherche pas à tout mensualiser.", "Reste centré sur la valeur visible.", "Parle stabilité et disponibilité plutôt qu'abonnement."], deliverables: ["Une projection simple de revenus", "Une liste de services récurrents", "Un angle de forfait"], checks: ["Tu sais ce que tu peux mensualiser", "Tu comprends la logique du client", "Le forfait est réaliste"] })),
  mod("offre-mensuelle-recurrente", "formats-forfaits", "Les formats de forfait qui fonctionnent", "Quels services packager, comment les nommer et à quel prix les positionner.", "text", 2, body({ learn: "Tu vas structurer un forfait lisible avec inclusions, exclusions, rythme et prix pour qu'un dirigeant PME comprenne immédiatement la proposition.", understand: "Un bon forfait n'est pas complexe. Il doit résoudre un besoin continu, donner de la visibilité et rester simple à livrer chaque mois.", tools: ["Exemples de forfaits", "Une grille de périmètre", "Un modèle de devis"], method: ["Choisis un service continu.", "Définis 3 à 5 inclusions maximum.", "Fixe 2 à 3 exclusions nettes.", "Annonce un prix fixe avec une logique de livraison mensuelle."], behavior: ["Reste simple dans le nom du forfait.", "Évite les promesses floues.", "Ne laisse jamais le périmètre implicite."], deliverables: ["Une offre forfaitaire", "Une grille inclus/exclus", "Un prix défendable"], checks: ["Le forfait est compréhensible", "Le périmètre est stable", "Le prix correspond à la charge réelle"] })),
  mod("offre-mensuelle-recurrente", "pitcher-signer", "Pitcher et signer un contrat récurrent", "Quand proposer le forfait, quels arguments utiliser et comment le formaliser.", "text", 3, body({ learn: "Tu vas apprendre à proposer un forfait au bon moment, avec les bons arguments et un cadre contractuel simple.", understand: "La récurrence se vend plus facilement après une première preuve de sérieux. Le client a besoin de comprendre ce qu'il sécurise, pas seulement ce qu'il paie.", tools: ["Un script de pitch", "Un contrat court", "Un modèle de signature électronique"], method: ["Repère le bon moment après une ou deux interventions.", "Présente le forfait avec bénéfice et périmètre.", "Formalise le contrat avec prix, résiliation et exclusions.", "Fais signer rapidement tant que la valeur est fraîche."], behavior: ["Ne fais pas de remise pour compenser un pitch flou.", "Reste très clair sur la résiliation.", "Annonce les règles avant les exceptions."], deliverables: ["Un script de pitch", "Un contrat mensuel simple", "Un process de signature"], checks: ["Le pitch est fluide", "Le contrat est lisible", "Le client comprend comment arrêter ou continuer"] })),
  mod("offre-mensuelle-recurrente", "livrer-renouveler", "Livrer et renouveler sans effort", "Process de livraison mensuelle, rapport client et stratégie de rétention.", "text", 4, body({ learn: "Tu vas mettre en place une routine de livraison mensuelle qui évite les résiliations et rend la valeur visible.", understand: "Un forfait se perd quand le client ne voit plus ce que tu fais. Il se garde quand tu rends la valeur visible avec un rythme, un rapport et une relation humaine simple.", tools: ["Template de rapport mensuel", "Calendrier de points de suivi", "Checklist de renouvellement"], method: ["Prépare un rapport d'une page.", "Livre un signe visible de valeur chaque mois.", "Prévois une recommandation ou un conseil utile.", "Réévalue le prix au bon rythme."], behavior: ["Ne laisse pas un mois passer sans trace de travail.", "Reste proactif.", "Préviens avant d'ajuster un prix."], deliverables: ["Un rapport mensuel", "Une routine de suivi", "Un plan de renouvellement"], checks: ["Le client voit la valeur", "Le rythme est soutenable", "Le forfait peut durer"] })),
  mod("offre-mensuelle-recurrente", "scaler-recurrence", "Passer à 10 clients récurrents et déléguer", "Structurer l'activité pour gérer plus de récurrents sans se noyer.", "coming_soon", 5),
  hero("pack-it-freelance", "Vidéo tutorielle d'introduction", "Présentation du pack IT : démarrage freelance, maintenance PME et support GLPI."),
  mod("pack-it-freelance", "contenu-pack", "Ce que contient ce pack", "Les trois formations incluses, leur ordre logique et le bon usage du bundle.", "text", 1, "## Ce que tu trouves dans ce pack\n- Freelance IT 30 jours\n- Maintenance informatique PME\n- GLPI support PME\n\n### Logique du parcours\n1. Structurer l'offre et trouver les premiers clients\n2. Vendre une maintenance récurrente\n3. Structurer le support avec GLPI\n\n### Vérification\n- Tu sais par quelle formation commencer\n- Tu comprends comment les trois briques se complètent\n- Tu peux transformer le pack en parcours de montée en puissance"),
  hero("pack-finance-ia", "Vidéo tutorielle d'introduction", "Présentation du pack Finance IA : trading, portefeuille, crypto et services financiers."),
  mod("pack-finance-ia", "contenu-pack", "Ce que contient ce pack", "Les quatre formations incluses, leur ordre logique et le bon usage du bundle.", "text", 1, "## Ce que tu trouves dans ce pack\n- Trading IA débutant\n- Automatisation portefeuille IA\n- Crypto analyse fondamentale IA\n- Vendre services Finance IA\n\n### Logique du parcours\n1. Comprendre la lecture de marché assistée\n2. Mettre en place un suivi automatisé\n3. Construire une thèse d'investissement structurée\n4. Transformer cela en offre de service ou de veille\n\n### Vérification\n- Tu sais comment parcourir le bundle\n- Tu sais distinguer usage personnel et offre de service\n- Tu peux identifier la formation à ouvrir ensuite")
];
