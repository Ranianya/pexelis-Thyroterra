import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Added this

import habitsRoutes from "./routes/habitsRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import landRoutes from "./routes/landRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import monthlyRoutes from "./routes/monthlyRoutes.js";

dotenv.config();

const app = express();

// ✅ CRITICAL: Enable CORS so the frontend can talk to the backend
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));

app.use(express.json());

// Mount routes
app.use("/api/habits", habitsRoutes);
app.use("/api/routine", routineRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lands", landRoutes);
app.use("/api/users", userRoutes);
app.use("/api/monthly", monthlyRoutes);

app.get("/", (req, res) => {
  res.send("PEXELIS Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));