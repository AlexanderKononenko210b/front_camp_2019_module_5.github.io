const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./config.js");
const newsRoutes = require("./api/routes/newsRoutes");
const databaseInit = require("./api/middleware/databaseInitSvc");
const errorHandler = require("./api/middleware/errorHandlerSvc");

mongoose.connect(config.mongoConnectionString);
databaseInit();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use("/news", newsRoutes);

app.use((request, response, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use(errorHandler);

module.exports = app;
