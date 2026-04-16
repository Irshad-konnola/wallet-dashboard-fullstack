'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Wallet } from "../../hooks/useWallets";

const formSchema = z.object({
  amount: z.string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Amount must be greater than 0"),
  walletId: z.string().min(1, "Please select a wallet"), // New Validation!
});

interface TransactionModalProps {
  children: React.ReactNode;
  title: string;
  actionText: string;
  isPending: boolean;
  wallets: Wallet[]; 
  onSubmit: (walletId: string, amount: number) => void;
}

export function TransactionModal({ children, title, actionText, isPending, wallets, onSubmit }: TransactionModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: "", walletId: "" },
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.walletId, Number(values.amount));
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-card border-border sm:max-w-100">
        <DialogHeader>
          <DialogTitle className="text-foreground">{title}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            
            <FormField
              control={form.control}
              name="walletId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-muted">Select Wallet</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="Choose a wallet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-card border-border">
                      {wallets.map((wallet) => (
                        <SelectItem key={wallet.id} value={wallet.id}>
                          {wallet.name} (${Number(wallet.balance).toLocaleString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-muted">Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" className="bg-input border-border" {...field} />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-accent-green text-background hover:bg-accent-green/90 font-semibold" disabled={isPending}>
              {isPending ? "Processing..." : actionText}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}