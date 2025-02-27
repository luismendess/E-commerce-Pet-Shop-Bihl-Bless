import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Package } from "lucide-react";
import ReportTable from "./report-table";
import CustomPieChart from "@/components/ui/pie-chart";
import { categoryMap } from "@/lib/categories";

export default async function ReportsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    redirect("/login");
  }

  const [users, products] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        lastLogin: true,
      },
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const userStats = {
    total: users.length,
    admins: users.filter((u) => u.isAdmin).length,
    newLastMonth: users.filter(
      (u) =>
        new Date(u.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length,
    active: users.filter(
      (u) =>
        u.lastLogin &&
        new Date(u.lastLogin) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length,
  };

  const categoryData = products.reduce(
    (acc: Record<string, number>, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    },
    {}
  );

  const productStats = {
    total: products.length,
    outOfStock: products.filter((p) => p.stock <= 0).length,
    categories: Object.keys(categoryData).length,
  };

  const chartData = Object.entries(categoryData).map(([key, value]) => ({
    name: categoryMap[key] || key,
    value: Number(value),
    color:
      {
        "racoes-petiscos": "#f54545",
        "roupas-brinquedos": "#58d8f5",
        "farmacia-higiene": "#1061e3",
        "coleiras-guias": "#05964d",
        "camas-casas": "#c26f34",
      }[key] || "#f7e702",
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="inline-flex gap-2 h-auto w-auto">
            <TabsTrigger value="users" className="px-4 py-2 text-sm md:text-base">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="px-4 py-2 text-sm md:text-base"
            >
              <Package className="h-4 w-4 mr-2" />
              Produtos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base">
                    Total de Usuários
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl font-bold">
                    {userStats.total}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base">
                    Administradores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl font-bold">
                    {userStats.admins}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base">
                    Novos (30 dias)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl font-bold">
                    {userStats.newLastMonth}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base">
                    Ativos (30 dias)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl font-bold">
                    {userStats.active}
                  </div>
                </CardContent>
              </Card>
            </div>
            <ReportTable
              data={users}
              reportType="Usuários"
              columns={[
                { header: "Nome", accessor: "name", formatType: "default" },
                { header: "Email", accessor: "email", formatType: "default" },
                { header: "Admin", accessor: "isAdmin", formatType: "boolean" },
                {
                  header: "Último Login",
                  accessor: "lastLogin",
                  formatType: "datetime",
                },
                {
                  header: "Cadastrado em",
                  accessor: "createdAt",
                  formatType: "datetime",
                },
              ]}
            />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base">
                    Produtos Cadastrados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl font-bold">
                    {productStats.total}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base">
                    Sem Estoque
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl font-bold">
                    {productStats.outOfStock}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base">
                    Categorias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl font-bold">
                    {productStats.categories}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Distribuição por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/2 h-[300px] md:h-[450px]">
                    <CustomPieChart data={chartData} />
                  </div>

                  <div className="w-full md:w-1/2">
                    <div
                      className={`
                        grid grid-cols-1
                        md:grid-cols-1        
                        lg:grid-cols-2
                        xl:grid-cols-2
                        gap-3
                      `}
                    >
                      {chartData.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-muted/5 rounded-lg border min-w-[200px]"
                        >
                          <div
                            className="w-4 h-4 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium break-words whitespace-normal">
                              {item.name}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {item.value} (
                              {(
                                (item.value / productStats.total) *
                                100
                              ).toFixed(1)}
                              %)
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ReportTable
              data={products}
              reportType="Produtos"
              columns={[
                { header: "Nome", accessor: "name", formatType: "default" },
                { header: "Preço", accessor: "price", formatType: "currency" },
                { header: "Estoque", accessor: "stock", formatType: "default" },
                {
                  header: "Categoria",
                  accessor: "category",
                  formatType: "category",
                },
                {
                  header: "Última Atualização",
                  accessor: "updatedAt",
                  formatType: "datetime",
                },
              ]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
