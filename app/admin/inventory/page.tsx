"use client"

import { useState } from "react"

type Item = {
  id: string
  product: string
  variant: string
  price: number
  stock: number
}

const initialData: Item[] = [
  {
    id: "v1",
    product: "Vermicompost",
    variant: "1kg",
    price: 199,
    stock: 50,
  },
  {
    id: "v2",
    product: "Vermicompost",
    variant: "5kg",
    price: 799,
    stock: 10,
  },
  {
    id: "v3",
    product: "Tomato Seeds",
    variant: "50g",
    price: 149,
    stock: 5,
  },
]

export default function AdminInventoryPage() {
  const [items, setItems] = useState(initialData)

  const updateStock = (id: string, value: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, stock: value } : i
      )
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold">
          Inventory
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage product stock and variants
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="p-3">Product</th>
              <th>Variant</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">

            {items.map((item) => {
              const lowStock = item.stock < 10

              return (
                <tr key={item.id}>

                  <td className="p-3 font-medium">
                    {item.product}
                  </td>

                  <td>{item.variant}</td>

                  <td>₹{item.price}</td>

                  <td>
                    <input
                      type="number"
                      value={item.stock}
                      onChange={(e) =>
                        updateStock(
                          item.id,
                          Number(e.target.value)
                        )
                      }
                      className="w-20 border border-border rounded px-2 py-1 text-sm"
                    />
                  </td>

                  <td>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.stock === 0
                          ? "bg-red-100 text-red-600"
                          : lowStock
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {item.stock === 0
                        ? "Out of Stock"
                        : lowStock
                        ? "Low Stock"
                        : "In Stock"}
                    </span>
                  </td>

                </tr>
              )
            })}

          </tbody>

        </table>

      </div>

    </div>
  )
}