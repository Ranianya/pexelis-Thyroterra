import prisma from "../config/prisma.js";

// Create today's UserProgress for selected habits
export const createTodayProgress = async (userId, habitIds) => {
  try {
    const today = new Date();
    const dayNumber = today.getDate();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { currentSpot: { include: { days: true } } },
    });

    if (!user || !user.currentSpot) throw new Error("User or current spot not found");

    let day = user.currentSpot.days.find(d => d.dayNumber === dayNumber);

    if (!day) {
      day = await prisma.day.create({
        data: {
          spotId: user.currentSpot.id,
          dayNumber,
        },
      });
    }

    const progressEntries = await Promise.all(
      habitIds.map(async habitId => {
        return prisma.userProgress.create({
          data: {
            userId,
            spotId: user.currentSpot.id,
            habitId,
            dayId: day.id,
            status: "missed",
          },
        });
      })
    );

    return progressEntries;
  } catch (error) {
    throw error;
  }
};
