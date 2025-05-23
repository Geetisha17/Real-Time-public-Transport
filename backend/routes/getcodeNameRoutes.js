const express = require('express');
const router = express.Router();
const { getNearbyTransitFromPlace } = require('../controllers/geocodeNameController');

router.get('/', getNearbyTransitFromPlace);

module.exports = router;