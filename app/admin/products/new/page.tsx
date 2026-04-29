"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { createProduct } from "@/lib/api/product" // ✅ API IMPORT

type Variant = {
  weight: string
  unit: string
  price: string
  stock: string
}

export default function NewProductPage() {
  const [variants, setVariants] = useState<Variant[]>([
    { weight: "", unit: "kg", price: "", stock: "" },
  ])

  // ✅ NEW STATES (no UI change)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<FileList | null>(null)

  const addVariant = () => {
    setVariants([
      ...variants,
      { weight: "", unit: "kg", price: "", stock: "" },
    ])
  }

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  const updateVariant = (
    index: number,
    field: keyof Variant,
    value: string
  ) => {
    const updated = [...variants]
    updated[index][field] = value
    setVariants(updated)
  }

  // ✅ SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const payload = {
        name,
        sku,
        description,
        variants: variants.map((v) => ({
          weight: v.weight,
          unit: v.unit,
          price: Number(v.price),
          stock: Number(v.stock),
        })),
        // ⚠️ If your backend supports images via URL or upload,
        // you may need to handle upload separately
      }

      await createProduct(payload)

      alert("Product created successfully")

      // optional reset
      setName("")
      setSku("")
      setDescription("")
      setVariants([{ weight: "", unit: "kg", price: "", stock: "" }])
    } catch (err: any) {
      alert(err.message || "Failed to create product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-6">

      <h1 className="text-xl font-bold">
        Add Product
      </h1>

      {/* ✅ FORM SUBMIT ATTACHED */}
      <form className="space-y-6" onSubmit={handleSubmit}>

        {/* BASIC INFO */}
        <div className="space-y-4">
          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-border rounded-lg px-4 py-3"
          />

          <input
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full border border-border rounded-lg px-4 py-3"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-border rounded-lg px-4 py-3"
          />
        </div>

        {/* VARIANTS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              Variants
            </h2>

            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-2 text-sm bg-primary text-white px-3 py-2 rounded-lg"
            >
              <Plus size={14} />
              Add Variant
            </button>
          </div>

          {variants.map((variant, index) => (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-5 gap-3 border border-border rounded-lg p-3"
            >

              <input
                placeholder="Weight"
                value={variant.weight}
                onChange={(e) =>
                  updateVariant(index, "weight", e.target.value)
                }
                className="border border-border rounded px-2 py-2 text-sm"
              />

              <select
                value={variant.unit}
                onChange={(e) =>
                  updateVariant(index, "unit", e.target.value)
                }
                className="border border-border rounded px-2 py-2 text-sm"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
              </select>

              <input
                placeholder="Price"
                value={variant.price}
                onChange={(e) =>
                  updateVariant(index, "price", e.target.value)
                }
                className="border border-border rounded px-2 py-2 text-sm"
              />

              <input
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) =>
                  updateVariant(index, "stock", e.target.value)
                }
                className="border border-border rounded px-2 py-2 text-sm"
              />

              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="flex items-center justify-center text-red-500"
              >
                <Trash2 size={16} />
              </button>

            </div>
          ))}
        </div>

        {/* IMAGES (BASIC) */}
        <div className="space-y-2">
          <h2 className="font-semibold">Images</h2>

          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="text-sm"
          />

          <p className="text-xs text-muted-foreground">
            Upload multiple product images
          </p>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>

      </form>

    </div>
  )
}