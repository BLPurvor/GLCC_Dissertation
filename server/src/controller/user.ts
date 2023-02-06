import { transformDocument } from "@prisma/client/runtime";
import { prisma } from "../db";

type User = {
  id?: string;
  username?: string;
  email?: string;
  email_verified?: boolean;
  role?: string;
  wallet_id?: string;
  firstname?: string;
  lastname?: string;
};

export const getRoleById = async (user_id: string): Promise<User | string> => {
  // Get from DB ONLY the role data of a given user_id
  const result = await prisma.user.findFirst({
    select: {
      role: true,
    },
    where: {
      id: user_id,
    },
  });

  // If the query fails then return string error code.
  if (result === null || !result) {
    return "EFURID";
  }

  return result;
};

export const getSafeInfo = async (user_id: string): Promise<any> => {
  const result = await prisma.user.findFirst({
    where: {
      id: user_id,
    },
    select: {
      username: true,
      firstname: true,
      lastname: true,
      email: true,
      email_verified: true,
      role: true,
    },
  });

  if (result === null) {
    return "EFUASI";
  }

  return result;
};
