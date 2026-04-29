import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct } from "@/services/product.service";
import { requireAdmin } from "@/lib/auth"; // adjust path if needed

// ✅ GET PRODUCTS (PUBLIC)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const parentCategoryId = searchParams.get("parentCategoryId") || undefined;
    const subCategoryId = searchParams.get("subCategoryId") || undefined;
    const categoryName = searchParams.get("category") || undefined;
    const subCategoryName = searchParams.get("subCategory") || undefined;

    const products = await getProducts({
      categoryId,
      parentCategoryId,
      subCategoryId,
      categoryName,
      subCategoryName,
    });

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// ✅ CREATE PRODUCT (ADMIN ONLY)
export async function POST(req: NextRequest) {
  try {
    // 🔐 Admin check
    // await requireAdmin();

    const body = await req.json();

    const product = await createProduct(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}