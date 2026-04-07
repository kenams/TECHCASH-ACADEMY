import { cookies } from "next/headers";
import { createServerClient, type SetAllCookies } from "@supabase/ssr";
import { getPublicEnv } from "@/lib/env";

export async function getSupabaseServerClient() {
  const publicEnv = getPublicEnv();
  const cookieStore = await cookies();

  return createServerClient(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Parameters<SetAllCookies>[0]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Ignored in Server Components when cookies are read-only.
        }
      }
    }
  });
}
