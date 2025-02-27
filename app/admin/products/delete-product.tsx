"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteProductProps {
  id: string;
}

export default function DeleteProduct({ id }: DeleteProductProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm("Tem certeza que deseja excluir este produto permanentemente?")
    ) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha na exclusão");
      }

      toast.success("Produto excluído com sucesso!");

      router.refresh();

      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);
    } catch (error) {
      console.error("Erro detalhado:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao se comunicar com o servidor"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isLoading}
    >
      <Trash2 className="h-4 w-4 mr-2" />
      {isLoading ? "Excluindo..." : "Excluir"}
    </Button>
  );
}
