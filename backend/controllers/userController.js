import prisma from "../config/prisma.js";

// GET /api/faq - Fetch all FAQ entries
export const getFaqs = async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch FAQ" });
  }
};

// GET /api/users/hearts - Get logged-in user's hearts
export const getHearts = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { heartsCount: true }
    });
    res.json({ heartsCount: user.heartsCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hearts" });
  }
};

// PUT /api/users/hearts - Update logged-in user's hearts
export const updateHearts = async (req, res) => {
  const { heartsCount } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { heartsCount: heartsCount }
    });
    res.json({ message: "Hearts updated", heartsCount: updatedUser.heartsCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to update hearts" });
  }
};