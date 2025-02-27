"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bath, Scissors, SprayCan } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
//import { ProductCarousel } from "@/components/product-carousel";
import { useEffect, useState } from "react";
//import Skeleton from "@/components/ui/skeleton";

const categories = [
  {
    name: "Rações e Petiscos",
    image: "/images/categorias/racoes-petiscos.jpg",
    href: "/produtos?categoria=racoes-petiscos",
  },
  {
    name: "Farmácia e Higiene",
    image: "/images/categorias/farmacia-higiene.jpg",
    href: "/produtos?categoria=farmacia-higiene",
  },
  {
    name: "Coleiras e Guias",
    image: "/images/categorias/coleiras-guias.jpg",
    href: "/produtos?categoria=coleiras-guias",
  },
  {
    name: "Camas e Casas",
    image: "/images/categorias/camas-casas.jpg",
    href: "/produtos?categoria=camas-casas",
  },
  {
    name: "Roupas e Brinquedos",
    image: "/images/categorias/roupas-brinquedos.jpg",
    href: "/produtos?categoria=roupas-brinquedos",
  },
  {
    name: "Diversos",
    image: "/images/categorias/diversos.jpg",
    href: "/produtos?categoria=diversos",
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products/featured");
        if (!response.ok) throw new Error("Falha ao carregar destaques");
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Seção Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                Seu pet merece o melhor cuidado
              </h1>
              <p className="text-lg md:text-xl">
                Produtos de qualidade e serviços especializados para o bem-estar
                do seu melhor amigo
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/produtos">Ver Produtos</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary"
                >
                  <Link
                    href="https://wa.me/5543998630784?text=Olá!%20Gostaria%20de%20agendar%20um%20banho%20e%20tosa%20para%20meu%20pet."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agendar Banho
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/images/hero/hero1.jpg"
                alt="Cachorro feliz"
                width={1000}
                height={1000}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
            {" "}
            {/* Alterado */}
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="hover:shadow-lg transition-shadow font-bold border-gray-300 h-full flex flex-col">
                  <CardContent className="p-4 flex flex-col items-center gap-3 flex-1">
                    {" "}
                    <div className="relative aspect-square w-full min-h-[150px]">
                      {" "}
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <span className="text-center line-clamp-2 leading-tight text-sm px-1 font-medium">
                      {" "}
                      {category.name}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos em Destaque 
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Produtos em Destaque
          </h2>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-[400px] w-full rounded-lg" />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center text-destructive">
              <p>Erro ao carregar produtos: {error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Tentar novamente
              </Button>
            </div>
          )}

          {!loading && !error && (
            <ProductCarousel
              products={featuredProducts.map((product) => ({
                ...product,
                image: product.image || "/placeholder.svg",
              }))}
            />
          )}
        </div>
      </section>*/}

      {/* Seção Banho e Tosa */}
      <section className="py-16 bg-slate-100 text-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Banho e Tosa</h2>
            <p className="text-lg mb-8">
              Cuide do seu pet com nossos serviços profissionais de banho e
              tosa. Utilizamos produtos de alta qualidade e contamos com
              profissionais experientes para garantir o melhor tratamento para
              seu amigo.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bath className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Banho Premium</h3>
                <p className="text-sm text-slate-600">
                  Banho completo com produtos especializados para cada tipo de
                  pelagem
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Scissors className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Tosa Profissional</h3>
                <p className="text-sm text-slate-600">
                  Tosa higiênica ou estética realizada por profissionais
                  experientes
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <SprayCan className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Hidratação</h3>
                <p className="text-sm text-slate-600">
                  Tratamentos especiais para deixar o pelo do seu pet macio e
                  brilhante
                </p>
              </div>
            </div>
            <Button
              variant="default"
              size="lg"
              asChild
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Link
                href="https://wa.me/5543998630784?text=Olá!%20Gostaria%20de%20agendar%20um%20banho%20e%20tosa%20para%20meu%20pet."
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar Agora
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
