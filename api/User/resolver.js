const User = require('../../models/Users');
const UserApis = require('./apis');
const CheckAuth = require('../../utils/Utils');

const resolvers = {
    Query: {
        getUsers: async(_,__,context) => {
            CheckAuth(context);
            return await User.find();
        },

        login: async(_, args) => {
            return UserApis.login(args.body)
        }
    },

    loginApiReturn: {
        __resolveType(obj) {
            if(obj.token) {
                return 'loginPayload';
            }

            if(obj.error) {
                return "AuthenticationError";
            }

            return null;
        }
    },

    Mutation: {
        createUser: async (_,args,__,___) => {
            const { name, email, password } = args.user;
            const hash = await UserApis.genHash(password);
            const user = await User.create({name, email, password:hash});

            return user;
        }
    }
}

module.exports = resolvers;