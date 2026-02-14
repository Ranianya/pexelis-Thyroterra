import express from "express";
import {
  getTodaysHabits,
  updateHabitProgress,
  completeDay,
  completeMonth,
  getCurrentMonth,
} from "../controllers/progressController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

///////////////////////////////////////////////////////////
// GET today's habits
// GET /api/progress/today
///////////////////////////////////////////////////////////
router.get("/today", protect, getTodaysHabits);

///////////////////////////////////////////////////////////
// PUT mark habit as completed
// PUT /api/progress/:id
///////////////////////////////////////////////////////////
router.put("/:id", protect, updateHabitProgress);

///////////////////////////////////////////////////////////
// POST complete a day (Thyroid Treatment rule)
// POST /api/progress/complete-day/:dayId
///////////////////////////////////////////////////////////
router.post("/complete-day/:dayId", protect, completeDay);

///////////////////////////////////////////////////////////
// GET check if month completed
// GET /api/progress/complete-month/:spotId
///////////////////////////////////////////////////////////
router.get("/complete-month/:spotId", protect, completeMonth);

///////////////////////////////////////////////////////////
// GET current month (user currentSpot)
// GET /api/progress/current-month
///////////////////////////////////////////////////////////
router.get("/current-month", protect, getCurrentMonth);

export default router;