import { redirect } from "next/navigation";
import { CheckoutPanel } from "@/app/checkout/checkout-panel";
import { getProductPurchase } from "@/lib/purchases";
import { getFeaturedProduct, getProductBySlug } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";

type CheckoutPageProps = {
  searchParams: Promise<{
    product?: string;
  }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const resolvedSearchParams = await searchParams;
  const productSlug = resolvedSearchParams.product || siteConfig.primaryProductSlug;
  const product = (await getProductBySlug(productSlug)) || (await getFeaturedProduct());

  if (!product) {
    redirect("/formations");
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/checkout?product=${product.slug}`)}`);
  }

  const [profile, purchase] = await Promise.all([
    getUserProfile(user.id, supabase),
    getProductPurchase(user.id, product.id)
  ]);

  if (purchase || (profile?.is_premium && product.is_active)) {
    redirect(`/dashboard/formations/${product.slug}`);
  }

  return (
    <CheckoutPanel
      email={user.email || ""}
      productSlug={product.slug}
      productName={product.title}
      productSubtitle={product.subtitle}
      formattedPrice={new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: product.currency.toUpperCase()
      }).format(product.price_cents / 100)}
    />
  );
}
