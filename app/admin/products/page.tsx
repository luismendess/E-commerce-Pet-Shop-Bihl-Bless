import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import DeleteProduct from "./delete-product";
import { categoryMap } from "@/lib/categories";

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    redirect("/login");
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto"> {/* Container fixo */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Gerenciar Produtos</h1>
          <Button asChild className="w-full md:w-auto">
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Link>
          </Button>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm md:text-base">Imagem</th>
                <th className="px-4 py-3 text-left text-sm md:text-base">Nome</th>
                <th className="px-4 py-3 text-left text-sm md:text-base">Preço</th>
                <th className="px-4 py-3 text-left text-sm md:text-base">Categoria</th>
                <th className="px-4 py-3 text-left text-sm md:text-base">Estoque</th>
                <th className="px-4 py-3 text-left text-sm md:text-base">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/10">
                  <td className="px-4 py-3">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm md:text-base">{product.name}</td>
                  <td className="px-4 py-3 text-sm md:text-base">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price)}
                  </td>
                  <td className="px-4 py-3 text-sm md:text-base">
                    {categoryMap[product.category] || product.category}
                  </td>
                  <td className="px-4 py-3 text-sm md:text-base">{product.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/products/${product.id}`}>
                          Editar
                        </Link>
                      </Button>
                      <DeleteProduct id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}