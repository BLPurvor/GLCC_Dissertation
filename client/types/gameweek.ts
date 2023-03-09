export type Gameweek = {
  id: number;
  did_payout: boolean;
  matches: string;
  prize: number;
  deadline: string; // ISO string for deadline of submissions. Used in page rendering
};
