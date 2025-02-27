"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { Truck, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string | null;
  stock: number;
  description: string;
}

export default function ProductPage() {
  const addToCart = useAddToCart();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!params?.id) return;

        const productId = params.id.toString();
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) throw new Error("Falha ao carregar produto");

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params?.id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "/placeholder.svg",
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "/placeholder.svg",
    });
    router.push("/carrinho");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="text-3xl font-bold text-primary">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="flex-1"
              onClick={handleBuyNow}
            >
              Comprar Agora
            </Button>
          </div>

          <div className="space-y-4 pt-6">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <Truck className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Entrega Grátis</h3>
                <p className="text-sm text-muted-foreground">
                  Em compras acima de R$ 100
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <ShieldCheck className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Garantia de Qualidade</h3>
                <p className="text-sm text-muted-foreground">
                  Satisfação garantida ou seu dinheiro de volta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
