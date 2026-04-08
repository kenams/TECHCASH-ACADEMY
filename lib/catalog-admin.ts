import { revalidatePath } from "next/cache";
import { localProductModules, localProducts } from "@/lib/catalog";
import { logError } from "@/lib/logger";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";
import type { ProductModuleRecord, ProductRecord } from "@/lib/types";

type ProductInput = {
  slug: string;
  title: string;
  subtitle: string;
  short_description: string;
  long_description: string;
  price_cents: number;
  currency: string;
  stripe_price_id: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  is_featured: boolean;
};

type ModuleInput = {
  product_id: string;
  slug: string;
  title: string;
  description: string;
  content_type: ProductModuleRecord["content_type"];
  content_url: string | null;
  content_body: string | null;
  is_published: boolean;
  sort_order: number;
};

type CatalogSnapshot = {
  source: "database" | "fallback";
  schemaReady: boolean;
  products: Array<ProductRecord & { modules: ProductModuleRecord[] }>;
};

function cleanOptional(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function cleanRequired(value: string | undefined) {
  return value?.trim() || "";
}

function cleanSlug(value: string | undefined) {
  return cleanRequired(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isSchemaMissing(error: { code?: string } | null | undefined) {
  return error?.code === "PGRST205";
}

function revalidateCatalogPaths() {
  revalidatePath("/");
  revalidatePath("/formations");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/mes-formations");
}

function buildFallbackSnapshot(): CatalogSnapshot {
  const products = localProducts.map((product) => ({
    ...product,
    modules: localProductModules
      .filter((module) => module.product_id === product.id)
      .sort((a, b) => a.sort_order - b.sort_order)
  }));

  return {
    source: "fallback",
    schemaReady: false,
    products
  };
}

export async function getCatalogSnapshot(): Promise<CatalogSnapshot> {
  const supabase = getSupabaseAdminClient();
  const [productsResult, modulesResult] = await Promise.all([
    supabase
      .from("products")
      .select(
        "id, slug, title, subtitle, short_description, long_description, price_cents, currency, stripe_price_id, thumbnail_url, is_active, is_featured, created_at, updated_at"
      )
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: true }),
    supabase
      .from("product_modules")
      .select(
        "id, product_id, slug, title, description, content_type, content_url, content_body, is_published, sort_order, created_at, updated_at"
      )
      .order("sort_order", { ascending: true })
  ]);

  if (productsResult.error || modulesResult.error) {
    const error = productsResult.error || modulesResult.error;
    logError("Impossible de recuperer le catalogue admin.", { error });

    if (isSchemaMissing(error)) {
      return buildFallbackSnapshot();
    }

    throw new Error("Impossible de recuperer le catalogue.");
  }

  const products = (productsResult.data || []) as ProductRecord[];
  const modules = (modulesResult.data || []) as ProductModuleRecord[];

  return {
    source: "database",
    schemaReady: true,
    products: products.map((product) => ({
      ...product,
      modules: modules
        .filter((module) => module.product_id === product.id)
        .sort((a, b) => a.sort_order - b.sort_order)
    }))
  };
}

export async function createProduct(input: ProductInput) {
  const supabase = getSupabaseAdminClient();
  const payload = {
    slug: cleanSlug(input.slug),
    title: cleanRequired(input.title),
    subtitle: cleanRequired(input.subtitle),
    short_description: cleanRequired(input.short_description),
    long_description: cleanRequired(input.long_description),
    price_cents: input.price_cents,
    currency: cleanRequired(input.currency).toLowerCase() || "eur",
    stripe_price_id: cleanOptional(input.stripe_price_id),
    thumbnail_url: cleanOptional(input.thumbnail_url),
    is_active: input.is_active,
    is_featured: input.is_featured
  };

  const { data, error } = await supabase
    .from("products")
    .insert(payload)
    .select(
      "id, slug, title, subtitle, short_description, long_description, price_cents, currency, stripe_price_id, thumbnail_url, is_active, is_featured, created_at, updated_at"
    )
    .single();

  if (error) {
    if (isSchemaMissing(error)) {
      throw new Error("Le schema Supabase products/product_modules n'est pas encore applique.");
    }

    throw new Error(error.message);
  }

  revalidateCatalogPaths();
  return data as ProductRecord;
}

export async function updateProduct(productId: string, input: Partial<ProductInput>) {
  const supabase = getSupabaseAdminClient();
  const payload = {
    ...(input.slug !== undefined ? { slug: cleanSlug(input.slug) } : {}),
    ...(input.title !== undefined ? { title: cleanRequired(input.title) } : {}),
    ...(input.subtitle !== undefined ? { subtitle: cleanRequired(input.subtitle) } : {}),
    ...(input.short_description !== undefined
      ? { short_description: cleanRequired(input.short_description) }
      : {}),
    ...(input.long_description !== undefined
      ? { long_description: cleanRequired(input.long_description) }
      : {}),
    ...(input.price_cents !== undefined ? { price_cents: input.price_cents } : {}),
    ...(input.currency !== undefined ? { currency: cleanRequired(input.currency).toLowerCase() } : {}),
    ...(input.stripe_price_id !== undefined ? { stripe_price_id: cleanOptional(input.stripe_price_id) } : {}),
    ...(input.thumbnail_url !== undefined ? { thumbnail_url: cleanOptional(input.thumbnail_url) } : {}),
    ...(input.is_active !== undefined ? { is_active: input.is_active } : {}),
    ...(input.is_featured !== undefined ? { is_featured: input.is_featured } : {})
  };

  const { error } = await supabase.from("products").update(payload).eq("id", productId);

  if (error) {
    if (isSchemaMissing(error)) {
      throw new Error("Le schema Supabase products/product_modules n'est pas encore applique.");
    }

    throw new Error(error.message);
  }

  revalidateCatalogPaths();
}

export async function deleteProduct(productId: string) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", productId);

  if (error) {
    if (isSchemaMissing(error)) {
      throw new Error("Le schema Supabase products/product_modules n'est pas encore applique.");
    }

    throw new Error(error.message);
  }

  revalidateCatalogPaths();
}

export async function createModule(input: ModuleInput) {
  const supabase = getSupabaseAdminClient();
  const payload = {
    product_id: input.product_id,
    slug: cleanSlug(input.slug),
    title: cleanRequired(input.title),
    description: cleanRequired(input.description),
    content_type: input.content_type,
    content_url: cleanOptional(input.content_url),
    content_body: cleanOptional(input.content_body),
    is_published: input.is_published,
    sort_order: input.sort_order
  };

  const { data, error } = await supabase
    .from("product_modules")
    .insert(payload)
    .select(
      "id, product_id, slug, title, description, content_type, content_url, content_body, is_published, sort_order, created_at, updated_at"
    )
    .single();

  if (error) {
    if (isSchemaMissing(error)) {
      throw new Error("Le schema Supabase products/product_modules n'est pas encore applique.");
    }

    throw new Error(error.message);
  }

  revalidateCatalogPaths();
  return data as ProductModuleRecord;
}

export async function updateModule(moduleId: string, input: Partial<ModuleInput>) {
  const supabase = getSupabaseAdminClient();
  const payload = {
    ...(input.product_id !== undefined ? { product_id: input.product_id } : {}),
    ...(input.slug !== undefined ? { slug: cleanSlug(input.slug) } : {}),
    ...(input.title !== undefined ? { title: cleanRequired(input.title) } : {}),
    ...(input.description !== undefined ? { description: cleanRequired(input.description) } : {}),
    ...(input.content_type !== undefined ? { content_type: input.content_type } : {}),
    ...(input.content_url !== undefined ? { content_url: cleanOptional(input.content_url) } : {}),
    ...(input.content_body !== undefined ? { content_body: cleanOptional(input.content_body) } : {}),
    ...(input.is_published !== undefined ? { is_published: input.is_published } : {}),
    ...(input.sort_order !== undefined ? { sort_order: input.sort_order } : {})
  };

  const { error } = await supabase.from("product_modules").update(payload).eq("id", moduleId);

  if (error) {
    if (isSchemaMissing(error)) {
      throw new Error("Le schema Supabase products/product_modules n'est pas encore applique.");
    }

    throw new Error(error.message);
  }

  revalidateCatalogPaths();
}

export async function deleteModule(moduleId: string) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("product_modules").delete().eq("id", moduleId);

  if (error) {
    if (isSchemaMissing(error)) {
      throw new Error("Le schema Supabase products/product_modules n'est pas encore applique.");
    }

    throw new Error(error.message);
  }

  revalidateCatalogPaths();
}
