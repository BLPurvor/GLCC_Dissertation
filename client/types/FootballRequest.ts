export type FootballRequest = {
  get: string;
  parameters: {
    from: string;
    league: string;
    season: string;
    to: string;
  };
  errors: Array<Object>;
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: Array<Fixture>;
};

type Fixture = {
  fixture: {
    date: string;
    id: number;
    periods: {};
    referee: string;
    status: {
      elapsed: number;
      long: string;
      short: string;
    };
    timestamp: number;
    timezone: number;
  };
  goals: {
    home: number;
    away: number;
  };
  league: {
    country: string;
    flag: string;
    id: number;
    logo: string;
    name: string;
    round: string;
    season: number;
  };
  score: {
    halftime: {
      home: number;
      away: number;
    };
    fulltime: {
      home: number;
      away: number;
    };
    extratime: {
      home: number;
      away: number;
    };
    penalty: {
      home: number;
      away: number;
    };
  };
  teams: {
    home: {
      id: number;
      logo: string;
      name: string;
      winner: boolean;
    };
  };
};
