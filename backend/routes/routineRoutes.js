import express from "express";
import {
  checkHabit,
  uncheckHabit,
  addToRoutine
} from "../controllers/routineController.js";

const router = express.Router();

router.post("/", addToRoutine);

router.put("/:habitId/check", checkHabit);

router.put("/:habitId/uncheck", uncheckHabit);

export default router;
