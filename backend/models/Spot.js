const { prisma } = require('../config/database');

class SpotService {
  /**
   * Get spots for a specific land
   */
  async getSpotsByLand(landId) {
    const spots = await prisma.spot.findMany({
      where: { landId: parseInt(landId) },
      orderBy: {
        monthName: 'asc'
      }
    });

    return spots;
  }

  /**
   * Get spot by ID
   */
  async getSpotById(spotId) {
    const spot = await prisma.spot.findUnique({
      where: { id: parseInt(spotId) },
      include: {
        land: true
      }
    });

    if (!spot) {
      throw new Error('Spot not found');
    }

    return spot;
  }

  /**
   * Unlock a spot
   */
  async unlockSpot(spotId, userId) {
    const spot = await prisma.spot.update({
      where: { id: parseInt(spotId) },
      data: { isUnlocked: true }
    });

    // Update user's current spot
    await prisma.user.update({
      where: { id: userId },
      data: { 
        currentSpotId: spot.id,
        currentLandId: spot.landId
      }
    });

    return spot;
  }

  /**
   * Get user's progress for a specific spot
   */
  async getSpotProgress(spotId, userId) {
    const spot = await this.getSpotById(spotId);

    // Get all progress entries for this spot
    const progress = await prisma.userProgress.findMany({
      where: {
        userId,
        spotId: parseInt(spotId)
      },
      include: {
        habit: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        dayNumber: 'asc'
      }
    });

    // Calculate completion stats
    const totalDays = 30;
    const completedDays = new Set(
      progress.filter(p => p.status === 'completed').map(p => p.dayNumber)
    ).size;
    const completionPercentage = Math.round((completedDays / totalDays) * 100);

    return {
      spot,
      progress,
      stats: {
        totalDays,
        completedDays,
        completionPercentage,
        currentDay: completedDays + 1
      }
    };
  }

  /**
   * Check if spot is completed (30 days done)
   */
  async isSpotCompleted(spotId, userId) {
    const uniqueDays = await prisma.userProgress.groupBy({
      by: ['dayNumber'],
      where: {
        userId,
        spotId: parseInt(spotId),
        status: 'completed'
      }
    });

    return uniqueDays.length >= 30;
  }
}

module.exports = new SpotService();