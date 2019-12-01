var Product = require('../models/Product');

// TODO: This is unused

exports.find = async (req, res, next) => {
    const products = await Product.find({});
    res.send({...products});
    //res.render('product', {products: products});
};

exports.findOne = async (req, res, next) => {
    // TODO:

    res.render('index', { title: 'GoDeam Toy World' });
};
