import prisma from "../config/prisma.js";


/**
 * CHECK habit
 */
export const checkHabit = async (req, res) => {
  try {
    const userId = parseInt(req.body.userId);
    const habitId = parseInt(req.params.habitId);

    const exist = await prisma.userHabit.findUnique({
      where: {
        userId_habitId: {
          userId,
          habitId
        }
      }
    });

    if (exist) {
      await prisma.userHabit.update({
        where: { id: exist.id },
        data: { isChecked: true }
      });
    } else {
      await prisma.userHabit.create({
        data: {
          userId,
          habitId,
          isChecked: true
        }
      });
    }

    res.json({ message: "Habit checked" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/**
 * UNCHECK habit
 */
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


/**
 * ADD TO ROUTINE → Create UserProgress
 */
export const addToRoutine = async (req, res) => {
  try {
    const { userId, spotId, dayId } = req.body;

    const habits = await prisma.userHabit.findMany({
      where: {
        userId,
        isChecked: true
      }
    });

    for (const h of habits) {

      await prisma.userProgress.upsert({
        where: {
          userId_habitId_dayId: {
            userId,
            habitId: h.habitId,
            dayId
          }
        },
        update: {},
        create: {
          userId,
          habitId: h.habitId,
          spotId,
          dayId,
          status: "missed"
        }
      });

    }

    res.json({ message: "Routine created" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
