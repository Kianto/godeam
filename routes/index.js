var express = require('express');
var router = express.Router();

// Require controllers.
var homeCtrler = require('../controllers/HomeCtrler');
var authCtrler = require('../controllers/AuthCtrler');


/* GET home page. */
router.get('/', homeCtrler.show);

router.post('/addProduct/', homeCtrler.add);



module.exports = router;
