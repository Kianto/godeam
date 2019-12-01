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
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GoDeam Toy World' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'GoDeam Toy World' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'GoDeam Toy World' });
});

/* POST: redirect to checkout page */
router.post('/checkout', function(req, res, next) {
  console.log(req.body)
  res.render('checkout', { title: 'GoDeam Toy World' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'GoDeam Toy World' });
});

router.get('/icon', function(req, res, next) {
  res.render('icon', { title: 'GoDeam Toy World' });
});

router.get('/payment', function(req, res, next) {
  res.render('payment', { title: 'GoDeam Toy World' });
});

router.get('/product', function(req, res, next) {
  res.render('product', { title: 'GoDeam Toy World' });
});

/* GET product detail page */
router.get('/product/:id', function(req, res, next) {
  res.render('product', { title: 'GoDeam Toy World' });
});

router.get('/service', function(req, res, next) {
  res.render('service', { title: 'GoDeam Toy World' });
});

router.get('/shop', function(req, res, next) {
  res.render('shop', { title: 'GoDeam Toy World' });
});

router.get('/single', function(req, res, next) {
  res.render('single', { title: 'GoDeam Toy World' });
});

router.get('/typography', function(req, res, next) {
  res.render('typography', { title: 'GoDeam Toy World' });
});

//========================================>

/* POST login form */
router.post('/login', authCtrler.login);

/* POST register form */
router.post('/register', authCtrler.register);

/* POST forgot password form */
router.post('/forgotPassword', authCtrler.forgotPassword);

/* POST logout */
router.post('/logout', authCtrler.logout);

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
