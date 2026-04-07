export type ProductContentType = "pdf" | "video" | "text" | "resource" | "coming_soon";

export type UserProfile = {
  id: string;
  email: string;
  is_premium: boolean;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ProductRecord = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  short_description: string;
  long_description: string;
  price_cents: number;
  currency: string;
  stripe_price_id: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductModuleRecord = {
  id: string;
  product_id: string;
  slug: string;
  title: string;
  description: string;
  content_type: ProductContentType;
  content_url: string | null;
  content_body: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type PurchaseRecord = {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  amount: number;
  amount_total: number | null;
  currency: string;
  status: string;
  stripe_session_id: string | null;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  created_at: string;
  product?: ProductRecord | null;
};

export type TrainingModule = {
  id: string;
  title: string;
  description: string;
  video_url: string;
  position: number;
  is_published: boolean;
};

export type ProductCardData = Pick<
  ProductRecord,
  | "id"
  | "slug"
  | "title"
  | "subtitle"
  | "short_description"
  | "price_cents"
  | "currency"
  | "thumbnail_url"
  | "is_featured"
  | "is_active"
>;

export type ProductWithModules = ProductRecord & {
  modules: ProductModuleRecord[];
};

export type OwnedProductSummary = ProductCardData & {
  purchase: PurchaseRecord;
  has_access: boolean;
};
