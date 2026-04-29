import { prisma } from "@/lib/prisma";

const USER_ID = "demo-user-1";

export async function createOrder() {
  // 1. Get cart
  const cart = await prisma.cart.findUnique({
    where: { userId: USER_ID },
    include: {
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // 2. Check stock availability
  for (const item of cart.items) {
    const stock = item.variant
      ? item.variant.stock
      : item.product.stock;

    if (stock == null || stock < item.quantity) {
      throw new Error(
        `Insufficient stock for ${item.product.name}`
      );
    }
  }

  // 3. Reserve stock (reduce immediately)
  for (const item of cart.items) {
    if (item.variantId) {
      await prisma.productVariant.update({
        where: { id: item.variantId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    } else {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }
  }

  // 4. Calculate total + prepare order items
  let total = 0;

  const orderItemsData = cart.items.map((item) => {
    const price = item.variant
      ? item.variant.price
      : item.product.price;

    if (price == null) {
      throw new Error("Invalid product price");
    }

    total += price * item.quantity;

    return {
      name: item.product.name,
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      price, // snapshot
    };
  });

  // 5. Shipping logic
  let shippingCost = 0;
  let isFreeShipping = false;

  if (total >= 799) {
    isFreeShipping = true;
    shippingCost = 0;
  } else {
    shippingCost = 49;
  }

  const finalTotal = total + shippingCost;

  // 6. Create order
  const order = await prisma.order.create({
    data: {
      userId: USER_ID,
      status: "PENDING",
      total: finalTotal,
      isFreeShipping,
      shippingCost,
      items: {
        create: orderItemsData,
      },
    },
    include: {
      items: true,
    },
  });

  // 7. Clear cart
  await prisma.cartItem.deleteMany({
    where: {
    cartId: cart.id,
  },
});

  return order;
}