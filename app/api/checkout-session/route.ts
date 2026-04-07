import { NextResponse } from "next/server";
import { logError, logInfo, logWarn } from "@/lib/logger";
import { getPublicEnv } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { getLatestPurchase } from "@/lib/purchases";
import { siteConfig } from "@/lib/site";
import { getStripeClient } from "@/lib/stripe";
import { getUserProfile } from "@/lib/users";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const stripe = getStripeClient();
    const supabase = await getSupabaseServerClient();
    const supabaseAdmin = getSupabaseAdminClient();
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "")
      : null;
    const {
      data: { user }
    } = accessToken
      ? await supabaseAdmin.auth.getUser(accessToken)
      : await supabase.auth.getUser();

    if (!user?.id || !user.email) {
      logWarn("Tentative de creation de checkout sans session valide.");
      return NextResponse.json({ error: "Session utilisateur invalide." }, { status: 401 });
    }

    const [profile, existingPurchase] = await Promise.all([
      getUserProfile(user.id, supabase),
      getLatestPurchase(user.id, supabase)
    ]);

    if (profile?.is_premium || existingPurchase) {
      return NextResponse.json({ error: "Un acces premium existe deja pour ce compte." }, { status: 409 });
    }

    const origin = getPublicEnv().siteUrl.replace(/\/+$/, "");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        user_id: user.id,
        product_name: siteConfig.productName
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            product_data: {
              name: siteConfig.productName,
              description:
                "Ebook + formation video + bonus pour devenir technicien informatique freelance."
            },
            unit_amount: siteConfig.productPrice
          }
        }
      ],
      customer: profile?.stripe_customer_id || undefined,
      customer_email: profile?.stripe_customer_id ? undefined : user.email,
      allow_promotion_codes: true
    });

    logInfo("Session Stripe creee.", { userId: user.id, stripeSessionId: session.id });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    logError("Erreur lors de la creation de la session Stripe.", { error });
    return NextResponse.json({ error: "Erreur lors de la creation du paiement." }, { status: 500 });
  }
}
