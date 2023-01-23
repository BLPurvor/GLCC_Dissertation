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
  const result = prisma.gameweek.findFirst({
    where: {
      id: id,
    },
  });

  return result;
};
