import { NextResponse } from "next/server";
import { logError, logInfo, logWarn } from "@/lib/logger";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

type RegisterPayload = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterPayload;
    const email = body.email?.trim().toLowerCase() || "";
    const password = body.password || "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caracteres." },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const { data: createdUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (createError) {
      logWarn("Erreur lors de la creation du compte.", { email, createError });
      return NextResponse.json({ error: createError.message }, { status: 400 });
    }

    if (!createdUser.user?.id || !createdUser.user.email) {
      return NextResponse.json(
        { error: "Le compte a ete cree mais l'utilisateur est introuvable." },
        { status: 500 }
      );
    }

    const { error: profileError } = await supabaseAdmin.from("users").upsert({
      id: createdUser.user.id,
      email: createdUser.user.email
    });

    if (profileError) {
      logError("Compte cree mais profil impossible a synchroniser.", {
        email,
        profileError
      });
      return NextResponse.json(
        { error: "Compte cree mais profil impossible a synchroniser." },
        { status: 500 }
      );
    }

    logInfo("Compte cree via route serveur.", { userId: createdUser.user.id, email });
    return NextResponse.json({ success: true });
  } catch (error) {
    logError("Erreur inattendue pendant l'inscription.", { error });
    return NextResponse.json({ error: "Impossible de creer le compte." }, { status: 500 });
  }
}
