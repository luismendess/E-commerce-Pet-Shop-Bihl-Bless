"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAddToCart } from "@/hooks/use-add-to-cart";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string | null;
  stock?: number;
}

export function ProductCard({
  id,
  name,
  price,
  category,
  image,
}: ProductCardProps) {
  const addToCart = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({ id, name, price, image: image || "" });
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow group">
      <CardContent className="p-4 flex-grow">
        {/* Link apenas no conteúdo clicável */}
        <Link href={`/produtos/${id}`} className="block space-y-4">
          <div className="relative aspect-square">
            <Image
              src={image || "/images/placeholder-product.jpg"}
              alt={name}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {category ? category.replace(/-/g, " ") : "Sem categoria"}
            </p>
            <p className="text-xl font-bold text-primary">
              {price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </Link>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleAddToCart}
          asChild={false}
          type="button"
        >
          <span>Adicionar ao Carrinho</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
