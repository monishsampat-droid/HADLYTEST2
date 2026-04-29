import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  const response = NextResponse.json({
    success: true,
    user: data.user,
  });

  // 🔐 Secure cookies
  response.cookies.set("sb-access-token", data.session?.access_token ?? "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  response.cookies.set("sb-refresh-token", data.session?.refresh_token ?? "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return response;
}