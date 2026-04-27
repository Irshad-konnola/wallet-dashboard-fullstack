import { TotalBalanceCard } from "../components/dashboard/TotalBalanceCard";
import { BankAccountsSection } from "../components/dashboard/BankAccountsSection";
import { WalletChart } from "../components/dashboard/WalletChart";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { WalletAccountsSection } from "@/components/dashboard/WalletAccountsSection";
import { Navbar } from "@/components/Navbar";
import { MiniBonusCard } from "../components/dashboard/MiniBonusCard"; 

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="p-4 md:p-8">
        <div className="max-w-425 mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-7 space-y-6">
              
              <TotalBalanceCard />

              <div className="grid grid-cols-2 gap-6">
                <MiniBonusCard 
                  title="Referral" 
                  value="2362" 
                  currency="USD" 
                  subText="+20.1% from last month" 
                />
                <MiniBonusCard 
                  title="Bonus" 
                  value="2362" 
                  currency="USD" 
                  subText="+20.1% from last month" 
                />
              </div>

              <BankAccountsSection />

             <WalletAccountsSection />

            </div>

            <div className="lg:col-span-5 space-y-6 flex flex-col">
              
              <div className="h-100">
                <WalletChart />
              </div>

              <div className="flex-1">
                 <RecentTransactions />
              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}