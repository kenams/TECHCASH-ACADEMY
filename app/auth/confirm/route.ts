import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/dashboard";

  const supabase = await getSupabaseServerClient();

  // PKCE flow (code exchange)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
    return NextResponse.redirect(
      new URL("/login?error=lien-invalide", request.url)
    );
  }

  // Token hash flow (email OTP)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as "signup" | "email" | "recovery" | "invite"
    });
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
    return NextResponse.redirect(
      new URL("/login?error=lien-invalide", request.url)
    );
  }

  return NextResponse.redirect(new URL("/login?error=lien-manquant", request.url));
}
