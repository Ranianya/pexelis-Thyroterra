import express from "express";
import { getFaqs, getHearts, updateHearts } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/faq", getFaqs);
router.get("/hearts", protect, getHearts);
router.put("/hearts", protect, updateHearts);

export default router;