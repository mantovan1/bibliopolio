const User = require('../models/User.js');
const db = require('../db.js');

async function createUser(name, email, pass){
    const createdUser = await User.create({
        name: name,
        email: email,
        pass: pass
    });
    return createdUser;
}

module.exports = Object.freeze({
    createUser,
})