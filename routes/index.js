var express = require('express');
var router = express.Router();

// <[ Require our controllers ]>
var testCtrler = require('../controllers/TestCtrler');
var shopCtrler = require('../controllers/ShopCtrler');
var authCtrler = require('../controllers/AuthCtrler');

//========================================>

/* GET home page. */
router.get('/', shopCtrler.homeShow);

router.get('/test', async (req, res, next) => {
	console.log(`jwt: ${req.cookies.jwt}`);
});

/* POST: redirect to checkout page */
router.post('/checkout', shopCtrler.checkout);

/* GET: redirect to checkout page */
router.get('/checkout', shopCtrler.checkout);

router.get('/payment', shopCtrler.payment);

router.post('/payment', shopCtrler.payment);

router.post('/order', shopCtrler.order);

/* GET incase wrong direction */
router.get('/product', function(req, res, next) {
	res.redirect('/shop');
});

/* GET product detail page */
router.get('/product/:id', shopCtrler.productDetail);

/* GET shop page showing products by name search */
router.get('/search', shopCtrler.searchShow);

/* GET shop page showing products by category */
router.get('/shop', shopCtrler.shopShow);

/* GET contact page */
router.get('/contact', shopCtrler.contact);

/* GET about page */
router.get('/about', shopCtrler.contact);

//========================================>

/* POST login form */
router.post('/login', authCtrler.login);

/* POST register form */
router.post('/register', authCtrler.register);

/* POST forgot password form */
router.post('/forgotPassword', authCtrler.forgotPassword);

/* GET logout request */
router.get('/logout', authCtrler.logout);

/* GET profile page */
router.get('/profile', authCtrler.profile);

/* POST change info form */
router.post('/changeInfo', authCtrler.editInfo);

/* POST change password form */
router.post('/changePassword', authCtrler.editPassword);

/* AJAX check if email exists */
router.get('/checkEmailExisting', authCtrler.checkEmailExisting);

//========================================>

// This route is for testing only
router.get('/temp', testCtrler.show);

/* GET error page */
router.get('/error', function(req, res, next) {
	res.render('error', { title: 'GoDeam Toy World' });
});

module.exports = router;
