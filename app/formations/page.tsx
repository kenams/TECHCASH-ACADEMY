import type { Metadata } from "next";
import Script from "next/script";
import { Navbar } from "@/components/navbar";
import { PublicFooter } from "@/components/public-footer";
import { FormationsCatalog } from "@/components/formations-catalog";
import { getPublicActiveProducts } from "@/lib/public-products";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

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

export default function FormationsPage() {
  const products = getPublicActiveProducts();
  const ownedSlugs: string[] = [];
  const hasGlobalAccess = false;

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

        <Navbar brand={siteConfig.brand} links={[{ href: "/", label: "Accueil" }]} isLoggedIn={false} />

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
