import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function PromiseBanner() {
  return (
    <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 mb-12">

      <div className="px-4 md:px-8 lg:px-12">

        <div className="relative rounded-3xl overflow-hidden h-72 md:h-80">

          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1600&h=700&fit=crop&q=90"
            className="w-full h-full object-cover"
            alt="Hadly Promise"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

          {/* Glow */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 5% 50%, #4a7c5c 0%, transparent 60%)",
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center text-white px-6 md:px-14">

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-green-300">
                HADLY PROMISE
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold mb-3 leading-tight">
              Restore Your Soil.
              <br />
              Grow Better Food.
            </h2>

            <p className="text-xs md:text-sm text-white/70 mb-6 max-w-sm">
              Chemical-free fertilizers, high-germination seeds, and tools —
              built for growers across India.
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link
                href="/products?cat=all"
                className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full text-sm hover:bg-gray-200 transition shadow-xl"
              >
                Shop All Products <ArrowRight size={16} />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-medium px-5 py-3 rounded-full text-sm hover:bg-white/10 transition backdrop-blur-sm"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Stat */}
          <div className="absolute bottom-5 right-6 hidden md:block text-right">
            <p className="text-3xl font-extrabold text-white">
              10,000+
            </p>
            <p className="text-xs text-black/70 font-bold">
              GROWERS ACROSS INDIA
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}