const mongoose = require("mongoose");
const Article = require("../models/article");
const errorHandler = require("../middleware/logger");

exports.get_all_articles = (request, response, next) => {
    Article.find()
        .select("title content _id")
        .exec()
        .then(result => {
            if(result.length > 0) {
                response.status(200).json(result);
            } else {
                response.status(404).json("Articles not found");
            }
        })
        .catch(error => {
            errorHandler.error({
                level: error.level || "error",
                url: request.url,
                message: error.message
            });
            response.status(500).json(error);
        });
};

exports.get_article_by_id = (request, response, next) => {
    const id = request.params.id;
    Article.findById(id)
        .select("title content _id")
        .exec()
        .then(result => {
            if(result) {
                response.status(200).json({
                    _id: result._id,
                    title: result.title,
                    content: result.content
                });
            } else {
                response.status(404).json("Article not found");
            }
        })
        .catch(error => {
            errorHandler.error({
                level: error.level || "error",
                url: request.url,
                message: error.message
            });
            response.status(500).json(error);
        });
};

exports.post_add_article = (request, response, next) => {
    const article = new Article({
        _id: mongoose.Types.ObjectId(),
        author: request.body.author,
        title: request.body.title,
        description: request.body.description,
        url: request.body.url,
        urlToImage: request.body.urlToImage,
        publishedAt: request.body.publishedAt,
        content: request.body.content
    });

    article.save()
        .then(result => {
            response.status(200).json({
                _id: result._id,
                title: result.title,
                content: result.content
            });
        })
        .catch(error => {
            errorHandler.error({
                level: error.level || "error",
                url: request.url,
                message: error.message
            });
            response.status(500).json(error);
        });
};

exports.put_article = (request, response, next) => {
    const id = request.params.id;
    const updateOps = {};
    const bodyData = [].slice.call(request.body);
    for(const ops of bodyData) {
        updateOps[ops.propName] = ops.value;
    }

    Article.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            response.status(200).json(result);
        })
        .catch(error => {
            errorHandler.error({
                level: error.level || "error",
                url: request.url,
                message: error.message
            });
            response.status(500).json(error);
        });
};

exports.delete_article = (request, response, next) => {
    const id = request.params.id;
    Article.remove( { _id: id })
        .exec()
        .then(result => {
            response.status(200).json({
                message: `Delete action by article with id = ${id} was done`
            });
        })
        .catch(error => {
            errorHandler.error({
                level: error.level || "error",
                url: request.url,
                message: error.message
            });
            response.status(500).json(error);
        });
};