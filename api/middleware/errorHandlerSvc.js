const logger = require("./loggerWrapperSvc");
const url = require("url");
const path = require("path");

const errorHandler = (error, request, response, next) => {
    logger.error({
        level: error.level || "error",
        url: getFullUrl(request),
        message: error.message
    });
    response.status(error.status || 500)
        .render(path.resolve(__dirname, "../views/error.ejs"), {
            pageTitle: "Error",
            title: "!!! Ooops, something wrong !!!",
            errorMessage: error.message,
            path: "/error"
        });
};

const getFullUrl = (request) => url.format({
    protocol: request.protocol,
    host: request.get("host"),
    pathname: request.originalUrl
});

module.exports = errorHandler;