import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const user = data.user;

  if (!user) {
    return NextResponse.json({ error: "User not created" }, { status: 400 });
  }

  // 🔗 Create user in Prisma
  await prisma.user.create({
    data: {
      id: user.id,
      email: user.email!,
      role: "USER",
      cart: {
        create: {},
      },
    },
  });

  return NextResponse.json({ success: true });
}