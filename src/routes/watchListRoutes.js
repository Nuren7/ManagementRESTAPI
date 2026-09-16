import express from "express";
import { addToWatchList, updateWatchListItem, removeFromWatchList } from "../controllers/watchListController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware)

router.post("/", addToWatchList);

router.delete("/:id", removeFromWatchList)

router.put("/:id", updateWatchListItem)

export default router;
