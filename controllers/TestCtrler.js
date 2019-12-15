var User = require('../models/User');
var Product = require('../models/Product');
var Mailer = require('../utils/Mailer');
var passport = require("passport");
var jwt = require("jsonwebtoken");

exports.show = async (req, res, next) => {
    let products = await Product.findOne({});
    let loggingUser = null; // unlogged
    
    user = await User.findByEmail('fakertester002@gmail.com');   
    if (user) {
        loggingUser = user; 
        await loggingUser.save();

    } else {
        let newUser = new User({
            name: 'Sei Lyao',
            email: 'fakertester002@gmail.com',
            password: 'kiantodegod',
            phone: '0161203150',
            address: '404 Heaven Street, Innersky'
        });
        await newUser.save();
        loggingUser = newUser;
    }

    // This is set up for testing logging in
    req.body.email = loggingUser.email;
    req.body.password = 'kiantodegod';

    if (res.locals.user) {
        console.log("Đã đăng nhập nên giờ đăng xuất");
        res.clearCookie("jwt");
        res.removeHeader("Cookie");
        // TODO: return ajax
        return res.redirect("/");
    }
    
    console.log("Đăng nhập ...");
    passport.authenticate('local', {session: false}, (err, user) => {
        if (err || !user) {
            // Email or Password is wrong
            // TODO: return ajax
            return res.redirect("/");
        } else {
        req.login(user, {session: false}, (err) => {
            jwt.sign({ user: user }, "StRoNGs3crE7", (err, token) => {
                if (err) {
                    console.log(err);
               
                    // Cannot save token
                    // TODO: return ajax
                    return res.redirect("/");
                }
                
                res.cookie("jwt", token, {
                    httpOnly: true,
                    sameSite: true
                });

                console.log('Đăng nhập rồi đó');
                // Logged
                // TODO: return ajax
                return res.redirect("/");
            });
        });
        }
    })(req, res);
    

    // await Mailer.sendOrderConfirmMail(loggingUser.email);
    // res.render('error', { message: "Ok", error: null });   
};

exports.searchProduct = async (req, res, next) => {
    // TODO:
    
    res.render('index', { title: 'GoDeam Toy World' });

};
