const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    memoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Memory",
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', CommentsSchema);

module.exports = Comment;
