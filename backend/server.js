import express from "express";
import dotenv from "dotenv";

import habitsRoutes from "./routes/habitsRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();
app.use(express.json());

// Mount routes
app.use("/api/habits", habitsRoutes);
app.use("/api/routine", routineRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("PEXELIS Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
