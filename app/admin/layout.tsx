import type React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Package, LayoutDashboard, BarChart } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full md:w-64 border-r bg-muted/40 p-4 md:p-6 space-y-2">
        <h2 className="text-lg font-semibold mb-4 md:mb-6">
          Painel Administrativo
        </h2>
        <nav className="space-y-1 md:space-y-2">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-sm md:text-base"
          >
            <Link href="/admin">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-sm md:text-base"
          >
            <Link href="/admin/products">
              <Package className="mr-2 h-4 w-4" />
              Produtos
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-sm md:text-base"
          >
            <Link href="/admin/users">
              <Users className="mr-2 h-4 w-4" />
              Usuários
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-sm md:text-base"
          >
            <Link href="/admin/reports">
              <BarChart className="mr-2 h-4 w-4" />
              Relatórios
            </Link>
          </Button>
        </nav>
      </aside>

      <main className="flex-1 overflow-x-hidden p-4 md:p-8">{children}</main>
    </div>
  );
}
