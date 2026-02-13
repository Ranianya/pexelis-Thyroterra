import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

// Router
const router = express.Router();

/* ================= AUTH ROUTES ================= */

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", protect, logout);

export default router;
