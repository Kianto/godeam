var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index.ejs', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about.ejs', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

/* TODO: mãi ko nhận được post */ 
router.post('/checkout.ejs', function(req, res, next) {
  res.render('checkout', { title: 'Express' });
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

router.get('/product.ejs', function(req, res, next) {
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


module.exports = router;
