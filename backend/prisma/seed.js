 import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database...");

  // --------------------------
  // 1️⃣ Create Lands
  // --------------------------
  const landsData = [
    { name: "Land 1" },
    { name: "Land 2" },
    { name: "Land 3" },
  ];

  const lands = [];
  for (const land of landsData) {
    const createdLand = await prisma.land.create({ data: land });
    lands.push(createdLand);
  }
  console.log("Lands created:", lands.length);

  // --------------------------
  // 2️⃣ Create Spots (12 per Land)
  // --------------------------
  const spots = [];
  for (const land of lands) {
    for (let month = 1; month <= 12; month++) {
      const spot = await prisma.spot.create({
        data: {
          landId: land.id,
          monthName: month,
        },
      });
      spots.push(spot);
    }
  }
  console.log("Spots created:", spots.length);

  // --------------------------
  // 3️⃣ Create Habit Categories
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
  // 4️⃣ Create Habits
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

  // --------------------------
  // 5️⃣ Create Days (for each Spot, 30 days)
  // --------------------------
  const days = [];
  for (const spot of spots) {
    for (let dayNum = 1; dayNum <= 30; dayNum++) {
      const day = await prisma.day.create({
        data: { spotId: spot.id, dayNumber: dayNum },
      });
      days.push(day);
    }
  }
  console.log("Days created:", days.length);

  // --------------------------
  // 6️⃣ Create a test User
  // --------------------------
  const passwordHash = await bcrypt.hash("password123", 10);
  const testUser = await prisma.user.create({
    data: {
      username: "testuser",
      email: "testuser@example.com",
      password: passwordHash,
      currentLandId: lands[0].id,
      currentSpotId: spots[0].id,
    },
  });
  console.log("Test user created:", testUser.email);

  // --------------------------
  // 7️⃣ Unlock first Land and first Spot for user
  // --------------------------
  await prisma.userLand.create({
    data: { userId: testUser.id, landId: lands[0].id, unlocked: true },
  });

  await prisma.userSpot.create({
    data: { userId: testUser.id, spotId: spots[0].id, unlocked: true },
  });

  // --------------------------
  // 8️⃣ Assign all habits to user
  // --------------------------
  for (const habit of habits) {
    await prisma.userHabit.create({
      data: { userId: testUser.id, habitId: habit.id, isChecked: true },
    });
  }
  console.log("All habits assigned to test user ✅");

  console.log("✅ Database seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
 


