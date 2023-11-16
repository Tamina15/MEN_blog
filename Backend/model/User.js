const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userFields = {
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: Boolean,
    },
    age: {
        type: Number,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: null,
    },
    blogs: {
        type: Array,
        default: null,
    },
    isBlock: {
        type:Boolean,
        default:false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
}
const UserSchema = new Schema(userFields);
module.exports = mongoose.model('User', UserSchema);