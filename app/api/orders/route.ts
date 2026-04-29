import { createOrder } from "@/services/order.service";

export async function POST() {
  try {
    const order = await createOrder();

    return Response.json({
      success: true,
      order,
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