import express from "express";
import dotenv from "dotenv";

import habitsRoutes from "./routes/habitsRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import landRoutes from "./routes/landRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import monthlyRoutes from "./routes/monthlyRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";  // ✨ NEW: AI Chatbot Route
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Mount routes
app.use("/api/habits", habitsRoutes);
app.use("/api/routine", routineRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/auth", authRoutes);
console.log("Loading Lands Routes...");
app.use("/api/lands", landRoutes);
app.use("/api/users", userRoutes);
app.use("/api/monthly", monthlyRoutes);
app.use("/api/chat", chatRoutes);  // ✨ NEW: AI Chatbot (Forest Guide)

app.get("/", (req, res) => {
  res.send("PEXELIS Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});