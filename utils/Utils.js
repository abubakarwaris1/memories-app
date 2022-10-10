const { AuthenticationError } = require('apollo-server-errors');

const CheckAuth = (context) => {
    if(!context.userId) throw new AuthenticationError('Unauthenticated');
    return;
}

module.exports = CheckAuth;