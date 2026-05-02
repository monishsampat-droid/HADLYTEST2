import { Container } from "@/components/Container"
import { HeroSlider } from "@/components/home/hero-slider"
import { CategoryGrid } from "@/components/home/category-grid"
import { ProductShowcase } from "@/components/home/product-showcase"
import { PromiseBanner } from "@/components/home/promise-banner"
import { WhyHadly } from "@/components/home/why-hadly"
import { Testimonials } from "@/components/home/testimonials"
import { Community } from "@/components/home/community"
import { FAQ } from "@/components/home/faq"
import { BlogStrip } from "@/components/home/blog-strip"

import { getBestsellers } from "@/services/bestseller.service";

export default async function Home() {
  const featuredProducts = await getBestsellers();

  return (
    <main className="flex flex-col min-h-screen">

      <HeroSlider />

      <div className="w-full">
        <Container>
          <CategoryGrid />

          <ProductShowcase
            title="Best Sellers"
            subtitle="Trusted by thousands of growers across India."
            products={featuredProducts}
          />

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