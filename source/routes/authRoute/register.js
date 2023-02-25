const express = require('express');
const router = express.Router();
const registerController = require('../../app/controllers/RegisterController.js');

router.post('/', registerController.post_register);

module.exports = router;