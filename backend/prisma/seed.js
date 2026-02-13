import prisma from "../config/prisma.js";

async function main() {
  console.log("🚀 Seed process started...");

  //////////////////////////////////////////////////
  // CLEAN DATABASE (respect FK order)
  //////////////////////////////////////////////////
  console.log("🧹 Cleaning old data...");

  await prisma.userProgress.deleteMany();
  await prisma.userHabit.deleteMany();
  await prisma.monthlyProgressDisplay.deleteMany();
  await prisma.day.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.habitCategory.deleteMany();
  await prisma.spot.deleteMany();
  await prisma.land.deleteMany();
  await prisma.user.deleteMany();
  await prisma.faq.deleteMany();

  //////////////////////////////////////////////////
  // 1️⃣ CREATE LANDS
  //////////////////////////////////////////////////
  const lands = await prisma.$transaction([
    prisma.land.create({ data: { isUnlocked: true } }),
    prisma.land.create({ data: { isUnlocked: false } }),
    prisma.land.create({ data: { isUnlocked: false } }),
  ]);

  console.log("🌍 Lands created:", lands.length);

  //////////////////////////////////////////////////
  // 2️⃣ CREATE SPOTS (12 per Land)
  //////////////////////////////////////////////////
  const spots = [];

  for (const land of lands) {
    for (let month = 1; month <= 12; month++) {
      const spot = await prisma.spot.create({
        data: {
          landId: land.id,
          monthName: month,
          isUnlocked: land.id === lands[0].id && month === 1,
        },
      });
      spots.push(spot);
    }
  }

  console.log("📍 Spots created:", spots.length);

  //////////////////////////////////////////////////
  // 3️⃣ CREATE DAYS (30 per Spot)
  //////////////////////////////////////////////////
  for (const spot of spots) {
    for (let day = 1; day <= 30; day++) {
      await prisma.day.create({
        data: {
          spotId: spot.id,
          dayNumber: day,
        },
      });
    }
  }

  console.log("📅 Days created");

  //////////////////////////////////////////////////
  // 4️⃣ CREATE CATEGORIES
  //////////////////////////////////////////////////
  const categories = await prisma.$transaction([
    prisma.habitCategory.create({
      data: { categoryName: "Thyroid Treatment" },
    }),
    prisma.habitCategory.create({
      data: { categoryName: "Wellness Forest" },
    }),
  ]);

  console.log("📂 Categories created:", categories.length);

  //////////////////////////////////////////////////
  // 5️⃣ CREATE HABITS (GLOBAL)
  //////////////////////////////////////////////////
  const habits = await prisma.$transaction([
    prisma.habit.create({
      data: { categoryId: categories[0].id, taskName: "Take Levothyroxine" },
    }),
    prisma.habit.create({
      data: { categoryId: categories[0].id, taskName: "Wait 30-60 min fasting" },
    }),
    prisma.habit.create({
      data: { categoryId: categories[0].id, taskName: "Log TSH levels" },
    }),
    prisma.habit.create({
      data: { categoryId: categories[1].id, taskName: "Drink water" },
    }),
    prisma.habit.create({
      data: { categoryId: categories[1].id, taskName: "Stretch 5 min" },
    }),
  ]);

  console.log("🌱 Habits created:", habits.length);

  //////////////////////////////////////////////////
  // 6️⃣ CREATE TEST USER
  //////////////////////////////////////////////////
  const user = await prisma.user.create({
    data: {
      username: "testuser",
      email: "test@example.com",
      password: "hashedpassword",
      currentLandId: lands[0].id,
      currentSpotId: spots[0].id,
    },
  });

  console.log("👤 User created");

  //////////////////////////////////////////////////
  // 7️⃣ LINK USER TO HABITS
  //////////////////////////////////////////////////
  for (const habit of habits) {
    await prisma.userHabit.create({
      data: {
        userId: user.id,
        habitId: habit.id,
      },
    });
  }

  console.log("🔗 User habits linked");

  //////////////////////////////////////////////////
  // 8️⃣ FAQ
  //////////////////////////////////////////////////
  await prisma.faq.createMany({
    data: [
      {
        question: "When should I take Levothyroxine?",
        answer: "Take it in the morning on an empty stomach.",
      },
      {
        question: "Why track TSH levels?",
        answer: "To monitor thyroid hormone balance.",
      },
    ],
  });

  console.log("❓ FAQ created");

  console.log("✅ Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
