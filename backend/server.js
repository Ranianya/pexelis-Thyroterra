import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Déclare PORT AVANT utilisation
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("ThyroTerra Backend Running 🚀");
});

// ✅ UN SEUL listen
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
