import prisma from '../prisma';
import { TransactionType, TransactionStatus } from '@prisma/client';

export const getTransactions = async (filters: { type?: string; status?: string }) => {
  return await prisma.transaction.findMany({
    where: {
      ...(filters.type && { type: filters.type as TransactionType }),
      ...(filters.status && { status: filters.status as TransactionStatus }),
    },
    orderBy: { createdAt: 'desc' },
    include: {
      wallet: {
        select: { name: true, currency: true }
      }
    }
  });
};

export const getChartData = async () => {
  // Get all successful transactions from the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const transactions = await prisma.transaction.findMany({
    where: {
      createdAt: { gte: thirtyDaysAgo },
      status: 'SUCCESS',
    },
    orderBy: { createdAt: 'asc' },
  });

  // Group the transactions by day so Recharts can easily plot them
  const chartData: Record<string, { date: string; deposit: number; withdraw: number }> = {};

  transactions.forEach((t) => {
    // Extract just the YYYY-MM-DD part of the date
    const date = t.createdAt.toISOString().split('T')[0];

    if (!chartData[date]) {
      chartData[date] = { date, deposit: 0, withdraw: 0 };
    }

    // Accumulate the totals for that day
    if (t.type === 'DEPOSIT') chartData[date].deposit += Number(t.amount);
    if (t.type === 'WITHDRAWAL') chartData[date].withdraw += Number(t.amount);
  });

  // Return as an array for the frontend chart library
  return Object.values(chartData);
};