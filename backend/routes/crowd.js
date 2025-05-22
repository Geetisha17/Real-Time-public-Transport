const express = require('express');
const router = express.Router();
const { submitCrowdReport, getCrowdData } = require('../controllers/crowdReportController');

router.post('/', submitCrowdReport);
router.get('/', getCrowdData);

module.exports = router;