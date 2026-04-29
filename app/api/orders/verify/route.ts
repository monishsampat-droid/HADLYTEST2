import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { orderId, success } = await req.json();

    if (!orderId) {
      throw new Error("Order ID required");
    }

    // 1. Get order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    // 2. If payment SUCCESS
    if (success) {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "PAID",
        },
      });

      return Response.json({
        success: true,
        message: "Payment successful",
      });
    }

    // 3. If payment FAILED → restore stock
    for (const item of order.items) {
      if (item.variantId) {
        await prisma.productVariant.update({
          where: { id: item.variantId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      } else {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }
    }

    // 4. Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED",
      },
    });

    return Response.json({
      success: true,
      message: "Payment failed, stock restored",
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}