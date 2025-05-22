const express = require('express');
const router = express.Router();
const { getRealtimeData } = require('../controllers/realtimeController');

router.get('/', getRealtimeData);

module.exports = router;