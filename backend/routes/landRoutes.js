import express from "express";
import { getAllLands, getLandSpots, updateUserPosition } from "../controllers/landController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllLands);
router.get("/:id/spots", getLandSpots);
router.put("/spot", protect, updateUserPosition); // PUT /api/lands/spot

export default router;