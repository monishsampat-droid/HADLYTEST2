"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, BookOpen } from "lucide-react"

const posts = [
  {
    slug: "soil-nutrient-deficiency",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d",
    tag: "SOIL HEALTH",
    title: "Why 70% of Indian Soil is Nutrient-Deficient (And How to Fix It)",
    desc: "Decades of chemical overuse have stripped our soil of its natural microbial life.",
    date: "March 2026",
    readTime: "7 min read",
  },
  {
    slug: "balcony-garden-guide",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
    tag: "BEGINNER GUIDE",
    title: "Starting Your First Balcony Garden: A Step-by-Step Guide",
    desc: "Everything a first-time grower needs — from pots to picking the right seeds.",
    date: "March 2026",
    readTime: "9 min read",
  },
  {
    slug: "vermicompost-vs-chemical",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
    tag: "COMPOSTING",
    title: "Vermicompost vs Chemical Fertilizers: What Science Actually Says",
    desc: "We break down the research — and why living soil always wins in the long run.",
    date: "February 2026",
    readTime: "8 min read",
  },
  {
    slug: "summer-vegetables",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4e6",
    tag: "GROWING TIPS",
    title: "The Best Vegetables to Grow in Indian Summers",
    desc: "Heat-tolerant, fast-growing vegetables that thrive in the Indian climate.",
    date: "February 2026",
    readTime: "6 min read",
  },
]

export function BlogStrip() {
  const [index, setIndex] = useState(0)

  const cardWidth = 360 + 24

  const next = () => {
    setIndex((prev) => (prev >= posts.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setIndex((prev) => (prev <= 0 ? posts.length - 1 : prev - 1))
  }

  return (
    <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 py-16 bg-[#f8faf6]">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-end justify-between mb-10">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
                <BookOpen size={12} className="text-white" />
              </div>
              <p className="text-xs font-bold tracking-widest text-primary uppercase">
                THE HADLY JOURNAL
              </p>
            </div>

            <h2 className="text-3xl font-extrabold">
              Grow Smarter.{" "}
              <span className="text-primary">Read More.</span>
            </h2>

            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Soil science, growing guides & organic farming stories — straight from the field.
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-3">

            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition"
            >
              <ChevronRight size={18} />
            </button>

            <Link
              href="/blogs"
              className="flex items-center gap-2 border border-border px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition"
            >
              View All Blogs <ArrowRight size={14} />
            </Link>

          </div>
        </div>

        {/* SLIDER */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: -index * cardWidth }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >

            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="min-w-[360px]"
              >
                <div className="bg-white rounded-3xl border border-border overflow-hidden hover:shadow-lg transition">

                  {/* IMAGE */}
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-3 left-3 text-[10px] font-bold bg-white px-2 py-1 rounded-full">
                      {post.tag}
                    </div>

                    <div className="absolute top-3 right-3 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-full">
                      {post.readTime}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">

                    <h3 className="text-sm font-bold leading-snug mb-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-muted-foreground mb-4">
                      {post.desc}
                    </p>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">
                        {post.date}
                      </span>

                      <span className="flex items-center gap-1 font-semibold text-primary">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>

                  </div>

                </div>
              </Link>
            ))}

          </motion.div>
        </div>

      </div>
    </section>
  )
}