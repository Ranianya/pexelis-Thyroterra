import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only logged-in users can access this

router.post("/register", register);
router.post("/login", login);

export default router;
