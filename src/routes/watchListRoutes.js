import express from "express";
import {
  addToWatchList,
  updateWatchListItem,
  removeFromWatchList,
} from "../controllers/watchListController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchListSchema } from "../validators/watchListValidators.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(addToWatchListSchema), addToWatchList);

router.delete("/:id", removeFromWatchList);

router.put("/:id", updateWatchListItem);

export default router;
