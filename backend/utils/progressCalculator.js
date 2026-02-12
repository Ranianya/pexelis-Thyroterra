/**
 * Progress Calculator
 * Implements the "Fixed Progress" and gamification logic
 */

class ProgressCalculator {
  /**
   * Calculate tree growth stage based on completion percentage
   */
  calculateTreeStage(completionPercentage) {
    if (completionPercentage >= 90) return 5; // Fully grown tree
    if (completionPercentage >= 70) return 4; // Mature tree
    if (completionPercentage >= 50) return 3; // Growing tree
    if (completionPercentage >= 25) return 2; // Young tree
    return 1; // Seedling
  }

  /**
   * Calculate hearts based on streak and performance
   * Following the "no punishment" philosophy
   */
  calculateHearts(streak, totalCompleted) {
    let hearts = 2; // Base hearts

    // Reward for consistency
    if (streak >= 30) hearts += 3;
    else if (streak >= 14) hearts += 2;
    else if (streak >= 7) hearts += 1;

    // Reward for total achievements
    if (totalCompleted >= 100) hearts += 2;
    else if (totalCompleted >= 50) hearts += 1;

    return Math.min(hearts, 10); // Max 10 hearts
  }

  /**
   * Generate encouraging message based on progress
   * The "Forest Guide" messages
   */
  getForestGuideMessage(completionPercentage, status) {
    if (status === 'missed') {
      return {
        type: 'gentle',
        message: 'The forest is resting today. Return whenever you\'re ready - your progress remains safe.',
        icon: '🌫️'
      };
    }

    if (completionPercentage === 100) {
      return {
        type: 'celebration',
        message: 'Congratulations! You\'ve unlocked this territory. Your dedication has created a beautiful legacy.',
        icon: '🌳'
      };
    }

    if (completionPercentage >= 75) {
      return {
        type: 'encouragement',
        message: 'Your forest is flourishing! The trees grow stronger with each day of discipline.',
        icon: '🌲'
      };
    }

    if (completionPercentage >= 50) {
      return {
        type: 'motivation',
        message: 'Wonderful progress! Each task completed brings new life to your world.',
        icon: '🌱'
      };
    }

    if (completionPercentage >= 25) {
      return {
        type: 'support',
        message: 'Great start! Your forest is beginning to take shape.',
        icon: '🌿'
      };
    }

    return {
      type: 'welcome',
      message: 'Welcome to your new territory! Let\'s begin building your healthy legacy.',
      icon: '✨'
    };
  }

  /**
   * Calculate overall wellness score from multiple metrics
   */
  calculateWellnessScore(metrics) {
    const {
      medsPercent = 0,
      activitiesPercent = 0,
      waterPercent = 0,
      doctorPercent = 0,
      eatPercent = 0,
      moodsPercent = 0
    } = metrics;

    // Weighted scoring - medication is most important
    const weightedScore = (
      (medsPercent * 0.3) +
      (doctorPercent * 0.2) +
      (eatPercent * 0.15) +
      (waterPercent * 0.15) +
      (activitiesPercent * 0.1) +
      (moodsPercent * 0.1)
    );

    return Math.round(weightedScore);
  }

  /**
   * Determine if a spot is ready to unlock
   */
  canUnlockSpot(completedDays, totalDays = 30) {
    return completedDays >= totalDays;
  }

  /**
   * Calculate adherence percentage (no punishment)
   * Shows total completed vs total attempted, not vs time passed
   */
  calculateAdherence(completedTasks, totalTasks) {
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  }

  /**
   * Generate progress insights for user
   */
  generateInsights(stats) {
    const insights = [];
    const { completedTasks, totalTasks, streak, categoryStats } = stats;

    const adherence = this.calculateAdherence(completedTasks, totalTasks);

    // Adherence insight
    if (adherence >= 80) {
      insights.push({
        type: 'positive',
        message: `Excellent adherence! You're maintaining ${adherence}% consistency.`,
        icon: '⭐'
      });
    } else if (adherence >= 50) {
      insights.push({
        type: 'neutral',
        message: `Good progress at ${adherence}%. Every completed task counts!`,
        icon: '👍'
      });
    }

    // Streak insight
    if (streak >= 7) {
      insights.push({
        type: 'positive',
        message: `Amazing ${streak}-day streak! Your consistency is building a strong foundation.`,
        icon: '🔥'
      });
    }

    // Category-specific insights
    if (categoryStats) {
      Object.entries(categoryStats).forEach(([category, data]) => {
        const catAdherence = Math.round((data.completed / data.total) * 100);
        
        if (category.includes('Thyroid Treatment') && catAdherence < 70) {
          insights.push({
            type: 'important',
            message: 'Remember: Thyroid medication works best with daily consistency.',
            icon: '💊'
          });
        }
      });
    }

    return insights;
  }

  /**
   * Calculate time until next milestone
   */
  calculateNextMilestone(currentDay, totalDays = 30) {
    const milestones = [7, 14, 21, 30];
    const nextMilestone = milestones.find(m => m > currentDay);
    
    if (!nextMilestone) {
      return {
        days: 0,
        message: 'Territory Complete!',
        isComplete: true
      };
    }

    return {
      days: nextMilestone - currentDay,
      milestone: nextMilestone,
      message: `${nextMilestone - currentDay} days until ${nextMilestone}-day milestone`,
      isComplete: false
    };
  }
}

module.exports = new ProgressCalculator();