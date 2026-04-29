import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getProductBySlug, getProductById } from "@/services/product.service";
import { requireAdmin } from "@/lib/auth";

// 🔧 Extract last segment
function getParam(req: Request) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  return segments[segments.length - 1];
}

// ✅ GET → treat as ID or slug
export async function GET(req: Request) {
  try {
    const id = getParam(req);

    // First try as ID
    let product = await getProductById(id);
    
    // If not found, try as slug
    if (!product) {
      product = await getProductBySlug(id);
    }

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// ✅ PATCH → treat as id
export async function PATCH(req: Request) {
  try {
    await requireAdmin();

    const id = getParam(req);
    const body = await req.json();

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
    } = body;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Category handling
    let category = null;
    if (categoryName) {
      category = await prisma.category.findFirst({
        where: {
          name: {
            equals: categoryName,
            mode: "insensitive",
          },
        },
      });

      if (!category) {
        category = await prisma.category.create({
          data: { name: categoryName },
        });
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        sku,
        type,
        price,
        stock,
        ...(category && { categoryId: category.id }),
      },
    });

    // Replace variants
    if (type === "VARIABLE") {
      await prisma.productVariant.deleteMany({
        where: { productId: id },
      });

      if (variants?.length) {
        await prisma.productVariant.createMany({
          data: variants.map((v: any) => ({
            productId: id,
            weight: v.weight,
            unit: v.unit,
            price: v.price,
            stock: v.stock,
          })),
        });
      }
    }

    // Replace images
    if (images) {
      await prisma.productImage.deleteMany({
        where: { productId: id },
      });

      await prisma.productImage.createMany({
        data: images.map((url: string, index: number) => ({
          productId: id,
          url,
          position: index,
        })),
      });
    }

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}

// ✅ DELETE PRODUCT (ADMIN)
export async function DELETE(req: Request) {
  try {
    await requireAdmin(); // 🔐 keep this (comment only for testing)

    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Delete related data first (safe cleanup)
    await prisma.productVariant.deleteMany({
      where: { productId: id },
    });

    await prisma.productImage.deleteMany({
      where: { productId: id },
    });

    // Delete product
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}