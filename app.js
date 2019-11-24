const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./config.js");
const newsRoutes = require("./api/routes/newsRoutes");
const databaseInit = require("./api/middleware/databaseInit");
const errorHandler = require("./api/middleware/logger");

mongoose.connect(config.mongoConnectionString);
databaseInit();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/news", newsRoutes);

app.use((request, response, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    });
    errorHandler.error({
        level: error.level || "error",
        url: request.url,
        message: error.message
    });
});

module.exports = app;
