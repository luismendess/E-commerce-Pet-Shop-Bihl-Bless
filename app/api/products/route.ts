import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: "Acesso não autorizado" }, 
        { status: 401 }
      );
    }

    const formData = await request.formData();

    // Validação dos campos
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const stock = Number(formData.get("stock"));
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    if (!name || !price || !category || !stock) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    let imagePath = null;
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `${uuidv4()}-${imageFile.name}`;
      const uploadPath = join(process.cwd(), "public/uploads", uniqueName);
      await writeFile(uploadPath, buffer);
      imagePath = `/uploads/${uniqueName}`;
    }

    // Criar produto no banco de dados
    const product = await prisma.product.create({
      data: {
        name,
        price,
        category,
        stock,
        description: description || null,
        image: imagePath,
        createdBy: session.user.id // Adicione esta linha
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}