import { logError } from "@/lib/logger";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PurchaseRecord } from "@/lib/types";

export async function getLatestPurchase(userId: string, client: SupabaseClient) {
  const { data, error } = await client
    .from("purchases")
    .select(
      "id, user_id, product_name, amount, currency, status, stripe_checkout_session_id, stripe_payment_intent_id, created_at"
    )
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

export async function hasActivePurchase(userId: string, client: SupabaseClient) {
  const purchase = await getLatestPurchase(userId, client);
  return Boolean(purchase);
}
