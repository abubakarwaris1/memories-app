const merge =  require('lodash/merge');
const UserResolvers = require('./User/resolver');
const MemoryResolver  = require('./Memory/resolver');
const CommentResolver = require('./Comments/resolver');
const LikesResolver = require('../api/Likes/resolver');

module.exports = merge(
 UserResolvers,
 MemoryResolver,
 CommentResolver,
 LikesResolver
);