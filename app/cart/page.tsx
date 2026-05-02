"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShoppingCart, 
  Leaf, 
  ShieldCheck 
} from "lucide-react";

// Assuming these are your local components/utils
import { Container } from "@/components/Container";

type CartItemType = {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    images: { url: string }[];
  };
};

export default function CartPage() {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);

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

  const updateQty = async (itemId: string, quantity: number) => {
    if (quantity < 1) return removeItem(itemId);
    
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      });

      if (res.ok) {
        setItems((prev) =>
          prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
        );
      }
    } catch (err) {
      console.error("Update failed");
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE", // Or PATCH with qty 0 based on your API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== itemId));
      }
    } catch (err) {
      console.error("Remove failed");
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal >= 799 ? 0 : 49;
  const total = subtotal + delivery;
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8faf6]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a3a2a]" />
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] bg-[#f8faf6] py-6 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-[#1a3a2a]" /> Your Cart
              {count > 0 && (
                <span className="text-base font-normal text-gray-400 ml-2">
                  ({count} {count === 1 ? "item" : "items"})
                </span>
              )}
            </h1>
          </div>
          <Link 
            href="/products" 
            className="text-xs font-semibold text-[#1a3a2a] border border-[#1a3a2a]/20 px-4 py-2 rounded-full hover:bg-[#1a3a2a] hover:text-white transition"
          >
            ← Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm">
            <div className="w-20 h-20 bg-[#f8faf6] rounded-full flex items-center justify-center mx-auto mb-5">
              <ShoppingCart className="w-9 h-9 text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-400 mb-6">Add products to get started on your journey.</p>
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 bg-[#1a3a2a] text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-[#2d5a3d] transition"
            >
              Shop Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Items List */}
            <div className="md:col-span-2 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition">
                  <img
                    src={item.product.images?.[0]?.url || "/placeholder.png"}
                    alt={item.product.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Unit Price: ₹{item.price}</p>
                    <p className="text-base font-extrabold text-gray-900 mt-1">₹{item.price}</p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden">
                    <button 
                      onClick={() => updateQty(item.id, item.quantity - 1)} 
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 font-bold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-extrabold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQty(item.id, item.quantity + 1)} 
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="font-extrabold text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="text-gray-300 hover:text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Trust Banner */}
              <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 border border-green-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Damaged in Transit?</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Guaranteed replacement at <span className="font-semibold text-green-600">no extra cost</span> — always.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-24">
                <h2 className="font-extrabold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal ({count} items)</span>
                    <span className="font-semibold text-gray-800">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? "text-green-600 font-bold" : "font-semibold text-gray-800"}>
                      {delivery === 0 ? "FREE 🎉" : `₹${delivery}`}
                    </span>
                  </div>
                  
                  {subtotal < 799 && (
                    <p className="text-xs text-green-600 bg-green-50 rounded-xl px-3 py-2">
                      Add ₹{(799 - subtotal).toLocaleString()} more for <strong>free delivery!</strong>
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between font-extrabold text-gray-900 text-base mb-5">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <Link 
                  href="/checkout" 
                  className="flex items-center justify-center gap-2 w-full bg-[#1a3a2a] text-white rounded-2xl py-4 font-bold hover:bg-[#2d5a3d] transition shadow-md hover:shadow-lg text-sm"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                  <Leaf className="w-3 h-3 text-green-500" /> 100% organic · Secure checkout
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}