import prisma from "../config/prisma.js";

// GET /api/faq
export const getFaqs = async (req, res) => {
  const faqs = await prisma.faq.findMany();
  res.json(faqs);
};

// GET /api/users/hearts
export const getHearts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { heartsCount: true }
  });
  res.json({ heartsCount: user.heartsCount });
};

// PUT /api/users/hearts
export const updateHearts = async (req, res) => {
  const { heartsCount } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: { heartsCount: heartsCount }
  });
  res.json({ heartsCount: updatedUser.heartsCount });
};