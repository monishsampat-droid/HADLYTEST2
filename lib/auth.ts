import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Require logged-in user
 */
export async function requireUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return user;
}

/**
 * Require admin user
 */
export async function requireAdmin() {
  const user = await requireUser();

  const role =
    user.user_metadata?.role || user.app_metadata?.role;

  if (role !== "admin") {
    throw new Error("Forbidden");
  }

  return NextResponse.json({ user });
}

/**
 * Get user OR guest (for cart)
 */
export async function getOptionalUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value;

  return {
    userId: user?.id ?? null,
    guestId: user ? null : guestId,
  };
}