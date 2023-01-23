import express, { Express, Request, Response } from "express";
import config from "./config";

import { routeGameweek } from "./routes/gameweek";

import { prisma } from "./db";

const PORT = process.env.APP_PORT;

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Root");
});

app.use("/gameweek/", routeGameweek);

try {
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}.`);
  });
} catch (error: any) {
  console.error(`Error: ${error.message}`);
}
