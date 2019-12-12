const Passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWT = require("jsonwebtoken");
const UserModel = require("../models/User");

function loginUser(email, password, done) {
    UserModel.findOne({ email: email }).then(user => {
        if (!user) {
            console.log("LOG: Wrong email");
            return done(null, false);
        }

        if (!user.validPassword(password)) {
            console.log('LOG: Wrong password');
            return done(null, false);
        } else {
            return done(null, user);
        }
    }).catch(err => done(err));
};

Passport.use("local", 
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        },
        loginUser
    )
);

module.exports = (req, res, next) => {
    let token = req.cookies.jwt;
    if (token == null || token == undefined) {
      res.locals.isAuth = false;
      res.locals.user = null;
      console.log(`ERROR: Token is null`);
      next()
      return;
    }
    return JWT.verify(token, "StRoNGs3crE7", (err, payload) => {
        if (err) {
            res.locals.isAuth = false;
            res.locals.user = null;
            console.log(`ERROR: `, err);
            next();
        }
        
        UserModel.findById(payload.user._id, (err, user) => {
            if (err) {
                console.log(`ERROR: in find by id ${err}`);
                res.locals.isAuth = false;
                res.locals.user = null;
                next();
                return
            }
            res.locals.isAuth = true;
            res.locals.user = user;
            return next();
        });
    });
};
  