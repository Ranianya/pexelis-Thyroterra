import prisma from "../config/prisma.js";

// GET /api/monthly - Get all monthly progress for the logged-in user
export const getMonthlyProgress = async (req, res) => {
  try {
    const progress = await prisma.monthlyProgressDisplay.findMany({
      where: { userId: req.user.id },
      orderBy: { spotId: 'asc' }
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch monthly progress" });
  }
};

// POST /api/monthly/recalculate - Calculate progress percentage for a spot
export const recalculateMonthlyProgress = async (req, res) => {
  const { spotId } = req.body;
  const userId = req.user.id;

  try {
    // 1. Count total habits assigned to this user
    const totalHabitsCount = await prisma.userHabit.count({
      where: { userId }
    });

    // 2. Count completed tasks in UserProgress for this specific spot (all 30 days)
    const completedTasksCount = await prisma.userProgress.count({
      where: {
        userId,
        spotId,
        status: "completed"
      }
    });

    // 3. Calculate percentage (Max possible = totalHabits * 30 days)
    const totalPossiblePoints = totalHabitsCount * 30;
    const percentage = totalPossiblePoints > 0 
      ? Math.round((completedTasksCount / totalPossiblePoints) * 100) 
      : 0;

    // 4. Update or Create the display record
    const updatedDisplay = await prisma.monthlyProgressDisplay.upsert({
      where: {
        userId_spotId: { userId, spotId }
      },
      update: { progressPercentage: percentage },
      create: {
        userId,
        spotId,
        progressPercentage: percentage
      }
    });

    res.json({ message: "Recalculation complete", data: updatedDisplay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Recalculation failed" });
  }
  
};