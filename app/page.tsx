import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
//import { Bath, DogIcon as DogBowl, Heart, Package, Shirt } from "lucide-react"
import { Bath } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCarousel } from "@/components/product-carousel";

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

const featuredProducts = [
  {
    id: 1,
    name: "Ração Premium",
    price: 89.9,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Shampoo Antipulgas",
    price: 39.9,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Brinquedo Interativo",
    price: 59.9,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Cama Ortopédica",
    price: 199.9,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Coleira Ajustável",
    price: 45.9,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Petisco Natural",
    price: 29.9,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col ">
      {/* Hero Section */}
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

      {/* Categories */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="hover:shadow-lg transition-shadow font-bold border-gray-300">
                  <CardContent className="p-6 flex flex-col items-center gap-4">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={360}
                      height={360}
                      className="h-400 w-400 object-cover"
                    />
                    <span className="text-center">{category.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Produtos em Destaque
          </h2>
          <ProductCarousel products={featuredProducts} />
        </div>
      </section>

      {/* Grooming Services */}
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
                  <Bath className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Tosa Profissional</h3>
                <p className="text-sm text-slate-600">
                  Tosa higiênica ou estética realizada por profissionais
                  experientes
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bath className="h-8 w-8 text-primary" />
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
