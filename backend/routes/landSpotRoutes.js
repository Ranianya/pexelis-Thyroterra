const express = require('express');
const router = express.Router();
const { LandController, SpotController } = require('../controllers/landSpotController');
const authMiddleware = require('../middlewares/authMiddleware');

// Land routes
router.get('/lands', LandController.getAllLands);
router.get('/lands/:landId', LandController.getLandById);
router.post('/lands', authMiddleware, LandController.createLand);
router.post('/lands/:landId/unlock', authMiddleware, LandController.unlockLand);

// Spot routes
router.get('/spots/land/:landId', SpotController.getSpotsByLand);
router.get('/spots/:spotId', SpotController.getSpotById);
router.get('/spots/:spotId/progress', authMiddleware, SpotController.getSpotProgress);
router.post('/spots/:spotId/unlock', authMiddleware, SpotController.unlockSpot);

module.exports = router;