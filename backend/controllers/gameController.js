 
import prisma from "../config/prisma.js";

// --------------------------
// PHASE 1 — Initialize User Journey
// --------------------------
export const initializeUserJourney = async (req, res) => {
  const userId = req.user.id; 

  try {
    // 1️⃣ Find first land
    const firstLand = await prisma.land.findFirst({
      orderBy: { id: "asc" }
    });

    if (!firstLand)
      return res.status(400).json({ error: "No lands found" });

    // 2️⃣ Find spot with monthName = 1 in that land
    const firstSpot = await prisma.spot.findFirst({
      where: { landId: firstLand.id, monthName: 1 },
      orderBy: { id: "asc" }
    });

    if (!firstSpot)
      return res.status(400).json({ error: "No spot found in first land" });

    // 3️⃣ Update user with current land & spot
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        currentLandId: firstLand.id,
        currentSpotId: firstSpot.id
      }
    });

    res.json({
      message: "User journey initialized",
      landId: updatedUser.currentLandId,
      spotId: updatedUser.currentSpotId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// --------------------------
// PHASE 1 — Get current journey
// --------------------------
export const getCurrentJourney = async (req, res) => {
  const userId = req.user.id; // ✅ secure: use ID from JWT token

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        currentLand: true,
        currentSpot: true
      }
    });

    if (!user)
      return res.status(404).json({ error: "User not found" });

    const monthIndex = user.currentSpot?.monthName || 1;

    res.json({
      landId: user.currentLandId,
      spotId: user.currentSpotId,
      monthIndex
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};



