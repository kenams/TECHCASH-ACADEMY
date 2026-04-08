import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerEnv } from "@/lib/env";
import { logError, logInfo, logWarn } from "@/lib/logger";
import { getStripeClient } from "@/lib/stripe";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { getFeaturedProduct, getProductById, getProductBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function resolveWebhookProduct(session: Stripe.Checkout.Session) {
  const productId = session.metadata?.product_id;
  const productSlug = session.metadata?.product_slug;

  if (productId) {
    return getProductById(productId);
  }

  if (productSlug) {
    return getProductBySlug(productSlug);
  }

  return getFeaturedProduct();
}

async function resolveWebhookEmail(
  userId: string,
  session: Stripe.Checkout.Session,
  supabaseAdmin: ReturnType<typeof getSupabaseAdminClient>
) {
  const directEmail =
    session.customer_email || session.customer_details?.email || session.metadata?.customer_email || null;

  if (directEmail) {
    return directEmail;
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("users")
    .select("email")
    .eq("id", userId)
    .maybeSingle();

  if (!profileError && profile?.email) {
    return profile.email;
  }

  const authUserResult = await supabaseAdmin.auth.admin.getUserById(userId);
  return authUserResult.data.user?.email || null;
}

async function syncPaidCheckoutSession(session: Stripe.Checkout.Session) {
  const supabaseAdmin = getSupabaseAdminClient();
  const userId = session.metadata?.user_id;
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

  if (!userId) {
    logWarn("Webhook Stripe recu sans utilisateur exploitable.", {
      stripeSessionId: session.id
    });
    return NextResponse.json({ error: "Metadonnees utilisateur manquantes." }, { status: 400 });
  }

  const email = await resolveWebhookEmail(userId, session, supabaseAdmin);

  if (!email) {
    logWarn("Webhook Stripe recu sans email exploitable.", {
      stripeSessionId: session.id,
      userId
    });
    return NextResponse.json({ error: "Email utilisateur introuvable." }, { status: 400 });
  }

  const product = await resolveWebhookProduct(session);

  if (!product) {
    logWarn("Webhook Stripe recu sans produit resolu.", { stripeSessionId: session.id });
    return NextResponse.json({ error: "Produit introuvable." }, { status: 400 });
  }

  const { error: profileError } = await supabaseAdmin.from("users").upsert({
    id: userId,
    email,
    stripe_customer_id: stripeCustomerId
  });

  if (profileError) {
    throw profileError;
  }

  const { data: existingBySession, error: existingBySessionError } = await supabaseAdmin
    .from("purchases")
    .select("id, status")
    .eq("stripe_session_id", session.id)
    .limit(1)
    .maybeSingle();

  if (existingBySessionError) {
    const { data: legacyBySession, error: legacyBySessionError } = await supabaseAdmin
      .from("purchases")
      .select("id, status")
      .eq("stripe_checkout_session_id", session.id)
      .limit(1)
      .maybeSingle();

    if (legacyBySessionError) {
      throw legacyBySessionError;
    }

    if (legacyBySession) {
      logInfo("Webhook Stripe ignore car deja traite via colonne legacy.", {
        stripeSessionId: session.id
      });
      return NextResponse.json({ received: true });
    }
  }

  if (existingBySession) {
    logInfo("Webhook Stripe ignore car deja traite.", { stripeSessionId: session.id });
    return NextResponse.json({ received: true });
  }

  let existingPaidProduct = null as { id: string } | null;
  const { data: existingPaidByProductId, error: existingPaidProductError } = await supabaseAdmin
    .from("purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("product_id", product.id)
    .eq("status", "paid")
    .limit(1)
    .maybeSingle();

  if (!existingPaidProductError) {
    existingPaidProduct = existingPaidByProductId;
  } else {
    const { data: existingPaidByName, error: existingPaidByNameError } = await supabaseAdmin
      .from("purchases")
      .select("id")
      .eq("user_id", userId)
      .eq("product_name", product.title)
      .eq("status", "paid")
      .limit(1)
      .maybeSingle();

    if (existingPaidByNameError) {
      throw existingPaidByNameError;
    }

    existingPaidProduct = existingPaidByName;
  }

  if (existingPaidProduct) {
    logInfo("Webhook Stripe ignore car produit deja possede.", {
      stripeSessionId: session.id,
      userId,
      productId: product.id
    });
    return NextResponse.json({ received: true });
  }

  const amountTotal = session.amount_total ?? session.amount_subtotal ?? product.price_cents;

  const { error } = await supabaseAdmin.from("purchases").insert({
    user_id: userId,
    product_id: product.id,
    product_name: product.title,
    amount: amountTotal,
    amount_total: amountTotal,
    currency: session.currency || product.currency,
    status: "paid",
    stripe_session_id: session.id,
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id: stripePaymentIntentId
  });

  if (error) {
    const { error: legacyInsertError } = await supabaseAdmin.from("purchases").insert({
      user_id: userId,
      product_name: product.title,
      amount: amountTotal,
      currency: session.currency || product.currency,
      status: "paid",
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: stripePaymentIntentId
    });

    if (legacyInsertError) {
      throw legacyInsertError;
    }
  }

  logInfo("Paiement Stripe synchronise avec Supabase.", {
    userId,
    productId: product.id,
    productSlug: product.slug,
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
