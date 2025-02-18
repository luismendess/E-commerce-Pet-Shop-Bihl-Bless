"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star } from "lucide-react";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { cn } from "@/lib/utils";
import { Truck, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { use } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const addToCart = useAddToCart();
  const router = useRouter();

  const product = {
    id: Number.parseInt(resolvedParams.id),
    name: "Ração Premium",
    price: 89.9,
    rating: 4,
    reviewCount: 128,
    description:
      "Ração premium de alta qualidade para cães adultos. Formulada com ingredientes naturais e balanceados para uma nutrição completa.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    toast.success("Produto adicionado ao carrinho!");
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    toast.success("Produto adicionado ao carrinho!");
    router.push("/carrinho");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className="aspect-square relative">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < product.rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted-foreground"
                  )}
                />
              ))}
              <span className="text-muted-foreground">
                ({product.reviewCount} avaliações)
              </span>
            </div>

            <div className="text-3xl font-bold text-primary">
              R$ {product.price.toFixed(2)}
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
