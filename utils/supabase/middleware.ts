import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://obcjgxgeccfqdtsyqeky.supabase.co";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "sb_publishable_wITRnL924xVbQlcF21_WMQ_G49luh3_";

  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const isAdminRoute = url.pathname.startsWith("/admin");
  const isLoginPage = url.pathname === "/admin/login";

  // Protection logic:
  // 1. If accessing an admin route (except /admin/login) without auth, redirect to /admin/login
  if (isAdminRoute && !isLoginPage && !user) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // 2. If logged in and attempting to visit /admin/login, redirect to /admin
  if (isLoginPage && user) {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
};
