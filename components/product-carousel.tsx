"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface ProductCarouselProps {
  products: Product[]
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const itemsToShow = 4

  const nextSlide = () => {
    setCurrentIndex((current) => (current + itemsToShow >= products.length ? 0 : current + itemsToShow))
  }

  const prevSlide = () => {
    setCurrentIndex((current) => (current === 0 ? products.length - itemsToShow : current - itemsToShow))
  }

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isHovered]) // Removed nextSlide and products from dependencies

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[25%] px-3">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute -left-4 top-1/2 -translate-y-1/2",
          "h-8 w-8 rounded-full",
          "opacity-0 transition-opacity",
          isHovered && "opacity-100",
        )}
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute -right-4 top-1/2 -translate-y-1/2",
          "h-8 w-8 rounded-full",
          "opacity-0 transition-opacity",
          isHovered && "opacity-100",
        )}
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

