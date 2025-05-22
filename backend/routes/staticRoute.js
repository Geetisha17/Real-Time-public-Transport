const express = require('express');
const router = express.Router();
const { getRouteInfo, getNearestStop } = require('../controllers/staticRouteController');

router.get('/route-name', getRouteInfo);
router.get('/nearest-stop', getNearestStop);

module.exports = router;