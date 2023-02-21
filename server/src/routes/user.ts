import express, { Request, Response } from "express";
import { updateById, getSafeInfo } from "../controller/user";
const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  // Send query to DB using id url parameter
  const result = await getSafeInfo(req.params.id);

  return res.send(result);
});

router.post("/update", async (req: Request, res: Response) => {
  // Update user details based on user_id given in URL
  const result = await updateById(req.body);

  return res.send(result);
});

export { router as routeUser };
