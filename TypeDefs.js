const { gql } = require('apollo-server-express');

const typedefs = gql`
    type Query {
        getUsers: [User]
        login(body:loginInfo) : loginApiReturn
        getMemories: [Memory]
        getMemory(memoryId: String): Memory
        getComments(memoryId: String): [Comment]
        getLikes(memoryId: String): [Likes]
        searchMemory(search:searchInput):[Memory]
    }

    type Mutation {
        createUser(user: UserCreateType) : User
        createMemory(memory: MemoryType) : Memory
        addComment(comment:CommentInput): Comment
        removeComment(commentId:String): Boolean
        likeMemory(memoryId:String): Boolean
    }

    union loginApiReturn = loginPayload | AuthenticationError

    input loginInfo {
        email: String
        password: String
    }

    input UserCreateType {
        name: String
        email: String
        password: String
    }

    input MemoryType {
        title: String
        description: String
        tags:[String]
        images:[String]
        memoryId: String
    }

    input CommentInput {
        memoryId: ID
        text: String
    }

    input searchInput {
        text: String
        tag: String
    }

    type loginPayload {
        token: String
        name: String
        email: String
    }

    type AuthenticationError {
        error: String
        message: String
    }

    type User {
        name: String
        email: String
    }

    type Memory {
        title: String
        description: String
        tags: [String]
        images: [String]
        memoryId: Memory
    }

    type Comment {
        userId: User
        memroyId: String
        text: String
    }

    type Likes {
        userId: User
    }

    type Error {
        type: String
        message: String
    }
`;

module.exports = typedefs;