const express = require('express');
const router = express.Router();
const { getEmergencyPlaces } = require('../controllers/emergencyController');

router.get('/', getEmergencyPlaces);

module.exports = router;