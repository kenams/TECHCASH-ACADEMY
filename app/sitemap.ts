import type { MetadataRoute } from "next";
import { getActiveProducts } from "@/lib/products";
import { getAbsoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getActiveProducts();
  const staticRoutes = [
    "/",
    "/formations",
    "/login",
    "/register",
    "/mentions-legales",
    "/politique-confidentialite",
    "/conditions-utilisation"
  ];
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: getAbsoluteUrl(route),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: getAbsoluteUrl(`/formations/${product.slug}`),
    changeFrequency: "weekly",
    priority: product.is_featured ? 0.9 : 0.8
  }));

  return [...staticEntries, ...productEntries];
}
