"use client"

import { use, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ShoppingCart, Truck, Shield, Leaf, ChevronLeft, ChevronRight, Heart, Star, ArrowRight, CheckCircle2 } from "lucide-react"

type ProductImage = {
  url: string
}

type ProductVariant = {
  id: string
  weight: number
  unit: string
  price: number
  stock: number
}

type ProductBenefit = {
  id: string
  text: string
  position?: number
}

type ProductUsage = {
  id: string
  title: string
  description?: string
  position?: number
}

type Product = {
  id: string
  name: string
  description?: string
  sku: string
  price?: number
  stock?: number
  type: "SIMPLE" | "VARIABLE"
  category: { name: string }
  images: ProductImage[]
  variants: ProductVariant[]
  ProductBenefit?: ProductBenefit[]
  ProductUsage?: ProductUsage[]
}

type Props = {
  params: Promise<{ id: string }>
}

type Review = {
  id: string
  name: string
  rating: number
  comment: string
  date: string
}

const getInitialReviews = (product: Product): Review[] => [
  {
    id: `${product.id}-review-1`,
    name: "Amit",
    rating: 5,
    comment: `The ${product.name} arrived quickly and worked exactly as expected. Highly recommend!`,
    date: "2 days ago",
  },
  {
    id: `${product.id}-review-2`,
    name: "Pooja",
    rating: 4,
    comment: `Good quality and easy to use. Would buy again for my garden.`,
    date: "1 week ago",
  },
  {
    id: `${product.id}-review-3`,
    name: "Ravi",
    rating: 5,
    comment: `Perfect choice for my plants. The packaging was great and the product feels durable.`,
    date: "2 weeks ago",
  },
]

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4e6?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=600&fit=crop&q=80",
]

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Organic Vermicompost",
    description: "Rich organic compost that improves soil structure, boosts microbial activity, and enhances plant growth.",
    sku: "VERMI-1KG",
    price: 499,
    stock: 100,
    type: "SIMPLE",
    category: { name: "Organic Fertilizers" },
    images: [{ url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&h=900&fit=crop&q=80" }],
    variants: [],
  },
  {
    id: "2",
    name: "Tomato Seeds",
    description: "Heirloom tomato seeds with high germination for healthy garden yields.",
    sku: "TOMATO-SEED",
    price: 149,
    stock: 120,
    type: "SIMPLE",
    category: { name: "Seeds" },
    images: [{ url: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=900&h=900&fit=crop&q=80" }],
    variants: [],
  },
  {
    id: "3",
    name: "Garden Tool Kit",
    description: "A full gardening tool set for planting, pruning, and maintaining your organic garden.",
    sku: "TOOL-KIT",
    price: 799,
    stock: 50,
    type: "VARIABLE",
    category: { name: "Garden Tools" },
    images: [{ url: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=900&h=900&fit=crop&q=80" }],
    variants: [
      { id: "3-2kg", weight: 2, unit: "2kg", price: 799, stock: 20 },
      { id: "3-3kg", weight: 3, unit: "3kg", price: 999, stock: 18 },
      { id: "3-5kg", weight: 5, unit: "5kg", price: 1199, stock: 12 },
    ],
  },
  {
    id: "4",
    name: "Neem Cake",
    description: "Organic neem cake fertilizer to enrich soil and promote strong plant growth.",
    sku: "NEEM-CAKE",
    price: 249,
    stock: 80,
    type: "SIMPLE",
    category: { name: "Organic Fertilizers" },
    images: [{ url: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=900&h=900&fit=crop&q=80" }],
    variants: [],
  },
]

export default function ProductPage({ params }: Props) {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")

  useEffect(() => {
    if (!id) return

    setLoading(true)
    setProduct(null)
    setQty(1)
    setActiveImg(0)
    setSelectedVariant(null)

    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Handle both direct product response and {product} wrapped response
        const productData = data.product || data
        
        if (productData && productData.id) {
          setProduct(productData)
          if (productData.variants?.length > 0) {
            setSelectedVariant(productData.variants[0])
          } else {
            setSelectedVariant({
              id: `${productData.id}-default`,
              weight: 1,
              unit: "1 unit",
              price: productData.price ?? 0,
              stock: productData.stock ?? 0,
            })
          }
          setReviews(getInitialReviews(productData))
          return
        }

        const fallback = FALLBACK_PRODUCTS.find((item) => item.id === id)
        if (fallback) {
          setProduct(fallback)
          if (fallback.variants?.length > 0) {
            setSelectedVariant(fallback.variants[0])
          } else {
            setSelectedVariant({
              id: `${fallback.id}-default`,
              weight: 1,
              unit: "1 unit",
              price: fallback.price ?? 0,
              stock: fallback.stock ?? 0,
            })
          }
          setReviews(getInitialReviews(fallback))
        } else {
          setProduct(null)
        }
      })
      .catch(() => {
        const fallback = FALLBACK_PRODUCTS.find((item) => item.id === id)
        if (fallback) {
          setProduct(fallback)
          if (fallback.variants?.length > 0) {
            setSelectedVariant(fallback.variants[0])
          } else {
            setSelectedVariant({
              id: `${fallback.id}-default`,
              weight: 1,
              unit: "1 unit",
              price: fallback.price ?? 0,
              stock: fallback.stock ?? 0,
            })
          }
          setReviews(getInitialReviews(fallback))
        } else {
          setProduct(null)
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  const images = useMemo(() => {
    if (!product) return []
    const productImages = (product.images || [])
      .map((img) => img.url)
      .filter(Boolean)

    // Use only real product images when available.
    if (productImages.length > 0) return productImages

    // Keep a single safe fallback only when product has no images.
    return FALLBACK_IMAGES.slice(0, 1)
  }, [product])

  const displayVariants = useMemo(() => {
    if (!product) return []
    if (product.variants?.length > 0) {
      return product.variants
    }

    return [
      {
        id: `${product.id}-default`,
        weight: 1,
        unit: "1 unit",
        price: product.price ?? 0,
        stock: product.stock ?? 0,
      },
    ]
  }, [product])

  const activePrice = selectedVariant?.price ?? displayVariants[0]?.price ?? product?.price ?? 0
  const displayPrice = activePrice
  const categoryLabel = product?.category?.name || "Product"

  const reviewCount = reviews.length
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0
    return Number((reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1))
  }, [reviews])

  const addReview = () => {
    if (!product || reviewComment.trim().length === 0) return

    const newReview: Review = {
      id: `${product.id}-review-${Date.now()}`,
      name: "You",
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: "Just now",
    }

    setReviews((current) => [newReview, ...current])
    setReviewComment("")
    setReviewRating(5)
  }

  const addToCart = async () => {
    if (!product) return

    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        variantId: selectedVariant?.id,
        quantity: qty,
      }),
    })

    setAdded(true)
    window.setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8faf6]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a3a2a]" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#f8faf6]">
        Product not found.
      </div>
    )
  }

  return (
    <div className="bg-[#f8faf6] min-h-screen py-6 md:py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-[#1a3a2a] transition">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-[#1a3a2a] transition">Shop</Link>
          <span>›</span>
          <Link
            href={`/products?cat=${encodeURIComponent(categoryLabel.toLowerCase().replace(/\s+/g, "_"))}`}
            className="hover:text-[#1a3a2a] transition"
          >
            {categoryLabel}
          </Link>
          <span>›</span>
          <span className="text-gray-600 truncate max-w-[120px]">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 w-full">
  {/* MAIN IMAGE */}
  <div className="relative w-full h-[420px] md:h-[520px] bg-white rounded-2xl flex items-center justify-center overflow-hidden">
    <img
      src={images[activeImg]}
      alt={product.name}
      className="max-h-full max-w-full object-contain"
    />

    {/* TAG */}
    {product.type === "VARIABLE" && (
      <span className="absolute top-3 left-3 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
        Variable weight
      </span>
    )}

    {/* ❤️ Wishlist */}
    <button
      onClick={() => setWishlisted((v) => !v)}
      className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition"
    >
      <Heart
        className={`w-4 h-4 ${
          wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
        }`}
      />
    </button>

    {/* ⬅️➡️ Navigation */}
    <button
      onClick={() =>
        setActiveImg((prev) => (prev - 1 + images.length) % images.length)
      }
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow"
    >
      <ChevronLeft className="w-4 h-4" />
    </button>

    <button
      onClick={() =>
        setActiveImg((prev) => (prev + 1) % images.length)
      }
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow"
    >
      <ChevronRight className="w-4 h-4" />
    </button>
  </div>

  {/* 🔽 THUMBNAILS BELOW */}
  <div className="flex gap-3 mt-4 overflow-x-auto">
    {images.map((img, index) => (
      <button
        key={`${img}-${index}`}
        onClick={() => setActiveImg(index)}
        className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition ${
        activeImg === index
          ? "border-[#1a3a2a] shadow-sm"
          : "border-gray-200 hover:border-[#1a3a2a]"
        }`}
      >
        <img
          src={img}
          alt={product.name}
          className="w-full h-full object-contain bg-white"
        />
      </button>
    ))}
  </div>
</div>

          <div className="p-5 md:p-7 flex flex-col">
            <div className="flex-1">
              <span className="inline-block text-xs font-bold text-[#1a3a2a] bg-[#e8f5e9] px-3 py-1 rounded-full mb-3">
                {categoryLabel}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${index < Math.round(averageRating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-gray-800">{averageRating.toFixed(1)}</span>
                <span className="text-gray-400 text-sm">({reviewCount} reviews)</span>
              </div>

              <div className="mb-4">
                <p className="text-xs font-bold text-gray-700 mb-2 tracking-wide">SELECT SIZE</p>
                <div className="flex gap-2 flex-wrap">
                  {displayVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition ${
                        selectedVariant?.id === variant.id
                          ? "bg-[#1a3a2a] text-white border-[#1a3a2a] shadow-sm"
                          : "border-gray-200 text-gray-600 hover:border-[#1a3a2a] bg-white"
                      }`}
                    >
                      {variant.weight} {variant.unit}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-extrabold text-gray-900">₹{displayPrice.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-400 mb-5">
                {selectedVariant ? `${selectedVariant.unit} ·` : product.type === "SIMPLE" ? "Single unit ·" : "Variable weight ·"} inclusive of all taxes
              </p>

             

              {product.description && (
                <div className="border-l-4 border-[#1a3a2a] pl-4 text-sm text-gray-600 italic mb-4 bg-[#f8faf6] py-2 rounded-r-xl">
                  {product.description}
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-700 mb-2">Benefits:</h3>
                <ul className="space-y-1">
                  {product.ProductBenefit && product.ProductBenefit.length > 0 ? (
                    product.ProductBenefit.map((benefit) => (
                      <li key={benefit.id} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {benefit.text}
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Improves performance and reliability
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Designed for easy setup and use
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Helps keep your garden healthy and thriving
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <span className="text-sm font-bold text-gray-700">QTY</span>
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-lg font-bold"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-extrabold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-lg font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-sm font-semibold text-[#1a3a2a]">= ₹{(displayPrice * qty).toLocaleString()}</span>
            </div>

            <div className="flex gap-3 mb-5">
              <button
                onClick={addToCart}
                className={`flex-1 border-2 rounded-2xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 transition ${
                  added ? "border-green-500 text-green-600 bg-green-50" : "border-[#1a3a2a] text-[#1a3a2a] hover:bg-[#1a3a2a] hover:text-white"
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={addToCart}
                className="flex-1 bg-[#1a3a2a] text-white rounded-2xl py-3.5 text-sm font-bold hover:bg-[#2d5a3d] transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                Buy Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#f8faf6] rounded-2xl p-4 border border-gray-100">
              {[
                { icon: Truck, label: "Free delivery\nabove ₹799" },
                { icon: Shield, label: "100%\nChemical-free" },
                { icon: Leaf, label: "Organically\nsourced" },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-1.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-white border border-green-100 flex items-center justify-center shadow-sm">
                    <badge.icon className="w-3.5 h-3.5 text-[#1a3a2a]" />
                  </div>
                  <span className="text-xs text-gray-500 leading-tight whitespace-pre-line">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <>
          <div className="mt-8 bg-white rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">How to Use Your {product.name}</h2>
            <ol className="space-y-4">
              {product.ProductUsage && product.ProductUsage.length > 0 ? (
                product.ProductUsage.map((usage, index) => (
                  <li key={usage.id} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#1a3a2a] text-white rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{usage.title}</h3>
                      {usage.description && <p className="text-sm text-gray-600">{usage.description}</p>}
                    </div>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#1a3a2a] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Prepare Your Garden Area</h3>
                      <p className="text-sm text-gray-600">Clear the planting area, loosen the soil, and make space for the product's best results.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#1a3a2a] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Choose the Right Application</h3>
                      <p className="text-sm text-gray-600">Use the product according to the task—whether planting, pruning, or maintaining your garden.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#1a3a2a] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Apply with Care</h3>
                      <p className="text-sm text-gray-600">Follow the recommended steps for your product type and ensure even coverage or placement.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#1a3a2a] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Maintain Regularly</h3>
                      <p className="text-sm text-gray-600">Check your garden frequently and take action to keep plants healthy and thriving.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#1a3a2a] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Store Properly</h3>
                      <p className="text-sm text-gray-600">Store the product and tools in a dry, cool place so they stay ready for the next use.</p>
                    </div>
                  </li>
                </>
              )}
            </ol>
          </div>

          <div className="mt-8 bg-white rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Frequently Bought Together</h2>
                <p className="text-sm text-gray-500 mt-1">Curated by our expert growers for best results</p>
              </div>
              <div className="hidden md:flex items-center gap-3 text-sm text-gray-500">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#f3faf4] text-[#1a3a2a] border border-[#dcecd9]">+</span>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#f3faf4] text-[#1a3a2a] border border-[#dcecd9]">+</span>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#f3faf4] text-[#1a3a2a] border border-[#dcecd9]">+</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
              <div className="relative rounded-3xl border border-[#1a3a2a] bg-[#f8faf6] p-4 text-center shadow-sm">
                <span className="absolute top-3 left-3 rounded-full bg-[#1a3a2a] text-white text-[10px] font-bold uppercase px-2 py-1">This item</span>
                <div className="h-28 w-full overflow-hidden rounded-2xl bg-white mb-4 flex items-center justify-center">
                  <img src={product.images[0]?.url || FALLBACK_IMAGES[0]} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                <p className="mt-2 text-lg font-bold text-[#1a3a2a]">₹{displayPrice.toLocaleString()}</p>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                <div className="h-28 w-full overflow-hidden rounded-2xl bg-[#f8faf6] mb-4 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1587486913044-1d0a4cac8d3e?w=400&h=400&fit=crop&q=80" alt="Lotus Seeds" className="h-full w-full object-cover" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Lotus Seeds</p>
                <p className="mt-2 text-lg font-bold text-[#1a3a2a]">₹140</p>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                <div className="h-28 w-full overflow-hidden rounded-2xl bg-[#f8faf6] mb-4 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&h=400&fit=crop&q=80" alt="Sunflower Seeds" className="h-full w-full object-cover" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Sunflower Seeds</p>
                <p className="mt-2 text-lg font-bold text-[#1a3a2a]">₹140</p>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                <div className="h-28 w-full overflow-hidden rounded-2xl bg-[#f8faf6] mb-4 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1524594154908-0b7a06b3a3a7?w=400&h=400&fit=crop&q=80" alt="Papaya Seeds" className="h-full w-full object-cover" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Papaya Seeds</p>
                <p className="mt-2 text-lg font-bold text-[#1a3a2a]">₹140</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-200 pt-4">
              <div>
                <p className="text-sm text-gray-500">Total for 4 items</p>
                <p className="text-2xl font-bold text-gray-900">₹1,219</p>
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1a3a2a] px-6 py-3 text-sm font-bold text-white hover:bg-[#2d5a3d] transition">
                <ShoppingCart className="w-4 h-4" /> Add All to Cart
              </button>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Reviews</h2>
                <p className="text-sm text-gray-500 mt-1">Read what customers are saying and add your own review.</p>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">from {reviewCount} reviews</span>
              </div>
            </div>

            <div className="space-y-5 mb-8">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-3xl border border-gray-100 bg-[#f8faf6] p-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${index < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-gray-100 bg-[#f8faf6] p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Leave a review</h3>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Rating</label>
                  <div className="flex items-center gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setReviewRating(value)}
                        className={`h-9 w-9 rounded-full border text-sm font-semibold transition ${
                          reviewRating === value
                            ? "bg-[#1a3a2a] text-white border-[#1a3a2a]"
                            : "bg-white text-gray-700 border-gray-200 hover:border-[#1a3a2a]"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="review-comment" className="text-sm font-semibold text-gray-700">Comment</label>
                  <textarea
                    id="review-comment"
                    value={reviewComment}
                    onChange={(event) => setReviewComment(event.target.value)}
                    rows={4}
                    className="mt-2 w-full rounded-3xl border border-gray-200 bg-white p-4 text-sm text-gray-700 focus:border-[#1a3a2a] focus:outline-none"
                    placeholder="Share your experience with this product."
                  />
                </div>

                <button
                  type="button"
                  onClick={addReview}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#1a3a2a] px-6 py-3 text-sm font-bold text-white hover:bg-[#2d5a3d] transition"
                >
                  Add Review
                </button>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}
