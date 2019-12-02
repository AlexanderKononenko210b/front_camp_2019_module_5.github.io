const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    facebookId: {
        type: String
    }
    });

module.exports = mongoose.model('User', userSchema);