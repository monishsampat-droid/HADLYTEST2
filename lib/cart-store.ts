"use client"

import { create } from "zustand"

type Item = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

type CartStore = {
  items: Item[]
  user: string | null

  addItem: (item: Item) => void
  removeItem: (id: number) => void
  updateQty: (id: number, qty: number) => void
  clearCart: () => void

  login: () => void
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  user: null,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return { items: [...state.items, item] }
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  updateQty: (id, qty) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: qty } : i
      ),
    })),

  clearCart: () => set({ items: [] }),

  // 🔥 Dummy login (guest → user merge)
  login: () => {
    console.log("User logged in → cart persists")
    set({ user: "dummy_user" })
  },
}))