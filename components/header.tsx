"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartBadge } from "./cart-badge";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  console.log("Session:", session);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.jpg"
              alt="Bihl Bless - Pet Shop"
              width={80}
              height={80}
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-primary">Bihl Bless</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/produtos" className="hover:text-primary">
              Produtos
            </Link>
            <Link
              href="https://wa.me/5543998630784"
              target="_blank"
              className="hover:text-primary"
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
                <ShoppingCart className="h-5 w-5" />
                <CartBadge />
              </Button>
            </Link>
            {session?.user?.isAdmin && (
              <Link href="/admin/products">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <Link href="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
