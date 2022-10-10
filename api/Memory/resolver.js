const { ApolloError } = require('apollo-server-errors')
const Memory = require('../../models/Memory');
const { collectionMappings } = require('../../utils/ModelMappings');
const CheckAuth = require('../../utils/Utils');
const resolvers = {
    
    Query: {
        getMemories: async(_,__,context) => {
            CheckAuth(context);
            return await Memory.find({userId: context.userId});
        },
        getMemory: async(_,args,context) => {
            CheckAuth(context);
            return await Memory.findOne({_id: args.memoryId});
        },
        searchMemory: async(_,args,context) => {
            CheckAuth(context);
            const searchObj = {};
            if(args.search.text) {
                searchObj.title = {$regex:args.search.text, $options:'i'};
                searchObj.description = {$regex:args.search.text, $options: 'i'};
            }
            if(args.search.tag) {
                searchObj.tags = {$regex:args.search.tag, $options: 'i'};
            }

            return await Memory.find(searchObj);
        }
    },
    //sub-resolver for memory
    Memory: {
        memoryId: async(parent,_,context) => {
            try{
                return await context.DataLoader(collectionMappings.MEMORY, parent.memoryId)
            } catch(e) {
                return e.message;
            }
        }
    },
    Mutation: {
        createMemory: async (_,args,context,__) => {
            CheckAuth(context);
            const { title, description, tags, images, memoryId } = args.memory;
            if(!title || !description) throw new ApolloError('title and description is required.', 400);
            const memoryObject = {title,description, userId: context.userId};
            if(tags && tags.length) {
                memoryObject.tags = tags;
            }
            if(images && images.length){
                memoryObject.images = images;
            }
            if(memoryId) {
                memoryObject.memoryId = memoryId;
            }
            const memory = await Memory.create(memoryObject);

            return memory;
        }
    }
}

module.exports = resolvers;