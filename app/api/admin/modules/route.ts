import { NextResponse } from "next/server";
import { createModule } from "@/lib/catalog-admin";
import { isAdminEmail } from "@/lib/admin";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import type { ProductContentType } from "@/lib/types";

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }

  if (!isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Acces refuse." }, { status: 403 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const sortOrder = Number(body.sort_order);

    const module = await createModule({
      product_id: String(body.product_id || ""),
      slug: String(body.slug || ""),
      title: String(body.title || ""),
      description: String(body.description || ""),
      content_type: (body.content_type as ProductContentType) || "coming_soon",
      content_url: body.content_url ? String(body.content_url) : null,
      content_body: body.content_body ? String(body.content_body) : null,
      is_published: Boolean(body.is_published),
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 1
    });

    return NextResponse.json({ success: true, module });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Impossible de creer le module.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
