"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTransactions } from "../../hooks/useTransactions";
import { Skeleton } from "../ui/skeleton";

export function RecentTransactions() {
  const { transactions, isTransactionsLoading } = useTransactions();

  return (
    <Card className="bg-card border-border mt-6 rounded-2xl h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground font-semibold text-xl">
          Transaction History
        </CardTitle>
        <button className="text-text-muted hover:text-foreground">•••</button>
      </CardHeader>
      <CardContent className="space-y-3">
        {isTransactionsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full bg-border rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {(transactions.length > 0
              ? transactions.slice(0, 4)
              : [
                  {
                    id: "1",
                    type: "DEPOSIT",
                    amount: "21282",
                    currency: "GBP",
                    status: "Success",
                    date: "May 22,2025 , 6:35pm",
                    title: "Added to Wallet 1",
                  },
                  {
                    id: "2",
                    type: "WITHDRAWAL",
                    amount: "15750",
                    currency: "USD",
                    status: "Success",
                    date: "June 10,2025 , 2:15pm",
                    title: "Withdrawn",
                  },
                  {
                    id: "3",
                    type: "DEPOSIT",
                    amount: "7500",
                    currency: "EUR",
                    status: "Success",
                    date: "July 5,2025 , 11:45am",
                    title: "Added to Wallet 2",
                  },
                ]
            ).map((tx: any) => (
              <div
                key={tx.id}
                className="flex justify-between items-center p-4 bg-input border border-border/50 rounded-xl hover:border-border transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-foreground font-medium text-sm">
                    {tx.title ||
                      (tx.type === "DEPOSIT" ? "Added to Wallet" : "Withdrawn")}
                  </p>
                  <p className="text-2xl font-bold text-foreground tracking-tight mt-1">
                    {tx.type === "DEPOSIT" ? "+" : ""}
                    {Number(tx.amount).toLocaleString()}{" "}
                    <span className="text-sm text-foreground font-normal">
                      {tx.currency}
                    </span>
                  </p>
                  <p className="text-text-muted text-xs">
                    {tx.date || (tx.createdAt ? new Date(tx.createdAt).toLocaleString() : new Date().toLocaleString())}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-start h-full pb-8">
                  <span
                    className={`text-xs font-medium ${tx.status === "Pending" ? "text-pending" : "text-accent-green"}`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
