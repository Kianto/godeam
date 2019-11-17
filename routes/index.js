var express = require('express');
var router = express.Router();

// Require controllers.
var homeCtrler = require('../controllers/HomeCtrler');

/* GET home page. */
router.get('/', homeCtrler.show);

module.exports = router;
