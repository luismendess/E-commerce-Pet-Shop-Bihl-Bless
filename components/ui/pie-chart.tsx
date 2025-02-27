"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export default function CustomPieChart({ data }: PieChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-[300px] md:h-[400px] w-full relative flex flex-col">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart
          margin={
            isMobile
              ? { top: 20, bottom: 100 }
              : { top: 20, right: 20, left: 20, bottom: 40 }
          }
        >
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={isMobile ? "65%" : "65%"}
            outerRadius={isMobile ? "100%" : "100%"}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`} 
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "calc(var(--radius) - 2px)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            itemStyle={{
              color: "hsl(var(--foreground))",
              fontSize: "0.875rem",
            }}
            formatter={(value, name) => [
              `${value} (${(
                (Number(value) /
                  data.reduce((acc, curr) => acc + curr.value, 0)) *
                100
              ).toFixed(1)}%)`,
              name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
