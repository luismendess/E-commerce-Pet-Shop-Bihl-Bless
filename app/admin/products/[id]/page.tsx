import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProductForm from "@/components/product-form";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) return notFound();

  const initialData = {
    id: product.id,
    name: product.name,
    price: product.price.toString(),
    stock: product.stock.toString(),
    category: product.category,
    description: product.description || undefined,
    image: product.image || undefined,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Editar Produto</h1>
      <div className="max-w-2xl">
        <ProductForm
          userId={session.user.id}
          initialData={initialData}
          productId={product.id}
        />
      </div>
    </div>
  );
}