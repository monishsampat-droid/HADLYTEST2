"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const posts = [
  {
    slug: "why-70-percent-indian-soil-nutrient-deficient",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=700&h=450&fit=crop&q=80",
    tag: "SOIL HEALTH",
    title: "Why 70% of Indian Soil is Nutrient-Deficient (And How to Fix It)",
    desc: "Decades of chemical fertilizer overuse have stripped our soil of its natural microbial life. Here's what you can do about it.",
    date: "March 2026",
    readTime: "7 min",
    featured: true,
  },
  {
    slug: "starting-your-first-balcony-garden",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&h=450&fit=crop&q=80",
    tag: "BEGINNER GUIDE",
    title: "Starting Your First Balcony Garden: A Step-by-Step Guide",
    desc: "From choosing the right pots to picking seeds that thrive on a city balcony — everything a first-time grower needs.",
    date: "March 2026",
    readTime: "9 min",
  },
  {
    slug: "vermicompost-vs-chemical-fertilizers",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=700&h=450&fit=crop&q=80",
    tag: "COMPOSTING",
    title: "Vermicompost vs Chemical Fertilizers: What Science Actually Says",
    desc: "We break down the research on organic vs synthetic inputs — and why living soil always wins in the long run.",
    date: "February 2026",
    readTime: "8 min",
  },
  {
    slug: "best-vegetables-indian-summers",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4e6?w=700&h=450&fit=crop&q=80",
    tag: "GROWING TIPS",
    title: "The Best Vegetables to Grow in Indian Summers",
    desc: "Heat-tolerant, fast-growing vegetables that thrive in the Indian summer — with sowing tips and care guides.",
    date: "February 2026",
    readTime: "6 min",
  },
  {
    slug: "urban-gardeners-reclaiming-food-security",
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=700&h=450&fit=crop&q=80",
    tag: "URBAN FARMING",
    title: "How Urban Gardeners Are Reclaiming Food Security",
    desc: "Across Indian cities, a quiet movement is growing — one balcony, one terrace, one kitchen garden at a time.",
    date: "January 2026",
    readTime: "7 min",
  },
  {
    slug: "small-farmers-organic-transition",
    image: "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=700&h=450&fit=crop&q=80",
    tag: "ORGANIC FARMING",
    title: "Small Farmers & Organic Transition: What HADLY Learned",
    desc: "Working with small-scale farmers across Karnataka, we documented what works, what doesn't, and what matters most.",
    date: "January 2026",
    readTime: "10 min",
  },
];

const tagColors: Record<string, string> = {
  "SOIL HEALTH": "bg-brown-100 text-amber-800",
  "BEGINNER GUIDE": "bg-blue-50 text-blue-700",
  "COMPOSTING": "bg-green-50 text-green-700",
  "GROWING TIPS": "bg-emerald-50 text-emerald-700",
  "URBAN FARMING": "bg-indigo-50 text-indigo-700",
  "ORGANIC FARMING": "bg-[#e8f5e9] text-[#1a3a2a]",
};

export default function BlogsPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative bg-[#0a1f12] overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #2d5a3d 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <BookOpen className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-green-300">
              THE HADLY JOURNAL
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Grow Smarter.
          </h1>

          <p className="text-white/50 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
            Soil science, growing guides, organic farming insights, and stories from the ground up.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">

        {/* Featured */}
        <div className="mb-14">
          <p className="text-xs font-bold tracking-[0.2em] text-[#1a3a2a] mb-5">
            FEATURED STORY
          </p>

          <Link
            href={`/blog/${featured.slug}`}
            className="group grid md:grid-cols-2 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
          >
            <div className="overflow-hidden h-64 md:h-auto">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
            </div>

            <div className="p-8 md:p-10 bg-white flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColors[featured.tag]}`}>
                  {featured.tag}
                </span>
                <span className="text-xs text-gray-400">
                  {featured.readTime} read
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3">
                {featured.title}
              </h2>

              <p className="text-sm text-gray-500 mb-6">
                {featured.desc}
              </p>

              <div className="flex justify-between">
                <span className="text-xs text-gray-400">{featured.date}</span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-[#1a3a2a] group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid */}
        <p className="text-xs font-bold tracking-[0.2em] text-[#1a3a2a] mb-5">
          ALL ARTICLES
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="overflow-hidden h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tagColors[post.tag]}`}>
                    {post.tag}
                  </span>
                  <span className="text-xs text-gray-400">
                    {post.readTime} read
                  </span>
                </div>

                <h3 className="font-extrabold text-gray-900 text-sm mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                  {post.desc}
                </p>

                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-xs font-bold text-[#1a3a2a] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-[#0a1f12] rounded-3xl p-8 md:p-12 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-green-400 mb-3">
            STAY UPDATED
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
            Get growing tips in your inbox.
          </h2>

          <p className="text-sm text-white/50 mb-8 max-w-xs mx-auto">
            No spam. Just useful, soil-first content for every grower.
          </p>

          {subscribed ? (
            <div>
              <p className="text-3xl mb-2">🌱</p>
              <p className="font-bold text-white">
                You're in! Welcome to the family.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                className="w-full border border-white/20 bg-white/10 text-white placeholder-white/40 rounded-2xl px-5 py-3.5 text-sm"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                onClick={() => email && setSubscribed(true)}
                className="bg-white text-[#0a1f12] px-7 py-3.5 rounded-2xl text-sm font-bold hover:bg-green-50 transition"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}