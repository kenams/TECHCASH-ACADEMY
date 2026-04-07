import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerEnv } from "@/lib/env";
import { logError, logInfo, logWarn } from "@/lib/logger";
import { getStripeClient } from "@/lib/stripe";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function syncPaidCheckoutSession(session: Stripe.Checkout.Session) {
  const supabaseAdmin = getSupabaseAdminClient();
  const userId = session.metadata?.user_id;
  const productName = session.metadata?.product_name || "Produit digital";
  const amount = session.amount_total || 0;
  const email = session.customer_email;
  const stripeCustomerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id || null;
  const stripePaymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id || null;

  if (session.payment_status !== "paid") {
    logWarn("Session Stripe ignoree car non payee.", {
      stripeSessionId: session.id,
      paymentStatus: session.payment_status
    });
    return NextResponse.json({ received: true });
  }

  if (!userId || !email) {
    logWarn("Webhook Stripe recu sans utilisateur exploitable.", {
      stripeSessionId: session.id
    });
    return NextResponse.json({ error: "Metadonnees utilisateur manquantes." }, { status: 400 });
  }

  const { error: profileError } = await supabaseAdmin.from("users").upsert({
    id: userId,
    email,
    is_premium: true,
    stripe_customer_id: stripeCustomerId
  });

  if (profileError) {
    throw profileError;
  }

  const { data: existingPurchase } = await supabaseAdmin
    .from("purchases")
    .select("id")
    .eq("stripe_checkout_session_id", session.id)
    .limit(1)
    .maybeSingle();

  if (existingPurchase) {
    logInfo("Webhook Stripe ignore car deja traite.", { stripeSessionId: session.id });
    return NextResponse.json({ received: true });
  }

  const { error } = await supabaseAdmin.from("purchases").insert({
    user_id: userId,
    product_name: productName,
    amount,
    currency: session.currency || "eur",
    status: "paid",
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id: stripePaymentIntentId
  });

  if (error) {
    throw error;
  }

  logInfo("Paiement Stripe synchronise avec Supabase.", {
    userId,
    stripeSessionId: session.id
  });

  return NextResponse.json({ received: true });
}

export async function POST(request: Request) {
  const serverEnv = getServerEnv();
  const stripe = getStripeClient();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = serverEnv.stripeWebhookSecret;

  if (!signature || !webhookSecret) {
    logWarn("Webhook Stripe appele sans configuration complete.");
    return NextResponse.json({ error: "Webhook Stripe non configure." }, { status: 400 });
  }

  try {
    const body = await request.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;
      return syncPaidCheckoutSession(session);
    }

    if (event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object as Stripe.Checkout.Session;
      logWarn("Paiement Stripe asynchrone echoue.", { stripeSessionId: session.id });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logError("Erreur webhook Stripe.", { error });
    return NextResponse.json({ error: "Erreur webhook Stripe." }, { status: 400 });
  }
}
