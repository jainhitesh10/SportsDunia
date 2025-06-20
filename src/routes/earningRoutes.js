// Earning routes
const express = require('express');
const router = express.Router();
const { purchase } = require('../controllers/earningController');

router.post('/purchase', purchase);

module.exports = router;
