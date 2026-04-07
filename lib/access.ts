import { getUserProfile } from "@/lib/users";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getProductBySlug } from "@/lib/products";
import { getLatestPurchase, getProductPurchase, hasAnyPaidPurchase } from "@/lib/purchases";

export async function requireAuthenticatedUser() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return { supabase, user };
}

export async function userHasGlobalAccess(userId: string) {
  const supabase = await getSupabaseServerClient();
  const profile = await getUserProfile(userId, supabase);
  return Boolean(profile?.is_premium);
}

export async function userHasProductAccess(userId: string, productSlug: string) {
  const product = await getProductBySlug(productSlug);

  if (!product) {
    return {
      product: null,
      hasAccess: false,
      reason: "product_not_found" as const
    };
  }

  const globalAccess = await userHasGlobalAccess(userId);

  if (globalAccess) {
    return {
      product,
      hasAccess: true,
      reason: "global_access" as const
    };
  }

  const purchase = await getProductPurchase(userId, product.id);

  return {
    product,
    hasAccess: Boolean(purchase),
    reason: purchase ? ("owned" as const) : ("not_owned" as const)
  };
}

export async function getDashboardSnapshot(userId: string) {
  const supabase = await getSupabaseServerClient();
  const [profile, latestPurchase, hasPurchase] = await Promise.all([
    getUserProfile(userId, supabase),
    getLatestPurchase(userId, supabase),
    hasAnyPaidPurchase(userId, supabase)
  ]);

  return {
    profile,
    latestPurchase,
    hasPurchase
  };
}
