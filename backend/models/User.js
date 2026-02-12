const { prisma } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
  /**
   * Register a new user
   */
  async register(userData) {
    const { username, email, password } = userData;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email: email || undefined }
        ]
      }
    });

    if (existingUser) {
      throw new Error('User with this username or email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        heartsCount: 2
      },
      select: {
        id: true,
        username: true,
        email: true,
        heartsCount: true,
        createdAt: true
      }
    });

    // Generate JWT token
    const token = this.generateToken(user.id);

    return { user, token };
  }

  /**
   * Login user
   */
  async login(credentials) {
    const { username, password } = credentials;

    // Find user
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user.id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  /**
   * Get user profile
   */
  async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        currentLand: true,
        currentSpot: {
          include: {
            land: true
          }
        }
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Update user progress (land and spot)
   */
  async updateProgress(userId, { landId, spotId }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        currentLandId: landId,
        currentSpotId: spotId
      },
      include: {
        currentLand: true,
        currentSpot: true
      }
    });

    return user;
  }

  /**
   * Update hearts count
   */
  async updateHearts(userId, heartsCount) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { heartsCount },
      select: {
        id: true,
        username: true,
        heartsCount: true
      }
    });

    return user;
  }

  /**
   * Generate JWT token
   */
  generateToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
  }
}

module.exports = new UserService();