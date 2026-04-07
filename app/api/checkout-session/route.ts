import { NextResponse } from "next/server";
import { logError, logInfo, logWarn } from "@/lib/logger";
import { getPublicEnv } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { getProductById, getProductBySlug } from "@/lib/products";
import { getStripeClient } from "@/lib/stripe";
import { getUserProfile } from "@/lib/users";
import { getProductPurchase } from "@/lib/purchases";

export const runtime = "nodejs";

type CheckoutPayload = {
  product?: string;
  productId?: string;
};

async function resolveRequestedProduct(payload: CheckoutPayload) {
  if (payload.productId) {
    return getProductById(payload.productId);
  }

  if (payload.product) {
    return getProductBySlug(payload.product);
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const stripe = getStripeClient();
    const supabase = await getSupabaseServerClient();
    const supabaseAdmin = getSupabaseAdminClient();
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "")
      : null;
    const payload = (await request.json().catch(() => ({}))) as CheckoutPayload;

    const {
      data: { user }
    } = accessToken
      ? await supabaseAdmin.auth.getUser(accessToken)
      : await supabase.auth.getUser();

    if (!user?.id || !user.email) {
      logWarn("Tentative de creation de checkout sans session valide.");
      return NextResponse.json({ error: "Session utilisateur invalide." }, { status: 401 });
    }

    const product = await resolveRequestedProduct(payload);

    if (!product || !product.is_active) {
      return NextResponse.json({ error: "Produit introuvable ou inactif." }, { status: 404 });
    }

    const [profile, existingPurchase] = await Promise.all([
      getUserProfile(user.id, supabase),
      getProductPurchase(user.id, product.id)
    ]);

    if (existingPurchase || profile?.is_premium) {
      return NextResponse.json(
        { error: "Cette formation est deja accessible pour ce compte." },
        { status: 409 }
      );
    }

    const origin = getPublicEnv().siteUrl.replace(/\/+$/, "");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/success?product=${product.slug}`,
      cancel_url: `${origin}/cancel?product=${product.slug}`,
      metadata: {
        user_id: user.id,
        product_id: product.id,
        product_slug: product.slug,
        product_name: product.title
      },
      line_items: [
        product.stripe_price_id
          ? {
              quantity: 1,
              price: product.stripe_price_id
            }
          : {
              quantity: 1,
              price_data: {
                currency: product.currency,
                product_data: {
                  name: product.title,
                  description: product.short_description
                },
                unit_amount: product.price_cents
              }
            }
      ],
      customer: profile?.stripe_customer_id || undefined,
      customer_email: profile?.stripe_customer_id ? undefined : user.email,
      allow_promotion_codes: true
    });

    logInfo("Session Stripe creee.", {
      userId: user.id,
      stripeSessionId: session.id,
      productId: product.id,
      productSlug: product.slug
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    logError("Erreur lors de la creation de la session Stripe.", { error });
    return NextResponse.json({ error: "Erreur lors de la creation du paiement." }, { status: 500 });
  }
}
