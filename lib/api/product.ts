const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type FetchProductsParams = {
  categoryId?: string;
  parentCategoryId?: string;
  subCategoryId?: string;
  categoryName?: string;
  subCategoryName?: string;
};

type ApiVariant = {
  id: string;
  weight: number;
  unit: string;
  price: number;
  stock: number;
};

type ApiImage = {
  url: string;
};

type ApiCategory = {
  id: string;
  name: string;
  parent?: {
    id: string;
    name: string;
  } | null;
};

type ApiProduct = {
  id: string;
  name: string;
  sku?: string;
  type: "SIMPLE" | "VARIABLE";
  price?: number | null;
  stock?: number | null;
  variants?: ApiVariant[];
  images?: ApiImage[];
  category?: ApiCategory | null;
};

// 🔧 Common fetch wrapper
async function apiFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    credentials: "include", // 🔥 important for auth (cookies)
    cache: "no-store",
    ...options,
  });

  if (!res.ok) {
    let errorMessage = "Something went wrong";

    try {
      const data = await res.json();
      errorMessage = data.error || errorMessage;
    } catch {}

    throw new Error(errorMessage);
  }

  return res.json();
}

// ✅ GET PRODUCTS
export async function fetchProducts(
  filters?: string | FetchProductsParams
) {
  const params = new URLSearchParams();

  if (typeof filters === "string") {
    params.set("categoryId", filters);
  } else if (filters) {
    if (filters.categoryId) params.set("categoryId", filters.categoryId);
    if (filters.parentCategoryId) {
      params.set("parentCategoryId", filters.parentCategoryId);
    }
    if (filters.subCategoryId) params.set("subCategoryId", filters.subCategoryId);
    if (filters.categoryName) params.set("category", filters.categoryName);
    if (filters.subCategoryName) {
      params.set("subCategory", filters.subCategoryName);
    }
  }

  const query = params.toString();
  const url = `${BASE_URL}/api/products${query ? `?${query}` : ""}`;
  const data = await apiFetch(url);

  return (data as ApiProduct[]).map((product) => {
    const minVariantPrice =
      product.variants && product.variants.length > 0
        ? Math.min(...product.variants.map((v) => v.price ?? 0))
        : 0;

    const basePrice =
      product.type === "SIMPLE"
        ? product.price ?? 0
        : minVariantPrice;

    const calculatedStock =
      product.stock ??
      (product.variants?.reduce((sum, variant) => sum + (variant.stock ?? 0), 0) ?? 0);

    const categoryName =
      product.category?.parent?.name ?? product.category?.name ?? "Uncategorized";

    return {
      id: product.id,
      name: product.name,
      sku: product.sku ?? "-",
      image: product.images?.[0]?.url || "/placeholder.png",
      images: product.images ?? [],
      basePrice,
      price: basePrice,
      stock: calculatedStock,
      category: categoryName,
      categoryName,
      subCategory: product.category?.parent ? product.category.name : null,
      variants:
        product.type === "VARIABLE"
          ? (product.variants ?? []).map((v) => ({
              id: v.id,
              label: `${v.weight} ${v.unit}`,
              price: v.price,
            }))
          : [],
    };
  });
}

// ✅ GET PRODUCT BY SLUG
export function fetchProductBySlug(slug: string) {
  return apiFetch(`${BASE_URL}/api/products/${slug}`);
}

// 🔐 ADMIN: CREATE PRODUCT
export function createProduct(data: any) {
  return apiFetch(`${BASE_URL}/api/products`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// 🔐 ADMIN: UPDATE PRODUCT
export function updateProduct(id: string, data: any) {
  return apiFetch(`${BASE_URL}/api/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// 🔐 ADMIN: DELETE PRODUCT
export function deleteProduct(id: string) {
  return apiFetch(`${BASE_URL}/api/products/${id}`, {
    method: "DELETE",
  });
}