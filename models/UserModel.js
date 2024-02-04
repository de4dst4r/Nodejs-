const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    }
});

let UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
