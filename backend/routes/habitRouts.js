import express from 'express';
import { logDailyHabit } from '../controllers/habitController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route for daily medication/wellness check-in
router.post('/check-in', authMiddleware, logDailyHabit);

export default router;