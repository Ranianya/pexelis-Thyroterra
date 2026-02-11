/**
 * Calculates growth based on cumulative completion (Fixed Value Logic)
 * 30 completed days = 100% of a Monthly Spot
 */
export const calculateTreeStage = (completionCount) => {
    if (completionCount >= 30) return 3; // Fully Grown Forest
    if (completionCount >= 15) return 2; // Sprouting Forest
    return 1; // Seedling/Restful Mist
};

export const calculatePercentage = (count, total = 30) => {
    return Math.min(Math.round((count / total) * 100), 100);
};