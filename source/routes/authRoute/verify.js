const express = require('express');
const router = express.Router();
const verifyController = require('../../app/controllers/VerifyController.js');

router.post('/', verifyController.post_verify);

module.exports = router;