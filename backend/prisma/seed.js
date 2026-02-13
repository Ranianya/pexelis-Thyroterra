import prisma from "../config/prisma.js";

async function main() {
  console.log("🌱 Seeding database...");

  // 🧹 Clean database (respect relation order)
  await prisma.userProgress.deleteMany();
  await prisma.monthlyProgressDisplay.deleteMany();
  await prisma.userHabit.deleteMany();
  await prisma.userSpot.deleteMany();
  await prisma.userLand.deleteMany();
  await prisma.day.deleteMany();
  await prisma.spot.deleteMany();
  await prisma.land.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.habitCategory.deleteMany();
  await prisma.faq.deleteMany();

  //////////////////////////////////////////////////
  // 1️⃣ Create Lands
  //////////////////////////////////////////////////
  const landsData = [
    { name: "Thyroterra I" },
    { name: "Thyroterra II" },
    { name: "Thyroterra III" },
  ];

  const lands = [];

  for (const land of landsData) {
    const createdLand = await prisma.land.create({ data: land });
    lands.push(createdLand);
  }

  console.log("✅ Lands created:", lands.length);

  //////////////////////////////////////////////////
  // 2️⃣ Create Spots (12 per Land)
  //////////////////////////////////////////////////
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

  console.log("✅ Spots created:", spots.length);

  //////////////////////////////////////////////////
  // 3️⃣ Create Days (1–31 per Spot)
  //////////////////////////////////////////////////
  const days = [];

  for (const spot of spots) {
    for (let dayNumber = 1; dayNumber <= 31; dayNumber++) {
      const day = await prisma.day.create({
        data: {
          spotId: spot.id,
          dayNumber,
        },
      });

      days.push(day);
    }
  }

  console.log("✅ Days created:", days.length);

  //////////////////////////////////////////////////
  // 4️⃣ Habit Categories
  //////////////////////////////////////////////////
  const categories = await prisma.habitCategory.createMany({
    data: [
      { categoryName: "Thyroid Treatment" },
      { categoryName: "Wellness Forest" },
    ],
  });

  const allCategories = await prisma.habitCategory.findMany();

  console.log("✅ Habit categories created:", allCategories.length);

  //////////////////////////////////////////////////
  // 5️⃣ Habits
  //////////////////////////////////////////////////
  const thyroidCategory = allCategories.find(
    (c) => c.categoryName === "Thyroid Treatment"
  );

  const wellnessCategory = allCategories.find(
    (c) => c.categoryName === "Wellness Forest"
  );

  await prisma.habit.createMany({
    data: [
      { categoryId: thyroidCategory.id, taskName: "Take Levothyroxine" },
      { categoryId: thyroidCategory.id, taskName: "Wait 30-60 min fasting" },
      { categoryId: thyroidCategory.id, taskName: "Log TSH levels" },
      { categoryId: thyroidCategory.id, taskName: "Schedule Neck Ultrasound" },

      { categoryId: wellnessCategory.id, taskName: "Drink water" },
      { categoryId: wellnessCategory.id, taskName: "Stretch 5 min" },
      { categoryId: wellnessCategory.id, taskName: "Meditate 10 min" },
    ],
  });

  console.log("✅ Habits created");

  //////////////////////////////////////////////////
  // 6️⃣ FAQ (optional)
  //////////////////////////////////////////////////
  await prisma.faq.createMany({
    data: [
      {
        question: "What is Thyroterra?",
        answer: "A gamified habit tracker for thyroid care.",
      },
      {
        question: "How do I unlock lands?",
        answer: "Complete your habits consistently.",
      },
    ],
  });

  console.log("✅ FAQ created");

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
