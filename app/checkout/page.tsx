import { Navbar } from "@/components/navbar";
import { PublicFooter } from "@/components/public-footer";
import { CheckoutPanel } from "@/app/checkout/checkout-panel";
import { getProductPurchase } from "@/lib/purchases";
import { getFeaturedProduct, getProductBySlug } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";
import { redirect } from "next/navigation";

type CheckoutPageProps = {
  searchParams: Promise<{
    product?: string;
  }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedSlug = resolvedSearchParams.product?.trim() || null;
  const fallbackSlug = siteConfig.primaryProductSlug;
  const requestedProduct = requestedSlug ? await getProductBySlug(requestedSlug) : null;
  const fallbackProduct = requestedSlug ? null : await getProductBySlug(fallbackSlug);
  const featuredProduct = !requestedProduct && !fallbackProduct ? await getFeaturedProduct() : null;
  const product = requestedProduct || fallbackProduct || featuredProduct;

  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!product) {
    redirect("/formations");
  }

  if (user) {
    const [profile, purchase] = await Promise.all([
      getUserProfile(user.id, supabase),
      getProductPurchase(user.id, product.id)
    ]);

    if (purchase || (profile?.is_premium && product.is_active)) {
      redirect(`/dashboard/formations/${product.slug}`);
    }
  }

  return (
    <main>
      <div className="shell">
        <Navbar brand={siteConfig.brand} isLoggedIn={Boolean(user)} />
        <CheckoutPanel
          email={user?.email || ""}
          isAuthenticated={Boolean(user)}
          invalidRequestedSlug={requestedSlug && !requestedProduct ? requestedSlug : null}
          productSlug={product.slug}
          productName={product.title}
          productSubtitle={product.subtitle}
          productDescription={product.short_description}
          productThumbnailUrl={product.thumbnail_url}
          formattedPrice={new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: product.currency.toUpperCase()
          }).format(product.price_cents / 100)}
        />
        <PublicFooter />
      </div>
    </main>
  );
}
