import { Card, CardContent } from "../ui/card";

interface MiniBonusCardProps {
  title: string;
  value: string;
  currency: string;
  subText: string;
}

export function MiniBonusCard({ title, value, currency, subText }: MiniBonusCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-5 flex flex-col justify-between h-full gap-1">
        <div>
          <h4 className="text-sm font-medium text-text-muted mb-1">{title}</h4>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            {value} <span className="text-xl text-text-muted font-medium">{currency}</span>
          </h2>
        </div>
        <p className="text-xs text-text-muted mt-2">{subText}</p>
      </CardContent>
    </Card>
  );
}