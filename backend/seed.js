const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // 1. Create Habit Categories
    console.log('Creating habit categories...');
    const thyroidCategory = await prisma.habitCategory.upsert({
      where: { categoryName: 'Thyroid Treatment' },
      update: {},
      create: {
        categoryName: 'Thyroid Treatment',
        description: 'Essential thyroid medication and treatment tasks'
      }
    });

    const activityCategory = await prisma.habitCategory.upsert({
      where: { categoryName: 'Physical Activity' },
      update: {},
      create: {
        categoryName: 'Physical Activity',
        description: 'Exercise and movement activities'
      }
    });

    const hydrationCategory = await prisma.habitCategory.upsert({
      where: { categoryName: 'Hydration' },
      update: {},
      create: {
        categoryName: 'Hydration',
        description: 'Daily water intake tracking'
      }
    });

    const medicalCategory = await prisma.habitCategory.upsert({
      where: { categoryName: 'Medical Check-ups' },
      update: {},
      create: {
        categoryName: 'Medical Check-ups',
        description: 'Doctor visits and medical monitoring'
      }
    });

    const nutritionCategory = await prisma.habitCategory.upsert({
      where: { categoryName: 'Nutrition' },
      update: {},
      create: {
        categoryName: 'Nutrition',
        description: 'Healthy eating habits'
      }
    });

    const wellnessCategory = await prisma.habitCategory.upsert({
      where: { categoryName: 'Mental Wellness' },
      update: {},
      create: {
        categoryName: 'Mental Wellness',
        description: 'Mental health and mood tracking'
      }
    });

    // 2. Create Habits
    console.log('Creating habits...');
    const habits = [
      // Thyroid Treatment
      {
        categoryId: thyroidCategory.id,
        taskName: 'Take Levothyroxine',
        description: 'Morning medication on empty stomach'
      },
      {
        categoryId: thyroidCategory.id,
        taskName: 'Wait 30-60 minutes before eating',
        description: 'Fasting window for proper hormone absorption'
      },
      {
        categoryId: thyroidCategory.id,
        taskName: 'Track TSH levels',
        description: 'Record thyroid hormone levels when tested'
      },
      
      // Physical Activity
      {
        categoryId: activityCategory.id,
        taskName: 'Morning walk (15 minutes)',
        description: 'Light cardio to boost metabolism'
      },
      {
        categoryId: activityCategory.id,
        taskName: 'Gentle stretching',
        description: 'Flexibility and stress relief'
      },
      
      // Hydration
      {
        categoryId: hydrationCategory.id,
        taskName: 'Drink 8 glasses of water',
        description: 'Stay hydrated throughout the day'
      },
      
      // Medical Check-ups
      {
        categoryId: medicalCategory.id,
        taskName: 'Schedule neck ultrasound',
        description: 'Monitor goiter progression'
      },
      {
        categoryId: medicalCategory.id,
        taskName: 'Doctor appointment',
        description: 'Regular endocrinologist visit'
      },
      
      // Nutrition
      {
        categoryId: nutritionCategory.id,
        taskName: 'Eat balanced breakfast',
        description: 'After medication waiting period'
      },
      {
        categoryId: nutritionCategory.id,
        taskName: 'Avoid goitrogenic foods in excess',
        description: 'Limit raw cruciferous vegetables'
      },
      
      // Mental Wellness
      {
        categoryId: wellnessCategory.id,
        taskName: 'Log mood and energy',
        description: 'Track how you feel today'
      },
      {
        categoryId: wellnessCategory.id,
        taskName: '5-minute meditation',
        description: 'Mindfulness for stress management'
      }
    ];

    for (const habit of habits) {
      await prisma.habit.upsert({
        where: { 
          id: 0 // This won't match, forcing create if doesn't exist
        },
        update: {},
        create: habit
      }).catch(() => {
        // Ignore if already exists
      });
    }

    // 3. Create Lands
    console.log('Creating lands...');
    const lands = [
      {
        name: 'Lavender Valley',
        description: 'A peaceful valley where healing begins',
        imageUrl: '/images/lands/lavender-valley.jpg',
        order: 1
      },
      {
        name: 'Emerald Peak',
        description: 'Rise to new heights of wellness',
        imageUrl: '/images/lands/emerald-peak.jpg',
        order: 2
      },
      {
        name: 'Crystal Shore',
        description: 'Find clarity by the healing waters',
        imageUrl: '/images/lands/crystal-shore.jpg',
        order: 3
      },
      {
        name: 'Golden Meadow',
        description: 'Bask in the warmth of sustained health',
        imageUrl: '/images/lands/golden-meadow.jpg',
        order: 4
      }
    ];

    for (const landData of lands) {
      const land = await prisma.land.upsert({
        where: { id: 0 },
        update: {},
        create: landData
      }).catch(async () => {
        // Find by name if already exists
        return await prisma.land.findFirst({
          where: { name: landData.name }
        });
      });

      // Create 12 spots for each land
      if (land) {
        const existingSpots = await prisma.spot.count({
          where: { landId: land.id }
        });

        if (existingSpots === 0) {
          const spots = [];
          for (let month = 1; month <= 12; month++) {
            spots.push({
              landId: land.id,
              monthName: month,
              spotName: `Month ${month}`,
              isUnlocked: false
            });
          }
          
          await prisma.spot.createMany({
            data: spots,
            skipDuplicates: true
          });
        }
      }
    }

    // 4. Create FAQs
    console.log('Creating FAQs...');
    const faqs = [
      {
        question: 'Which gland is affected by hypothyroidism?',
        answer: 'Hypothyroidism affects the thyroid gland, a butterfly-shaped gland in the neck that produces hormones regulating metabolism.',
        category: 'Medical Basics',
        order: 1
      },
      {
        question: 'Why do I need to wait after taking my medication?',
        answer: 'Levothyroxine requires a 30-60 minute fasting window for optimal absorption. Food can interfere with how your body processes the medication.',
        category: 'Medication',
        order: 2
      },
      {
        question: 'What is a goiter?',
        answer: 'A goiter is an enlargement of the thyroid gland, often visible as a swelling in the neck. It can be caused by iodine deficiency or autoimmune conditions.',
        category: 'Medical Basics',
        order: 3
      },
      {
        question: 'How does ThyroTerra help with adherence?',
        answer: 'ThyroTerra uses gamification to turn your daily health routine into a meaningful journey. Instead of punishing missed days, we show your accumulated progress and motivate you to continue building your healthy legacy.',
        category: 'App Features',
        order: 4
      },
      {
        question: 'What happens if I miss a day?',
        answer: 'Your progress stays exactly where you left it - we never reset your streak. The forest enters a "Restful Mist" state, and you can continue from where you stopped.',
        category: 'App Features',
        order: 5
      },
      {
        question: 'What are TSH levels?',
        answer: 'TSH (Thyroid Stimulating Hormone) is measured through blood tests to monitor thyroid function. Your doctor uses these levels to adjust your medication dosage.',
        category: 'Medical Basics',
        order: 6
      }
    ];

    for (const faq of faqs) {
      await prisma.fAQ.upsert({
        where: { id: 0 },
        update: {},
        create: faq
      }).catch(() => {
        // Ignore if already exists
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log(`
    Created:
    - ${await prisma.habitCategory.count()} habit categories
    - ${await prisma.habit.count()} habits
    - ${await prisma.land.count()} lands
    - ${await prisma.spot.count()} spots
    - ${await prisma.fAQ.count()} FAQs
    `);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });