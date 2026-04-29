import { Container } from "@/components/Container"
import { HeroSlider } from "@/components/home/hero-slider"
import { CategoryGrid } from "@/components/home/category-grid"
import { ProductShowcase } from "@/components/home/product-showcase"
import { PromiseBanner } from "@/components/home/promise-banner"
import { WhyHadly } from "@/components/home/why-hadly"
import { Testimonials } from "@/components/home/testimonials"
import { Community } from "@/components/home/community"
import { FAQ } from "@/components/home/faq"
import {BlogStrip} from "@/components/home/blog-strip"

const featuredProducts = [
  {
    id: 1,
    name: "Organic Vermicompost",
    basePrice: 499,
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d",
  },
  {
    id: 2,
    name: "Tomato Seeds Premium",
    basePrice: 149,
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa",
  },
  {
    id: 3,
    name: "Garden Tool Kit",
    basePrice: 799,
    image: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c",
  },
  {
    id: 4,
    name: "Neem Cake Fertilizer",
    basePrice: 249,
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7",
  },
  {
    id: 5,
    name: "Organic Compost Mix",
    basePrice: 399,
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4",
  },
]

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">

      {/* Hero (FULL WIDTH) */}
      <HeroSlider />

      {/* ✅ CONSTRAINED CONTENT */}
      <div className="w-full">
        <Container>
          <CategoryGrid />
          <ProductShowcase title="Best Sellers" subtitle="Trusted by thousands of growers across India." products={featuredProducts} />
          <WhyHadly />
          <PromiseBanner />
          <Testimonials />
          <BlogStrip />
          <FAQ />
          <Community />          
        </Container>
      </div>

    </main>
  )
}