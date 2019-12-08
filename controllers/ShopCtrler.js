var User = require('../models/User');
var Product = require('../models/Product');
var Category = require('../models/Category');

exports.homeShow = async (req, res, next) => {
    let cates = await Category.find({});
    let products = await Product.find({}).sort({ updateAt: -1, price: -1 }).limit(12);
    
    res.render('index', { categories : cates, products });

};

exports.shopShow = async (req, res, next) => {
    let cates = await Category.find({});
    let products;

    if (!req.query.category) {
        products = await Product.find({});
    } else {
        let cateName = await Category.findOne({ 'link': req.query.category });
        products = await Product.find({ 'category' : cateName.name });
    }
    
    res.render('shop', { categories : cates, products });
};

exports.searchShow = async (req, res, next) => {
    let cates = await Category.find({});
    let products;

    if (!req.query.search) {
        products = await Product.find({});
    } else {
        products = await Product.find({ 'name' : { $regex: req.query.search } });
    }
    
    res.render('shop', { categories : cates, products });
};

exports.productDetail = async (req, res, next) => {
    let cates = await Category.find({});
    // TODO:
    
    res.render('index', { title: 'GoDeam Toy World' });

};

exports.cart = async (req, res, next) => {
    let cates = await Category.find({});
    // TODO:
    
    res.render('index', { title: 'GoDeam Toy World' });

};

exports.order = async (req, res, next) => {
    let cates = await Category.find({});
    // TODO:
    
    res.render('index', { title: 'GoDeam Toy World' });

};

exports.contact = async (req, res, next) => {
    let cates = await Category.find({});
    
    res.render('contact', { categories : cates });

};

exports.checkout = async (req, res, next) => {
    let cates = await Category.find({});
    
    res.render('checkout', { categories : cates });

};