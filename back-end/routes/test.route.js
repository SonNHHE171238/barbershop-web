const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');

router.get('/health', testController.health);

module.exports = router;
