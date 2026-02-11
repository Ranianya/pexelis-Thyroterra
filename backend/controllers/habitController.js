import prisma from '../config/prismaConfig.js'; // Assuming you have this in config
import { calculateTreeStage, calculatePercentage } from '../utils/progressCalculator.js';

export const logDailyHabit = async (req, res) => {
    const { userId, habitId, spotId, dayNumber } = req.body;

    try {
        // 1. Action: Mark task as complete [cite: 63]
        const progress = await prisma.userProgress.create({
            data: { userId, habitId, spotId, dayNumber, status: 'completed' }
        });

        // 2. Feedback: Calculate new growth [cite: 38, 68]
        const completedCount = await prisma.userProgress.count({
            where: { userId, spotId, status: 'completed' }
        });

        const newPercent = calculatePercentage(completedCount);
        const newStage = calculateTreeStage(completedCount);

        // 3. Persist: Update visual state [cite: 79]
        await prisma.monthlyProgressDisplay.upsert({
            where: { user_month: { userId, monthIndex: spotId } },
            update: { meds_percent: newPercent, tree_growth_stage: newStage },
            create: { userId, monthIndex: spotId, meds_percent: newPercent, tree_growth_stage: newStage }
        });

        res.status(200).json({ 
            success: true, 
            message: "The forest is growing!", 
            currentProgress: newPercent,
            stage: newStage 
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to record ritual." });
    }
};