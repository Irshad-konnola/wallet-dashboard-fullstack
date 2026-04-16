import prisma from '../prisma';

export const getWallets = async () => {
  return await prisma.wallet.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const createWallet = async (name: string, currency: string = 'USD') => {
  return await prisma.wallet.create({
    data: { name, currency },
  });
};

export const deposit = async (walletId: string, amount: number, currency: string, note?: string) => {
  // $transaction ensures both database calls succeed, or both fail. No partial updates.
  return await prisma.$transaction(async (tx) => {
    const wallet = await tx.wallet.update({
      where: { id: walletId },
      data: { balance: { increment: amount } },
    });

    const transaction = await tx.transaction.create({
      data: {
        walletId,
        type: 'DEPOSIT',
        amount,
        currency,
        status: 'SUCCESS',
        note,
      },
    });

    return { wallet, transaction };
  });
};

export const withdraw = async (walletId: string, amount: number) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Find the wallet first to check the balance
    const wallet = await tx.wallet.findUnique({ where: { id: walletId } });
    
    if (!wallet) {
      throw { statusCode: 404, code: 'NOT_FOUND', message: 'Wallet not found' };
    }

    // 2. Check for sufficient funds (converting Prisma Decimal to Number)
    if (Number(wallet.balance) < amount) {
      throw { statusCode: 422, code: 'INSUFFICIENT_FUNDS', message: 'Insufficient balance to withdraw' };
    }

    // 3. Deduct the balance
    const updatedWallet = await tx.wallet.update({
      where: { id: walletId },
      data: { balance: { decrement: amount } },
    });

    // 4. Create the transaction record
    const transaction = await tx.transaction.create({
      data: {
        walletId,
        type: 'WITHDRAWAL',
        amount,
        currency: wallet.currency,
        status: 'SUCCESS',
      },
    });

    return { wallet: updatedWallet, transaction };
  });
};