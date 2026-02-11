# 🌍 ThyroTerra Backend

## 📋 Project Description
[cite_start]ThyroTerra is a gamified adherence tool for Hypothyroidism patients[cite: 4]. [cite_start]It uses a "World Building" metaphor to turn repetitive medication routines into a permanent health legacy[cite: 50, 53].

## [cite_start]🌲 Gamification Mechanics (Implemented) [cite: 67]
1. **Fixed Progress (Persistence):** Progress never resets. [cite_start]Missing a day results in a "Restful Mist" state, but your accumulated discipline remains fixed[cite: 41, 42, 44].
2. [cite_start]**Visual Evolution:** The central tree grows through 3 stages based on real-time task completion[cite: 31, 38].
3. [cite_start]**Territory Ownership:** Users unlock 12 "Monthly Spots" to eventually own an entire "Yearly Land"[cite: 25, 26].

## [cite_start]⚙️ Tech Stack [cite: 100]
- **Language:** Node.js (Express.js)
- **Database:** MySQL via Prisma ORM
- **Logic:** Fixed-value progress tracking

## 🚀 Setup & Installation
1. Install dependencies: `npm install`
2. Sync Database: `npx prisma migrate dev`
3. Start Server: `node server.js`