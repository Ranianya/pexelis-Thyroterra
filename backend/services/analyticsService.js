/**
 * Analytics Service
 * Track and analyze user behavior and system metrics
 */

const { prisma } = require('../config/database');
const logger = require('../utils/logger');

class AnalyticsService {
  /**
   * Track user action
   */
  async trackAction(userId, action, metadata = {}) {
    logger.debug(`Tracking action: ${action} for user ${userId}`, metadata);

    // TODO: Store in analytics database or send to analytics service
    // Example: Google Analytics, Mixpanel, Amplitude, etc.

    return {
      userId,
      action,
      metadata,
      timestamp: new Date()
    };
  }

  /**
   * Get user engagement metrics
   */
  async getUserEngagement(userId) {
    // Total habits completed
    const totalCompleted = await prisma.userProgress.count({
      where: {
        userId,
        status: 'completed'
      }
    });

    // Days active
    const uniqueDays = await prisma.userProgress.groupBy({
      by: ['dayNumber', 'spotId'],
      where: { userId }
    });

    // Current streak
    const recentProgress = await prisma.userProgress.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
      take: 30
    });

    return {
      totalCompleted,
      daysActive: uniqueDays.length,
      lastActive: recentProgress[0]?.completedAt || null,
      engagement: this.calculateEngagementScore(totalCompleted, uniqueDays.length)
    };
  }

  /**
   * Calculate engagement score (0-100)
   */
  calculateEngagementScore(completedTasks, daysActive) {
    // Simple engagement formula
    // Could be made more sophisticated
    const taskScore = Math.min(completedTasks / 100, 1) * 50;
    const dayScore = Math.min(daysActive / 30, 1) * 50;
    
    return Math.round(taskScore + dayScore);
  }

  /**
   * Get adherence rate for a user
   */
  async getAdherenceRate(userId, spotId = null) {
    const where = { userId };
    if (spotId) where.spotId = spotId;

    const total = await prisma.userProgress.count({ where });
    const completed = await prisma.userProgress.count({
      where: { ...where, status: 'completed' }
    });

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  /**
   * Get system-wide statistics
   */
  async getSystemStats() {
    const [
      totalUsers,
      totalHabitsCompleted,
      activeUsersToday,
      totalLands,
      totalSpots
    ] = await Promise.all([
      prisma.user.count(),
      prisma.userProgress.count({ where: { status: 'completed' } }),
      this.getActiveUsersToday(),
      prisma.land.count(),
      prisma.spot.count()
    ]);

    return {
      totalUsers,
      totalHabitsCompleted,
      activeUsersToday,
      totalLands,
      totalSpots,
      averageTasksPerUser: totalUsers > 0 ? Math.round(totalHabitsCompleted / totalUsers) : 0
    };
  }

  /**
   * Get active users today
   */
  async getActiveUsersToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeUsers = await prisma.userProgress.findMany({
      where: {
        completedAt: {
          gte: today
        }
      },
      distinct: ['userId']
    });

    return activeUsers.length;
  }

  /**
   * Get popular habits
   */
  async getPopularHabits(limit = 10) {
    const habitStats = await prisma.userProgress.groupBy({
      by: ['habitId'],
      _count: {
        habitId: true
      },
      orderBy: {
        _count: {
          habitId: 'desc'
        }
      },
      take: limit
    });

    // Fetch habit details
    const habits = await Promise.all(
      habitStats.map(async (stat) => {
        const habit = await prisma.habit.findUnique({
          where: { id: stat.habitId },
          include: { category: true }
        });
        return {
          ...habit,
          completionCount: stat._count.habitId
        };
      })
    );

    return habits;
  }

  /**
   * Get user retention metrics
   */
  async getRetentionMetrics() {
    // Users who signed up 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weekOldUsers = await prisma.user.count({
      where: {
        createdAt: {
          lte: sevenDaysAgo
        }
      }
    });

    // How many of them are still active
    const activeOfWeekOld = await prisma.userProgress.findMany({
      where: {
        completedAt: {
          gte: sevenDaysAgo
        },
        user: {
          createdAt: {
            lte: sevenDaysAgo
          }
        }
      },
      distinct: ['userId']
    });

    const retentionRate = weekOldUsers > 0 
      ? Math.round((activeOfWeekOld.length / weekOldUsers) * 100)
      : 0;

    return {
      totalUsers: weekOldUsers,
      activeUsers: activeOfWeekOld.length,
      retentionRate
    };
  }

  /**
   * Get category performance
   */
  async getCategoryPerformance() {
    const categories = await prisma.habitCategory.findMany({
      include: {
        habits: {
          include: {
            userProgress: {
              where: {
                status: 'completed'
              }
            }
          }
        }
      }
    });

    return categories.map(category => {
      const totalCompletions = category.habits.reduce(
        (sum, habit) => sum + habit.userProgress.length,
        0
      );

      return {
        categoryId: category.id,
        categoryName: category.categoryName,
        totalHabits: category.habits.length,
        totalCompletions,
        averageCompletionsPerHabit: category.habits.length > 0
          ? Math.round(totalCompletions / category.habits.length)
          : 0
      };
    });
  }

  /**
   * Generate user activity report
   */
  async generateUserReport(userId, startDate, endDate) {
    const progress = await prisma.userProgress.findMany({
      where: {
        userId,
        completedAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        habit: {
          include: {
            category: true
          }
        }
      }
    });

    const totalTasks = progress.length;
    const completedTasks = progress.filter(p => p.status === 'completed').length;
    const adherenceRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Group by category
    const categoryBreakdown = {};
    progress.forEach(p => {
      const catName = p.habit.category.categoryName;
      if (!categoryBreakdown[catName]) {
        categoryBreakdown[catName] = { total: 0, completed: 0 };
      }
      categoryBreakdown[catName].total++;
      if (p.status === 'completed') {
        categoryBreakdown[catName].completed++;
      }
    });

    return {
      userId,
      period: { startDate, endDate },
      summary: {
        totalTasks,
        completedTasks,
        missedTasks: totalTasks - completedTasks,
        adherenceRate
      },
      categoryBreakdown
    };
  }
}

module.exports = new AnalyticsService();
