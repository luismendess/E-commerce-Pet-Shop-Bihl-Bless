import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProductForm from "@/components/product-form";

export default async function NewProductPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Novo Produto</h1>
      <div className="max-w-2xl">
        <ProductForm userId={session.user.id} />
      </div>
    </div>
  );
}