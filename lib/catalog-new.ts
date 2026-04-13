import type { ProductModuleRecord, ProductRecord } from "@/lib/types";

const now = new Date("2026-04-13T10:00:00.000Z").toISOString();

// ─── Produits ─────────────────────────────────────────────────────────────────

export const newProducts: ProductRecord[] = [
  {
    id: "local-ia-revenus-actifs",
    slug: "ia-revenus-actifs",
    category: "flagship",
    title: "IA & Revenus Actifs — Le programme complet",
    subtitle: "De la compétence brute à une offre de service vendable en 30 jours",
    short_description:
      "Le programme flagship de TechCash Academy : choisir son angle (IT, IA ou Finance), créer une offre solide, trouver ses premiers clients et automatiser sa livraison.",
    long_description:
      "Ce programme est conçu pour les personnes qui veulent transformer une compétence existante en activité indépendante rentable. Tu y trouves le positionnement, la création d'offre, la prospection, la livraison automatisée et la gestion des premiers clients. Pas de théorie creuse — chaque module aboutit à un livrable ou une décision concrète.",
    price_cents: 9700,
    currency: "eur",
    stripe_price_id: "price_1TLmtYGSZgm5QCNLvP7DYjNV",
    thumbnail_url: "/visuals/formations/ia-revenus-actifs-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  // ── Nouvelles formations IA ────────────────────────────────────────────────
  {
    id: "local-chatbot-client-make-gpt",
    slug: "chatbot-client-make-gpt",
    category: "ia",
    title: "Créer un chatbot client avec Make et GPT",
    subtitle: "Un assistant automatisé opérationnel en moins d'une journée",
    short_description:
      "Apprendre à concevoir, déployer et vendre un chatbot client no-code avec Make et l'API GPT-4o. Zéro développement, résultat immédiat.",
    long_description:
      "Cette formation t'apprend à créer un chatbot fonctionnel sans coder : connexion à une base de connaissances, gestion des questions fréquentes, escalade vers un humain et déploiement sur un site ou un canal de messagerie. Chaque étape est documentée et packagée pour être revendue à des PME.",
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
      "Concevoir un agent IA qui travaille à ta place : prospection, qualification, rédaction, reporting. Pour les profils qui veulent gagner 10h par semaine.",
    long_description:
      "Cette formation avancée couvre la création d'agents IA avec des outils comme n8n, GPT-4o et des APIs tierces. Tu y apprends à déléguer des tâches complexes à un agent autonome : veille, rédaction, analyse, envoi d'emails et reporting. L'objectif est de réduire ton temps de travail manuel de 30 à 50 %.",
    price_cents: 7900,
    currency: "eur",
    stripe_price_id: "price_1TLmtYGSZgm5QCNLZFPC1SZT",
    thumbnail_url: "/visuals/formations/agent-ia-business-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  // ── Nouvelles formations Business ─────────────────────────────────────────
  {
    id: "local-facturation-compta-freelance",
    slug: "facturation-compta-freelance",
    category: "business",
    title: "Facturer et gérer sa compta freelance sans comptable",
    subtitle: "Les bases légales, fiscales et pratiques pour encaisser proprement",
    short_description:
      "Micro-entreprise, TVA, devis, facturation, cotisations et déclarations : tout ce qu'un freelance doit maîtriser pour rester dans les clous sans payer un comptable.",
    long_description:
      "Cette formation couvre l'intégralité de la gestion administrative et comptable d'un freelance en micro-entreprise : création, obligations déclaratives, outils de facturation, gestion de la TVA, cotisations URSSAF et protection sociale. Pratique, sans jargon et orienté action.",
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
      "Apprendre à packager, pitcher et signer des contrats mensuels avec des PME : maintenance, suivi, reporting ou accompagnement.",
    long_description:
      "Cette formation t'aide à sortir du modèle mission par mission en construisant une offre récurrente solide. Tu y trouves les bons formats de forfait, les arguments pour convaincre un dirigeant PME, la structure contractuelle et les outils pour livrer sans te noyer.",
    price_cents: 6900,
    currency: "eur",
    stripe_price_id: "price_1TLmtYGSZgm5QCNLqvc43USq",
    thumbnail_url: "/visuals/formations/offre-mensuelle-recurrente-cover.svg",
    is_active: true,
    is_featured: false,
    created_at: now,
    updated_at: now
  },
  // ── Bundles ───────────────────────────────────────────────────────────────
  {
    id: "local-pack-it-freelance",
    slug: "pack-it-freelance",
    category: "bundle",
    title: "Pack IT Freelance — 3 formations essentielles",
    subtitle: "Tout pour lancer, vendre et maintenir une activité IT indépendante",
    short_description:
      "3 formations regroupées : Freelance IT 30 jours + Maintenance PME + GLPI Support. Accès immédiat aux 3 programmes.",
    long_description:
      "Ce pack regroupe les 3 formations fondamentales pour un technicien IT qui veut se lancer en indépendant : structurer son offre, vendre de la maintenance récurrente et déployer GLPI comme outil de support professionnel. Valeur individuelle : 187 €. Pack : 149 €.",
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
    title: "Pack Finance IA — 4 formations complètes",
    subtitle: "De la lecture de marché à la vente de services financiers augmentés",
    short_description:
      "4 formations trading et finance : Trading IA + Portefeuille automatisé + Crypto IA + Vendre services Finance IA. Accès immédiat.",
    long_description:
      "Ce pack regroupe les 4 formations du catalogue Finance IA : comprendre et utiliser l'IA pour trader, automatiser son portefeuille, analyser les cryptos et vendre des services financiers récurrents. Valeur individuelle : 253 €. Pack : 197 €.",
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

// ─── Modules ──────────────────────────────────────────────────────────────────

function mod(
  productSlug: string,
  slug: string,
  title: string,
  description: string,
  content_type: ProductModuleRecord["content_type"],
  sort_order: number,
  content_body?: string
): ProductModuleRecord {
  const product = newProducts.find((p) => p.slug === productSlug);
  if (!product) throw new Error(`Produit introuvable : ${productSlug}`);
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
  mod(
    "ia-revenus-actifs",
    "choisir-son-angle",
    "Choisir son angle : IT, IA ou Finance",
    "Évaluer ses compétences actuelles et choisir le marché le plus accessible pour démarrer vite.",
    "text",
    1,
    "## Choisir son angle de départ\n\nTrois portes d'entrée, trois marchés différents. Tu n'as pas besoin de tout maîtriser — tu as besoin de choisir **une porte** et de la tenir 90 jours.\n\n### Porte 1 — IT Freelance\n\n**Pour qui** : profils support, techniciens, sysadmin, autodidactes tech.\n\n**Marché** : TPE/PME sans IT interne (7 sur 10 en France).\n\n**Offre minimale** : dépannage + maintenance préventive à 150–350 €/mois par client.\n\n**Délai pour le premier client** : 7 à 21 jours avec une prospection locale ciblée.\n\n---\n\n### Porte 2 — Services IA\n\n**Pour qui** : profils curieux de l'IA, marketeurs, assistants, freelances.\n\n**Marché** : entreprises qui veulent automatiser sans savoir comment.\n\n**Offre minimale** : audit + automatisation (n8n, Make, GPT) à 500–2 000 € la mission.\n\n**Délai pour le premier client** : 14 à 30 jours avec une offre bien cadrée.\n\n---\n\n### Porte 3 — Finance + IA\n\n**Pour qui** : profils intéressés par les marchés, l'investissement ou la data financière.\n\n**Marché** : particuliers et PME qui veulent un reporting clair ou une veille structurée.\n\n**Offre minimale** : rapport de veille mensuel ou suivi de portefeuille à 200–800 €/mois.\n\n**Délai pour le premier client** : 21 à 45 jours (positionnement plus technique).\n\n---\n\n### Comment choisir\n\nRéponds à ces 3 questions :\n\n1. Dans quel domaine tu peux intervenir **sans te former pendant 6 mois** ?\n2. Quel type de client tu peux contacter **cette semaine** ?\n3. Quel problème tu peux résoudre **en moins de 3 heures** ?\n\nLa réponse au croisement de ces 3 questions est ton angle de départ."
  ),
  mod(
    "ia-revenus-actifs",
    "creer-offre-48h",
    "Créer son offre de service en 48h",
    "Passer d'une compétence floue à une offre claire, tarifiée et prête à présenter.",
    "text",
    2,
    "## Créer son offre en 48h\n\nUne offre n'est pas une liste de compétences. C'est une promesse + un périmètre + un prix.\n\n### Le template en 5 lignes\n\n```\nJ'aide [TYPE DE CLIENT]\nà [RÉSOUDRE CE PROBLÈME PRÉCIS]\nen [DÉLAI OU FORMAT]\npour [PRIX FIXE OU FORFAIT]\nLivrable : [CE QUE TU REMETS CONCRÈTEMENT]\n```\n\n**Exemple IT :**\n> J'aide les artisans et commerces locaux à sécuriser et maintenir leurs postes de travail, en intervention mensuelle sur site, pour 180 €/mois. Livrable : rapport mensuel + support à distance inclus.\n\n**Exemple IA :**\n> J'aide les PME à automatiser leurs relances et rapports avec Make et GPT, en mission de 3 jours, pour 900 €. Livrable : workflow documenté + formation 1h.\n\n**Exemple Finance :**\n> J'aide les indépendants à suivre leur portefeuille crypto avec un rapport mensuel automatisé, pour 150 €/mois. Livrable : PDF + accès dashboard.\n\n---\n\n### Les erreurs classiques\n\n- **Trop vague** : \"je fais de l'informatique\" → personne ne sait quoi te demander\n- **Trop technique** : \"déploiement Kubernetes\" → le client PME ne comprend pas\n- **Trop large** : \"tout ce qui touche au digital\" → aucune crédibilité\n\n### Ce que tu fais en 48h\n\n**Jour 1** : remplir le template 3 fois avec 3 variantes différentes\n\n**Jour 2** : choisir la meilleure et la pitcher à 3 personnes de ton entourage\n\n> Si elles comprennent en 30 secondes → c'est bon. Si elles posent des questions → retravaille la clarté."
  ),
  mod(
    "ia-revenus-actifs",
    "trouver-premiers-clients",
    "Trouver ses 3 premiers clients",
    "Stratégie terrain pour les 30 premiers jours : réseau proche, prospection locale, LinkedIn.",
    "text",
    3,
    "## Trouver ses 3 premiers clients en 30 jours\n\nPas de publicité, pas de site web, pas de budget. Juste une méthode qui marche.\n\n### La règle des 3 cercles\n\n**Cercle 1 — Ton entourage direct (jours 1 à 7)**\n\nListe 20 personnes qui travaillent ou connaissent des entreprises. Envoie-leur ce message :\n\n> \"Je lance une activité [ton offre]. Est-ce que tu connais quelqu'un qui aurait besoin de ça ?\"\n\nObjectif : 2 recommandations. Pas de vente directe — juste du bouche-à-oreille.\n\n---\n\n**Cercle 2 — Prospection locale (jours 8 à 21)**\n\nIdentifie 30 commerces, artisans ou PME dans un rayon de 10 km. Passe les voir avec une carte de visite. Script de 20 secondes :\n\n> \"Bonjour, je suis [prénom], j'aide les [type de client] à [résoudre le problème]. Je passe laisser ma carte. Si vous avez besoin, appelez-moi directement.\"\n\nObjectif : 5 rendez-vous pris.\n\n---\n\n**Cercle 3 — LinkedIn ciblé (jours 15 à 30)**\n\nRecherche : [secteur cible] + [ville] + [taille entreprise].\n\nMessage de connexion :\n\n> \"Bonjour [Prénom], je travaille avec des [secteur] pour [bénéfice clé]. Je me permets de me connecter — bonne journée.\"\n\nPas de pitch dans le premier message. La connexion d'abord, le contexte ensuite.\n\n---\n\n### Objectif réaliste\n\n- Mois 1 : 1 à 3 clients, 500 à 1 500 €\n- Mois 2 : 3 à 6 clients, 1 500 à 3 500 €\n- Mois 3 : base récurrente posée\n\n> Le premier client est le plus dur. Le deuxième vient souvent du premier."
  ),
  mod(
    "ia-revenus-actifs",
    "automatiser-livraison",
    "Automatiser sa livraison avec n8n et l'IA",
    "Gagner du temps sur chaque mission en automatisant les tâches répétitives.",
    "text",
    4,
    "## Automatiser sa livraison\n\nPlus tu livres vite, plus tu peux prendre de clients. L'automatisation n'est pas un luxe — c'est ta marge.\n\n### Ce qui peut être automatisé\n\n**Rapports clients**\n- Collecte des données → GPT → mise en forme → envoi PDF automatique\n- Outil : n8n + Google Docs ou Notion\n\n**Relances et suivi**\n- Devis non signé après 5 jours → email de relance automatique\n- Outil : n8n + Gmail\n\n**Onboarding client**\n- Nouveau client signé → email de bienvenue + document de cadrage envoyé automatiquement\n- Outil : n8n + Typeform + Gmail\n\n**Facturation**\n- Mission terminée → facture générée + envoyée\n- Outil : Indy ou Pennylane\n\n---\n\n### Le workflow de base à créer en premier\n\n```\nDéclencheur : nouveau client dans ton CRM (Notion/Airtable)\n→ Envoyer email de bienvenue\n→ Créer dossier client sur Google Drive\n→ Programmer rappel de suivi à J+7\n```\n\nCe workflow seul économise 20 à 30 minutes par client.\n\n---\n\n### Outils recommandés\n\n- **n8n** (self-hosted ou cloud) : automatisation avancée, gratuit en self-hosted\n- **Make** : plus simple que n8n, 9 €/mois\n- **GPT-4o via API** : rédaction, synthèse, classification\n- **Notion** : base de données clients + templates\n\n> Une heure investie en automatisation = des dizaines d'heures économisées sur 6 mois."
  ),
  mod(
    "ia-revenus-actifs",
    "facturer-encaisser",
    "Facturer et encaisser proprement",
    "Structure légale, outils de facturation, paiement en ligne et gestion de la TVA.",
    "text",
    5,
    "## Facturer et encaisser proprement\n\n### Structure légale recommandée\n\n**Micro-entreprise** : idéale pour démarrer.\n- Création en 10 minutes sur `autoentrepreneur.urssaf.fr`\n- Pas de comptabilité complexe\n- Cotisations sur le CA réel (22 % services)\n- Plafond 2026 : 77 700 € HT/an\n\n**SASU** : si tu prévois > 50 000 €/an rapidement ou si tu veux te salarier.\n\n---\n\n### Outils de facturation\n\n| Outil | Prix | Idéal pour |\n|-------|------|------------|\n| Facture.net | Gratuit | Démarrage |\n| Indy | 9,99 €/mois | Micro-entrepreneur |\n| Pennylane | 25 €/mois | SASU/SARL |\n| Stripe Invoicing | 0,4 %/facture | Paiement en ligne |\n\n---\n\n### Paiement en ligne\n\nStripe est la solution la plus simple :\n- Lien de paiement en 2 minutes\n- Virement sous 2 jours ouvrés\n- Commissions : 1,5 % + 0,25 € par transaction européenne\n\nPour les missions > 500 € : propose un acompte de 30 % à la commande.\n\n---\n\n### TVA : les règles simples\n\n- En dessous de 37 500 €/an : **franchise de TVA** (mention obligatoire sur les factures : \"TVA non applicable — art. 293B du CGI\")\n- Au-dessus : collecter la TVA à 20 % et la reverser trimestriellement\n\n> Ne commence pas à facturer sans avoir ton numéro SIRET. L'administration est simple mais obligatoire."
  ),
  mod(
    "ia-revenus-actifs",
    "contrat-devis",
    "Créer un contrat simple et solide",
    "Les 6 clauses indispensables, le devis qui sécurise et la gestion des impayés.",
    "text",
    6,
    "## Contrat et devis\n\n### Le devis : ta première protection\n\nUn devis signé = un contrat. Il doit contenir :\n\n1. **Ton identité** : nom, SIRET, adresse\n2. **Identité du client** : raison sociale, adresse\n3. **Description précise de la prestation** : pas \"développement web\" mais \"création d'un site vitrine 5 pages sous WordPress avec formulaire de contact\"\n4. **Prix ferme** : HT ou TTC, clairement indiqué\n5. **Délais** : date de début, date de livraison estimée\n6. **Conditions de paiement** : acompte, solde, délai\n\n---\n\n### Les 6 clauses indispensables dans un contrat\n\n1. **Objet** : ce qui est inclus et ce qui ne l'est pas\n2. **Propriété intellectuelle** : qui possède quoi après livraison\n3. **Confidentialité** : données du client protégées\n4. **Résiliation** : conditions pour les deux parties\n5. **Responsabilité** : plafond en cas de problème\n6. **Loi applicable** : droit français, tribunal compétent\n\n---\n\n### Gérer les impayés\n\n- **Relance J+7** : email courtois\n- **Relance J+15** : email + appel\n- **Relance J+30** : mise en demeure par email avec accusé de réception\n- **J+45** : mise en demeure postale (lettre recommandée)\n- **J+60** : injonction de payer en ligne sur `service-public.fr` (gratuit, sans avocat)\n\n> 80 % des impayés se règlent avant la mise en demeure si tu relances vite et systématiquement."
  ),
  mod(
    "ia-revenus-actifs",
    "passer-recurrence",
    "Passer à la récurrence mensuelle",
    "Transformer des missions ponctuelles en contrats mensuels stables.",
    "text",
    7,
    "## Passer à la récurrence mensuelle\n\nUn client récurrent vaut 10 fois un client ponctuel. La récurrence, c'est la différence entre un chiffre d'affaires fragile et une activité stable.\n\n### Quand proposer un forfait récurrent\n\nPropose un forfait mensuel dès que :\n- tu es intervenu **2 fois** chez le même client\n- le client te contacte **régulièrement** pour des demandes similaires\n- tu vois qu'il a des **besoins continus** (maintenance, reporting, suivi)\n\n### Comment pitcher le forfait\n\n> \"On travaille ensemble depuis [X mois] et vous me contactez régulièrement. Je propose qu'on mette en place un forfait mensuel : ça vous garantit ma disponibilité prioritaire et vous connaissez votre budget à l'avance. Pour [X €/mois], j'inclus [liste claire].\"\n\n### Structure d'un forfait simple\n\n**Niveau Essentiel — 150–250 €/mois**\n- 1 intervention mensuelle (2h)\n- Support à distance illimité (réponse sous 4h)\n- Rapport mensuel d'une page\n\n**Niveau Pro — 350–600 €/mois**\n- 2 interventions mensuelles\n- Support prioritaire (réponse sous 1h)\n- Rapport détaillé + recommandations\n- 1 audit trimestriel inclus\n\n---\n\n### L'objectif à 6 mois\n\n- 3 clients récurrents à 200 €/mois = **600 €/mois garanti**\n- 5 clients récurrents à 300 €/mois = **1 500 €/mois garanti**\n\nAvec 5 récurrents, tu peux te concentrer sur l'acquisition de clients ponctuels à forte valeur sans dépendre de chaque nouvelle mission."
  ),
  mod(
    "ia-revenus-actifs",
    "gerer-5-clients",
    "Gérer 5 clients en solo sans se noyer",
    "Organisation, outils et routines pour rester productif avec plusieurs clients actifs.",
    "text",
    8,
    "## Gérer 5 clients en solo\n\n5 clients actifs, c'est gérable en solo — à condition d'avoir les bons systèmes.\n\n### Le système en 3 outils\n\n**1. CRM minimaliste (Notion ou Airtable)**\n\nUne ligne par client :\n- Nom, contact, type de contrat\n- Prochaine échéance\n- Statut (actif / en pause / à relancer)\n- Revenus mensuels générés\n\n**2. Agenda bloqué par blocs**\n\n- Lundi matin : admin, facturation, relances\n- Mardi–Jeudi : missions clients\n- Vendredi matin : prospection + suivi\n- Vendredi après-midi : bilan semaine\n\n**3. Template de rapport mensuel**\n\nUn template réutilisable pour chaque client :\n- Ce qui a été fait ce mois\n- Indicateurs clés\n- Ce qui est prévu le mois prochain\n- Recommandation ou alerte si nécessaire\n\n---\n\n### Les règles de survie\n\n- **Une seule boîte mail** : pas de compte personnel/pro mélangé\n- **Répondre aux clients en < 4h** pendant les heures de travail\n- **Ne jamais accepter une urgence non prévue au contrat** sans facturer un supplément\n- **Un jour sans client par semaine** pour la prospection et l'amélioration\n\n---\n\n### Quand déléguer\n\nDès que tu es plein à 80 % de ta capacité, commence à chercher un sous-traitant ou un partenaire pour les missions que tu maîtrises le moins."
  ),
  mod(
    "ia-revenus-actifs",
    "kit-complet",
    "Kit complet : templates, scripts et devis",
    "Tous les modèles prêts à l'emploi inclus dans la formation.",
    "resource",
    9,
    "## Kit complet de démarrage\n\n### Templates inclus\n\n**Devis type**\n```\nDEVIS N° [DATE-001]\nEmetteur : [Ton nom] — SIRET : [000 000 000 00000]\nClient : [Nom entreprise] — [Adresse]\n\nPrestation : [Description précise]\nDurée : [X jours / heures]\nPrix : [X] € HT\nAcompte : 30 % à la commande\nSolde : à la livraison\nValidité : 30 jours\n\nTVA non applicable — art. 293B du CGI\n```\n\n---\n\n**Email de relance devis (J+7)**\n```\nObjet : Suite à notre échange — Devis [N°]\n\nBonjour [Prénom],\n\nJe me permets de revenir vers vous concernant le devis envoyé le [date].\nAvez-vous eu l'occasion de l'examiner ?\n\nJe reste disponible pour toute question ou ajustement.\n\nCordialement,\n[Ton prénom]\n```\n\n---\n\n**Script de closing téléphonique**\n```\n\"Bonjour [Prénom], c'est [ton nom]. \nJe vous appelais pour le devis que je vous ai envoyé la semaine dernière. \nVous avez pu y jeter un oeil ?\"\n\n[Écouter]\n\n\"Est-ce que vous avez des questions sur le périmètre ou le prix ?\"\n\n[Si hésitation sur le prix]\n\"Je comprends. Si ça peut aider, on peut démarrer par [partie réduite] à [prix réduit] \net étendre ensuite selon les résultats.\"\n```\n\n---\n\n**Contrat de prestation (version courte)**\n```\nENTRE [Ton nom] (\"le Prestataire\") ET [Nom client] (\"le Client\")\n\nObjet : [Description de la mission]\nDurée : [Dates]\nRémunération : [Montant]\nPropriété intellectuelle : transférée au Client après paiement intégral\nConfidentialité : les deux parties s'engagent à la confidentialité\nRésiliation : possible sous 15 jours avec préavis écrit\nLoi applicable : droit français\n```"
  ),
  mod(
    "ia-revenus-actifs",
    "bilan-et-suite",
    "Bilan et prochaines étapes",
    "Évaluer ses progrès et planifier la croissance au-delà du premier mois.",
    "text",
    10,
    "## Bilan et prochaines étapes\n\n### Ce que tu dois avoir après ce programme\n\n- Une offre de service claire en une phrase\n- Un prix fixé et défendable\n- Un outil de facturation configuré\n- 3 prospects contactés minimum\n- 1 premier client ou 1 devis envoyé\n\n---\n\n### Les jalons des 90 premiers jours\n\n**Mois 1** : poser les bases\n- Offre, légal, prospection, 1er client\n\n**Mois 2** : stabiliser\n- 3 clients actifs, 1 récurrent, process de livraison rodé\n\n**Mois 3** : optimiser\n- Automatisations en place, témoignages collectés, offre affinée selon les retours terrain\n\n---\n\n### Les signaux qui indiquent que tu avances bien\n\n- Tu peux expliquer ton offre en 30 secondes\n- Tu as au moins 1 client qui a payé\n- Tu as refusé une demande qui ne correspondait pas à ton positionnement\n- Tu as fait au moins 1 relance et tu n'as pas eu peur\n\n---\n\n### Les prochaines formations recommandées\n\nSelon ton angle :\n\n- **IT** → Vendre et livrer une offre de maintenance informatique pour PME\n- **IA** → Automatiser les tâches répétitives avec n8n\n- **Finance** → Automatiser son portefeuille avec l'IA\n\n> Ce programme est un démarrage, pas une fin. La vraie formation, c'est le premier client."
  ),

  // ── Modules : chatbot-client-make-gpt ──────────────────────────────────────
  mod(
    "chatbot-client-make-gpt",
    "comprendre-chatbot",
    "Ce qu'est un chatbot client et ce qu'il peut faire",
    "Définir les cas d'usage réels, les limites et les attentes légitimes d'un chatbot no-code.",
    "text",
    1,
    "## Ce qu'est un chatbot client (et ce qu'il ne fait pas)\n\nUn chatbot client no-code est un assistant automatisé capable de :\n\n- Répondre aux questions fréquentes 24h/24\n- Qualifier un prospect avant de le passer à un humain\n- Prendre une réservation ou un rendez-vous\n- Envoyer des informations personnalisées selon la demande\n\nIl ne remplace pas un vrai humain pour des situations complexes ou sensibles. Son rôle : **filtrer et accélérer**, pas tout gérer.\n\n### Les cas d'usage les plus rentables\n\n- **FAQ automatisée** : horaires, tarifs, adresse, politique de retour\n- **Qualification de leads** : \"Quel est votre budget ?\" → tri automatique\n- **Prise de rendez-vous** : connexion à Calendly ou Google Calendar\n- **Support niveau 1** : résoudre les demandes simples avant escalade\n\n### Ce que le client PME attend vraiment\n\nPas un chatbot sophistiqué. Un assistant qui répond juste aux 10 questions qu'il reçoit 20 fois par semaine, disponible à 23h quand son site reçoit des visites.\n\n> Si tu peux réduire de 30 % le temps de support d'une PME, tu as une offre facturable à 500–1 200 €."
  ),
  mod(
    "chatbot-client-make-gpt",
    "architecture-make-gpt",
    "Architecture Make + GPT : le schéma qui fonctionne",
    "Comprendre comment Make orchestre les appels à GPT-4o et les connecte aux canaux du client.",
    "text",
    2,
    "## Architecture Make + GPT\n\n### Le schéma de base\n\n```\nMessage entrant (site / WhatsApp / email)\n  → Webhook Make\n  → Récupération contexte (FAQ / base de données)\n  → Appel API GPT-4o avec contexte injecté\n  → Réponse formatée renvoyée au canal\n  → Si non résolu → escalade humain (email / Slack)\n```\n\n### Les composants\n\n**Webhook Make** : point d'entrée. Reçoit le message, déclenche le scénario.\n\n**Module HTTP / OpenAI** : appel à GPT-4o. Le prompt système contient les informations du client (FAQ, politique, horaires).\n\n**Router Make** : aiguille selon le type de demande (question simple / qualification / escalade).\n\n**Module de réponse** : renvoie la réponse au bon canal (Crisp, Intercom, WhatsApp Business API, email).\n\n### La clé : le prompt système\n\nC'est ici que tu injectes le contexte du client :\n\n```\nTu es l'assistant de [Nom entreprise], [description activité].\nRéponds toujours en français, de manière concise et professionnelle.\nSi tu ne sais pas, dis-le et propose d'envoyer un email à [contact].\nInformations utiles : [FAQ, horaires, tarifs, politique...]\n```\n\n> Un bon prompt système = 80 % du travail. GPT fait le reste."
  ),
  mod(
    "chatbot-client-make-gpt",
    "deployer-chatbot",
    "Déployer le chatbot sur un site ou un canal",
    "Intégration sur un site web, WhatsApp Business ou email. Étapes concrètes.",
    "text",
    3,
    "## Déployer le chatbot\n\n### Option 1 — Widget sur site web (Crisp, recommandé)\n\n1. Créer un compte Crisp (gratuit jusqu'à 2 agents)\n2. Installer le widget sur le site du client (1 ligne de JavaScript)\n3. Connecter Make au webhook Crisp via l'API\n4. Tester avec 5 questions types\n\n**Coût total** : 0 € si < 2 agents + coût API OpenAI (~0,01 € par échange)\n\n---\n\n### Option 2 — WhatsApp Business API (via Wati ou 360dialog)\n\n1. Créer un compte WhatsApp Business vérifié\n2. Connecter via Wati (29 $/mois) ou 360dialog\n3. Webhook Make reçoit les messages WhatsApp\n4. GPT répond, Make renvoie via l'API WhatsApp\n\n**Coût total** : 29 $/mois + API OpenAI\n\n---\n\n### Option 3 — Email automatisé (Gmail / Outlook)\n\n1. Créer une adresse dédiée (support@client.fr)\n2. Make surveille la boîte via IMAP\n3. GPT génère une réponse contextualisée\n4. Make envoie la réponse et tague l'email original\n\n**Coût total** : ~0 € (hors API OpenAI)\n\n---\n\n### Checklist avant livraison\n\n- 10 questions testées et réponses vérifiées\n- Escalade humaine testée et fonctionnelle\n- Prompt système validé par le client\n- Documentation remise (2 pages max)"
  ),
  mod(
    "chatbot-client-make-gpt",
    "packager-vendre",
    "Packager et vendre le chatbot comme offre de service",
    "Tarification, pitch client et comment transformer ce chatbot en offre récurrente.",
    "text",
    4,
    "## Packager et vendre le chatbot\n\n### Les 3 formats de tarification\n\n**Forfait installation** : 400–800 €\n- Conception + déploiement + formation client\n- Livraison en 3 à 5 jours\n- Idéal pour démarrer et encaisser vite\n\n**Forfait installation + maintenance mensuelle** : 400 € + 79 €/mois\n- Maintenance, mises à jour du prompt, supervision\n- Revenu récurrent stable\n- Valeur long terme : 400 + 79 × 12 = **1 348 €/an** par client\n\n**Forfait premium clé en main** : 1 200–2 000 €\n- Audit des questions fréquentes, rédaction du prompt, déploiement multi-canal, formation équipe\n- Pour les PME avec volume de support élevé\n\n---\n\n### Le pitch en 30 secondes\n\n> \"Vous recevez combien de messages par semaine avec toujours les mêmes questions ? Je peux automatiser 70 % de vos réponses avec un assistant configuré sur votre site ou WhatsApp. Mise en place en 3 jours, 500 € et votre équipe gagne 5h par semaine.\"\n\n---\n\n### Les objections fréquentes\n\n**\"On a déjà une FAQ sur le site.\"**\n→ \"Une FAQ que personne ne lit. Le chatbot répond dans la conversation, au moment exact où la question se pose.\"\n\n**\"L'IA peut se tromper.\"**\n→ \"C'est pour ça que j'inclus une escalade automatique vers vous dès qu'elle ne sait pas. Pas de réponse fausse livrée seule.\""
  ),
  mod(
    "chatbot-client-make-gpt",
    "cas-usage-avances",
    "Cas d'usage avancés et extensions",
    "Qualification de leads, prise de rendez-vous automatique et intégration CRM.",
    "coming_soon",
    5
  ),

  // ── Modules : agent-ia-business ────────────────────────────────────────────
  mod(
    "agent-ia-business",
    "qu-est-ce-qu-un-agent",
    "Comprendre ce qu'est un agent IA (et ce qui le distingue d'un chatbot)",
    "Différence entre un chatbot, un workflow et un agent autonome. Cas d'usage réels.",
    "text",
    1,
    "## Agent IA vs Chatbot vs Workflow\n\n### Les 3 niveaux d'automatisation\n\n**Niveau 1 — Workflow** : séquence fixe et prédéfinie.\n- Déclencheur → Actions → Résultat\n- Pas de décision : si A alors B\n- Exemple : formulaire soumis → email envoyé\n\n**Niveau 2 — Chatbot** : réponses automatisées à des entrées texte.\n- Répond aux questions prédéfinies\n- Peut utiliser GPT pour reformuler\n- Pas d'autonomie sur les actions à entreprendre\n\n**Niveau 3 — Agent IA** : autonomie sur les décisions ET les actions.\n- Reçoit un objectif (\"trouve les 10 leads chauds de cette semaine\")\n- Décompose en sous-tâches\n- Exécute : recherche, synthèse, envoi, rapport\n- Adapte son comportement selon les résultats intermédiaires\n\n---\n\n### Ce qu'un agent peut faire pour ton business\n\n- **Veille automatique** : scraper, synthétiser, alerter\n- **Qualification de leads** : analyser un profil, scorer, rédiger un message personnalisé\n- **Rédaction** : articles, emails, rapports à partir de données brutes\n- **Reporting** : collecter des métriques, générer un PDF, envoyer à la bonne personne\n- **Support client** : répondre, escalader, documenter\n\n---\n\n### Ce qu'un agent ne peut pas faire\n\n- Prendre des décisions stratégiques à ta place\n- Gérer des situations ambiguës sans cadre clair\n- Fonctionner sans supervision (au moins au début)\n\n> Un bon agent est un exécutant autonome dans un périmètre défini — pas un directeur général numérique."
  ),
  mod(
    "agent-ia-business",
    "construire-agent-n8n",
    "Construire son premier agent avec n8n et GPT-4o",
    "Créer un agent de veille et de reporting en moins de 3 heures.",
    "text",
    2,
    "## Construire son premier agent avec n8n\n\n### L'agent de veille automatique\n\nCet agent surveille des sources d'information et t'envoie un résumé quotidien.\n\n**Architecture :**\n```\nDéclencheur : tous les jours à 7h\n→ HTTP : récupérer les derniers articles de tes sources RSS\n→ GPT-4o : synthétiser en 5 points clés\n→ Gmail : envoyer le digest\n→ Notion : archiver le résumé\n```\n\n**Temps de build** : 45 minutes\n**Coût** : 0,02–0,05 € par exécution\n\n---\n\n### Configuration du nœud GPT-4o\n\n```\nModèle : gpt-4o\nPrompt système : \"Tu es un assistant de veille. \nRésume les contenus suivants en 5 points actionnables.\nFocus : [domaine spécifique]. Langue : français.\"\nPrompt utilisateur : {{$json[\"articles\"]}}\nMax tokens : 800\n```\n\n---\n\n### Les erreurs à éviter\n\n- **Trop d'étapes en parallèle** : l'agent devient instable. Reste séquentiel au début.\n- **Pas de gestion d'erreur** : ajoute toujours un nœud \"Error Trigger\" pour être alerté si ça plante.\n- **Prompt trop vague** : plus le prompt est précis, meilleur est le résultat.\n\n---\n\n### Vers un agent plus autonome\n\nUne fois le premier agent stable, tu peux ajouter :\n- Un nœud de décision (\"si l'article est pertinent, envoyer une alerte immédiate\")\n- Une mémoire (stocker les résumés passés pour éviter les doublons)\n- Une interface de commande (déclencher l'agent par message Telegram)"
  ),
  mod(
    "agent-ia-business",
    "agent-prospection",
    "Agent de prospection automatisée",
    "Trouver, scorer et contacter des prospects sans intervention manuelle.",
    "text",
    3,
    "## Agent de prospection automatisée\n\n### Ce que fait l'agent\n\n1. **Collecte** : scrape LinkedIn ou une liste CSV de prospects\n2. **Analyse** : GPT évalue la pertinence selon tes critères\n3. **Score** : attribue un score 1–10 à chaque profil\n4. **Rédaction** : génère un message personnalisé pour les scores > 7\n5. **Envoi** : (optionnel) envoie le message ou l'enregistre pour validation\n\n---\n\n### L'architecture n8n\n\n```\nDéclencheur : nouveau fichier CSV dans Google Drive\n→ Split In Batches : traiter 10 prospects à la fois\n→ GPT : analyser profil + générer message\n→ Google Sheets : enregistrer résultats + messages\n→ Si score > 7 → Gmail : envoyer message ou notifier\n```\n\n---\n\n### Le prompt de scoring\n\n```\nAnalyse ce profil professionnel et évalue sa pertinence \npour une offre de [ton service] :\n\nProfil : {{$json[\"profil\"]}}\n\nRéponds en JSON :\n{\n  \"score\": [1-10],\n  \"raison\": \"[en 1 phrase]\",\n  \"message\": \"[message d'approche personnalisé de 3 lignes]\"\n}\n```\n\n---\n\n### Ce que tu dois valider avant d'automatiser l'envoi\n\n- Le message est-il personnalisé et naturel ?\n- Le taux de réponse manuel est-il > 10 % ?\n- As-tu testé sur 20 prospects manuellement ?\n\n> N'automatise jamais ce que tu n'as pas d'abord validé manuellement."
  ),
  mod(
    "agent-ia-business",
    "vendre-agent",
    "Vendre un agent IA à un client",
    "Comment pitcher, tarifer et livrer un agent IA comme prestation de service.",
    "text",
    4,
    "## Vendre un agent IA\n\n### Ce que tu vends concrètement\n\nPas un \"agent IA\" — un gain de temps mesurable.\n\nExemple : \"Cet agent automatise votre veille concurrentielle. Vous économisez 3h par semaine. Il tourne tous les matins et vous envoie un résumé avant 8h.\"\n\n---\n\n### Tarification\n\n**Mission de création** : 800–2 500 €\n- Audit des besoins\n- Build + tests + documentation\n- Formation (1h)\n\n**Maintenance mensuelle** : 100–300 €/mois\n- Supervision, corrections de bugs, évolutions mineures\n\n**Pack complet** : 1 500 € + 150 €/mois = **3 300 € sur 12 mois** par client\n\n---\n\n### Les clients les plus faciles à convaincre\n\n- **E-commerce** : reporting automatique, relances abandons panier\n- **Agences** : veille concurrentielle, rédaction de briefs\n- **Consultants** : préparation de rapports, synthèses de réunions\n- **Recruteurs** : tri de CVs, rédaction de fiches de poste\n\n---\n\n### Objection : \"Mes données sont-elles sécurisées ?\"\n\n→ \"L'agent tourne sur votre propre instance n8n ou en cloud privé. Les données ne quittent pas votre périmètre sauf pour l'appel API OpenAI, soumis à leur politique de confidentialité. Je peux utiliser un modèle local si c'est une contrainte.\""
  ),
  mod(
    "agent-ia-business",
    "agents-avances",
    "Agents multi-étapes et mémoire longue",
    "Construire des agents plus autonomes avec mémoire, boucles et outils externes.",
    "coming_soon",
    5
  ),

  // ── Modules : facturation-compta-freelance ─────────────────────────────────
  mod(
    "facturation-compta-freelance",
    "creer-micro-entreprise",
    "Créer sa micro-entreprise en 30 minutes",
    "Démarches légales, choix du statut, code APE et ouverture du compte professionnel.",
    "text",
    1,
    "## Créer sa micro-entreprise\n\n### Pourquoi la micro-entreprise en premier\n\n- Création gratuite et en ligne en 10 minutes\n- Pas de capital minimum\n- Comptabilité simplifiée (tableau de recettes)\n- Cotisations calculées sur le CA réel (0 CA = 0 cotisation)\n- Idéale jusqu'à 77 700 €/an de CA (services)\n\n### La démarche étape par étape\n\n1. Aller sur `autoentrepreneur.urssaf.fr`\n2. Créer un compte et remplir le formulaire (15 min)\n3. Choisir son activité principale :\n   - IT / Services numériques → **6209Z**\n   - Conseil / Formation → **7022Z**\n   - Commerce → selon produit\n4. Choisir le régime fiscal :\n   - **Versement libératoire** si tu es non imposable ou peu imposé\n   - **Impôt sur le revenu classique** sinon (plus flexible)\n5. Recevoir ton SIRET sous 1 à 4 semaines\n\n### Ce qu'il faut ouvrir ensuite\n\n- **Compte bancaire dédié** (obligatoire si CA > 10 000 €/an, recommandé dès le départ)\n  - Shine, Qonto, Revolut Business : 0–10 €/mois\n  - Évite de mélanger perso et pro — c'est la première erreur des débutants\n\n### Les documents à conserver\n\n- Toutes tes factures (clients ET fournisseurs) : 10 ans\n- Relevés bancaires professionnels : 10 ans\n- Justificatifs de dépenses déductibles : 3 ans\n\n> Tu reçois ton SIRET par email. Tu peux facturer dès réception."
  ),
  mod(
    "facturation-compta-freelance",
    "facturation-tva",
    "Facturation, TVA et cotisations",
    "Comment bien rédiger une facture, gérer la TVA et calculer ses cotisations URSSAF.",
    "text",
    2,
    "## Facturation, TVA et cotisations\n\n### Les mentions obligatoires sur une facture\n\n1. Numéro de facture (séquentiel, ex : 2026-001)\n2. Date d'émission\n3. Tes coordonnées complètes + SIRET\n4. Coordonnées du client\n5. Description précise de la prestation\n6. Quantité × Prix unitaire HT\n7. Total HT\n8. TVA (ou mention franchise)\n9. Total TTC\n10. Date d'échéance + conditions de paiement\n11. Pénalités de retard (taux légal)\n\n### La mention franchise de TVA\n\nSi ton CA annuel reste sous 37 500 € (services), tu n'appliques pas la TVA.\n\nMention obligatoire sur chaque facture :\n> *\"TVA non applicable — article 293B du CGI\"*\n\n### Cotisations URSSAF 2026\n\n| Activité | Taux cotisations |\n|----------|------------------|\n| Services (BIC) | 12,3 % |\n| Prestations de services (BNC) | 21,2 % |\n| Activités libérales | 23,2 % |\n| Commerce | 12,3 % |\n\n**Déclaration** : mensuelle ou trimestrielle selon ton choix à la création.\n\n**Exemple concret :**\n- CA du mois : 3 000 €\n- Cotisations (21,2 %) : 636 €\n- Ce que tu gardes : 2 364 € + TVA si applicable\n\n> Ne confonds pas le CA et ce que tu gardes. Provisionne 25–30 % de chaque encaissement pour les charges."
  ),
  mod(
    "facturation-compta-freelance",
    "outils-suivi",
    "Outils de suivi et déclarations",
    "Les meilleurs outils gratuits et payants pour gérer sa compta sans se noyer.",
    "text",
    3,
    "## Outils de suivi et déclarations\n\n### Pour les débutants : le minimum viable\n\n**Google Sheets ou Notion**\n- 1 tableau : date, client, montant HT, statut (payé/en attente)\n- Suffisant pour les premières années si < 20 factures/mois\n- Gratuit\n\n**Facture.net**\n- Génération de devis et factures conformes\n- Numérotation automatique\n- Gratuit jusqu'à usage raisonnable\n\n---\n\n### Pour les profils plus actifs\n\n**Indy (ex-Georges)**\n- Comptabilité automatisée\n- Connexion bancaire directe\n- Génère les déclarations URSSAF automatiquement\n- 9,99 €/mois — **le meilleur rapport qualité/prix pour les micro-entrepreneurs**\n\n**Pennylane**\n- Pour SASU/SARL ou si tu veux un expert-comptable intégré\n- 25–60 €/mois\n\n---\n\n### La routine mensuelle (15 minutes)\n\n1. Télécharger le relevé bancaire du mois\n2. Vérifier que toutes les factures sont marquées \"payées\"\n3. Calculer le CA du mois\n4. Déclarer sur le site URSSAF (ou laisser Indy le faire)\n5. Archiver les justificatifs dans un dossier daté\n\n> Une bonne gestion compta, c'est 15 minutes par mois si tu t'y tiens régulièrement. C'est 10h de stress si tu remets à plus tard."
  ),
  mod(
    "facturation-compta-freelance",
    "protection-sociale",
    "Protection sociale et retraite du freelance",
    "Mutuelle, prévoyance, retraite et arrêt maladie : ce que tu dois savoir.",
    "text",
    4,
    "## Protection sociale du freelance\n\n### Ce qui est couvert en micro-entreprise\n\nEn micro-entreprise, tu cotises à la Sécurité Sociale des Indépendants (SSI) :\n- **Maladie / maternité** : remboursements similaires au régime général\n- **Retraite de base** : oui, mais limitée si CA faible\n- **Retraite complémentaire** : oui, proportionnelle au CA\n- **Invalidité / décès** : couverture minimale\n\n**Non couvert** : chômage (il n'existe pas pour les indépendants en France sauf sous conditions ARCE)\n\n---\n\n### Ce que tu dois ajouter\n\n**Mutuelle santé** (obligatoire dans les faits)\n- Budget : 40–80 €/mois\n- Recommandé : Alan, Malakoff Humanis, Harmonie Mutuelle\n- Déductible du résultat imposable si en BNC\n\n**Prévoyance** (fortement recommandée)\n- Couvre l'incapacité de travail (maladie, accident)\n- Budget : 30–60 €/mois\n- Sans elle : 0 € d'indemnités si tu ne peux pas travailler 3 mois\n\n**Plan Épargne Retraite (PER)**\n- Avantage fiscal : les versements réduisent ton revenu imposable\n- À ouvrir dès la 1ère année\n\n---\n\n### Si tu passes en SASU\n\nTu bénéficies du régime général (salarié) si tu te verses un salaire.\n- Meilleure couverture maladie et retraite\n- Charges patronales + salariales : ~80 % du salaire net\n- Intéressant si CA > 60 000 €/an\n\n> Commence en micro-entreprise. Passe en SASU quand ton comptable te le conseille."
  ),
  mod(
    "facturation-compta-freelance",
    "optimisation-fiscale",
    "Optimisation fiscale légale pour freelance",
    "Les déductions légitimes, le versement libératoire et comment payer moins d'impôts légalement.",
    "coming_soon",
    5
  ),

  // ── Modules : offre-mensuelle-recurrente ────────────────────────────────────
  mod(
    "offre-mensuelle-recurrente",
    "pourquoi-recurrence",
    "Pourquoi la récurrence change tout",
    "Les chiffres qui montrent l'écart entre missions ponctuelles et contrats mensuels.",
    "text",
    1,
    "## Pourquoi la récurrence change tout\n\n### Le problème du modèle mission par mission\n\nAvec des missions ponctuelles :\n- Mois 1 : 2 clients → 2 400 €\n- Mois 2 : 0 nouveaux clients → 0 €\n- Mois 3 : 1 client → 1 200 €\n\nRésultat : montagne russe de trésorerie, stress constant, impossible de planifier.\n\n### Le modèle récurrent\n\nAvec des contrats mensuels :\n- 3 clients à 250 €/mois = **750 €/mois garanti**\n- 6 clients à 300 €/mois = **1 800 €/mois garanti**\n- 10 clients à 250 €/mois = **2 500 €/mois garanti**\n\nEt tu continues à prospecter **en plus** — chaque nouveau client est un gain net.\n\n### Ce que la récurrence apporte en dehors de l'argent\n\n- **Clarté** : tu sais ce que tu vas gagner le 1er du mois\n- **Fidélité** : un client récurrent te recommande plus facilement\n- **Productivité** : tu livres plus vite car tu connais bien le client\n- **Valorisation** : une activité avec CA récurrent se vend/transmet plus facilement\n\n> Un freelance avec 5 contrats récurrents à 300 €/mois dort mieux qu'un freelance avec 2 grosses missions ponctuelles par trimestre."
  ),
  mod(
    "offre-mensuelle-recurrente",
    "formats-forfaits",
    "Les formats de forfait qui fonctionnent",
    "Quels services packager, comment les nommer et à quel prix les positionner.",
    "text",
    2,
    "## Les formats de forfait qui fonctionnent\n\n### La règle du service continu\n\nUn forfait mensuel ne se vend que si le client a un **besoin continu**. Il faut donc identifier des services qui se renouvellent naturellement :\n\n- **IT** : maintenance préventive, support à distance, mises à jour\n- **Marketing** : gestion des réseaux sociaux, rédaction SEO\n- **Finance IA** : rapport de veille mensuel, suivi de portefeuille\n- **Automatisation** : maintenance des workflows, ajout de nouvelles automatisations\n- **Comptabilité / Admin** : saisie mensuelle, déclarations, reporting\n\n---\n\n### Structure d'un bon forfait\n\n**Nom** : simple, clair, pas de jargon\n- ❌ \"Pack de services numériques avancés\"\n- ✓ \"Maintenance mensuelle poste et réseau\"\n\n**Ce qui est inclus** : liste de 3 à 5 éléments maximum\n**Ce qui n'est pas inclus** : 2 à 3 exclusions claires\n**Engagement** : 1 mois renouvelable (éviter les engagements de 12 mois au départ)\n**Prix** : fixe, connu à l'avance, facturé le même jour chaque mois\n\n---\n\n### Exemple : Forfait Maintenance IT Essentiel\n\n**Inclus :**\n- 1 visite préventive mensuelle sur site (2h)\n- Support à distance illimité (lundi–vendredi, 9h–18h, réponse < 4h)\n- Rapport mensuel d'état des postes\n- Mises à jour de sécurité Windows\n\n**Non inclus :**\n- Remplacement de matériel\n- Migration de données ou changement d'infrastructure\n- Intervention urgente hors horaires (facturation complémentaire)\n\n**Prix : 220 €/mois HT — sans engagement**"
  ),
  mod(
    "offre-mensuelle-recurrente",
    "pitcher-signer",
    "Pitcher et signer un contrat récurrent",
    "Quand et comment proposer le forfait, les arguments qui convainquent et la structure du contrat.",
    "text",
    3,
    "## Pitcher et signer un contrat récurrent\n\n### Le bon moment pour proposer le forfait\n\n**Règle des 2 interventions** : propose un forfait dès que tu as fait 2 interventions chez le même client. Il te connaît, tu connais son infrastructure — c'est le meilleur moment.\n\n**Script de pitch :**\n> \"On travaille ensemble depuis quelques semaines et vous faites appel à moi régulièrement. Je vous propose de mettre en place un forfait mensuel : vous avez ma disponibilité prioritaire et un prix fixe chaque mois. Pour [X €/mois], j'inclus [liste courte]. Qu'est-ce que vous en pensez ?\"\n\n---\n\n### Les arguments qui convainquent un dirigeant PME\n\n1. **Prévisibilité budgétaire** : \"Vous savez exactement ce que ça coûte chaque mois.\"\n2. **Disponibilité prioritaire** : \"En cas de problème, vous passez avant les clients ponctuels.\"\n3. **Relation de confiance** : \"Je connais votre infrastructure, je résous plus vite.\"\n4. **Moins de surprises** : \"La maintenance préventive réduit les pannes urgentes coûteuses.\"\n\n---\n\n### La structure du contrat récurrent\n\n```\nOBJET : Prestation de services mensuels — [Description]\nDURÉE : Contrat à durée indéterminée, renouvelé tacitement chaque mois\nPRIX : [X] € HT/mois, facturé le 1er de chaque mois\nRÉSILIATION : par l'une ou l'autre partie avec 30 jours de préavis écrit\nINDEXATION : prix révisable une fois par an, avec préavis de 60 jours\nPÉRIMÈTRE : [liste inclus + exclus]\n```\n\n> Toujours envoyer le contrat en PDF signable. DocuSign ou Yousign (moins cher) permettent une signature électronique en 2 minutes."
  ),
  mod(
    "offre-mensuelle-recurrente",
    "livrer-renouveler",
    "Livrer et renouveler sans effort",
    "Process de livraison mensuelle, rapport client et stratégie de rétention.",
    "text",
    4,
    "## Livrer et renouveler sans effort\n\n### La routine mensuelle de livraison\n\nPour que le client ne remette jamais en question ton forfait, il doit recevoir **un signe visible de valeur chaque mois**.\n\n**Template de rapport mensuel (1 page)**\n\n```\nRAPPORT MENSUEL — [NOM CLIENT] — [MOIS/ANNÉE]\n\nCe qui a été fait ce mois\n- [Action 1 avec résultat]\n- [Action 2 avec résultat]\n- [Action 3 avec résultat]\n\nÉtat actuel\n- [Indicateur 1 : ex. 0 panne critique ce mois]\n- [Indicateur 2 : ex. Mises à jour Windows : 100 % des postes]\n\nCe qui est prévu le mois prochain\n- [Action planifiée 1]\n- [Action planifiée 2]\n\nRecommandation\n- [1 conseil ou alerte si nécessaire]\n```\n\n---\n\n### Comment éviter les résiliations\n\n**Ce qui fait partir un client** :\n- Il ne voit pas ce que tu fais\n- Il reçoit une facture mais pas de rapport\n- Il a eu un problème que tu n'as pas détecté avant lui\n- Quelqu'un d'autre lui propose moins cher\n\n**Ce qui le fait rester** :\n- Un rapport mensuel systématique\n- Une réactivité démontrable (temps de réponse tenu)\n- 1 recommandation proactive par mois\n- Une relation humaine (appel trimestriel de 15 min)\n\n---\n\n### Révision de prix\n\nRévise ton prix **une fois par an maximum**, avec 60 jours de préavis.\n\nScript : \"Suite à l'augmentation du coût de mes outils et à l'évolution de notre collaboration, je vais ajuster le forfait de [X] à [X+20] € à partir du [date]. Cela reste dans la fourchette du marché et ne change pas le périmètre inclus.\"\n\n> 80 % des clients acceptent une augmentation raisonnable si la relation est bonne et le préavis respecté."
  ),
  mod(
    "offre-mensuelle-recurrente",
    "scaler-recurrence",
    "Passer à 10 clients récurrents et déléguer",
    "Comment structurer son activité pour gérer plus de récurrents sans se noyer.",
    "coming_soon",
    5
  ),

  // ── Modules : bundles (informatifs seulement) ──────────────────────────────
  mod(
    "pack-it-freelance",
    "contenu-pack",
    "Ce que contient ce pack",
    "3 formations IT essentielles regroupées : Freelance IT, Maintenance PME, GLPI Support.",
    "text",
    1,
    "## Pack IT Freelance — Contenu détaillé\n\nCe pack regroupe 3 formations complémentaires pour lancer et structurer une activité IT indépendante.\n\n### Formation 1 — Devenir technicien informatique freelance en 30 jours\n\n7 modules — Positionnement, marché, prospection, tarification, outils\n\n### Formation 2 — Vendre et livrer une offre de maintenance informatique pour PME\n\n5 modules — Forfait récurrent, onboarding, reporting, fidélisation\n\n### Formation 3 — Déployer GLPI et structurer un support interne pour PME\n\n5 modules — Installation, tickets, SLA, base de connaissances, adoption\n\n---\n\n### Valeur individuelle\n\n- Freelance IT 30 jours : 59 €\n- Maintenance PME : 58 €\n- GLPI Support : 65 €\n- **Total individuel : 182 €**\n\n### Prix du pack : 149 € — économie de 33 €\n\n> Accès immédiat aux 3 formations dès l'achat."
  ),
  mod(
    "pack-finance-ia",
    "contenu-pack",
    "Ce que contient ce pack",
    "4 formations Finance IA regroupées : Trading, Portefeuille, Crypto, Vendre services.",
    "text",
    1,
    "## Pack Finance IA — Contenu détaillé\n\nCe pack regroupe les 4 formations du catalogue Finance IA pour un parcours complet.\n\n### Formation 1 — Comprendre l'IA pour trader\n\n7 modules — Routine de trading, lecture de marché assistée par IA, gestion du risque\n\n### Formation 2 — Automatiser son portefeuille avec l'IA\n\n7 modules — APIs financières, n8n, reporting automatisé, alertes\n\n### Formation 3 — Analyser les cryptos avec l'IA\n\n6 modules — Lecture de projets, thèse d'investissement, filtrage des signaux\n\n### Formation 4 — Vendre des services Finance IA\n\n6 modules — Offre de veille récurrente, pitch, acquisition, livraison\n\n---\n\n### Valeur individuelle\n\n- Comprendre l'IA pour trader : 59 €\n- Automatiser son portefeuille : 68 €\n- Analyser les cryptos : 54 €\n- Vendre services Finance IA : 72 €\n- **Total individuel : 253 €**\n\n### Prix du pack : 197 € — économie de 56 €\n\n> Accès immédiat aux 4 formations dès l'achat."
  )
];
