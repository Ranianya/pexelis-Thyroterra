import prisma from "../config/prisma.js";

// GET /api/lands - Fetch all lands and their spots
export const getAllLands = async (req, res) => {
  try {
    const lands = await prisma.land.findMany({ 
      include: { spots: true } 
    });
    res.json(lands);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lands" });
  }
};

// GET /api/lands/:id/spots - Fetch spots and their days for a specific land
export const getLandSpots = async (req, res) => {
  try {
    const spots = await prisma.spot.findMany({ 
      where: { landId: parseInt(req.params.id) },
      include: { days: true } // New relation from your updated schema
    });
    res.json(spots);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch spots" });
  }
};

// PUT /api/users/spot - Update current user's location
export const updateUserPosition = async (req, res) => {
  const { landId, spotId } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { 
        currentLandId: landId, 
        currentSpotId: spotId 
      }
    });
    res.json({ message: "Position updated", landId: updatedUser.currentLandId, spotId: updatedUser.currentSpotId });
  } catch (error) {
    res.status(500).json({ error: "Failed to update position" });
  }
};