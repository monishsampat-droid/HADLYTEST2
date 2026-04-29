"use client"

import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-store"
import { CartSteps } from "@/components/cart-steps"
import { Container } from "@/components/Container"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCart()

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  const delivery = subtotal >= 799 ? 0 : 49
  const total = subtotal + delivery

  const handlePlaceOrder = () => {
    clearCart()
    router.push("/order-success")
  }

  return (
    <main className="py-10 md:py-14">
      <Container>

        {/* Steps */}
        <CartSteps step={1} />

        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT: Address + Payment */}
          <div className="space-y-6">

            {/* Address */}
            <div className="border border-border rounded-xl p-5 space-y-4">
              <h2 className="font-bold">Delivery Address</h2>

              <input
                placeholder="Full Name"
                className="w-full border border-border rounded-lg px-4 py-3 text-sm"
              />

              <input
                placeholder="Phone Number"
                className="w-full border border-border rounded-lg px-4 py-3 text-sm"
              />

              <textarea
                placeholder="Full Address"
                className="w-full border border-border rounded-lg px-4 py-3 text-sm"
              />
            </div>

            {/* Payment */}
            <div className="border border-border rounded-xl p-5 space-y-3">
              <h2 className="font-bold">Payment Method</h2>

              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="payment" defaultChecked />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="payment" />
                UPI / Card (coming soon)
              </label>
            </div>

          </div>

          {/* RIGHT: Summary */}
          <div className="border border-border rounded-xl p-5 space-y-4 h-fit">

            <h2 className="font-bold">Order Summary</h2>

            {/* Items */}
            <div className="space-y-2 text-sm">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between">
                  <span>
                    {i.name} × {i.quantity}
                  </span>
                  <span>₹{i.price * i.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-2 text-sm">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </span>
              </div>

              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

            </div>

            {/* Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold"
            >
              Place Order
            </button>

          </div>

        </div>

      </Container>
    </main>
  )
}