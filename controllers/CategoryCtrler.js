var Category = require('../models/Category');

// TODO: This is unused

exports.find = async (req, res, next) => {
    const category = await Category.find({});
    //res.send({...products});
    res.send({...category});
};

exports.findOne = async (req, res, next) => {
    // TODO:

    res.render('index', { title: 'GoDeam Toy World' });
};
