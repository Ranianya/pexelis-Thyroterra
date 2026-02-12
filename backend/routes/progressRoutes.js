const express = require('express');
const router = express.Router();
const ProgressController = require('../controllers/progressController');
const authMiddleware = require('../middlewares/authMiddleware');

// All progress routes require authentication
router.use(authMiddleware);

// User progress
router.get('/', ProgressController.getUserProgress);
router.get('/stats', ProgressController.getSpotStats);
router.get('/streak', ProgressController.getUserStreak);

// Monthly progress
router.get('/monthly', ProgressController.getAllMonthlyProgress);
router.get('/monthly/:monthIndex', ProgressController.getMonthlyProgress);
router.put('/monthly/:monthIndex', ProgressController.updateMonthlyProgress);
router.post('/calculate', ProgressController.calculateMonthlyProgress);

module.exports = router;