const LandService = require('../models/Land');
const SpotService = require('../models/Spot');

class LandController {
  /**
   * GET /api/lands
   * Get all lands
   */
  async getAllLands(req, res) {
    try {
      const userId = req.user?.id;

      let lands;
      if (userId) {
        lands = await LandService.getUserLands(userId);
      } else {
        lands = await LandService.getAllLands();
      }

      res.json({
        success: true,
        data: lands
      });
    } catch (error) {
      console.error('Get lands error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch lands',
        error: error.message
      });
    }
  }

  /**
   * GET /api/lands/:landId
   * Get land by ID
   */
  async getLandById(req, res) {
    try {
      const { landId } = req.params;
      const land = await LandService.getLandById(landId);

      res.json({
        success: true,
        data: land
      });
    } catch (error) {
      console.error('Get land error:', error);
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * POST /api/lands
   * Create a new land (admin)
   */
  async createLand(req, res) {
    try {
      const landData = req.body;
      const land = await LandService.createLand(landData);

      res.status(201).json({
        success: true,
        message: 'Land created successfully',
        data: land
      });
    } catch (error) {
      console.error('Create land error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create land',
        error: error.message
      });
    }
  }

  /**
   * POST /api/lands/:landId/unlock
   * Unlock a land
   */
  async unlockLand(req, res) {
    try {
      const { landId } = req.params;
      const userId = req.user.id;

      const land = await LandService.unlockLand(landId, userId);

      res.json({
        success: true,
        message: 'Land unlocked successfully',
        data: land
      });
    } catch (error) {
      console.error('Unlock land error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to unlock land',
        error: error.message
      });
    }
  }
}

class SpotController {
  /**
   * GET /api/spots/land/:landId
   * Get spots for a land
   */
  async getSpotsByLand(req, res) {
    try {
      const { landId } = req.params;
      const spots = await SpotService.getSpotsByLand(landId);

      res.json({
        success: true,
        data: spots
      });
    } catch (error) {
      console.error('Get spots error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch spots',
        error: error.message
      });
    }
  }

  /**
   * GET /api/spots/:spotId
   * Get spot by ID
   */
  async getSpotById(req, res) {
    try {
      const { spotId } = req.params;
      const spot = await SpotService.getSpotById(spotId);

      res.json({
        success: true,
        data: spot
      });
    } catch (error) {
      console.error('Get spot error:', error);
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * GET /api/spots/:spotId/progress
   * Get user's progress for a spot
   */
  async getSpotProgress(req, res) {
    try {
      const { spotId } = req.params;
      const userId = req.user.id;

      const progress = await SpotService.getSpotProgress(spotId, userId);

      res.json({
        success: true,
        data: progress
      });
    } catch (error) {
      console.error('Get spot progress error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch spot progress',
        error: error.message
      });
    }
  }

  /**
   * POST /api/spots/:spotId/unlock
   * Unlock a spot
   */
  async unlockSpot(req, res) {
    try {
      const { spotId } = req.params;
      const userId = req.user.id;

      const spot = await SpotService.unlockSpot(spotId, userId);

      res.json({
        success: true,
        message: 'Spot unlocked successfully',
        data: spot
      });
    } catch (error) {
      console.error('Unlock spot error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to unlock spot',
        error: error.message
      });
    }
  }
}

module.exports = {
  LandController: new LandController(),
  SpotController: new SpotController()
};