const FAQService = require('../models/FAQ');

class FAQController {
  /**
   * GET /api/faq
   * Get all FAQs
   */
  async getAllFAQs(req, res) {
    try {
      const { category } = req.query;
      const faqs = await FAQService.getAllFAQs(category);

      res.json({
        success: true,
        data: faqs
      });
    } catch (error) {
      console.error('Get FAQs error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch FAQs',
        error: error.message
      });
    }
  }

  /**
   * GET /api/faq/:faqId
   * Get FAQ by ID
   */
  async getFAQById(req, res) {
    try {
      const { faqId } = req.params;
      const faq = await FAQService.getFAQById(faqId);

      res.json({
        success: true,
        data: faq
      });
    } catch (error) {
      console.error('Get FAQ error:', error);
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * GET /api/faq/search
   * Search FAQs
   */
  async searchFAQs(req, res) {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const faqs = await FAQService.searchFAQs(q);

      res.json({
        success: true,
        data: faqs
      });
    } catch (error) {
      console.error('Search FAQs error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search FAQs',
        error: error.message
      });
    }
  }

  /**
   * GET /api/faq/categories
   * Get all FAQ categories
   */
  async getCategories(req, res) {
    try {
      const categories = await FAQService.getCategories();

      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch categories',
        error: error.message
      });
    }
  }

  /**
   * POST /api/faq
   * Create new FAQ (admin)
   */
  async createFAQ(req, res) {
    try {
      const faqData = req.body;
      const faq = await FAQService.createFAQ(faqData);

      res.status(201).json({
        success: true,
        message: 'FAQ created successfully',
        data: faq
      });
    } catch (error) {
      console.error('Create FAQ error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create FAQ',
        error: error.message
      });
    }
  }

  /**
   * PUT /api/faq/:faqId
   * Update FAQ (admin)
   */
  async updateFAQ(req, res) {
    try {
      const { faqId } = req.params;
      const faqData = req.body;
      const faq = await FAQService.updateFAQ(faqId, faqData);

      res.json({
        success: true,
        message: 'FAQ updated successfully',
        data: faq
      });
    } catch (error) {
      console.error('Update FAQ error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update FAQ',
        error: error.message
      });
    }
  }

  /**
   * DELETE /api/faq/:faqId
   * Delete FAQ (admin)
   */
  async deleteFAQ(req, res) {
    try {
      const { faqId } = req.params;
      await FAQService.deleteFAQ(faqId);

      res.json({
        success: true,
        message: 'FAQ deleted successfully'
      });
    } catch (error) {
      console.error('Delete FAQ error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete FAQ',
        error: error.message
      });
    }
  }
}

module.exports = new FAQController();