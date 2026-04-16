import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  balance: string; 
  currency: string;
}

export const useBankAccounts = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: async () => {
      const response = await api.get('/bank-accounts');
      return response.data.data as BankAccount[];
    },
  });

  const deleteAccount = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/bank-accounts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    },
  });

  return {
    accounts: data || [],
    isLoading,
    error,
    deleteAccount,
  };
};