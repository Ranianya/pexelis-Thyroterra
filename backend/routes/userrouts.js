const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

// Auth routes (public)
router.post(
  '/auth/register',
  UserController.constructor.registerValidation,
  UserController.register
);

router.post(
  '/auth/login',
  UserController.constructor.loginValidation,
  UserController.login
);

// User routes (protected)
router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/progress', authMiddleware, UserController.updateProgress);
router.put('/hearts', authMiddleware, UserController.updateHearts);

module.exports = router;