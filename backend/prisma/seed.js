import prisma from "../config/prisma.js";

async function main() {
  console.log("Seeding database...");

  // --------------------------
  // 1. Create Lands
  // --------------------------
  const landsData = [
    { isUnlocked: true },  // First land unlocked
    { isUnlocked: false },
    { isUnlocked: false },
  ];

  const lands = [];
  for (const land of landsData) {
    const createdLand = await prisma.land.create({ data: land });
    lands.push(createdLand);
  }
  console.log("Lands created:", lands.length);

  // --------------------------
  // 2. Create Spots (12 per Land)
  // --------------------------
  const spots = [];
  for (const land of lands) {
    for (let month = 1; month <= 12; month++) {
      const spot = await prisma.spot.create({
        data: {
          landId: land.id,
          monthName: month,
          isUnlocked: month === 1 && land.id === 1, // unlock first spot of first land
        },
      });
      spots.push(spot);
    }
  }
  console.log("Spots created:", spots.length);

  // --------------------------
  // 3. Create Habit Categories
  // --------------------------
  const categoriesData = [
    { categoryName: "Thyroid Treatment" },
    { categoryName: "Wellness Forest" },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const createdCat = await prisma.habitCategory.create({ data: cat });
    categories.push(createdCat);
  }
  console.log("Habit categories created:", categories.length);

  // --------------------------
  // 4. Create Habits
  // --------------------------
  const habitsData = [
    // Thyroid Treatment
    { categoryId: categories[0].id, taskName: "Take Levothyroxine" },
    { categoryId: categories[0].id, taskName: "Wait 30-60 min fasting" },
    { categoryId: categories[0].id, taskName: "Log TSH levels" },
    { categoryId: categories[0].id, taskName: "Schedule Neck Ultrasound" },

    // Wellness Forest
    { categoryId: categories[1].id, taskName: "Drink water" },
    { categoryId: categories[1].id, taskName: "Stretch 5 min" },
    { categoryId: categories[1].id, taskName: "Meditate 10 min" },
  ];

  const habits = [];
  for (const habit of habitsData) {
    const createdHabit = await prisma.habit.create({ data: habit });
    habits.push(createdHabit);
  }
  
  console.log("Habits created:", habits.length);

    console.log("Habits created:", habits.length);


  

  console.log("✅ Database seeding completed!");
};
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });