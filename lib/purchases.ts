import { logError } from "@/lib/logger";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PurchaseRecord } from "@/lib/types";
import { findLocalProductByPurchaseName } from "@/lib/catalog";

const purchaseSelectNew =
  "id, user_id, product_id, product_name, amount, amount_total, currency, status, stripe_session_id, stripe_checkout_session_id, stripe_payment_intent_id, created_at";
const purchaseSelectLegacy =
  "id, user_id, product_name, amount, currency, status, stripe_checkout_session_id, stripe_payment_intent_id, created_at";

function normalizeLegacyPurchase(raw: Record<string, unknown>): PurchaseRecord {
  const product = findLocalProductByPurchaseName(String(raw.product_name || ""));

  return {
    id: String(raw.id),
    user_id: String(raw.user_id),
    product_id: product?.id || "",
    product_name: String(raw.product_name || ""),
    amount: Number(raw.amount || 0),
    amount_total: Number(raw.amount || 0),
    currency: String(raw.currency || "eur"),
    status: String(raw.status || "paid"),
    stripe_session_id: null,
    stripe_checkout_session_id: typeof raw.stripe_checkout_session_id === "string" ? raw.stripe_checkout_session_id : null,
    stripe_payment_intent_id: typeof raw.stripe_payment_intent_id === "string" ? raw.stripe_payment_intent_id : null,
    created_at: String(raw.created_at || new Date().toISOString()),
    product
  };
}

export async function getLegacyPaidPurchases(userId: string): Promise<PurchaseRecord[]> {
  const clientModule = await import("@/lib/supabaseAdmin");
  const supabaseAdmin = clientModule.getSupabaseAdminClient();
  const { data, error } = await supabaseAdmin
    .from("purchases")
    .select(purchaseSelectLegacy)
    .eq("user_id", userId)
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  if (error) {
    logError("Impossible de recuperer les achats legacy.", { userId, error });
    return [];
  }

  return (data || []).map((purchase) => normalizeLegacyPurchase(purchase as Record<string, unknown>));
}

export async function getLatestPurchase(userId: string, client: SupabaseClient) {
  const { data, error } = await client
    .from("purchases")
    .select(purchaseSelectNew)
    .eq("user_id", userId)
    .eq("status", "paid")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!error && data) {
    return data as PurchaseRecord;
  }

  if (error) {
    logError("Impossible de recuperer l'achat utilisateur avec le schema etendu.", { userId, error });
  }

  const legacyPurchases = await getLegacyPaidPurchases(userId);
  return legacyPurchases[0] || null;
}

export async function getProductPurchase(userId: string, productId: string) {
  const clientModule = await import("@/lib/supabaseAdmin");
  const supabaseAdmin = clientModule.getSupabaseAdminClient();
  const { data, error } = await supabaseAdmin
    .from("purchases")
    .select(purchaseSelectNew)
    .eq("user_id", userId)
    .eq("product_id", productId)
    .eq("status", "paid")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!error && data) {
    return data as PurchaseRecord;
  }

  if (error) {
    logError("Impossible de recuperer l'achat par product_id. Fallback legacy.", {
      userId,
      productId,
      error
    });
  }

  const legacyPurchases = await getLegacyPaidPurchases(userId);
  return legacyPurchases.find((purchase) => purchase.product?.id === productId) || null;
}

export async function hasAnyPaidPurchase(userId: string, client: SupabaseClient) {
  const purchase = await getLatestPurchase(userId, client);
  return Boolean(purchase);
}
