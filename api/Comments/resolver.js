const { ApolloError } = require('apollo-server-errors');
const Comment = require('../../models/Comments');
const { collectionMappings } = require('../../utils/ModelMappings');
const CheckAuth = require('../../utils/Utils');
const resolvers = {
    Query: {
        getComments: async(_,args,context,___) => {
            CheckAuth(context);
            return await Comment.find({memoryId: args.memoryId});
        }
    },

    Comment: {
        userId: async(parent,_,context,__) => {
           return context.DataLoader(collectionMappings.USER, parent.userId);
        }
    },

    Mutation: {
        addComment: async(_,args,context,__) => {
            CheckAuth(context);
            const { memoryId, text } = args.comment;
            if(!memoryId || !text) throw new ApolloError('memoryId and text is required.', 400);
            return await Comment.create({
                userId: context.userId,
                memoryId,
                text
            });
        },
        removeComment: async(_,args,context,__) => {
            CheckAuth(context);
            const comment = await Comment.findOne({_id: args.commentId}).lean();
            if(!comment) {
                throw new ApolloError('No such comment exist', 400);
            } else if(comment.userId != context.userId) {
                throw new ApolloError('Bad Credentials', 400);
            } else {
                await Comment.deleteOne({_id: args.commentId});
                return true;
            }

        }
    }
}

module.exports = resolvers;