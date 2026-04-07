import { logError } from "@/lib/logger";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PurchaseRecord } from "@/lib/types";

const purchaseSelect =
  "id, user_id, product_id, product_name, amount, amount_total, currency, status, stripe_session_id, stripe_checkout_session_id, stripe_payment_intent_id, created_at";

export async function getLatestPurchase(userId: string, client: SupabaseClient) {
  const { data, error } = await client
    .from("purchases")
    .select(purchaseSelect)
    .eq("user_id", userId)
    .eq("status", "paid")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    logError("Impossible de recuperer l'achat utilisateur.", { userId, error });
    return null;
  }

  return data as PurchaseRecord | null;
}

export async function getProductPurchase(userId: string, productId: string) {
  const clientModule = await import("@/lib/supabaseAdmin");
  const supabaseAdmin = clientModule.getSupabaseAdminClient();
  const { data, error } = await supabaseAdmin
    .from("purchases")
    .select(purchaseSelect)
    .eq("user_id", userId)
    .eq("product_id", productId)
    .eq("status", "paid")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    logError("Impossible de recuperer l'achat pour un produit.", { userId, productId, error });
    return null;
  }

  return data as PurchaseRecord | null;
}

export async function hasAnyPaidPurchase(userId: string, client: SupabaseClient) {
  const purchase = await getLatestPurchase(userId, client);
  return Boolean(purchase);
}
