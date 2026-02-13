import express from "express";
import { 
  getMonthlyProgress, 
  recalculateMonthlyProgress, 
  getSpotVisitedDays 
} from "../controllers/monthlyController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMonthlyProgress);
router.get("/progress/:spotId", protect, getSpotVisitedDays); // Added this
router.post("/recalculate", protect, recalculateMonthlyProgress);

export default router;