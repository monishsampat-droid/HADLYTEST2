"use client";
import { Container } from "@/components/Container";
import { CartSteps } from "@/components/cart-steps";
import { useEffect, useState } from "react";

type CartItemType = {
  id: string;
  quantity: number;
  price: number; // ✅ ADD THIS
  product: {
    name: string;
    images: { url: string }[];
  };
  variant?: {
    price: number;
  } | null;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();

        if (data.success && data.cart) {
          setItems(data.cart.items);
        }
      } catch (err) {
        console.error("Failed to fetch cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // 🔹 Calculate subtotal
const subtotal = items.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

  const updateQty = async (itemId: string, quantity: number) => {
  try {
    const res = await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, quantity }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // update UI
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== itemId)
        : prev.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          )
    );
  } catch (err: any) {
    console.error(err.message);
  }
};

const removeItem = async (itemId: string) => {
  await updateQty(itemId, 0);
};

  return (
    <Container>
      <main className="py-10 md:py-14">

          {/* Steps */}
          <CartSteps step={0} />

          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Your Cart
          </h1>

          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">

              {/* Items */}
              <div className="md:col-span-2 space-y-4">
                {items.map((item) => {
                  const price = item.price;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 border border-border rounded-xl p-4"
                    >
                      <img
                        src={item.product.images?.[0]?.url || "/placeholder.png"}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.product.name}</p>
                        <p className="text-sm text-primary font-bold">₹{price}</p>

                        {/* Qty (read-only for now) */}
                        <div className="flex gap-2 mt-2 items-center">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="px-2 border rounded"
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="px-2 border rounded"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="border border-border rounded-xl p-5 space-y-4 h-fit">

                <h2 className="font-bold">Order Summary</h2>

                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <button className="w-full bg-primary text-white py-3 rounded-xl">
                  Checkout
                </button>

              </div>

            </div>
          )}
      </main>
    </Container>
  );
}