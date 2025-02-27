"use client";

import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

export function useAddToCart() {
  const { addItem } = useCart();

  return (product: { 
    id: string;
    name: string;
    price: number;
    image?: string | null; // Torne opcional e permita null
  }) => {
    addItem({
      ...product,
      image: product.image || "/placeholder.svg" // Valor padrão
    });
    toast.success("Produto adicionado ao carrinho!");
  };
}