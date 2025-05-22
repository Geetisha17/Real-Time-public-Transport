const express = require('express');
const router = express.Router();
const { getPlaceName } = require('../controllers/locationController');

router.get('/place-name', getPlaceName);

module.exports = router;