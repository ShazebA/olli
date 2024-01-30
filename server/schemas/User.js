const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isParent: {
        type: Boolean,
        default: false
    },
    isDependent: {
        type: Boolean,
        default: false
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

const Users = mongoose.model('Users', userSchema ,"Users");
module.exports = Users;
