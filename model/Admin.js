const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminFields = {
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
    authorization: {
        type: Number,
        default: 1,
    },
    isLogin: {
        type: Boolean,
        default: false,
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
const AdminSchema = new Schema(adminFields);
module.exports = mongoose.model('Admin', AdminSchema);