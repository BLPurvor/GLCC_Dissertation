import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "";
const APP_PORT = process.env.APP_PORT || "";

const DB_USER = process.env.DB_USER || "";
const DB_PASS = process.env.DB_PASS || "";
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@glcc.czbq98e.mongodb.net/glcc?retryWrites=true&w=majority`;

const config = {
  mongo: {
    url: DB_URL,
  },
  server: {
    port: APP_PORT,
  },
};

export default config;
