const User = require('../models/Users');
const Memory = require('../models/Memory');
const CommentSchema = require('../models/Comments');
const LikeSchema = require('../models/Likes');

const collections = {
    user: User,
    memory: Memory,
    comment: CommentSchema,
    like: LikeSchema
}

const collectionMappings = {
    USER: 'user',
    MEMORY: 'memory',
    COMMENT: 'comment',
    LIKE: 'like'
}

module.exports = {
    collections,
    collectionMappings
}