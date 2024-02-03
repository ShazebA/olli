const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
});

const UserNewsletter = mongoose.model('UserNewsletter', userSchema ,"newsletter");
module.exports = UserNewsletter;
