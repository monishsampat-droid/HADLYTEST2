"use client"

import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export type Variant = {
  label: string
  price: number
}

export type Product = {
  id: string | number
  name: string
  image: string
  basePrice: number
  variants?: Variant[]
}

// ✅ Use named export: export function ProductCard
export function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants?.[0] || null
  )

  const price = selectedVariant?.price || product.basePrice

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <div className="group relative bg-background border border-border rounded-2xl p-3 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:ring-1 hover:ring-primary/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
        
        {/* ❤️ Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setWishlisted(!wishlisted)
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center border border-border hover:scale-110 transition"
        >
          <Heart
            size={16}
            className={`transition ${wishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
          />
        </button>

        {/* 🖼 Cover Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-white flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* 📦 Content */}
        <div className="mt-2 flex flex-col flex-1 gap-1">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight min-h-[36px]">
            {product.name}
          </h3>

          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold text-primary">₹{price}</p>

            {product.variants && (
              <div className="flex gap-2 flex-wrap mt-0.5">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedVariant(variant)
                    }}
                    className={`px-2 py-1 text-xs rounded-lg border transition ${
                      selectedVariant?.label === variant.label
                        ? "border-primary text-primary bg-primary/10"
                        : "border-border text-muted-foreground hover:border-primary"
                    }`}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto pt-2">
            <button
              onClick={async (e) => {
                e.preventDefault()
                e.stopPropagation()
                // ... your add to cart logic
              }}
              className="w-full border border-primary text-primary bg-transparent rounded-xl py-2 text-xs font-medium hover:bg-primary hover:text-white transition-all duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}