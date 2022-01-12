const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: { type: String, required: true },
    nickName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    typeRole: { type: String, default: 'user' }
})

module.exports.User = mongoose.model('user', User);
