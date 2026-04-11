import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..", "..");
const envText = fs.readFileSync(path.join(root, ".env.local"), "utf8");
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((line) => !line.trim().startsWith("#"))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index), line.slice(index + 1)];
    })
);

const client = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

const slugs = [
  "freelance-it-30-jours",
  "landing-pages-rentables",
  "sites-web-clients",
  "outils-pme-glpi",
  "applications-mobiles-rentables",
  "glpi-support-pme",
  "maintenance-informatique-pme",
  "apps-metier-supabase",
  "cybersecurite-pme",
  "automatisation-n8n",
  "microsoft-365-pme"
];

function body() {
  return [
    "## Comment utiliser cette video",
    "",
    "Cette video explicative generee en IA te donne une vue rapide de la promesse, des modules et du resultat concret vise par la formation.",
    "",
    "### Ce qu'il faut retenir",
    "",
    "- la promesse commerciale de l'offre",
    "- les modules les plus structurants",
    "- le resultat concret que tu pourras vendre ou livrer ensuite",
    "",
    "### Conseil d'utilisation",
    "",
    "Commence par cette vue d'ensemble, puis enchaine sur les modules texte, PDF et ressources pour passer a l'application."
  ].join("\n");
}

for (const slug of slugs) {
  const { data: product, error: productError } = await client
    .from("products")
    .select("id, slug, title")
    .eq("slug", slug)
    .maybeSingle();

  if (productError || !product) {
    throw new Error(`Produit introuvable pour ${slug}`);
  }

  const { data: modules, error: modulesError } = await client
    .from("product_modules")
    .select("id, slug, content_type, sort_order")
    .eq("product_id", product.id)
    .order("sort_order");

  if (modulesError) {
    throw modulesError;
  }

  const firstVideo = (modules || []).find((module) => module.content_type === "video");
  const maxSortOrder = Math.max(0, ...(modules || []).map((module) => module.sort_order || 0));
  const payload = {
    title: `Video explicative IA : ${product.title}`,
    description:
      "Une video avec voix IA et visuels explicatifs pour comprendre rapidement la logique, la promesse et le resultat concret de cette formation.",
    content_type: "video",
    content_url: `/videos/formations/${slug}-overview.mp4`,
    content_body: body(),
    is_published: true,
    updated_at: new Date().toISOString()
  };

  if (firstVideo) {
    const { error } = await client.from("product_modules").update(payload).eq("id", firstVideo.id);
    if (error) throw error;
    console.log(`updated ${slug}`);
  } else {
    const { error } = await client.from("product_modules").insert({
      product_id: product.id,
      slug: "video-explicative-ia",
      sort_order: maxSortOrder + 1,
      created_at: new Date().toISOString(),
      ...payload
    });
    if (error) throw error;
    console.log(`inserted ${slug}`);
  }
}
