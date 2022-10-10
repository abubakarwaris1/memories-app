const { AuthenticationError,ApolloError } = require('apollo-server-errors');
const Memory = require('../../models/Memory');
const Like = require('../../models/Likes');
const { collectionMappings } = require('../../utils/ModelMappings');
const CheckAuth = require('../../utils/Utils'); 

const resolvers = {
    Query: {
        getLikes: async(_,args,context,__) => {
            CheckAuth(context);
            const likes = await Like.find({memoryId: args.memoryId});
            return likes;
        }
    },
    Likes:{
        userId: async(parent,args,context,_) => {
            return await context.DataLoader(collectionMappings.USER, parent.userId);
        }
    },

    Mutation: {
        likeMemory: async(_,args,context,__) => {
            CheckAuth(context);
            const memory = await Memory.findOne({_id: args.memoryId});
            if(!memory){
                throw new ApolloError("Memory doesn't exist", 400);
            }
            await Like.create({userId: context.userId, memoryId: args.memoryId});
            return true;
        }
    }
}

module.exports = resolvers;