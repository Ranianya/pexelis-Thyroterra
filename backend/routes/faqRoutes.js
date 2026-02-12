const express = require('express');
const router = express.Router();
const FAQController = require('../controllers/Faqcontroller');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/', FAQController.getAllFAQs);
router.get('/search', FAQController.searchFAQs);
router.get('/categories', FAQController.getCategories);
router.get('/:faqId', FAQController.getFAQById);

// Admin routes (protected)
router.post('/', authMiddleware, FAQController.createFAQ);
router.put('/:faqId', authMiddleware, FAQController.updateFAQ);
router.delete('/:faqId', authMiddleware, FAQController.deleteFAQ);

module.exports = router;