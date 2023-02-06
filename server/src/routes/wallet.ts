import express, { Request, Response } from "express";
import { getWalletByUser } from "../controller/wallet";
const router = express.Router();

router.get("/:user_id", async (req: Request, res: Response) => {
  // Direct query to controller
  const result = await getWalletByUser(req.params.user_id);

  return res.send(result);
});

export { router as routeWallet };
