var User = require('../models/User');
var Product = require('../models/Product');
var Category = require('../models/Category');
var Order = require('../models/Order');
var Mailer = require('../utils/Mailer');
_logined = false;

exports.homeShow = async (req, res, next) => {
	let cates = await Category.find({});
	let products = await Product.find({}).sort({ updateAt: -1, price: -1 }).limit(12);

	res.render('index', { categories: cates, products });
};

exports.shopShow = async (req, res, next) => {
	let cates = await Category.find({});
	let products;
	let titleToy;

	if (!req.query.category) {
		titleToy = 'Đồ chơi';
		products = await Product.find({});
	} else {
		let cateName = await Category.findOne({ link: req.query.category });
		products = await Product.find({ category: cateName.name });
		titleToy = cateName.name;
	}

	res.render('shop', { categories: cates, products, titleToy });
};

exports.searchShow = async (req, res, next) => {
	let cates = await Category.find({});
	let products;

	if (!req.query.search) {
		products = await Product.find({});
	} else {
		products = await Product.find({ name: { $regex: req.query.search } });
	}

	res.render('shop', { categories: cates, products });
};

exports.productDetail = async (req, res, next) => {
	let cates = await Category.find({});
	let product = await Product.findById(req.params.id);

	if (!product) res.redirect('/shop');
	res.render('single', { categories: cates, product });
};

exports.order = async (req, res, next) => {
	User.findByEmail(res.locals.user.email).then(async (user) => {
		if (user) {
			let order = new Order({
				idUser: user._id,
				shipTo: req.body.address,
				cartItemIds: req.body.ids,
				cartItemQuantities: req.body.quantities,
				  
				cardOwner: req.body.cardOwner,
				cardNo: req.body.cardNo,
				cardExpDate: req.body.expDate,
				cardCvv: req.body.cvvNo,
			});
			if (req.body.cardNo[0] === 3)
				order.cardType = "American Express"
			else if (req.body.cardNo[0] === 4)
				order.cardType = "Visa"
			else if (req.body.cardNo[0] === 5)
				order.cardType = "MasterCard"
			else if (req.body.cardNo[0] === 6)
				order.cardType = "Discover Card"
			else
				order.cardType = "Invalid Card"
			
			order.save();
			Mailer.sendOrderConfirmMail(user.email, order)
				.then(() => {
					return res.json({
					status: 200,
					code: 1,
					message: 'Succeed',
					data: true
				});
				})
				.catch((err) => {
					console.log(err);
					let error = {
						status: 500,
						code: 1005,
						message: 'Fail'
					};
					return res.status(500).json({ data: {}, error });
				});
		} else {
			let error = {
				status: 500,
				code: 1001,
				message: 'Fail'
			};
			return res.status(500).json({ data: false, error });
		}
	});
};

exports.contact = async (req, res, next) => {
	let cates = await Category.find({});

	res.render('contact', { categories: cates });
};

exports.checkout = async (req, res, next) => {
	let cates = await Category.find({});
	let quantity = await req.body.quantity;
	let id = await req.body.item_number;
	// let products = await Product.find().where('_id').in(id).exec();
	let products = [];
	for(i = 0; i < id.length; i = i + 1) {
		products.push(await Product.findById(id[i]));
	}
	res.render('checkout', { categories: cates, quantity: quantity, products: products });
};

exports.payment = async (req, res, next) => {
	let cates = await Category.find({});
	console.log(req.body);

	let quantities = await req.body.quantities;
	let ids = await req.body.ids;
	// let products = await Product.find().where('_id').in(ids).exec();
	let products = [];
	for(i = 0; i < ids.length; i = i + 1) {
		products.push(await Product.findById(ids[i]));
	}
	let lastOrder = await Order.findOne({ idUser : res.locals.user.email}).sort({ creatAt: -1 })

	res.render('payment', { categories: cates, quantities, products, address: req.body.address, lastOrder });
};

exports.single = async (req, res, next) => {
	let cates = await Category.find({});
	let product = await Product.findById(req.query.id);

	res.render('single', { categories: cates, product });
};
