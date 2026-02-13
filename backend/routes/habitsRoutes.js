import express from "express";
import { getHabitsByCategory, createHabitByCategory } from "../controllers/habitsController.js";

const router = express.Router();

router.get("/category1", (req, res) => getHabitsByCategory(req, res, 1));
router.get("/category2", (req, res) => getHabitsByCategory(req, res, 2));
router.post("/category1", (req, res) => createHabitByCategory(req, res, 1));
router.post("/category2", (req, res) => createHabitByCategory(req, res, 2));

export default router;