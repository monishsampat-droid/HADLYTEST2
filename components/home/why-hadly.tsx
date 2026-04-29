import { Leaf, Sprout, ShieldCheck, FlaskConical, Users } from "lucide-react"

const reasons = [
  {
    icon: Leaf,
    title: "100% Organic & Natural",
    desc: "Made using natural ingredients that support healthy soil ecosystems.",
  },
  {
    icon: Sprout,
    title: "Nutrient Rich",
    desc: "Improves soil fertility and promotes stronger plant growth.",
  },
  {
    icon: ShieldCheck,
    title: "Chemical Free",
    desc: "Safe for plants, soil microbes, and the environment.",
  },
  {
    icon: FlaskConical,
    title: "Lab Tested Quality",
    desc: "Every batch is tested for purity and consistent performance.",
  },
  {
    icon: Users,
    title: "Trusted by 10,000+ Growers",
    desc: "Helping thousands build healthier soil and stronger plants.",
  },
]

export function WhyHadly() {
  return (
    <section className="py-16 md:py-20 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT: Image */}
          <div className="relative order-2 md:order-1">

            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&h=700&fit=crop&q=85"
              alt="Healthy plants"
              className="rounded-3xl w-full h-64 sm:h-80 md:h-[480px] object-cover shadow-xl"
            />

            {/* Bottom badge */}
            <div className="absolute -bottom-5 right-2 sm:right-4 md:-right-5 bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-2xl">
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold">
                10,000+
              </p>
              <p className="text-[10px] sm:text-xs opacity-80">
                happy growers
              </p>
            </div>

            {/* Top badge */}
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur border border-border rounded-xl px-3 py-2 flex items-center gap-2 shadow">
              <span className="text-primary">✓</span>
              <p className="text-[10px] sm:text-xs font-semibold text-foreground">
                Lab Tested Quality
              </p>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="order-1 md:order-2">

            <p className="text-xs font-bold tracking-widest text-primary mb-3">
              WHY HADLY?
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 leading-tight text-foreground">
              Why Growers Choose{" "}
              <span className="text-primary">Hadly</span>
            </h2>

            <p className="text-sm text-muted-foreground mb-8 max-w-md">
              We’re building a movement to restore living soil across India.
            </p>

            {/* Cards */}
            <div className="space-y-4">
              {reasons.map((r, i) => {
                const Icon = r.icon

                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-background rounded-2xl px-4 sm:px-5 py-4 border border-border 
                    hover:border-primary/30 hover:shadow-md transition-all duration-200"
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="font-semibold text-sm text-foreground mb-1">
                        {r.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}