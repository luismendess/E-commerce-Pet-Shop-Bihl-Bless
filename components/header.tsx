"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartBadge } from "./cart-badge";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled && "shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.jpg"
              alt="Bihl Bless Pet Shop"
              width={80}
              height={80}
              className="rounded-full"
            />
            <span className="text-3xl font-bold text-primary">Bihl Bless</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/produtos" className="hover:text-primary">
              Produtos
            </Link>
            <Link
              href="https://wa.me/5543998630784?text=Olá!%20Gostaria%20de%20agendar%20um%20banho%20e%20tosa%20para%20meu%20pet."
              className="hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Banho e Tosa
            </Link>
            <Link href="/contato" className="hover:text-primary">
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/carrinho">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-20 w-20" />
                <CartBadge />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <User className="h-20 w-20" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
