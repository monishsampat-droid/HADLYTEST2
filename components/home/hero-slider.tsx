"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const slides = [
  {
    image: "/categoryimages/fertilizers.png",
    tag: "ORGANIC FERTILIZERS",
    title: "Restore\nLiving Soil.",
    subtitle: "100% chemical-free · Vermicompost · Neem Cake · Seaweed",
    cta: { label: "Shop Fertilizers", link: "/products" },
    stat: { value: "10,000+", label: "growers trust us" },
  },
  {
    image: "/categoryimages/seeds.png",
    tag: "PREMIUM SEEDS",
    title: "Sow With\nConfidence.",
    subtitle: "High germination · Heirloom & hybrid · Grown for Indian gardens",
    cta: { label: "Shop Seeds", link: "/products?cat=seeds" },
    stat: { value: "95%+", label: "germination rate" },
  },
  {
    image: "/categoryimages/tools.png",
    tag: "Garden Tools",
    title: "Built for\nReal Growers.",
    subtitle: "Ergonomic desing · Durable build · For every gardener",
    cta: { label: "Shop Tools", link: "/products?cat=tools&sub=All" },
    stat: { value: "100%", label: "Durable" },
  },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const next = () => setCurrent((c) => (c + 1) % slides.length)
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)

  // Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return
    const delta = e.changedTouches[0].clientX - touchStartX.current

    if (delta > 50) prev()
    if (delta < -50) next()

    touchStartX.current = null
  }

  const slide = slides[current]

  return (
    <section
      className="relative h-[70vh] min-h-[420px] max-h-[720px] overflow-hidden bg-[#0a1f12]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={s.image} className="w-full h-full object-cover" />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f12]/90 via-[#0a1f12]/60 to-transparent" />

          {/* 🌿 Green glow */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 80%, #2d5a3d 0%, transparent 50%)",
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-end md:items-center px-6 md:px-20 pb-16 md:pb-0">
        <div className="text-white max-w-xl w-full">

          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-green-300">
              {slide.tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight whitespace-pre-line mb-3">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-white/70 mb-6 max-w-sm">
            {slide.subtitle}
          </p>

          {/* CTA + stats */}
          <div className="flex flex-wrap items-center gap-3">

            <Link
              href={slide.cta.link}
              className="inline-flex items-center gap-2 bg-white text-[#0a1f12] font-bold px-6 py-3 rounded-full hover:bg-green-50 transition text-sm shadow-xl"
            >
              {slide.cta.label} <ArrowRight size={16} />
            </Link>

            {/* 📱 Mobile stat pill */}
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 md:hidden">
              <span className="text-base font-extrabold text-amber-300">
                {slide.stat.value}
              </span>
              <span className="text-xs text-white/50">
                {slide.stat.label}
              </span>
            </div>

            {/* Desktop stat */}
            <div className="hidden md:block">
              <p className="text-2xl font-extrabold">
                {slide.stat.value}
              </p>
              <p className="text-xs text-white/40">
                {slide.stat.label}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-6 md:left-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? "w-10 bg-white" : "w-4 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* 🔢 Slide counter */}
      <div className="absolute bottom-5 right-6 text-white/30 text-xs font-mono">
        0{current + 1} / 0{slides.length}
      </div>
    </section>
  )
}