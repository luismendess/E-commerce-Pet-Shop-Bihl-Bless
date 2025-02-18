"use client"

import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

export function useAddToCart() {
  const { addItem } = useCart()

  return (product: { id: number; name: string; price: number; image: string }) => {
    addItem(product)
    toast.success("Produto adicionado ao carrinho!")
  }
}

