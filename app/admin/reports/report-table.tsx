"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type Formatter = {
  [key: string]: (value: any) => string;
};

interface Column {
  header: string;
  accessor: string;
  formatType?: keyof Formatter;
}

interface ReportTableProps {
  data: any[];
  columns: Column[];
  reportType: string;
}

const categoryMap: { [key: string]: string } = {
  "racoes-petiscos": "Rações e Petiscos",
  "roupas-brinquedos": "Roupas e Brinquedos",
  "farmacia-higiene": "Farmácia e Higiene",
  "coleiras-guias": "Coleiras e Guias",
  "camas-casas": "Camas e Casinhas",
  default: "Outros",
};

const formatters: Formatter = {
  boolean: (value) => (value ? "Sim" : "Não"),
  date: (value) => {
    if (!value || new Date(value).getTime() === 0) return "Nunca";
    return new Date(value).toLocaleDateString("pt-BR");
  },
  datetime: (value) => {
    if (!value || new Date(value).getTime() === 0) return "Nunca";
    const date = new Date(value);
    return `${date.toLocaleDateString("pt-BR")} ${date.toLocaleTimeString(
      "pt-BR"
    )}`;
  },
  currency: (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value),
  category: (value) => categoryMap[value] || categoryMap.default,
  default: (value) => value?.toString() || "-",
};

export default function ReportTable({
  data,
  columns,
  reportType,
}: ReportTableProps) {
  const formatValue = (value: any, formatType?: keyof Formatter) => {
    try {
      const formatter = formatType
        ? formatters[formatType]
        : formatters.default;
      return formatter(value);
    } catch (error) {
      return "-";
    }
  };

  const exportToCSV = () => {
    const now = new Date();
    const formattedDate = [
      now.getDate().toString().padStart(2, "0"),
      (now.getMonth() + 1).toString().padStart(2, "0"),
      now.getFullYear(),
    ].join("-");

    const csvContent = [
      "\ufeff" + // BOM para UTF-8
        columns.map((c) => `"${c.header}"`).join(";"),
      ...data.map((item) =>
        columns
          .map((c) => {
            const value = item[c.accessor];
            let formatted = formatValue(value, c.formatType);

            if (c.formatType === "datetime" && value) {
              const date = new Date(value);
              formatted =
                [
                  date.getDate().toString().padStart(2, "0"),
                  (date.getMonth() + 1).toString().padStart(2, "0"),
                  date.getFullYear(),
                ].join("/") +
                " " +
                [
                  date.getHours().toString().padStart(2, "0"),
                  date.getMinutes().toString().padStart(2, "0"),
                  date.getSeconds().toString().padStart(2, "0"),
                ].join(":");
            }

            return `"${formatted}"`;
          })
          .join(";")
      ),
    ].join("\r\n");

    const filename = `Relatório ${reportType} ${formattedDate}.csv`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button onClick={exportToCSV} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessor}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => {
                  const value = item[column.accessor];
                  return (
                    <TableCell key={column.accessor}>
                      {formatValue(value, column.formatType)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
