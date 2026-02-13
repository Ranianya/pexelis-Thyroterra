import prisma from "../config/prisma.js";

///////////////////////////////////////////////////////////
// GET /api/progress/today
// Get all habits user selected (isChecked = true) + today's progress
///////////////////////////////////////////////////////////
export const getTodaysHabits = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { currentSpot: true },
    });

    if (!user || !user.currentSpot)
      return res.status(400).json({ error: "User or current spot not found" });

    const spotId = user.currentSpot.id;

    // Get today's day (first unlocked day not completed)
    const todayDay = await prisma.day.findFirst({
      where: { spotId },
      orderBy: { dayNumber: "asc" },
    });

    if (!todayDay) return res.status(404).json({ error: "Day not found" });

    const userHabits = await prisma.userHabit.findMany({
      where: { userId, isChecked: true },
      include: { habit: true },
    });

    if (!userHabits.length) return res.json({ habits: [], dayId: todayDay.id });

    const habitIds = userHabits.map((uh) => uh.habitId);

    const progressList = await prisma.userProgress.findMany({
      where: { userId, dayId: todayDay.id, habitId: { in: habitIds } },
    });

    const habits = userHabits.map((uh) => {
      const progress = progressList.find((p) => p.habitId === uh.habitId);
      return {
        id: uh.habit.id,
        taskName: uh.habit.taskName,
        categoryId: uh.habit.categoryId,
        progressStatus: progress ? progress.status : "missed",
      };
    });

    res.json({ habits, dayId: todayDay.id });
  } catch (error) {
    console.error("GET TODAY ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

///////////////////////////////////////////////////////////
// PUT /api/progress/:id
// Mark a habit as completed for a specific day
///////////////////////////////////////////////////////////
export const updateHabitProgress = async (req, res) => {
  const userId = req.user.id;
  const habitId = parseInt(req.params.id);
  const { dayId } = req.body;

  if (!habitId) return res.status(400).json({ error: "Invalid habit ID" });
  if (!dayId) return res.status(400).json({ error: "dayId is required" });

  try {
    const userHabit = await prisma.userHabit.findUnique({
      where: { userId_habitId: { userId, habitId } },
    });

    if (!userHabit || !userHabit.isChecked)
      return res.status(403).json({ error: "Habit not selected for user" });

    const day = await prisma.day.findUnique({ where: { id: dayId } });
    if (!day) return res.status(404).json({ error: "Day not found" });

    const progress = await prisma.userProgress.upsert({
      where: { userId_habitId_dayId: { userId, habitId, dayId } },
      update: { status: "completed" },
      create: { userId, habitId, dayId, spotId: day.spotId, status: "completed" },
    });

    res.json({ message: "Habit marked as completed", progress });
  } catch (error) {
    console.error("UPDATE PROGRESS ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

///////////////////////////////////////////////////////////
// POST /api/progress/complete-day/:dayId
// Complete day only if all Thyroid Treatment habits checked are completed
///////////////////////////////////////////////////////////
export const completeDay = async (req, res) => {
  const userId = req.user.id;
  const dayId = parseInt(req.params.dayId);

  if (!dayId) return res.status(400).json({ error: "Invalid day ID" });

  try {
    const day = await prisma.day.findUnique({
      where: { id: dayId },
      include: { spot: true },
    });

    if (!day) return res.status(404).json({ error: "Day not found" });

    // 1️⃣ Get all Thyroid Treatment habits checked
    const thyroidHabits = await prisma.userHabit.findMany({
      where: {
        userId,
        isChecked: true,
        habit: { category: { categoryName: "Thyroid Treatment" } },
      },
    });

    if (!thyroidHabits.length)
      return res.status(400).json({ error: "No Thyroid Treatment habits selected" });

    const habitIds = thyroidHabits.map((h) => h.habitId);

    // 2️⃣ Count completed habits
    const completedCount = await prisma.userProgress.count({
      where: { userId, dayId, habitId: { in: habitIds }, status: "completed" },
    });

    // ❌ Not complete → reset day
    if (completedCount !== habitIds.length) {
      await prisma.userProgress.updateMany({
        where: { userId, dayId },
        data: { status: "missed" },
      });

      return res.json({
        dayCompleted: false,
        message: "Day failed ❌ Habits reset. Repeat the day.",
      });
    }

    // ✅ Day completed
    await prisma.userDay.upsert({
      where: { userId_dayId: { userId, dayId } },
      update: { completed: true },
      create: { userId, dayId, unlocked: true, completed: true },
    });

    // 3️⃣ Unlock next day
    const nextDay = await prisma.day.findFirst({
      where: { spotId: day.spotId, dayNumber: day.dayNumber + 1 },
    });

    if (nextDay) {
      await prisma.userDay.upsert({
        where: { userId_dayId: { userId, dayId: nextDay.id } },
        update: { unlocked: true },
        create: { userId, dayId: nextDay.id, unlocked: true },
      });
    }

    // 4️⃣ Unlock next spot if all days completed
    const spotDays = await prisma.day.findMany({ where: { spotId: day.spotId } });
    const completedSpotDays = await prisma.userDay.count({
      where: { userId, dayId: { in: spotDays.map((d) => d.id) }, completed: true },
    });

    if (completedSpotDays === spotDays.length) {
      const nextSpot = await prisma.spot.findFirst({
        where: { landId: day.spot.landId, monthName: day.spot.monthName + 1 },
      });

      if (nextSpot) {
        await prisma.userSpot.upsert({
          where: { userId_spotId: { userId, spotId: nextSpot.id } },
          update: { unlocked: true },
          create: { userId, spotId: nextSpot.id, unlocked: true },
        });

        await prisma.user.update({
          where: { id: userId },
          data: { currentSpotId: nextSpot.id },
        });
      } else {
        // 5️⃣ Unlock next land if all spots completed
        const nextLand = await prisma.land.findFirst({ where: { id: day.spot.landId + 1 } });
        if (nextLand) {
          await prisma.userLand.upsert({
            where: { userId_landId: { userId, landId: nextLand.id } },
            update: { unlocked: true },
            create: { userId, landId: nextLand.id, unlocked: true },
          });
        }
      }
    }

    return res.json({ dayCompleted: true, message: "Day completed ✅ Next day unlocked!" });
  } catch (error) {
    console.error("COMPLETE DAY ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

///////////////////////////////////////////////////////////
// GET /api/progress/current-month
// Get current month (spot) of user
///////////////////////////////////////////////////////////
export const getCurrentMonth = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { currentSpot: true },
    });

    if (!user || !user.currentSpot)
      return res.status(400).json({ error: "User or current spot not found" });

    res.json({ currentMonth: user.currentSpot.monthName, spotId: user.currentSpot.id });
  } catch (error) {
    console.error("GET CURRENT MONTH ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

///////////////////////////////////////////////////////////
// POST /api/progress/complete-month/:spotId
// Complete spot if all days completed → unlock next spot/land
///////////////////////////////////////////////////////////
export const completeMonth = async (req, res) => {
  const userId = req.user.id;
  const spotId = parseInt(req.params.spotId);

  try {
    const spot = await prisma.spot.findUnique({
      where: { id: spotId },
      include: { days: true, land: true },
    });

    if (!spot) return res.status(404).json({ error: "Spot not found" });

    const spotDayIds = spot.days.map((d) => d.id);
    const completedDaysCount = await prisma.userDay.count({
      where: { userId, dayId: { in: spotDayIds }, completed: true },
    });

    if (completedDaysCount !== spot.days.length)
      return res.json({ monthCompleted: false, message: "Month not fully completed" });

    // Unlock next spot
    const nextSpot = await prisma.spot.findFirst({
      where: { landId: spot.landId, monthName: spot.monthName + 1 },
    });

    if (nextSpot) {
      await prisma.userSpot.upsert({
        where: { userId_spotId: { userId, spotId: nextSpot.id } },
        update: { unlocked: true },
        create: { userId, spotId: nextSpot.id, unlocked: true },
      });

      await prisma.user.update({ where: { id: userId }, data: { currentSpotId: nextSpot.id } });

      return res.json({ monthCompleted: true, yearCompleted: false, message: "🎉 Month completed! Next month unlocked!" });
    }

    // Unlock next land if no next spot
    const nextLand = await prisma.land.findFirst({ where: { id: spot.landId + 1 } });
    if (nextLand) {
      await prisma.userLand.upsert({
        where: { userId_landId: { userId, landId: nextLand.id } },
        update: { unlocked: true },
        create: { userId, landId: nextLand.id, unlocked: true },
      });

      return res.json({ monthCompleted: true, yearCompleted: true, message: "🏆 Year completed! New Land unlocked!" });
    }

    res.json({ monthCompleted: true, yearCompleted: true, message: "🏆 Game fully completed!" });
  } catch (error) {
    console.error("COMPLETE MONTH ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};