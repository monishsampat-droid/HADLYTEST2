"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "../product/product-card"

export function ProductShowcase({
  title = "Best Sellers",
  subtitle = "Trusted by thousands of growers across India.",
  products = [],
}: {
  title?: string
  subtitle?: string
  products: any[] // Matches the Product type in your card
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const visibleCards = 4
  const percentageWidth = 100 / visibleCards
  const maxIndex = Math.max(0, products.length - visibleCards)

  const next = () => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prev = () => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  useEffect(() => {
    if (paused) return
    const interval = setInterval(next, 3000)
    return () => clearInterval(interval)
  }, [paused, maxIndex, index])

  if (!products.length) return null

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-primary mb-1 uppercase">
              Most Loved
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-lg">{subtitle}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="flex gap-4 md:gap-5"
            animate={{ x: `-${index * percentageWidth}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(25%-15px)] relative"
              >
                <div className="relative h-full">
                  {/* Your Specific Product Card UI */}
                  <ProductCard product={product} />
                  
                  {/* Floating Badge (Matches image_96df3d.png styling) */}
                  <div className="absolute top-6 left-6 pointer-events-none z-10">
                    <span className="bg-[#fbbf24] text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      Best Seller
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}