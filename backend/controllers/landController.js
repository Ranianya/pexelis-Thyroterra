import prisma from "../config/prisma.js";

// GET /api/lands
export const getAllLands = async (req, res) => {
  const lands = await prisma.land.findMany({ include: { spots: true } });
  res.json(lands);
};

// GET /api/lands/:id/spots
export const getLandSpots = async (req, res) => {
  const { id } = req.params;
  const spots = await prisma.spot.findMany({ where: { landId: parseInt(id) } });
  res.json(spots);
};

// PUT /api/users/spot (Update current position)
export const updateUserSpot = async (req, res) => {
  const { spotId, landId } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: { currentSpotId: spotId, currentLandId: landId }
  });
  res.json(updatedUser);
};