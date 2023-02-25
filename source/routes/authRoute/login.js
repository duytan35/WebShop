const express = require('express');
const router = express.Router();
const loginController = require('../../app/controllers/LoginController.js');

router.post('/', loginController.post_login);

module.exports = router;