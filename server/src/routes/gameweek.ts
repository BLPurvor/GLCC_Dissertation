import { prisma } from "@prisma/client";
import express, { Request, Response } from "express";
import { getAllStd, getById, create } from "../controller/gameweek";
const router = express.Router();

router.get("/all", async (req: Request, res: Response) => {
  // Await response from server of all gameweek information
  const result = await getAllStd();

  if (result.length === 0) {
    // If the server returns an empty array, throw an error.
    return res.status(500).send("EFGWALL");
  }
  // Else return all gameweek information (Or error thrown by controller)
  return res.status(200).send(result);
});

router.get("/:id", async (req: Request, res: Response) => {
  // Parse gameweek ID parameter as integer.
  const id = parseInt(req.params.id);

  // Await server return for fetching gameweek by ID number.
  const result = await getById(id);

  if (result === null) {
    // If server response fails or is empty, throw an error.
    return res.status(500).send("EFGWBID");
  }

  // Else return specific gameweek information. (Or error thrown by controller).
  return res.status(200).send(result);
});

router.post("/create", async (req: Request, res: Response) => {
  const { user_id, matches } = req.body;

  res.send(await create(user_id, JSON.stringify(matches)));
});

export { router as routeGameweek };
