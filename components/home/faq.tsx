"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "How can I ensure my plants thrive and flourish?",
    a: "Healthy soil, proper watering, balanced nutrients, pest prevention, and adequate sunlight are key to thriving plants.",
  },
  {
    q: "How much time do I need for gardening?",
    a: "Typically 1–2 hours per week is enough with proper planning and use of organic products.",
  },
  {
    q: "Why choose organic gardening?",
    a: "It promotes healthier plants, safer food, and improves soil biodiversity without harmful chemicals.",
  },
  {
    q: "Is soil alone enough for plant growth?",
    a: "Not always — soil may need amendments to improve nutrients, structure, and microbial activity.",
  },
  {
    q: "How do I know my plants need nutrients?",
    a: "Signs include yellowing leaves, slow growth, weak stems, and poor flowering.",
  },
  {
    q: "Can I use kitchen waste as fertilizer?",
    a: "Yes! Composting kitchen waste creates nutrient-rich organic fertilizer for plants.",
  },
]

function FAQItem({
  item,
  index,
  open,
  setOpen,
}: {
  item: any
  index: number
  open: number | null
  setOpen: (i: number | null) => void
}) {
  const isOpen = open === index

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-background transition-all">

      {/* Button */}
      <button
        onClick={() => setOpen(isOpen ? null : index)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <div className="flex items-center gap-4">

          {/* Number */}
          <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Question */}
          <span className="text-sm md:text-base font-semibold">
            {item.q}
          </span>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Answer */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pl-[4.25rem] text-sm text-muted-foreground leading-relaxed">
            {item.a}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-16 md:py-20 bg-background">

      {/* ✅ PERFECT CENTER WRAPPER */}
      <div className="max-w-3xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-widest text-primary font-semibold mb-2">
            GOT QUESTIONS?
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="text-sm text-muted-foreground mt-3">
            Everything you need to know about growing healthy plants.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 text-left">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              open={open}
              setOpen={setOpen}
            />
          ))}
        </div>

      </div>
    </section>
  )
}