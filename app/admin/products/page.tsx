"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchProducts } from "@/lib/api/product" // ✅ API IMPORT

export default function AdminProductsPage() {

  // ✅ STATE (replaces static products)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // ✅ FETCH DATA
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Products
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your product catalog
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-sm text-muted-foreground">
          Loading products...
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="bg-white border border-border rounded-xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-muted/50 text-left text-muted-foreground">
              <tr>
                <th className="p-3">Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-right pr-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">

              {products.map((p) => (
                <tr key={p.id}>

                  <td className="p-3 font-medium">
                    {p.name}
                  </td>

                  <td>{p.sku}</td>
                  <td>{p.category}</td>
                  <td>₹{p.price}</td>
                  <td>{p.stock}</td>

                  <td className="text-right pr-4">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-primary text-sm"
                    >
                      Edit
                    </Link>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  )
}