import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        image: true, 
        category: true,
        stock: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!product) {
      return NextResponse.json({ message: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar produto" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: "Acesso não autorizado" },
        { status: 401 }
      );
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: params.id }
    });

    return NextResponse.json(deletedProduct);

  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    return NextResponse.json(
      { 
        error: "Erro ao excluir produto",
        details: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const id = params.id;

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const stock = Number(formData.get("stock"));
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;
    const existingImage = formData.get("existingImage") as string;

    const existingProduct = await prisma.product.findUnique({ where: { id } });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let imagePath = existingImage || existingProduct.image;
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `${uuidv4()}-${imageFile.name}`;
      const uploadPath = join(process.cwd(), "public/uploads", uniqueName);
      await writeFile(uploadPath, buffer);
      imagePath = `/uploads/${uniqueName}`;
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        category,
        stock,
        description: description || null,
        image: imagePath,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      {
        error: "Error updating product",
        details: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );
  }
}