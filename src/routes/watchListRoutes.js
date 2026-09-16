import express from "express";
import { addToWatchList } from "../controllers/watchListController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware)

router.post("/", addToWatchList);

router.delete("/");

//router.post("/logout", logout);

export default router;
