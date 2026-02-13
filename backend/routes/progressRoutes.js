import express from "express";
import { getTodaysHabits, updateHabitProgress } from "../controllers/progressController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get today's habits
router.get("/today", protect, getTodaysHabits);

// Mark habit as completed
router.put("/:id", protect, updateHabitProgress);

export default router;



