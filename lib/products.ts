import { cache } from "react";
import { logError } from "@/lib/logger";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";
import type {
  OwnedProductSummary,
  ProductCardData,
  ProductModuleRecord,
  ProductRecord,
  ProductWithModules,
  PurchaseRecord
} from "@/lib/types";

export function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency.toUpperCase()
  }).format(cents / 100);
}

export const getActiveProducts = cache(async (): Promise<ProductCardData[]> => {
  const supabaseAdmin = getSupabaseAdminClient();
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      "id, slug, title, subtitle, short_description, price_cents, currency, thumbnail_url, is_featured, is_active"
    )
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) {
    logError("Impossible de recuperer les produits actifs.", { error });
    return [];
  }

  return (data || []) as ProductCardData[];
});

export const getFeaturedProduct = cache(async (): Promise<ProductCardData | null> => {
  const products = await getActiveProducts();
  return products.find((product) => product.is_featured) || products[0] || null;
});

export const getProductBySlug = cache(async (slug: string): Promise<ProductRecord | null> => {
  const supabaseAdmin = getSupabaseAdminClient();
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      "id, slug, title, subtitle, short_description, long_description, price_cents, currency, stripe_price_id, thumbnail_url, is_active, is_featured, created_at, updated_at"
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    logError("Impossible de recuperer le produit.", { slug, error });
    return null;
  }

  return (data as ProductRecord | null) || null;
});

export const getProductById = cache(async (productId: string): Promise<ProductRecord | null> => {
  const supabaseAdmin = getSupabaseAdminClient();
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      "id, slug, title, subtitle, short_description, long_description, price_cents, currency, stripe_price_id, thumbnail_url, is_active, is_featured, created_at, updated_at"
    )
    .eq("id", productId)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    logError("Impossible de recuperer le produit par id.", { productId, error });
    return null;
  }

  return (data as ProductRecord | null) || null;
});

export const getProductModules = cache(
  async (productId: string, onlyPublished = false): Promise<ProductModuleRecord[]> => {
    const supabaseAdmin = getSupabaseAdminClient();
    let query = supabaseAdmin
      .from("product_modules")
      .select(
        "id, product_id, slug, title, description, content_type, content_url, content_body, is_published, sort_order, created_at, updated_at"
      )
      .eq("product_id", productId)
      .order("sort_order", { ascending: true });

    if (onlyPublished) {
      query = query.eq("is_published", true);
    }

    const { data, error } = await query;

    if (error) {
      logError("Impossible de recuperer les modules du produit.", { productId, error });
      return [];
    }

    return (data || []) as ProductModuleRecord[];
  }
);

export const getProductWithModulesBySlug = cache(async (slug: string): Promise<ProductWithModules | null> => {
  const product = await getProductBySlug(slug);

  if (!product) {
    return null;
  }

  const modules = await getProductModules(product.id, true);
  return {
    ...product,
    modules
  };
});

export async function getUserPaidPurchases(userId: string): Promise<PurchaseRecord[]> {
  const supabaseAdmin = getSupabaseAdminClient();
  const { data, error } = await supabaseAdmin
    .from("purchases")
    .select(
      "id, user_id, product_id, product_name, amount, amount_total, currency, status, stripe_session_id, stripe_checkout_session_id, stripe_payment_intent_id, created_at, product:products(id, slug, title, subtitle, short_description, long_description, price_cents, currency, stripe_price_id, thumbnail_url, is_active, is_featured, created_at, updated_at)"
    )
    .eq("user_id", userId)
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  if (error) {
    logError("Impossible de recuperer les achats utilisateur.", { userId, error });
    return [];
  }

  return (data || []).map((purchase) => {
    const normalizedProduct = Array.isArray(purchase.product)
      ? (purchase.product[0] as ProductRecord | undefined) || null
      : (purchase.product as ProductRecord | null);

    return {
      ...purchase,
      product: normalizedProduct
    } as PurchaseRecord;
  });
}

export async function getOwnedProducts(userId: string): Promise<OwnedProductSummary[]> {
  const purchases = await getUserPaidPurchases(userId);

  return purchases
    .filter((purchase): purchase is PurchaseRecord & { product: ProductRecord } => Boolean(purchase.product))
    .map((purchase) => ({
      id: purchase.product.id,
      slug: purchase.product.slug,
      title: purchase.product.title,
      subtitle: purchase.product.subtitle,
      short_description: purchase.product.short_description,
      price_cents: purchase.product.price_cents,
      currency: purchase.product.currency,
      thumbnail_url: purchase.product.thumbnail_url,
      is_featured: purchase.product.is_featured,
      is_active: purchase.product.is_active,
      purchase,
      has_access: true
    }));
}
