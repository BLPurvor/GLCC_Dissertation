import { User } from "@prisma/client";
import { prisma } from "../db";

type Gameweek = {
  id: String;
  prize: Number;
  didPayout?: boolean;
  authorName?: String;
  matches: string;
  entries?: String[];
};

export const getAllStd = async (): Promise<Gameweek[]> => {
  const result = prisma.gameweek.findMany({
    select: {
      id: true,
      didPayout: true,
      matches: true,
      prize: true,
      authorName: false,
      entries: false,
    },
  });

  return result;
};

export const getById = async (id: string): Promise<Gameweek | null> => {
  const result = await prisma.gameweek.findFirst({
    where: {
      id: id,
    },
  });

  return result;
};

export const create = async (
  user: string,
  matches: string
): Promise<String> => {
  const lastPrize = await prisma.gameweek.findFirst({
    select: { prize: true },
    take: -1,
  });

  if (!lastPrize) return "EFGWLP";

  let newPrize = lastPrize.prize + 25;

  const query = await prisma.gameweek.create({
    data: {
      authorName: user,
      prize: newPrize,
      matches: matches,
    },
  });

  if (!query) return "ECGWQU";

  return "Success";
};
