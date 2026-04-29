"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { fetchProducts } from "@/lib/api/product";

const CAT_LABELS = {
  fertilizers: { label: "Organic Fertilizers", emoji: "🌿" },
  seeds: { label: "Seeds", emoji: "🌱" },
  tools: { label: "Garden Tools", emoji: "🪴" },
};

const isCategoryKey = (value: string): value is keyof typeof CAT_LABELS => value in CAT_LABELS;

const CAT_HEADER = {
  all: {
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1400&h=400&fit=crop&q=85",
    label: "All Products",
    sub: "Explore our complete range of fertilizers, seeds & tools for every gardener",
    badge: "Our Collection",
  },

  fertilizers: {
    image: "/categoryimages/fertilizers.png",
    label: "Organic Fertilizers",
    sub: "Chemical-free nutrition · Restore living soil · Trusted by 10,000+ growers",
    badge: "Best Seller Category",
  },

  seeds: {
    image: "/categoryimages/seeds.png",
    label: "Premium Seeds",
    sub: "High germination · Heirloom & hybrid varieties · Grown for Indian gardens",
    badge: "High Germination",
  },

  tools: {
    image: "/categoryimages/tools.png",
    label: "Garden Tools",
    sub: "Ergonomic design · Built to last · For every gardener",
    badge: "Premium Build",
  },
};

const SUB_CATEGORIES = {
  fertilizers: ["All", "Plant Nutrition", "Plant Protection"],
  seeds: ["All", "Leafy & Herbs", "Vegetable", "Fruits", "Flowers"],
  tools: ["All", "Hand Tools", "Watering", "Accessories"],
};

const TRUST_BADGES = [
  { icon: "🌿", text: "100% Organic" },
  { icon: "🔬", text: "Lab Tested" },
  { icon: "🚚", text: "Free Delivery ₹799+" },
  { icon: "🌱", text: "Grown with Care" },
];

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("cat") || "fertilizers";
  const selectedSub = searchParams.get("sub") || "All";
  const search = searchParams.get("q") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const categoryName =
          selectedCategory !== "all" && isCategoryKey(selectedCategory)
            ? CAT_LABELS[selectedCategory].label
            : undefined;

        const subCategoryName =
          selectedCategory !== "all" && selectedSub !== "All"
            ? selectedSub
            : undefined;

        const data = await fetchProducts({
          categoryName,
          subCategoryName,
        });

        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [selectedCategory, selectedSub]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "default") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/products?${params.toString()}`);
  };

  const filtered = useMemo(() => {
    let result = [...products];

    // Search filter (applies to all)
    if (search) {
      result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    return result;
  }, [products, selectedCategory, selectedSub, search]);

  const toProductCardData = (product: any) => {
    const image =
      Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]?.url
        : product.image;

    return {
      ...product,
      image: image || "/placeholder.png",
    };
  };

  const header = CAT_HEADER[selectedCategory as keyof typeof CAT_HEADER] || CAT_HEADER.fertilizers;

  return (
    <div className="bg-[#fafaf8] min-h-screen overflow-x-hidden">
      {/* ── Hero Banner ── */}
      <div className="relative h-52 md:h-72 overflow-hidden">
        <img src={header.image} alt={header.label} className="w-full h-full object-cover transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f12]/90 via-[#1a3a2a]/70 to-transparent" />
        {/* Floating badge */}
        <div className="absolute top-5 right-5 md:top-8 md:right-10 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          ✦ {header.badge}
        </div>
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-14 pb-8 md:pb-10">
          <p className="text-xs text-white/50 tracking-[0.2em] font-semibold mb-2">SHOP / {header.label.toUpperCase()}</p>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">{header.label}</h1>
          <p className="text-xs md:text-sm text-white/60 max-w-md">{header.sub}</p>
        </div>
      </div>

      {/* ── Trust Strip ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-6 md:gap-10">
          {TRUST_BADGES.map(b => (
            <div key={b.text} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <span>{b.icon}</span> {b.text}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ── Filters Row ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Main Category Tabs */}
          <div className="grid grid-cols-4 gap-1.5 w-full md:flex md:w-auto md:gap-2">
            {/* ALL Button */}
            <button
              onClick={() => {
                // Set cat=all and remove sub
                const params = new URLSearchParams(searchParams.toString());
                params.set("cat", "all");
                params.delete("sub");
                router.push(`/products?${params.toString()}`);
              }}
              className={`flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 px-1 py-2 md:px-4 rounded-2xl md:rounded-full text-xs font-semibold transition-all border ${
                selectedCategory === "all"
                  ? "bg-white text-[#1a3a2a] border-black font-bold shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#1a3a2a] hover:text-[#1a3a2a]"
              }`}
            >
              <span className="text-base md:text-sm">🛒</span>
              <span className="text-[10px] md:text-sm leading-tight text-center">ALL</span>
            </button>
            {/* Category Tabs */}
            {Object.entries(CAT_LABELS).map(([key, { label, emoji }]) => (
              <button
                key={key}
                onClick={() => {
                  // Set cat and reset sub to All
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("cat", key);
                  params.set("sub", "All");
                  router.push(`/products?${params.toString()}`);
                }}
                className={`flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 px-1 py-2 md:px-4 rounded-2xl md:rounded-full text-xs font-semibold transition-all border ${
                  selectedCategory === key
                    ? "bg-[#1a3a2a] text-white border-[#1a3a2a] shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#1a3a2a] hover:text-[#1a3a2a]"
                }`}
              >
                <span className="text-base md:text-sm">{emoji}</span>
                <span className="text-[10px] md:text-sm leading-tight text-center">{label}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 font-medium">{filtered.length} products found</p>
        </div>

        {/* Sub-category pills */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {(SUB_CATEGORIES[selectedCategory as keyof typeof SUB_CATEGORIES] || ["All"]).map(sub => (
            <button
              key={sub}
              onClick={() => updateParams("sub", sub)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                selectedSub === sub
                  ? "bg-[#e8f5e9] text-[#1a3a2a] border-[#1a3a2a]/30 shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-3xl bg-gray-100 h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🌱</p>
            <p className="text-gray-500 font-medium">No products found in this category yet.</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon — we're growing fast.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={toProductCardData(p)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}