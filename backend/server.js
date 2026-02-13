import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import landRoutes from "./routes/landRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
console.log("--- DEBUG ENV ---");
console.log("PORT:", process.env.PORT);
console.log("JWT:", process.env.JWT_SECRET);
console.log("-----------------");

const app = express();
app.use(express.json());

// ✅ Déclare PORT AVANT utilisation
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
console.log("Loading Lands Routes...");
app.use("/api/lands", landRoutes);
app.use("/api/users", userRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("ThyroTerra Backend Running 🚀");
});

// ✅ UN SEUL listen
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});