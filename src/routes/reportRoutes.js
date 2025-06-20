// Report routes
const express = require('express');
const router = express.Router();
const { getEarnings } = require('../controllers/reportController');

router.get('/earnings', getEarnings);

module.exports = router;
