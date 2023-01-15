import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { dbConn } from "../db/db";
import Gameweek from "../db/models/gameweek";
import Transaction from "../db/models/transaction";
import config from "./config";

const PORT = config.server.port;

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("Root");
});

app.post("/gameweek/create/", async (req: Request, res: Response) => {
  const gameweekTest = await Gameweek.create({
    _id: new mongoose.Types.ObjectId(),
    author: "MRooney",
    prizeAmount: 300,
    matches: [
      {
        match_id: 1,
        home_team: "Liverpool",
        away_team: "Man City",
      },
    ],
  });

  return res.send(gameweekTest);
});

app.post("/transaction/create", async (req: Request, res: Response) => {
  const transactionTest = await Transaction.create({
    _id: new mongoose.Types.ObjectId(),
    amount: 5,
    datetime: new Date(),
  });

  return res.send(transactionTest);
});

try {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
  });
  dbConn();
} catch (error) {
  console.error(`Error: $error.message`);
}
