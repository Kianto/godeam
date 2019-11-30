var express = require('express');
var ProductCtrler = require('../controllers/ProductCtrler');
var CategoryCtrler = require('../controllers/CategoryCtrler');
var router = express.Router();

// Require our controllers.
var homeCtrler = require('../controllers/HomeCtrler');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});

// This route is for testing only
router.get('/temp', homeCtrler.show);

router.get('/index.ejs', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about.ejs', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

/* TODO: mãi ko nhận được post */
/* POST: redirect to checkout page */
router.post('/checkout.ejs', function(req, res, next) {
  console.log(req.body)
  res.render('checkout.ejs', { title: 'Express' });
});

router.get('/contact.ejs', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/error.ejs', function(req, res, next) {
  res.render('error', { title: 'Express' });
});

router.get('/icon.ejs', function(req, res, next) {
  res.render('icon', { title: 'Express' });
});

router.get('/payment.ejs', function(req, res, next) {
  res.render('payment', { title: 'Express' });
});

/* GET all categories */
router.get('/categories', function(req, res, next) {
  CategoryCtrler.find(req, res, next);
});

/* GET all products */
router.get('/products', function(req, res, next) {
  ProductCtrler.find(req, res, next);
});

/* GET product detail page */
router.get('/product/:id', function(req, res, next) {
  res.render('product', { title: 'Express' });
});

router.get('/service.ejs', function(req, res, next) {
  res.render('service', { title: 'Express' });
});

router.get('/shop.ejs', function(req, res, next) {
  res.render('shop', { title: 'Express' });
});

router.get('/single.ejs', function(req, res, next) {
  res.render('single', { title: 'Express' });
});

router.get('/typography.ejs', function(req, res, next) {
  res.render('typography', { title: 'Express' });
});

/* GET product user page */
router.get('/user/:id', function(req, res, next) {
  res.render('product', { title: 'Express' });
});

module.exports = router;
