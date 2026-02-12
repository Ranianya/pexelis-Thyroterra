const HabitService = require('../models/Habit');
const UserProgressService = require('../models/UserProgress');
const MonthlyProgressService = require('../models/MonthlyProgress');

class HabitController {
  /**
   * GET /api/habits/categories
   * Get all habit categories with their habits
   */
  async getCategories(req, res) {
    try {
      const categories = await HabitService.getCategories();
      
      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch categories',
        error: error.message
      });
    }
  }

  /**
   * GET /api/habits
   * Get all habits
   */
  async getAllHabits(req, res) {
    try {
      const habits = await HabitService.getAllHabits();
      
      res.json({
        success: true,
        data: habits
      });
    } catch (error) {
      console.error('Get habits error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch habits',
        error: error.message
      });
    }
  }

  /**
   * GET /api/habits/category/:categoryId
   * Get habits by category
   */
  async getHabitsByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const habits = await HabitService.getHabitsByCategory(categoryId);
      
      res.json({
        success: true,
        data: habits
      });
    } catch (error) {
      console.error('Get habits by category error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch habits',
        error: error.message
      });
    }
  }

  /**
   * GET /api/habits/today
   * Get today's habits for the current user
   */
  async getTodayHabits(req, res) {
    try {
      const userId = req.user.id;
      const { spotId, dayNumber } = req.query;

      if (!spotId || !dayNumber) {
        return res.status(400).json({
          success: false,
          message: 'spotId and dayNumber are required'
        });
      }

      const habits = await HabitService.getTodayHabits(userId, spotId, dayNumber);
      
      res.json({
        success: true,
        data: habits
      });
    } catch (error) {
      console.error('Get today habits error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch today\'s habits',
        error: error.message
      });
    }
  }

  /**
   * POST /api/habits/complete
   * Mark a habit as complete
   */
  async completeHabit(req, res) {
    try {
      const userId = req.user.id;
      const { habitId, spotId, dayNumber } = req.body;

      if (!habitId || !spotId || !dayNumber) {
        return res.status(400).json({
          success: false,
          message: 'habitId, spotId, and dayNumber are required'
        });
      }

      // Mark habit as complete
      const progress = await UserProgressService.completeHabit(
        userId,
        habitId,
        spotId,
        dayNumber
      );

      // Calculate and update monthly progress
      const monthIndex = Math.ceil(parseInt(dayNumber) / 30) || 1;
      await MonthlyProgressService.calculateMonthlyProgress(userId, spotId, monthIndex);

      res.json({
        success: true,
        message: 'Habit completed successfully',
        data: progress
      });
    } catch (error) {
      console.error('Complete habit error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to complete habit',
        error: error.message
      });
    }
  }

  /**
   * POST /api/habits
   * Create a new habit (admin)
   */
  async createHabit(req, res) {
    try {
      const habitData = req.body;
      const habit = await HabitService.createHabit(habitData);
      
      res.status(201).json({
        success: true,
        message: 'Habit created successfully',
        data: habit
      });
    } catch (error) {
      console.error('Create habit error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create habit',
        error: error.message
      });
    }
  }

  /**
   * POST /api/habits/categories
   * Create a new category (admin)
   */
  async createCategory(req, res) {
    try {
      const categoryData = req.body;
      const category = await HabitService.createCategory(categoryData);
      
      res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: category
      });
    } catch (error) {
      console.error('Create category error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create category',
        error: error.message
      });
    }
  }
}

module.exports = new HabitController();