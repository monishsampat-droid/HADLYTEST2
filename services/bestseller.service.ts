import { prisma } from "@/lib/prisma";

export async function getBestsellers() {
  const data = await prisma.bestseller.findMany({
    where: { isActive: true },
    include: {
      product: {   // ✅ FIXED
        include: {
          images: true,
          variants: true,
        },
      },
    },
  });

  return data.map((item) => ({
    id: item.product.id,   // ✅ FIXED
    name: item.product.name,
    basePrice:
      item.product.variants[0]?.price ??
      item.product.price ??
      0,
    image: item.product.images[0]?.url || "",
  }));
}