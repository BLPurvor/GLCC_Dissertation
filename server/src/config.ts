import { config as cfgenv } from "dotenv";

var config = {
  admin_db: process.env.ADMIN_DB_URL!,
  std_db: process.env.STD_DB_URL!,
};

export default config;
