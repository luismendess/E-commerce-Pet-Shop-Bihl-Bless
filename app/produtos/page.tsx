"use client";

import { ProductCard } from "@/components/product-card";
import Skeleton from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string | null;
  stock: number;
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Falha ao carregar produtos");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const category = searchParams.get("categoria");
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "todas" || product.category === selectedCategory
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-destructive">
        <p>Erro: {error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Nossos Produtos</h1>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[240px]">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as Categorias</SelectItem>
            <SelectItem value="racoes-petiscos">Rações e Petiscos</SelectItem>
            <SelectItem value="farmacia-higiene">Farmácia e Higiene</SelectItem>
            <SelectItem value="coleiras-guias">Coleiras e Guias</SelectItem>
            <SelectItem value="camas-casas">Camas e Casas</SelectItem>
            <SelectItem value="roupas-brinquedos">Roupas e Brinquedos</SelectItem>
            <SelectItem value="diversos">Diversos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              image={product.image}
              stock={product.stock}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-muted-foreground">
              Nenhum produto encontrado
            </h2>
            <p className="text-muted-foreground">
              {selectedCategory === "todas"
                ? "Estamos reabastecendo nosso estoque!"
                : `Não encontramos produtos na categoria "${selectedCategory.replace(
                    /-/g,
                    " "
                  )}"`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
