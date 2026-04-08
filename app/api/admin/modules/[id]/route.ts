import { NextResponse } from "next/server";
import { deleteModule, updateModule } from "@/lib/catalog-admin";
import { isAdminUserId } from "@/lib/admin";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

async function guardAdmin() {
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

  return null;
}

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await guardAdmin();
  if (denied) {
    return denied;
  }

  try {
    const { id } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;
    const payload: Record<string, unknown> = { ...body };

    if (payload.sort_order !== undefined) {
      payload.sort_order = Number(payload.sort_order);
    }

    await updateModule(id, payload as never);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Impossible de mettre a jour le module.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await guardAdmin();
  if (denied) {
    return denied;
  }

  try {
    const { id } = await context.params;
    await deleteModule(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Impossible de supprimer le module.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
