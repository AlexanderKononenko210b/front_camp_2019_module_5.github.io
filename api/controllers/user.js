const mongoose = require("mongoose");
const User = require("../models/user");
const passport = require("passport");
const path = require("path");
const bcrypt = require("bcrypt");
const passportService = require("../middleware/passportSvc");

exports.loginForm = (request, response, next) => {
    response.render(path.resolve(__dirname, "../views/login.ejs"), {
        title: "Login"
    });
};

exports.signUpForm = (request, response, next) => {
    response.render(path.resolve(__dirname, "../views/register.ejs"), {
        title: "Sign Up"
    });
};

exports.login = function(request, response, next) {
    passportService.local(passport);
    passport.authenticate("local",
        function(error, user, info) {
            return error 
                ? next(error)
                : user
                    ? request.logIn(user, function(error) {
                        return error
                            ? next(error)
                            : response.redirect("/news");
                    })
                    : response.redirect("/users/login");
        }
    )(request, response, next);
};

exports.logout = function(request, response) {
    request.logout();
    response.redirect("/users/login");
};

exports.signUp = function(request, response, next) {
    const login = request.body.login;
    const password = request.body.password;
    bcrypt.hash(password,
        10,
        (error, hash) => {
            if(error) {
                next(error);
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    login: login,
                    password: hash
                });
                user.save(function(error) {
                    return error
                        ? next(error)
                        : request.logIn(user, function(error) {
                            return error
                                ? next(error)
                                : response.redirect('/news');
                            });
                });
            }
        }
    );
};

exports.authFacebook = function(request, response, next) {
    passportService.facebook(passport);
    passport.authenticate(
        "facebook"
    )(request, response, next);
};

exports.authFacebookCallback = function(request, response, next) {
    passport.authenticate('facebook', { 
        successRedirect: 'users/news',
        failureRedirect: 'users/login'
    })(request, response, next);
};
