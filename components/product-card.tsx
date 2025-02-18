"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useAddToCart } from "@/hooks/use-add-to-cart"

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  const addToCart = useAddToCart()

  return (
    <Card>
      <CardContent className="p-4">
        <Link href={`/produtos/${id}`}>
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={200}
            height={200}
            className="rounded-lg w-full object-cover aspect-square"
          />
        </Link>
        <h3 className="mt-4 font-semibold">{name}</h3>
        <p className="text-lg font-bold text-primary">R$ {price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => addToCart({ id, name, price, image })}>
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  )
}

