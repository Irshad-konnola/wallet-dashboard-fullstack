import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { getBankAccounts, createBankAccount, deleteBankAccount } from '../controllers/bankAccount.controller';

const router = Router();

// Zod Schema for validation
const bankAccountSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(4, "Account number must be at least 4 characters"),
  currency: z.enum(["USD", "GBP", "EUR"]),
  balance: z.number().nonnegative().optional(),
});

router.get('/', getBankAccounts);
router.post('/', validate(bankAccountSchema), createBankAccount);
router.delete('/:id', deleteBankAccount);

export default router;