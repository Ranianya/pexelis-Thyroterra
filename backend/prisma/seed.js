// prisma/seed.js or seed.ts if using TypeScript
import 'dotenv/config'; // loads .env
import { prisma } from './prisma.config.ts'; // use the Prisma client from prisma.config.ts

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // 1. Habit Categories
    const categoriesData = [
      { categoryName: 'Thyroid Treatment' },
      { categoryName: 'Physical Activity' },
      { categoryName: 'Hydration' },
      { categoryName: 'Medical Check-ups' },
      { categoryName: 'Nutrition' },
      { categoryName: 'Mental Wellness' },
    ];

    const categories = {};
    for (const cat of categoriesData) {
      const category = await prisma.habitCategory.upsert({
        where: { categoryName: cat.categoryName },
        update: {},
        create: cat,
      });
      categories[cat.categoryName] = category;
    }

    // 2. Habits
    const habitsData = [
      { category: 'Thyroid Treatment', taskName: 'Take Levothyroxine' },
      { category: 'Thyroid Treatment', taskName: 'Wait 30-60 minutes before eating' },
      { category: 'Thyroid Treatment', taskName: 'Track TSH levels' },
      { category: 'Physical Activity', taskName: 'Morning walk (15 minutes)' },
      { category: 'Physical Activity', taskName: 'Gentle stretching' },
      { category: 'Hydration', taskName: 'Drink 8 glasses of water' },
      { category: 'Medical Check-ups', taskName: 'Schedule neck ultrasound' },
      { category: 'Medical Check-ups', taskName: 'Doctor appointment' },
      { category: 'Nutrition', taskName: 'Eat balanced breakfast' },
      { category: 'Nutrition', taskName: 'Avoid goitrogenic foods in excess' },
      { category: 'Mental Wellness', taskName: 'Log mood and energy' },
      { category: 'Mental Wellness', taskName: '5-minute meditation' },
    ];

    for (const habit of habitsData) {
      await prisma.habit.upsert({
        where: { taskName: habit.taskName },
        update: {},
        create: {
          categoryId: categories[habit.category].id,
          taskName: habit.taskName,
        },
      });
    }

    // 3. Lands & Spots
    const landsData = [
      { name: 'Lavender Valley' },
      { name: 'Emerald Peak' },
      { name: 'Crystal Shore' },
      { name: 'Golden Meadow' },
    ];

    for (const landData of landsData) {
      const land = await prisma.land.upsert({
        where: { name: landData.name },
        update: {},
        create: landData,
      });

      const existingSpots = await prisma.spot.count({ where: { landId: land.id } });
      if (existingSpots === 0) {
        const spots = Array.from({ length: 12 }, (_, i) => ({
          landId: land.id,
          monthName: i + 1,
          isUnlocked: false,
        }));
        await prisma.spot.createMany({ data: spots, skipDuplicates: true });
      }
    }

    // 4. FAQs
    const faqsData = [
      { question: 'Which gland is affected by hypothyroidism?', answer: 'Hypothyroidism affects the thyroid gland.' },
      { question: 'Why do I need to wait after taking my medication?', answer: 'Levothyroxine requires a fasting window for optimal absorption.' },
      { question: 'What is a goiter?', answer: 'A goiter is an enlargement of the thyroid gland.' },
      { question: 'How does ThyroTerra help with adherence?', answer: 'ThyroTerra gamifies your health routine.' },
      { question: 'What happens if I miss a day?', answer: 'Your progress stays exactly where you left it.' },
      { question: 'What are TSH levels?', answer: 'TSH is measured through blood tests to monitor thyroid function.' },
    ];

    for (const faq of faqsData) {
      await prisma.fAQ.upsert({
        where: { question: faq.question },
        update: {},
        create: faq,
      });
    }

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
