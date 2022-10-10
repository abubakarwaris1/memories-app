const express = require('express');
require('dotenv').config()
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typedefs = require('./TypeDefs');
const resolvers = require('./api/resolver');
const { getUserId } = require('./utils/AuthorizeRequest');
const DataLoader = require('./utils/Dataloader');

async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs:typedefs,
        resolvers,
        context: (context) => ({
            DataLoader,
            userId: getUserId(context)
        })
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({app: app});

    await mongoose.connect('mongodb://localhost:27017/memories');
    console.log('MongoDb Connected...')

    app.listen(4000, () => console.log('Server listening on port 4000'))
}

startServer();
