import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react"; 

interface WalletAccountCardProps {
  id: string;
  walletName: string;
  balance: string;
  onDelete: (id: string) => void; 
}

export function WalletAccountCard({ id, walletName, balance, onDelete }: WalletAccountCardProps) {
  return (
    <Card className=" border border-border hover:border-accent-green hover:shadow-[0_0_15px_rgba(0,208,132,0.1)] transition-all min-w-50 shrink-0 cursor-pointer rounded-2xl group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-5 pt-2">
        <CardTitle className="text-sm font-medium text-foreground">
          {walletName}
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={(e) => { e.stopPropagation(); onDelete(id); }} 
          className="h-4 w-4 text-text-muted hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="text-3xl font-bold text-foreground tracking-tight">
          {Number(balance).toLocaleString()}
        </div>
        <p className="text-xs text-text-muted mt-1">+125 since last hour</p>
      </CardContent>
    </Card>
  );
}