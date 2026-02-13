import express from "express";
import {
  getHabitsByCategory,
  createHabitByCategory
} from "../controllers/habitsController.js";

const router = express.Router();

// Get habits by category
router.get("/category1", async (req, res) => {
  await getHabitsByCategory(req, res, 1);
});
router.get("/category2", async (req, res) => {
  await getHabitsByCategory(req, res, 2);
});

// Create habit by category
router.post("/category1", async (req, res) => {
  await createHabitByCategory(req, res, 1);
});
router.post("/category2", async (req, res) => {
  await createHabitByCategory(req, res, 2);
});

export default router;
