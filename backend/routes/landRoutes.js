import express from "express";
import { getAllLands, getLandSpots, updateUserSpot } from "../controllers/landController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllLands);
router.get("/:id/spots", getLandSpots);
router.put("/update-position", protect, updateUserSpot);

export default router;