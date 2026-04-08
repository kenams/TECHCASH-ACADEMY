import { NextResponse } from "next/server";
import { createProduct, getCatalogSnapshot } from "@/lib/catalog-admin";
import { isAdminUserId } from "@/lib/admin";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  if (!isAdminUserId(user.id)) {
    return NextResponse.json({ error: "Acces refuse." }, { status: 403 });
  }

  const snapshot = await getCatalogSnapshot();
  return NextResponse.json(snapshot);
}

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  if (!isAdminUserId(user.id)) {
    return NextResponse.json({ error: "Acces refuse." }, { status: 403 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const priceCents = Number(body.price_cents);

    const created = await createProduct({
      slug: String(body.slug || ""),
      title: String(body.title || ""),
      subtitle: String(body.subtitle || ""),
      short_description: String(body.short_description || ""),
      long_description: String(body.long_description || ""),
      price_cents: Number.isFinite(priceCents) ? priceCents : 0,
      currency: String(body.currency || "eur"),
      stripe_price_id: body.stripe_price_id ? String(body.stripe_price_id) : null,
      thumbnail_url: body.thumbnail_url ? String(body.thumbnail_url) : null,
      is_active: Boolean(body.is_active),
      is_featured: Boolean(body.is_featured)
    });

    return NextResponse.json({ success: true, product: created });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Impossible de creer la formation.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
