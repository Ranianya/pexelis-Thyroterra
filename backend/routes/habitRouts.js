const express = require('express');
const router = express.Router();
const HabitController = require('../controllers/habitController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes - get habits and categories
router.get('/categories', HabitController.getCategories);
router.get('/', HabitController.getAllHabits);
router.get('/category/:categoryId', HabitController.getHabitsByCategory);

// Protected routes - require authentication
router.get('/today', authMiddleware, HabitController.getTodayHabits);
router.post('/complete', authMiddleware, HabitController.completeHabit);

// Admin routes (for now, just authenticated)
router.post('/', authMiddleware, HabitController.createHabit);
router.post('/categories', authMiddleware, HabitController.createCategory);

module.exports = router;