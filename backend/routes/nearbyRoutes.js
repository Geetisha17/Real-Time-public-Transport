const express = require('express');
const router = express.Router();
const { getNearbyTransit } = require('../controllers/nearbyTransitController');

router.get('/', getNearbyTransit);

module.exports = router;