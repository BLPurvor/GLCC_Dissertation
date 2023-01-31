const Leagues = {
  engDiv1: "39",
  engDiv2: "40",
};

export const getBetweenDates = (
  league: number,
  season: number,
  startDate: Date,
  endDate: Date
) => {
  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${league}&season=${season}&from=${startDate}&to=${endDate}`;

  // Fetch all data fixtures between given date to pass to Next.JS front-end selector for volunteers/admins
};
