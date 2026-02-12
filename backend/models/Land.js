const { prisma } = require('../config/database');

class LandService {
  /**
   * Get all lands
   */
  async getAllLands() {
    const lands = await prisma.land.findMany({
      include: {
        spots: {
          orderBy: {
            monthName: 'asc'
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    });

    return lands;
  }

  /**
   * Get land by ID
   */
  async getLandById(landId) {
    const land = await prisma.land.findUnique({
      where: { id: parseInt(landId) },
      include: {
        spots: {
          orderBy: {
            monthName: 'asc'
          }
        }
      }
    });

    if (!land) {
      throw new Error('Land not found');
    }

    return land;
  }

  /**
   * Create a new land (admin)
   */
  async createLand(landData) {
    const { name, description, imageUrl, order } = landData;

    const land = await prisma.land.create({
      data: {
        name,
        description,
        imageUrl,
        order: order || 1,
        isUnlocked: false
      }
    });

    // Automatically create 12 spots for this land
    const spots = [];
    for (let month = 1; month <= 12; month++) {
      spots.push({
        landId: land.id,
        monthName: month,
        spotName: `Month ${month}`,
        isUnlocked: false
      });
    }

    await prisma.spot.createMany({
      data: spots
    });

    return this.getLandById(land.id);
  }

  /**
   * Unlock a land for a user
   */
  async unlockLand(landId, userId) {
    // Update land unlock status
    const land = await prisma.land.update({
      where: { id: parseInt(landId) },
      data: { isUnlocked: true }
    });

    // Update user's current land
    await prisma.user.update({
      where: { id: userId },
      data: { currentLandId: land.id }
    });

    return land;
  }

  /**
   * Get user's available lands
   */
  async getUserLands(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentLandId: true,
        currentSpotId: true
      }
    });

    const lands = await this.getAllLands();

    // Mark user's progress
    return lands.map(land => ({
      ...land,
      isCurrent: land.id === user.currentLandId,
      isUnlocked: land.isUnlocked || land.id === user.currentLandId
    }));
  }
}

module.exports = new LandService();