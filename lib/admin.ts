import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const defaultAdminEmails = ["kahdigital42@gmail.com", "admin.test@techcash-academy.com"] as const;

export function isAdminEmail(email: string | null | undefined) {
  if (!email) {
    return false;
  }

  const configured = process.env.TECHCASH_ADMIN_EMAILS?.split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  const allowlist = new Set([
    ...defaultAdminEmails.map((item) => item.toLowerCase()),
    ...(configured || [])
  ]);

  return allowlist.has(email.toLowerCase());
}

export async function requireAdminSession() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdminEmail(user.email)) {
    redirect("/dashboard");
  }

  return { supabase, user };
}
