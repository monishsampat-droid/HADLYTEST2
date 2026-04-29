"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchProductBySlug, updateProduct } from "@/lib/api/product" // ✅ API

export default function EditProductPage() {
  const { id } = useParams()

  // ✅ STATE (no UI change)
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // ✅ FETCH PRODUCT
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductBySlug(id as string)

        setName(data.name || "")
        setSku(data.sku || "")
        setDescription(data.description || "")
      } catch (err) {
        console.error(err)
        alert("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    if (id) loadProduct()
  }, [id])

  // ✅ UPDATE HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setSaving(true)

      await updateProduct(id as string, {
        name,
        sku,
        description,
      })

      alert("Product updated successfully")
    } catch (err: any) {
      alert(err.message || "Update failed")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading product...
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">

      <h1 className="text-xl font-bold">
        Edit Product ({id})
      </h1>

      {/* ✅ FORM CONNECTED */}
      <form className="space-y-4" onSubmit={handleSubmit}>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        <input
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-border rounded-lg px-4 py-3"
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white px-6 py-3 rounded-lg"
        >
          {saving ? "Updating..." : "Update Product"}
        </button>

      </form>

    </div>
  )
}