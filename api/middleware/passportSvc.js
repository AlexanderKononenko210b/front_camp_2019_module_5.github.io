const config = require("../../config");
const userService = require("../middleware/userSvc");
const url = require("url");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

function passportConfigure(passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}

const passportService = {
    local: (passport) => {
        passportConfigure(passport);
        passport.use(new LocalStrategy({
            usernameField: "login",
            passwordField: "password"
            },
            function (login, password, next) {
                return userService.localAuth(login, password, next);
        }));
    },
    facebook: (passport) => {
        passportConfigure(passport);
        passport.use(new FacebookStrategy({
            clientID: config.facebookApiKey,
            clientSecret: config.facebookApiSecret,
            callbackURL: url.format({
                protocol: config.protocol,
                host: config.appHost,
                port: config.appPort,
                pathname: config.facebookAuthCallback
            })
        },
        function(accessToken, refreshToken, profile, done) {
            return userService.facebookAuth(accessToken, refreshToken, profile, done);
        }
        ));
    }
};

module.exports = passportService;