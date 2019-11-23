var express = require('express');
var router = express.Router();

// Require controllers.
var homeCtrler = require('../controllers/HomeCtrler');
var authCtrler = require('../controllers/AuthCtrler');


/* GET home page. */
router.get('/', homeCtrler.show);



/* GET login page. */
router.get('/login', authCtrler.login);

/* GET register page. */
router.get('/register', authCtrler.register);

/* GET logout page. */
router.get('/logout', authCtrler.logout);

/* GET detail info page. */
router.get('/detailInfo', authCtrler.detailInfo);





module.exports = router;
