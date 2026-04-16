"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTransactions } from "../../hooks/useTransactions";
import { Skeleton } from "../ui/skeleton";

export function WalletChart() {
  const { chartData, isChartLoading } = useTransactions();

  const displayData =
    chartData.length > 5
      ? chartData
      : Array.from({ length: 40 }).map((_, i) => ({
          date: `Apr ${Math.floor(i / 2) + 1}`,
          deposit: Math.floor(Math.random() * 5000) + 1000,
        }));

  return (
    <Card className="bg-card border-border flex flex-col h-full rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-foreground font-semibold text-xl">
          Overall Wallet Chart
        </CardTitle>
        <p className="text-sm text-text-muted">
          Showing your wallet balances over time
        </p>
      </CardHeader>
      <CardContent className="flex-1 mt-4">
        {isChartLoading ? (
          <Skeleton className="w-full h-full bg-border rounded-lg" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={displayData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="date"
                stroke="#666"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#666" }}
                interval={Math.floor(displayData.length / 6)} 
              />
              <Tooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                contentStyle={{
                  backgroundColor: "#111",
                  borderColor: "#333",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                itemStyle={{ color: "hsl(var(--accent-green))" }}
              />
              <Bar
                dataKey="deposit"
                fill="hsl(var(--accent-green))"
                radius={[2, 2, 0, 0]}
                barSize={4}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
