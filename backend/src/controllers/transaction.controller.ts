import { Request, Response } from 'express';
import * as transactionService from '../services/transaction.service';

export const getTransactions = async (req: Request, res: Response) => {
  const { type, status } = req.query;
  
  const transactions = await transactionService.getTransactions({
    type: type as string,
    status: status as string,
  });

  res.json({ success: true, data: transactions });
};

export const getChartData = async (req: Request, res: Response) => {
  const chartData = await transactionService.getChartData();
  res.json({ success: true, data: chartData });
};