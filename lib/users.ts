import { logError } from "@/lib/logger";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { UserProfile } from "@/lib/types";

export async function getUserProfile(userId: string, client: SupabaseClient) {
  const { data, error } = await client
    .from("users")
    .select("id, email, is_premium, stripe_customer_id, created_at, updated_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    logError("Impossible de recuperer le profil utilisateur.", { userId, error });
    return null;
  }

  return data as UserProfile | null;
}
