import type { Metadata } from "next";
import Script from "next/script";
import { Navbar } from "@/components/navbar";
import { PublicFooter } from "@/components/public-footer";
import { FormationsCatalog } from "@/components/formations-catalog";
import { getActiveProducts, getOwnedProducts } from "@/lib/products";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getUserProfile } from "@/lib/users";

export const metadata: Metadata = {
  title: "Catalogue des formations | TechCash Academy",
  description:
    "Découvre les formations TechCash Academy : IT freelance, web, support, automatisation et finance augmentée par IA.",
  alternates: {
    canonical: getAbsoluteUrl("/formations")
  },
  openGraph: {
    title: "Catalogue des formations | TechCash Academy",
    description:
      "Découvre les formations TechCash Academy : IT freelance, web, support, automatisation et finance augmentée par IA.",
    url: getAbsoluteUrl("/formations")
  }
};

export default async function FormationsPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const [profile, products, owned] = await Promise.all([
    user ? getUserProfile(user.id, supabase) : Promise.resolve(null),
    getActiveProducts(),
    user ? getOwnedProducts(user.id) : Promise.resolve([])
  ]);

  const ownedSlugs = owned.map((product) => product.slug);
  const hasGlobalAccess = Boolean(profile?.is_premium);

  const catalogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Catalogue des formations TechCash Academy",
    url: getAbsoluteUrl("/formations"),
    hasPart: products.map((product) => ({
      "@type": "Course",
      name: product.title,
      description: product.short_description,
      url: getAbsoluteUrl(`/formations/${product.slug}`)
    }))
  };

  return (
    <main>
      <div className="shell">
        <Script
          id="formations-collection-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
        />

        <Navbar brand={siteConfig.brand} links={[{ href: "/", label: "Accueil" }]} isLoggedIn={Boolean(user)} />

        <FormationsCatalog
          products={products}
          ownedSlugs={ownedSlugs}
          userHasGlobalAccess={hasGlobalAccess}
        />

        <PublicFooter />
      </div>
    </main>
  );
}
