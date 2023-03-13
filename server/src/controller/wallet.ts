import { prisma } from "../db";
import { Wallet } from "../types/wallet";

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
      cash_value: true,
    },
  });

  if (!wallet_info || wallet_info === null) return "EFWDTS";

  return wallet_info;
};
