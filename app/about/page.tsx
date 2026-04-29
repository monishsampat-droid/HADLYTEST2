"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

const stats = [
  { value: "2025", label: "Founded" },
  { value: "Bangalore", label: "Based in India" },
  { value: "10,000+", label: "Happy Growers" },
  { value: "100%", label: "Chemical-Free" },
]

const whyItems = [
  { icon: "🌿", title: "100% Organic & Natural", desc: "Made using natural ingredients that support healthy soil ecosystems." },
  { icon: "🌱", title: "Naturally Nutrient Rich", desc: "Provides essential nutrients that improve soil fertility and plant growth." },
  { icon: "🛡️", title: "Free From Pesticides & Chemicals", desc: "Safe for plants, soil microbes, and the environment." },
  { icon: "🔬", title: "Laboratory Tested Quality", desc: "Each batch is quality tested to ensure purity and consistent performance." },
  { icon: "🤝", title: "Trusted by 10,000+ Gardeners", desc: "Helping thousands of growers build healthier soil and stronger plants." },
]

const whoWeServe = [
  { emoji: "🏙️", label: "Urban & Balcony Gardeners", desc: "Growing plants in limited space with zero chemicals." },
  { emoji: "👨‍👩‍👧", label: "Health-Conscious Families", desc: "Wanting safe, chemical-free food grown at home." },
  { emoji: "🌾", label: "Small-Scale Farmers", desc: "Testing organic alternatives to break chemical dependency." },
  { emoji: "🌍", label: "Sustainability Advocates", desc: "Those who believe soil health is the foundation of everything." },
]

export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <div className="relative bg-[#0a1f12] overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #2d5a3d 0%, transparent 60%), radial-gradient(circle at 80% 20%, #4a7c5c 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-green-300">
                OUR MISSION
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Restoring the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
                foundation of health.
              </span>
            </h1>

            <p className="text-white/60 text-base leading-relaxed mb-4 max-w-lg">
              HADLY is on a mission to restore living soil. We manufacture 100% organic fertilizers for everyone — from first-time balcony gardeners to small-scale farmers across India.
            </p>

            <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-md italic border-l-2 border-green-400/40 pl-4">
              "Healthy people need healthy food. Healthy food needs living soil."
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-[#0a1f12] px-7 py-3.5 rounded-full text-sm font-bold hover:bg-green-50 transition"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="relative hidden md:flex flex-col gap-4">
            <img
              src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=700&h=500&fit=crop&q=85"
              alt="Living soil"
              className="w-full h-80 object-cover rounded-3xl"
            />

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-6 py-4 shadow-2xl">
              <p className="text-2xl font-bold text-[#1a3a2a]">
                Founded 2025
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Bangalore, India 🌱
              </p>
            </div>

            <div className="absolute -top-4 -right-4 bg-[#1a3a2a] text-white rounded-2xl px-5 py-3 shadow-xl">
              <p className="text-xl font-bold">10,000+</p>
              <p className="text-xs text-white/60">happy growers</p>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <p className="text-3xl font-extrabold text-[#1a3a2a]">
                {s.value}
              </p>
              <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#1a3a2a] font-semibold mb-3">
              THE PROBLEM
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              70% of Indian soil is <br />
              <span className="text-red-500">nutrient-deficient.</span>
            </h2>

            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                Chemical fertilizer overuse has depleted our soil for decades. Farmers are trapped in dependency cycles. Urban consumers want organic options but don't know where to start.
              </p>
              <p>
                We built HADLY to change that — product by product, garden by garden, grower by grower.
              </p>
            </div>

            <blockquote className="mt-6 border-l-4 border-[#1a3a2a] pl-5 py-1">
              <p className="text-sm font-semibold text-[#1a3a2a] italic">
                "Soil isn't dirt. It's a living ecosystem — and we've been killing it for decades."
              </p>
            </blockquote>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=700&h=500&fit=crop&q=80"
              alt="Soil health"
              className="rounded-3xl w-full h-72 object-cover shadow-lg"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* SOLUTION */}
      <div className="bg-[#f8faf6]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] text-[#1a3a2a] font-semibold mb-3">
              OUR SOLUTION
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Restore. Rebuild. Grow.
            </h2>
            <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
              HADLY organic fertilizers restore soil structure, rebuild microbial life, and deliver real, lasting results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "🌿", text: "Chemical-free formulation — safe for every garden" },
              { icon: "🥦", text: "Suitable for vegetables, flowers, herbs, and general gardening" },
              { icon: "🏡", text: "Works for kitchen pots, terrace gardens, and farm fields" },
              { icon: "📚", text: "Education-first approach — we don't just sell, we teach" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] text-[#1a3a2a] font-semibold mb-3">
            WHY HADLY?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Why Growers Choose <span className="text-[#2d5a3d]">Hadly</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyItems.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 bg-[#f8faf6] rounded-2xl px-5 py-5 border border-gray-100 hover:border-[#1a3a2a]/20 hover:shadow-md transition"
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-xl">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHO WE SERVE */}
      <div className="bg-[#0f2318]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] text-green-400 font-semibold mb-3">
              WHO WE SERVE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Built for every grower.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {whoWeServe.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-5 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
              >
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">
                    {item.label}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#f8faf6] border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-5xl mb-5">🌱</p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Living soil is the foundation. <br />
            <span className="text-[#2d5a3d]">Everything else follows.</span>
          </h2>

          <p className="text-sm text-gray-400 mb-8">
            Founded in 2025 · Bangalore, India · Building for India, scaling globally.
          </p>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#1a3a2a] text-white px-9 py-4 rounded-full text-sm font-bold hover:bg-[#2d5a3d] transition shadow-lg hover:shadow-xl"
          >
            Start Growing with HADLY <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  )
}