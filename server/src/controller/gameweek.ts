import { prisma } from "../db";
import { Entry } from "../types/entry";
import { Gameweek } from "../types/gameweek";
import { getFromList } from "./matches";

export const getAllStd = async (): Promise<Gameweek[]> => {
  // Fetch all gameweeks and only pull id, didPayout, matches, and prize information
  const result = await prisma.gameweek.findMany({
    select: {
      id: true,
      did_payout: true,
      matches: true,
      prize: true,
      deadline: true,
    },
  });

  for (const gameweek of result) {
    await updateWinners(gameweek.id, gameweek.matches);
  }

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

  // If the deadline for the gameweek has passed then check results for winners.
  if (new Date(result.deadline) < new Date()) {
    await updateWinners(result.id, result.matches);
  }

  return result;
};

export const getPayout = async (): Promise<Gameweek[]> => {
  const result = prisma.gameweek.findMany({
    where: {
      did_payout: true,
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

  // If the query ends, return an error string for the router to handle.
  if (dbResult === null) return "EFIDNR";

  // If the deadline for the gameweek has passed then check results for winners.
  if (new Date(dbResult.deadline) < new Date()) {
    updateWinners(id, dbResult.matches);
  }

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

export const updateWinners = async (
  gw_id: number,
  gw_matches: string
): Promise<void> => {
  const entries = await prisma.entry.findMany({
    select: {
      id: true,
      won: true,
      prediction: true,
    },
    where: {
      gameweek_id: gw_id,
    },
  });

  const matchResults = (await getFromList(gw_matches)).response;

  type WinnerObject = {
    match: number;
    winner: string;
  };
  const matchWinners: Array<WinnerObject> = [];
  matchResults.forEach((match) => {
    if (match.teams.home.winner) {
      matchWinners.push({ match: match.fixture.id, winner: "home" });
    } else if (match.teams.away.winner) {
      matchWinners.push({ match: match.fixture.id, winner: "away" });
    } else {
      matchWinners.push({ match: match.fixture.id, winner: "draw" });
    }
  });

  type EntryCounter = {
    id: string;
    count: number;
  };
  const entryWinners: Array<EntryCounter> = [];

  entries.forEach((entry) => {
    let prediction: Entry["prediction"] = JSON.parse(entry.prediction);

    let count = 0;

    prediction.forEach((prediction) => {
      matchWinners.forEach((winner) => {
        if (
          prediction.match_id === winner.match &&
          prediction.prediction === winner.winner
        ) {
          count++;
        }
      });
    });

    entryWinners.push({
      id: entry.id,
      count: count,
    });
  });

  for (const entry of entryWinners) {
    if (entry.count === 8) {
      await prisma.entry.update({
        where: {
          id: entry.id,
        },
        data: {
          won: true,
        },
      });

      await prisma.gameweek.update({
        where: {
          id: gw_id,
        },
        data: {
          did_payout: true,
        },
      });
    }
  }
};
