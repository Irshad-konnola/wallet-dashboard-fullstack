import { Request, Response } from "express";
import * as bankAccountService from "../services/bankAccount.service";

export const getBankAccounts = async (req: Request, res: Response) => {
  const accounts = await bankAccountService.getAllAccounts();
  res.json({ success: true, data: accounts });
};

export const createBankAccount = async (req: Request, res: Response) => {
  const newAccount = await bankAccountService.createAccount(req.body);
  res.status(201).json({ success: true, data: newAccount });
};

export const deleteBankAccount = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await bankAccountService.deleteAccount(id);
  res.json({ success: true, data: null });
};
