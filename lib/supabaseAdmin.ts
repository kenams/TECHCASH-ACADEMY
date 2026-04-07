import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicEnv, getServerEnv } from "@/lib/env";

let adminClient: SupabaseClient | undefined;

export function getSupabaseAdminClient() {
  if (!adminClient) {
    const publicEnv = getPublicEnv();
    const serverEnv = getServerEnv();

    adminClient = createClient(publicEnv.supabaseUrl, serverEnv.supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }

  return adminClient;
}
