const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    memoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Memory",
        required: true
    }
});

const Like = mongoose.model('Like', LikesSchema);

module.exports = Like;
