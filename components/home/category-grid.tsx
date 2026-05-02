import Link from "next/link"
import Image from "next/image"

const categories = [
  { name: "Fertilizers", image: "/icons/fertilizers.png", link: "/products?cat=fertilizers&sub=All" },
  { name: "Protection", image: "/icons/protection.png", link: "/products?cat=fertilizers&sub=Plant+Protection" },
  { name: "Veggie Seeds", image: "/icons/veggie-seeds.png", link: "/products?cat=seeds&sub=Vegetable" },
  { name: "Herb Seeds", image: "/icons/herb-seeds.png", link: "/products?cat=seeds&sub=Leafy+%26+Herbs" },
  { name: "Flower Seeds", image: "/icons/flowers.png", link: "/products?cat=seeds&sub=Flowers" },
  { name: "Fruit Seeds", image: "/icons/fruits.png", link: "/products?cat=seeds&sub=Fruits" },
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
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-6 justify-items-center">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={cat.link}
              className="group flex flex-col items-center gap-3"
            >
              {/* Icon box */}
              <div className="
                w-32 h-32 md:w-36 md:h-36
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
                  className="object-contain w-24 h-24 md:w-28 md:h-28 group-hover:scale-110 transition duration-300"
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