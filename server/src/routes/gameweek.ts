import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/gameweek", (req: Request, res: Response) => {
  return res.status(200).send("Gameweek fetch");
});

router.post("api/gameweek", (req: Request, res: Response) => {
  return res.status(200).send("New Gameweek");
});

export { router as routeGameweek };
