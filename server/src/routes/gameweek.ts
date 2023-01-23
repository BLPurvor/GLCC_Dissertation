import express, { Request, Response } from "express";
import { getAllStd, getById } from "../controller/gameweek";
const router = express.Router();

router.get("/all", async (req: Request, res: Response) => {
  const result = await getAllStd();

  if (result.length === 0) {
    return res.status(500).send("EFGWALL");
  }

  return res.status(200).send(result);
});

router.get("/:id", async (req: Request, res: Response) => {
  const result = await getById(req.params.id);

  if (result === null) {
    return res.status(500).send("EFGWBID");
  }

  return res.status(200).send(result);
});

export { router as routeGameweek };
