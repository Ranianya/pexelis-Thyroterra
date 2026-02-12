const { prisma } = require('../config/database');

class MonthlyProgressService {
  /**
   * Get or create monthly progress for a user
   */
  async getMonthlyProgress(userId, monthIndex) {
    let progress = await prisma.monthlyProgressDisplay.findUnique({
      where: {
        user_month: {
          userId,
          monthIndex: parseInt(monthIndex)
        }
      }
    });

    if (!progress) {
      progress = await this.createMonthlyProgress(userId, monthIndex);
    }

    return progress;
  }

  /**
   * Create new monthly progress entry
   */
  async createMonthlyProgress(userId, monthIndex) {
    const progress = await prisma.monthlyProgressDisplay.create({
      data: {
        userId,
        monthIndex: parseInt(monthIndex),
        activitiesPercent: 0,
        doctorPercent: 0,
        waterPercent: 0,
        medsPercent: 0,
        eatPercent: 0,
        moodsPercent: 0,
        treeGrowthStage: 1,
        overallScore: 0
      }
    });

    return progress;
  }

  /**
   * Update monthly progress percentages
   */
  async updateMonthlyProgress(userId, monthIndex, progressData) {
    const {
      activitiesPercent,
      doctorPercent,
      waterPercent,
      medsPercent,
      eatPercent,
      moodsPercent
    } = progressData;

    // Calculate overall score (average of all percentages)
    const percentages = [
      activitiesPercent,
      doctorPercent,
      waterPercent,
      medsPercent,
      eatPercent,
      moodsPercent
    ].filter(p => p !== undefined && p !== null);

    const overallScore = percentages.length > 0
      ? percentages.reduce((sum, p) => sum + p, 0) / percentages.length
      : 0;

    // Determine tree growth stage based on overall score
    let treeGrowthStage = 1;
    if (overallScore >= 80) treeGrowthStage = 5;
    else if (overallScore >= 60) treeGrowthStage = 4;
    else if (overallScore >= 40) treeGrowthStage = 3;
    else if (overallScore >= 20) treeGrowthStage = 2;

    const progress = await prisma.monthlyProgressDisplay.upsert({
      where: {
        user_month: {
          userId,
          monthIndex: parseInt(monthIndex)
        }
      },
      update: {
        activitiesPercent: activitiesPercent ?? undefined,
        doctorPercent: doctorPercent ?? undefined,
        waterPercent: waterPercent ?? undefined,
        medsPercent: medsPercent ?? undefined,
        eatPercent: eatPercent ?? undefined,
        moodsPercent: moodsPercent ?? undefined,
        treeGrowthStage,
        overallScore
      },
      create: {
        userId,
        monthIndex: parseInt(monthIndex),
        activitiesPercent: activitiesPercent || 0,
        doctorPercent: doctorPercent || 0,
        waterPercent: waterPercent || 0,
        medsPercent: medsPercent || 0,
        eatPercent: eatPercent || 0,
        moodsPercent: moodsPercent || 0,
        treeGrowthStage,
        overallScore
      }
    });

    return progress;
  }

  /**
   * Calculate monthly progress from user's daily progress
   */
  async calculateMonthlyProgress(userId, spotId, monthIndex) {
    // Get all user progress for this spot
    const userProgress = await prisma.userProgress.findMany({
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

    // Group progress by category
    const categoryProgress = {};
    
    userProgress.forEach(progress => {
      const categoryName = progress.habit.category.categoryName;
      
      if (!categoryProgress[categoryName]) {
        categoryProgress[categoryName] = {
          total: 0,
          completed: 0
        };
      }
      
      categoryProgress[categoryName].total++;
      if (progress.status === 'completed') {
        categoryProgress[categoryName].completed++;
      }
    });

    // Calculate percentages for each tracked metric
    const calculatePercent = (categoryName) => {
      const cat = categoryProgress[categoryName];
      return cat ? Math.round((cat.completed / cat.total) * 100) : 0;
    };

    // Map categories to progress fields
    const progressData = {
      medsPercent: calculatePercent('Thyroid Treatment'),
      activitiesPercent: calculatePercent('Physical Activity'),
      waterPercent: calculatePercent('Hydration'),
      doctorPercent: calculatePercent('Medical Check-ups'),
      eatPercent: calculatePercent('Nutrition'),
      moodsPercent: calculatePercent('Mental Wellness')
    };

    // Update monthly progress
    return await this.updateMonthlyProgress(userId, monthIndex, progressData);
  }

  /**
   * Get all monthly progress for a user
   */
  async getAllMonthlyProgress(userId) {
    const allProgress = await prisma.monthlyProgressDisplay.findMany({
      where: { userId },
      orderBy: { monthIndex: 'asc' }
    });

    return allProgress;
  }
}

module.exports = new MonthlyProgressService();