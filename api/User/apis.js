const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-errors')
const User = require('../../models/Users');

const SALT = process.env.SALT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function login(loginInfo) {

    const user = await User.findOne({email: loginInfo.email}).lean();
    const isValid = await bcrypt.compare(loginInfo.password, user.password);

    if (isValid){
        const token = jwt.sign({
            name: user.name,
            userId: user._id,
        }, PRIVATE_KEY);
        return { token, name: user.name, email: user.email };
    } else {
        throw new AuthenticationError('Wrong login credentials.')
    }
}

async function genHash(password) {
    const hash = bcrypt.hash(password, parseInt(SALT));
    return hash;
}

module.exports = {
    login,
    genHash
}