import { prisma } from "@/lib/prisma";

// 🔧 Utility: Generate base slug
function generateBaseSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 🔥 Utility: Ensure UNIQUE slug (production-safe)
async function generateUniqueSlug(name: string) {
  const baseSlug = generateBaseSlug(name);

  let slug = baseSlug;
  let count = 1;

  while (true) {
    const existing = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existing) break;

    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}

// 🔧 Utility: Get computed price
function getComputedPrice(product: any) {
  if (product.type === "SIMPLE") return product.price ?? 0;

  if (product.type === "VARIABLE") {
    if (!product.variants || product.variants.length === 0) return 0;

    const minVariant = product.variants.reduce((min: any, v: any) =>
      v.price < min.price ? v : min
    );

    return minVariant.price;
  }

  return 0;
}

// ✅ CREATE PRODUCT (ADMIN)
export async function createProduct(data: any) {
  const {
    name,
    description,
    sku,
    categoryName,
    type,
    price,
    stock,
    variants,
    images,
  } = data;

  if (!name || !sku || !categoryName || !type) {
    throw new Error("Missing required fields");
  }

  // 🔥 UNIQUE slug
  const slug = await generateUniqueSlug(name);

  // ✅ Find or create category
  let category = await prisma.category.findFirst({
    where: {
      name: {
        equals: categoryName,
        mode: "insensitive",
      },
    },
  });

  if (!category) {
    category = await prisma.category.create({
      data: {
        name: categoryName,
      },
    });
  }

  // ✅ SIMPLE PRODUCT
  if (type === "SIMPLE") {
    if (price == null || stock == null) {
      throw new Error("Simple product must have price and stock");
    }

    return prisma.product.create({
      data: {
        name,
        slug,
        description,
        sku,
        type,
        categoryId: category.id,
        price,
        stock,
        images: {
          create:
            images?.map((url: string, index: number) => ({
              url,
              position: index,
            })) || [],
        },
      },
    });
  }

  // ✅ VARIABLE PRODUCT
  if (type === "VARIABLE") {
    if (!variants || variants.length === 0) {
      throw new Error("Variable product must have variants");
    }

    return prisma.product.create({
      data: {
        name,
        slug,
        description,
        sku,
        type,
        categoryId: category.id,
        variants: {
          create: variants.map((v: any) => ({
            weight: v.weight,
            unit: v.unit,
            price: v.price,
            stock: v.stock,
          })),
        },
        images: {
          create:
            images?.map((url: string, index: number) => ({
              url,
              position: index,
            })) || [],
        },
      },
    });
  }

  throw new Error("Invalid product type");
}

// ✅ GET PRODUCTS (SHOP PAGE)
// Enhanced: Supports parent (main) and subcategory (child) filtering for hierarchical categories
export async function getProducts({
  categoryId,
  parentCategoryId,
  subCategoryId,
  categoryName,
  subCategoryName,
}: {
  categoryId?: string;
  parentCategoryId?: string;
  subCategoryId?: string;
  categoryName?: string;
  subCategoryName?: string;
}) {
  const includeConfig = {
    images: { orderBy: { position: "asc" as const } },
    variants: true,
    category: {
      include: {
        parent: true,
      },
    },
  };

  const orderByConfig = { createdAt: "desc" as const };

  // If subCategoryId is provided, filter by subcategory only
  if (subCategoryId) {
    return prisma.product.findMany({
      where: { categoryId: subCategoryId },
      include: includeConfig,
      orderBy: orderByConfig,
    });
  }

  // If subCategoryName is provided, filter by subcategory name
  if (subCategoryName) {
    return prisma.product.findMany({
      where: {
        category: {
          name: {
            equals: subCategoryName,
            mode: "insensitive",
          },
          ...(categoryName
            ? {
                parent: {
                  name: {
                    equals: categoryName,
                    mode: "insensitive",
                  },
                },
              }
            : {}),
        },
      },
      include: includeConfig,
      orderBy: orderByConfig,
    });
  }

  // If parentCategoryId is provided, get all subcategories and filter products by those
  if (parentCategoryId) {
    return prisma.product.findMany({
      where: {
        category: {
          parentId: parentCategoryId,
        },
      },
      include: {
        images: { orderBy: { position: "asc" } },
        variants: true,
        category: {
          include: {
            parent: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  // If categoryName is provided, return products from the category and its subcategories
  if (categoryName) {
    return prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              name: {
                equals: categoryName,
                mode: "insensitive",
              },
            },
          },
          {
            category: {
              parent: {
                name: {
                  equals: categoryName,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      include: includeConfig,
      orderBy: orderByConfig,
    });
  }

  // If categoryId is provided (legacy), filter by that
  if (categoryId) {
    return prisma.product.findMany({
      where: { categoryId },
      include: includeConfig,
      orderBy: orderByConfig,
    });
  }

  // No filter, return all products
  return prisma.product.findMany({
    include: includeConfig,
    orderBy: orderByConfig,
  });
}

// ✅ GET PRODUCT BY SLUG (PRODUCT PAGE)
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { position: "asc" },
      },
      variants: true,
      category: true,
      ProductBenefit: true,
      ProductUsage: true,
    },
  });

  if (!product) return null;

  return {
    ...product,
    price: getComputedPrice(product),
  };
}

// ⚠️ GET PRODUCT BY ID (PRODUCT PAGE)
export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { position: "asc" },
      },
      variants: true,
      category: true,
      ProductBenefit: {
        orderBy: { position: "asc" },
      },
      ProductUsage: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!product) return null;

  return {
    ...product,
    price: getComputedPrice(product),
  };
}