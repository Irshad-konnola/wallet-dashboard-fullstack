import { TotalBalanceCard } from "../components/dashboard/TotalBalanceCard";
import { BankAccountsSection } from "../components/dashboard/BankAccountsSection";
import { WalletChart } from "../components/dashboard/WalletChart";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { WalletAccountsSection } from "@/components/dashboard/WalletAccountsSection";
// We will build this next
import { Navbar } from "@/components/Navbar";
// And this re-usable mini-card
import { MiniBonusCard } from "../components/dashboard/MiniBonusCard"; 

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background">
      {/* 1. Global Navbar (User, Nav, Search) */}
      <Navbar />

      <div className="p-4 md:p-8">
        <div className="max-w-425 mx-auto">
          
          {/* EXACT IMAGE LAYOUT: 12-column grid split for Left/Right columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* ================= LEFT COLUMN (Takes up 7/12) ================= */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Total Balance Hero (Existing, style hovers next) */}
              <TotalBalanceCard />

              {/* 2. New Mini Cards Row (Referral & Bonus) */}
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

            {/* ================= RIGHT COLUMN (Takes up 5/12) ================= */}
            <div className="lg:col-span-5 space-y-6 flex flex-col">
              
              {/* 1. Overall Wallet Chart (Rename in next step) */}
              <div className="h-100">
                <WalletChart />
              </div>

              {/* 2. Transaction History (Renamed & Styled in next step) */}
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