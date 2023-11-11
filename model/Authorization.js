const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authorizationFields = {
    name: {
        type: String,
    },
    primeValue: {
        type: Number,
        default: 1,
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
const authorizationSchema = new Schema(authorizationFields);
module.exports = mongoose.model('Authorization', authorizationSchema);