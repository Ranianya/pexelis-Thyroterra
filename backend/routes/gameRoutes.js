import express from "express";
import { initializeUserJourney, getCurrentJourney } from "../controllers/gameController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Initialize journey (POST /api/game/initialize)
router.post("/initialize", protect, initializeUserJourney);

// Get current journey (GET /api/game/journey)
router.get("/journey", protect, getCurrentJourney);

export default router;
