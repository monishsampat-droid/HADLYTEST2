"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const reviews = [
  {
    name: "Priya Sharma",
    location: "Bangalore",
    avatar: "PS",
    rating: 5,
    text: "My tomato plants transformed in just 3 weeks!",
    tag: "Terrace Gardener",
  },
  {
    name: "Ravi Menon",
    location: "Chennai",
    avatar: "RM",
    rating: 5,
    text: "Soil feels alive again. Yield improved significantly.",
    tag: "Farmer",
  },
  {
    name: "Ananya Iyer",
    location: "Mumbai",
    avatar: "AI",
    rating: 5,
    text: "Neem cake worked wonders. Totally chemical-free.",
    tag: "Balcony Gardener",
  },
  {
    name: "Suresh Kumar",
    location: "Hyderabad",
    avatar: "SK",
    rating: 5,
    text: "Customer support helped me choose perfectly.",
    tag: "Home Gardener",
  },
  {
    name: "Deepa Nair",
    location: "Kochi",
    avatar: "DN",
    rating: 5,
    text: "Perfect gift for beginners. Very helpful guide.",
    tag: "Urban Gardener",
  },
]

function Stars() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const visibleCards = 3
  const totalSlides = reviews.length - visibleCards + 1

  const cardWidth = 320 + 24 // card width + gap

  const next = () => {
    setIndex((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setIndex((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1))
  }

  useEffect(() => {
    if (paused) return
    const interval = setInterval(next, 3000)
    return () => clearInterval(interval)
  }, [paused])

  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-10">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            Real Results from Real Growers
          </h2>
          <p className="text-lg mt-2 text-muted-foreground">
            Across India — balconies to farms
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative overflow-visible"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          {/* LEFT ARROW */}
          <button
            onClick={prev}
            className="absolute -left-20 top-1/2 -translate-y-1/2 bg-white border border-border shadow-md p-3 rounded-full hover:scale-110 transition z-10"
          >
            <ChevronLeft size={18} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            className="absolute -right-20 top-1/2 -translate-y-1/2 bg-white border border-border shadow-md p-3 rounded-full hover:scale-110 transition z-10"
          >
            <ChevronRight size={18} />
          </button>

          {/* VIEWPORT (FIXED CLIPPING HERE) */}
          <div className="overflow-hidden pt-4 pb-6">
            <motion.div
              className="flex gap-6"
              animate={{ x: -index * cardWidth }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="min-w-[320px] bg-white border border-border shadow-md rounded-2xl p-6 flex flex-col gap-4"
                >
                  <Stars />

                  <p className="text-sm text-muted-foreground italic flex-1">
                    "{r.text}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {r.avatar}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {r.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {r.tag} · {r.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalSlides)].map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}