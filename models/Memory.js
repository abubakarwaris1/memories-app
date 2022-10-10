const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    images:[{
        type:String
    }],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    memoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Memory"
    }
});

const User = mongoose.model('Memory', MemorySchema);

module.exports = User;