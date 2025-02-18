"use client";

import { ProductCard } from "@/components/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Ração Premium",
    price: 129.9,
    category: "racoes-petiscos",
    image: "/images/produtos/racao-premium.jpg",
  },
  {
    id: 2,
    name: "Shampoo Antipulgas",
    price: 39.9,
    category: "farmacia-higiene",
    image: "/images/produtos/shampoo-antipulgas.JPG",
  },
  {
    id: 3,
    name: "Coleira de Couro",
    price: 59.9,
    category: "coleiras-guias",
    image: "/images/produtos/coleira-couro.jpg",
  },
  {
    id: 4,
    name: "Ração Filhotes",
    price: 89.9,
    category: "racoes-petiscos",
    image: "/images/produtos/racao-filhotes.JPG",
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("categoria");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  // Filtramos os produtos baseado na categoria selecionada
  const filteredProducts =
    selectedCategory === "todas"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as categorias</SelectItem>
            <SelectItem value="racoes-petiscos">Rações e Petiscos</SelectItem>
            <SelectItem value="farmacia-higiene">Farmácia e Higiene</SelectItem>
            <SelectItem value="coleiras-guias">Coleiras e Guias</SelectItem>
            <SelectItem value="camas-casas">Camas e Casas</SelectItem>
            <SelectItem value="roupas-brinquedos">
              Roupas e Brinquedos
            </SelectItem>
            <SelectItem value="diversos">Diversos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 
        Usamos um operador ternário para decidir se mostramos os produtos
        ou a mensagem de "sem produtos". A mensagem aparece centralizada
        na tela com um estilo amigável.
      */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <p className="text-xl text-gray-600 mb-2">
            Estamos sem produtos desse tipo no momento, sentimos muito.
          </p>
          <p className="text-gray-500">
            Mas estamos providenciando o mais rápido possível!
          </p>
        </div>
      )}
    </div>
  );
}
