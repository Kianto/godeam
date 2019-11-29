var User = require('../models/User');
var Product = require('../models/Product');
var Category = require('../models/Category');

exports.show = async (req, res, next) => {
    let products = await Product.find({});
    let categories = await Category.find({});
    let loggingUser = null; // unlogged

    // create-update main user
    user = await User.findOne({ email: 'fakertester002@gmail.com' });   
    if (user) {
        loggingUser = user;
        loggingUser.updateAt = Date.now();   
        User.findByIdAndUpdate(user._id, loggingUser, {new: true}, (err, doc) => {
            if (err) console.log("Error when updating: " + err);
            else console.log("Updated");
        });

    } else {
        let newUser = new User({
            name: 'Sei Lyao',
            email: 'fakertester002@gmail.com',
            password: 'kiantodegod',
            phone: '0161203150',
            address: '404 Heaven Street, Innersky'
        });
        newUser.save();
        loggingUser = newUser;
    }

    // console.log(loggingUser);
    // console.log(products);
    res.render('index', { title: 'GoDeam Toy World', categories, products, loggedUser: loggingUser });

};

exports.add = async (req, res, next) => {
    

    let newProduct = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    });
    console.log(newProduct);
    newProduct.save(); 

    res.redirect('/');
    res.end();
};

exports.searchProduct = async (req, res, next) => {
    // TODO:

    res.render('index', { title: 'GoDeam Toy World' });

};
