import express, { Request, Response } from "express";
import {
  getAllStd,
  getById,
  create,
  getPayout,
  getLatest,
} from "../controller/gameweek";
const router = express.Router();

router.get("/all", async (req: Request, res: Response) => {
  // Await response from server of all gameweek information
  const result = await getAllStd();

  if (result.length === 0) {
    // If the server returns an empty array, throw a no content header.
    return res.status(204).send("No Content");
  }
  // Else return all gameweek information (Or error thrown by controller)
  return res.status(200).send(result);
});

router.get("/latest", async (req: Request, res: Response) => {
  const result = await getLatest();

  if (!result) return res.send(204).send("No Content");
  if (typeof result === "string") return res.status(500).send("Server Error");

  return res.status(200).send(result);
});

router.get("/payout", async (req: Request, res: Response) => {
  // Await response from server controller for gameweeks with a did_payout of true.
  const result = await getPayout();

  if (result.length === 0) return res.status(204).send("No Content");

  return res.status(200).send(result);
});

router.get("/:id", async (req: Request, res: Response) => {
  // Parse gameweek ID parameter as integer.
  const id = parseInt(req.params.id);

  // Await server return for fetching gameweek by ID number.
  const result = await getById(id);

  if (!result || result === undefined) {
    // If server response fails or is empty, throw an error.
    return res.status(500).send("EFGWBID");
  }

  // Else return specific gameweek information. (Or error thrown by controller).
  return res.status(200).send(result);
});

router.post("/create", async (req: Request, res: Response) => {
  const { user_id, matches, deadline } = req.body;

  let result = await create(user_id, matches, deadline);

  switch (result) {
    case "E00000":
      return res.status(200).send("Successfully created new coupon.");
    case "EFURINF":
      return res.status(401).send("Unauthorised Access.");
    case "EUNGWP":
      return res
        .status(403)
        .send("Forbidden. Please contact your administrator.");
    case "ECGWQU":
      return res
        .status(400)
        .send(
          "Creation of new coupon failed. If this error persists, please contact your administrator."
        );
    default:
      return res.status(500);
  }
});

export { router as routeGameweek };
