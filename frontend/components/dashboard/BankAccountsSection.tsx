'use client';

import { useBankAccounts } from "../../hooks/useBankAccounts";
import { BankAccountCard } from "./BankAccountCard";
import { Skeleton } from "../ui/skeleton";

export function BankAccountsSection() {
  const { accounts, isLoading, deleteAccount } = useBankAccounts();

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-lg font-semibold text-text-muted">Associated Bank Accounts</h2>
      
      <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-25 w-full bg-card rounded-xl border border-border" />
          ))
        ) : accounts.length === 0 ? (
          <p className="text-text-muted text-sm col-span-full">No bank accounts found.</p>
        ) : (
          accounts.map((account) => (
            <BankAccountCard
              key={account.id}
              id={account.id}
              bankName={account.bankName}
              balance={account.balance}
              currency={account.currency}
              onDelete={(id) => deleteAccount.mutate(id)}
            />
          ))
        )}
      </div>
    </div>
  );
}