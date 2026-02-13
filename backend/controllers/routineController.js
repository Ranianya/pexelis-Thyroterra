import prisma from "../config/prisma.js";

export const checkHabit = async (req, res) => {
  try {
    const userId = parseInt(req.body.userId);
    const habitId = parseInt(req.params.habitId);

    await prisma.userHabit.upsert({
      where: { userId_habitId: { userId, habitId } },
      update: { isChecked: true },
      create: { userId, habitId, isChecked: true }
    });
    res.json({ message: "Habit checked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uncheckHabit = async (req, res) => {
  try {
    const userId = parseInt(req.body.userId);
    const habitId = parseInt(req.params.habitId);

    await prisma.userHabit.updateMany({
      where: { userId, habitId },
      data: { isChecked: false }
    });
    res.json({ message: "Habit unchecked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addToRoutine = async (req, res) => {
  try {
    const { userId, spotId, dayId } = req.body;

    const habits = await prisma.userHabit.findMany({
      where: { userId: parseInt(userId), isChecked: true }
    });

    if (habits.length === 0) {
      return res.status(400).json({ error: "No habits selected in DB" });
    }

    for (const h of habits) {
      await prisma.userProgress.upsert({
        where: { userId_habitId_dayId: { userId: parseInt(userId), habitId: h.habitId, dayId: parseInt(dayId) } },
        update: {},
        create: { 
          userId: parseInt(userId), 
          habitId: h.habitId, 
          spotId: parseInt(spotId), 
          dayId: parseInt(dayId), 
          status: "missed" 
        }
      });
    }
    res.json({ message: "Routine created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};