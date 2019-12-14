var express = require('express');
var router = express.Router();

// <[ Require our controllers ]>
var testCtrler = require('../controllers/TestCtrler');
var shopCtrler = require('../controllers/ShopCtrler');
var authCtrler = require('../controllers/AuthCtrler');
var ProductCtrler = require('../controllers/ProductCtrler');
var CategoryCtrler = require('../controllers/CategoryCtrler');

//========================================>

/* GET home page. */
router.get('/', shopCtrler.homeShow);

/* POST: redirect to checkout page */
router.post('/checkout',shopCtrler.checkout);
/* GET: redirect to checkout page */
router.get('/checkout',shopCtrler.checkout);

router.get('/contact', shopCtrler.contact);

router.get('/payment', shopCtrler.payment);
/* GET: redirect to single page */
router.get('/single', shopCtrler.single);

router.get('/product', function(req, res, next) {
  res.render('product', { title: 'GoDeam Toy World' });
});


/* GET product detail page */
router.get('/product/:id', function(req, res, next) {
  res.render('product', { title: 'GoDeam Toy World' });
});

/* GET shop page showing products by name search */
router.get('/search', shopCtrler.searchShow);

/* GET shop page showing products by category */
router.get('/shop', shopCtrler.shopShow);

// router.get('/single', function(req, res, next) {
//   res.render('single', { title: 'GoDeam Toy World' });
// });

//========================================>

/* POST login form */
router.post('/login', shopCtrler.homeShow);

/* POST register form */
router.post('/register', authCtrler.register);

/* POST forgot password form */
router.post('/forgotPassword', authCtrler.forgotPassword);

/* POST logout */
router.post('/logout', shopCtrler.logout);

/* GET profile page */
router.get('/profile', authCtrler.profile);

/* POST change info form */
router.get('/changeInfo', authCtrler.editInfo);

/* POST change password form */
router.get('/changePassword', authCtrler.editPassword);

//========================================>

// This route is for testing only
router.get('/temp', testCtrler.show);

/* GET error page */
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'GoDeam Toy World' });
});


module.exports = router;
