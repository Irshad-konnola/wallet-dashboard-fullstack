import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export interface Wallet {
  id: string;
  name: string;
  balance: string;
  currency: string;
}

export const useWallets = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['wallets'],
    queryFn: async () => {
      const response = await api.get('/wallets');
      return response.data.data as Wallet[];
    },
  });

  const deposit = useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount: number }) => {
      await api.post(`/wallets/${id}/deposit`, { amount, currency: 'USD', note: 'Dashboard Deposit' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['chartData'] });
    },
  });

  // Withdraw Mutation
  const withdraw = useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount: number }) => {
      await api.post(`/wallets/${id}/withdraw`, { amount });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['chartData'] });
    },
  });
const createWallet = useMutation({
    mutationFn: async (values: { name: string; currency: string; balance: number }) => {
      await api.post('/wallets', values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
    },
  });
  const deleteWallet = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/wallets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
    },
  });
  return {
    wallets: data || [],
    mainWallet: data?.[0] || null, 
    isLoading,
    deposit,
    withdraw,
    createWallet,
deleteWallet
  };
};