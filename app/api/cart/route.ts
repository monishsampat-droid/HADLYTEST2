import { addToCart, getCart, updateCartItem } from "@/services/cart.service";
import { getOptionalUser } from "@/lib/auth";

/**
 * Add to cart
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let ctx = await getOptionalUser();

    let newGuestId: string | null = null;

    // ✅ If guest and no guestId → create one
    if (!ctx.userId && !ctx.guestId) {
      newGuestId = crypto.randomUUID();
      ctx.guestId = newGuestId;

      console.log("NEW GUEST ID CREATED:", newGuestId);
    }

    const item = await addToCart(body, ctx);

    const res = Response.json({
      success: true,
      item,
    });

    // ✅ Proper cookie setup (CRITICAL FIX)
    if (newGuestId) {
      res.headers.append(
        "Set-Cookie",
        [
          `guestId=${newGuestId}`,
          "Path=/",
          "HttpOnly",
          "SameSite=Lax",
          "Secure", // 🔥 ensures cookie persists after login
        ].join("; ")
      );

      console.log("GUEST COOKIE SET");
    }

    return res;
  } catch (error: any) {
    console.error("ADD TO CART ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}

/**
 * Get cart
 */
export async function GET() {
  try {
    const ctx = await getOptionalUser();

    console.log("CTX IN GET CART:", ctx);

    let merged = false;

    // ✅ detect if merge should happen
    if (ctx.userId && ctx.guestId) {
      merged = true;
      console.log("MERGE WILL RUN:", ctx);
    }

    const cart = await getCart(ctx);

    const res = Response.json({
      success: true,
      cart,
    });

    // ✅ clear guest cookie AFTER merge
    if (merged) {
      res.headers.append(
        "Set-Cookie",
        [
          "guestId=",
          "Path=/",
          "HttpOnly",
          "SameSite=Lax",
          "Max-Age=0",
        ].join("; ")
      );

      console.log("GUEST COOKIE CLEARED");
    }

    return res;
  } catch (error: any) {
    console.error("GET CART ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * Update cart item
 */
export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    console.log("UPDATE CART BODY:", body);

    const item = await updateCartItem(body);

    return Response.json({
      success: true,
      item,
    });
  } catch (error: any) {
    console.error("UPDATE CART ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}