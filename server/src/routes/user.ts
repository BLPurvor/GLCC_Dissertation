import express, { Request, Response } from "express";
import { updateById, getSafeInfo } from "../controller/user";
import { User } from "../types/user";
const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  // Send query to DB using id url parameter
  const result: User | string = await getSafeInfo(req.params.id);

  switch (typeof result) {
    case "string":
      return res
        .status(404)
        .send("Could not find this user. Please try again later.");
    default:
      return res.status(200).send(result);
  }
});

router.post("/update", async (req: Request, res: Response) => {
  // Update user details based on user_id given in URL
  const result = await updateById(req.body);

  switch (result) {
    case "E00000":
      return res.status(200).send("Successfully updated details!");
    case "EUUPAS":
      return res
        .status(401)
        .send(
          "Could not update using the provided credentials. Please try again."
        );
    case "EUDIPS":
      return res
        .status(501)
        .send(
          "Something went wrong. Please try again later. If this error persists, please contact the administrator."
        );
    case "EGUIPF":
      return res.status(400).send("Please provide your password.");
    default:
      return res.status(500).send(result);
  }
});

export { router as routeUser };
