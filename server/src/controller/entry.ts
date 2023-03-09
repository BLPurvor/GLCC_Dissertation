import { prisma } from "../db";
import { Entry } from "../types/entry";

export const entrySubmit = async (entry: Entry): Promise<string> => {
  const result = await prisma.entry.create({
    data: {
      id: entry._id,
      datetime: entry.datetime,
      user_id: entry.user_id,
      won: entry.won,
      gameweek_id: entry.gameweek_id,
      prediction: JSON.stringify(entry.prediction),
    },
  });

  if (!result) return "ECEFGW";

  return "E00000";
};

export const getEntryById = async (
  user_id: string,
  gw_id: number
): Promise<Entry["prediction"] | string> => {
  const result = await prisma.entry.findFirst({
    select: {
      prediction: true,
    },
    where: {
      user_id: user_id,
      gameweek_id: gw_id,
    },
  });

  if (!result) return "EFGWBU";

  return JSON.parse(result.prediction);
};
