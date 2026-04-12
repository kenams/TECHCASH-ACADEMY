import { logError } from "@/lib/logger";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";
import type { ProductModuleRecord, ProductProgressSummary, ProductWithModules } from "@/lib/types";

type ProgressRow = {
  completed_at: string;
  module_slug: string;
  product_slug: string;
};

export function getTrackableModules(modules: ProductModuleRecord[]) {
  return modules.filter((module) => module.is_published && module.content_type !== "coming_soon");
}

export function buildProductProgressSummary(
  productSlug: string,
  modules: ProductModuleRecord[],
  rows: ProgressRow[]
): ProductProgressSummary {
  const trackableModules = getTrackableModules(modules);
  const trackableSlugs = new Set(trackableModules.map((module) => module.slug));
  const completedRows = rows.filter((row) => trackableSlugs.has(row.module_slug));
  const completedModuleSlugs = Array.from(new Set(completedRows.map((row) => row.module_slug)));
  const completedSlugSet = new Set(completedModuleSlugs);
  const nextModule = trackableModules.find((module) => !completedSlugSet.has(module.slug)) ?? null;
  const totalModules = trackableModules.length;
  const completedModules = completedModuleSlugs.length;
  const percent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const lastCompletedAt =
    completedRows
      .map((row) => row.completed_at)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? null;

  return {
    productSlug,
    completedModuleSlugs,
    completedModules,
    totalModules,
    percent,
    nextModuleSlug: nextModule?.slug ?? null,
    nextModuleTitle: nextModule?.title ?? null,
    lastCompletedAt
  };
}

export async function getUserModuleProgressRows(userId: string, productSlug?: string): Promise<ProgressRow[]> {
  try {
    const supabaseAdmin = getSupabaseAdminClient();
    let query = supabaseAdmin
      .from("user_module_progress")
      .select("product_slug, module_slug, completed_at")
      .eq("user_id", userId);

    if (productSlug) {
      query = query.eq("product_slug", productSlug);
    }

    const { data, error } = await query.order("completed_at", { ascending: false });

    if (error) {
      logError("Impossible de récupérer la progression utilisateur.", { userId, productSlug, error });
      return [];
    }

    return (data ?? []) as ProgressRow[];
  } catch (error) {
    logError("Erreur inattendue lors de la récupération de la progression.", { userId, productSlug, error });
    return [];
  }
}

export async function getUserModuleProgress(userId: string, product: ProductWithModules) {
  const rows = await getUserModuleProgressRows(userId, product.slug);
  return buildProductProgressSummary(product.slug, product.modules, rows);
}

export async function getUserModuleProgressByProducts(userId: string, products: ProductWithModules[]) {
  const rows = await getUserModuleProgressRows(userId);
  const rowsBySlug = rows.reduce<Record<string, ProgressRow[]>>((accumulator, row) => {
    accumulator[row.product_slug] ??= [];
    accumulator[row.product_slug].push(row);
    return accumulator;
  }, {});

  return products.reduce<Record<string, ProductProgressSummary>>((accumulator, product) => {
    accumulator[product.slug] = buildProductProgressSummary(
      product.slug,
      product.modules,
      rowsBySlug[product.slug] ?? []
    );
    return accumulator;
  }, {});
}
