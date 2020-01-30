const mongoose = require("mongoose");
const Article = require("../models/article");

exports.getAll = (request, response, next) => {
    Article.find()
        .select("author title description url urlToImage publishedAt content _id")
        .exec()
        .then(result => {
            response.status(200).json(result);
        })
        .catch(error => {
            next(error);
        });
};

exports.getArticle = (request, response, next) => {
    const id = request.params.id;
    Article.findById(id)
        .select("author title description url urlToImage publishedAt content _id")
        .exec()
        .then(result => {
            if(result) {
                response.status(200).json({
                    _id: result._id,
                    title: result.title,
                    content: result.content,
                    author: result.author,
                    description: result.description,
                    url: result.url,
                    urlToImage: result.urlToImage,
                    publishedAt: result.publishedAt,
                });
            } else {
                response.status(404).json({
                    message: "Article wasn't found."
                });
            }
        })
        .catch(error => {
            next(error);
        });
};

exports.addArticle = (request, response, next) => {
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
                author: result.author,
                title: result.title,
                description: result.description,
                url: result.url,
                urlToImage: result.urlToImage,
                publishedAt: result.publishedAt,
                content: result.content
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.updateArticle = (request, response, next) => {
    const id = request.params.id;
    const updateOps = {};
    const bodyData = [].slice.call(request.body);
    for(const ops of bodyData) {
        updateOps[ops.propName] = ops.value;
    }

    Article.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            if(result) {
                response.status(200).json({...result});
            }
        })
        .catch(error => {
            next(error);
        });
};

exports.deleteArticle = (request, response, next) => {
    const id = request.params.id;
    Article.remove( { _id: id })
        .exec()
        .then(result => {
            if(result.deletedCount > 0) {
                response.status(200).json({...result});
            } else {
                response.status(404).json({...result});
            }
        })
        .catch(error => {
            next(error);
        });
};