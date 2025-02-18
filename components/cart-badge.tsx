"use client"

import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

export function CartBadge() {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  if (totalItems === 0) return null

  return (
    <span
      className={cn(
        "absolute -top-2 -right-2",
        "min-w-[20px] h-5",
        "flex items-center justify-center",
        "rounded-full bg-primary text-primary-foreground",
        "text-xs font-medium",
        "px-1",
      )}
    >
      {totalItems > 9 ? "+9" : totalItems}
    </span>
  )
}

