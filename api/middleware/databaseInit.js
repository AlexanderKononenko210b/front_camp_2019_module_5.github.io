const mongoose = require("mongoose");
const fs = require('fs');
const path = require("path");
const Article = require("../models/article");
const errorHandler = require("./logger");

const databaseInit = () => {
    Article.find()
        .exec()
        .then(result => {
            if(result.length == 0) {
                let articles = [];
                fs.readFile(path.resolve(__dirname, "../static/newsInit.json"), (error, content) => {
                    if(error) {
                        errorHandler.error({
                            level: error.level || "error",
                            url: "",
                            message: error.message
                        });
                    }
                    const data = JSON.parse(content);

                    for(let i = 0; i < data.length ; ++i ) {
                        const article = new Article({
                            _id: mongoose.Types.ObjectId(),
                            author: data[i].author,
                            title: data[i].title,
                            description: data[i].description,
                            url: data[i].url,
                            urlToImage: data[i].urlToImage,
                            publishedAt: data[i].publishedAt,
                            content: data[i].content
                        });

                        articles.push(article);
                    }

                    Article.insertMany(articles);
                });
            }
    })
    .catch(error => {
        errorHandler.error({
            level: error.level || "error",
            url: "",
            message: error.message
        });
    });
};

module.exports = databaseInit;