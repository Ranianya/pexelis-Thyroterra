import prisma from "../config/prisma.js";

/**
 * GET habits by category
 */
export const getHabitsByCategory = async (req, res, categoryId) => {
  try {
    const userId = parseInt(req.query.userId);
    if (!userId) return res.status(400).json({ error: "userId query param is required" });

    const habits = await prisma.habit.findMany({
      where: {
        categoryId,
        OR: [
          { userId: null },    // global habit
          { userId: userId }   // private habit of this user
        ]
      },
      include: {
        userHabits: {
          where: { userId }    // include checked info
        }
      }
    });

    res.json(habits);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * CREATE habit by category
 */
export const createHabitByCategory = async (req, res, categoryId) => {
  try {
    const { taskName, userId } = req.body;

    if (!taskName) return res.status(400).json({ error: "taskName is required" });

    const habit = await prisma.habit.create({
      data: {
        taskName,
        categoryId,
        userId: userId || null   // null = global habit
      }
    });

    res.json(habit);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
