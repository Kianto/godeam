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

exports.cart = async (req, res, next) => {
	let cates = await Category.find({});
	// TODO:

	res.render('index', { title: 'GoDeam Toy World' });
};

exports.order = async (req, res, next) => {
	let cates = await Category.find({});
	let order;
	await User.findByEmail({ email: res.locals.user.email }).then(async (user) => {
		if (user) {
			order = new Order({
				idUser: req.body.idUser,
				cart: req.body.cart,
				shipTo: req.body.shipTo
			});
			await order.save();
			res.send(
				'Chúng tôi đã gửi hóa đơn về cho ' +
					res.locals.user.email +
					'.Hãy check mail của bạn để xem hóa đơn bạn vừa đặt hàng'
			);
		} else {
			res.send({
				status: 500,
				code: 1002,
				message: 'Fail'
			});
		}
	});
};

exports.contact = async (req, res, next) => {
	let cates = await Category.find({});

	res.render('contact', { categories: cates });
};

exports.checkout = async (req, res, next) => {
	console.log(req.body);
	let quantity = await req.body.quantity;
	let id = await req.body.item_number;
	let products = await Product.find().where('_id').in(id).exec();
	let cates = await Category.find({});
	let total = 0;
	res.render('checkout', { categories: cates, quantity: quantity, products: products, total });
};
exports.payment = async (req, res, next) => {
	let cates = await Category.find({});
	res.render('payment', { categories: cates });
};
exports.single = async (req, res, next) => {
	let cates = await Category.find({});

	let product = await Product.findById(req.query.id);

	res.render('single', { categories: cates, product });
};
