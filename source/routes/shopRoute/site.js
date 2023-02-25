const express = require('express');
const router = express.Router();
const siteController = require('../../app/controllers/SiteController.js');

router.get('/:slug', siteController.getCategory);
//router.get('/7', siteController.index);
router.get('/', siteController.index);
router.post('/getCart', siteController.getCart);
router.post('/deleteCart', siteController.deleteToCart);
router.post('/addCart', siteController.addToCart);
module.exports = router;
