const express = require('express');
const router = express.Router();
const { createAlert, getAllAlerts } = require('../controllers/alertController');

router.post('/', createAlert);
router.get('/', getAllAlerts);

module.exports = router;