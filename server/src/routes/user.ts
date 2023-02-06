import express, { Request, Response } from "express";
import { getRoleById, getSafeInfo } from "../controller/user";
const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  // Send query to DB using id url parameter
  const result = await getSafeInfo(req.params.id);

  return res.send(result);
});

export { router as routeUser };
