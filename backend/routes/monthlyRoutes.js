import express from "express";
import { getMonthlyProgress, recalculateMonthlyProgress } from "../controllers/monthlyController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMonthlyProgress);
router.post("/recalculate", protect, recalculateMonthlyProgress);

export default router;