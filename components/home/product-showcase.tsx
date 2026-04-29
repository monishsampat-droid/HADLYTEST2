"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "../product/product-card"

type Product = {
  id: number
  name: string
  basePrice: number
  image: string
}

export function ProductShowcase({
  title = "Featured Products",
  subtitle = "Handpicked for you",
  products,
}: {
  title?: string
  subtitle?: string
  products: Product[]
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const visibleCards = 4

  const next = () => {
    setIndex((prev) =>
      prev >= products.length - visibleCards ? 0 : prev + 1
    )
  }

  const prev = () => {
    setIndex((prev) =>
      prev <= 0 ? products.length - visibleCards : prev - 1
    )
  }

  // Auto slide
  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {
      next()
    }, 3000)

    return () => clearInterval(interval)
  }, [paused])

  return (
    <section className="py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <p className="text-xs font-semibold tracking-widest text-primary mb-2 uppercase">
            Most loved
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* CAROUSEL */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          {/* TRACK */}
          <motion.div
            className="flex gap-4"
            animate={{
              x: `-${index * (100 / visibleCards)}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
          >
            {products.map((p) => (
              <div
                key={p.id}
                className="
                  flex-shrink-0
                  w-full
                  sm:w-1/2
                  md:w-1/3
                  lg:w-1/4
                "
              >
                <ProductCard product={p} />
              </div>
            ))}
          </motion.div>

          {/* LEFT BUTTON */}
          <button
            onClick={prev}
            className="
              absolute left-2 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 rounded-full
              bg-background/80 backdrop-blur
              border border-border
              flex items-center justify-center
              shadow hover:scale-105 transition
            "
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={next}
            className="
              absolute right-2 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 rounded-full
              bg-background/80 backdrop-blur
              border border-border
              flex items-center justify-center
              shadow hover:scale-105 transition
            "
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  )
}