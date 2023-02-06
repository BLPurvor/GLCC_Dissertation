import { prisma } from "../db";

type Gameweek = {
  id: number;
  prize: Number;
  didPayout?: boolean;
  authorName?: String;
  matches: string;
  entries?: String[];
};

export const getAllStd = async (): Promise<Gameweek[]> => {
  // Fetch all gameweeks and only pull id, didPayout, matches, and prize information
  const result = prisma.gameweek.findMany({
    select: {
      id: true,
      didPayout: true,
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
  matches: string
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
    select: { didPayout: true, prize: true },
    take: -1,
  });

  if (!lastPrize) return "EFGWLP"; // If query fails throw error.

  if (lastPrize.didPayout) newPrize = 250;
  // If last gameweek paid out to an entrant, then set new prize to £250.
  else newPrize = lastPrize.prize + 25;
  // Else, increment by £25.

  // Attempt to create the gameweek through DB.
  const query = await prisma.gameweek.create({
    data: {
      authorName: user.username,
      prize: newPrize,
      matches: matches,
    },
  });

  if (!query) return "ECGWQU"; // If creation fails, throw error.

  return "1"; // If all succeeds, return success.
};
