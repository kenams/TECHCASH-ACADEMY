import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type SetAllCookies } from "@supabase/ssr";
import { getPublicEnv } from "@/lib/env";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/register"];

function buildSafeNextPath(request: NextRequest) {
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  return nextPath.startsWith("/") ? nextPath : "/dashboard";
}

function resolveAuthRedirectTarget(request: NextRequest) {
  const nextParam = request.nextUrl.searchParams.get("next")?.trim();

  if (nextParam && nextParam.startsWith("/")) {
    return nextParam;
  }

  // Compatibility fallback for old auth links that still carry `product`.
  const productParam = request.nextUrl.searchParams.get("product")?.trim();

  if (productParam) {
    return `/checkout?product=${encodeURIComponent(productParam)}`;
  }

  return "/dashboard";
}

export async function updateSession(request: NextRequest) {
  const publicEnv = getPublicEnv();
  let response = NextResponse.next({
    request
  });

  const supabase = createServerClient(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Parameters<SetAllCookies>[0]) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));

        response = NextResponse.next({
          request
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", buildSafeNextPath(request));
    return NextResponse.redirect(url);
  }

  if (user && isAuthRoute) {
    const target = resolveAuthRedirectTarget(request);
    return NextResponse.redirect(new URL(target, request.url));
  }

  return response;
}
