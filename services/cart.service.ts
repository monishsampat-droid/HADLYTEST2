import { prisma } from "@/lib/prisma";

/**
 * Get or create cart (user OR guest)
 */
async function getOrCreateCart(
  userId: string | null,
  guestId: string | null | undefined
) {
  let cart;

  if (userId) {
    cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }
  } else {
    if (!guestId) {
      throw new Error("Guest ID missing");
    }

    cart = await prisma.cart.findUnique({
      where: { guestId: guestId }, // now guaranteed string
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { guestId: guestId },
      });
    }
  }

  return cart;
}

/**
 * Add to cart
 */
export async function addToCart(
  data: any,
  ctx: { userId: string | null; guestId: string | null | undefined }
) {
  const { productId, variantId, quantity } = data;
  const { userId, guestId } = ctx;

  if (!productId || !quantity) {
    throw new Error("Missing required fields");
  }

  const cart = await getOrCreateCart(userId, guestId);

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
      variantId: variantId || null,
    },
  });

  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      variantId: variantId || null,
      quantity,
    },
  });
}

/**
 * Get cart
 */
export async function getCart(ctx: {
  userId: string | null;
  guestId: string | null | undefined;
}) {
  const { userId, guestId } = ctx;

  // ✅ Merge guest cart into user cart if needed
  if (userId && guestId) {
    await mergeCart(userId, guestId);
  }

  // ✅ Fetch cart
  const cart = await prisma.cart.findFirst({
    where: userId
      ? { userId }
      : guestId
      ? { guestId }
      : undefined,
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
          variant: true,
        },
      },
    },
  });

  if (!cart) return null;

  // ✅ 🔥 Normalize price (SIMPLE + VARIABLE handled)
  const normalizedItems = cart.items.map((item) => {
    const price =
      item.variant?.price ??
      item.product.price ??
      0;

    return {
      ...item,
      price,
    };
  });

  return {
    ...cart,
    items: normalizedItems,
  };
}

/**
 * Update cart item
 */
export async function updateCartItem(data: any) {
  const { itemId, quantity } = data;

  if (!itemId || quantity == null) {
    throw new Error("Missing required fields");
  }

  if (quantity <= 0) {
    return prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  return prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });
}

export async function mergeCart(userId: string, guestId: string) {
  console.log("MERGE START:", { userId, guestId });

  const guestCart = await prisma.cart.findUnique({
    where: { guestId },
    include: { items: true },
  });

  if (!guestCart) {
    console.log("NO GUEST CART FOUND");
    return;
  }

  let userCart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true },
  });

  // ✅ If user has no cart → just assign guest cart
  if (!userCart) {
    await prisma.cart.update({
      where: { id: guestCart.id },
      data: {
        userId,
        guestId: null,
      },
    });

    console.log("GUEST CART ASSIGNED TO USER");
    return;
  }

  console.log("MERGING ITEMS...");

  // ✅ Merge items safely
  for (const item of guestCart.items) {
    const existing = userCart.items.find(
      (i) =>
        i.productId === item.productId &&
        i.variantId === item.variantId
    );

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + item.quantity,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        },
      });
    }
  }

  // ✅ Clean up guest cart
  await prisma.cartItem.deleteMany({
    where: { cartId: guestCart.id },
  });

  await prisma.cart.delete({
    where: { id: guestCart.id },
  });

  console.log("MERGE COMPLETE");
}