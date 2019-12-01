const User = require("../models/user");
const bcrypt = require("bcrypt");

const userService = {
    localAuth: (login, password, next) => {
        User.findOne({ login: login })
        .then(user => {
            return user
                ? bcrypt.compare(password, user.password)
                .then( match => {
                    return !match
                    ? next(null, false)
                    : next(null, user);
                })
                : next (null, false);
        })
        .catch(error => {
            return next(null, false);
        });
    },
    facebookAuth: (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({ facebookId: profile.id })
        .then((error, user) => {
            return error
                ? done(error)
                : done(null, user);
        });
    },
    checkAuth: (request, response, next) => {
        const result = request.isAuthenticated();
        return result
            ? next()
            : response.redirect("/users/login");
    }
};

module.exports = userService;

