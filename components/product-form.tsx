"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/ui/file-upload";
import { SubmitHandler } from "react-hook-form";

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.string().min(1, "Preço é obrigatório"),
  description: z.string().optional().nullable(),
  image: z.union([z.string(), z.instanceof(FileList).refine((file) => !file || file.length === 0 || file[0]?.type.startsWith("image/")),]).optional().nullable(),
  category: z.string().min(1, "Categoria é obrigatória"),
  stock: z.string().min(1, "Estoque é obrigatório"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: {
    id: string;
    name: string;
    price: string;
    stock: string;
    category: string;
    description?: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  productId?: string;
  userId: string;
}

const categories = [
  "racoes-petiscos",
  "farmacia-higiene",
  "coleiras-guias",
  "camas-casas",
  "roupas-brinquedos",
  "diversos",
];

export default function ProductForm({initialData, productId, userId, }: ProductFormProps) {
  const router = useRouter();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      price: "",
      description: undefined,
      image: undefined,
      category: "",
      stock: "",
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      const formData = new FormData();
      const imageFile = data.image instanceof FileList ? data.image[0] : null;

      formData.append("name", data.name);
      formData.append("price", Number.parseFloat(data.price).toString());
      formData.append("category", data.category);
      formData.append("stock", Number.parseInt(data.stock).toString());

      if (data.description) formData.append("description", data.description);
      if (imageFile) formData.append("image", imageFile);
      if (typeof data.image === "string")
        formData.append("existingImage", data.image);

      const response = await fetch(
        `/api/products${productId ? `/${productId}` : ""}`,
        {
          method: productId ? "PUT" : "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro desconhecido");
      }

      toast.success(productId ? "Produto atualizado!" : "Produto criado!");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Erro detalhado:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Falha ao processar a requisição"
      );
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-8">
      <FormField
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input placeholder="Nome do produto" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" placeholder="99.90" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Descrição do produto"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Imagem do Produto</FormLabel>
            <FormControl>
              <div className="space-y-4">
                {typeof field.value === "string" && field.value && (
                  <div className="relative">
                    <img
                      src={field.value}
                      alt="Imagem atual"
                      className="h-48 w-full object-cover rounded-lg mb-4"
                    />
                    <span className="text-sm text-muted-foreground">
                      Imagem atual
                    </span>
                  </div>
                )}
                <FileUpload
                  onFileAccepted={(file: File) => {
                    const fileList = new DataTransfer();
                    fileList.items.add(file);
                    field.onChange(fileList.files);
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categoria</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
              </FormControl>
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
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estoque</FormLabel>
            <FormControl>
              <Input type="number" placeholder="100" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">
        {productId ? "Salvar alterações" : "Criar produto"}
      </Button>
    </Form>
  );
}
