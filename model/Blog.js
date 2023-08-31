const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogFields = {
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    authorID: {
        type: Object,
        required: true,
    },
    author: {
        type: String,
    },
    preview: {
        type: String,
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
const BlogSchema = new Schema(blogFields);
module.exports = mongoose.model('Blog', BlogSchema);