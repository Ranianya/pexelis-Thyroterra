const { prisma } = require('../config/database');

class FAQService {
  /**
   * Get all FAQs
   */
  async getAllFAQs(category = null) {
    const where = category ? { category } : {};

    const faqs = await prisma.fAQ.findMany({
      where,
      orderBy: {
        order: 'asc'
      }
    });

    return faqs;
  }

  /**
   * Get FAQ by ID
   */
  async getFAQById(faqId) {
    const faq = await prisma.fAQ.findUnique({
      where: { id: parseInt(faqId) }
    });

    if (!faq) {
      throw new Error('FAQ not found');
    }

    return faq;
  }

  /**
   * Create new FAQ
   */
  async createFAQ(faqData) {
    const { question, answer, category, order } = faqData;

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        category,
        order: order || 0
      }
    });

    return faq;
  }

  /**
   * Update FAQ
   */
  async updateFAQ(faqId, faqData) {
    const faq = await prisma.fAQ.update({
      where: { id: parseInt(faqId) },
      data: faqData
    });

    return faq;
  }

  /**
   * Delete FAQ
   */
  async deleteFAQ(faqId) {
    await prisma.fAQ.delete({
      where: { id: parseInt(faqId) }
    });

    return { message: 'FAQ deleted successfully' };
  }

  /**
   * Search FAQs
   */
  async searchFAQs(searchTerm) {
    const faqs = await prisma.fAQ.findMany({
      where: {
        OR: [
          {
            question: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            answer: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      },
      orderBy: {
        order: 'asc'
      }
    });

    return faqs;
  }

  /**
   * Get FAQ categories
   */
  async getCategories() {
    const categories = await prisma.fAQ.findMany({
      distinct: ['category'],
      select: {
        category: true
      }
    });

    return categories.map(c => c.category).filter(Boolean);
  }
}

module.exports = new FAQService();