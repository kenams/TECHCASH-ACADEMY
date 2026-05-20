import {
  getLocalActiveProducts,
  getLocalModulesByProductId,
  getLocalProductBySlug
} from "@/lib/catalog";
import type { ProductCardData, ProductRecord, ProductWithModules } from "@/lib/types";

function toProductCardData(product: ProductRecord): ProductCardData {
  return {
    id: product.id,
    slug: product.slug,
    category: product.category,
    title: product.title,
    subtitle: product.subtitle,
    short_description: product.short_description,
    price_cents: product.price_cents,
    currency: product.currency,
    thumbnail_url: product.thumbnail_url,
    is_featured: product.is_featured,
    is_active: product.is_active
  };
}

export function getPublicActiveProducts(): ProductCardData[] {
  return getLocalActiveProducts().map(toProductCardData);
}

export function getPublicFeaturedProduct(): ProductCardData | null {
  const products = getPublicActiveProducts();
  return products.find((product) => product.is_featured) || products[0] || null;
}

export function getPublicProductBySlug(slug: string): ProductRecord | null {
  return getLocalProductBySlug(slug);
}

export function getPublicProductWithModulesBySlug(slug: string): ProductWithModules | null {
  const product = getPublicProductBySlug(slug);

  if (!product) {
    return null;
  }

  return {
    ...product,
    modules: getLocalModulesByProductId(product.id).filter((module) => module.is_published)
  };
}
