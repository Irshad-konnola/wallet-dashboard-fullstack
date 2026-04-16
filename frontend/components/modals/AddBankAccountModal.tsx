"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z
    .string()
    .min(4, "Account number must be at least 4 characters"),
  currency: z.enum(["USD", "GBP", "EUR"]),
  balance: z.string().optional(),
});
export function AddBankAccountModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankName: "",
      accountNumber: "",
      currency: "USD",
      balance: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      // Convert string balance to number before sending to API
      const payload = {
        ...values,
        balance: values.balance ? Number(values.balance) : 0,
      };
      await api.post("/bank-accounts", payload);
    },
    onSuccess: () => {
      // Refresh the list immediately!
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      setOpen(false); // Close the modal
      form.reset(); // Clear the form
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-card border-border sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Add New Bank Account
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-muted">Bank Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Chase Bank"
                      className="bg-input border-border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-muted">
                    Account Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="12345678"
                      className="bg-input border-border"
                      {...field}
                    />
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
                  <FormLabel className="text-text-muted">
                    Initial Balance (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 5000"
                      className="bg-input border-border"
                      {...field}
                    />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Adding..." : "Add Account"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
