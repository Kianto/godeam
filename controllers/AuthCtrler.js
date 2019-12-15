var User = require('../models/User');
var Mailer = require('../utils/Mailer');
var passport = require("passport");
var jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user) => {
        if (err || !user) {
            // Email or Password is wrong
            let error = {
                status: 400,
                code: 1001,
                message: "Fail"
            };
            return res.status(400).json({ data: {}, error });
        }
        req.login(user, {session: false}, (err) => {
            jwt.sign({ user: user }, "StRoNGs3crE7", (err, token) => {
                if (err) {
                    console.log(err);
                    let error = {
                        status: 500,
                        code: 1002,
                        message: "Fail"
                    };
                    return res.status(500).json({ data: {}, error });
                }
                res.cookie("jwt", token, {
                    httpOnly: true,
                    sameSite: true
                });
                console.log(user);
                return res.json({
                    status: 200,
                    code: 1,
                    message: "Succeed",
                    data: user
                });
            });
        });
    })(req, res);
};

exports.register = async (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password || req.body.password !== req.body.repassword) {
        let error = {
            status: 400,
            code: 1003,
            message: "Fail"
        };
        return res.status(400).json({ data: {}, error });
    }
    if (!await User.findByEmail(req.body.email)) {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        let user = await newUser.save();
        if (!user) {
            let error = {
                status: 500,
                code: 1002,
                message: "Fail"
            };
            return res.status(500).json({ data: {}, error });
        }
    }
    this.login(req, res, next);
};

exports.checkEmailExisting = async (req, res, next) => {
    User.findByEmail(req.query.email).then(user => {
        if (user) {
            res.json(true);
        } else {
            res.json(false);
        }
    });
};

exports.forgotPassword = async (req, res, next) => {
    console.log(req.body);
    // TODO:

    res.render('index', { title: 'GoDeam Toy World' });

};

exports.logout = async (req, res, next) => {
    res.clearCookie("jwt");
    res.removeHeader("Cookie");
    res.json(true);
};

exports.profile = async (req, res, next) => {
    console.log(req.body);
    // TODO:

    res.render('index', { title: 'GoDeam Toy World' });

};

exports.editInfo = async (req, res, next) => {
    if (!req.body.name || !req.body.email) {
        let error = {
            status: 400,
            code: 1003,
            message: "Fail"
        };
        return res.status(400).json({ data: {}, error });
    }
    if (await User.findByEmail(req.body.email) && req.body.email !== res.locals.user.email) {
        let error = {
            status: 400,
            code: 1003,
            message: "Fail" // Email has been taken
        };
        return res.status(400).json({ data: {}, error });
    }
    User.findByEmail(res.locals.user.email).then(user => {
        if (!user) {
            let error = {
                status: 400,
                code: 1003,
                message: "Fail"
            };
            return res.status(400).json({ data: {}, error });
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.address = req.body.address;
        user.save().then(updatedUser => {
            if (!updatedUser) {
                let error = {
                    status: 500,
                    code: 1005,
                    message: "Fail"
                };
                return res.status(500).json({ data: {}, error });
            } else {
                return res.json({
                    status: 200,
                    code: 1,
                    message: "Succeed",
                    data: user
                });
            }
        });
    });
};

exports.editPassword = async (req, res, next) => {
    if (!req.body.password || req.body.password !== req.body.repassword) {
        let error = {
            status: 400,
            code: 1003,
            message: "Fail"
        };
        return res.status(400).json({ data: {}, error });
    }
    User.findByEmail(res.locals.user.email).then(user => {
        if (!user) {
            let error = {
                status: 400,
                code: 1003,
                message: "Fail"
            };
            return res.status(400).json({ data: {}, error });
        }
        user.setPassword(req.body.password);
        user.save().then(updatedUser => {
            if (!updatedUser) {
                let error = {
                    status: 500,
                    code: 1005,
                    message: "Fail"
                };
                return res.status(500).json({ data: {}, error });
            } else {
                return res.json({
                    status: 200,
                    code: 1,
                    message: "Succeed",
                    data: user
                });
            }
        });
    });
};
