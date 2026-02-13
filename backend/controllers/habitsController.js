                                                              import prisma from "../config/prisma.js";

export const getHabitsByCategory = async (req, res, categoryId) => {
  try {
    const userId = parseInt(req.query.userId);
    if (!userId) return res.status(400).json({ error: "userId query param is required" });

    const habits = await prisma.habit.findMany({
      where: {
        categoryId,
        OR: [{ userId: null }, { userId: userId }]
      },
      include: {
        userHabits: { where: { userId } }
      }
    });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createHabitByCategory = async (req, res, categoryId) => {
  try {
    const { taskName, userId } = req.body;
    const habit = await prisma.habit.create({
      data: {
        taskName,
        categoryId,
        userId: userId ? parseInt(userId) : null
      }
    });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 