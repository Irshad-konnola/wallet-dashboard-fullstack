'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useWallets } from "../../hooks/useWallets";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
  name: z.string().min(1, "Wallet name is required"),
  currency: z.enum(["USD", "GBP", "EUR"]),
  balance: z.string().optional(),
});

export function AddWalletModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { createWallet } = useWallets();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", currency: "USD", balance: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createWallet.mutate(
      {
        name: values.name,
        currency: values.currency,
        balance: values.balance ? Number(values.balance) : 0,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-card border-border sm:max-w-100">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create New Wallet</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-muted">Wallet Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Trading Wallet, Wallet B" className="bg-input border-border" {...field} />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-muted">Initial Balance (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 5000" className="bg-input border-border" {...field} />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-muted">Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-accent-green text-background hover:bg-accent-green/90 font-semibold"
              disabled={createWallet.isPending}
            >
              {createWallet.isPending ? "Creating..." : "Create Wallet"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}