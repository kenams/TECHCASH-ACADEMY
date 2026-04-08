import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const defaultAdminUserIds = [
  "4467fcfc-92e0-497e-9639-4de2de717ada",
  "7d172c76-df92-492c-b11c-418544213528"
] as const;

const reservedAdminEmails = [
  "admin.test@techcash-academy.com",
  "kenams42@gmail.com",
  "kahdigital42@gmail.com"
] as const;

function configuredAdminUserIds() {
  return process.env.TECHCASH_ADMIN_USER_IDS?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function isAdminUserId(userId: string | null | undefined) {
  if (!userId) {
    return false;
  }

  const allowlist = new Set([...(configuredAdminUserIds() || []), ...defaultAdminUserIds]);
  return allowlist.has(userId);
}

export function isReservedAdminEmail(email: string | null | undefined) {
  if (!email) {
    return false;
  }

  return reservedAdminEmails.includes(email.trim().toLowerCase() as (typeof reservedAdminEmails)[number]);
}

export async function requireAdminSession() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdminUserId(user.id)) {
    redirect("/dashboard");
  }

  return { supabase, user };
}
