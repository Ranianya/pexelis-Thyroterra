const { prisma } = require('../config/database');

class UserProgressService {
  /**
   * Complete a habit for a specific day
   */
  async completeHabit(userId, habitId, spotId, dayNumber) {
    // Check if already completed
    const existing = await prisma.userProgress.findFirst({
      where: {
        userId,
        habitId: parseInt(habitId),
        spotId: parseInt(spotId),
        dayNumber: parseInt(dayNumber)
      }
    });

    if (existing) {
      // Update if it was marked as missed
      if (existing.status === 'missed') {
        const updated = await prisma.userProgress.update({
          where: { id: existing.id },
          data: {
            status: 'completed',
            completedAt: new Date()
          },
          include: {
            habit: {
              include: {
                category: true
              }
            }
          }
        });
        return updated;
      }
      return existing;
    }

    // Create new progress entry
    const progress = await prisma.userProgress.create({
      data: {
        userId,
        habitId: parseInt(habitId),
        spotId: parseInt(spotId),
        dayNumber: parseInt(dayNumber),
        status: 'completed'
      },
      include: {
        habit: {
          include: {
            category: true
          }
        }
      }
    });

    return progress;
  }

  /**
   * Mark a habit as missed
   */
  async markHabitMissed(userId, habitId, spotId, dayNumber) {
    const existing = await prisma.userProgress.findFirst({
      where: {
        userId,
        habitId: parseInt(habitId),
        spotId: parseInt(spotId),
        dayNumber: parseInt(dayNumber)
      }
    });

    if (existing) {
      return await prisma.userProgress.update({
        where: { id: existing.id },
        data: { status: 'missed' }
      });
    }

    return await prisma.userProgress.create({
      data: {
        userId,
        habitId: parseInt(habitId),
        spotId: parseInt(spotId),
        dayNumber: parseInt(dayNumber),
        status: 'missed'
      }
    });
  }

  /**
   * Get user's overall progress
   */
  async getUserProgress(userId, spotId = null) {
    const where = {
      userId
    };

    if (spotId) {
      where.spotId = parseInt(spotId);
    }

    const progress = await prisma.userProgress.findMany({
      where,
      include: {
        habit: {
          include: {
            category: true
          }
        },
        spot: {
          include: {
            land: true
          }
        }
      },
      orderBy: [
        { spotId: 'desc' },
        { dayNumber: 'desc' }
      ]
    });

    return progress;
  }

  /**
   * Get user's streak (consecutive days completed)
   */
  async getUserStreak(userId, spotId) {
    const progress = await prisma.userProgress.findMany({
      where: {
        userId,
        spotId: parseInt(spotId),
        status: 'completed'
      },
      orderBy: {
        dayNumber: 'desc'
      }
    });

    // Group by day and count unique days
    const uniqueDays = [...new Set(progress.map(p => p.dayNumber))].sort((a, b) => b - a);

    let streak = 0;
    for (let i = 0; i < uniqueDays.length; i++) {
      if (i === 0 || uniqueDays[i] === uniqueDays[i - 1] - 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  /**
   * Get progress statistics for a spot
   */
  async getSpotStats(userId, spotId) {
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
      }
    });

    // Calculate stats
    const totalTasks = progress.length;
    const completedTasks = progress.filter(p => p.status === 'completed').length;
    const missedTasks = progress.filter(p => p.status === 'missed').length;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Get unique days
    const uniqueDays = new Set(progress.map(p => p.dayNumber));
    const daysActive = uniqueDays.size;

    // Category breakdown
    const categoryStats = {};
    progress.forEach(p => {
      const catName = p.habit.category.categoryName;
      if (!categoryStats[catName]) {
        categoryStats[catName] = { total: 0, completed: 0 };
      }
      categoryStats[catName].total++;
      if (p.status === 'completed') {
        categoryStats[catName].completed++;
      }
    });

    return {
      totalTasks,
      completedTasks,
      missedTasks,
      completionRate: Math.round(completionRate),
      daysActive,
      categoryStats,
      streak: await this.getUserStreak(userId, spotId)
    };
  }

  /**
   * Get current day number for a spot
   */
  async getCurrentDay(userId, spotId) {
    const maxDay = await prisma.userProgress.findFirst({
      where: {
        userId,
        spotId: parseInt(spotId)
      },
      orderBy: {
        dayNumber: 'desc'
      },
      select: {
        dayNumber: true
      }
    });

    return maxDay ? maxDay.dayNumber + 1 : 1;
  }
}

module.exports = new UserProgressService();