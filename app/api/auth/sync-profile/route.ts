import { NextResponse } from "next/server";
import { logError, logInfo, logWarn } from "@/lib/logger";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdminClient();
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "")
      : null;

    const user = accessToken
      ? (await supabaseAdmin.auth.getUser(accessToken)).data.user
      : (await (await getSupabaseServerClient()).auth.getUser()).data.user;

    if (!user?.id || !user.email) {
      logWarn("Tentative de synchronisation de profil sans utilisateur authentifie.");
      return NextResponse.json({ error: "Utilisateur non authentifie." }, { status: 401 });
    }

    const { error } = await supabaseAdmin.from("users").upsert({
      id: user.id,
      email: user.email
    });

    if (error) {
      throw error;
    }

    logInfo("Profil utilisateur synchronise.", { userId: user.id });
    return NextResponse.json({ success: true });
  } catch (error) {
    logError("Erreur de synchronisation du profil utilisateur.", { error });
    return NextResponse.json({ error: "Impossible de synchroniser le profil." }, { status: 500 });
  }
}
