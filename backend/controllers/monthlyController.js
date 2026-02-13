import prisma from "../config/prisma.js";

export const getMonthlyProgress = async (req, res) => {
  try {
    const progress = await prisma.monthlyProgressDisplay.findMany({
      where: { userId: req.user.id }
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

// ✅ Fixes 404 for /api/monthly/progress/:spotId
export const getSpotVisitedDays = async (req, res) => {
  try {
    const { spotId } = req.params;
    const records = await prisma.userProgress.findMany({
      where: {
        userId: req.user.id,
        spotId: parseInt(spotId),
        status: "completed"
      },
      select: { day: { select: { dayNumber: true } } }
    });

    const visitedDays = [...new Set(records.map(r => r.day.dayNumber))];
    res.json(visitedDays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const recalculateMonthlyProgress = async (req, res) => {
   /* ... existing logic ... */
};