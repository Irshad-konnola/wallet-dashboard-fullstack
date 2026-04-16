import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  amount: string;
  currency: string;
  status: string;
  createdAt: string;
  wallet?: { name: string };
}

export interface ChartDataPoint {
  date: string;
  deposit: number;
  withdraw: number;
}

export const useTransactions = () => {
  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await api.get('/transactions');
      return response.data.data as Transaction[];
    },
  });

  const chartQuery = useQuery({
    queryKey: ['chartData'],
    queryFn: async () => {
      const response = await api.get('/dashboard/chart');
      return response.data.data as ChartDataPoint[];
    },
  });

  return {
    transactions: transactionsQuery.data || [],
    isTransactionsLoading: transactionsQuery.isLoading,
    chartData: chartQuery.data || [],
    isChartLoading: chartQuery.isLoading,
  };
};