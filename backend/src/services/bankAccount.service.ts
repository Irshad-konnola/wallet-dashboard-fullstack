import prisma from '../prisma';

export const getAllAccounts = async () => {
  return await prisma.bankAccount.findMany({
    orderBy: { createdAt: 'desc' } 
  });
};

export const createAccount = async (data: any) => {
  return await prisma.bankAccount.create({
    data: {
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      currency: data.currency,
      balance: data.balance || 0, 
    },
  });
};
export const deleteAccount = async (id: string) => {
  return await prisma.bankAccount.delete({
    where: { id }
  });
};