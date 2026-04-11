import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const stdin = await new Promise((resolve) => {
  let data = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    data += chunk;
  });
  process.stdin.on("end", () => resolve(data.trim()));
  process.stdin.on("error", () => resolve(""));
});
const raw = process.argv[2] || stdin;

if (!raw) {
  throw new Error("Missing course payload");
}

const meta = JSON.parse(raw);
const root = process.cwd();
const env = Object.fromEntries(
  fs
    .readFileSync(path.join(root, ".env.local"), "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((line) => !line.trim().startsWith("#"))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i), line.slice(i + 1).replace(/^['"]|['"]$/g, "")];
    })
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const defaultsByKind = {
  offer: {
    posture: ["parler resultat avant technique", "rester simple", "fixer un cadre clair", "rassurer sans survendre"],
    deliverables: ["une promesse claire", "un perimetre compréhensible", "une offre lisible", "un prix defendable"],
    mistakes: ["vendre trop large", "parler en jargon", "cacher les limites", "surpromettre"],
    checklist: ["la promesse est claire", "la cible est claire", "le perimetre est borne", "le prix est defini"]
  },
  tools: {
    posture: ["installer peu mais bien", "documenter immediatement", "ranger les acces", "tester avant usage client"],
    deliverables: ["une stack operationnelle", "une documentation de base", "des acces ranges", "un flux testable"],
    mistakes: ["empiler les outils", "ne rien tester", "laisser les acces en vrac", "miser sur le gadget"],
    checklist: ["la stack fonctionne", "les acces sont ranges", "la documentation existe", "les tests de base sont faits"]
  },
  build: {
    posture: ["garder une V1 simple", "prioriser l'usage reel", "documenter les decisions", "tester tot"],
    deliverables: ["une methode de mise en oeuvre", "une V1 bornee", "une trace ecrite", "des points de controle"],
    mistakes: ["vouloir tout faire d'un coup", "partir sans flux clair", "oublier les tests", "melanger V1 et V2"],
    checklist: ["la V1 est definie", "les etapes sont claires", "les tests existent", "la progression est lisible"]
  },
  sales: {
    posture: ["poser plus de questions", "parler besoin avant outil", "assumer le prix", "garder une prochaine etape claire"],
    deliverables: ["un argumentaire simple", "une trame de qualification", "un devis ou cadrage", "une suite commerciale claire"],
    mistakes: ["faire un discours trop long", "chiffrer un brouillard", "parler technique trop tot", "laisser un prospect sans suite"],
    checklist: ["le discours est simple", "les questions sont pretes", "le devis est lisible", "la prochaine etape est definie"]
  },
  delivery: {
    posture: ["laisser une trace claire", "rendre le travail visible", "garder un ton calme", "parler comme un prestataire fiable"],
    deliverables: ["une livraison propre", "un suivi clair", "une preuve de travail", "un cadre d'usage ou de reprise"],
    mistakes: ["livrer sans preuve", "oublier la passation", "envoyer trop de technique brute", "laisser des zones grises"],
    checklist: ["la livraison est documentee", "le client comprend la suite", "le travail est visible", "la reprise est possible"]
  },
  growth: {
    posture: ["faire evoluer par la preuve", "rester utile", "capitaliser les retours terrain", "installer une routine"],
    deliverables: ["une logique de suivi", "une feuille de route courte", "des pistes d'evolution", "une base de recurrence"],
    mistakes: ["forcer l'upsell", "ouvrir trop de sujets a la fois", "ne pas capitaliser", "vendre sans contexte"],
    checklist: ["les pistes sont coherentes", "la suite est cadree", "les retours sont notes", "une recurrence est possible"]
  }
};

function bullets(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function numbers(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function textModule(kind, mod) {
  const defaults = defaultsByKind[kind];
  return {
    slug: mod.slug,
    title: mod.title,
    description: mod.description,
    content_type: "text",
    is_published: true,
    content_body: [
      `## ${mod.title}`,
      "",
      mod.overview,
      "",
      "### Ce que tu dois comprendre avant d'agir",
      "",
      mod.beginnerNote,
      "",
      "### Outils a preparer",
      "",
      bullets(mod.tools),
      "",
      "### Methode pas a pas",
      "",
      numbers(mod.steps),
      "",
      "### Comportement professionnel attendu",
      "",
      bullets(defaults.posture),
      "",
      "### Livrables ou preuves a produire",
      "",
      bullets(defaults.deliverables),
      "",
      "### Erreurs a eviter",
      "",
      bullets(defaults.mistakes),
      "",
      "### Verification de fin de module",
      "",
      bullets(defaults.checklist),
      ...(mod.note ? ["", `> ${mod.note}`] : [])
    ].join("\n")
  };
}

function resourceModule(mod) {
  return {
    slug: mod.slug,
    title: mod.title,
    description: mod.description,
    content_type: "resource",
    is_published: true,
    content_body: [
      `## ${mod.title}`,
      "",
      mod.overview,
      "",
      "### Ce que contient ce pack",
      "",
      bullets(mod.included),
      "",
      "### Comment l'utiliser correctement",
      "",
      numbers(mod.usage),
      "",
      "### Comment l'adapter a ton contexte",
      "",
      bullets(mod.adaptation),
      "",
      "### Verification avant usage client",
      "",
      bullets(["les documents sont personnalises", "le perimetre est a jour", "les points sensibles sont clarifies", "le support est pret a etre utilise"])
    ].join("\n")
  };
}

function videoModule(course) {
  return {
    slug: "video-tutorielle-ia",
    title: `Video tutorielle IA : ${course.title}`,
    description: `Une video guidee avec voix IA pour comprendre rapidement la logique de ${course.title.toLowerCase()} et savoir par quoi commencer.`,
    content_type: "video",
    is_published: true,
    content_url: `/videos/formations/${course.slug}-overview.mp4`,
    content_body: [
      "## Comment utiliser la video tutorielle",
      "",
      course.videoOverview,
      "",
      "### Ce que tu dois observer pendant la video",
      "",
      bullets(course.videoTakeaways),
      "",
      "### Comment la regarder intelligemment",
      "",
      numbers(course.videoWatchFlow),
      "",
      "### Travail a faire juste apres",
      "",
      bullets(course.videoAfterWatch),
      "",
      "> La video sert d'accelerateur. Les modules ecrits servent de guide de production et de vente."
    ].join("\n")
  };
}

const { data: product, error: productError } = await supabase
  .from("products")
  .select("id")
  .eq("slug", meta.slug)
  .maybeSingle();

if (productError || !product) {
  throw new Error(`Produit introuvable: ${meta.slug}`);
}

const payload = [
  textModule("offer", meta.offer),
  textModule("tools", meta.tools),
  textModule("build", meta.build),
  textModule("sales", meta.sales),
  textModule("delivery", meta.delivery),
  textModule("growth", meta.growth),
  resourceModule(meta.resources),
  videoModule(meta)
].map((module, index) => ({
  product_id: product.id,
  slug: module.slug,
  title: module.title,
  description: module.description,
  content_type: module.content_type,
  content_url: module.content_url ?? null,
  content_body: module.content_body ?? null,
  is_published: true,
  sort_order: index + 1
}));

const { error: upsertError } = await supabase.from("product_modules").upsert(payload, {
  onConflict: "product_id,slug"
});

if (upsertError) {
  throw upsertError;
}

const keepSlugs = payload.map((item) => item.slug);
const { error: cleanupError } = await supabase
  .from("product_modules")
  .delete()
  .eq("product_id", product.id)
  .not("slug", "in", `(${keepSlugs.map((slug) => `"${slug}"`).join(",")})`);

if (cleanupError) {
  throw cleanupError;
}

console.log(JSON.stringify({ slug: meta.slug, modules: payload.length }, null, 2));
