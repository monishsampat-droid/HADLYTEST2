import { mergeCart } from "@/services/cart.service";
import { getOptionalUser, requireUser } from "@/lib/auth";

export async function POST() {
  try {
    const user = await requireUser(); // ✅ secure
    const ctx = await getOptionalUser();

    if (!ctx.guestId) {
      return Response.json({ success: true });
    }

    await mergeCart(user.id, ctx.guestId);

    const res = Response.json({ success: true });

    // ✅ Clear guest cookie after merge
    res.headers.append(
      "Set-Cookie",
      "guestId=; Path=/; HttpOnly; Max-Age=0"
    );

    return res;
  } catch (error: any) {
    return Response.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}