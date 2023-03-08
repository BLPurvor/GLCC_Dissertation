enum Roles {
  "user",
  "admin",
  "volunteer",
}

export type User = {
  _id: string; // uuid generated on signup.
  email: string;
  email_verified: boolean; // Has the user followed the email to verify their email.
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  wallet_id: string; // uuid generated on signup and creation of the wallet property.
  role: Roles; // Can only be specified strings.
  first_name?: string;
  last_name?: string;
};
