const jwt = require('jsonwebtoken');

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const getTokenPayload = (token) => {
    return jwt.verify(token, PRIVATE_KEY);
}

const getUserId = (context) => {
    const req = context.req;
        
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.replace('Bearer ','');
        if(token) {
            const { userId } = getTokenPayload(token);
            return userId;
        }
    }
}

module.exports = {
    getUserId
};