import { prisma } from "@/lib/prisma";

export async function getBestsellers() {
  const data = await prisma.bestseller.findMany({
    where: { isActive: true },
    include: {
  Product: {
    include: {
      images: true,
      variants: true,
    },
  },
}
  });

  return data.map((item) => ({
  id: item.Product.id,
  name: item.Product.name,
  basePrice:
    item.Product.variants[0]?.price ??
    item.Product.price ??
    0,
  image: item.Product.images[0]?.url || "",
}));
}