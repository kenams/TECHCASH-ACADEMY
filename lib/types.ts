export type UserProfile = {
  id: string;
  email: string;
  is_premium: boolean;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
};

export type PurchaseRecord = {
  id: string;
  user_id: string;
  product_name: string;
  amount: number;
  currency: string;
  status: string;
  stripe_checkout_session_id: string;
  stripe_payment_intent_id: string | null;
  created_at: string;
};

export type TrainingModule = {
  id: string;
  title: string;
  description: string;
  video_url: string;
  position: number;
  is_published: boolean;
};
