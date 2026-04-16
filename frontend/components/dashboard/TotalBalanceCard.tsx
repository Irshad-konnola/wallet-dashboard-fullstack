'use client';

import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { AddBankAccountModal } from "../modals/AddBankAccountModal";
import { TransactionModal } from "../modals/TransactionModal";
import { useWallets } from "../../hooks/useWallets";
import { Skeleton } from "../ui/skeleton";

export function TotalBalanceCard() {
  const { wallets, isLoading, deposit, withdraw } = useWallets();

  const totalBalance = wallets.reduce((sum, wallet) => sum + Number(wallet.balance), 0);

  return (
    <Card className="bg-card border-border rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold  mb-8 text-white">Total Balance</h2>
        
        <div className="mb-6 h-18">
          {isLoading ? (
            <Skeleton className="h-12 w-48 bg-border rounded-lg" />
          ) : (
            <>
              <h1 className="text-5xl font-bold text-accent-green tracking-tight">
                ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h1>
              <p className="text-sm text-text-muted mt-2">
                +20.1% from last month
              </p>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <TransactionModal 
            title="Add Funds to Wallet" 
            actionText="Deposit"
            isPending={deposit.isPending}
            wallets={wallets} // Pass wallets here!
            onSubmit={(walletId, amount) => deposit.mutate({ id: walletId, amount })}
          >
            <Button className="bg-white text-black hover:bg-gray-200 font-semibold w-full h-12 text-sm rounded-xl transition-colors" disabled={wallets.length === 0}>
              Add to wallet
            </Button>
          </TransactionModal>

          <TransactionModal 
            title="Withdraw Funds" 
            actionText="Withdraw"
            isPending={withdraw.isPending}
            wallets={wallets} // Pass wallets here!
            onSubmit={(walletId, amount) => withdraw.mutate({ id: walletId, amount })}
          >
            <Button variant="outline" className="bg-transparent border-border text-foreground hover:bg-white hover:text-black font-semibold w-full h-12 text-sm rounded-xl transition-colors" disabled={wallets.length === 0}>
              Withdraw
            </Button>
          </TransactionModal>
          
          <AddBankAccountModal>
            <Button variant="outline" className="bg-transparent border-border text-foreground hover:bg-white hover:text-black font-semibold w-full h-12 text-sm rounded-xl transition-colors">
              Add New Account
            </Button>
          </AddBankAccountModal>
        </div>
      </CardContent>
    </Card>
  );
}