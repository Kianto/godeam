var express = require('express');
var router = express.Router();

// Require our controllers.
var homeCtrler = require('../controllers/HomeCtrler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// This route is for testing only
router.get('/temp', homeCtrler.show);

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about.ejs', { title: 'Express' });
});

/* POST: redirect to checkout page */
router.post('/checkout', function(req, res, next) {
  console.log(req.body)
  res.render('checkout.ejs', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Express' });
});

router.get('/icon', function(req, res, next) {
  res.render('icon', { title: 'Express' });
});

router.get('/payment', function(req, res, next) {
  res.render('payment', { title: 'Express' });
});

router.get('/product', function(req, res, next) {
  res.render('product', { title: 'Express' });
});

/* GET product detail page */
router.get('/product/:id', function(req, res, next) {
  res.render('product', { title: 'Express' });
});

router.get('/service', function(req, res, next) {
  res.render('service', { title: 'Express' });
});

router.get('/shop', function(req, res, next) {
  res.render('shop', { title: 'Express' });
});

router.get('/single', function(req, res, next) {
  res.render('single', { title: 'Express' });
});

router.get('/typography', function(req, res, next) {
  res.render('typography', { title: 'Express' });
});

/* GET product user page */
router.get('/user/:id', function(req, res, next) {
  res.render('product', { title: 'Express' });
});

module.exports = router;
