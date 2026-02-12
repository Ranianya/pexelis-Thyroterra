/**
 * Validation Utilities
 * Common validation functions and sanitizers
 */

const { body, param, query, validationResult } = require('express-validator');

/**
 * Validation middleware wrapper
 */
const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    // Check for errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors
    const extractedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
      value: err.value
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: extractedErrors
    });
  };
};

/**
 * Common validation rules
 */
const validationRules = {
  // User validations
  username: body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),

  email: body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail(),

  password: body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .optional({ checkFalsy: true }),

  passwordSimple: body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  // ID validations
  id: param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),

  userId: param('userId')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),

  habitId: body('habitId')
    .isInt({ min: 1 })
    .withMessage('Habit ID must be a positive integer'),

  spotId: body('spotId')
    .isInt({ min: 1 })
    .withMessage('Spot ID must be a positive integer'),

  landId: param('landId')
    .isInt({ min: 1 })
    .withMessage('Land ID must be a positive integer'),

  // Query validations
  dayNumber: body('dayNumber')
    .isInt({ min: 1, max: 365 })
    .withMessage('Day number must be between 1 and 365'),

  monthIndex: param('monthIndex')
    .isInt({ min: 1, max: 12 })
    .withMessage('Month index must be between 1 and 12'),

  // Pagination
  page: query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  limit: query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  // Habit validations
  taskName: body('taskName')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Task name must be between 3 and 255 characters'),

  categoryId: body('categoryId')
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer'),

  // Progress validations
  status: body('status')
    .optional()
    .isIn(['completed', 'missed'])
    .withMessage('Status must be either "completed" or "missed"'),

  percentage: body('percentage')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Percentage must be between 0 and 100')
};

/**
 * Predefined validation sets
 */
const validationSets = {
  register: [
    validationRules.username,
    validationRules.email,
    validationRules.passwordSimple
  ],

  login: [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],

  completeHabit: [
    validationRules.habitId,
    validationRules.spotId,
    validationRules.dayNumber
  ],

  createHabit: [
    validationRules.categoryId,
    validationRules.taskName,
    body('description').optional().trim()
  ],

  createCategory: [
    body('categoryName')
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('Category name must be between 3 and 50 characters'),
    body('description').optional().trim()
  ],

  updateProgress: [
    body('landId').optional().isInt({ min: 1 }),
    body('spotId').optional().isInt({ min: 1 })
  ],

  updateHearts: [
    body('heartsCount')
      .isInt({ min: 0, max: 10 })
      .withMessage('Hearts count must be between 0 and 10')
  ],

  createFAQ: [
    body('question')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Question must be at least 10 characters'),
    body('answer')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Answer must be at least 10 characters'),
    body('category').optional().trim(),
    body('order').optional().isInt({ min: 0 })
  ]
};

/**
 * Sanitization helpers
 */
const sanitizers = {
  trimAll: (obj) => {
    const trimmed = {};
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'string') {
        trimmed[key] = obj[key].trim();
      } else {
        trimmed[key] = obj[key];
      }
    });
    return trimmed;
  },

  removeEmpty: (obj) => {
    const cleaned = {};
    Object.keys(obj).forEach(key => {
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
        cleaned[key] = obj[key];
      }
    });
    return cleaned;
  }
};

module.exports = {
  validate,
  validationRules,
  validationSets,
  sanitizers
};
