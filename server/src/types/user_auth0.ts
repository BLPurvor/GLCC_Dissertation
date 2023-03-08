export type User_auth0 = {
  email: string;
  name: string; // Equal to email when tested, unsure.
  nickname: string;
  picture: string; // Unused.
  sid: string; // Unused.
  sub: string; // Gives user ID and auth method. i.e. auth0|uuidv4
  updated_at: Date; // String of Date
};
