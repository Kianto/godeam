var User = require('../models/User');
var Product = require('../models/Product');

exports.show = async (req, res, next) => {
    let products = await Product.findOne({});
    let loggingUser = null; // unlogged
    
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

    console.log(loggingUser);
    res.render('index', { title: 'GoDeam Toy World', products, loggedUser: loggingUser });

};

exports.searchProduct = async (req, res, next) => {
    // TODO:

    res.render('index', { title: 'GoDeam Toy World' });

};
