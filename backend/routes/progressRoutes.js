import express from "express";
import {
  getTodayProgress,
  updateProgress
} from "../controllers/progressController.js";

const router = express.Router();

router.get("/today/:userId", getTodayProgress);

router.put("/:id", updateProgress);

export default router;
