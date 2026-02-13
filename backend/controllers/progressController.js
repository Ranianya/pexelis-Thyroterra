import prisma from "../config/prisma.js";


/**
 * GET today's progress
 */
export const getTodayProgress = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const dayId = parseInt(req.query.dayId);

    const progress = await prisma.userProgress.findMany({
      where: { userId, dayId },
      include: { habit: true }
    });

    res.json(progress);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/**
 * UPDATE status
 */
export const updateProgress = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const updated = await prisma.userProgress.update({
      where: { id },
      data: { status }
    });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
