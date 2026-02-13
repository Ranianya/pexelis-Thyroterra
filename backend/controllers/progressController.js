import prisma from "../config/prisma.js";

///////////////////////////////////////////////////////////
// GET /api/progress/today
// Get all habits user selected (isChecked = true)
// + include today's progress
///////////////////////////////////////////////////////////
export const getTodaysHabits = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1️⃣ Get user with current spot
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { currentSpot: true },
    });

    if (!user || !user.currentSpot) {
      return res.status(400).json({
        error: "User or current spot not found",
      });
    }

    const spotId = user.currentSpot.id;
    const todayNumber = new Date().getDate();

    // 2️⃣ Find today's Day record
    const todayDay = await prisma.day.findUnique({
      where: {
        spotId_dayNumber: {
          spotId,
          dayNumber: todayNumber,
        },
      },
    });

    if (!todayDay) {
      return res.status(404).json({ error: "Day not found" });
    }

    // 3️⃣ Get user selected habits
    const userHabits = await prisma.userHabit.findMany({
      where: {
        userId,
        isChecked: true,
      },
      include: {
        habit: true,
      },
    });

    if (!userHabits.length) {
      return res.json({ habits: [] });
    }

    const habitIds = userHabits.map((uh) => uh.habitId);

    // 4️⃣ Get today's progress using dayId
    const progressList = await prisma.userProgress.findMany({
      where: {
        userId,
        spotId,
        dayId: todayDay.id,
        habitId: { in: habitIds },
      },
    });

    // 5️⃣ Merge habit + progress
    const habits = userHabits.map((uh) => {
      const progress = progressList.find(
        (p) => p.habitId === uh.habitId
      );

      return {
        id: uh.habit.id,
        taskName: uh.habit.taskName,
        categoryId: uh.habit.categoryId,
        progressStatus: progress ? progress.status : "missed",
      };
    });

    res.json({ habits });

  } catch (error) {
    console.error("GET TODAY ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

///////////////////////////////////////////////////////////
// PUT /api/progress/:id
// Mark a habit as completed for today
///////////////////////////////////////////////////////////
export const updateHabitProgress = async (req, res) => {
  const userId = req.user.id;
  const habitId = parseInt(req.params.id);

  if (!habitId) {
    return res.status(400).json({ error: "Invalid habit ID" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { currentSpot: true },
    });

    if (!user || !user.currentSpot) {
      return res.status(400).json({
        error: "User or current spot not found",
      });
    }

    const spotId = user.currentSpot.id;
    const todayNumber = new Date().getDate();

    // 1️⃣ Get today day record
    const todayDay = await prisma.day.findUnique({
      where: {
        spotId_dayNumber: {
          spotId,
          dayNumber: todayNumber,
        },
      },
    });

    if (!todayDay) {
      return res.status(404).json({ error: "Day not found" });
    }

    // 2️⃣ Check habit belongs to user
    const userHabit = await prisma.userHabit.findUnique({
      where: {
        userId_habitId: {
          userId,
          habitId,
        },
      },
    });

    if (!userHabit || !userHabit.isChecked) {
      return res.status(403).json({
        error: "Habit not selected for user",
      });
    }

    // 3️⃣ Upsert using dayId
   const progress = await prisma.userProgress.upsert({
  where: {
    userId_habitId_dayId: {
      userId,
      habitId,
      dayId: todayDay.id,
    },
  },
  update: {
    status: "completed",
  },
  create: {
    userId,
    habitId,
    spotId,
    dayId: todayDay.id,
    status: "completed",
  },
});

    res.json({
      message: "Habit marked as completed",
      progress,
    });

  } catch (error) {
    console.error("UPDATE PROGRESS ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};
