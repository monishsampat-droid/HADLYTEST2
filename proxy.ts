import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function proxy(req: { nextUrl: { pathname: any; }; cookies: { get: (arg0: string) => { (): any; new(): any; value: string | Promise<string | null | undefined> | null | undefined; }; }; url: string | URL | undefined; }) {
  const res = NextResponse.next();

  const pathname = req.nextUrl.pathname;

  // ✅ Only protect specific routes
  const isProtectedRoute =
    pathname.startsWith("/account") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/admin");

  if (!isProtectedRoute) {
    return res;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({ name, value, ...options });
        },
        remove: (name, options) => {
          res.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/admin/:path*"],
};