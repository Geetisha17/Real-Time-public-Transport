const express = require('express');
const router = express.Router();
const {
  getRoute
} = require('../controllers/routeSearchContoller');

router.get('/', getRoute);

module.exports = router;