/**
 * Authentication Service
 * Handles JWT token generation and verification
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../utils/errorHandler');

class AuthService {
  /**
   * Generate JWT token
   */
  generateToken(userId, expiresIn = process.env.JWT_EXPIRE || '7d') {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn }
    );
  }

  /**
   * Generate refresh token (longer expiration)
   */
  generateRefreshToken(userId) {
    return jwt.sign(
      { userId, type: 'refresh' },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
  }

  /**
   * Verify JWT token
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Token has expired');
      }
      throw new UnauthorizedError('Invalid token');
    }
  }

  /**
   * Decode token without verification (for debugging)
   */
  decodeToken(token) {
    return jwt.decode(token);
  }

  /**
   * Hash password
   */
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compare password with hash
   */
  async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Extract token from request header
   */
  extractTokenFromHeader(req) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    return authHeader.split(' ')[1];
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token) {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded || !decoded.exp) return true;
      
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  /**
   * Get token expiration time
   */
  getTokenExpiration(token) {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded || !decoded.exp) return null;
      
      return new Date(decoded.exp * 1000);
    } catch (error) {
      return null;
    }
  }

  /**
   * Generate password reset token
   */
  generatePasswordResetToken(userId) {
    return jwt.sign(
      { userId, type: 'password-reset' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }

  /**
   * Verify password reset token
   */
  verifyPasswordResetToken(token) {
    try {
      const decoded = this.verifyToken(token);
      
      if (decoded.type !== 'password-reset') {
        throw new UnauthorizedError('Invalid token type');
      }
      
      return decoded;
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired password reset token');
    }
  }
}

module.exports = new AuthService();
