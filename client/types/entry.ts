export type Entry = {
  _id: string; // auto generated uuid
  datetime: Date; // When did the user enter
  user_id: string; // Which user entered
  won: boolean; // Did the user win
  gameweek_id: number; // Which gameweek
  prediction: {
    match: {
      match_id: number;
      prediction: string; // Bad practice used to maintain the current method of predicting matches with {1 / X / 2} being the options.
    };
  };
};
