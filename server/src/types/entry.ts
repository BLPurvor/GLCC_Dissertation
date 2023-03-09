export type Entry = {
  _id: string; // auto generated uuid
  datetime: string; // When did the user enter
  user_id: string; // Which user entered
  won: boolean; // Did the user win
  gameweek_id: number; // Which gameweek
  prediction: {
    match_id: number;
    prediction: string;
  }[];
};
