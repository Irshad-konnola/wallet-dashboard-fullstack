'use client';

import { useWallets } from "../../hooks/useWallets";
import { WalletAccountCard } from "./WalletAccountCard";
import { Skeleton } from "../ui/skeleton";
import { Plus } from "lucide-react"; 
import { AddWalletModal } from "../modals/AddWalletModal"; 

export function WalletAccountsSection() {
  const { wallets, isLoading, deleteWallet } = useWallets();

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-muted">Wallet Accounts</h2>
        
        <AddWalletModal>
          <button className="text-text-muted hover:text-foreground bg-input border border-border p-1.5 rounded-md hover:border-accent-green transition-colors">
            <Plus size={16} />
          </button>
        </AddWalletModal>
        
      </div>
      
      <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
        {isLoading ? (
          [1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="min-w-50 h-30 bg-input rounded-2xl border border-border" />
          ))
        ) : wallets.length === 0 ? (
          <p className="text-text-muted text-sm">No wallet accounts found.</p>
        ) : (
          wallets.map((wallet) => (
            <WalletAccountCard
              key={wallet.id}
              id={wallet.id}
              walletName={wallet.name}
              balance={wallet.balance}
              onDelete={(id) => deleteWallet.mutate(id)} 
            />
          ))
        )}
      </div>
    </div>
  );
}