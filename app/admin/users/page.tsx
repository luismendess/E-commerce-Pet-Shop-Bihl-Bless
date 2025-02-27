import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportTable from "../reports/report-table";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    redirect("/login");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
      createdAt: true,
      lastLogin: true,
    },
  });

  const userStats = {
    total: users.length,
    admins: users.filter((u) => u.isAdmin).length,
    active: users.filter((u) => u.lastLogin).length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Relatório de Usuários</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Administradores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.admins}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ativos (30 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.active}</div>
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
              {header: "Último Login", accessor: "lastLogin", formatType: "datetime"},
              {header: "Cadastrado em", accessor: "createdAt", formatType: "datetime"},
            ]}
          />
    </div>
  );
}
