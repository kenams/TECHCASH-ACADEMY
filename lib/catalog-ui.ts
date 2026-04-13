import { getLocalProductBySlug, getLocalModulesByProductId } from "@/lib/catalog";
import type { ProductCardData } from "@/lib/types";

export type CatalogTheme =
  | "all"
  | "it-freelance"
  | "web-dev"
  | "support-infra"
  | "finance-trading";

const themeBySlug: Record<string, Exclude<CatalogTheme, "all">> = {
  "freelance-it-30-jours": "it-freelance",
  "maintenance-informatique-pme": "it-freelance",
  "ia-revenus-actifs": "it-freelance",
  "facturation-compta-freelance": "it-freelance",
  "offre-mensuelle-recurrente": "it-freelance",
  "pack-it-freelance": "it-freelance",
  "landing-pages-rentables": "web-dev",
  "sites-web-clients": "web-dev",
  "applications-mobiles-rentables": "web-dev",
  "apps-metier-supabase": "web-dev",
  "automatisation-n8n": "web-dev",
  "chatbot-client-make-gpt": "web-dev",
  "agent-ia-business": "web-dev",
  "outils-pme-glpi": "support-infra",
  "glpi-support-pme": "support-infra",
  "microsoft-365-pme": "support-infra",
  "cybersecurite-pme": "support-infra",
  "trading-ia-debutant": "finance-trading",
  "automatisation-portefeuille-ia": "finance-trading",
  "crypto-analyse-fondamentale-ia": "finance-trading",
  "vendre-services-finance-ia": "finance-trading",
  "pack-finance-ia": "finance-trading"
};

const estimatedVideoMinutesBySlug: Record<string, number> = {
  "freelance-it-30-jours": 36,
  "ia-revenus-actifs": 52,
  "landing-pages-rentables": 28,
  "sites-web-clients": 30,
  "outils-pme-glpi": 30,
  "applications-mobiles-rentables": 28,
  "glpi-support-pme": 32,
  "maintenance-informatique-pme": 34,
  "apps-metier-supabase": 34,
  "microsoft-365-pme": 34,
  "cybersecurite-pme": 36,
  "automatisation-n8n": 35,
  "chatbot-client-make-gpt": 26,
  "agent-ia-business": 29,
  "facturation-compta-freelance": 24,
  "offre-mensuelle-recurrente": 27,
  "pack-it-freelance": 18,
  "trading-ia-debutant": 32,
  "automatisation-portefeuille-ia": 35,
  "crypto-analyse-fondamentale-ia": 33,
  "vendre-services-finance-ia": 34,
  "pack-finance-ia": 22
};

export function getCatalogThemeForProduct(product: Pick<ProductCardData, "slug">): Exclude<CatalogTheme, "all"> {
  return themeBySlug[product.slug] ?? "it-freelance";
}

export function getCatalogModuleCount(product: Pick<ProductCardData, "slug">) {
  const localProduct = getLocalProductBySlug(product.slug);

  if (!localProduct) {
    return 0;
  }

  return getLocalModulesByProductId(localProduct.id).filter(
    (module) => module.is_published && module.content_type !== "coming_soon"
  ).length;
}

export function getEstimatedVideoMinutes(product: Pick<ProductCardData, "slug">) {
  return estimatedVideoMinutesBySlug[product.slug] ?? 24;
}

export function getOfferPositioning(product: Pick<ProductCardData, "is_featured">) {
  return product.is_featured ? "Offre principale" : "Offre spécialisée";
}
