const UserProgressService = require('../models/UserProgress');
const MonthlyProgressService = require('../models/MonthlyProgress');
const ProgressCalculator = require('../utils/progressCalculator');

class ProgressController {
  /**
   * GET /api/progress
   * Get user's overall progress
   */
  async getUserProgress(req, res) {
    try {
      const userId = req.user.id;
      const { spotId } = req.query;

      const progress = await UserProgressService.getUserProgress(userId, spotId);

      res.json({
        success: true,
        data: progress
      });
    } catch (error) {
      console.error('Get progress error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch progress',
        error: error.message
      });
    }
  }

  /**
   * GET /api/progress/stats
   * Get statistics for a specific spot
   */
  async getSpotStats(req, res) {
    try {
      const userId = req.user.id;
      const { spotId } = req.query;

      if (!spotId) {
        return res.status(400).json({
          success: false,
          message: 'spotId is required'
        });
      }

      const stats = await UserProgressService.getSpotStats(userId, spotId);
      const insights = ProgressCalculator.generateInsights(stats);
      const currentDay = await UserProgressService.getCurrentDay(userId, spotId);
      const nextMilestone = ProgressCalculator.calculateNextMilestone(currentDay);
      const guideMessage = ProgressCalculator.getForestGuideMessage(
        stats.completionRate,
        'completed'
      );

      res.json({
        success: true,
        data: {
          stats,
          insights,
          currentDay,
          nextMilestone,
          forestGuide: guideMessage
        }
      });
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch statistics',
        error: error.message
      });
    }
  }

  /**
   * GET /api/progress/streak
   * Get user's current streak
   */
  async getUserStreak(req, res) {
    try {
      const userId = req.user.id;
      const { spotId } = req.query;

      if (!spotId) {
        return res.status(400).json({
          success: false,
          message: 'spotId is required'
        });
      }

      const streak = await UserProgressService.getUserStreak(userId, spotId);

      res.json({
        success: true,
        data: {
          streak,
          message: streak >= 7 
            ? `🔥 Amazing ${streak}-day streak!` 
            : `Keep going! Current streak: ${streak} days`
        }
      });
    } catch (error) {
      console.error('Get streak error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch streak',
        error: error.message
      });
    }
  }

  /**
   * GET /api/progress/monthly/:monthIndex
   * Get monthly progress display
   */
  async getMonthlyProgress(req, res) {
    try {
      const userId = req.user.id;
      const { monthIndex } = req.params;

      const progress = await MonthlyProgressService.getMonthlyProgress(
        userId,
        monthIndex
      );

      res.json({
        success: true,
        data: progress
      });
    } catch (error) {
      console.error('Get monthly progress error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch monthly progress',
        error: error.message
      });
    }
  }

  /**
   * GET /api/progress/monthly
   * Get all monthly progress
   */
  async getAllMonthlyProgress(req, res) {
    try {
      const userId = req.user.id;
      const allProgress = await MonthlyProgressService.getAllMonthlyProgress(userId);

      res.json({
        success: true,
        data: allProgress
      });
    } catch (error) {
      console.error('Get all monthly progress error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch monthly progress',
        error: error.message
      });
    }
  }

  /**
   * PUT /api/progress/monthly/:monthIndex
   * Update monthly progress manually
   */
  async updateMonthlyProgress(req, res) {
    try {
      const userId = req.user.id;
      const { monthIndex } = req.params;
      const progressData = req.body;

      const progress = await MonthlyProgressService.updateMonthlyProgress(
        userId,
        monthIndex,
        progressData
      );

      res.json({
        success: true,
        message: 'Monthly progress updated successfully',
        data: progress
      });
    } catch (error) {
      console.error('Update monthly progress error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update monthly progress',
        error: error.message
      });
    }
  }

  /**
   * POST /api/progress/calculate
   * Recalculate monthly progress from daily data
   */
  async calculateMonthlyProgress(req, res) {
    try {
      const userId = req.user.id;
      const { spotId, monthIndex } = req.body;

      if (!spotId || !monthIndex) {
        return res.status(400).json({
          success: false,
          message: 'spotId and monthIndex are required'
        });
      }

      const progress = await MonthlyProgressService.calculateMonthlyProgress(
        userId,
        spotId,
        monthIndex
      );

      res.json({
        success: true,
        message: 'Monthly progress calculated successfully',
        data: progress
      });
    } catch (error) {
      console.error('Calculate monthly progress error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to calculate monthly progress',
        error: error.message
      });
    }
  }
}

module.exports = new ProgressController();