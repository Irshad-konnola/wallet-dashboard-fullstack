import { Request, Response } from 'express';
import * as walletService from '../services/wallet.service';

export const getWallets = async (req: Request, res: Response) => {
  const wallets = await walletService.getWallets();
  res.json({ success: true, data: wallets });
};

export const createWallet = async (req: Request, res: Response) => {
  const { name, currency } = req.body;
  const wallet = await walletService.createWallet(name, currency);
  res.status(201).json({ success: true, data: wallet });
};

export const deposit = async (req: Request, res: Response) => {
  const id = req.params.id as string; 
  const { amount, currency, note } = req.body;
  
  const result = await walletService.deposit(id, amount, currency, note);
  res.json({ success: true, data: result });
};

export const withdraw = async (req: Request, res: Response) => {
  const id = req.params.id as string; 
  const { amount } = req.body;
  
  const result = await walletService.withdraw(id, amount);
  res.json({ success: true, data: result });
};