import Link from "next/link"
import Image from "next/image"

const categories = [
  { name: "Fertilizers", image: "/icons/fertilizers.png", link: "/products?cat=fertilizers&sub=All" },
  { name: "Protection", image: "/icons/protection.png", link: "/products?cat=fertilizers&sub=Plant+Protection" },
  { name: "Veggie Seeds", image: "/icons/veggie-seeds.png", link: "/products?cat=seeds&sub=Vegetable" },
  { name: "Herb Seeds", image: "/icons/herb-seeds.png", link: "/products?cat=seeds&sub=Leafy+%26+Herbs" },
  { name: "Flowers", image: "/icons/flowers.png", link: "/products?cat=seeds&sub=Flowers" },
  { name: "Tools", image: "/icons/tools.png", link: "/products?cat=tools" },
  { name: "Watering", image: "/icons/watering.png", link: "/products?cat=tools&sub=Watering" },
]

export function CategoryGrid() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-widest text-primary mb-2">
            SHOP BY CATEGORY
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Find What You Need
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={cat.link}
              className="group flex flex-col items-center gap-3"
            >
              {/* Icon box */}
              <div className="
                w-28 h-28 md:w-32 md:h-32
                rounded-2xl 
                bg-white 
                flex items-center justify-center 
                transition
                group-hover:shadow-md
                group-hover:-translate-y-1
              ">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={160}
                  height={160}
                  className="object-contain w-20 h-20 md:w-24 md:h-24 group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Label */}
              <span className="text-sm text-center font-medium text-muted-foreground group-hover:text-primary transition">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}