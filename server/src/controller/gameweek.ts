import { prisma } from "../db";

type Gameweek = {
  id: number;
  prize: number;
  did_payout?: boolean;
  author_name?: String;
  matches: string;
  entries?: String[];
};

export const getAllStd = async (): Promise<Gameweek[]> => {
  // Fetch all gameweeks and only pull id, didPayout, matches, and prize information
  const result = prisma.gameweek.findMany({
    select: {
      id: true,
      did_payout: true,
      matches: true,
      prize: true,
    },
  });

  return result;
};

export const getLatest = async (): Promise<Gameweek | string> => {
  const result = await prisma.gameweek.findFirst({
    select: {
      id: true,
      matches: true,
      prize: true,
      deadline: true,
    },
    take: -1,
  });

  if (result === null) return "EFLGWI";

  return result;
};

export const getPayout = async (): Promise<Gameweek[]> => {
  const result = prisma.gameweek.findMany({
    where: {
      did_payout: true,
    },
    select: {
      id: true,
      matches: true,
      prize: true,
    },
  });

  return result;
};

export const getById = async (id: number): Promise<Gameweek | string> => {
  // Fetch gameweek by given id number
  const dbResult = await prisma.gameweek.findFirst({
    where: {
      id: id,
    },
  });

  if (dbResult === null) return "EFIDNR";
  return dbResult;
};

export const create = async (
  user_id: string,
  matches: string,
  deadline: string
): Promise<String> => {
  // Fetch user information to see if user is permitted to create gameweeks.
  const user = await prisma.user.findFirst({
    select: { username: true, role: true },
    where: { id: user_id },
  });

  if (!user) return "EFURINF"; // If the user doesnt exist, the query fails or returns null then throw error.
  if (user.role === "user") return "EUNGWP"; // If the user is not an admin or volunteer i.e. no permission to create, then throw error.

  let newPrize = 0;

  // Get information on last monetary prize value for autoincrementation.
  const lastPrize = await prisma.gameweek.findFirst({
    select: { did_payout: true, prize: true },
    take: -1,
  });

  // if (!lastPrize) return "EFGWLP"; // If query fails throw error.

  if (!lastPrize || lastPrize.did_payout) newPrize = 250;
  // If last gameweek paid out to an entrant, then set new prize to £250.
  else newPrize = lastPrize.prize + 25;
  // Else, increment by £25.

  // Attempt to create the gameweek through DB.
  const query = await prisma.gameweek.create({
    data: {
      author_name: user.username,
      prize: newPrize,
      matches: matches,
      deadline: deadline,
    },
  });

  if (!query) return "ECGWQU"; // If creation fails, throw error.

  return "E00000"; // If all succeeds, return success.
};
