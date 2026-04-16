import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { getWallets, createWallet, deposit, withdraw } from '../controllers/wallet.controller';
import prisma from '../prisma';
const router = Router();

// Zod Schemas
const depositSchema = z.object({
  amount: z.number().positive().multipleOf(0.01),
  currency: z.enum(["USD", "GBP", "EUR"]),
  note: z.string().max(200).optional(),
});

const withdrawSchema = z.object({
  amount: z.number().positive().multipleOf(0.01),
});

const createWalletSchema = z.object({
  name: z.string().min(1),
  currency: z.string().length(3),
  balance: z.number().nonnegative().optional(),
});
router.delete('/:id', async (req, res) => {
  try {
    await prisma.transaction.deleteMany({
      where: { walletId: req.params.id },
    });

    await prisma.wallet.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, message: 'Wallet deleted successfully' });
  } catch (error) {
    console.error("Delete Error:", error); 
    res.status(500).json({ success: false, message: 'Failed to delete wallet' });
  }
});


// Routes
router.get('/', getWallets);
router.post('/', validate(createWalletSchema), createWallet); // Helper route to init a wallet
router.post('/:id/deposit', validate(depositSchema), deposit);
router.post('/:id/withdraw', validate(withdrawSchema), withdraw);
router.post('/', async (req, res) => {
  try {
    const data = createWalletSchema.parse(req.body);
    
    const newWallet = await prisma.wallet.create({
      data: {
        name: data.name,
        currency: data.currency,
        balance: data.balance || 0,
      },
    });

    res.status(201).json({ success: true, data: newWallet });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data', error });
  }
});
export default router;