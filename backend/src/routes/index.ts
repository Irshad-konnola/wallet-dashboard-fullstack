import { Router } from 'express';
import bankAccountRoutes from './bankAccount.routes';
import walletRoutes from './wallet.routes';
import transactionRoutes from './transaction.routes';
import dashboardRoutes from './dashboard.routes';

const router = Router();

router.use('/bank-accounts', bankAccountRoutes);
router.use('/wallets', walletRoutes);
router.use('/transactions', transactionRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;