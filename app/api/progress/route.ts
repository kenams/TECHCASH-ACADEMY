import { NextResponse } from "next/server";
import { logError, logWarn } from "@/lib/logger";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export const runtime = "nodejs";

type ProgressPayload = {
  moduleSlug?: string;
  productSlug?: string;
};

async function getAuthenticatedSupabase() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null as null };
  }

  return { supabase, user };
}

function invalidPayload(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function GET(request: Request) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    if (!user) {
      return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
    }

    const url = new URL(request.url);
    const productSlug = url.searchParams.get("productSlug")?.trim();

    if (!productSlug) {
      return invalidPayload("Le paramètre productSlug est requis.");
    }

    const { data, error } = await supabase
      .from("user_module_progress")
      .select("module_slug, completed_at")
      .eq("user_id", user.id)
      .eq("product_slug", productSlug)
      .order("completed_at", { ascending: false });

    if (error) {
      logWarn("Lecture progression impossible.", { userId: user.id, productSlug, error });
      return NextResponse.json({ moduleSlugs: [], completedAt: [] });
    }

    return NextResponse.json({
      moduleSlugs: (data ?? []).map((row) => row.module_slug),
      completedAt: (data ?? []).map((row) => row.completed_at)
    });
  } catch (error) {
    logError("Erreur API progression GET.", { error });
    return NextResponse.json({ error: "Impossible de charger la progression." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    if (!user) {
      return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
    }

    const payload = (await request.json().catch(() => ({}))) as ProgressPayload;
    const productSlug = payload.productSlug?.trim();
    const moduleSlug = payload.moduleSlug?.trim();

    if (!productSlug || !moduleSlug) {
      return invalidPayload("productSlug et moduleSlug sont requis.");
    }

    const { error } = await supabase.from("user_module_progress").upsert(
      {
        user_id: user.id,
        product_slug: productSlug,
        module_slug: moduleSlug,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { onConflict: "user_id,product_slug,module_slug" }
    );

    if (error) {
      logWarn("Enregistrement progression impossible.", { userId: user.id, productSlug, moduleSlug, error });
      return NextResponse.json({ ok: false }, { status: 202 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    logError("Erreur API progression POST.", { error });
    return NextResponse.json({ error: "Impossible d'enregistrer la progression." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { supabase, user } = await getAuthenticatedSupabase();

    if (!user) {
      return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
    }

    const payload = (await request.json().catch(() => ({}))) as ProgressPayload;
    const productSlug = payload.productSlug?.trim();
    const moduleSlug = payload.moduleSlug?.trim();

    if (!productSlug || !moduleSlug) {
      return invalidPayload("productSlug et moduleSlug sont requis.");
    }

    const { error } = await supabase
      .from("user_module_progress")
      .delete()
      .eq("user_id", user.id)
      .eq("product_slug", productSlug)
      .eq("module_slug", moduleSlug);

    if (error) {
      logWarn("Suppression progression impossible.", { userId: user.id, productSlug, moduleSlug, error });
      return NextResponse.json({ ok: false }, { status: 202 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    logError("Erreur API progression DELETE.", { error });
    return NextResponse.json({ error: "Impossible de modifier la progression." }, { status: 500 });
  }
}
