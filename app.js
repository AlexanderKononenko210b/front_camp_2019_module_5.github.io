const express = require("express");
const app = express();
const session = require("express-session");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./config.js");
const newsRoutes = require("./api/routes/newsRoutes");
const userRoutes = require("./api/routes/userRoutes");
const databaseInit = require("./api/middleware/databaseInitSvc");
const errorHandler = require("./api/middleware/errorHandlerSvc");
const passport = require("passport");
const cookieParser = require("cookie-parser");

mongoose.connect(config.mongoConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
databaseInit();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/news", newsRoutes);
app.use("/users", userRoutes);

app.use((request, response, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use(errorHandler);

module.exports = app;
