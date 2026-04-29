"use client"

import { useRef } from "react"
import { ArrowRight, Users, Sprout, Handshake, ChevronLeft, ChevronRight } from "lucide-react"

const items = [
  {
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&h=600&fit=crop&q=85",
    icon: Sprout,
    tag: "KNOWLEDGE",
    title: "Free Growing Guides",
    desc: "Expert-written guides on fertilizer application, seed sowing, and seasonal gardening.",
    stat: "50+ guides",
    statLabel: "published",
  },
  {
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&h=600&fit=crop&q=85",
    icon: Users,
    tag: "COMMUNITY",
    title: "Urban Garden Network",
    desc: "Thousands of growers sharing results, seasonal tips, and soil transformation stories.",
    stat: "10,000+",
    statLabel: "active growers",
  },
  {
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4e6?w=800&h=600&fit=crop&q=85",
    icon: Handshake,
    tag: "SOURCING",
    title: "Direct Farmer Partnerships",
    desc: "Sourced directly from trusted farmers across India.",
    stat: "100%",
    statLabel: "farm direct",
  },
]

export function Community() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" })
  }

  // 👉 REPLACE WITH YOUR ACTUAL LINK
  const WHATSAPP_LINK = "https://chat.whatsapp.com/YOUR_LINK"

  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest text-primary mb-2 uppercase">
              Community & Impact
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Growing Together.
              <br className="hidden md:block" />
              <span className="text-primary"> One Grower at a Time.</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-md">
              Urban gardeners, families, and farmers — building healthier soil together.
            </p>
          </div>

          {/* Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 scrollbar-hide"
        >
          {items.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="flex-shrink-0 w-72 md:w-auto bg-white rounded-3xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 md:h-52 overflow-hidden">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <div className="absolute top-4 left-4 text-xs font-bold bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    {item.tag}
                  </div>

                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xl font-extrabold">{item.stat}</p>
                    <p className="text-xs opacity-70">{item.statLabel}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                  </div>

                  <p className="text-xs text-muted-foreground flex-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="relative bg-primary rounded-3xl overflow-hidden mt-10">

          {/* Glow */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 50%, #25D366 0%, transparent 60%)",
            }}
          />

          <div className="relative grid md:grid-cols-2">

            {/* Left */}
            <div className="p-8 md:p-12 text-white">
              <p className="text-xs font-bold tracking-widest mb-4 text-green-300">
                JOIN THE MOVEMENT
              </p>

              <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
                Grow with India’s Largest Organic Community
              </h3>

              <p className="text-sm text-white/60 mb-6 max-w-sm">
                Get tips, seasonal advice, and connect with growers — all on WhatsApp.
              </p>

              <div className="flex gap-4 flex-wrap text-xs text-white/50">
                <span>🌿 Weekly tips</span>
                <span>🔒 No spam</span>
                <span>🎁 Offers</span>
              </div>
            </div>

            {/* Right CTA */}
            <div className="p-8 md:p-10 flex items-center justify-center md:justify-end">

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-2 hover:scale-105 transition shadow-xl"
              >
                Join on WhatsApp <ArrowRight size={16} />
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}