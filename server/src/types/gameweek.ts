export type Gameweek = {
  id?: number;
  did_payout?: boolean;
  matches?: string;
  deadline: string; // ISO string for deadline of submissions. Used in page rendering

  prize?: number;
};
