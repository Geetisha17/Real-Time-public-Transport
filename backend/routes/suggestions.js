const express = require('express');
const router = express.Router();
const { getSmartSuggestions } = require('../controllers/suggestionsController');

router.get('/', getSmartSuggestions);

module.exports = router;