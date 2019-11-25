const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {
        type: String,
        require: false
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false
    },
    url: {
        type: String,
        require: false
    },
    urlToImage: {
        type: String,
        require: false
    },
    publishedAt: {
        type: String,
        require: false
    },
    content: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("Article", articleSchema);