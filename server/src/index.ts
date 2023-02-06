import express, { Express, Request, Response } from "express";
import cors from "cors";

import { routeUser } from "./routes/user";
import { routeGameweek } from "./routes/gameweek";
import { routeMatches } from "./routes/matches";
import { routeWallet } from "./routes/wallet";

const PORT = process.env.APP_PORT;

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Root");
});

app.use("/user/", routeUser);
app.use("/gameweek/", routeGameweek);
app.use("/matches/", routeMatches);
app.use("/wallet", routeWallet);

try {
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}.`);
  });
} catch (error: any) {
  console.error(`Error: ${error.message}`);
}
