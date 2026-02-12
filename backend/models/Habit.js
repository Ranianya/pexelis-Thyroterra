const { prisma } = require('../config/database');

class HabitService {
  /**
   * Get all habit categories
   */
  async getCategories() {
    const categories = await prisma.habitCategory.findMany({
      include: {
        habits: {
          where: {
            isActive: true
          }
        }
      }
    });

    return categories;
  }

  /**
   * Get all habits
   */
  async getAllHabits() {
    const habits = await prisma.habit.findMany({
      where: {
        isActive: true
      },
      include: {
        category: true
      }
    });

    return habits;
  }

  /**
   * Get habits by category
   */
  async getHabitsByCategory(categoryId) {
    const habits = await prisma.habit.findMany({
      where: {
        categoryId: parseInt(categoryId),
        isActive: true
      },
      include: {
        category: true
      }
    });

    return habits;
  }

  /**
   * Create a new habit
   */
  async createHabit(habitData) {
    const { categoryId, taskName, description } = habitData;

    const habit = await prisma.habit.create({
      data: {
        categoryId: parseInt(categoryId),
        taskName,
        description,
        isActive: true
      },
      include: {
        category: true
      }
    });

    return habit;
  }

  /**
   * Create a new category
   */
  async createCategory(categoryData) {
    const { categoryName, description } = categoryData;

    const category = await prisma.habitCategory.create({
      data: {
        categoryName,
        description
      }
    });

    return category;
  }

  /**
   * Get user's habits for today
   */
  async getTodayHabits(userId, spotId, dayNumber) {
    // Get all active habits
    const allHabits = await this.getAllHabits();

    // Get user's progress for today
    const todayProgress = await prisma.userProgress.findMany({
      where: {
        userId,
        spotId: parseInt(spotId),
        dayNumber: parseInt(dayNumber)
      }
    });

    // Map habits with completion status
    const habitsWithStatus = allHabits.map(habit => {
      const progress = todayProgress.find(p => p.habitId === habit.id);
      return {
        ...habit,
        isCompleted: !!progress,
        status: progress?.status || null,
        completedAt: progress?.completedAt || null
      };
    });

    return habitsWithStatus;
  }
}

module.exports = new HabitService();