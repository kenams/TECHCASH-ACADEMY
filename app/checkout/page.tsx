import { redirect } from "next/navigation";
import { CheckoutPanel } from "@/app/checkout/checkout-panel";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getLatestPurchase } from "@/lib/purchases";
import { siteConfig } from "@/lib/site";
import { getUserProfile } from "@/lib/users";

export default async function CheckoutPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [profile, latestPurchase] = await Promise.all([
    getUserProfile(user.id, supabase),
    getLatestPurchase(user.id, supabase)
  ]);

  if (profile?.is_premium || latestPurchase) {
    redirect("/dashboard");
  }

  return (
    <CheckoutPanel
      email={user.email || ""}
      productName={siteConfig.productName}
      formattedPrice={siteConfig.formattedPrice}
    />
  );
}
