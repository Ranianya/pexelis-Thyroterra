const UserService = require('../models/User');
const { body, validationResult } = require('express-validator');

class UserController {
  /**
   * POST /api/auth/register
   * Register a new user
   */
  async register(req, res) {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { username, email, password } = req.body;

      const result = await UserService.register({
        username,
        email,
        password
      });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * POST /api/auth/login
   * Login user
   */
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { username, password } = req.body;

      const result = await UserService.login({
        username,
        password
      });

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * GET /api/users/profile
   * Get current user profile
   */
  async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const profile = await UserService.getProfile(userId);

      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * PUT /api/users/progress
   * Update user's current land and spot
   */
  async updateProgress(req, res) {
    try {
      const userId = req.user.id;
      const { landId, spotId } = req.body;

      const user = await UserService.updateProgress(userId, {
        landId,
        spotId
      });

      res.json({
        success: true,
        message: 'Progress updated successfully',
        data: user
      });
    } catch (error) {
      console.error('Update progress error:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * PUT /api/users/hearts
   * Update user's hearts count
   */
  async updateHearts(req, res) {
    try {
      const userId = req.user.id;
      const { heartsCount } = req.body;

      if (typeof heartsCount !== 'number') {
        return res.status(400).json({
          success: false,
          message: 'Hearts count must be a number'
        });
      }

      const user = await UserService.updateHearts(userId, heartsCount);

      res.json({
        success: true,
        message: 'Hearts updated successfully',
        data: user
      });
    } catch (error) {
      console.error('Update hearts error:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Validation rules
   */
  static get registerValidation() {
    return [
      body('username')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Username must be between 3 and 50 characters'),
      body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Must be a valid email'),
      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
    ];
  }

  static get loginValidation() {
    return [
      body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required'),
      body('password')
        .notEmpty()
        .withMessage('Password is required')
    ];
  }
}

module.exports = new UserController();