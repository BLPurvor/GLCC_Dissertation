import express, { Request, Response } from "express";
import { entrySubmit, getEntryById } from "../controller/entry";
const router = express.Router();

router.post("/submit", async (req: Request, res: Response) => {
  const result = await entrySubmit(req.body);

  switch (result) {
    case "E00000":
      return res.status(200).send("Successfully created entry.");
    case "ECEFGW":
      return res
        .send(400)
        .send("We encountered an error. Please contact your administrator.");
    default:
      return res.send(500).send("Something went wrong.");
      break;
  }
});

router.get("/byUser/:gw_id/:user_id", async (req: Request, res: Response) => {
  const { gw_id, user_id } = req.params;

  const result = await getEntryById(user_id, parseInt(gw_id));

  if (!result) return res.status(404).send("Couldn't be found");

  switch (result) {
    case "EFGWBU":
      return res.status(204).send("No Content");
    default:
      return res.status(200).send(result);
  }
});

export { router as routeEntry };
