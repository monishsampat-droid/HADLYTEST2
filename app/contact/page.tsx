"use client"

import { useState, FormEvent } from "react"
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  MessageCircle,
  Clock,
  CheckCircle2,
} from "lucide-react"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[hsl(var(--background))] text-slate-900 dark:text-[hsl(var(--foreground))]">

      {/* ── Hero ── */}
      <div className="relative bg-[#0a1f12] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #2d5a3d 0%, transparent 60%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 py-20 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <MessageCircle className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-green-300">GET IN TOUCH</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight whitespace-nowrap">
            Let's grow together.
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-sm mx-auto">
            Questions about our products, want to partner with us, or just starting your soil journey — we're here.
          </p>
        </div>
      </div>

      {/* ── Quick Info Bar ── */}
      <div className="bg-[#f8faf6] dark:bg-[hsl(var(--muted))] border-b border-gray-100 dark:border-[hsl(var(--border))]">
        <div className="max-w-5xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Mail, label: "Email", value: "info@hadly.live" },
            { icon: Phone, label: "Call / WhatsApp", value: "+91 90190 53878" },
            { icon: MapPin, label: "Based in", value: "Bangalore, India" },
            { icon: Clock, label: "Response time", value: "Within 24 hours" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 dark:bg-[hsl(var(--background))] dark:border-[hsl(var(--border))]">
                <item.icon className="w-4 h-4 text-[#1a3a2a] dark:text-[hsl(var(--foreground))]" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-[hsl(var(--muted-foreground))]">{item.label}</p>
                <p className="text-xs font-bold text-gray-800 dark:text-[hsl(var(--foreground))]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* ── Left Panel ── */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#1a3a2a] dark:text-[hsl(var(--foreground))] mb-3">REACH US DIRECTLY</p>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-[hsl(var(--foreground))] mb-2">We're always here.</h2>
              <p className="text-sm text-gray-500 dark:text-[hsl(var(--muted-foreground))] leading-relaxed">Whether you have a soil question, a product query, or want to explore a partnership — drop us a message.</p>
            </div>

            {/* Response time */}
            <div className="bg-[#0a1f12] rounded-2xl p-5 text-white">
              <p className="text-xs text-white/50 mb-1">Average response time</p>
              <p className="text-3xl font-extrabold text-green-400">24 hrs</p>
              <p className="text-xs text-white/40 mt-1">Mon – Sat, 9 AM to 6 PM IST</p>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="md:col-span-3">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-[#f8faf6] dark:bg-[hsl(var(--muted))] rounded-3xl border border-gray-100 dark:border-[hsl(var(--border))]">
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-5 dark:bg-green-900/10 dark:border-green-800">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-[hsl(var(--foreground))] mb-2">Message received! 🌱</h3>
                <p className="text-gray-400 dark:text-[hsl(var(--muted-foreground))] text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#f8faf6] dark:bg-[hsl(var(--muted))] rounded-3xl p-7 border border-gray-100 dark:border-[hsl(var(--border))] space-y-5">
                <p className="text-xs font-bold tracking-[0.2em] text-[#1a3a2a] dark:text-[hsl(var(--foreground))] mb-2">SEND US A MESSAGE</p>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-[hsl(var(--foreground))] mb-2">Your name</label>
                    <input
                      className="w-full border border-gray-200 bg-white dark:bg-[hsl(var(--background))] dark:border-[hsl(var(--border))] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-[hsl(var(--foreground))] focus:outline-none focus:border-[#1a3a2a] transition"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-[hsl(var(--foreground))] mb-2">Email address</label>
                    <input
                      type="email"
                      className="w-full border border-gray-200 bg-white dark:bg-[hsl(var(--background))] dark:border-[hsl(var(--border))] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-[hsl(var(--foreground))] focus:outline-none focus:border-[#1a3a2a] transition"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-[hsl(var(--foreground))] mb-2">Phone number</label>
                    <input
                      type="tel"
                      className="w-full border border-gray-200 bg-white dark:bg-[hsl(var(--background))] dark:border-[hsl(var(--border))] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-[hsl(var(--foreground))] focus:outline-none focus:border-[#1a3a2a] transition"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-[hsl(var(--foreground))] mb-2">Subject</label>
                    <select
                      className="w-full border border-gray-200 bg-white dark:bg-[hsl(var(--background))] dark:border-[hsl(var(--border))] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-[hsl(var(--foreground))] focus:outline-none focus:border-[#1a3a2a] transition"
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    >
                      <option value="">Select a topic</option>
                      <option value="product">Product Enquiry</option>
                      <option value="order">Order Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="growing">Growing Help</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-[hsl(var(--foreground))] mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full border border-gray-200 bg-white dark:bg-[hsl(var(--background))] dark:border-[hsl(var(--border))] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-[hsl(var(--foreground))] focus:outline-none focus:border-[#1a3a2a] transition resize-none"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="How can we help you today?"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#1a3a2a] text-white px-8 py-4 rounded-2xl text-sm font-bold hover:bg-[#2d5a3d] transition shadow-md hover:shadow-lg"
                >
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
