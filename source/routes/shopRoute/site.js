const express = require('express');
const router = express.Router();
const siteController = require('../../app/controllers/SiteController.js');

router.get('/', siteController.index);
router.get('/search', siteController.searchProducts);
router.get('/:slug', siteController.getCategory);
router.post('/getCart', siteController.getCart);
router.post('/addCart', siteController.addToCart);
router.post('/deleteCart', siteController.deleteToCart);
module.exports = router;
