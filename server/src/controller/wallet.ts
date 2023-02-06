import { prisma } from "../db";

type Wallet = {
  wallet_id: string;
  cashValue: number;
  tokens?: string;
};

export const getWalletByUser = async (user_id: string) => {
  // Get wallet id and cashValue from user ID
  const wallet_id = await prisma.user.findFirst({
    where: {
      id: user_id,
    },
    select: {
      wallet_id: true,
    },
  });

  if (!wallet_id || wallet_id === null) return "EFWBID";

  const wallet_info = await prisma.wallet.findFirst({
    where: {
      id: wallet_id.wallet_id,
    },
    select: {
      id: true,
      cashValue: true,
    },
  });

  if (!wallet_info || wallet_info === null) return "EFWDTS";

  return wallet_info;
};
