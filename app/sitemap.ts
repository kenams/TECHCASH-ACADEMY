import type { MetadataRoute } from "next";
import { getPublicActiveProducts } from "@/lib/public-products";
import { getAbsoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = getPublicActiveProducts();
  const staticRoutes = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/formations", priority: 0.9, freq: "weekly" },
    { path: "/formations/trading", priority: 0.8, freq: "monthly" },
    { path: "/mentions-legales", priority: 0.3, freq: "yearly" },
    { path: "/politique-confidentialite", priority: 0.3, freq: "yearly" },
    { path: "/conditions-utilisation", priority: 0.3, freq: "yearly" }
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, freq }) => ({
    url: getAbsoluteUrl(path),
    changeFrequency: freq as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: getAbsoluteUrl(`/formations/${product.slug}`),
    changeFrequency: "weekly" as const,
    priority: product.is_featured ? 0.9 : 0.8
  }));

  return [...staticEntries, ...productEntries];
}
